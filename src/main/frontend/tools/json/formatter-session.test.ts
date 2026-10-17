import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { JobWorker } from "../../platform/worker-manager";
import { createFormatterSession } from "./formatter-session";

function setup() {
  const workers: JobWorker[] = [];
  const view = {
    status: vi.fn(),
    output: vi.fn(),
    current: vi.fn(),
    diagnostic: vi.fn(),
  };
  const factory = vi.fn(() => {
    const worker: JobWorker = {
      postMessage: vi.fn(),
      terminate: vi.fn(),
      onmessage: null,
      onerror: null,
      onmessageerror: null,
    };
    workers.push(worker);
    return worker;
  });
  const session = createFormatterSession(factory, view);
  const reply = (message: Record<string, unknown>) => {
    const worker = workers.at(-1)!;
    const request = vi.mocked(worker.postMessage).mock.calls[0]![0] as {
      id: number;
      operation: string;
    };
    worker.onmessage!({ data: { ...request, ...message } } as MessageEvent);
  };
  return { session, view, workers, factory, reply };
}

describe("formatter result ownership", () => {
  it("copies exactly the current result only on explicit activation", async () => {
    const { session, reply, view } = setup();
    const write = vi.fn().mockResolvedValue(undefined);
    await session.copy(write);
    session.start("{}", 2);
    await session.copy(write);
    expect(write).not.toHaveBeenCalled();
    reply({ status: "success", output: '{\n  "n": 9007199254740993\n}' });
    expect(write).not.toHaveBeenCalled();
    const result = session.currentResult();
    const pending = session.copy(write);
    expect(write).toHaveBeenCalledExactlyOnceWith(result!.output);
    await pending;
    expect(view.status).toHaveBeenLastCalledWith("copied");
    expect(session.currentResult()).toEqual(result);
    session.invalidate();
    await session.copy(write);
    expect(write).toHaveBeenCalledTimes(1);
  });

  it("handles denied, synchronously throwing and unavailable writes without losing content", async () => {
    const { session, reply, view } = setup();
    session.start("{}", 2);
    reply({ status: "success", output: "{}" });
    await session.copy();
    expect(view.status).toHaveBeenLastCalledWith("copy-unavailable");
    await session.copy(() => Promise.reject(new Error("PRIVATE")));
    expect(view.status).toHaveBeenLastCalledWith("copy-failed");
    await session.copy(() => {
      throw new Error("PRIVATE");
    });
    expect(view.status).toHaveBeenLastCalledWith("copy-failed");
    expect(session.currentResult()!.output).toBe("{}");
    expect(view.output).toHaveBeenCalledExactlyOnceWith("{}");
  });

  it.each(["invalidate", "cancel", "clear", "dispose", "start"] as const)(
    "suppresses clipboard success and rejection after %s",
    async (action) => {
      for (const rejected of [false, true]) {
        const { session, reply, view } = setup();
        session.start("{}", 2);
        reply({ status: "success", output: "{}" });
        let settle!: () => void;
        const pending = session.copy(
          () =>
            new Promise<void>((resolve, reject) => {
              settle = () =>
                rejected ? reject(new Error("PRIVATE")) : resolve();
            }),
        );
        if (action === "start") session.start("[]", 4);
        else session[action]();
        const calls = view.status.mock.calls.length;
        settle();
        await pending;
        expect(view.status).toHaveBeenCalledTimes(calls);
        session.dispose();
      }
    },
  );

  it("suppresses an older clipboard attempt when a newer one completes", async () => {
    const { session, reply, view } = setup();
    session.start("{}", 2);
    reply({ status: "success", output: "{}" });
    let resolve!: () => void;
    const old = session.copy(
      () =>
        new Promise<void>((done) => {
          resolve = done;
        }),
    );
    await session.copy(() => Promise.reject(new Error("PRIVATE")));
    expect(view.status).toHaveBeenLastCalledWith("copy-failed");
    resolve();
    await old;
    expect(view.status).toHaveBeenLastCalledWith("copy-failed");
  });

  it("clears running/completed/error/empty states and ignores late work", () => {
    const { session, reply, workers, view } = setup();
    session.start("{}", 2);
    const late = workers[0]!.onmessage!;
    session.clear();
    late({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "success",
        output: "stale",
      },
    } as MessageEvent);
    expect(view.output).toHaveBeenLastCalledWith("");
    expect(view.status).toHaveBeenLastCalledWith("cleared");
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(session.currentResult()).toBeUndefined();
    session.start("[]", 2);
    reply({ status: "success", output: "[]" });
    session.clear();
    session.start("[", 2);
    reply({ status: "error", diagnostic: { code: "syntax", offset: 1 } });
    session.clear();
    session.clear();
    session.invalidate();
    expect(view.status).toHaveBeenLastCalledWith("ready");
    expect(view.output).toHaveBeenLastCalledWith("");
    expect(session.currentResult()).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });
  beforeEach(() =>
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance"] }),
  );
  afterEach(() => vi.useRealTimers());

  it("exposes only matching successful output and advances revisions for retries", () => {
    const { session, reply, view } = setup();
    expect(session.currentResult()).toBeUndefined();
    session.start("{}", 2);
    expect(session.currentResult()).toBeUndefined();
    reply({ status: "success", output: "{}" });
    const first = session.currentResult()!;
    expect(first.output).toBe("{}");
    expect(view.current).toHaveBeenLastCalledWith(true);
    session.start("{}", 4);
    expect(session.currentResult()).toBeUndefined();
    reply({ status: "success", output: "{}" });
    expect(session.currentResult()!.revision).toBeGreaterThan(first.revision);
  });

  it("keeps visible prior output non-current on accepted edits/settings", () => {
    const { session, reply, view } = setup();
    session.start("{}", 2);
    reply({ status: "success", output: "{}" });
    session.invalidate();
    expect(session.currentResult()).toBeUndefined();
    expect(view.current).toHaveBeenLastCalledWith(false);
    expect(view.status).toHaveBeenLastCalledWith("stale");
    expect(view.output).toHaveBeenCalledExactlyOnceWith("{}");
  });

  it("cancels in-flight work and suppresses captured late callbacks on edits", () => {
    const { session, workers, view } = setup();
    session.start("{}", 2);
    const late = workers[0]!.onmessage!;
    session.invalidate();
    late({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "success",
        output: "stale",
      },
    } as MessageEvent);
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(view.output).not.toHaveBeenCalled();
    expect(view.status).toHaveBeenLastCalledWith("ready");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not keep a current result after failure and gives diagnostics only their own input", () => {
    const { session, reply, view } = setup();
    session.start("{}", 2);
    reply({ status: "success", output: "{}" });
    session.start("[1,]", 2);
    reply({ status: "error", diagnostic: { code: "syntax", offset: 3 } });
    expect(session.currentResult()).toBeUndefined();
    expect(view.status).toHaveBeenLastCalledWith("error");
    expect(view.diagnostic).toHaveBeenCalledExactlyOnceWith(
      { code: "syntax", offset: 3 },
      "[1,]",
    );
    expect(view.output).toHaveBeenCalledExactlyOnceWith("{}");
  });

  it("recovers after cancellation/deadline without reviving old output", () => {
    const { session, workers, reply, view } = setup();
    session.start("{}", 2);
    session.cancel();
    expect(view.status).toHaveBeenLastCalledWith("cancelled");
    expect(session.currentResult()).toBeUndefined();
    session.start("[]", 2);
    vi.advanceTimersByTime(2000);
    expect(view.status).toHaveBeenLastCalledWith("timeout");
    expect(workers[1]!.terminate).toHaveBeenCalledOnce();
    expect(session.currentResult()).toBeUndefined();
    session.start("null", 2);
    reply({ status: "success", output: "null" });
    expect(session.currentResult()!.output).toBe("null");
  });

  it("handles worker creation failures and output overflow without publishing a current result", () => {
    const { session, factory, reply, view } = setup();
    factory.mockImplementationOnce(() => {
      throw new Error("PRIVATE");
    });
    expect(session.start("{}", 2)).toBe(false);
    expect(view.status).toHaveBeenLastCalledWith("error");
    expect(session.currentResult()).toBeUndefined();
    session.start("{}", 2);
    reply({ status: "success", output: "x".repeat(8 * 1024 * 1024 + 1) });
    expect(view.status).toHaveBeenLastCalledWith("output-limit");
    expect(session.currentResult()).toBeUndefined();
    expect(view.output).not.toHaveBeenCalled();
  });

  it("disposes all active state and remains inert on later starts/changes/replies", () => {
    const { session, workers, view } = setup();
    session.start("{}", 2);
    const late = workers[0]!.onmessage!;
    session.dispose();
    session.dispose();
    session.invalidate();
    session.cancel();
    expect(session.start("{}", 2)).toBe(false);
    late({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "success",
        output: "stale",
      },
    } as MessageEvent);
    expect(view.output).toHaveBeenCalledExactlyOnceWith("");
    expect(session.currentResult()).toBeUndefined();
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });
});

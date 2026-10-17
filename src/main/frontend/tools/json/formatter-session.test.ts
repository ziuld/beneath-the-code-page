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

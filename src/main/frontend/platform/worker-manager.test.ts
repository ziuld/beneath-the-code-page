import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWorkerManager, type JobWorker } from "./worker-manager";
import { INPUT_BYTES, OUTPUT_BYTES } from "./text-budget";

function setup() {
  const workers: JobWorker[] = [];
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
  const callbacks = { status: vi.fn(), output: vi.fn(), diagnostic: vi.fn() };
  const manager = createWorkerManager(factory, callbacks);
  const reply = (output: unknown, status = "success") => {
    const worker = workers.at(-1)!;
    const request = vi.mocked(worker.postMessage).mock.calls[0]![0] as {
      id: number;
      operation: string;
    };
    worker.onmessage!({ data: { ...request, status, output } } as MessageEvent);
  };
  return { manager, factory, workers, callbacks, reply };
}

describe("one-active-job worker lifecycle", () => {
  beforeEach(() =>
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance"] }),
  );
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("accepts a current result before the deadline and releases resources", () => {
    const { manager, workers, callbacks, reply } = setup();
    expect(manager.start("echo", "input")).toBe(true);
    vi.advanceTimersByTime(1999);
    reply("result");
    expect(callbacks.output).toHaveBeenCalledExactlyOnceWith("result");
    expect(callbacks.status).toHaveBeenLastCalledWith("success");
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("times out at two seconds and recovers with a clean worker", () => {
    const { manager, workers, callbacks, reply } = setup();
    manager.start("busy", "input");
    vi.advanceTimersByTime(1999);
    expect(callbacks.status).toHaveBeenLastCalledWith("running");
    vi.advanceTimersByTime(1);
    expect(callbacks.status).toHaveBeenLastCalledWith("timeout");
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(callbacks.output).not.toHaveBeenCalled();
    manager.start("echo", "new input");
    reply("new output");
    expect(workers).toHaveLength(2);
    expect(callbacks.output).toHaveBeenCalledExactlyOnceWith("new output");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("rejects a response at the deadline even before its timer callback runs", () => {
    const { manager, callbacks, reply } = setup();
    manager.start("echo", "input");
    vi.spyOn(performance, "now").mockReturnValue(2000);
    reply("too late");
    expect(callbacks.status).toHaveBeenLastCalledWith("timeout");
    expect(callbacks.output).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not post when a running-status callback disposes the workspace", () => {
    const worker: JobWorker = {
      postMessage: vi.fn(),
      terminate: vi.fn(),
      onmessage: null,
      onerror: null,
      onmessageerror: null,
    };
    const manager = createWorkerManager(() => worker, {
      status: () => manager.dispose(),
      output: vi.fn(),
    });
    expect(manager.start("echo", "input")).toBe(false);
    expect(worker.postMessage).not.toHaveBeenCalled();
    expect(worker.terminate).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("ignores late A, unknown IDs and duplicate terminal results while B stays current", () => {
    const { manager, workers, callbacks, reply } = setup();
    manager.start("echo", "A");
    const lateA = workers[0]!.onmessage!;
    manager.cancel();
    expect(callbacks.status).toHaveBeenLastCalledWith("cancelled");
    manager.start("echo", "B");
    const lateB = workers[1]!.onmessage!;
    lateA({
      data: { id: 1, operation: "echo", status: "success", output: "A" },
    } as MessageEvent);
    lateB({
      data: {
        id: 999,
        operation: "echo",
        status: "success",
        output: "unknown",
      },
    } as MessageEvent);
    expect(callbacks.output).not.toHaveBeenCalled();
    expect(callbacks.status).toHaveBeenLastCalledWith("running");
    reply("B");
    lateB({
      data: {
        id: 2,
        operation: "echo",
        status: "success",
        output: "duplicate",
      },
    } as MessageEvent);
    expect(callbacks.output).toHaveBeenCalledExactlyOnceWith("B");
    expect(callbacks.status).toHaveBeenLastCalledWith("success");
  });

  it("replacing a job terminates it before posting the next job", () => {
    const { manager, workers } = setup();
    manager.start("echo", "A");
    manager.start("echo", "B");
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(
      vi.mocked(workers[0]!.terminate).mock.invocationCallOrder[0],
    ).toBeLessThan(
      vi.mocked(workers[1]!.postMessage).mock.invocationCallOrder[0]!,
    );
    manager.dispose();
  });

  it.each([
    null,
    [],
    { id: "1" },
    { id: 1, operation: "other", status: "success", output: "bad" },
    { id: 1, operation: "echo", status: "unknown" },
    { id: 1, operation: "echo", status: "success", output: 42 },
  ])("fails malformed current responses safely: %j", (data) => {
    const { manager, workers, callbacks } = setup();
    manager.start("echo", "PRIVATE");
    workers[0]!.onmessage!({ data } as MessageEvent);
    expect(callbacks.status).toHaveBeenLastCalledWith("error");
    expect(callbacks.output).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("handles worker errors and message decoding errors without raw messages", () => {
    const { manager, workers, callbacks, reply } = setup();
    manager.start("echo", "input");
    reply("accepted");
    manager.start("echo", "PRIVATE");
    const event = new Event("error", { cancelable: true });
    workers[1]!.onerror!(event as ErrorEvent);
    expect(event.defaultPrevented).toBe(true);
    expect(callbacks.status).toHaveBeenLastCalledWith("error");
    manager.start("echo", "PRIVATE");
    workers[2]!.onmessageerror!({} as MessageEvent);
    expect(callbacks.output).toHaveBeenCalledExactlyOnceWith("accepted");
    expect(callbacks.status).toHaveBeenLastCalledWith("error");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("accepts only bounded matching-job diagnostics and still releases the worker", () => {
    const { manager, workers, callbacks } = setup();
    manager.start("json-format-2", "{} ");
    workers[0]!.onmessage!({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "error",
        diagnostic: { code: "syntax", offset: 3 },
      },
    } as MessageEvent);
    expect(callbacks.status).toHaveBeenLastCalledWith("error");
    expect(callbacks.diagnostic).toHaveBeenCalledExactlyOnceWith({
      code: "syntax",
      offset: 3,
    });
    expect(callbacks.output).not.toHaveBeenCalled();
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each([
    null,
    [],
    {},
    { code: "unknown" },
    { code: "syntax" },
    { code: "syntax", offset: -1 },
    { code: "syntax", offset: 4 },
    { code: "syntax", offset: 0.5 },
    { code: "syntax", offset: "1" },
    { code: "syntax", offset: Number.POSITIVE_INFINITY },
    { code: "syntax", offset: 1, text: "PRIVATE" },
    { code: "depth-limit", offset: 1 },
  ])(
    "uses generic failure for malformed diagnostic metadata: %j",
    (diagnostic) => {
      const { manager, workers, callbacks } = setup();
      manager.start("json-format-2", "{}");
      workers[0]!.onmessage!({
        data: {
          id: 1,
          operation: "json-format-2",
          status: "error",
          diagnostic,
        },
      } as MessageEvent);
      expect(callbacks.status).toHaveBeenLastCalledWith("error");
      expect(callbacks.diagnostic).not.toHaveBeenCalled();
      expect(callbacks.output).not.toHaveBeenCalled();
    },
  );

  it.each(["depth-limit", "input-limit", "output-limit"])(
    "accepts allowlisted non-location code %s",
    (code) => {
      const { manager, workers, callbacks } = setup();
      manager.start("json-format-2", "{}");
      workers[0]!.onmessage!({
        data: {
          id: 1,
          operation: "json-format-2",
          status: "error",
          diagnostic: { code },
        },
      } as MessageEvent);
      expect(callbacks.diagnostic).toHaveBeenCalledExactlyOnceWith({ code });
    },
  );

  it("ignores cancelled-job and unknown-ID diagnostic replies", () => {
    const { manager, workers, callbacks } = setup();
    manager.start("json-format-2", "{}");
    const late = workers[0]!.onmessage!;
    manager.cancel();
    manager.start("json-format-2", "{}");
    late({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "error",
        diagnostic: { code: "syntax", offset: 0 },
      },
    } as MessageEvent);
    workers[1]!.onmessage!({
      data: {
        id: 999,
        operation: "json-format-2",
        status: "error",
        diagnostic: { code: "syntax", offset: 0 },
      },
    } as MessageEvent);
    expect(callbacks.diagnostic).not.toHaveBeenCalled();
    expect(callbacks.status).toHaveBeenLastCalledWith("running");
    manager.dispose();
  });

  it("does not deliver a diagnostic after an error-status callback starts a replacement", () => {
    const { manager, workers, callbacks } = setup();
    manager.start("json-format-2", "{}");
    callbacks.status.mockImplementationOnce(() => {
      manager.start("echo", "new");
    });
    workers[0]!.onmessage!({
      data: {
        id: 1,
        operation: "json-format-2",
        status: "error",
        diagnostic: { code: "syntax", offset: 0 },
      },
    } as MessageEvent);
    expect(callbacks.diagnostic).not.toHaveBeenCalled();
    manager.dispose();
  });

  it("enforces Unicode input/output byte boundaries without replacing accepted output", () => {
    const { manager, workers, factory, callbacks, reply } = setup();
    expect(manager.start("echo", "😀".repeat(INPUT_BYTES / 4))).toBe(true);
    reply("😀".repeat(OUTPUT_BYTES / 4));
    expect(callbacks.output).toHaveBeenCalledOnce();
    expect(manager.start("echo", "é".repeat(INPUT_BYTES / 2) + "x")).toBe(
      false,
    );
    expect(factory).toHaveBeenCalledOnce();
    expect(callbacks.status).toHaveBeenLastCalledWith("input-limit");
    manager.start("echo", "small");
    reply("é".repeat(OUTPUT_BYTES / 2) + "x");
    expect(callbacks.status).toHaveBeenLastCalledWith("output-limit");
    expect(callbacks.output).toHaveBeenCalledOnce();
    expect(workers[1]!.terminate).toHaveBeenCalledOnce();
  });

  it("handles factory/post failures safely and can retry", () => {
    const status = vi.fn();
    const factory = vi.fn((): JobWorker => {
      throw new Error("PRIVATE");
    });
    const manager = createWorkerManager(factory, { status, output: vi.fn() });
    expect(manager.start("echo", "input")).toBe(false);
    expect(status).toHaveBeenLastCalledWith("error");
    const fixture = setup();
    fixture.factory.mockImplementationOnce(() => ({
      postMessage: () => {
        throw new Error("PRIVATE");
      },
      terminate: vi.fn(),
      onmessage: null,
      onerror: null,
      onmessageerror: null,
    }));
    expect(fixture.manager.start("echo", "input")).toBe(false);
    expect(fixture.callbacks.status).toHaveBeenLastCalledWith("error");
    fixture.manager.start("echo", "new");
    fixture.reply("recovered");
    expect(fixture.callbacks.output).toHaveBeenCalledWith("recovered");
  });

  it("disposes idempotently and suppresses all later callbacks/jobs", () => {
    const { manager, workers, factory, callbacks } = setup();
    manager.start("echo", "input");
    const late = workers[0]!.onmessage!;
    manager.dispose();
    manager.dispose();
    manager.cancel();
    late({
      data: { id: 1, operation: "echo", status: "success", output: "late" },
    } as MessageEvent);
    vi.advanceTimersByTime(3000);
    expect(manager.start("echo", "after disposal")).toBe(false);
    expect(factory).toHaveBeenCalledOnce();
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(callbacks.status).toHaveBeenCalledExactlyOnceWith("running");
    expect(callbacks.output).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});

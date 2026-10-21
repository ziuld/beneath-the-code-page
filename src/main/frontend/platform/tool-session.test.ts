import { expect, it, vi } from "vitest";
import { createToolSession } from "./tool-session";
import type { JobWorker } from "./worker-manager";

it("owns empty successful results, copies them explicitly, invalidates mode changes and erases on Clear", async () => {
  const worker: JobWorker = {
    postMessage: vi.fn(),
    terminate: vi.fn(),
    onmessage: null,
    onerror: null,
    onmessageerror: null,
  };
  const view = {
    status: vi.fn(),
    output: vi.fn(),
    current: vi.fn(),
    diagnostic: vi.fn(),
  };
  const session = createToolSession(() => worker, view);
  session.start("", "base64-encode");
  worker.onmessage!({
    data: { id: 1, operation: "base64-encode", status: "success", output: "" },
  } as MessageEvent);
  expect(session.currentResult()).toEqual({ revision: 1, output: "" });
  const write = vi.fn().mockResolvedValue(undefined);
  await session.copy(write);
  expect(write).toHaveBeenCalledWith("");
  session.invalidate();
  expect(view.status).toHaveBeenLastCalledWith("stale");
  await session.copy(write);
  expect(write).toHaveBeenCalledTimes(1);
  session.clear();
  expect(session.currentResult()).toBeUndefined();
  expect(view.output).toHaveBeenLastCalledWith("");
  expect(view.status).toHaveBeenLastCalledWith("cleared");
  session.dispose();
});

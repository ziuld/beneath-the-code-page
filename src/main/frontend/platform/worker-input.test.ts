import { describe, expect, it, vi } from "vitest";
import { INPUT_BYTES } from "./text-budget";
import { postWorkerInput } from "./worker-input";

describe("pre-worker input boundary", () => {
  it("posts exact-budget Unicode with its identity and operation", () => {
    const worker = { postMessage: vi.fn() };
    const request = {
      id: 1,
      operation: "proof",
      input: "😀".repeat(INPUT_BYTES / 4),
    };
    expect(postWorkerInput(worker, request)).toBe(true);
    expect(worker.postMessage).toHaveBeenCalledExactlyOnceWith(request);
  });
  it.each(["a".repeat(INPUT_BYTES) + "x", "é".repeat(INPUT_BYTES / 2) + "x"])(
    "rejects oversized input before posting/cloning",
    (input) => {
      const worker = { postMessage: vi.fn() };
      expect(
        postWorkerInput(worker, { id: 1, operation: "proof", input }),
      ).toBe(false);
      expect(worker.postMessage).not.toHaveBeenCalled();
    },
  );
});

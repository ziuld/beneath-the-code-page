import { afterEach, expect, test, vi } from "vitest";
import { generateBatch } from "./generate";

afterEach(() => vi.unstubAllGlobals());

test.each([1, 3, 100])(
  "F09 AC01: %i native cryptographic v4 identifiers",
  (count) => {
    const native = globalThis.crypto;
    const randomUUID = vi.fn(() => native.randomUUID());
    vi.stubGlobal("crypto", { randomUUID });
    const batch = generateBatch(count).split("\n");
    expect(batch).toHaveLength(count);
    expect(randomUUID).toHaveBeenCalledTimes(count);
    for (const uuid of batch)
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
  },
);

test.each([0, -1, 101, 1.5, NaN, Infinity])(
  "F09 AC02: reject %s before generating",
  (count) => {
    const randomUUID = vi.fn();
    vi.stubGlobal("crypto", { randomUUID });
    expect(() => generateBatch(count)).toThrow("limit");
    expect(randomUUID).not.toHaveBeenCalled();
  },
);

test.each([undefined, {}])(
  "F09: unavailable crypto fails without a random fallback",
  (crypto) => {
    vi.stubGlobal("crypto", crypto);
    expect(() => generateBatch(1)).toThrow("unavailable");
  },
);

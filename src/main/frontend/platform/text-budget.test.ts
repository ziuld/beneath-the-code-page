import { describe, expect, it } from "vitest";
import { INPUT_BYTES, withinUtf8Budget } from "./text-budget";

describe("UTF-8 budget", () => {
  it.each([
    "",
    "ascii",
    "é",
    "€",
    "😀",
    "\ud800",
    "\udc00",
    "\ud800x",
    "a\n😀",
  ])("agrees with UTF-8 encoding for %j without an encoded copy", (text) => {
    const bytes = new TextEncoder().encode(text).length;
    expect(withinUtf8Budget([text], bytes)).toBe(true);
    if (bytes) expect(withinUtf8Budget([text], bytes - 1)).toBe(false);
  });
  it("preserves surrogate pairs across chunks", () => {
    expect(withinUtf8Budget(["\ud83d", "", "\ude00"], 4)).toBe(true);
    expect(withinUtf8Budget(["\ud83d", "\ude00"], 3)).toBe(false);
  });
  it("accepts exactly one MiB and rejects one byte over", () => {
    expect(withinUtf8Budget(["é".repeat(INPUT_BYTES / 2)], INPUT_BYTES)).toBe(
      true,
    );
    expect(withinUtf8Budget(["a".repeat(INPUT_BYTES), "x"], INPUT_BYTES)).toBe(
      false,
    );
  });
  it("stops requesting chunks after the budget is exceeded", () => {
    function* input() {
      yield "too long";
      throw new Error("must not iterate further");
    }
    expect(withinUtf8Budget(input(), 1)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { sourcePosition } from "./position";
import { formatJson } from "./formatter";

describe("diagnostic locations", () => {
  it.each([
    ["", 0, 1, 1],
    ["\r\n", 2, 2, 1],
    ["😀x", 2, 1, 2],
    ["a\rb", 2, 2, 1],
    ["a\nb", 2, 2, 1],
    ["a\r\n😀x", 6, 2, 3],
  ] as const)("maps %j at %i", (input, offset, line, column) => {
    expect(sourcePosition(input, offset)).toEqual({ line, column });
  });
  it.each(['"unfinished', "[1", '{"id":', '"x\\'])(
    "reports EOF after the last character: %s",
    (input) => {
      expect(formatJson(input)).toMatchObject({
        status: "error",
        code: "syntax",
        offset: input.length,
      });
    },
  );
  it("keeps code-point columns after supplementary Unicode", () => {
    const input = '{"😀":1,}';
    const result = formatJson(input);
    expect(result).toMatchObject({ status: "error", code: "syntax" });
    if (result.status === "error" && result.offset !== undefined)
      expect(sourcePosition(input, result.offset)).toEqual({
        line: 1,
        column: 8,
      });
  });
});

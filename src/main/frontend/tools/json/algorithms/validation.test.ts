import { describe, expect, it } from "vitest";
import { formatJson } from "./formatter";
import { sourcePosition } from "./position";
import { JSON_LIMITS, validateJson } from "./validation";

describe("strict JSON validation", () => {
  it.each([
    '{"id":9007199254740993,"id":-0,"n":1.2300e+999}',
    '[true,false,null,"\\u0041\\/"]',
    '"  a b 😀  "',
    "1e999",
    "true",
    "false",
    "null",
  ])("F07-UH01-AC01: validates without output or rewriting: %s", (input) => {
    expect(validateJson(input)).toEqual({ status: "success" });
  });

  it.each([
    "",
    " \r\n\t",
    "//comment\n{}",
    "{/*comment*/}",
    '{"id":1,}',
    "{} {}",
    "[1",
    "01",
    "NaN",
    '"unterminated',
    '{"x":"a\nb"}',
  ])("F07-UH01-AC02: rejects complete invalid input: %s", (input) => {
    const result = validateJson(input);
    expect(result).toMatchObject({
      status: "error",
      code: "syntax",
      offset: expect.any(Number),
    });
    expect(result).not.toHaveProperty("output");
    expect(result).toEqual(formatJson(input));
  });

  it.each([
    ['{"😀":1,}', { line: 1, column: 8 }],
    ['{\r\n"😀":1,}', { line: 2, column: 7 }],
    ['{"a":', { line: 1, column: 6 }],
  ] as const)("locates syntax safely: %s", (input, position) => {
    const result = validateJson(input);
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.code).toBe("syntax");
      expect(sourcePosition(input, result.offset!)).toEqual(position);
    }
  });

  it("accepts exact UTF-8 and depth limits and rejects the next byte/container", () => {
    const exact = '"' + "é".repeat((JSON_LIMITS.input - 2) / 2) + '"';
    expect(validateJson(exact)).toEqual({ status: "success" });
    expect(validateJson(exact + " ")).toEqual({
      status: "error",
      code: "input-limit",
    });
    expect(validateJson("[".repeat(128) + '"{["' + "]".repeat(128))).toEqual({
      status: "success",
    });
    expect(validateJson("[".repeat(129) + "0" + "]".repeat(129))).toEqual({
      status: "error",
      code: "depth-limit",
    });
  });

  it("does not generate pretty output merely to validate", () => {
    const input =
      "[".repeat(127) + "[" + "0,".repeat(20_000) + "0" + "]".repeat(128);
    expect(formatJson(input, 4)).toEqual({
      status: "error",
      code: "output-limit",
    });
    expect(validateJson(input)).toEqual({ status: "success" });
  });
});

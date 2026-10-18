import { describe, expect, it } from "vitest";
import { minifyJson } from "./minifier";
import { formatJson } from "./formatter";
import { JSON_LIMITS, validateJson } from "./validation";

describe("token-preserving JSON minification", () => {
  it.each([
    [
      ' \r\n { "id" : 9007199254740993, "id": -0, "n": 1.2300e+999, "s": "\\u0041\\/ a b 😀" } \t',
      '{"id":9007199254740993,"id":-0,"n":1.2300e+999,"s":"\\u0041\\/ a b 😀"}',
    ],
    [' [ true, false, null, "a b", { } ] ', '[true,false,null,"a b",{}]'],
    [' " a \\" b " ', '" a \\" b "'],
    [" 1e999 ", "1e999"],
    [" true ", "true"],
    [" false ", "false"],
    [" null ", "null"],
  ])("F07-UH02-AC01 preserves exact tokens: %s", (input, output) => {
    expect(minifyJson(input)).toEqual({ status: "success", output });
    expect(minifyJson(output)).toEqual({ status: "success", output });
  });

  it.each([
    "",
    " \r\n",
    "//secret\n{}",
    "{/*secret*/}",
    '{"x":1,}',
    "[1",
    "{} {}",
    "01",
    '"unterminated',
  ])(
    "F07-UH02-AC02 validates the complete document before output: %s",
    (input) => {
      expect(minifyJson(input)).toEqual(validateJson(input));
      expect(minifyJson(input)).not.toHaveProperty("output");
    },
  );

  it("retains shared input/depth bounds without inheriting pretty-output expansion", () => {
    const exact = '"' + "é".repeat((JSON_LIMITS.input - 2) / 2) + '"';
    expect(minifyJson(exact)).toEqual({ status: "success", output: exact });
    expect(minifyJson(exact + " ")).toEqual({
      status: "error",
      code: "input-limit",
    });
    expect(minifyJson("[".repeat(129) + "0" + "]".repeat(129))).toEqual({
      status: "error",
      code: "depth-limit",
    });
    const compact =
      "[".repeat(128) + "0,".repeat(20_000) + "0" + "]".repeat(128);
    expect(formatJson(compact, 4)).toEqual({
      status: "error",
      code: "output-limit",
    });
    expect(minifyJson(compact)).toEqual({ status: "success", output: compact });
  });
});

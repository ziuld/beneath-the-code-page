import { describe, expect, it } from "vitest";
import { createScanner, SyntaxKind } from "jsonc-parser";
import { formatJson, JSON_LIMITS } from "./formatter";

function tokens(text: string) {
  const result: string[] = [];
  const scanner = createScanner(text, true);
  while (scanner.scan() !== SyntaxKind.EOF)
    result.push(
      text.slice(
        scanner.getTokenOffset(),
        scanner.getTokenOffset() + scanner.getTokenLength(),
      ),
    );
  return result;
}

describe("strict token-preserving JSON formatting", () => {
  it.each([
    '{"id":9007199254740993,"id":-0,"value":1.2300e+999}',
    '{"escaped":"\\u0041\\/","spacing":"  a b  ","unicode":"😀"}',
    "[true,false,null,{},[]]",
    '"root"',
    "1e999",
    "-0",
    "true",
    "false",
    "null",
  ])("preserves every data-bearing token: %s", (input) => {
    for (const indentation of [2, 4] as const) {
      const result = formatJson(input, indentation);
      expect(result.status).toBe("success");
      if (result.status !== "success") return;
      expect(tokens(result.output)).toEqual(tokens(input));
      expect(formatJson(result.output, indentation)).toEqual(result);
    }
  });

  it("uses selected spaces, normalises only insignificant CRLF and removes boundary whitespace", () => {
    expect(formatJson(' \r\n {"a": [1,2]}\r\n')).toEqual({
      status: "success",
      output: '{\n  "a": [\n    1,\n    2\n  ]\n}',
    });
    expect(formatJson('{\r\n    "a": "\\r\\n"\r\n}', 4)).toEqual({
      status: "success",
      output: '{\n    "a": "\\r\\n"\n}',
    });
  });

  it.each([
    "",
    "   ",
    '{"id":1,}',
    "//comment\n{}",
    "{/*comment*/}",
    "{} {}",
    "[1",
    "01",
    "NaN",
    '"unterminated',
    '{"x":"a\nb"}',
  ])(
    "rejects the entire invalid document without partial output: %s",
    (input) => {
      expect(formatJson(input)).toMatchObject({
        status: "error",
        code: "syntax",
        offset: expect.any(Number),
      });
      expect(formatJson(input)).not.toHaveProperty("output");
    },
  );

  it("bounds input by UTF-8 bytes, not code units", () => {
    const exact = '"' + "é".repeat((JSON_LIMITS.input - 2) / 2) + '"';
    expect(formatJson(exact).status).toBe("success");
    expect(formatJson(exact + " ")).toEqual({
      status: "error",
      code: "input-limit",
    });
  });

  it("preflights nesting without recursion or counting braces inside strings", () => {
    expect(formatJson("[".repeat(128) + '"{["' + "]".repeat(128)).status).toBe(
      "success",
    );
    expect(formatJson("[".repeat(129) + "0" + "]".repeat(129))).toEqual({
      status: "error",
      code: "depth-limit",
    });
    expect(formatJson("[".repeat(100_000))).toEqual({
      status: "error",
      code: "depth-limit",
    });
  });

  it.each([49, 50, 51, 99, 100, 101, 127, 128])(
    "formats depth %i across former indentation-cache boundaries",
    (depth) => {
      const input = "[".repeat(depth) + "0" + "]".repeat(depth);
      for (const indentation of [2, 4] as const) {
        const result = formatJson(input, indentation);
        expect(result.status).toBe("success");
        if (result.status !== "success") return;
        expect(tokens(result.output)).toEqual(tokens(input));
        expect(result.output).not.toContain("undefined");
        expect(formatJson(result.output, indentation)).toEqual(result);
      }
    },
  );

  it("rejects expansion before joining a result over the output cap", () => {
    const input =
      "[".repeat(127) + "[" + "0,".repeat(20_000) + "0" + "]".repeat(128);
    expect(formatJson(input, 4)).toEqual({
      status: "error",
      code: "output-limit",
    });
  });

  it("accepts exactly the output byte limit and rejects the next byte", () => {
    const base = "[".repeat(128) + "0,".repeat(15000) + '""' + "]".repeat(128);
    const baseline = formatJson(base, 4);
    expect(baseline.status).toBe("success");
    if (baseline.status !== "success") return;
    const padding = JSON_LIMITS.output - baseline.output.length;
    expect(padding).toBeGreaterThan(0);
    const exact = base.replace('""', '"' + "x".repeat(padding) + '"');
    expect(exact.length).toBeLessThan(JSON_LIMITS.input);
    const result = formatJson(exact, 4);
    expect(result.status).toBe("success");
    if (result.status === "success")
      expect(result.output.length).toBe(JSON_LIMITS.output);
    expect(
      formatJson(base.replace('""', '"' + "x".repeat(padding + 1) + '"'), 4),
    ).toEqual({ status: "error", code: "output-limit" });
  });
});

import { describe, expect, it } from "vitest";
import { processJsonRequest } from "./worker-protocol";

describe("formatter worker boundary", () => {
  it("dispatches minification with exact output and bounded syntax diagnostics", () => {
    expect(
      processJsonRequest({
        id: 1,
        operation: "json-minify",
        input: '{ "id":9007199254740993, "s":"a b" }',
      }),
    ).toEqual({
      id: 1,
      operation: "json-minify",
      status: "success",
      output: '{"id":9007199254740993,"s":"a b"}',
    });
    expect(
      processJsonRequest({
        id: 2,
        operation: "json-minify",
        input: "//private",
      }),
    ).toEqual({
      id: 2,
      operation: "json-minify",
      status: "error",
      diagnostic: { code: "syntax", offset: 0 },
    });
  });
  it("acknowledges validation without returning input or a transformed document", () => {
    expect(
      processJsonRequest({ id: 1, operation: "json-validate", input: "true" }),
    ).toEqual({
      id: 1,
      operation: "json-validate",
      status: "success",
      output: "",
    });
    expect(
      processJsonRequest({
        id: 2,
        operation: "json-validate",
        input: "//private",
      }),
    ).toEqual({
      id: 2,
      operation: "json-validate",
      status: "error",
      diagnostic: { code: "syntax", offset: 0 },
    });
  });
  it.each([2, 4])(
    "accepts only explicit indentation operation %i",
    (indentation) => {
      const result = processJsonRequest({
        id: 1,
        operation: `json-format-${indentation}`,
        input: '{"id":9007199254740993}',
      });
      expect(result).toEqual({
        id: 1,
        operation: `json-format-${indentation}`,
        status: "success",
        output: "{\n" + " ".repeat(indentation) + '"id": 9007199254740993\n}',
      });
    },
  );
  it.each([
    null,
    [],
    {},
    { id: "1", input: "{}" },
    { id: 0, input: "{}" },
    { id: 1, input: {} },
  ])("ignores malformed requests: %j", (value) => {
    expect(processJsonRequest(value)).toBeUndefined();
  });
  it("returns only bounded metadata for invalid input and generic unsupported-operation errors", () => {
    expect(
      processJsonRequest({
        id: 2,
        operation: "json-format-2",
        input: "PRIVATE_INVALID",
      }),
    ).toEqual({
      id: 2,
      operation: "json-format-2",
      status: "error",
      diagnostic: { code: "syntax", offset: 0 },
    });
    expect(
      processJsonRequest({
        id: 2,
        operation: "unexpected",
        input: "PRIVATE_INVALID",
      }),
    ).toEqual({ id: 2, operation: "unexpected", status: "error" });
  });
});

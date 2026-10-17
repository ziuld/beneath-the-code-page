import { describe, expect, it } from "vitest";
import { processJsonRequest } from "./worker-protocol";

describe("formatter worker boundary", () => {
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
  it("returns only a generic error for invalid or unsupported operations", () => {
    for (const operation of ["json-format-2", "unexpected"])
      expect(
        processJsonRequest({ id: 2, operation, input: "PRIVATE_INVALID" }),
      ).toEqual({ id: 2, operation, status: "error" });
  });
});

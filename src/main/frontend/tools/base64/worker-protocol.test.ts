import { expect, it } from "vitest";
import { processBase64Request } from "./worker-protocol";

it("bounds the Base64 operation envelope and never returns payload diagnostics", () => {
  for (const value of [
    null,
    [],
    {},
    { id: 0, operation: "base64-encode", input: "x" },
    { id: 1, operation: "base64-encode", input: {} },
  ])
    expect(processBase64Request(value)).toBeUndefined();
  expect(
    processBase64Request({ id: 1, operation: "base64-encode", input: "café" }),
  ).toEqual({
    id: 1,
    operation: "base64-encode",
    status: "success",
    output: "Y2Fmw6k=",
  });
  expect(
    processBase64Request({
      id: 2,
      operation: "base64-decode",
      input: "Y2Fmw6k=",
    }),
  ).toEqual({
    id: 2,
    operation: "base64-decode",
    status: "success",
    output: "café",
  });
  expect(
    processBase64Request({
      id: 3,
      operation: "base64-file",
      input: "PRIVATE_PAYLOAD",
    }),
  ).toEqual({ id: 3, operation: "base64-file", status: "error" });
  expect(
    processBase64Request({
      id: 4,
      operation: "base64-decode",
      input: "PRIVATE_INVALID_%%%",
    }),
  ).toEqual({
    id: 4,
    operation: "base64-decode",
    status: "error",
    diagnostic: { code: "syntax", offset: 0 },
  });
});

import { BASE64_LIMITS } from "./algorithms/codec";
import { INPUT_BYTES, OUTPUT_BYTES } from "../../platform/text-budget";
it("keeps pure codec limits aligned with the worker budget", () => {
  expect(BASE64_LIMITS).toEqual({ input: INPUT_BYTES, output: OUTPUT_BYTES });
});

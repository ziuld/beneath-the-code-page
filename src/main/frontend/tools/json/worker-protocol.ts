import { formatJson } from "./algorithms/formatter";
import { validateJson } from "./algorithms/validation";
import { minifyJson } from "./algorithms/minifier";

/** No arbitrary operations, exception text or payload-bearing diagnostic messages. */
export function processJsonRequest(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return undefined;
  const request = value as Record<string, unknown>;
  if (
    !Number.isSafeInteger(request.id) ||
    (request.id as number) < 1 ||
    typeof request.input !== "string"
  )
    return undefined;
  const { id, operation, input } = request;
  if (
    operation !== "json-format-2" &&
    operation !== "json-format-4" &&
    operation !== "json-validate" &&
    operation !== "json-minify"
  )
    return { id, operation, status: "error" };
  const result =
    operation === "json-validate"
      ? validateJson(input)
      : operation === "json-minify"
        ? minifyJson(input)
        : formatJson(input, operation === "json-format-4" ? 4 : 2);
  return result.status === "success"
    ? {
        id,
        operation,
        status: "success",
        output: "output" in result ? result.output : "",
      }
    : {
        id,
        operation,
        status: "error",
        diagnostic: {
          code: result.code,
          ...(result.offset === undefined ? {} : { offset: result.offset }),
        },
      };
}

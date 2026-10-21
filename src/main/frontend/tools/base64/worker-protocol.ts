import { convertBase64 } from "./algorithms/codec";

/** Return safe diagnostic codes only, never exception/payload text. */
export function processBase64Request(value: unknown) {
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
  if (operation !== "base64-encode" && operation !== "base64-decode")
    return { id, operation, status: "error" };
  const result = convertBase64(
    input,
    operation === "base64-encode" ? "encode" : "decode",
  );
  if (result.status === "success")
    return { id, operation, status: "success", output: result.output };
  return {
    id,
    operation,
    status: "error",
    diagnostic:
      result.code === "input-limit" || result.code === "output-limit"
        ? { code: result.code }
        : { code: "syntax", offset: 0 },
  };
}

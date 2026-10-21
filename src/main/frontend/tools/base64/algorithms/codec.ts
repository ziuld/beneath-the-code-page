export const BASE64_LIMITS = { input: 1024 * 1024, output: 8 * 1024 * 1024 };

export type Base64Result =
  | { status: "success"; output: string }
  | {
      status: "error";
      code:
        | "input-limit"
        | "output-limit"
        | "invalid-base64"
        | "invalid-utf8"
        | "invalid-unicode";
    };
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** Standard canonical padded Base64, text only. Limits are checked before expansion. */
export function convertBase64(
  input: string,
  mode: "encode" | "decode",
  outputLimit = BASE64_LIMITS.output,
): Base64Result {
  if (input.length > BASE64_LIMITS.input)
    return { status: "error", code: "input-limit" };
  let inputBytes = 0;
  for (const character of input) {
    const point = character.codePointAt(0)!;
    inputBytes +=
      point < 0x80 ? 1 : point < 0x800 ? 2 : point < 0x10000 ? 3 : 4;
    if (inputBytes > BASE64_LIMITS.input)
      return { status: "error", code: "input-limit" };
  }
  if (mode === "encode") {
    for (let i = 0; i < input.length; i++) {
      const unit = input.charCodeAt(i);
      if (unit >= 0xd800 && unit <= 0xdbff) {
        const next = input.charCodeAt(++i);
        if (!(next >= 0xdc00 && next <= 0xdfff))
          return { status: "error", code: "invalid-unicode" };
      } else if (unit >= 0xdc00 && unit <= 0xdfff)
        return { status: "error", code: "invalid-unicode" };
    }
    const bytes = new TextEncoder().encode(input);
    if (4 * Math.ceil(bytes.length / 3) > outputLimit)
      return { status: "error", code: "output-limit" };
    const chunks: string[] = [];
    for (let i = 0; i < bytes.length; i += 16384)
      chunks.push(String.fromCharCode(...bytes.subarray(i, i + 16384)));
    return { status: "success", output: btoa(chunks.join("")) };
  }
  if (input.length % 4 !== 0)
    return { status: "error", code: "invalid-base64" };
  const padding = input.endsWith("==") ? 2 : input.endsWith("=") ? 1 : 0;
  const end = input.length - padding;
  for (let i = 0; i < end; i++)
    if (alphabet.indexOf(input[i]!) < 0)
      return { status: "error", code: "invalid-base64" };
  // Canonical unused bits must be zero, not silently discarded by atob.
  if (
    (padding === 2 && (alphabet.indexOf(input[end - 1]!) & 15) !== 0) ||
    (padding === 1 && (alphabet.indexOf(input[end - 1]!) & 3) !== 0)
  )
    return { status: "error", code: "invalid-base64" };
  const byteCount = (input.length / 4) * 3 - padding;
  if (byteCount > outputLimit) return { status: "error", code: "output-limit" };
  try {
    const bytes = Uint8Array.from(atob(input), (char) => char.charCodeAt(0));
    return {
      status: "success",
      output: new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
        bytes,
      ),
    };
  } catch {
    return { status: "error", code: "invalid-utf8" };
  }
}

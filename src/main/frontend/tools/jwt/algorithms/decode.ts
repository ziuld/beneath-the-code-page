import { createScanner, SyntaxKind } from "jsonc-parser";

export const JWT_LIMITS = { input: 16 * 1024, depth: 32 };
export type JwtFailureCode =
  | "input-limit"
  | "depth-limit"
  | "format"
  | "jwe"
  | "encoding"
  | "utf8"
  | "json"
  | "unsupported";
export type JwtResult =
  | { status: "success"; header: string; payload: string }
  | { status: "error"; code: JwtFailureCode };

function decodeSegment(segment: string): string {
  if (!/^[A-Za-z0-9_-]*$/.test(segment) || segment.length % 4 === 1)
    throw new Error("encoding");
  const binary = atob(segment.replaceAll("-", "+").replaceAll("_", "/"));
  if (
    btoa(binary)
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replace(/=+$/, "") !== segment
  )
    throw new Error("encoding");
  return binary;
}

function jsonObject(binary: string): {
  text: string;
  value: Record<string, unknown>;
} {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
      Uint8Array.from(binary, (char) => char.charCodeAt(0)),
    );
  } catch {
    throw new Error("utf8");
  }
  // Bound nesting before invoking the native JSON parser. Strings/escapes are
  // scanned as tokens, so braces inside claim strings do not count as nesting.
  const scanner = createScanner(text);
  let depth = 0;
  for (
    let token = scanner.scan();
    token !== SyntaxKind.EOF;
    token = scanner.scan()
  ) {
    if (
      token === SyntaxKind.OpenBraceToken ||
      token === SyntaxKind.OpenBracketToken
    ) {
      if (++depth > JWT_LIMITS.depth) throw new Error("depth-limit");
    } else if (
      token === SyntaxKind.CloseBraceToken ||
      token === SyntaxKind.CloseBracketToken
    )
      depth--;
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error("json");
  }
  if (value === null || typeof value !== "object" || Array.isArray(value))
    throw new Error("json");
  return { text, value: value as Record<string, unknown> };
}

/** Inspection only: never verify signatures, interpret claims or reserialise JSON. */
export function decodeJwt(input: string): JwtResult {
  if (input.length > JWT_LIMITS.input)
    return { status: "error", code: "input-limit" };
  const segments = input.split(".");
  if (segments.length === 5) return { status: "error", code: "jwe" };
  if (segments.length !== 3 || !segments[0] || !segments[1])
    return { status: "error", code: "format" };
  try {
    const header = jsonObject(decodeSegment(segments[0]));
    if (Object.hasOwn(header.value, "b64") && header.value.b64 !== true)
      return { status: "error", code: "unsupported" };
    const payload = jsonObject(decodeSegment(segments[1]));
    decodeSegment(segments[2]!); // Signature is binary, not UTF-8; no verification.
    return { status: "success", header: header.text, payload: payload.text };
  } catch (error) {
    const code = error instanceof Error ? error.message : "encoding";
    return {
      status: "error",
      code: ["depth-limit", "utf8", "json"].includes(code)
        ? (code as JwtFailureCode)
        : "encoding",
    };
  }
}

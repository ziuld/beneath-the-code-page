import { createScanner, SyntaxKind } from "jsonc-parser";
import {
  bytes,
  JSON_LIMITS,
  validateJson,
  type JsonFailure,
} from "./validation";

export { JSON_LIMITS, type JsonFailure } from "./validation";
export type JsonResult = { status: "success"; output: string } | JsonFailure;

export function formatJson(input: string, indentation: 2 | 4 = 2): JsonResult {
  const validation = validateJson(input);
  if (validation.status === "error") return validation;

  // Only gaps between validated original tokens are replaced. Never serialise
  // decoded values or use the dependency formatter's broken indentation cache.
  const tokens = createScanner(input, true);
  const parts: string[] = [];
  let previous = SyntaxKind.EOF;
  let depth = 0;
  let remaining = JSON_LIMITS.output;
  const append = (part: string) => {
    remaining -= bytes(part, remaining);
    if (remaining < 0) return false;
    parts.push(part);
    return true;
  };
  for (
    let token = tokens.scan();
    token !== SyntaxKind.EOF;
    token = tokens.scan()
  ) {
    const closing =
      token === SyntaxKind.CloseBraceToken ||
      token === SyntaxKind.CloseBracketToken;
    const empty =
      (previous === SyntaxKind.OpenBraceToken &&
        token === SyntaxKind.CloseBraceToken) ||
      (previous === SyntaxKind.OpenBracketToken &&
        token === SyntaxKind.CloseBracketToken);
    if (closing) depth--;
    let gap = "";
    if (
      (closing && !empty) ||
      (!closing &&
        (previous === SyntaxKind.OpenBraceToken ||
          previous === SyntaxKind.OpenBracketToken ||
          previous === SyntaxKind.CommaToken))
    )
      gap = "\n" + " ".repeat(depth * indentation);
    else if (previous === SyntaxKind.ColonToken) gap = " ";
    const raw = input.slice(
      tokens.getTokenOffset(),
      tokens.getTokenOffset() + tokens.getTokenLength(),
    );
    if (!append(gap) || !append(raw))
      return { status: "error", code: "output-limit" };
    if (
      token === SyntaxKind.OpenBraceToken ||
      token === SyntaxKind.OpenBracketToken
    )
      depth++;
    previous = token;
  }
  return { status: "success", output: parts.join("") };
}

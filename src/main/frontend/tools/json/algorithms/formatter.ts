import { createScanner, ScanError, SyntaxKind, visit } from "jsonc-parser";

export const JSON_LIMITS = {
  input: 1024 * 1024,
  output: 8 * 1024 * 1024,
  depth: 128,
};
export type JsonFailure = {
  status: "error";
  code: "syntax" | "input-limit" | "depth-limit" | "output-limit";
  offset?: number;
};
export type JsonResult = { status: "success"; output: string } | JsonFailure;

/** Bounded UTF-8 counting, including unpaired UTF-16 surrogates as replacement bytes. */
function bytes(text: string, limit: number): number {
  let count = 0;
  for (const character of text) {
    const point = character.codePointAt(0)!;
    count += point < 0x80 ? 1 : point < 0x800 ? 2 : point < 0x10000 ? 3 : 4;
    if (count > limit) break;
  }
  return count;
}

export function formatJson(input: string, indentation: 2 | 4 = 2): JsonResult {
  if (
    input.length > JSON_LIMITS.input ||
    bytes(input, JSON_LIMITS.input) > JSON_LIMITS.input
  )
    return { status: "error", code: "input-limit" };
  const scanner = createScanner(input);
  let depth = 0;
  for (
    let token = scanner.scan();
    token !== SyntaxKind.EOF;
    token = scanner.scan()
  ) {
    if (scanner.getTokenError() !== ScanError.None)
      return {
        status: "error",
        code: "syntax",
        offset: scanner.getTokenOffset(),
      };
    if (
      token === SyntaxKind.OpenBraceToken ||
      token === SyntaxKind.OpenBracketToken
    ) {
      if (++depth > JSON_LIMITS.depth)
        return { status: "error", code: "depth-limit" };
    } else if (
      token === SyntaxKind.CloseBraceToken ||
      token === SyntaxKind.CloseBracketToken
    )
      depth--;
  }
  let failure: JsonFailure | undefined;
  visit(
    input,
    {
      onError: (_code, offset) => {
        failure ??= { status: "error", code: "syntax", offset };
      },
    },
    {
      disallowComments: true,
      allowTrailingComma: false,
      allowEmptyContent: false,
    },
  );
  if (failure) return failure;

  // Only gaps between validated original tokens are replaced. Never serialise
  // decoded values or use the dependency formatter's broken indentation cache.
  const tokens = createScanner(input, true);
  const parts: string[] = [];
  let previous = SyntaxKind.EOF;
  depth = 0;
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

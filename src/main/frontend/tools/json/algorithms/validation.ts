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
export type JsonValidation = { status: "success" } | JsonFailure;

/** Bounded UTF-8 counting, including unpaired UTF-16 surrogates as replacement bytes. */
export function bytes(text: string, limit: number): number {
  let count = 0;
  for (const character of text) {
    const point = character.codePointAt(0)!;
    count += point < 0x80 ? 1 : point < 0x800 ? 2 : point < 0x10000 ? 3 : 4;
    if (count > limit) break;
  }
  return count;
}

/** Strict full-input validation independent of any output transformation. */
export function validateJson(input: string): JsonValidation {
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
        offset:
          scanner.getTokenError() === ScanError.UnexpectedEndOfString ||
          scanner.getTokenError() === ScanError.UnexpectedEndOfNumber
            ? input.length
            : scanner.getTokenOffset(),
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
  return failure ?? { status: "success" };
}

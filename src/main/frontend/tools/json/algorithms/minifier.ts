import { createScanner, SyntaxKind } from "jsonc-parser";
import { validateJson, type JsonFailure } from "./validation";

/** Compact original tokens, never decoded values or whitespace inside strings. */
export function minifyJson(
  input: string,
): { status: "success"; output: string } | JsonFailure {
  const validation = validateJson(input);
  if (validation.status === "error") return validation;
  const scanner = createScanner(input, true);
  const parts: string[] = [];
  for (
    let token = scanner.scan();
    token !== SyntaxKind.EOF;
    token = scanner.scan()
  ) {
    parts.push(
      input.slice(
        scanner.getTokenOffset(),
        scanner.getTokenOffset() + scanner.getTokenLength(),
      ),
    );
  }
  // Removing trivia cannot grow the validated input beyond its 1 MiB budget.
  return { status: "success", output: parts.join("") };
}

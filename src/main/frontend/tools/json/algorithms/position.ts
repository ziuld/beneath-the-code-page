/** One-based code-point columns; CRLF is one line break, including EOF positions. */
export function sourcePosition(input: string, offset: number) {
  let line = 1;
  let column = 1;
  for (let index = 0; index < offset; index++) {
    if (input[index] === "\r") {
      if (input[index + 1] === "\n" && index + 1 < offset) index++;
      line++;
      column = 1;
    } else if (input[index] === "\n") {
      line++;
      column = 1;
    } else {
      if (input.codePointAt(index)! > 0xffff && index + 1 < offset) index++;
      column++;
    }
  }
  return { line, column };
}

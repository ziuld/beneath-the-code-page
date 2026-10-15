export const INPUT_BYTES = 1024 * 1024;
export const OUTPUT_BYTES = 8 * INPUT_BYTES;

/** UTF-8 count with early exit and surrogate pairs preserved across chunks. */
export function withinUtf8Budget(
  chunks: Iterable<string>,
  limit: number,
): boolean {
  let bytes = 0;
  let highSurrogate = false;
  for (const chunk of chunks) {
    for (let i = 0; i < chunk.length; i++) {
      const code = chunk.charCodeAt(i);
      if (highSurrogate) {
        highSurrogate = false;
        if (code >= 0xdc00 && code <= 0xdfff) {
          bytes += 4;
          if (bytes > limit) return false;
          continue;
        }
        bytes += 3;
      }
      if (code >= 0xd800 && code <= 0xdbff) highSurrogate = true;
      else bytes += code < 0x80 ? 1 : code < 0x800 ? 2 : 3;
      if (bytes > limit) return false;
    }
  }
  return bytes + (highSurrogate ? 3 : 0) <= limit;
}

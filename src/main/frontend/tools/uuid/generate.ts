export function generateBatch(count: number): string {
  if (!Number.isInteger(count) || count < 1 || count > 100)
    throw new Error("limit");
  if (typeof globalThis.crypto?.randomUUID !== "function")
    throw new Error("unavailable");
  return Array.from({ length: count }, () => crypto.randomUUID()).join("\n");
}

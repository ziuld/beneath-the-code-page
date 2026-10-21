import { describe, expect, it } from "vitest";
import { convertBase64 } from "./algorithms/codec";
import { INPUT_BYTES, OUTPUT_BYTES } from "../../platform/text-budget";

describe("strict UTF-8 Base64", () => {
  for (const text of [
    "",
    "café",
    "漢字 😀",
    "e\u0301",
    "\uFEFFBOM",
    "a\r\nb\n",
    "\0",
    "é😀\uFEFF\0",
  ]) {
    it(`round-trips ${JSON.stringify(text)} without normalization`, () => {
      const expected = Buffer.from(text, "utf8").toString("base64");
      expect(convertBase64(text, "encode")).toEqual({
        status: "success",
        output: expected,
      });
      expect(convertBase64(expected, "decode")).toEqual({
        status: "success",
        output: text,
      });
    });
  }
  for (const input of [
    "%%%",
    "YQ",
    "YQ=",
    "YQ===",
    "====",
    "A===",
    "=AAA",
    "AA=A",
    "YQ==\n",
    " YQ==",
    "Y Q=",
    "-_8=",
    "éAAA",
    "Zh==",
    "Zm9=",
    "AAA=AAAA",
  ]) {
    it(`rejects noncanonical alphabet/length/padding/bits ${JSON.stringify(input)}`, () => {
      expect(convertBase64(input, "decode")).toEqual({
        status: "error",
        code: "invalid-base64",
      });
    });
  }
  for (const bytes of [
    [0xff],
    [0x80],
    [0xc0, 0xaf],
    [0xed, 0xa0, 0x80],
    [0xe2, 0x82],
  ]) {
    it(`rejects invalid UTF-8 bytes ${bytes.join(",")}`, () => {
      expect(
        convertBase64(Buffer.from(bytes).toString("base64"), "decode"),
      ).toEqual({ status: "error", code: "invalid-utf8" });
    });
  }
  for (const text of [
    "\ud800",
    "\udc00",
    "a\ud800b",
    "\ud800\ud800",
    "😀\udc00",
  ]) {
    it("rejects unpaired surrogates without replacement", () => {
      expect(convertBase64(text, "encode")).toEqual({
        status: "error",
        code: "invalid-unicode",
      });
    });
  }
  it("accepts exact 1MiB UTF-8 input and rejects one extra byte", () => {
    const input = "é".repeat(INPUT_BYTES / 2);
    const result = convertBase64(input, "encode");
    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.output).toBe(Buffer.from(input).toString("base64"));
      expect(result.output.length).toBeLessThanOrEqual(OUTPUT_BYTES);
    }
    expect(convertBase64(input + "a", "encode")).toEqual({
      status: "error",
      code: "input-limit",
    });
    expect(convertBase64("A".repeat(INPUT_BYTES + 4), "decode")).toEqual({
      status: "error",
      code: "input-limit",
    });
  });
  it("checks output preflight at exact encoded and decoded byte limits", () => {
    expect(convertBase64("abc", "encode", 3)).toEqual({
      status: "error",
      code: "output-limit",
    });
    expect(convertBase64("abc", "encode", 4)).toEqual({
      status: "success",
      output: "YWJj",
    });
    expect(convertBase64("YWJj", "decode", 2)).toEqual({
      status: "error",
      code: "output-limit",
    });
    expect(convertBase64("YWJj", "decode", 3)).toEqual({
      status: "success",
      output: "abc",
    });
    expect(convertBase64("", "encode", 0)).toEqual({
      status: "success",
      output: "",
    });
    expect(convertBase64("", "decode", 0)).toEqual({
      status: "success",
      output: "",
    });
  });
});

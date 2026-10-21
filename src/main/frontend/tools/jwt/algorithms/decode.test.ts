import { expect, test, vi } from "vitest";
import { decodeJwt, JWT_LIMITS } from "./decode";

const encode = (value: string) => Buffer.from(value).toString("base64url");
const token = (
  payload: string,
  header = '{"alg":"HS256","typ":"JWT"}',
  signature = "AP8",
) => `${encode(header)}.${encode(payload)}.${signature}`;

test("F10 AC01: preserve exact JSON, Unicode, large numbers, duplicate keys and HTML-like claims", () => {
  const header = '{"alg":"HS256","jku":"https://synthetic.invalid/keys"}';
  const payload =
    '{"sub":"café 😀 <script>alert(1)</script>","n":9007199254740993,"exp":1e999,"x":1,"x":2,"__proto__":{"ok":false}}';
  expect(decodeJwt(token(payload, header))).toEqual({
    status: "success",
    header,
    payload,
  });
  expect({}).not.toHaveProperty("ok");
});

test.each([
  "{}",
  '{"exp":0}',
  '{"exp":9999999999999}',
  '{"exp":"yesterday"}',
  '{"exp":null}',
  '{"exp":{"nested":true}}',
])("F10: exp is untrusted, uninterpreted data: %s", (payload) => {
  expect(decodeJwt(token(payload))).toMatchObject({
    status: "success",
    payload,
  });
});

test("F10: empty signature is inspectable but never authenticated", () => {
  expect(decodeJwt(token("{}", '{"alg":"none"}', ""))).toMatchObject({
    status: "success",
  });
});

test.each(["a.b.c.d.e", "...."])(
  "F10 AC02: report five-part JWE: %s",
  (input) => {
    expect(decodeJwt(input)).toEqual({ status: "error", code: "jwe" });
  },
);

test.each(["", "a", "a.b", "a.b.c.d", ".e30.AP8", "e30..AP8"])(
  "F10: reject malformed or detached compact form: %s",
  (input) => {
    expect(decodeJwt(input)).toEqual({ status: "error", code: "format" });
  },
);

test.each(["Z", "Zh", "%%%", "e30=", "+w", "/w", "e30\n"])(
  "F10: reject noncanonical base64url in each segment: %s",
  (segment) => {
    for (const input of [
      `${segment}.e30.AP8`,
      `e30.${segment}.AP8`,
      `e30.e30.${segment}`,
    ])
      expect(decodeJwt(input)).toEqual({ status: "error", code: "encoding" });
  },
);

test.each(["_w", "4oI", "wK8"])(
  "F10: reject invalid UTF-8 in header/payload: %s",
  (segment) => {
    expect(decodeJwt(`${segment}.e30.AP8`)).toEqual({
      status: "error",
      code: "utf8",
    });
    expect(decodeJwt(`e30.${segment}.AP8`)).toEqual({
      status: "error",
      code: "utf8",
    });
  },
);

test.each([
  "null",
  "[]",
  "true",
  "123",
  '"text"',
  '{"x":}',
  '{"x":1,}',
  "{/* comment */}",
  "\uFEFF{}",
  "{} {}",
])("F10: require complete strict JSON objects: %s", (content) => {
  expect(decodeJwt(token(content))).toEqual({ status: "error", code: "json" });
  expect(decodeJwt(token("{}", content))).toEqual({
    status: "error",
    code: "json",
  });
});

test("F10: reject the unencoded-payload option", () => {
  expect(decodeJwt(token("{}", '{"alg":"HS256","b64":false}'))).toEqual({
    status: "error",
    code: "unsupported",
  });
  expect(decodeJwt(token("{}", '{"b64":true}'))).toMatchObject({
    status: "success",
  });
});

test("F10: depth boundary checked before native JSON.parse, including escaped braces", () => {
  const nested = (depth: number) =>
    '{"x":'.repeat(depth) + JSON.stringify('{"[') + "}".repeat(depth);
  expect(decodeJwt(token(nested(JWT_LIMITS.depth)))).toMatchObject({
    status: "success",
  });
  const parse = vi.spyOn(JSON, "parse");
  try {
    expect(decodeJwt(token("{}", nested(JWT_LIMITS.depth + 1)))).toEqual({
      status: "error",
      code: "depth-limit",
    });
    expect(parse).not.toHaveBeenCalled();
  } finally {
    parse.mockRestore();
  }
});

test("F10: exact 16 KiB input accepted, next byte rejected before decoding", () => {
  const small = token("{}");
  const exact = small + "A".repeat(JWT_LIMITS.input - small.length);
  expect(exact.length).toBe(JWT_LIMITS.input);
  expect(decodeJwt(exact)).toMatchObject({ status: "success" });
  const decode = vi.spyOn(JSON, "parse");
  try {
    expect(decodeJwt(exact + "A")).toEqual({
      status: "error",
      code: "input-limit",
    });
    expect(decode).not.toHaveBeenCalled();
  } finally {
    decode.mockRestore();
  }
});

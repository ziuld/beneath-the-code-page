# JWT Decoder

`/tools/jwt` inspects three-part compact JWTs locally, with native textarea and
Decode/Clear controls, shared styles and EN/ES/FR messages. The permanent notice
states that the signature, issuer and all claims (including exp) are unverified.
There is no token-validity, authentication, authorisation or expiration verdict.

The parser accepts at most 16 KiB of ASCII compact input and 32 JSON nesting
levels, checked before native JSON.parse. It requires canonical unpadded
base64url segments and UTF-8 JSON objects for header and claims. It rejects
five-part encrypted JWE, detached/empty payloads and the unencoded-payload option.
An empty signature is inspectable and remains unverified. Algorithm names, key
URLs, exp values and other claims are data only. No keys are fetched.

Decoded JSON is displayed as escaped original text, preserving numeric notation,
large numbers, duplicates and escapes. Native JSON.parse checks syntax/object
shape; its parsed numeric values are never rendered or used for claim decisions.
The existing jsonc-parser scanner bounds nesting before parsing. No dependency,
worker, editor or framework was added. Output is bounded by decoded input size.
The limit bounds processing, not the native textarea's editable text buffer.

Edits/errors clear previous output; Clear empties input/output and focuses input.
Pagehide clears token/output. No tool form, request, URL payload, persistence or
clipboard operation. No-JS/lazy-load failures retain the disclaimer and disabled
controls with a translated explanation. Never use real tokens as test fixtures.

Format references: [JWS compact serialization](https://www.rfc-editor.org/rfc/rfc7515#section-3.1),
[JWT claims](https://www.rfc-editor.org/rfc/rfc7519#section-3),
[unencoded payload exclusion for JWT](https://www.rfc-editor.org/rfc/rfc7797#section-1).
Acceptance: [F10 evidence](../../harness/evidence/F10-jwt.md).

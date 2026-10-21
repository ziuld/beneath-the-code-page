# UTF-8 Base64 — F08

Open `/tools/base64?lang=en` (also ES/FR), choose Encode or Decode, enter text and
run the operation. Example: `café` → `Y2Fmw6k=` → `café`.

The codec uses canonical standard Base64 with padding where required. Empty input
is valid. Unicode, combining characters, BOM and pasted CRLF/LF are preserved;
unpaired surrogates, invalid alphabet/length/padding/unused bits and non-UTF-8
decoded bytes produce localised errors. Whitespace is significant and rejected
in encoded input; this text tool uses the standard alphabet rather than Base64URL.

Processing uses the existing bounded worker:1MiB UTF-8 input,8MiB maximum output,
2s deadline and one active job. Output size is checked before output expansion/allocation.
Editing input or switching mode invalidates the current result; previous output
remains explicitly stale and cannot be copied as current. Copy requires the
button, including for an empty successful result. Clear erases editor history and
results; Cancel/timeout/failure keep input available for retry.

Payloads stay in page/worker memory. Native language POST contains only the
preference/CSRF/return-path fields; it does not submit editor content. No-JS or
failed lazy enhancement leaves controls disabled with an explanation. Keyboard
Escape then Tab exits the editor; the next Base64 control is Mode.

The existing JSON worker asset identity is retained for its manifest/CSP contract;
it handles a closed set of JSON and Base64 operations. The JSON adapter preserves
Validator’s acknowledgement-only/no-Copy behaviour. Shared result ownership is in
`platform/tool-session.ts`; the pure codec remains under `tools/base64/algorithms`.
No new framework, dependency, registry or server conversion endpoint was added.

Verification and limits: [F08 evidence](../../harness/evidence/F08-base64.md).
Chromium is the current required browser; Firefox/WebKit/Safari remain F19.

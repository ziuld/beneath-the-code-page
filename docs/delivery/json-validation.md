# JSON Validator — implementation in progress

F07-UH01 reuses the Formatter's strict full-input validation without generating
formatted output. `tools/json/algorithms/validation.ts` owns the extracted byte,
depth, scanner and parser checks; `formatJson` uses the same checks before its
existing token-gap writer. No parser/dependency or policy change.

The `json-validate` worker operation returns only a success acknowledgement with
`output: ""`, or existing safe diagnostic codes/offsets. The empty string is a
transport acknowledgement, not a document to display or copy. Valid input whose
pretty output would exceed 8 MiB can still validate within its input/depth limits.

Limits remain 1 MiB UTF-8 input, depth 128 and a two-second single-worker deadline.
Syntax-only validation accepts primitive roots and duplicate keys; it does not
perform JSON Schema validation or alter numbers/escapes/order. The existing worker
metadata and exact startup GET exception remain unchanged.

The development-branch page is `/tools/json-validator?lang=en` (also `es`/`fr`).
It uses the shared editor/session/worker, with Validate, Cancel and Clear. A valid
verdict has no output document or Copy action; edits invalidate prior verdicts.
Editor insertion feedback has its own status region so a rejected oversized edit
does not erase a matching validation verdict. Clear empties both feedback and
verdict/history and leaves the clipboard alone. No automatic processing is used.

GET/HEAD and native CSRF-protected language returns are exact-path allowlisted;
safe HTTP event logs use the bounded `json-validator` identity. The Tools index
still advertises only accepted Formatter. Shared message markup is resource-backed,
with no-JS explanations and unavailable controls before successful enhancement.

Clean Maven now passes166 frontend tests,204 Java cases (three explicit architecture
skips) and17 packaged integration tests. Chromium now passes94/94, including exact
full-document preservation at1 MiB, depth128 and controlled timeout/retry. The
large-document fixture uses the editor's explicit copy event into in-memory
DataTransfer rather than its virtualised DOM; no real clipboard read or application
change. Firefox also passes48/48. The owner reports all requested keyboard,
Clear/Back, narrow-layout, actual200%-zoom and EN/ES/FR checks pass; browser/version,
OS and viewport are unreported. Actual Ubuntu CI at0ca9f94 passes Java/clean build,
Chromium94/94 and Firefox48/48; WebKit44/48 fails four injected-failure/recovery
checks (lazy-script reload in three locales and retry after a busy-worker timeout).
Test-cache contamination is suspected, not proved; no runtime or test correction
applied. Catalogue promotion and closure remain pending. Review preview is on8082
with the reviewed local JAR; it is not a deployment or an acceptance observation.
Actual results belong in `harness/evidence/F07-UH01-json-validation.md`; this
document does not claim product acceptance. Verify keyboard Escape/Tab, Clear,
narrow layout, actual 200% browser zoom and EN/ES/FR before owner acceptance.

## Owner review when the verified build is ready

Run the reviewed packaged JAR on loopback, then open `/tools/json-validator?lang=en`
(repeat with `es` and `fr`). The route is directly available for review but remains
absent from the Tools index until accepted. Do not paste real secrets.

1. Validate `true`, an array and `{"id":9007199254740993,"id":-0}`. Check the
   translated valid verdict and unchanged input; no output document or Copy action.
2. Enter `{"id":1,}` and validate. Check the translated line/column error; edit it
   and confirm the old verdict is no longer current before validating again.
3. Use only the keyboard: editor Escape then Tab, Validate/Cancel/Clear, visible
   focus and reverse traversal. Clear must retain focus, discard undo history and
   leave the clipboard alone. Navigate away and Back: content must not reappear.
4. Check narrow layout and actual 200% browser zoom, readable controls/statuses and
   EN/ES/FR copy. Change the language through the native selector and confirm it
   returns to the same page without transferring input.

Record browser/version, OS, viewport, zoom and observations (or explicitly mark
unreported details). This walkthrough is not evidence that manual review passed;
screen-reader compatibility/manual speech testing remains excluded.

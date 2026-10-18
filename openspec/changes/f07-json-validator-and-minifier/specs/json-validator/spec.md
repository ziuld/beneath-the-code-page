# Spec Delta

## Purpose

Let visitors check complete strict JSON locally, receive a current localised verdict
and correct positioned syntax errors without rewriting or disclosing their input.

## ADDED Requirements

### Requirement: F07-UH01-R01 — Validate strict JSON without rewriting input

When a valid JSON document is validated, the validator SHALL report a localised valid status without changing input. It SHALL accept objects, arrays, strings, numbers, booleans and null, validate the entire document, and provide a syntax verdict rather than JSON Schema validation or a copyable output document.

#### Scenario: F07-UH01-AC01 — Validate a primitive root

- **GIVEN** the input is the JSON value `true`
- **WHEN** the developer validates it
- **THEN** the result is valid without rewriting the input

#### Scenario: Validate every root type without interpreting values

- **WHEN** complete valid objects, arrays, strings, numbers, booleans or null are validated
- **THEN** the input remains byte-for-byte unchanged and the current verdict is valid
- **AND** duplicate keys, large integers, negative zero, exponent spelling and escape spelling are not rewritten or rejected as schema violations
- **AND** validation does not produce a formatted/minified document or expose a Copy result action

### Requirement: F07-UH01-R02 — Reject non-strict JSON with safe locations

If a document contains JSON comments, then the validator SHALL report it as invalid JSON. It SHALL also reject empty input, trailing commas, incomplete or malformed syntax and extra root content, preserve input, and show a resource-backed diagnostic with a one-based line and Unicode-code-point column without excerpts or raw exception text.

#### Scenario: F07-UH01-AC02 — Reject comments

- **GIVEN** the document contains a line comment
- **WHEN** the developer validates it
- **THEN** the validator reports a syntax error with a location

#### Scenario: Reject the entire invalid document

- **WHEN** empty or whitespace-only input, block comments, trailing commas, incomplete tokens, malformed numbers or multiple roots are validated in EN, ES or FR
- **THEN** no valid verdict is published and the input is unchanged
- **AND** the diagnostic uses the active language and a stable error category rather than source content

#### Scenario: Locate CRLF, Unicode and end-of-input errors

- **WHEN** a syntax error follows CRLF or astral Unicode text, or occurs at end of input
- **THEN** CRLF counts as one line break, columns count Unicode code points and end-of-input identifies the insertion position after the final character

### Requirement: Keep validator verdicts current and processing bounded

The validator SHALL enforce 1 MiB UTF-8 input, depth 128, one active job and a two-second worker deadline. Accepted edits, retries, cancellation and exit SHALL invalidate prior verdicts and obsolete work. Clear SHALL remove active input, history and diagnostics without changing the clipboard. Failures SHALL retain accepted input and permit retry.

#### Scenario: Reject oversized edits without losing accepted input

- **GIVEN** accepted input has a matching valid or invalid verdict
- **WHEN** an insertion would exceed 1 MiB in UTF-8
- **THEN** it is rejected before expensive editor processing, with localised feedback
- **AND** accepted input and its matching verdict remain available; exactly the input byte limit is not rejected for size alone

#### Scenario: Bound nesting and recover from failure

- **WHEN** input exceeds 128 nested containers, processing reaches its two-second deadline or enhancement/worker loading fails
- **THEN** a translated depth-limit, timeout or unavailable/error status is shown without claiming a syntax verdict for unprocessed input
- **AND** accepted input is retained and a later processing retry is possible after a recoverable worker failure
- **AND** valid depth 128 is not rejected for depth alone

#### Scenario: Invalidate a verdict and ignore late work

- **GIVEN** validation is running or a current verdict exists
- **WHEN** input changes, another validation starts or Cancel is activated
- **THEN** the previous verdict is no longer represented as current and a superseded completion cannot update it
- **WHEN** Clear is activated or the page is left and restored with Back navigation
- **THEN** cleared/disposed input and diagnostics do not reappear through undo, history restoration or late callbacks
- **AND** Clear leaves predictable focus and the clipboard unchanged

### Requirement: Publish a private localised validator page

The application SHALL provide exact GET/HEAD `/tools/json-validator` with EN/ES/FR explanations, Validate/Cancel/Clear controls and current status. It SHALL retain restrictive document/worker policies, keyboard/visual usability and memory-only payload handling. No tool form, URL, request, log, cookie or persistent storage SHALL carry input or diagnostics.

#### Scenario: Use the validator with or without enhancement

- **WHEN** the page is opened in EN, ES or FR without JavaScript or its lazy module fails to load
- **THEN** translated explanations/navigation and the processing-unavailable notice remain visible
- **AND** controls do not imply successful validation and no input-submitting form exists
- **WHEN** enhancement succeeds and the editor is operated by keyboard, at narrow width or actual 200% browser zoom
- **THEN** labels, visible focus, Escape-then-Tab traversal, contrast and status feedback meet the retained quality criteria
- **AND** no screen-reader compatibility or manual speech-testing pass is claimed

#### Scenario: Retain exact route and language boundaries

- **WHEN** GET or HEAD is used on the published validator page
- **THEN** localised HTML retains no-store, accepted headers and no server session
- **WHEN** the language selector is submitted with a valid CSRF token
- **THEN** it returns to the exact allowlisted page without content or a `lang` query in the return target
- **AND** unlisted methods and unsafe or duplicate return targets remain denied or safely handled under the existing policy

#### Scenario: Verify privacy from cold loading through recovery

- **GIVEN** a fresh browser context with document and worker traffic observed and a unique synthetic input sentinel
- **WHEN** validation, syntax failure, retry, cancellation, replacement, Clear and page exit are exercised
- **THEN** input and diagnostics remain absent from request URLs, bodies and headers, storage, cookies and captured server logs
- **AND** after UI assets load, the only permitted operation-triggered requests are body-free GETs without query/fragment to exact build-known hashed worker scripts needed for startup/recovery
- **AND** script-looking input remains inert and relevant document/worker policy violations do not occur
- **AND** Home and the Tools index do not load editor/worker assets merely by being visited

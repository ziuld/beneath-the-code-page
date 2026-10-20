# Spec Delta

## Purpose

Let visitors compact complete strict JSON locally without changing tokens, then
deliberately copy the current result or clear the workspace in EN/ES/FR.

## ADDED Requirements

### Requirement: F07-UH02-R01 — Minify without changing tokens

When a valid JSON document is minified, the minifier SHALL preserve every non-whitespace token in order and remove only insignificant JSON whitespace. It SHALL validate the complete input first, preserve the original input, support every JSON root type and produce no leading/trailing whitespace or final newline.

#### Scenario: F07-UH02-AC01 — Preserve whitespace inside a string

- **GIVEN** the document contains a string whose value is `a b`
- **WHEN** the developer minifies the document
- **THEN** the space inside the string remains while insignificant whitespace is removed

#### Scenario: Preserve lexical fidelity and stable compact output

- **WHEN** objects, arrays or primitive roots containing `9007199254740993`, `-0`, `1.2300e+999`, duplicate keys, ordered members, Unicode escapes or escaped solidi are minified
- **THEN** token sequence and exact token spelling are unchanged, including whitespace inside strings
- **AND** only whitespace outside tokens is removed, input remains unchanged and minifying the result again yields identical output

### Requirement: F07-UH02-R02 — Refuse invalid input and invalidate previous output

If JSON is invalid, then the minifier SHALL refuse to publish a new successful output. It SHALL preserve input, display the same localised syntax categories and one-based Unicode-aware positions as the validator, and ensure any earlier result is visibly non-current and cannot be copied as the new result.

#### Scenario: F07-UH02-AC02 — Do not minify a broken document

- **GIVEN** a previous successful result exists and the input becomes invalid
- **WHEN** the developer requests minification
- **THEN** the old result is marked stale and cannot be copied as the new result

#### Scenario: Reject the entire document with consistent diagnostics

- **WHEN** empty/whitespace-only input, comments, trailing commas, malformed or incomplete syntax or extra root content are minified
- **THEN** no partial or current successful output is published and input is unchanged
- **AND** EN/ES/FR diagnostics contain safe categories and positions, never excerpts or raw exceptions
- **AND** CRLF counts as one line break, columns count Unicode code points and end-of-input identifies the position after the final character

### Requirement: Copy and clear deliberately

The minifier SHALL copy exactly a current successful output only on explicit Copy activation, with localised success/denied/unavailable feedback and no automatic clipboard reads. Clear SHALL cancel active work and remove input, editor history, output and diagnostics without changing the clipboard. Obsolete clipboard completions SHALL NOT report success for a newer revision.

#### Scenario: Copy only the matching output

- **GIVEN** a current successful minified result
- **WHEN** Copy is activated by pointer or keyboard
- **THEN** exactly that result is sent to the clipboard and localised success is shown
- **AND** Copy is unavailable before success, while running and after input changes, failure, cancellation or disposal

#### Scenario: Keep content after clipboard failure

- **WHEN** an explicit clipboard write is denied or the API is unavailable
- **THEN** localised failure/unavailable feedback is shown without changing input/output, reading the clipboard or submitting content
- **AND** a completion after Clear, an edit or a replacement result does not announce success for the newer workspace state

#### Scenario: Clear during or after processing

- **WHEN** Clear is activated while running, after success or after failure
- **THEN** input, output and diagnostics become empty, Copy is disabled and focus remains predictably on Clear
- **AND** undo, late work and Back-navigation restoration cannot repopulate cleared/disposed content
- **AND** the system clipboard remains unchanged without a secure heap/clipboard-erasure claim

### Requirement: Bound minification and reject obsolete work

The minifier SHALL enforce 1 MiB UTF-8 input, depth 128, 8 MiB UTF-8 output, one active job and a two-second worker deadline. Accepted edits, replacement, cancellation and exit SHALL invalidate obsolete results. Oversized edits SHALL preserve accepted input and its matching result; processing failures SHALL retain input and permit retry.

#### Scenario: Enforce byte and depth boundaries

- **GIVEN** accepted input and a matching successful result
- **WHEN** an insertion exceeds 1 MiB in UTF-8
- **THEN** insertion is rejected before expensive editor processing, with localised feedback and the accepted input/result retained
- **WHEN** processing exceeds depth 128 or a returned output exceeds 8 MiB in UTF-8
- **THEN** the operation/result is rejected without publishing partial current output
- **AND** exact input/depth/output limits are not rejected for exceeding those limits alone

#### Scenario: Recover without stale publication

- **WHEN** processing is cancelled, replaced, times out at two seconds, fails to load or the workspace is disposed
- **THEN** obsolete callbacks cannot publish output or re-enable Copy, and workers/timers are released
- **AND** recoverable worker failures show translated feedback, preserve input and allow a clean retry without a page reload or policy relaxation

### Requirement: Publish a private localised minifier page

The application SHALL provide exact GET/HEAD `/tools/json-minifier` with EN/ES/FR explanations, Minify/Cancel/Copy/Clear controls and selectable text-only output. It SHALL retain restrictive document/worker policies and keyboard/visual usability. Input, result and diagnostics SHALL remain in memory, never in tool forms, URLs, requests, logs, cookies or persistent storage.

#### Scenario: Keep SSR and enhancement usable

- **WHEN** the page is opened without JavaScript or its lazy module fails
- **THEN** localised explanations/navigation and a processing-unavailable notice remain visible, without a submitting tool form or false success
- **WHEN** enhancement succeeds and keyboard, narrow layout and actual 200% browser zoom are exercised
- **THEN** labels, visible focus, Escape-then-Tab traversal, contrast, reflow and feedback meet the retained quality criteria
- **AND** output that resembles HTML/scripts remains inert text and no screen-reader compatibility/manual speech-testing pass is claimed

#### Scenario: Retain exact route and language boundaries

- **WHEN** the published page is requested with GET or HEAD in EN, ES or FR
- **THEN** it retains no-store HTML, accepted security headers and no server session
- **WHEN** a supported language is submitted with a valid CSRF token
- **THEN** the selector returns to the exact allowlisted minifier page without content or a `lang` query in the return target
- **AND** unlisted methods and unsafe or duplicate return targets retain the existing denial/safe handling

#### Scenario: Verify privacy across all minifier actions

- **GIVEN** a fresh context observing document/worker requests and a unique synthetic sentinel
- **WHEN** cold enhancement, success, failure, retry, cancellation, replacement, Copy, Clear and exit are exercised
- **THEN** input/output/diagnostics remain absent from request URLs, bodies and headers, storage, cookies and captured application logs
- **AND** warmed operations make no requests except body-free GETs without query/fragment to exact build-known hashed worker scripts required for startup/recovery
- **AND** relevant document/worker CSP violations do not occur and Home/Tools visits alone do not load editor/worker assets

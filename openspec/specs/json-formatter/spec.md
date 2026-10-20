# json-formatter Specification

## Purpose

Let visitors format complete strict JSON locally without changing data-bearing tokens, recover from bounded errors and deliberately copy or clear their workspace in English, Spanish or French.

## Requirements

### Requirement: F06-UH01-R01 — Format JSON through whitespace-only changes

When a developer formats valid JSON, the formatter SHALL change only insignificant whitespace. It SHALL validate the entire input before publishing output, preserve all data-bearing tokens, and offer two-space or four-space indentation with two spaces as the default.

#### Scenario: F06-UH01-AC01 — Preserve an unsafe JavaScript integer

- **GIVEN** the input is `{"id":9007199254740993}`
- **WHEN** the developer formats with two-space indentation
- **THEN** the output retains the numeric token `9007199254740993`

#### Scenario: Preserve lexical fidelity and all JSON root types

- **WHEN** valid objects, arrays or primitive roots containing large integers, negative zero, exponent notation, Unicode escapes, escaped solidi, duplicate keys and ordered members are formatted
- **THEN** the sequence and exact spelling of every non-whitespace token remain unchanged
- **AND** whitespace inside strings is preserved and repeated formatting with the same indentation is stable

#### Scenario: Select indentation deliberately

- **WHEN** the developer selects two-space or four-space indentation and formats a nested document
- **THEN** the result uses that indentation, LF line endings and no final newline
- **AND** changing indentation makes a previous result non-current until formatting succeeds again

### Requirement: F06-UH01-R02 — Keep formatter content in browser memory

While JSON formatting is performed, the formatter SHALL keep input, result and diagnostics inside browser memory. It SHALL NOT transmit payloads, put them in URLs or logs, or persist them in browser storage or cookies. Clipboard writes SHALL occur only through the explicit Copy action.

#### Scenario: F06-UH01-AC02 — Process a private sentinel locally

- **GIVEN** the formatter contains a unique synthetic sentinel and all initial assets are loaded
- **WHEN** the developer formats the document
- **THEN** no operation-triggered request is made except body-free GETs without query/fragment to exact build-known hashed worker scripts
- **AND** the sentinel is absent from every request, persistent storage and application logs

### Requirement: F06-UH02-R01 — Explain invalid JSON without changing input

If JSON syntax is invalid, the formatter SHALL preserve the input and show a localised diagnostic with its location. It SHALL reject empty input, comments, trailing commas, malformed tokens and extra root content, without publishing a partial or current successful result.

#### Scenario: F06-UH02-AC01 — Explain a trailing comma

- **GIVEN** the input is `{"id":1,}`
- **WHEN** the developer requests formatting
- **THEN** a localised syntax diagnostic identifies the error and the original input is unchanged

#### Scenario: Locate invalid syntax consistently

- **WHEN** malformed JSON, empty/whitespace-only input, comments, trailing commas or multiple roots are submitted in EN, ES or FR
- **THEN** a resource-backed diagnostic reports a one-based line and column without an input excerpt
- **AND** CRLF counts as one line break, columns count Unicode code points and end-of-input errors identify the insertion position after the last character
- **AND** any previous output is non-current and Copy is disabled

### Requirement: F06-UH02-R02 — Enforce budgets and reject stale results

If input exceeds the configured input limit, the workspace SHALL reject its insertion with localised feedback. Processing SHALL enforce 1 MiB UTF-8 input, depth 128, 8 MiB UTF-8 output, one active job and a two-second worker deadline. Failure, cancellation or accepted edits SHALL prevent stale output from becoming current or copyable.

#### Scenario: F06-UH02-AC02 — Reject oversized paste before editor work

- **GIVEN** the editor contains a small valid document
- **WHEN** the developer pastes more than 1 MiB of UTF-8 content
- **THEN** the oversized replacement is rejected and the previous input remains available
- **AND** translated feedback is provided before expensive editor processing

#### Scenario: Enforce nesting and output limits

- **WHEN** a document exceeds 128 nested containers or its formatted output exceeds 8 MiB in UTF-8
- **THEN** processing returns a translated depth/output-limit diagnostic without changing accepted input or publishing partial output
- **AND** exactly 128 nested containers and exact byte-limit values are not rejected for exceeding that limit alone

#### Scenario: Keep input responsive and ignore obsolete completions

- **GIVEN** formatting is running or a successful result exists
- **WHEN** the developer edits accepted input, changes indentation, cancels, starts a replacement job or leaves the page
- **THEN** obsolete work cannot publish a current result, Copy is disabled until a matching success and page exit releases processing/editor resources
- **WHEN** processing reaches its two-second deadline or fails to load
- **THEN** it stops with translated feedback, keeps input and allows a later retry without weakening the security policy

### Requirement: F06-UH03-R01 — Copy only the current successful result

When the developer activates Copy on a current successful result, the workspace SHALL copy exactly that result to the clipboard and announce localised success. Copy SHALL remain unavailable for empty, running, failed or obsolete results; clipboard rejection SHALL produce translated feedback without changing content.

#### Scenario: F06-UH03-AC01 — Copy current result

- **GIVEN** formatting has produced a current successful output
- **WHEN** the developer activates Copy
- **THEN** the clipboard receives that output and a localised success status is announced

#### Scenario: Handle denied clipboard access without reading it

- **WHEN** a user-triggered clipboard write is denied or the clipboard API is unavailable
- **THEN** the workspace preserves input/output and shows a localised failure status without an automatic clipboard read, silent fallback submission or false success
- **AND** Copy is keyboard operable; completion for an obsolete workspace revision does not announce success for a newer result

### Requirement: F06-UH03-R02 — Clear the active workspace deliberately

When the developer clears the workspace, it SHALL remove current input and output from active editor state, cancel active processing, clear diagnostics and disable Copy. Previous editor history or late job completion SHALL NOT restore cleared content. Clear SHALL leave the system clipboard unchanged.

#### Scenario: F06-UH03-AC02 — Clear a running workspace

- **GIVEN** the workspace contains input and a job is running
- **WHEN** the developer activates Clear
- **THEN** input and output become empty and a late job result does not repopulate them

#### Scenario: Clear completed or failed content

- **WHEN** Clear is activated after success or error and undo is attempted
- **THEN** cleared input/output are not restored, old diagnostics are removed and Copy remains disabled
- **AND** focus remains predictably on Clear and a translated cleared status is provided
- **AND** no memory-forensics or secure clipboard-erasure guarantee is claimed

### Requirement: Publish a localised formatter journey

The application SHALL publish GET/HEAD `/tools` and `/tools/json-formatter` with shared EN/ES/FR styling and navigation. The Tools index SHALL list only completed F06/F07 JSON tools, adding each F07 link after its story and relevant integrated acceptance pass. The formatter SHALL provide keyboard-operable labelled controls, visible focus, a read-only result and resource-backed statuses without an input-submitting form.

#### Scenario: Discover the formatter without publishing unfinished tools

- **GIVEN** all three F06 stories and integrated acceptance have passed
- **WHEN** a visitor follows Home → Tools → JSON Formatter
- **THEN** both destination pages exist, the formatter remains reachable and unfinished tools/learning pages remain unpublished and denied
- **AND** the published routes retain the accepted security headers, no-store HTML, no sessions and exact route/method restrictions

#### Scenario: Verify feature-wide privacy across all actions

- **GIVEN** formatting, diagnostics and Copy/Clear are implemented, with a fresh browser context observed from navigation onward, including worker traffic
- **WHEN** initial enhancement, first formatting, invalid input, cancellation, replacement, Copy and Clear are exercised before integrated F06 acceptance
- **THEN** cold loading contains only allowlisted same-origin page and immutable asset requests plus any explicit language preference submission
- **AND** warmed operations issue no requests except body-free GETs without query/fragment to exact build-known hashed worker scripts required for clean-worker startup/recovery
- **AND** request URLs/bodies, storage, cookies and captured server logs contain no tool content; diagnostics/statuses contain codes and positions rather than input excerpts
- **AND** text resembling HTML or scripts remains inert text, never executable markup

#### Scenario: Use locale preferences and explanatory SSR content

- **WHEN** either page is opened in EN, ES or FR with JavaScript disabled
- **THEN** translated headings, explanations and navigation remain available; the formatter explains that local processing requires JavaScript
- **AND** no inert control suggests processing succeeded and no form can submit tool content
- **WHEN** the native language selector is submitted with a valid token
- **THEN** it persists the supported preference and returns to that exact allowlisted page without any tool content or `lang` query in the return target

#### Scenario: Retain usable enhancement and visual accessibility

- **WHEN** the formatter is operated by keyboard, at narrow width or actual 200% browser zoom in the supported browsers
- **THEN** editor escape, focus, control labels, contrast, reflow and status feedback remain usable under unchanged document and worker CSP
- **AND** Home and the Tools index do not fetch formatter editor/worker assets
- **AND** no screen-reader compatibility or manual speech-testing pass is claimed

#### Scenario: Publish accepted F07 destinations without a formatter regression

- **GIVEN** the validator or minifier story has passed its relevant automated, integrated and owner acceptance
- **WHEN** its catalogue link is published and a visitor opens Tools in EN, ES or FR
- **THEN** the completed page is reachable alongside Formatter and has an operation-specific label
- **AND** any unaccepted F07 operation remains unadvertised, deferred tools and Learn remain unpublished, and Formatter retains its accepted behaviour
- **WHEN** both F07 stories and integrated acceptance pass
- **THEN** the index lists Formatter, Validator and Minifier without advertising V2 tools

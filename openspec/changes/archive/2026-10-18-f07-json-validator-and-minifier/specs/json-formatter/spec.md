# Spec Delta

## MODIFIED Requirements

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

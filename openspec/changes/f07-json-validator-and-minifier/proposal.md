# Proposal

## Why

F06 is accepted and already provides strict JSON parsing, bounded local workers and
a safe editor workspace. F07 completes the MVP's JSON operations by letting visitors
validate syntax or minify text without changing its data-bearing tokens.

## What Changes

- Add distinct SSR pages `/tools/json-validator` and `/tools/json-minifier` in
  EN/ES/FR, reusing the existing shared design system and browser-local workspace.
- Validation reports a current valid/invalid verdict and safe error location without
  rewriting input or generating a copyable output document.
- Minification removes only insignificant whitespace after complete strict validation;
  it preserves numeric spelling, duplicate keys, escapes, member order and string spaces.
- Reuse the accepted input/depth/output/deadline limits, diagnostic positions,
  cancellation, stale-result isolation, Clear and explicit minifier Copy behaviour.
- Extend exact page/method, language-return and safe logging route mappings. Update
  the formatter-only catalogue rule to admit completed F07 pages while keeping
  unfinished tools and Learn unpublished. Publication follows each story's evidence
  and acceptance; existing Formatter behaviour remains unchanged.

Out of scope: JSON Schema validation, repair, sorting, automatic processing, uploads,
downloads, cross-page payload transfer, new dependencies, generic tool frameworks,
other tools, learning pages, containers and broad redesign (ADR 007).

## Capabilities

### New Capabilities

- `json-validator`: strict full-document syntax validation, localised current verdicts,
  positioned diagnostics and bounded/private validator workspace behaviour.
- `json-minifier`: token-preserving minification, current-result Copy/Clear and
  bounded/private minifier workspace behaviour.

### Modified Capabilities

- `json-formatter`: amend only **Publish a localised formatter journey** so the Tools
  index can list completed F06/F07 JSON pages, rather than permanently only Formatter.
  Retain every formatter processing, fidelity, privacy and keyboard/visual requirement.

## Impact

Targets: `src/main/frontend/tools/json/` algorithms/protocol/session/workspace,
the lazy site entry, shared SSR markup/messages and Tools catalogue; `ToolsController`,
`PublicPageSecurity`, `LanguagePreferenceController` and safe route identities in
`SecurityResponseHeaders`; nearby unit/MVC/packaged/browser tests.

The current parser validates only inside `formatJson`, and the protocol accepts only
`json-format-2`/`json-format-4`: extract the demonstrated shared validation seam and
add two explicit operations, without replacing the worker manager or JSON parser.
Keep one self-contained worker and its exact private build-metadata allowlist under
ADR 006; no CSP, payload-network or storage-policy change is proposed.

Retain F07-UH01/UH02 requirement, scenario and task IDs in `plan.json`, its 10h
provisional feature forecast and dependency on completed F06. This proposal does
not start tasks, migrate behavioural ownership, sync main specs or authorise delivery.

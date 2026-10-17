# Proposal

## Why

F00–F05 provide the accepted application, localised shell, security boundary, editor and worker proof, but visitors cannot yet use a developer tool. F06 delivers the first complete vertical slice: inspect JSON without corrupting numeric tokens or sending private content to a server.

## What Changes

- Deliver all three F06 stories: token-preserving formatting, actionable syntax/resource-limit feedback, and deliberate Copy/Clear actions.
- Deliver `/tools/json-formatter` and a minimal `/tools` index listing only the completed formatter; enable the existing Home Tools link only at integrated F06 acceptance, after formatting, diagnostics and Copy/Clear are verified.
- Validate complete strict JSON and format through whitespace-only edits in a same-origin worker, preserving numeric notation, string escapes, duplicate keys and ordering.
- Reuse F05 insertion budgets, worker cancellation/deadline and CSP; add bounded diagnostic metadata and workspace result freshness rather than a second worker framework.
- Apply owner-approved ADR 006: exact build-known hashed worker-script GETs are the only operation-triggered traffic exception; payload transmission, arbitrary asset requests and storage remain forbidden.
- Provide EN/ES/FR explanatory content, controls, errors and statuses, including usable SSR explanations without JavaScript.
- Retain the accepted keyboard/focus/contrast/zoom/locale/axe/privacy checks. Screen-reader compatibility and manual speech testing remain outside the owner-approved scope; the separate documentation clarification was applied and archived on 2026-10-17 and is not repeated here.
- Exclude other tools, uploads, URL/file import, automatic clipboard reads, persistence, backend processing, accounts, course pages, deployment and broad catalogue architecture.

## Capabilities

### New Capabilities

- `json-formatter`: Published browser-local JSON formatter, lossless whitespace formatting, bounded diagnostics, current-result state and explicit clipboard/workspace actions. Retains F06-UH01–UH03 requirement and acceptance IDs.

### Modified Capabilities

None. Existing shared-interface, packaged-browser-assets, locale, HTTP-security and accepted editor/worker contracts remain unchanged; publishing tested routes and using their controls instantiates those contracts rather than relaxing them. F05 was separately synchronised and archived on 2026-10-17; this proposal performs no behavioural ownership migration.

## Impact

Proposed implementation touches the tools web adapter/templates, Home publication flag, exact GET/HEAD security routes and safe locale return routing; frontend formatter algorithm/worker/workspace; shared editor change notifications and worker diagnostic handling; resource bundles; packaged/browser tests and existing verification runner. Add a pinned, licence-reviewed `jsonc-parser` dependency and lockfile metadata during implementation, not during this proposal. No new HTTP payload API, CSP exception, server-side formatter or application/domain framework dependency is introduced.

Canonical scope/tracking remains `docs/planning/plan.json` (F06: three stories, fifteen tasks, 24 baseline owner hours). This proposal creates no implementation status, passing acceptance evidence, main-spec ownership migration, merge, archive or release.

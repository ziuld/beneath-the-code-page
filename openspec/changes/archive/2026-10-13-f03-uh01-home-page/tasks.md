# Tasks

Scope: F03-UH01 only. The numbered checkboxes subdivide the canonical T01–T05; they do not create new backlog IDs or add estimates to the 8h baseline. R01/AC01 map to T03; R02/AC02 map to T04. Tests and documentation accompany the implementation they cover; T03/T04 retain the canonical acceptance verification responsibility.

## 1. F03-UH01-T01 — Confirm the bounded slice

- [x] 1.1 Confirm F02 evidence and the current repository state, read the canonical F03-UH01 requirements/scenarios/tasks and record the implementation plan using `harness/templates/task.md`; verify the delivered plan names R01/R02, AC01/AC02, T01–T05 and excludes F03-UH02/F04.

## 2. F03-UH01-T02 — Implement SSR Home with adjacent tests

- [x] 2.1 Add the site inbound web adapter, Home template and minimum navigation/footer fragments, using the existing asset manifest; add rendered MVC tests for semantic landmarks, main heading, tools/learning descriptions and valid asset references, and verify those tests pass with real Thymeleaf rendering rather than view-name assertions alone.
- [x] 2.2 Add immutable publication-aware navigation descriptors and render unavailable sections without actionable links; add renderer tests for unavailable, partially published and published descriptor states, verifying no fake href/click handler or production placeholder destination is introduced.
- [x] 2.3 Add EN/ES/FR Home message resources, message-source configuration and document language; add key/placeholder parity and locale-rendered tests, verifying escaped resource-backed copy with no unresolved keys or host-locale fallback, without adding preference persistence or a language selector.
- [x] 2.4 Add minimum shared Home styles and serve an unchanged copy of the approved B composition; verify source/served-image byte equality and initial keyboard, narrow-viewport and contrast checks, and document the system-font/raster limitations without inventing a standalone logo.
- [x] 2.5 Add bounded anonymous GET/HEAD access for Home, required assets/logo and existing health smoke while denying unlisted routes/methods and retaining security filters/CSRF; verify a route/method test matrix, anonymous rendered Home, safe error dispatch and absence of a login redirect. Record the site-package/security boundary in an ADR. If necessary, adapt only copied test-fixture security configuration and verify fixture wiring is absent from the normal JAR.

## 3. F03-UH01-T03 — Prove R01 / AC01 on the packaged page

- [x] 3.1 Add pinned project-local Playwright tooling, lockfile, packaged-app lifecycle runner and `tests/e2e` tests; verify installation with the pinned Node/npm, bounded startup/cleanup and a Chromium JavaScript-disabled test that reads the brand, main heading and both descriptions from the unmodified executable JAR. Record browser/tool versions and any missing-system-dependency blocker; do not replace browser proof with an HTTP-only assertion.
- [x] 3.2 Complete the Home rendered-HTML/browser acceptance matrix for EN/ES/FR, keyboard focus, narrow layout/200% zoom and role-appropriate contrast; verify same-origin page/assets and no accidental submission, recording actual results and human visual/translation-review limitations in `harness/evidence/`. Do not claim full shared-shell, tool privacy or F04 acceptance.
- [x] 3.3 Add the separate packaged-browser CI job and document reproducible local commands; verify the same suite runs locally against the normal JAR and inspect SHA-pinned actions, read-only permissions and non-persisted credentials. Record local results separately from remote CI, which is not executed or published by this task.

## 4. F03-UH01-T04 — Prove R02 / AC02 and publication transition

- [x] 4.1 Add isolated route/catalogue fixtures exercising the production navigation renderer with neither, one and both destinations published; verify mapped/public destinations replace unavailable states with real links that return HTTP 200 and unpublished sections retain descriptions without actionable links. Confirm the normal JAR still contains no `/tools` or `/learn` placeholder controller and record this as fixture-proven transition, not product publication.
- [x] 4.2 Run cross-slice integration checks: clean Maven verification, original executable health smoke, packaged Home/browser suite, F02 manifest/startup and successive watch-build regressions, and architecture checks; verify all actual outcomes are recorded with failures/skips/blockers and no global configuration or writable-root changes.

## 5. F03-UH01-T05 — Review evidence and update the handoff

- [x] 5.1 Review the complete diff and acceptance evidence against R01/R02 and inherited page-quality gates; verify no unrelated scope, generated binaries, fixture leakage or unsupported completion claims. Create or record a coherent local commit only when authorised and record acceptance/commit references; keep unmet acceptance criteria open.
- [x] 5.2 Update canonical task/story tracking, supplied actual effort and current handoff only to the state supported by evidence; regenerate with `scripts/render-backlog.py` and `scripts/render-roadmap.py`, run planning integrity/rule checks and whitespace checks, and verify F03-UH02/F04 remain untouched and F03 is not marked done by this story alone. Do not invent owner effort or migrate plan-owned behaviour implicitly.

## Workflow follow-up

- After explicit acceptance, resolve behavioural ownership under ADR 004 before synchronisation/archive; this proposal does not authorise migration or create a second editable main requirements source.
- Archive through the archive workflow when authorised, then verify the archived result. No push, deployment or external publication is authorised.

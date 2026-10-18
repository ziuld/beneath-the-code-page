# Evidence — F07 OpenSpec proposal

Date / reviewer / identity: 2026-10-18 / OpenCode working-tree review / proposal
`f07-json-validator-and-minifier`; existing uncommitted MVP replan preserved.

## Scope and observed basis

The owner requested planning only for F07. F06 is accepted and archived; its
existing evidence is a prerequisite, not a pass for new F07 code. Read-only source
inspection confirmed that strict validation currently sits inside `formatJson`,
the worker accepts only formatting operations, and the manager already accepts an
empty string success acknowledgement. Exact page/security/locale/logging mappings
and existing catalogue tests cover Formatter only. Firefox/WebKit select
`editor*.spec.mjs`; proposed F07 browser coverage follows that convention.

The main `json-formatter` publication rule requires a formatter-only index. The
proposal explicitly includes its complete modified requirement/scenarios rather
than silently contradicting it. Existing bounded-worker/editor requirements need
no modification; reuse is described in the design, not represented as new policy.

## Executed planning checks

- `openspec context --json` and `openspec list --json`: local project root resolved;
  no prior active change with this name. Default `spec-driven` schema retained.
- Read `openspec/config.yaml`, relevant full main specifications and each artifact's
  CLI instructions; authored dependency-ordered proposal/specs/design/tasks.
- `openspec status --change f07-json-validator-and-minifier --json`: proposal,
  specs, design and tasks all present; planning complete. No conditional artefact
  skipped: design is warranted by shared JSON, lifecycle and route/security changes.
- `openspec validate f07-json-validator-and-minifier --strict`: **PASS**.
- `python3 scripts/check-planning.py`: **PASS**, including generated views/links,
  hierarchy, effort rollups, dependencies and closure rules.
- `python3 scripts/test-planning-rules.py`: **21 tests pass**.
- `git diff --check`: **PASS**.
- Read-only traceability review: exact three declared capability paths; all four
  canonical F07 requirement/scenario pairs retained; all ten canonical task IDs
  mapped through grouped references; 14 unchecked tasks; existing Formatter
  publication scenario headings preserved. Main specs, application source/tests,
  CI and dependency/build configuration unchanged.

## Limitations and next action

No Maven build, runtime/browser tests, benchmarks or owner keyboard/zoom/language
review run: no implementation was authorised or performed. None of the proposed
behaviour is claimed implemented or accepted. F07-UH01/UH02 and all canonical tasks
remain planned, with the unchanged provisional 10h feature forecast. Actual effort
is unreported. Behavioural ownership remains plan-owned until explicit adoption.

No commit/push/merge/release, model switch, sub-agent, global/system change or
OpenSpec main-spec sync/archive. The artefacts are ready for review; apply requires
a new explicit user request. Screen-reader compatibility/manual speech testing
remains excluded under the existing owner decision, not passed by this proposal.

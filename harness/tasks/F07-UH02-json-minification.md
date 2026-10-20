# Task — F07-UH02 JSON Minifier

Status / owner / date: accepted / Ziuld with AI assistance / 2026-10-18.

User outcome and authorised scope: continue F07 with browser-local strict JSON
minification. Preserve tokens and reuse accepted worker/editor/Copy/Clear behaviour;
no new dependency or platform. Keep the page out of the catalogue until acceptance.

Prerequisites and files read: UH01 accepted at ab2f956; existing Validator closure
bookkeeping preserved. Read F07 EARS/scenarios/tasks, change design/minifier delta,
shared algorithm/protocol/session/workspace/templates and exact route mappings.

Acceptance criteria: [F07 dossier](../../docs/planning/features/F07.md#f07-uh02)
and [archived minifier delta](../../openspec/changes/archive/2026-10-18-f07-json-validator-and-minifier/specs/json-minifier/spec.md).

Implementation steps:
1. Validate then concatenate original scanner token slices; add explicit operation.
2. Reuse session/workspace, add exact SSR/locale/security mappings and translations.
3. Verify token fidelity/invalid input and real browser Copy/Clear/privacy flows.
4. Obtain owner review, then publish/verify the catalogue link before closure.

Security/privacy/accessibility: no payload requests/storage/logs, text-only output,
unchanged CSP/budgets, resource-backed EN/ES/FR controls and keyboard semantics.

Verification: clean Maven, health and packaged Chromium; supported Ubuntu engine
checks through the existing PR when authorised. Do not spend time pursuing the
documented WebKit lazy-reload TODOs. Manual keyboard/narrow/200% zoom/locale/Copy
review remains distinct from synthetic clipboard verification.

Results/evidence: [Minifier evidence](../evidence/F07-UH02-json-minification.md).
Actual effort unrecorded. Final770aa98 clean CI185/207(three skips)/17 passes;
Chromium110/Firefox64/WebKit61 pass,3 existing TODOs retained. Owner review accepted.
Next: reduced F12 only when requested; no merge/release/sync/archive.

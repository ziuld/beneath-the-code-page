# Task — F16 MVP website polish and acceptance

Status / owner / date: apply in progress / Ziuld with AI assistance / 2026-10-20.

User outcome and authorised scope: /opsx-apply f16-mvp-website-polish-and-acceptance; implement the proposed
complete MVP journey acceptance and a reproducible local release handoff.

Prerequisites and files read: AGENTS.md; current handoff; architecture/feasibility;
hierarchy/epic/F16 EARS, Gherkin and ordered tasks; OpenSpec config/main learning,
Home/shared/security specifications; HomeNavigation/shared templates; existing
Home/learning/keyboard browser tests; quality/security/planning/runbook tooling.
F12 and F14 are done with evidence; no other active OpenSpec change was present.

Acceptance criteria: docs/planning/features/F16.md and the proposed deltas under
openspec/changes/f16-mvp-website-polish-and-acceptance/specs/. Canonical plan-owned
behaviour and tracking remain unchanged during proposal preparation.

Implementation steps: propose → review → later explicit apply → promote/polish →
Chromium and owner review → final security → accepted local candidate → reproduce
from clean checkout → evidence/authorised local commit/closure.

Security, privacy, accessibility and locale implications: preserve browser-local
payloads, CSP, native EN/ES/FR selection and keyboard/visual criteria. Reassess
bounded security decisions for final V1; no automatic fingerprint/expiry renewal.
Chromium only, no full-WCAG or screen-reader compatibility claim.

Verification commands and manual checks to run: proposal strict validation,
requirement/scenario/task ID traceability, planning checks and whitespace checks.
Runtime/browser/security and manual acceptance checks belong to later apply.

Results / evidence links / actual effort: strict change/all-spec validation, planning integrity and 22 planning-rule tests
PASS; all F16 IDs mapped and 10 implementation slices unchecked. Results are in
harness/evidence/F16-openspec-proposal.md. Owner effort
unreported; no implementation task completion inferred from planning.

Open issues and next action: all four planning artifacts are complete; present them
for review, then wait for a new explicit apply request. No code, canonical status, security policy, commit,
push, deployment or main-spec sync/archive change is authorised by this workflow.

Apply update,2026-10-20: OpenSpec4/10; Maven257+17 Java/185 frontend and
Chromium125 PASS. Catalogue-aware promotion/shared locale links complete; no
additional styling defect found. Planning22 and security-policy18 PASS; actual
scan incomplete invalid-applicability-scope after fresh DB/all45-source coverage.
Owner review, proposed bounded security scope and scoped local commits await
explicit responses. Preview running34365/PID76706/session50621; stop after review.
Canonical UH01 T01/T02 done; feature/story remain open, UH02 not started.

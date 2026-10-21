# Task — F18 global redesign implementation

Status / owner / date: in progress / Ziuld with AI / 2026-10-21.

User outcome and authorised scope: implement the agreed global redesign following
`docs/design/global-redesign-plan.md`; user requested “lets continue”. Preserve
core functions, complete lesson content, EN/ES/FR, privacy and the B identity.

Prerequisites/files read: AGENTS, current handoff, architecture/feasibility, F18
feature/requirements/scenarios/tasks, design plan, stylesheet imports, shared and
tool templates, editor integration and existing browser/build harness.

Acceptance: F18-UH01-R01–R03 / AC01–AC03 in canonical plan.json. Concepts recorded
in docs/design/design-direction.md; Home provisional until integrated review.

Steps: I01 shared tokens/cascade/control contract; I02 shell/recovery; I03 Learn/
course; I04 complete readers; I05 Home; I06 catalogue; I07 workspaces/consolidation.
T04 remains open until all slices complete. T05 final verification and owner review
follow, then T06 closure. No commit/push/PR/deployment in this slice.

Security/privacy/accessibility/locales: native semantics, no payload/processing
changes or translation changes; preserve nonce-generated editor styles and lazy
loading. Central tokens serve all pages; keyboard/reflow/contrast need real proof.

Verification: Maven full verification, packaged Chromium suite including token
propagation, planning regeneration/integrity/rules and whitespace checks. Record
actual outcomes in harness/evidence/F18-global-redesign.md; no automatic feature
closure or claim of owner approval. Actual effort unreported.

I01 verified: Maven260+17 Java/185 frontend, Chromium138, security-policy20,
planning23/integrity and whitespace PASS. Evidence records the discovered/fixed
keyboard scrolling issue and limits. Next: I02 shared shell and safe recovery.

I02–I07 implemented on2026-10-21. Integrated build/security/browser verification
and final visual review in progress. Keep T05/T06 open until actual review and
reviewed revision exist. No push/PR/release or OpenSpec archival is authorised by
this implementation continuation.

Final candidate PASS: Maven261+17/185 frontend, Chromium142, security0 findings,
policy20/spec15/planning23. T04 complete, T05 in_review. Owner runtime review and
T06 reviewed revision/closure remain; preview44509 is running. See evidence and
docs/design/f18-owner-review.md.

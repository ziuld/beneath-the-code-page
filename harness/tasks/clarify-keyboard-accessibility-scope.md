# Task — Clarify keyboard accessibility scope

Status / owner / date: Complete (3/3 documentation tasks); Ziuld with AI assistance; 2026-10-17.

User outcome and authorised scope: Apply the documentation-only `clarify-keyboard-accessibility-scope` change. Reconcile the approved keyboard/visual acceptance policy without changing runtime behaviour, tests, dependencies, security or CI coverage. No F06 implementation, automatic archival or feature closure.

Prerequisites and files read: Current handoff, accepted architecture/feasibility/hierarchy, change proposal/design/tasks, quality/brand guidance, F16 dossier, delivery guidance and repository-wide accessibility-reference search. Preserve the existing F05 archive/spec-sync changes and F06 planning artefacts.

Acceptance criteria (link, do not drift): [Change checklist](../../openspec/changes/archive/2026-10-17-clarify-keyboard-accessibility-scope/tasks.md) and [scope/design](../../openspec/changes/archive/2026-10-17-clarify-keyboard-accessibility-scope/design.md).

Implementation steps: Reconcile quality/brand guidance; clarify future/final acceptance, delivery and evidence templates; validate and record evidence. Keep IDs, estimates, historical observations and main-spec behaviour unchanged.

Security, privacy, accessibility and locale implications: Retain keyboard/focus/contrast/reflow/zoom/reduced motion/EN/ES/FR, labels/semantics/status privacy, axe and all browser/security/privacy gates. Remove only the mandatory speech-review obligation and blanket conformance target; no compatibility or passing speech-test claim.

Verification commands and manual checks to run: Reference classification search; both planning renderers; planning integrity; all planning-rule tests; strict OpenSpec validation; whitespace/scope diff checks. No application build or manual browser/speech test is needed for documentation-only edits, and none will be claimed.

Results / evidence links / actual effort: Both renderers, planning integrity, all 15 rule tests, strict OpenSpec (nine items), whitespace and runtime-scope checks passed. See [actual evidence](../evidence/clarify-keyboard-accessibility-scope.md). Actual owner effort unreported; no application/browser/manual run claimed.

Open issues and next action: The owner-authorised evidence rewording resolved the planning-link false positive without a validator change. All final checks pass. Owner separately requested archival, completed on 2026-10-17 with all three tasks done and no delta specs to sync. No commit/push. F06 remains unimplemented.

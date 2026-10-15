# Tasks

## 1. Reconcile acceptance guidance

- [ ] 1.1 Update `docs/quality/quality-plan.md` and `docs/brand/brand-application.md` to remove mandatory screen-reader testing and blanket WCAG AA targets, explicitly retain keyboard/visual criteria and automated checks, and document the owner decision; verify no retained requirement or runtime source was removed and no full-conformance claim remains in active guidance.
- [ ] 1.2 Reconcile relevant future feature/final-release and delivery guidance with that scope, preserving historical evidence and stable IDs/estimates; search for screen-reader/assistive-technology/WCAG references and verify each remaining match is historical, a specific retained criterion or an explicit limitation, not a mandatory speech-review gate. Regenerate affected planning views through both existing renderers if their sources change.

## 2. Validate and record

- [ ] 2.1 Run planning integrity, planning-rule tests, strict OpenSpec validation and whitespace checks; record actual results and scope limitations in the handoff/evidence, verify no Java/TypeScript/dependency/security/CI coverage changes, and leave unrelated feature closure to its own acceptance evidence.

## Workflow follow-up

- Apply only after an explicit apply request; this proposal is not implementation.
- Archive only when separately requested after review; do not automatically migrate plan-owned stories.

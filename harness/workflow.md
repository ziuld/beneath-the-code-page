# Development harness

Purpose: make authorised feature work repeatable and reviewable. This is lightweight repository guidance, not a daemon, autonomous scheduler or sandbox replacement.

Read order: AGENTS.md → current-state.md → architecture/feasibility → feature acceptance → plan.json → relevant evidence/ADRs → actual code.

Detailed read order within a feature: `docs/planning/features/Fxx.md` → chosen UH description → EARS requirements → Gherkin scenarios → ordered tasks and planned checks. See `docs/planning/story-workflow.md` for the explicit Epic → Feature → UH → Task model, closure and commit rules. Tasks are the execution unit, stories are accepted outcomes, features and the epic roll up completion.

For a feature, use a task record with outcome, scope, prerequisites, steps, risks and required evidence. Implement in small complete increments, verify actual behaviour, capture evidence, then update status and handoff. No external agent spawning is implied.

## Status changes

- Planned → ready: prerequisites done and acceptance understood.
- Ready → in_progress: owner starts authorised work; record actual_start.
- In_progress → blocked: record external blocker, impact and next action.
- In_progress → in_review: implementation and relevant checks ready for review.
- In_review → done: criteria accepted and evidence linked; record actual_finish.
- Failed review → in_progress; never keep `done` for a broken feature.

`scripts/check-planning.py` checks parents, IDs, estimates, effort rollups, EARS/scenario coverage, verification links, evidence paths, dependencies, closure conditions and stale generated views. It cannot prove the truth of test results; review evidence. `scripts/render-roadmap.py` creates schedule/dashboard views and `scripts/render-backlog.py` creates the story reader, feature dossiers, Gherkin files, queue and traceability.

Preserve baseline estimates; change forecast_hours when knowledge improves; log material changes. Do not hand-edit the generated HTML/Markdown/Mermaid views. No application tests are implied by passing planning checks.

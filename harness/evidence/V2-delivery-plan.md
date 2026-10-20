# V2 delivery planning evidence

Date: 2026-10-20. Scope: planning only, requested by Ziuld in this chat.

## Repository baseline

Fetched origin/main at790b578a00ff8e0744f18273b679ed7fd219c0cd (merged F16).
The previous feature checkout was clean and had an identical tree. Created
planning/v2-delivery-sequence from origin/main; no application changes, commit,
push, new PR, deployment or OpenSpec archival performed for this planning update.

## Result

ADR010 records the explicit owner direction. Canonical plan.json selects six
phases: F17 security/docs; F15-UH01/UH02 and first push/PR checkpoint; F18 design
prompts/agreement/implementation page by page; F08–F11 tools; F19 final browser
review; F20 Docker Desktop/second-PC handoff. F15-UH03–UH07 stay deferred.
The first-version portable handoff is an additional V2-tracked deliverable;
accepted V1 evidence/status and its Chromium-only acceptance are preserved.
New features have EARS requirements, scenarios and ordered tasks. Both generated
views and the execution queue expose the selected stories; whole-course baseline
hours are not counted as selected remaining effort. Current documentation links
the new scope and labels contradictory earlier checkpoints as historical.

## Actual verification

- Python comparison against HEAD plan: every original feature/story/task ID,
  baseline estimate and status retained; original feature release membership retained.
- python3 -B scripts/render-backlog.py: generated successfully.
- python3 -B scripts/render-roadmap.py: generated successfully.
- python3 -B scripts/check-planning.py: PASS,21 features; hierarchy, estimates,
  dependencies, evidence paths, authored links and generated views consistent.
- python3 -B scripts/test-planning-rules.py: PASS,23 tests. Added negative checks
  for invalid/duplicate selected stories and reversed prerequisite phases;
  retained the historical V1-only schedule fixture explicitly.
- git diff --check: PASS.

No runtime/build/security/browser/container/Safari/second-PC verification or new
human content/design acceptance was performed. Actual owner effort is unreported.
Next authorised implementation: F17 analysis, then bounded security/docs work.

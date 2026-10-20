# F14 — OpenSpec sync and archive

Date: 2026-10-20. Owner requested archival of
`f14-first-complete-learning-unit` and selected Sync now.

- Repo-local root verified; schema `spec-driven`. Archive context requires English;
  no operation guidance or additional specs rules returned.
- All four planning artifacts done; CLI task lookup reports 8/8 complete.
- Added two requirements/four scenarios to each of `learning-navigation` and
  `localised-learning-content`, preserving existing titles, Purpose and content.
- Exact comparison of both complete ADDED bodies and canonical structure: PASS.
  Both capabilities fully synced, with no delta-operation headings in main specs.
- `openspec validate --specs --strict`: 13/13 PASS before archive move.
- Target did not exist. Moved to
  `openspec/changes/archive/2026-10-20-f14-first-complete-learning-unit/`.
  All six file SHA-256 hashes unchanged, including `.openspec.yaml`.
- Updated task-record archive path; canonical status, IDs, effort and behavioural
  ownership unchanged. F14 remains accepted; F16 not started.

No runtime, browser, scanner or manual review repeated. No commit, push or release.
Separate existing archive and closure changes preserved. No incomplete-artifact or
task warnings.

Post-move checks: CLI confirms no active changes; both planning views regenerated.
Planning integrity, closure rules, strict main-spec validation (13/13) and
`git diff --check` PASS. Generated execution queue now reflects F14 completion.

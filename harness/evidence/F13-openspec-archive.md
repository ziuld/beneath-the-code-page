# F13 — OpenSpec sync and archive

Date:2026-10-19. Owner requested archival of
`f13-learning-pages-and-navigation` and selected Sync now.

- Repo-local root verified; schema `spec-driven`. Archive context requires English;
  no conflicting guidance or extra spec rules returned.
- All4 planning artifacts done; CLI task lookup reports6/6 complete.
- New main `learning-navigation`:4 requirements/8 scenarios. New main
  `localised-learning-content`:3 requirements/6 scenarios. Titles use canonical
  main-spec form; Purpose and all ADDED blocks preserved exactly.
- Modified only F04-UH02-R01 in `secure-http-responses`; full delta block matches,
  with title/Purpose/F04-UH02-R02 unchanged. No delta-operation headings remain.
- Post-sync exact comparisons cover all3 capabilities:PASS, nothing left to apply.
  `openspec validate --specs --strict`:13/13 PASS before archive move.
- Moved to `openspec/changes/archive/2026-10-19-f13-learning-pages-and-navigation/`;
  target did not exist. Hashes of all7 files, including `.openspec.yaml`, unchanged.
- Updated task-record archive path. F13 accepted status/IDs/estimates and canonical
  behaviour ownership unchanged; no migration of plan-owned requirements.

Implementation/closure commits remain `0742b43`/`a64b7d2`. No runtime, browser,
scanner or manual review repeated. No commit/push/release, new main-spec ownership
migration or F14 implementation authorised. Separate F07/F12 archive edits
preserved; F13 archival edits remain uncommitted.

Post-move checks: `openspec list --json` confirms no active changes; planning
integrity and whitespace checks PASS. No warnings or incomplete tasks/artifacts.

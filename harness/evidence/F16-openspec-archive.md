# F16 — OpenSpec sync and archive

Date:2026-10-20. Owner requested archival of
f16-mvp-website-polish-and-acceptance and explicitly selected Sync now.

- Repo-local root and spec-driven schema verified. Initial working tree clean.
- Archive input requires English; no operation guidance. One current specs-rule
  snapshot retrieved successfully and reused inline; no additional rules returned.
- Four planning artifacts done; CLI task lookup reports exactly10/10 complete.
- learning-navigation: added1 requirement/3 scenarios, preserving the existing
  title, Purpose and every existing requirement/scenario byte for byte.
- local-release-handoff: created2 requirements/2 scenarios; mvp-acceptance:
  created2 requirements/3 scenarios. Both new main specs use canonical titles,
  verbatim delta Purpose and a single Requirements section.
- Exact full ADDED bodies and structure verified for all3 capabilities; no
  delta-operation headings in main specs and no sync operations left to apply.
- openspec validate --specs --strict --no-interactive:15/15 PASS before moving.
- Dated target did not exist. Moved the change to
  openspec/changes/archive/2026-10-20-f16-mvp-website-polish-and-acceptance/.
- All7 SHA-256 file hashes unchanged, including .openspec.yaml. No incomplete
  artifact/task warning. External task-record archive path and handoff updated.

F16 and EPIC-MVP remain locally accepted at implementation3bfc8c5, reproduced
handoff a6ed966 and closure b28f2a4; canonical behaviour ownership/status/effort
remain unchanged. V2 stays frozen. This is archive bookkeeping, with no new
runtime/browser/security/manual test claim or security approval renewal.
No new commit, push, public release or deployment; changes remain local/uncommitted.
Post-move checks PASS: no active changes in CLI; planning integrity and22
planning-rule tests; strict15 main specifications; git diff --check. Rechecked
archive hashes after these checks: all7 unchanged. Both planning renderers rerun
without canonical status/ownership edits.

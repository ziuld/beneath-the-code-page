# F12 — OpenSpec sync and archive

Date: 2026-10-18. Owner explicitly requested F12 archival and selected Sync now.

- Change: `f12-mvp-navigation-and-local-runtime`, schema `spec-driven`.
- CLI confirmed all four artifacts complete and5/5 tracked tasks complete.
- The only delta capability, `supply-chain-verification`, creates a new main spec.
  Its authored Purpose and all3 requirements/5 scenarios were preserved verbatim;
  only the title and delta section header changed to canonical main-spec form.
- One specs-instruction snapshot was fetched and reused for inline sync. No
  changes to other capabilities or behavioural ownership migration in plan.json.
- Exact main/delta comparison and strict validation of all11 main specs passed
  before moving the change. No sync differences remained and the target was absent.
- Archive: `openspec/changes/archive/2026-10-18-f12-mvp-navigation-and-local-runtime/`,
  including its original `.openspec.yaml` metadata and complete task/artifact set.
- `openspec list --json` reports no active changes. The task-record path is updated.

This operation changes specifications and archive bookkeeping only. Runtime,
Boot4.1.1, policy expiry2026-11-01 and accepted evidence remain unchanged. No
application tests or scans rerun, no archive commit/push/release performed. Separate
F07 archival edits remain preserved. Implementation/closure commits remain71aeefc
andcfd8d14. Post-archive checks pass: exact synced-content comparison, original
metadata/artifact and5/5 task verification, strict validation of all11 main specs,
planning integrity and whitespace. No warnings or incomplete artifacts/tasks.

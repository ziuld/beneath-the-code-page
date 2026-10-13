# F02-UH01 — final acceptance and local integration

Date: 2026-10-13. Actual owner effort: unreported.

This record supersedes the prior unaccepted/in_review handoff without rewriting
historical command results in the original execution evidence.

## Authorisation and acceptance

The owner requested all review fixes, verification, integration and ownership
resolution; then explicitly selected synchronisation/archival and accepted local
commits on main including the previously prepared related OpenSpec setup/proposal
files. Final slice acceptance is therefore explicit, not inferred from test counts.
No push, remote CI pass, external publication or future-feature acceptance is claimed.

## Review finding resolved

Script and module-preload URLs now require `.js`; stylesheet URLs require `.css`.
Three unit regressions exercise incorrect entry/stylesheet/preload roles. Two new
packaged-process regressions use real existing files of the wrong type and verify
non-zero startup exit before readiness with `BTC_ASSETS_TYPE_INVALID`, without raw
manifest disclosure. Existing missing-entry and safe diagnostic cases still pass.
Local review found no remaining material blocker within F02-UH01's authorised scope.

## Executed checks before integration

- `python3 scripts/verify-java-baseline.py clean`: exit 0; frontend checks and one
  real-build frontend test; 54 Java unit/context/architecture cases (7 explicit
  absent-capability skips), 9 packaged cases; zero failures/errors.
- `python3 scripts/smoke-java-baseline.py`: exit 0, executable health HTTP 200/UP,
  child stopped with expected termination status 143.
- `python3 scripts/test-planning-rules.py`: 15 tests, OK. Includes read-only
  hydration, propagated main-spec edits, rejection of duplicate behaviour,
  missing/outside references, ID drift and unsupported scenario steps.
- `openspec validate --specs --strict`: one main specification passed.

## Behavioural ownership

ADR 004 records the accepted incremental migration. The main specification
`openspec/specs/packaged-browser-assets/spec.md` owns this story's two requirements
and scenarios; their blocks and Purpose are identical to the accepted delta.
`plan.json` retains IDs, verification links and tracking only. Generated planning
views are read-only; archived deltas are history. Other stories remain plan-owned.
F02-UH02 stays planned, so F02 stays open. Effort is not fabricated.

## Integration result

Local commit and post-commit verification results will be recorded after execution.

# F02-UH01 — OpenSpec proposal evidence

Date: 2026-10-13. Scope: authorised planning only, prepared with AI assistance for Ziuld. Change: `f02-uh01-frontend-assets`, schema `spec-driven`.

## Delivered artifacts

- [Proposal](../../openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/proposal.md): bounded F02-UH01 scope and new `packaged-browser-assets` capability.
- [Delta specification](../../openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/specs/packaged-browser-assets/spec.md): R01/R02 and AC01/AC02 with unchanged EARS and Given/When/Then semantics, apart from the required uppercase SHALL keyword.
- [Design](../../openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/design.md): Maven-owned assets, private manifest resolution, test-only packaged rendering and safe startup rejection.
- [Tasks](../../openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/tasks.md): five canonical task IDs, subdivided into 12 checklist items (unfinished at proposal time), preserving the 8h story estimate without additional effort. Links updated after authorised archival.

## Executed checks

- `openspec context --json` and `openspec list --json`: resolved this repository as the root; no existing change conflicted with the requested name.
- `openspec list --specs`: no existing capabilities. No current-state specification was seeded.
- Installed `openspec instructions` for proposal/specs/design/tasks were read before writing their artifacts; status was refreshed after each artifact was created.
- `openspec status --change f02-uh01-frontend-assets --json`: all four artifacts exist and planning is complete. This is artifact-existence status, not implementation acceptance.
- `openspec validate f02-uh01-frontend-assets --strict`: exit 0, change valid.
- Read-only Python correspondence assertions: exact canonical EARS text after SHALL normalisation; exact scenario IDs/names and Given/When/Then text; exactly two requirements, two scenarios, five canonical task IDs and 12 unfinished checklist items; artifact trailing-whitespace/final-newline checks passed.
- `python3 scripts/check-planning.py`: exit 0; 17 features, dependencies, estimates, evidence/local links, generated views, hierarchy, requirement/scenario coverage, verification links, effort rollups and closure rules passed.
- `python3 scripts/test-planning-rules.py`: exit 0; 10 tests, OK.
- `git diff --check`: exit 0; no tracked whitespace errors at the initial validation point.

## Scope and limitations

Existing uncommitted OpenSpec setup work was inspected and preserved. Application sources, POM, frontend configuration and canonical plan were not changed. No Java/frontend build, packaged runtime test, acceptance scenario, new CI run, commit or publication occurred. Actual owner effort remains unreported. The unchanged canonical plan requires no generated-view regeneration for this proposal; freshness checks passed.

F01 acceptance is established by existing tracker/evidence, not a fresh execution here. F02 and all F02-UH01 implementation tasks remain planned; no checkbox is completed. `plan.json` remains authoritative pending explicit behavioural migration. Exact frontend version compatibility is a bounded T02 implementation check; it is not a proposal validation result. Sync/archive must wait for acceptance evidence and resolved behavioural ownership.

Next action: review the artifacts, then explicitly request `/opsx-apply f02-uh01-frontend-assets` when implementation is authorised.

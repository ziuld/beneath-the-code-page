# ADR 004 — Incremental OpenSpec behavioural ownership

Date: 2026-10-13. Status: accepted by the owner through approval of synchronisation, migration and archival.

## Decision

For F02-UH01, the main `openspec/specs/packaged-browser-assets/spec.md` owns
requirements and acceptance scenarios. `plan.json` retains stable requirement and
scenario IDs, verification links, task descriptions, dependencies, effort, status,
dates, evidence and commit references. It must not retain editable behavioural text
for this migrated story. Other stories remain unchanged and plan-owned unless
explicitly opted in as recorded below.

F03-UH01 was subsequently opted in by the owner's explicit “Sync and migrate”
choice on 2026-10-13. `openspec/specs/home-page/spec.md` now owns its requirements
and acceptance scenarios; plan.json retains IDs, verification links and tracking.
F03-UH02 and F02-UH02 remain plan-owned. No repository-wide migration is implied.

Planning scripts resolve opted-in `behaviour_spec` references before generating
read-only EARS/Gherkin views or checking traceability. Invalid references, ID drift
and duplicate plan-owned text fail validation. Archived change deltas are historical
records, not a second editable source. Future behavioural changes use OpenSpec deltas
and synchronise into the main specification; regenerate views afterwards.

## Trade-offs

This avoids a repository-wide migration and preserves existing planning IDs and
effort. It adds a deliberately narrow standard-library reader for the current
EARS/GIVEN/WHEN/THEN main-spec format. Unsupported formats fail rather than silently
losing steps; extend the reader with tests before adopting more complex scenarios.
The main specification path is stable across archival. Tracking is not inferred from
OpenSpec task checkboxes: story completion still requires integration and evidence.

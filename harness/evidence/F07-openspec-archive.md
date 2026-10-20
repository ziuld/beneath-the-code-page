# F07 — OpenSpec synchronisation and archive

Date: 2026-10-18. Schema: spec-driven. Status: archived locally.

Owner explicitly requested archiving F07 and selected synchronising the delta
specs first. CLI confirmed the repository-local root, all four artefacts done and
exactly14/14 tracked tasks complete. Archive instructions supplied English context;
the single specs-instruction snapshot had no additional configured artifact rules.

## Synchronisation

- Created `openspec/specs/json-validator/spec.md`: four added requirements.
- Created `openspec/specs/json-minifier/spec.md`: five added requirements.
- Updated only Formatter's catalogue requirement: accepted F06/F07 destinations
  and one new publication scenario. Existing title/Purpose, unrelated requirements
  and every prior scenario retained.

Read-only assertions verified the new specs equal the complete deltas with only
canonical title/Requirements-heading transformations. Formatter's changed block
matches its delta exactly; its preceding content matches Git HEAD unchanged.
No delta-operation headings remain. Strict main-spec validation passes10/10.
All three capabilities fully synced before archiving; no missing Purpose or other
sync blocker. This does not migrate plan-owned requirements/scenarios under ADR004.

## Archive

Moved the complete change, including `.openspec.yaml`, to:
`openspec/changes/archive/2026-10-18-f07-json-validator-and-minifier/`.
Checked that the target did not exist before moving; nothing overwritten.
Updated the live Minifier task link and current handoff. Three existing WebKit
reload TODOs remain documented; no incomplete artifact/task warning applies.

Runtime/test code unchanged from accepted770aa98; no redundant application or
browser rerun needed for this specification/documentation-only operation.
No commit/push/merge/release performed for the archive. Reduced F12 remains next
and unstarted.

Post-archive checks executed: active-change list empty; strict OpenSpec10/10,
planning integrity/closure/local-link/generated-view checks and whitespace pass.
No canonical plan values changed, so no regenerated planning view differs.

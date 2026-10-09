# ADR 0002 — explicit hierarchy with EARS and Gherkin

Status: accepted structure, requested by the user on 2026-10-09. Story wording and detailed estimates are implementation-planning drafts until reviewed before the relevant work.

Decision: use Epic → Feature → User Story (UH) → Task. Preserve EPIC-MVP and F00–F16, make Home explicit in F03, and express each UH through both EARS requirements and linked Gherkin acceptance scenarios. Add ordered tasks, verification mapping and closure evidence.

Rationale: the owner wants to read a feature, understand expected behaviour, implement/test/commit a small item, close it with evidence, then proceed. Stable IDs connect those activities without counting documentation as product completion.

Trade-off: the requested four levels exceed Jira's default parent hierarchy. Repository hierarchy is literal; mapping to an actual Jira configuration is a later integration concern, not a reason to remove Feature. No Jira instance is modified.

Source of truth: plan.json, generating feature dossiers, .feature files, queue, traceability and read-only dashboard. On OpenSpec adoption explicitly migrate behavioural ownership to its validated schema; do not duplicate editable requirements. Installation is not authorised by this planning change.

Estimates: retain 298 baseline owner hours and allocate them to children. This is budget decomposition, not a measured new forecast. Revisit after technical proofs and course pilot.

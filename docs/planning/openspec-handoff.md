# OpenSpec handoff — F02-UH01 behaviour adopted

Final update, 2026-10-13: F02-UH01 is done, owner-accepted and locally integrated
in `938b97c`, with clean post-commit verification. The change is archived at
`openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/`; its two requirements
are synchronised into the main `packaged-browser-assets` specification.
F02-UH02 remains planned and F02 stays open. No remote publication occurred.
See [integration evidence](../../harness/evidence/F02-UH01-integration.md).

Current ownership (2026-10-13): F02-UH01 now uses
`openspec/specs/packaged-browser-assets/spec.md` as its sole editable behavioural
source (ADR 004). plan.json retains tracking/IDs/verification links; generated
views read the main specification. Other stories remain plan-owned. The owner
accepted the slice and authorised local integration/archival; remote publication
is not authorised. This supersedes the historical observations below.

Implementation update, 2026-10-13: F02-UH01 is locally implemented and verified, with [execution evidence](../../harness/evidence/F02-UH01-frontend-assets.md). Canonical T01–T04 are done; story/T05 remain in_review pending integration/final acceptance. No commit, publication, sync/archive or behavioural ownership migration occurred. plan.json remains authoritative; this supersedes the earlier proposal-only implementation observation below.

Historical proposal update, 2026-10-13: [f02-uh01-frontend-assets](../../openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/proposal.md) was prepared and strictly validated for F02-UH01, retaining the existing requirement, scenario and task IDs. See [proposal evidence](../../harness/evidence/F02-UH01-openspec-proposal.md). Implementation and behavioural adoption were pending at that time. The setup account below describes the earlier initialisation state, not the current change inventory.

On 2026-10-13, the owner authorised project initialisation with OpenCode integration. The existing OpenSpec CLI 1.14.1 was used without a global update. Initialisation created `openspec/`, its English `spec-driven` configuration, and six skills and six commands under `.opencode/`. See `../../harness/evidence/openspec-setup.md`. No proposed change or behavioural ownership migration has been created yet.

## Mapping

| Repository concept | OpenSpec role after adoption |
|---|---|
| Epic and feature IDs | Product scope and grouping references |
| One bounded UH or tightly related set | Candidate change, not automatically the entire MVP |
| EARS requirements | Named behavioural requirements |
| Gherkin Given/When/Then | Corresponding requirement scenarios in the installed schema's supported format |
| Ordered UH tasks | Implementation checklist referencing existing task IDs |
| Evidence and commit records | Verification/integration evidence before completing a change |

Official workflow reference: [OpenSpec getting started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md). It separates proposed changes from the system's current specifications. Do not seed its current-state specs with all unimplemented MVP requirements as though they already exist.

## Adoption sequence

1. Confirm installed OpenSpec version and actual generated schema/commands after the user installs or authorises installation.
2. Inspect existing repository guidance before initialisation; preserve AGENTS.md and the manual Initializr boundary.
3. Use the next ready story to create a proposed change with the same IDs, EARS rules and Gherkin semantics.
4. Validate the generated artifacts using that installed version. Do not guess commands from another release.
5. Implement only after the separate implementation handoff. Verify and record evidence before syncing/archiving completed behaviour.

Until adoption, plan.json is authoritative for requirements/scenarios/tasks and all rendered files are generated views. On adoption, explicitly migrate behavioural ownership to OpenSpec and replace copied prose in the tracker with stable links. Retain status, estimates and evidence in the tracker. Do not create two editable acceptance catalogues. OpenSpec and Cucumber installation are separate decisions; readable Gherkin does not require Cucumber.

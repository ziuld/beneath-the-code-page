# OpenSpec project setup

Date: 2026-10-13.

The owner confirmed `/home/ziuld/AI/beneath-the-code` with OpenCode integration after requesting the upstream install guide.

## Executed checks and setup

- `node --version`: `v26.8.1`, meeting the guide's minimum 20.19.0.
- `openspec --version`: `1.14.1` before and after setup. The existing global CLI was retained; no installation or update was performed.
- Inspected project guidance and legacy command directories/marker blocks, plus relevant home prompt directories. No legacy files were found; no cleanup was needed.
- `openspec init --tools opencode --language English --no-animation --no-copilot-cloud`: exit 0. Reported six skills and six commands in `.opencode/`, and `openspec/config.yaml` with schema `spec-driven`. The Copilot flag was ignored because Copilot was not selected.
- Inspected generated `openspec/config.yaml`, directories and `.opencode/commands/opsx-propose.md`. The proposal command is `/opsx-propose`, not `/opsx:propose`.
- Working tree after initialisation: new `.opencode/` and `openspec/`; no pre-existing tracked files changed by the CLI.

## Boundary and next step

Setup only: no F02 implementation, proposed change, current-state specification or acceptance migration. `docs/planning/plan.json` remains authoritative until an explicit behavioural adoption migrates ownership and replaces copied tracker acceptance prose with stable links.

Commands generated: `/opsx-propose`, `/opsx-explore`, `/opsx-apply`, `/opsx-archive`, `/opsx-sync`, `/opsx-update`. CLI output reported no setup-required or restart note. OpenCode V2 documents automatic command-file reload.

The CLI displayed its anonymous usage-statistics notice. Telemetry settings were not changed; upstream documents `OPENSPEC_TELEMETRY=0` as an opt-out.

# F04 whole-feature proposal evidence

Date: 2026-10-14. Scope: planning only, requested as one proposal for complete F04.

## Delivered artifacts

- [Proposal](../../openspec/changes/f04-security-and-locale-flow/proposal.md).
- [Locale-preferences delta](../../openspec/changes/f04-security-and-locale-flow/specs/locale-preferences/spec.md): F04-UH01-R01/R02 and AC01/AC02, with architectural edge-case scenarios.
- [Secure-HTTP-responses delta](../../openspec/changes/f04-security-and-locale-flow/specs/secure-http-responses/spec.md): F04-UH02-R01/R02 and AC01/AC02, with security/privacy scenarios.
- [Design](../../openspec/changes/f04-security-and-locale-flow/design.md): repository-grounded choices and risks; exact ASVS 5.0.0 release selected from the official tagged source.
- [Tasks](../../openspec/changes/f04-security-and-locale-flow/tasks.md): 16 unchecked implementation/verification/closure items mapped to the ten canonical tasks.
- [Planning task record](../tasks/F04-openspec-proposal.md).

## Executed planning checks

- `openspec context --json` and `openspec list --json`: existing nearest project root resolved to `/home/ziuld/AI/beneath-the-code`; no active change before creation.
- `openspec status --change f04-security-and-locale-flow --json`: proposal, specs, design and tasks all present/done; planning complete. This describes artifact existence, not implementation completion.
- `openspec validate f04-security-and-locale-flow --strict`: passed.
- `python scripts/test-planning-rules.py`: all 15 tests passed.
- `git diff --check`: passed at the initial artifact validation point; final documentation checks recorded below after execution.
- `python scripts/render-backlog.py` and `python scripts/render-roadmap.py`: both completed; generated views unchanged.
- `python scripts/check-planning.py`: passed feature/dependency/estimate/evidence/link/generated-view integrity and hierarchy/EARS/scenario/verification/closure checks.
- Final `openspec validate f04-security-and-locale-flow --strict` and `git diff --check`: passed after documentation updates.
- `openspec status --change f04-security-and-locale-flow`: 4/4 planning artifact groups complete; implementation checkboxes remain unchecked.

## Boundaries and limitations

No application code, tests, runtime configuration, main specifications or canonical feature status were changed. No Maven/application/browser tests were executed for this proposal, and no F04 acceptance result is claimed. F04 and both stories remain planned, with plan.json retaining behavioural ownership and unchanged estimates. Actual owner effort is unreported.

No commit, push, release, sync, archive or automatic implementation. Existing `.vscode/settings.json` changes are unrelated and preserved. The next step is artifact review followed by a separate apply request.

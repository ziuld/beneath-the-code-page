# F16 OpenSpec proposal evidence

Date: 2026-10-20. Owner: Ziuld with AI assistance. Request: /opsx-propose F16.
Scope: planning only; no implementation or acceptance claim.

## Inspected state

Target: /home/ziuld/AI/beneath-the-code. Working tree was clean before proposal
creation. OpenSpec CLI 1.14.1 resolved the nearest existing project root; no active
changes existed. F12 and F14 are accepted; F14 is synced/archived. Main capability
inventory has 13 specifications. HomeNavigation still disables Learn promotion;
existing shared URLs do not preserve explicit language across all site links.
The real source-to-jvm unit is already published with its same-page answer.

Read AGENTS.md, current handoff, architecture/feasibility, hierarchy/epic, F16
requirements/scenarios/tasks, quality/security policies, existing learning/Home/
shared/security specs, navigation/composition/templates, nearby Java/browser and
planning fixtures, runbook guidance and the repository openspec-propose skill.

## Artifacts

Change: openspec/changes/f16-mvp-website-polish-and-acceptance/.

- proposal.md: bounded promotion/polish, acceptance and local handoff scope.
- design.md: catalogue-aware publication, locale-preserving shared URLs, reused
  tests/styles, final security review and clean-checkout candidate reproduction.
- specs/mvp-acceptance/spec.md: F16-UH01-R01/R02 and AC01/AC02.
- specs/local-release-handoff/spec.md: F16-UH02-R01/R02 and AC01/AC02.
- specs/learning-navigation/spec.md: added promotion/language/publication contract;
  existing F13 empty/F14 pre-integration contracts remain intact.
- tasks.md: 10 unchecked bounded slices covering all 11 canonical task IDs.

Keep the 20h historical baseline and 8h forecast (5h/3h), frozen V2 status and
unreported owner effort. No plan status, canonical behaviour ownership or main
specification was changed. Read-only generated views required no regeneration.

## Executed checks

- openspec status --change f16-mvp-website-polish-and-acceptance: 4/4 planning
  artifacts complete; this is artifact existence, not implementation completion.
- openspec validate f16-mvp-website-polish-and-acceptance --strict: PASS.
- openspec validate --all --strict --no-interactive: PASS, 14 items (the change
  and 13 existing main specifications), zero failures.
- python3 -B scripts/check-planning.py: PASS, 17 features, hierarchy/dependencies,
  estimates, evidence/local paths and generated-view consistency.
- python3 -B scripts/test-planning-rules.py: PASS, 22 tests. These are planning
  controls, not runtime acceptance or a complete F16 defect-triage result.
- Read-only ID/structure check against plan.json: PASS, all four canonical F16
  requirement IDs and four scenario IDs occur once in the deltas, every one of
  the 11 canonical task IDs is mapped, three capability deltas exist and all 10
  implementation slices are unchecked. The initial ad hoc checker used the wrong
  scenarios key; it was corrected to the actual schema and rerun successfully.
- git diff --check: PASS for tracked changes; separate explicit whitespace/final-
  newline inspection covered the newly untracked proposal/task artifacts: PASS.

## Boundaries and next action

No application build, browser run, security scan, manual owner review or clean-
checkout reproduction was run. No runtime/content/test implementation, security
policy renewal, commit/push, deployment, sync/archive or global configuration edit.
Final V1 must reassess the eight bounded security decisions against the actual
candidate; their existing expiry remains the start of 2026-11-01 UTC. Chromium
alone is required; Firefox/WebKit are optional post-MVP. Generated-filesystem
local-profile preview is distinct from packaged classpath-asset evidence.

Proposal is ready for review. Begin apply only after a new explicit user request;
planning readiness does not close F16, either story, any implementation task or
the MVP epic. Commit/publication and sync/archive retain their applicable authority.

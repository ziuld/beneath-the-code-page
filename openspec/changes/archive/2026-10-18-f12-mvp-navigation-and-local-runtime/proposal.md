# Proposal

## Why

F12 still queues requirements reconciliation and missing security-gate evidence,
although the three-tool catalogue and local JAR workflow already passed F06/F07
acceptance. Finish those gaps without rebuilding or reviewing accepted work again.

## What Changes

- Align F12-UH01-R02/AC02 with the existing safe localised 403 for unknown tool
  routes, as approved by the owner; retain the deny-by-default security policy.
- Credit existing catalogue, EN/ES/FR, keyboard and loopback JAR evidence. Add no
  duplicate route framework, launcher, smoke suite or manual-acceptance cycle.
- Add only the missing dependency, secret and static-analysis blocking checks to
  existing verification, with traceable results and visible scanner failures.
- Use one combined F12 closure record; retain stable task IDs, the historical 14h
  baseline and provisional 2h forecast. Do not claim the forecast is measured.

## Capabilities

### New Capabilities

- `supply-chain-verification`: fail local/CI verification on unresolved blocking
  dependency, secret or static-analysis findings, or incomplete scanner execution.

### Modified Capabilities

None. `secure-http-responses` already specifies safe 403 for unlisted routes;
`json-formatter` already owns publication of the accepted three-tool catalogue.
Their behaviour is reused, not restated in new delta specifications.

## Impact

During apply: narrowly update F12's plan-owned requirement/scenario and generated
views; add project-local scanner configuration/verification and existing CI steps;
update the delivery runbook and one evidence record. No application routes,
templates, frontend algorithms, CSP, runtime dependencies or management topology
change. No Docker, generic release platform, hosted scanning account, deployment,
repository settings, automatic dependency upgrades or V2 work.

Main OpenSpec specifications and application/CI code remain untouched by this
proposal. F12 behaviour ownership stays in `plan.json` until an explicit migration;
these delta artifacts are the implementation contract, not an ownership migration.

# local-release-handoff Specification

## Purpose

Give maintainers a reproducible, identified local release candidate with tested
instructions, visible limitations and an explicit boundary against publication.

## Requirements

### Requirement: F16-UH02-R01 — Reproduce the accepted local candidate

When a maintainer follows the local release instructions from a clean checkout,
the application SHALL start using the documented configuration.

#### Scenario: F16-UH02-AC01 — Reproduce the release

- **GIVEN** the accepted commit and pinned prerequisites are available
- **WHEN** a maintainer follows the local runbook
- **THEN** the application becomes healthy and the documented smoke checks pass
- **AND** evidence records the actual source revision, tool versions, packaged artifact identity, commands, results and shutdown
- **AND** the handoff identifies one available EN/ES/FR unit, Chromium-only required coverage, security evidence and remaining limitations

### Requirement: F16-UH02-R02 — Keep the handoff inside agreed local scope

If a proposed release includes cloud deployment or account functionality, then
the Phase 1 scope review SHALL reject that addition pending a separate decision.

#### Scenario: F16-UH02-AC02 — Keep the release inside agreed scope

- **GIVEN** the local release candidate is ready
- **WHEN** the release instructions are reviewed
- **THEN** they contain no implied hosting, account setup or unauthorised publication step
- **AND** Docker/Compose, additional tools and additional units are not local MVP prerequisites
- **AND** local acceptance is not represented as permission to push, publish or deploy

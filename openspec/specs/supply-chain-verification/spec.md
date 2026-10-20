# supply-chain-verification Specification

## Purpose

Give maintainers a reproducible application security check that blocks unsafe
local release candidates without adding container or deployment infrastructure.

## Requirements

### Requirement: F12-UH02-R02 — Block unresolved security findings

Integrated verification SHALL check application dependencies, repository secrets
and applicable Java/TypeScript static analysis. It SHALL fail on unresolved
blocking findings. High/critical dependency or security-rule findings and detected
secrets SHALL block by default; a non-applicable finding requires an explicit,
narrow owner-approved disposition with a reason and expiry.

#### Scenario: F12-UH02-AC02 — Block an unsafe release candidate

- **GIVEN** an application scan reports a finding classified as blocking
- **WHEN** local or CI integrated verification runs
- **THEN** verification exits unsuccessfully and identifies the finding without exposing a secret value
- **AND** normal Maven or browser success cannot override that result

#### Scenario: Accept only a complete non-blocking result

- **WHEN** all required scans finish with no unresolved blocking findings
- **THEN** the security verification succeeds and records the scan scope and disposition of any remaining findings
- **AND** expired or unmatched exceptions cannot suppress a blocking finding

### Requirement: Reject incomplete security verification

Security verification SHALL fail visibly when a required scanner, configuration,
database or result is unavailable, invalid or incomplete. Missing coverage SHALL
NOT be treated as a clean scan. The same blocking policy SHALL apply to the
documented local command and CI without elevated credentials or a hosted account.

#### Scenario: A scanner cannot complete

- **WHEN** a required scan cannot start, times out, cannot obtain required data or reports a parsing/configuration error
- **THEN** verification exits unsuccessfully with a bounded operational reason
- **AND** the result is recorded as incomplete rather than no findings

### Requirement: Retain traceable non-disclosing security evidence

Security evidence SHALL identify the scanned revision or working-tree state,
dependency inputs, scanner/rules versions, database freshness, commands, outcomes
and unresolved findings or approved dispositions. Shared reports and logs SHALL
NOT expose detected secret values. Scanning SHALL NOT transmit browser tool
payloads or upload repository source to an external analysis service.

#### Scenario: Record results without leaking a detected secret

- **WHEN** a scan detects a synthetic secret and writes its result
- **THEN** shared output identifies the rule and location while the secret value remains redacted
- **AND** evidence ties the failed result to the scanned source and scanner configuration

#### Scenario: Reuse an applicable accepted result

- **GIVEN** accepted evidence covers unchanged inputs and the recorded security data remains applicable
- **WHEN** F12 acceptance is recorded
- **THEN** that evidence is referenced rather than repeating the same scan or review
- **AND** changed inputs, expired exceptions or stale required security data require only the affected verification to run again

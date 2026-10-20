# Proposal

## Why

F12 and F14 are accepted, but the reviewed first learning unit is still absent
from Home/shared Learn promotion. F16 connects the retained website journeys,
verifies final MVP acceptance and gives maintainers a reproducible local candidate.

## What Changes

- Enable Home/shared Learn links to the existing published landing, course and
  source-to-JVM unit, preserving EN/ES/FR reading context and native navigation.
- Polish the existing shared responsive design only where complete-journey review
  finds defects; retain the approved B logo and current visual direction.
- Trace all retained V1 criteria to actual build, Chromium, privacy, security,
  architecture and owner keyboard/visual/language/200%-zoom evidence. A required
  failure keeps the affected story and MVP acceptance open.
- Update the existing local packaged-JAR runbook and release notes with exact
  candidate identity, reproduction steps and honest compatibility/security limits.
- Reassess final V1 security decisions against the actual candidate; do not renew
  bounded approvals or alter their scope/expiry without explicit owner approval.

## Capabilities

### New Capabilities

- `mvp-acceptance`: F16-UH01's retained website acceptance boundary, evidence and
  rejection of incomplete V1 acceptance.
- `local-release-handoff`: F16-UH02's reproducible local candidate and explicit
  limits on release instructions and publication.

### Modified Capabilities

- `learning-navigation`: integrate the reviewed first unit into Home/shared Learn
  navigation after its separate publication, retaining safe empty/draft boundaries.

## Impact

Apply touches the existing HomeNavigation composition, shared Thymeleaf links,
localised labels/shared styles as needed, and their Java/Chromium tests. Reuse the
Maven/browser/security/planning scripts and existing local JAR runbook; add no
runtime, dependency, endpoint family or framework. Main Home/shared specifications
already require safe publication-aware links and visible localised controls;
those contracts remain valid.

Keep all 11 canonical F16 task IDs, 20h historical baseline and 8h forecast (5h/3h).
F08–F11/F15, extra units, Docker/Compose, broad redesign, accounts, persistence,
cloud hosting and deployment remain outside V1. Chromium alone is required;
Firefox/WebKit and speech review are not final acceptance gates. This proposal
changes planning artifacts only; implementation, commits, push, publication and
spec synchronization/archive remain separate workflow actions.

# Proposal

## Why

The owner explicitly excludes screen-reader compatibility and manual speech testing from the intended product scope while retaining keyboard operation and visual usability. F05's approved scope revision must be reflected in project-wide planning so later features do not reintroduce the removed acceptance gate or imply full WCAG AA conformance.

## What Changes

- Reconcile the quality plan and brand guidance with the approved keyboard/visual scope: keyboard commands/navigation, labels, visible focus, contrast, zoom, reflow, reduced motion and localisation remain.
- Remove mandatory screen-reader review from future acceptance guidance, without recording unperformed checks as passed or merely deferring them to F16.
- Replace the blanket WCAG 2.2 AA target with explicitly retained criteria; do not claim full conformance or verified screen-reader compatibility.
- Preserve existing semantic markup, labels, safe live statuses, axe checks and all security/privacy/browser gates. No application-code removal, package removal or desktop reconfiguration.
- Preserve historical decisions and evidence; identify this later scope decision explicitly. Do not change stable IDs, estimates or behavioural ownership automatically.

## Capabilities

### New Capabilities

None. This is a documentation/acceptance-policy reconciliation, not a runtime capability.

### Modified Capabilities

None. The five main specifications have no screen-reader or blanket WCAG requirement. F05 remains plan-owned and its editor delta has already received the separately approved scope revision. `skip_specs: true` avoids inventing a behavioural specification for documentation work.

## Impact

Primary targets: `docs/quality/quality-plan.md`, `docs/brand/brand-application.md`, relevant future acceptance/planning guidance and generated views if their sources change. Reconcile references in delivery/handoff documentation without erasing historical failures. No Java/TypeScript, dependencies, CSP, routes, CI coverage, merge, release or automated story migration is in scope. This proposal does not itself complete F05's retained manual observations.

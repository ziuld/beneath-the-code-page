# ADR 008 — Bound WebKit fault-injection follow-up

Date: 2026-10-18. Status: accepted by the owner's explicit testing-scope instruction.

## Context

F07 Validator passes its clean build, Chromium94/94,Firefox48/48 and owner manual
review. Ubuntu WebKit passes ordinary correctness/privacy/CSP/diagnostics/history
checks but fails four injected-asset recovery cases. Repeated test investigation
is delaying the small MVP. The owner states a75% coverage target is sufficient,
not100%, and explicitly permits troublesome WebKit tests to remain pending/TODO.

## Decision

Apply one bounded, test-only cache-isolation correction. If the same fault-injection
cases still fail, isolate the affected WebKit recovery tests with explicit TODO/
fixme reasons and document them in the pending-browser-test register. Keep important
basic behaviour checks active; do not skip an entire engine or conceal failures.
Deferred tests are neither passes nor product fixes. Ordinary functionality,
payload privacy, CSP, token fidelity, input/resource limits and non-deferred
regressions remain required; an actual application defect is still surfaced.

This explicitly revises the former unconditional all-WebKit-case closure gate for
these documented cases only. It does not authorise weakening runtime policies or
changing application behaviour to satisfy tests. Keep the same pinned engines.

## Coverage and consequences

75% is the owner's coverage target, not permission for25% of acceptance tests to
fail. The repository currently has no instrumented line/branch-coverage threshold;
do not claim a measured percentage, install a new coverage framework or add tests
solely to raise a number during this slice. Report executed, failed and deferred
checks separately. Closure may retain owner-authorised, explicitly documented
WebKit test debt; it must not claim full verified recovery/Safari compatibility.

This is bounded MVP verification debt, not a new testing platform or a blanket
exception for future tools. Revisit on the next relevant lifecycle change, pinned
engine update or an ordinary user-facing failure.

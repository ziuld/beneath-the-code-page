# Execution sequence

Current scope, 2026-10-20: V1 is accepted and F16 merged. [ADR010](../architecture/adr-010-v2-delivery-and-portable-handoff.md)
and the [selected V2 sequence](roadmap.md#v2-delivery-sequence) supersede the blanket freeze and remaining-V1
forecasts below. Only two additional lessons are selected; design agreement precedes
remaining tools, then final browser review and Docker Desktop/second-PC handoff.
Earlier estimates, scope exclusions and pending statements below are historical
where superseded; they do not reopen V1 or claim new checks have passed.

At ten hours/week, a two-week iteration has at most 20 owner hours. “Sprint 0” and “Sprint 1” name delivery stages; they are not promises to fit every foundation or formatter task into two weeks. Split each stage into two-week planning increments and carry explicit remaining work.

## Accepted history — F00 through F06

F00 manual import, F01–F05 foundations and F06 JSON Formatter are accepted. Do not repeat bootstrap or reopen completed architecture. F06 is archived with actual three-engine and owner acceptance evidence.

## Sprint 0 — F01 through F05

Sequence: baseline/build → frontend assets → shared design/i18n shell → security/locale → editor/CSP proof. See the generated roadmap for capacity-derived duration.

Deliverables: clean Maven verification, packaged assets, shared shell, EN/ES/FR, preference form with CSRF and no server session, safe errors/headers, worker/editor security proof, required CI foundation.

Exit: M0 only after evidence from actual code. No database or cloud. Build the minimum components needed by the formatter.

## Sprint 1 — F06

First complete feature: server-rendered JSON Formatter, CodeMirror, local worker processing, indentation choice, Format/Copy/Clear, translated diagnostics, accessibility, resource limits, privacy verification and architecture checks.

Suggested increments: processing/correctness; workspace/error states; packaged browser/security/a11y acceptance. Finish the feature before starting another tool.

## Current delivery sequence — ADR010,2026-10-20

All retained V1 stages F07/F12/F13/F14/F16 are accepted; earlier remaining-hour
forecasts are historical. Execute the selected V2 phases in the generated
[roadmap](roadmap.md#v2-delivery-sequence) and [queue](execution-order.md):
security/docs → two lessons → push/PR checkpoint → agreed design page by page →
remaining tools → final browser review → Docker Desktop/second-PC handoff.
F15-UH03–UH07 remain deferred. Do not require a complete course or change accepted
V1 history. New selected work is planned, not already verified.

## Definition of ready

Feature has a clear user outcome, linked criteria, dependencies done, safe fixtures, resource/security considerations and an owner. Product questions that change acceptance are resolved; routine engineering choices do not require repeated permission.

## Definition of done

Acceptance criteria pass; applicable tests have actual recorded output; EN/ES/FR and accessibility reviewed; no payload leakage; security/architecture checks pass; documentation and plan updated; no unresolved critical defects. Evidence lists known limitations and tests not run. Owner acceptance is recorded for visual/content decisions. Only then use `done`.

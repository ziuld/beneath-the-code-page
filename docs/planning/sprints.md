# Execution sequence

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

## Remaining V1 stages — revised 2026-10-18

- F07: JSON Validator and JSON Minifier, separate user-visible tools sharing tested infrastructure.
- F12: published JSON catalogue integration and existing local JAR workflow; M2.
- F13: Learn landing, course overview, unit navigation and safe local content rendering.
- F14: short unit brief and one complete translated source-to-JVM unit; M3.
- F16: complete shared-page integration, responsive visual polish, retained quality checks and local handoff; M4.

F08–F11/F15, Docker/Compose and a broad redesign are frozen for V2. No framework work in anticipation of those features. See [ADR 007](../architecture/adr-007-focused-mvp.md) and the [remaining forecast](project-plan.md#remaining-forecast-and-order).

The provisional remaining budget is 42h plus 20% contingency, not a promise that individual stages fit a single iteration. F13 no longer depends on the all-tools runtime gate; F16 no longer depends on completing the course.

## Definition of ready

Feature has a clear user outcome, linked criteria, dependencies done, safe fixtures, resource/security considerations and an owner. Product questions that change acceptance are resolved; routine engineering choices do not require repeated permission.

## Definition of done

Acceptance criteria pass; applicable tests have actual recorded output; EN/ES/FR and accessibility reviewed; no payload leakage; security/architecture checks pass; documentation and plan updated; no unresolved critical defects. Evidence lists known limitations and tests not run. Owner acceptance is recorded for visual/content decisions. Only then use `done`.

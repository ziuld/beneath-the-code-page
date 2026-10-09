# Execution sequence

At ten hours/week, a two-week iteration has at most 20 owner hours. “Sprint 0” and “Sprint 1” name delivery stages; they are not promises to fit every foundation or formatter task into two weeks. Split each stage into two-week planning increments and carry explicit remaining work.

## Before Sprint 0 — F00

User manually generates/imports the prescribed Initializr ZIP. Inspect collisions and generated settings. No agent-generated project skeleton substitutes for this handoff.

## Sprint 0 — F01 through F05

Sequence: baseline/build → frontend assets → shared design/i18n shell → security/locale → editor/CSP proof. See the generated roadmap for capacity-derived duration.

Deliverables: clean Maven verification, packaged assets, shared shell, EN/ES/FR, preference form with CSRF and no server session, safe errors/headers, worker/editor security proof, required CI foundation.

Exit: M0 only after evidence from actual code. No database or cloud. Build the minimum components needed by the formatter.

## Sprint 1 — F06

First complete feature: server-rendered JSON Formatter, CodeMirror, local worker processing, indentation choice, Format/Copy/Clear, translated diagnostics, accessibility, resource limits, privacy verification and architecture checks.

Suggested increments: processing/correctness; workspace/error states; packaged browser/security/a11y acceptance. Finish the feature before starting another tool.

## Subsequent feature stages

- F07: JSON Validator and JSON Minifier, separate user-visible tools sharing tested infrastructure.
- F08–F10: Base64, UUID, JWT.
- F11: both YAML converters; separate acceptance for each direction.
- F12: developer-tool suite/container integration; M2.
- F13–F14: learning infrastructure, course outline, one complete translated pilot; M3.
- F15: remaining agreed Java Fundamentals lessons, exercises, answers and EN/ES/FR review.
- F16: full Phase 1 regression and local release candidate; M4.

## Definition of ready

Feature has a clear user outcome, linked criteria, dependencies done, safe fixtures, resource/security considerations and an owner. Product questions that change acceptance are resolved; routine engineering choices do not require repeated permission.

## Definition of done

Acceptance criteria pass; applicable tests have actual recorded output; EN/ES/FR and accessibility reviewed; no payload leakage; security/architecture checks pass; documentation and plan updated; no unresolved critical defects. Evidence lists known limitations and tests not run. Owner acceptance is recorded for visual/content decisions. Only then use `done`.

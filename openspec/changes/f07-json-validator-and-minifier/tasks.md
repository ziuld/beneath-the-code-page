# Tasks

Apply authorised 2026-10-18; completion below requires actual task evidence.
Use the scoped decisions in `design.md` and the three delta specs. Preserve stable
canonical IDs, the provisional 10h total and the existing MVP working-tree changes;
this checklist decomposes the two stories, not an additional estimate or new scope.
Record executed results in the proposed `harness/evidence/F07-UH01-json-validation.md`
and `harness/evidence/F07-UH02-json-minification.md` during apply, not as passing now.

## 1. Validator and shared JSON seams — F07-UH01

- [x] 1.1 Record the apply baseline and focused task/evidence record against accepted F06, the current diff and the exact touched files in `design.md`; verify F06 evidence/prerequisites and that no V2 work or behavioural ownership migration is included (F07-UH01-T01).
- [x] 1.2 Extract the existing strict input/depth/parser checks and add `json-validate` dispatch using the existing success envelope with empty acknowledgement; verify focused algorithm/protocol tests for every root type, comments/trailing commas/empty/malformed/multiple roots, safe positions, UTF-8/depth boundaries and valid input whose pretty output exceeds 8 MiB, while retaining Formatter goldens; document the shared seam (F07-UH01-T02/T03/T04).
- [x] 1.3 Reuse the session/editor lifecycle for a validator-only verdict and Validate/Cancel/Clear controls, add its lazy SSR page/messages and exact controller/security/locale/logging mappings, and update the local usage documentation; verify unit/MVC tests for verdict invalidation, no output/Copy, Clear/history, EN/ES/FR, GET/HEAD, CSRF return, no-store/no-session/CSP, no-JS and initially absent catalogue promotion (F07-UH01-T02/T03).
- [x] 1.4 Add validator cases to `editor-json-validator-minifier.spec.mjs` and verify the real packaged worker, input preservation, CRLF/Unicode/EOF locations, insertion/depth bounds, cancellation/replacement, stale verdicts, Clear/undo/Back and privacy; run clean Maven, health, full Chromium and important Firefox/WebKit checks plus retained F06 regressions. Apply one bounded fault-fixture correction; if WebKit recovery-only cases remain troublesome, isolate/document them as pending TODO/fixme under owner-approved ADR 008 without claiming they passed or changing runtime behaviour. Record actual results and limitations (F07-UH01-T03/T04; F07-UH01-AC01/AC02).
- [x] 1.5 Obtain and record the validator's owner acceptance using actual keyboard/focus, narrow layout, 200% browser zoom and EN/ES/FR observations; verify the evidence identifies environment details or explicitly marks them unreported, and do not infer speech compatibility or acceptance from automated tests (F07-UH01-T05).
- [x] 1.6 After validator acceptance, add its labelled Tools link and replace formatter-only negative assertions with exact accepted destinations while keeping Minifier/V2/Learn unadvertised; verify three-locale Home → Tools → Validator journeys and relevant changed-state regression, then update delivery/evidence/tracking and close UH01 only when its canonical criteria/tasks pass, recording a real commit when authorised (F07-UH01-T05; modified formatter publication requirement).

## 2. Minifier using the accepted seams — F07-UH02

- [x] 2.1 Confirm accepted UH01 and the shared operation/session contracts delivered by group 1; record the minifier-specific fixture and evidence mapping without reopening architecture or adding a dependency; verify the canonical prerequisite is done (F07-UH02-T01).
- [x] 2.2 Add pure whitespace-only token-slice minification after shared validation and explicit `json-minify` dispatch; verify algorithm/protocol tests for spaces inside strings, all roots, duplicate/order/large-number/negative-zero/exponent/escape fidelity, boundary whitespace, idempotence, strict failures and validation/minification of input whose pretty output exceeds its cap (F07-UH02-T02/T03; F07-UH02-AC01).
- [x] 2.3 Add the minifier SSR mode/messages and exact route/security/locale/logging mappings using the shared workspace, selectable text-only output and explicit Copy/Clear; update usage documentation and verify unit/MVC tests for stale Copy disabling, clipboard denial/unavailability/revision races, Clear/history/disposal, EN/ES/FR, GET/HEAD, safe preference returns, no-JS and initially absent catalogue promotion (F07-UH02-T02/T04).
- [ ] 2.4 Extend the packaged browser cases for real minification/token fidelity, input preservation, invalid/stale output, positioned diagnostics, limits, cancellation/retry/replacement/load failure, Copy/Clear/undo/Back and all-action privacy/CSP; verify full Chromium and critical Firefox/WebKit with retained F06/UH01 checks, plus controlled manager output-cap tests rather than an impossible expanding-minifier fixture, and record actual evidence (F07-UH02-T03/T04; F07-UH02-AC01/AC02).
- [x] 2.5 Obtain and record the minifier's owner acceptance for keyboard/focus, narrow layout, actual 200% browser zoom and EN/ES/FR, including current-result Copy and Clear behaviour; verify manual observations remain distinct from clipboard stubs and automated tests (F07-UH02-T05).
- [ ] 2.6 After minifier acceptance, publish its Tools link and verify exact Formatter/Validator/Minifier links and three-locale Home → Tools → Minifier journeys with V2/Learn still absent; update delivery/evidence/tracking and close UH02 only when its canonical criteria/tasks pass, recording a real commit when authorised (F07-UH02-T05; modified formatter publication requirement).

## 3. Integrated F07 acceptance and handoff

- [ ] 3.1 On the final publication state, run `python3 scripts/verify-java-baseline.py clean`, `python3 scripts/smoke-java-baseline.py` and `python3 scripts/verify-home-browser.py --engine chromium` (also `--engine firefox` and `--engine webkit` in supported environments); verify actual changed-code results for all JSON operations, Home/index lazy isolation, worker bytes/CSP, no payload leakage and retained foundation/F06 regressions, with blockers explicit and no assertion/time/CSP weakening.
- [ ] 3.2 Review integrated evidence and accepted owner observations, reconcile canonical story/task/feature statuses without invented effort/dates, regenerate both planning views and run planning integrity/rule tests, strict OpenSpec and whitespace checks; verify F07 is closed only when all gates pass and the current handoff names the actual next MVP action, without starting F12 or claiming merge/release authorisation.

## Workflow follow-up

- After implementation and review, synchronise the deltas and archive only when the
  owner explicitly requests those actions; do not migrate plan-owned behaviour
  automatically. Preserve every existing Formatter scenario in the modified block.
- Commit/push, supported-environment remote CI delivery, merge and release require
  the applicable explicit authorisation. Never install local system libraries or
  weaken a gate merely to obtain a green result.

# Risks and open decisions

Current delivery,2026-10-21: selected V2 work is complete: F17 maintenance,
F15-UH01/UH02 lessons, F18 design, F08–F10 tools, F19 review and F20 Docker.
F11 is removed; five further lessons remain deferred. F20 is owner-accepted on
local Linux evidence; Windows/other machines/ARM64 and real Safari are unverified.
Future VPS deployment is outside this delivery. Earlier scope/forecast statements
below are historical where superseded. See plan.json and the current handoff.

Review weekly. Likelihood/impact are qualitative planning judgements, not measured probabilities.

Scope revised by [ADR 007](../architecture/adr-007-focused-mvp.md), 2026-10-18:
F00–F06 accepted; F08–F11/F15 and containers frozen for V2. Historical converter,
bulk-course and bootstrap risks below apply only when that work is resumed. The
remaining V1 forecast is provisional because owner effort is unreported; first-unit
technical/language review and integrated visual defects are the main schedule risks.

| ID | Risk | Likelihood / impact | Owner | Mitigation and trigger |
|---|---|---|---|---|
| R01 | Editor needs a CSP exception | Medium / high | Implementation owner | F05 proof before formatter; document narrow exception only if necessary |
| R02 | Converters silently lose data | Medium / high | Implementation owner | Explicit supported subset; precision/duplicate-key fixtures; reject loss |
| R03 | Input/alias expansion freezes browser | Medium / high | Implementation owner | Preflight bounds, workers, cancellation, adversarial benchmarks |
| R04 | Course translations dominate timeline | High / high | Ziuld | Pilot measures real time; acceptance review before seven further lessons |
| R05 | Ten-hour capacity is interrupted | Medium / high | Ziuld | Relative Gantt; record actual availability; no silent overtime assumption |
| R06 | AI-generated code/copy appears correct but is wrong | Medium / high | Ziuld | Evidence-based tests, technical review, synthetic fixtures, no completion by assertion |
| R07 | Low-contrast brand tokens | Medium / medium | Ziuld | Role-specific contrast checks before shared components spread |
| R08 | Public repository includes unlicensed assets or secrets | Low / high | Ziuld | Rights register, synthetic examples, secret scanning before first push |
| R09 | Runtime patches drift before import | Medium / medium | Implementation owner | Recheck supported stable patches at F01 and record changes |
| R10 | Planning tools and status diverge | Medium / medium | Implementation owner | One JSON source, generated views, validator; require actual evidence |

## Decisions still open, with deadlines

| Decision | Needed by | Default/handling |
|---|---|---|
| Code licence and separate logo/course rights | First external redistribution decision | No licence invented; public visibility recorded |
| Standalone B/vector master | F03 small-format identity acceptance | Use supplied composition as reference; don't fake a font substitute |
| Display/UI/mono font families and licences | F03 | Self-host only after selection/licence review |
| Exact Node/frontend/test/scan package patches | F01/F02 | Pin compatible stable versions after actual build/advisory checks |
| First unit brief and learning outcomes | F14 | One complete source-to-JVM unit; no full syllabus gate; remaining units frozen for V2 |
| Human ES/FR review capacity | F14, and each tool's copy review | Owner review or explicitly tracked gap; don't claim fluency validation |
| Start date and holidays | When owner schedules work | Relative weeks; no calendar commitment |
| Actual baseline reference device/browser | F05 | Record chosen device and browser versions with benchmark evidence |

Resolved: target folder, public GitHub repository, approved architecture, logo meaning, manual Initializr responsibility, ten hours/week with AI. Do not ask those questions again.

## F01 closure disposition — 2026-10-09

The owner explicitly approved Java-baseline F01 closure after its code/checksum integration and passing CI, retaining the following findings as unfinished follow-up work. This is a recorded scope disposition, not evidence that repository settings or these deliverables exist. The canonical F01 requirements/scenarios are unchanged; later security/release gates remain in force. See [closure evidence](../../harness/evidence/F01-closure.md).

| Follow-up | Status | Owner | Next decision / gate |
|---|---|---|---|
| Security-reporting guidance and real private contact/channel | Unfinished | Ziuld | Confirm contact/channel, then author reporting guidance before treating the repository security-reporting baseline as complete |
| Issue templates | Unfinished | Ziuld with AI assistance | Agree actionable bug/feature intake fields and implement templates before structured external issue intake |
| Dependency-update configuration | Unfinished | Ziuld | Choose update tool, cadence and maintenance responsibility; automation needs explicit approval |
| Main protection and required Java check enforcement | Unfinished; main observed unprotected during audit | Ziuld | Agree solo-compatible merge/ruleset policy and explicitly authorise settings changes before claiming enforcement |
| Pinned actions' Node.js 20 runtime maintenance | Unfinished | Ziuld with AI assistance | Review supported replacement action revisions and verify them in a separate change; current runner forces Node.js 24 and CI passes |

Dependency/secret/SAST scans and their exact tool versions remain planned delivery work, not passing F01 results. Preserve integrated security/release evidence gates in F12/F16. No licence, reporting contact, permission escalation or repository setting is selected implicitly by this disposition.

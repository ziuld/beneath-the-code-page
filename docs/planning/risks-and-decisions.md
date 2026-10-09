# Risks and open decisions

Review weekly. Likelihood/impact are qualitative planning judgements, not measured probabilities.

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
| Course outline and completion standard | F14 | Eight-lesson estimating hypothesis only |
| Human ES/FR review capacity | F14, and each tool's copy review | Owner review or explicitly tracked gap; don't claim fluency validation |
| Start date and holidays | When owner schedules work | Relative weeks; no calendar commitment |
| Actual baseline reference device/browser | F05 | Record chosen device and browser versions with benchmark evidence |

Resolved: target folder, public GitHub repository, approved architecture, logo meaning, manual Initializr responsibility, ten hours/week with AI. Do not ask those questions again.

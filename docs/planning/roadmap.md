# Generated roadmap

Baseline date: 2026-10-09.

1/17 features accepted; 2/298 baseline hours accepted (1%). Forecast 298 owner hours + 59.6h contingency = 357.6h, approximately 36 weeks at 10h/week. No start date committed.

Initial estimating envelope: 194–552h before contingency. These are judgement ranges, not confidence intervals. AI assistance is already assumed.

Week 1 begins at project start. Fractional weeks show capacity, not exact appointments. Bars are total-feature forecasts in planned order, not actual-date tracking; completed bars retain their baseline slot and use their status label.

| ID | Feature | Hours | Elapsed weeks from start | Status | Depends on |
|---|---|---:|---|---|---|
| F00 | Manual Initializr import | 2 | 0.0–0.2 | done | — |
| F01 | Java baseline and boundaries | 10 | 0.2–1.2 | in_review | F00 |
| F02 | Frontend asset pipeline | 12 | 1.2–2.4 | planned | F01 |
| F03 | Home and shared EN/ES/FR shell | 18 | 2.4–4.2 | planned | F02 |
| F04 | Security and locale flow | 14 | 4.2–5.6 | planned | F03 |
| F05 | Editor and CSP proof | 14 | 5.6–7.0 | planned | F04 |
| F06 | JSON Formatter | 24 | 7.0–9.4 | planned | F05 |
| F07 | JSON Validator and Minifier | 10 | 9.4–10.4 | planned | F06 |
| F08 | Base64 Encoder/Decoder | 6 | 10.4–11.0 | planned | F06 |
| F09 | UUID Generator | 4 | 11.0–11.4 | planned | F06 |
| F10 | JWT Decoder | 8 | 11.4–12.2 | planned | F06 |
| F11 | JSON and YAML converters | 24 | 12.2–14.6 | planned | F07 |
| F12 | Tool suite and local runtime | 14 | 14.6–16.0 | planned | F07, F08, F09, F10, F11 |
| F13 | Learning pages and navigation | 16 | 16.0–17.6 | planned | F12 |
| F14 | Course outline and pilot | 18 | 17.6–19.4 | planned | F13 |
| F15 | Complete Java Fundamentals | 84 | 19.4–27.8 | planned | F14 |
| F16 | Full Phase 1 acceptance | 20 | 27.8–29.8 | planned | F15 |

## Milestones

| ID | Exit | Elapsed weeks, before shared contingency |
|---|---|---:|
| M0 | Runnable secure foundation | 7.0 |
| M1 | First usable JSON Formatter | 9.4 |
| M2 | All eight developer tools | 16.0 |
| M3 | Learning pilot in three languages | 19.4 |
| M4 | Full Phase 1 local release candidate | 29.8 |

Source: [plan.json](plan.json). Run `python3 scripts/render-roadmap.py` from the project root after updates.

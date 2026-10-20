# Generated roadmap

Baseline date: 2026-10-09.

11/12 features accepted; 152/172 baseline hours accepted (88%). Remaining V1 forecast 8 owner hours + 1.6h contingency = 9.6h, approximately 1 weeks at 10h/week. 5 V2 features frozen and excluded. No delivery date committed.

Historical V1 baseline envelope: 111–304h; total-feature V1 forecast 134h includes accepted work. Remaining forecasts are provisional judgements, not measured velocity. Recorded zero actual hours means unreported effort.

Week 1 begins when remaining work resumes. Accepted features have no remaining bar; fractional weeks show capacity, not appointments. Shared contingency applies only to remaining V1 work.

| ID | Feature | Total-feature forecast hours | Weeks from resumption | Status | Depends on |
|---|---|---:|---|---|---|
| F00 | Manual Initializr import | 2 | Accepted | done | — |
| F01 | Java baseline and boundaries | 10 | Accepted | done | F00 |
| F02 | Frontend asset pipeline | 12 | Accepted | done | F01 |
| F03 | Home and shared EN/ES/FR shell | 18 | Accepted | done | F02 |
| F04 | Security and locale flow | 14 | Accepted | done | F03 |
| F05 | Editor and CSP proof | 14 | Accepted | done | F04 |
| F06 | JSON Formatter | 24 | Accepted | done | F05 |
| F07 | JSON Validator and Minifier | 10 | Accepted | done | F06 |
| F12 | MVP tool navigation and local runtime | 2 | Accepted | done | F07 |
| F13 | Learning pages and navigation | 10 | Accepted | done | F07 |
| F14 | First complete learning unit | 10 | Accepted | done | F13 |
| F16 | MVP website polish and acceptance | 8 | 0.0–0.8 | in_progress | F12, F14 |

## Milestones

| ID | Exit | Weeks from resumption, before shared contingency |
|---|---|---:|
| M0 | Runnable secure foundation | 0.0 |
| M1 | First usable JSON Formatter | 0.0 |
| M2 | MVP JSON tools and local JAR workflow | 0.0 |
| M3 | Learning structure and one complete unit in three languages | 0.0 |
| M4 | Polished focused MVP local release candidate | 0.8 |

## Frozen V2 — not scheduled

- F08 — Base64 Encoder/Decoder; historical baseline 6h, not a V2 delivery commitment.
- F09 — UUID Generator; historical baseline 4h, not a V2 delivery commitment.
- F10 — JWT Decoder; historical baseline 8h, not a V2 delivery commitment.
- F11 — JSON and YAML converters; historical baseline 24h, not a V2 delivery commitment.
- F15 — Complete Java Fundamentals; historical baseline 84h, not a V2 delivery commitment.

Source: [plan.json](plan.json). Run `python3 scripts/render-roadmap.py` from the project root after updates.

# Generated roadmap

Baseline date: 2026-10-09.

12/12 features accepted; 172/172 baseline hours accepted (100%). Remaining V1 forecast 0 owner hours + 0h contingency = 0h, approximately 0 weeks at 10h/week. 9 V2 follow-up features excluded from V1; see the selected V2 sequence below. No delivery date committed.

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
| F16 | MVP website polish and acceptance | 8 | Accepted | done | F12, F14 |

## Milestones

| ID | Exit | Weeks from resumption, before shared contingency |
|---|---|---:|
| M0 | Runnable secure foundation | 0.0 |
| M1 | First usable JSON Formatter | 0.0 |
| M2 | MVP JSON tools and local JAR workflow | 0.0 |
| M3 | Learning structure and one complete unit in three languages | 0.0 |
| M4 | Polished focused MVP local release candidate | 0.0 |

## V2 delivery sequence

Only listed stories are selected for this sequence. F15-UH03 through UH07 remain deferred; completing the full course is not a release gate. Estimates are provisional owner hours, not deadlines. V1 acceptance remains historical; portable V1 handoff is an additional deliverable tracked in V2.

| Phase | Selected stories | Forecast hours | Exit / checkpoint |
|---|---|---:|---|
| V2-P1 — Security maintenance and stale documentation | F17-UH01 | 8 | Current security findings and documentation verified; unresolved findings remain explicit. |
| V2-P2 — Two additional Java lessons | F15-UH01, F15-UH02 | 24 | Values/types/numeric limits and control flow/tracing reviewed in EN/ES/FR. Then push the scoped changes and open the first PR; complete this checkpoint before design exploration. |
| V2-P3 — Agree and implement the design page by page | F18-UH01 | 12 | Learn first, then course/unit, Tools/workspace and Home/shared shell. Owner-generated Nano Banana concepts and explicit agreement precede implementation. |
| V2-P4 — Complete the remaining tools | F08-UH01, F09-UH01, F10-UH01, F11-UH01, F11-UH02 | 42 | Base64, UUID, JWT and bounded JSON/YAML conversion accepted individually after final design agreement. |
| V2-P5 — Final frontend compatibility review | F19-UH01 | 8 | Chromium/Firefox/WebKit results and separate real Safari evidence or pending limitation; demonstrated defects triaged without false coverage claims. |
| V2-P6 — Docker Desktop portability and final handoff | F20-UH01 | 8 | Single-app container and second-PC runbook verified; actual second-PC evidence and owner closure, or an explicit pending item. No automatic image publication or deployment. |

Selected remaining V2 forecast: 95h + 19h contingency = 114 owner hours at 10h/week. Provisional capacity budget, not a delivery commitment. Zero actual hours means unreported effort.


## V2 feature reference — selected stories shown above

- F08 — Base64 Encoder/Decoder; historical baseline 6h, see selected-story scope; not a whole-feature delivery commitment.
- F09 — UUID Generator; historical baseline 4h, see selected-story scope; not a whole-feature delivery commitment.
- F10 — JWT Decoder; historical baseline 8h, see selected-story scope; not a whole-feature delivery commitment.
- F11 — JSON and YAML converters; historical baseline 24h, see selected-story scope; not a whole-feature delivery commitment.
- F15 — Complete Java Fundamentals; historical baseline 84h, see selected-story scope; not a whole-feature delivery commitment.
- F17 — Security maintenance and current documentation; historical baseline 8h, see selected-story scope; not a whole-feature delivery commitment.
- F18 — Page-by-page design agreement and implementation; historical baseline 12h, see selected-story scope; not a whole-feature delivery commitment.
- F19 — Final Firefox, WebKit and Safari compatibility review; historical baseline 8h, see selected-story scope; not a whole-feature delivery commitment.
- F20 — Portable Docker Desktop handoff and final closure; historical baseline 8h, see selected-story scope; not a whole-feature delivery commitment.

Source: [plan.json](plan.json). Run `python3 scripts/render-roadmap.py` from the project root after updates.

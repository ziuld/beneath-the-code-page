# Epic → Feature → User Story → Task

**EPIC-MVP: Beneath the Code — Phase 1 MVP**

Accepted V1 baseline: secure SSR website with F06/F07 JSON tools and one complete Java Fundamentals unit in EN/ES/FR. Selected V2 follow-ups are planned separately; they do not reopen or count toward V1 acceptance.

This is the requested project hierarchy. UH means User Story. IDs are local planning identifiers, not created Jira issue keys. Product and enabling features both contain stories with explicit beneficiaries.

Read [the epic](epic-mvp.md), then a feature below. Every story contains EARS requirements, tagged Gherkin scenarios and ordered tasks. The [execution queue](execution-order.md) shows the next steps.

Selected V2 stories follow the delivery sequence below; other V2 stories remain deferred. V2 is excluded from historical V1 acceptance.

| Feature | Release | Kind | Stories | Tasks | Baseline hours |
|---|---|---|---:|---:|---:|
| [F00 — Manual Initializr import](features/F00.md) | V1 | enabler | 1 | 4 | 2 |
| [F01 — Java baseline and boundaries](features/F01.md) | V1 | enabler | 2 | 10 | 10 |
| [F02 — Frontend asset pipeline](features/F02.md) | V1 | enabler | 2 | 10 | 12 |
| [F03 — Home and shared EN/ES/FR shell](features/F03.md) | V1 | product | 2 | 10 | 18 |
| [F04 — Security and locale flow](features/F04.md) | V1 | enabler | 2 | 10 | 14 |
| [F05 — Editor and CSP proof](features/F05.md) | V1 | enabler | 2 | 10 | 14 |
| [F06 — JSON Formatter](features/F06.md) | V1 | product | 3 | 15 | 24 |
| [F07 — JSON Validator and Minifier](features/F07.md) | V1 | product | 2 | 10 | 10 |
| [F08 — Base64 Encoder/Decoder](features/F08.md) | V2 | product | 1 | 5 | 6 |
| [F09 — UUID Generator](features/F09.md) | V2 | product | 1 | 5 | 4 |
| [F10 — JWT Decoder](features/F10.md) | V2 | product | 1 | 5 | 8 |
| [F11 — JSON and YAML converters](features/F11.md) | V2 | product | 2 | 12 | 24 |
| [F12 — MVP tool navigation and local runtime](features/F12.md) | V1 | enabler | 2 | 10 | 14 |
| [F13 — Learning pages and navigation](features/F13.md) | V1 | product | 2 | 10 | 16 |
| [F14 — First complete learning unit](features/F14.md) | V1 | product | 2 | 11 | 18 |
| [F15 — Complete Java Fundamentals](features/F15.md) | V2 | product | 7 | 42 | 84 |
| [F16 — MVP website polish and acceptance](features/F16.md) | V1 | enabler | 2 | 11 | 20 |
| [F17 — Security maintenance and current documentation](features/F17.md) | V2 | enabler | 1 | 4 | 8 |
| [F18 — Page-by-page design agreement and implementation](features/F18.md) | V2 | enabler | 1 | 6 | 12 |
| [F19 — Final Firefox, WebKit and Safari compatibility review](features/F19.md) | V2 | enabler | 1 | 4 | 8 |
| [F20 — Portable Docker Desktop handoff and final closure](features/F20.md) | V2 | enabler | 1 | 4 | 8 |

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


## Ownership and progress

Edit plan.json for tracking and unmigrated behaviour. For stories with behaviour_spec, edit the referenced main OpenSpec specification for requirements/scenarios; plan.json holds IDs and verification links only. Run both renderers and the planning validator. Generated views are read-only. Never add parent and child hours together.

[EARS/Gherkin conventions and Jira mapping](story-workflow.md) · [OpenSpec handoff](openspec-handoff.md) · [Traceability](traceability.md)

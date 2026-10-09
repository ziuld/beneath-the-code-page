# Epic → Feature → User Story → Task

**EPIC-MVP: Beneath the Code — Phase 1 MVP**

Eight browser-local developer tools and a complete Java Fundamentals course in EN/ES/FR, built as one secure SSR application.

This is the requested project hierarchy. UH means User Story. IDs are local planning identifiers, not created Jira issue keys. Product and enabling features both contain stories with explicit beneficiaries.

Read [the epic](epic-mvp.md), then a feature below. Every story contains EARS requirements, tagged Gherkin scenarios and ordered tasks. The [execution queue](execution-order.md) shows the next steps.

| Feature | Kind | Stories | Tasks | Baseline hours |
|---|---|---:|---:|---:|
| [F00 — Manual Initializr import](features/F00.md) | enabler | 1 | 4 | 2 |
| [F01 — Java baseline and boundaries](features/F01.md) | enabler | 2 | 10 | 10 |
| [F02 — Frontend asset pipeline](features/F02.md) | enabler | 2 | 10 | 12 |
| [F03 — Home and shared EN/ES/FR shell](features/F03.md) | product | 2 | 10 | 18 |
| [F04 — Security and locale flow](features/F04.md) | enabler | 2 | 10 | 14 |
| [F05 — Editor and CSP proof](features/F05.md) | enabler | 2 | 10 | 14 |
| [F06 — JSON Formatter](features/F06.md) | product | 3 | 15 | 24 |
| [F07 — JSON Validator and Minifier](features/F07.md) | product | 2 | 10 | 10 |
| [F08 — Base64 Encoder/Decoder](features/F08.md) | product | 1 | 5 | 6 |
| [F09 — UUID Generator](features/F09.md) | product | 1 | 5 | 4 |
| [F10 — JWT Decoder](features/F10.md) | product | 1 | 5 | 8 |
| [F11 — JSON and YAML converters](features/F11.md) | product | 2 | 12 | 24 |
| [F12 — Tool suite and local runtime](features/F12.md) | enabler | 2 | 10 | 14 |
| [F13 — Learning pages and navigation](features/F13.md) | product | 2 | 10 | 16 |
| [F14 — Course outline and pilot](features/F14.md) | product | 2 | 11 | 18 |
| [F15 — Complete Java Fundamentals](features/F15.md) | product | 7 | 42 | 84 |
| [F16 — Full Phase 1 acceptance](features/F16.md) | enabler | 2 | 11 | 20 |

## Ownership and progress

Edit plan.json for scope, EARS, scenarios, task descriptions and statuses, then run both renderers and the planning validator. Do not hand-edit generated feature/Gherkin/queue/traceability views. Feature estimates are distributed into child work; never add parent and child hours together.

[EARS/Gherkin conventions and Jira mapping](story-workflow.md) · [OpenSpec handoff](openspec-handoff.md) · [Traceability](traceability.md)

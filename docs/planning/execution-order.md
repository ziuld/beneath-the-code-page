# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**No unblocked selected task is ready; inspect recorded prerequisites and blockers.**

Unfinished tasks follow the selected V2 phase order. The remaining course stories are deferred; accepted V1 tasks are excluded.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F17-UH01-T04](features/F17.md#f17-uh01) | closure | 1 | in_progress | F17-UH01-T03 |
| 2 | [F15-UH01-T01](features/F15.md#f15-uh01) | analysis | 0.5 | planned | F14, F17 |
| 3 | [F15-UH01-T02](features/F15.md#f15-uh01) | implementation | 2.75 | planned | F15-UH01-T01 |
| 4 | [F15-UH01-T03](features/F15.md#f15-uh01) | implementation | 2.75 | planned | F15-UH01-T02 |
| 5 | [F15-UH01-T04](features/F15.md#f15-uh01) | verification | 2.75 | planned | F15-UH01-T03 |
| 6 | [F15-UH01-T05](features/F15.md#f15-uh01) | verification | 2.75 | planned | F15-UH01-T04 |
| 7 | [F15-UH01-T06](features/F15.md#f15-uh01) | closure | 0.5 | planned | F15-UH01-T05 |
| 8 | [F15-UH02-T01](features/F15.md#f15-uh02) | analysis | 0.5 | planned | F15-UH01 |
| 9 | [F15-UH02-T02](features/F15.md#f15-uh02) | implementation | 2.75 | planned | F15-UH02-T01 |
| 10 | [F15-UH02-T03](features/F15.md#f15-uh02) | implementation | 2.75 | planned | F15-UH02-T02 |
| 11 | [F15-UH02-T04](features/F15.md#f15-uh02) | verification | 2.75 | planned | F15-UH02-T03 |
| 12 | [F15-UH02-T05](features/F15.md#f15-uh02) | verification | 2.75 | planned | F15-UH02-T04 |
| 13 | [F15-UH02-T06](features/F15.md#f15-uh02) | closure | 0.5 | planned | F15-UH02-T05 |
| 14 | [F18-UH01-T01](features/F18.md#f18-uh01) | analysis | 2 | planned | F17, F15-UH02 |
| 15 | [F18-UH01-T02](features/F18.md#f18-uh01) | implementation | 2 | planned | F18-UH01-T01 |
| 16 | [F18-UH01-T03](features/F18.md#f18-uh01) | implementation | 2 | planned | F18-UH01-T02 |
| 17 | [F18-UH01-T04](features/F18.md#f18-uh01) | implementation | 2 | planned | F18-UH01-T03 |
| 18 | [F18-UH01-T05](features/F18.md#f18-uh01) | verification | 2 | planned | F18-UH01-T04 |
| 19 | [F18-UH01-T06](features/F18.md#f18-uh01) | closure | 2 | planned | F18-UH01-T05 |
| 20 | [F08-UH01-T01](features/F08.md#f08-uh01) | analysis | 0.5 | planned | F06, F18 |
| 21 | [F08-UH01-T02](features/F08.md#f08-uh01) | implementation | 1.75 | planned | F08-UH01-T01 |
| 22 | [F08-UH01-T03](features/F08.md#f08-uh01) | verification | 1.75 | planned | F08-UH01-T02 |
| 23 | [F08-UH01-T04](features/F08.md#f08-uh01) | verification | 1.5 | planned | F08-UH01-T03 |
| 24 | [F08-UH01-T05](features/F08.md#f08-uh01) | closure | 0.5 | planned | F08-UH01-T04 |
| 25 | [F09-UH01-T01](features/F09.md#f09-uh01) | analysis | 0.25 | planned | F06, F18 |
| 26 | [F09-UH01-T02](features/F09.md#f09-uh01) | implementation | 1.25 | planned | F09-UH01-T01 |
| 27 | [F09-UH01-T03](features/F09.md#f09-uh01) | verification | 1.25 | planned | F09-UH01-T02 |
| 28 | [F09-UH01-T04](features/F09.md#f09-uh01) | verification | 1 | planned | F09-UH01-T03 |
| 29 | [F09-UH01-T05](features/F09.md#f09-uh01) | closure | 0.25 | planned | F09-UH01-T04 |
| 30 | [F10-UH01-T01](features/F10.md#f10-uh01) | analysis | 0.5 | planned | F06, F18 |
| 31 | [F10-UH01-T02](features/F10.md#f10-uh01) | implementation | 2.5 | planned | F10-UH01-T01 |
| 32 | [F10-UH01-T03](features/F10.md#f10-uh01) | verification | 2.25 | planned | F10-UH01-T02 |
| 33 | [F10-UH01-T04](features/F10.md#f10-uh01) | verification | 2.25 | planned | F10-UH01-T03 |
| 34 | [F10-UH01-T05](features/F10.md#f10-uh01) | closure | 0.5 | planned | F10-UH01-T04 |
| 35 | [F11-UH01-T01](features/F11.md#f11-uh01) | analysis | 0.5 | planned | F07, F18 |
| 36 | [F11-UH01-T02](features/F11.md#f11-uh01) | implementation | 2.75 | planned | F11-UH01-T01 |
| 37 | [F11-UH01-T03](features/F11.md#f11-uh01) | implementation | 2.75 | planned | F11-UH01-T02 |
| 38 | [F11-UH01-T04](features/F11.md#f11-uh01) | verification | 2.75 | planned | F11-UH01-T03 |
| 39 | [F11-UH01-T05](features/F11.md#f11-uh01) | verification | 2.75 | planned | F11-UH01-T04 |
| 40 | [F11-UH01-T06](features/F11.md#f11-uh01) | closure | 0.5 | planned | F11-UH01-T05 |
| 41 | [F11-UH02-T01](features/F11.md#f11-uh02) | analysis | 0.5 | planned | F11-UH01, F18 |
| 42 | [F11-UH02-T02](features/F11.md#f11-uh02) | implementation | 2.75 | planned | F11-UH02-T01 |
| 43 | [F11-UH02-T03](features/F11.md#f11-uh02) | implementation | 2.75 | planned | F11-UH02-T02 |
| 44 | [F11-UH02-T04](features/F11.md#f11-uh02) | verification | 2.75 | planned | F11-UH02-T03 |
| 45 | [F11-UH02-T05](features/F11.md#f11-uh02) | verification | 2.75 | planned | F11-UH02-T04 |
| 46 | [F11-UH02-T06](features/F11.md#f11-uh02) | closure | 0.5 | planned | F11-UH02-T05 |
| 47 | [F19-UH01-T01](features/F19.md#f19-uh01) | analysis | 1 | planned | F18, F08, F09, F10, F11 |
| 48 | [F19-UH01-T02](features/F19.md#f19-uh01) | implementation | 3 | planned | F19-UH01-T01 |
| 49 | [F19-UH01-T03](features/F19.md#f19-uh01) | verification | 3 | planned | F19-UH01-T02 |
| 50 | [F19-UH01-T04](features/F19.md#f19-uh01) | closure | 1 | planned | F19-UH01-T03 |
| 51 | [F20-UH01-T01](features/F20.md#f20-uh01) | analysis | 1 | planned | F19 |
| 52 | [F20-UH01-T02](features/F20.md#f20-uh01) | implementation | 3 | planned | F20-UH01-T01 |
| 53 | [F20-UH01-T03](features/F20.md#f20-uh01) | verification | 3 | planned | F20-UH01-T02 |
| 54 | [F20-UH01-T04](features/F20.md#f20-uh01) | closure | 1 | planned | F20-UH01-T03 |

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

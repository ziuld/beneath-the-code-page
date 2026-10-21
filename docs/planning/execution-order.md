# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**No unblocked selected task is ready; inspect recorded prerequisites and blockers.**

Unfinished tasks follow the selected V2 phase order. The remaining course stories are deferred; accepted V1 tasks are excluded.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|

## V2 delivery sequence

Only listed stories are selected for this sequence. F15-UH03 through UH07 remain deferred; completing the full course is not a release gate. Estimates are provisional owner hours, not deadlines. V1 acceptance remains historical; portable V1 handoff is an additional deliverable tracked in V2. Owner revision 2026-10-21: F11 JSON/YAML removed, not deferred; historical scope retained in docs/planning/history/F11-removed-2026-10-21.json. Complete F09 and F10, then simplify code/tests/documentation before final browser acceptance and Docker handoff.

| Phase | Selected stories | Forecast hours | Exit / checkpoint |
|---|---|---:|---|
| V2-P1 — Security maintenance and stale documentation | F17-UH01 | 8 | Current security findings and documentation verified; unresolved findings remain explicit. |
| V2-P2 — Two additional Java lessons | F15-UH01, F15-UH02 | 24 | Values/types/numeric limits and control flow/tracing reviewed in EN/ES/FR. Then push the scoped changes and open the first PR; complete this checkpoint before design exploration. |
| V2-P3 — Agree and implement the design page by page | F18-UH01 | 28 | Learn first, then course/unit, Tools/workspace and Home/shared shell. Owner-generated Nano Banana concepts and explicit agreement precede implementation. |
| V2-P4 — Complete the remaining tools | F08-UH01, F09-UH01, F10-UH01 | 18 | Base64, UUID and JWT accepted individually under the shared design. JSON/YAML conversion is removed from project scope. |
| V2-P5 — Simplification review, then final frontend compatibility | F19-UH01 | 8 | First review code, tests and documentation for concrete simplifications; implement bounded improvements and retain meaningful quality gates. Then run Chromium/Firefox/WebKit checks and record separate real Safari evidence or a pending limitation. |
| V2-P6 — Docker Desktop portability and final handoff | F20-UH01 | 8 | Single-app container and development workflow verified locally and owner accepted. Other platforms remain unverified; second-PC testing is optional by owner decision 2026-10-21. No automatic image publication or deployment. |

Selected remaining V2 forecast: 0h + 0h contingency = 0 owner hours at 10h/week. Provisional capacity budget, not a delivery commitment. Zero actual hours means unreported effort.

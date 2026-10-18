# Evidence — Focused MVP replan

Date / reviewer / identity: 2026-10-18 / OpenCode working-tree review / based on
`d6455d4`; replanning changes uncommitted. No application implementation in this task.

Environment: Linux; Python 3.14.7; OpenSpec 1.14.1. No dependency installation.

## Acceptance checked

- [ADR 007](../../docs/architecture/adr-007-focused-mvp.md) records the owner-approved
  small complete website: F06/F07 and one complete EN/ES/FR source-to-JVM unit.
- F00–F06 remain accepted, with no reopening or replacement of their evidence.
- F08–F11/F15 are explicitly V2, excluded from V1 schedule, progress and closure.
- F12 reuses the packaged JAR; containers and broad redesign are deferred.
- F13 uses synthetic content for infrastructure verification; F14 supplies the real
  reviewed unit; F16 completes shared journeys, publication and bounded visual polish.
- Original baseline estimates and every hierarchy ID are preserved. Forecasts roll
  up to 42h remaining V1, plus 8.4h contingency. Estimates are provisional because
  owner effort is unreported; approximately six capacity weeks is not a date promise.

## Executed checks and results

- `openspec list --json`: local root present, no active changes. This is a canonical
  project replan, not revision or implementation of an active OpenSpec change.
- `python3 scripts/render-backlog.py`: generated dossiers, Gherkin, hierarchy,
  remaining-V1 queue, traceability and HTML reader successfully.
- `python3 scripts/render-roadmap.py`: generated remaining-V1 roadmap/Gantt and
  separately labelled frozen V2 backlog successfully.
- `python3 scripts/test-planning-rules.py`: **21 tests pass**, including the existing
  false-closure/traceability tests plus release validation, V1→V2 dependency rejection
  at feature/story/task levels, V2 milestone rejection, evidenced V1-only closure,
  retained unfinished-V1 blocking and generated schedule isolation.
- `python3 scripts/check-planning.py`: **PASS**, 17 features, links, estimates,
  dependencies, evidence paths, generated views, hierarchy and closure rules.
- `openspec validate --all --strict`: **8 specifications pass**, zero failures.
- `git diff --check`: **PASS**.
- Structural JSON indentation check: **PASS**, retaining existing compact arrays.
  An exploratory comparison with fully expanded `json.dumps` formatting was not
  applicable: both HEAD and this working tree deliberately retain compact arrays.
  No bulk formatting change or repository formatting failure is inferred from it.
- Read-only JSON comparison against `HEAD:docs/planning/plan.json`: all hierarchy
  IDs, baseline hours and product statuses preserved; F00–F06 are unchanged except
  explicit V1 membership. Existing actual hours, dates and evidence are not invented.
- Scoped diff review: no `src/`, `tests/`, `.github/`, dependency/build configuration
  or `openspec/` changes. Only planning, guidance, generated views and planning tools.

## Checks not run / limitations

No Maven build, application browser tests, manual keyboard/zoom/visual/translation
review or real learning-content verification: no runtime or content was implemented.
Existing F06 passing evidence remains attached to its tested runtime commit, not
this documentation working tree. Planning tests are not product acceptance tests.
Screen-reader compatibility/manual speech testing remain excluded under the existing
owner decision; no new accessibility conformance claim is made.

No commit, push, merge, release, publication, repository setting change or sub-agent.
The first unit still requires actual technical/language review during F14. Security
findings and missing checks must remain visible; container deferral is not a waiver
of application privacy/security or the existing browser-engine requirements.

Owner acceptance: product scope and instruction to apply the replan are recorded in
the conversation. No new visual/content/product completion inferred from this task.

Actual effort: unreported. Planning work completed 2026-10-18; no product status
advanced. Next eligible task: F07-UH01-T01, still unstarted.

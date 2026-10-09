# Feature delivery and PM plan

Baseline: 2026-10-09. Capacity confirmed by the user: **10 focused owner hours per week, with AI assistance**. No calendar start date has been committed.

## Planning assumptions

- One owner reviews and integrates work; no parallel staffing or sub-agent delegation is assumed.
- Estimates are owner-time budgets with AI assistance already considered, including coding supervision, integration, tests, documentation and review. AI runtime is not a promise of equivalent human productivity.
- Work is serially capacity-levelled. Dependency edges identify technical prerequisites; chart ordering also respects the single owner's capacity.
- Three-point estimates are optimistic / planning / pessimistic hours. These are initial expert judgements, not measured velocity.
- Add 20% shared contingency to the planning total; the pessimistic envelope is shown separately, not added to contingency.
- Holidays, missed weeks and blocked decisions extend calendar duration. Relative week 1 starts when manual bootstrap work begins; no invented start date appears in the main Gantt.
- Reforecast after foundations and JSON Formatter using actual hours. Never backdate progress to match a schedule.

## Milestones

| Milestone | Result | Exit gate |
|---|---|---|
| M0 | Runnable, secure, localised foundation | F00–F05 accepted |
| M1 | First usable release: JSON Formatter | F06 accepted with packaged-app evidence |
| M2 | Complete developer-tool suite | F07–F12 accepted; all eight tools |
| M3 | Learning pilot | F13–F14 accepted; reviewed pilot in EN/ES/FR |
| M4 | Full Phase 1 local release candidate | F15–F16 accepted; complete course and full regression |

M1–M3 are demonstrations/intermediate releases. They do not silently reduce the original MVP. M4 does not include hosting, accounts or deployment.

## Tracking

`plan.json` is the single source for the Epic → Feature → UH → Task hierarchy, EARS requirements, Gherkin scenarios, verification mappings, owners, estimates, dependencies, status, actual effort, dates and evidence. The generated dashboard, Gantt and detailed story reader are views. They do not write progress automatically or sync GitHub. Update them after each work session or accepted PR. Start with [the hierarchy](hierarchy.md) and [execution rules](story-workflow.md).

States: `planned`, `ready`, `in_progress`, `blocked`, `in_review`, `done`. Use `blocked` with a concrete reason; F00 currently awaits the user's manual import and its first reading task is ready. One feature and one leaf task in progress at a time. Mark ready only once prerequisites are done. Review may still uncover work; `done` requires linked evidence and accepted children.

Use two progress indicators: accepted features / total features, and accepted baseline hours / total baseline hours. In-progress hours are effort spent, not earned completion. Show actual hours and estimate-to-complete separately in reviews. Preserve baseline estimates when revising the forecast.

## Cadence

- Each session: identify feature and outcome, update actual hours and handoff.
- Weekly (within the 10-hour budget): review accepted work, blockers, risks and next task; spend about 30 minutes, not a separate unbudgeted meeting programme.
- Each milestone: demo in all languages, inspect evidence and reforecast remaining work.
- Change control: record scope/architecture changes in an ADR and adjust estimates/dependencies. Preserve scope exclusions.

The generated [roadmap](roadmap.md) shows totals and milestone windows. The [dashboard](roadmap.html) gives the Gantt and expandable feature records. For GitHub presentation, [Mermaid source](gantt.mmd) uses a clearly marked synthetic date anchor; it is not a calendar commitment.

## Ownership

Ziuld: product decisions, visual acceptance, manual import, final review and content accuracy. AI assistant: authorised implementation, documentation, test execution and evidence preparation. AI-written EN/ES/FR copy requires human language/content review; if that capacity is unavailable, record a release risk rather than pretending the review happened.

No GitHub issues, projects, branch rules, commits or pushes are created in this documentation step. Repository settings and optional GitHub Projects mapping are subsequent bootstrap actions.

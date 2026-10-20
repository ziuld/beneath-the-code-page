# Feature delivery and PM plan

Baseline: 2026-10-09; scope revision: 2026-10-18 ([ADR 007](../architecture/adr-007-focused-mvp.md)). Capacity: **10 focused owner hours per week, with AI assistance**. No delivery date is committed.

Current outcome,2026-10-20: all retained V1 features are locally accepted;
remaining V1 work is zero. V2 stays frozen. See [F16 acceptance](../../harness/evidence/F16-integrated-acceptance.md)
and the [local release runbook](../delivery/local-release.md). Forecasts below are
historical planning baselines, not remaining delivery commitments.

## Planning assumptions

- One owner reviews and integrates work; no parallel staffing or sub-agent delegation is assumed.
- Estimates are owner-time budgets with AI assistance already considered, including coding supervision, integration, tests, documentation and review. AI runtime is not a promise of equivalent human productivity.
- Work is serially capacity-levelled. Dependency edges identify technical prerequisites; chart ordering also respects the single owner's capacity.
- Three-point estimates are optimistic / planning / pessimistic hours. These are initial expert judgements, not measured velocity.
- Add 20% shared contingency to remaining V1 work only. Historical estimates and frozen V2 are not part of the remaining schedule.
- Holidays, missed weeks and blocked decisions extend duration. Relative week 1 now starts when remaining work resumes; accepted features have no remaining Gantt bar.
- All retained V1 features are locally accepted; the F00–F06 checkpoint below is historical. Actual effort is unreported, so revised estimates are provisional judgements, not measured velocity. Never infer elapsed effort from zero tracking values.

## Milestones

| Milestone | Result | Exit gate |
|---|---|---|
| M0 | Runnable, secure, localised foundation | F00–F05 accepted |
| M1 | First usable release: JSON Formatter | F06 accepted with packaged-app evidence |
| M2 | MVP JSON tools/local runtime | F07 and reduced F12 accepted; existing JAR workflow |
| M3 | Learning pages and first unit | F13–F14 accepted; complete source-to-JVM unit in EN/ES/FR |
| M4 | Polished V1 local release candidate | All V1 features including reduced F16 accepted; integrated website and retained quality gates |

ADR 007 explicitly replaces the old all-tools/full-course exits. M4 does not require F08–F11/F15, Docker, hosting, accounts or deployment.

## Remaining forecast and order

| Stage | Provisional owner hours | Bounded outcome |
|---|---:|---|
| F07 | Accepted | Validator, Minifier and three-tool catalogue accepted; no remaining work |
| F12 | Accepted | Catalogue/JAR evidence reused; security gate accepted with bounded dispositions, Boot4.1.1 unchanged |
| F13 | 10 | Learn landing, course overview, unit navigation and safe local content rendering |
| F14 | 10 | Short unit brief and one complete reviewed EN/ES/FR unit |
| F16 | 8 | Shared-page polish, retained regression and concise local handoff |

Remaining total: **28h + 5.6h contingency = 33.6h**, approximately four capacity weeks, not a calendar promise. F07/F12 are accepted; F12 retained its revised 2h forecast and original14h baseline without repeating accepted work. Actual effort remains unreported. Forecasts roll up from tasks and preserve the original baseline. Review after each slice; content/translation review and integrated defects may exceed the allowance. F13 depends on F07, not F12 or deferred tools; F16 requires F12 and F14. Work remains serial in the order above.

F13 verifies page infrastructure with synthetic content fixtures; F14 supplies the real reviewed unit. F16 enables production Learn navigation during integration once that unit is ready. This avoids making infrastructure closure depend on later content or exposing empty learning pages.

## Tracking

`plan.json` is the single source for the Epic → Feature → UH → Task hierarchy, EARS requirements, Gherkin scenarios, verification mappings, owners, estimates, dependencies, status, actual effort, dates and evidence. The generated dashboard, Gantt and detailed story reader are views. They do not write progress automatically or sync GitHub. Update them after each work session or accepted PR. Start with [the hierarchy](hierarchy.md) and [execution rules](story-workflow.md).

States: `planned`, `ready`, `in_progress`, `blocked`, `in_review`, `done`. Feature `release` is V1 or V2 (legacy completed features default to V1). V2 is frozen reference backlog, not a technical blocker. One feature and one leaf task in progress at a time. Mark ready only once prerequisites are done. Review may uncover work; `done` requires linked evidence and accepted children. F12 is done at implementation commit71aeefc, with Boot4.1.1 unchanged and eight configuration-bound applicability decisions expiring2026-11-01. Reassess them when server configuration changes and at final V1 acceptance. That F12 checkpoint originally queued F13; F13/F14/F16 are now accepted with
linked evidence, and final F16 security reassessment is complete for its reviewed
scope. The exact eight decisions retain the2026-11-01 expiry.

Progress indicators count V1 only: accepted features / V1 features, and accepted baseline hours / V1 baseline hours. These are scope-weighted acceptance indicators, not actual effort or evidence of increased productivity. Frozen V2 appears separately. Preserve baseline estimates; show actual effort and remaining forecast separately.

## Cadence

- Each session: identify feature and outcome, update actual hours and handoff.
- Weekly (within the 10-hour budget): review accepted work, blockers, risks and next task; spend about 30 minutes, not a separate unbudgeted meeting programme.
- Each milestone: demo in all languages, inspect evidence and reforecast remaining work.
- Change control: record scope/architecture changes in an ADR and adjust estimates/dependencies. Preserve scope exclusions.

The generated [roadmap](roadmap.md) shows totals and milestone windows. The [dashboard](roadmap.html) gives the Gantt and expandable feature records. For GitHub presentation, [Mermaid source](gantt.mmd) uses a clearly marked synthetic date anchor; it is not a calendar commitment.

## Ownership

Ziuld: product decisions, visual acceptance, manual import, final review and content accuracy. AI assistant: authorised implementation, documentation, test execution and evidence preparation. AI-written EN/ES/FR copy requires human language/content review; if that capacity is unavailable, record a release risk rather than pretending the review happened.

These planning conventions authorise no GitHub issues, projects, branch rules or
pushes. F16 local commits were separately authorised and recorded in evidence. Repository settings and optional GitHub Projects mapping are subsequent bootstrap actions.

# Story definition and execution rules

## Project hierarchy and Jira mapping

The canonical project structure is **EPIC-MVP → Fxx → Fxx-UHxx → Fxx-UHxx-Txx**. UH means User Story. Tasks are ordered work items under a story. Requirement IDs end in Rxx; scenario IDs end in ACxx.

This is the user's requested conceptual hierarchy. Jira's default has Epic → Story/Task → Subtask, not this four-level parent chain. If using unmodified Jira, retain the MVP as Epic, represent UH as Story, tasks as Subtasks, and preserve Feature as a required grouping field/linked feature record. The feature layer stays explicit in this repository. A literal four-level Jira hierarchy needs a separately validated Jira configuration; do not promise that import will create it automatically. No Jira issue or configuration was created here.

## Two complementary specification forms

EARS states the requirement; Gherkin illustrates acceptance. Every requirement has a stable ID and at least one scenario; each scenario references the requirement it verifies. Do not maintain two conflicting behaviours. When changing behaviour, update both representations in the canonical plan and regenerate their views.

EARS patterns, following [Alistair Mavin's official guide](https://alistairmavin.com/ears/):

- Ubiquitous: `The system shall ...`
- Event: `When ... , the system shall ...`
- State: `While ... , the system shall ...`
- Unwanted behaviour: `If ... , then the system shall ...`
- Optional capability: `Where ... , the system shall ...`

Use the applicable pattern, not all patterns by force. Name the system and an observable response. Do not express optional Phase 2 scope as a mandatory Phase 1 requirement.

Gherkin uses Given (context), When (event) and Then (observable result), with And/But as needed. [Cucumber's reference](https://cucumber.io/docs/gherkin/reference/) defines the syntax. Generated `.feature` files are specifications; there are no step definitions or test runner integration yet. Existing JUnit/Vitest/Playwright tests can reference scenario IDs. Parsing or reviewing a scenario does not prove it passes.

## Begin each story

Read feature purpose, story description, scope, prerequisites, EARS requirements, Gherkin scenarios and planned verification. Confirm fixtures and the smallest verifiable result. Do not start implementation while prerequisites are unmet. Stories may have a maintainer or project-owner beneficiary for foundation work.

Tasks cover analysis, implementation/content authoring, verification and closure. Each task has hours, predecessor IDs, status and evidence. Initial tasks are at most three owner hours. Later course story titles remain provisional until the accepted F14 syllabus exists.

## Execution and commits

Ready → in_progress → in_review → done, with explicit blocked reasons when needed. One active task at a time. Work through the queue; resolve a failed check before claiming completion. A story can have several coherent commits; do not create empty commits just to satisfy task granularity.

After implementing a coherent change: run its checks, inspect the diff, commit when authorised, record commit/evidence, review integration, then close the story. A commit is not the same as a merge or acceptance. Record integration status in the closure evidence. Manual import may have no commit until Git exists; do not invent a hash. Push/PR publication follows the user's authorisation.

Recommended commit form once implementation begins: `feat(F06-UH01): preserve JSON numeric tokens`. Use `test`, `docs`, `build` or `fix` when appropriate. Include the task/scenario IDs in the body or evidence where useful.

## Closing and rollups

- A verification task is done only with recorded actual results, including limitations.
- A story is done only when all its tasks and acceptance scenarios pass, relevant manual reviews are recorded and its coherent changes are integrated.
- A feature is done only when every required story is done.
- The epic is done only when every required feature and full release acceptance are done.
- Task hours sum to story hours; story hours sum to feature hours. Parent actual effort must equal recorded child effort. Never double-count.
- Preserve baseline_hours. Update forecast_hours with revised total effort estimates and reconcile child sums; actual_hours is spent effort, not progress.

Update plan.json, regenerate backlog and roadmap, then run the validator. Evidence records actual checks; Gherkin scenarios remain planned until their corresponding checks are executed.

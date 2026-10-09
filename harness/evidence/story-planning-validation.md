# Story-planning validation

Date: 2026-10-09. Scope: requested Epic → Feature → UH → Task hierarchy and dual EARS/Gherkin acceptance definitions.

## Delivered definition

- One MVP epic, 17 preserved feature IDs, 36 user stories, 190 ordered tasks.
- 72 EARS requirements, each linked to a Gherkin scenario; 72 scenarios total.
- 36 generated .feature files; 17 detailed feature dossiers; hierarchy, next-task queue, traceability and expandable HTML reader.
- Existing roadmap and Gantt reference the detailed backlog. F03 explicitly includes Home.
- Baseline remains 298 owner hours at 10 hours/week with AI assistance. Child estimates are budget allocations in quarter-hour increments; every task is at most three hours. No extra progress or new deadline is claimed.
- F00 and its first reading task are ready for owner action; application implementation still waits for manual Initializr import.

## Checks executed

- `python3 scripts/render-backlog.py` and `python3 scripts/render-roadmap.py`: generated the views from canonical plan.json.
- `python3 scripts/check-planning.py`: checked IDs/parents, dependency cycles, prerequisites, EARS structure, scenario coverage, verification mapping, effort rollups, evidence paths, closure conditions, local Markdown links and generated-view consistency.
- `python3 scripts/test-planning-rules.py`: 10 tests passed, including negative cases for invalid parents, orphan requirements, missing verification, inconsistent effort, dependency cycles and premature story/feature/epic closure.
- Read the generated Home feature dossier and confirmed EARS and Given/When/Then text, requirement tags, ordered tasks and concrete planned verification appear together.

## Limitations

These are documentation/planning checks. No Gherkin parser or Cucumber runtime was installed; scenario syntax follows the standard supported subset but has not been executed as acceptance tests. No application tests, commits, merges or remote Jira/GitHub changes were made. OpenSpec remains an adoption plan; its current-state specifications have not been fabricated from unimplemented requirements.

Detailed estimates and provisional later course lesson titles require review before implementation; the parent budget is preserved, not independently validated by the number of subtasks. The HTML reader is a generated local document, not the application's UI.

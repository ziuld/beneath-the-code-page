# F01 — local baseline closure and CI evidence review

Date: 2026-10-09. Requested outcome: record CI acceptance and close the Java baseline. Actual outcome: local build story accepted; feature closure blocked by missing CI implementation and evidence.

## Local story integration review

`git status --short`, `git diff` and `git diff --stat` returned no changes at inspection. `git branch -vv`, `git log --oneline -10` and `git show --format=fuller --stat HEAD` confirm the coherent initial commit is integrated on local main:

`57f2c79e6d5d5f1cfebbb4a3bf50f12f21dbf4c5` — `build(F01): establish Java project baseline`.

Review of the committed [baseline evidence](F00-F01-java-baseline.md) confirms:

- F01-UH01-AC01: clean source export rebuilt successfully; executable manifest, packaged startup and health UP verified.
- F01-UH01-AC02: synthetic failing test returned Maven exit 1; fixture removed and clean verification passed afterward.
- The actual toolchain and baseline warnings are recorded. The recovered Maven-cache error remains documented.
- The root generated entry point and required dependencies are preserved, architecture checks are fixture-tested, and no product feature was introduced.

F01-UH01-T05 integration/acceptance review is complete; all five tasks and both local story scenarios are accepted. The existing baseline commit is now recorded in the story and closure task. No new Java test run is claimed in this documentation review.

## CI discovery and acceptance blocker

- Workflow inventory `.github/**/*`: no files found. Neither the working tree nor the initial committed file inventory contains a Java CI workflow.
- `gh run list --repo ziuld/beneath-the-code-page --limit 10`: failed before querying GitHub because the CLI is not authenticated. No authentication/configuration changes were made.
- Read-only HTTP GET `https://api.github.com/repos/ziuld/beneath-the-code-page/actions/runs?per_page=10`: succeeded and returned `{"total_count": 0, "workflow_runs": []}`.
- `git remote -v` confirms origin is `https://github.com/ziuld/beneath-the-code-page.git`.

There is no remote CI run to accept and no workflow permission configuration to inspect. F01-UH02-AC02 specifically requires a PR with a failing architecture test to produce a real failing CI outcome. A local controlled Maven failure and passing negative fixtures do not establish that remote acceptance.

F01-UH02-T01 analysis is complete: story requirements, scenarios, predecessor acceptance and expected CI evidence reviewed. T02 is ready to complete the existing ArchUnit implementation with least-privilege Java CI and review conventions. T03–T05 and F01-UH02 remain open; local fixture evidence for AC01 remains recorded. F01 is blocked and is not marked done. F02 remains planned.

Needed for F01 closure: implement and review the initial Java workflow, then obtain authorised remote CI results proving actual verification and failure reporting, recording run/PR URLs, commit SHA, job/step conclusions and permissions review. This session made no push, PR publication, workflow dispatch or GitHub settings changes.

## Planning verification

Executed after canonical updates, all successful:

- `python3 scripts/render-backlog.py`: generated feature dossiers, tagged Gherkin, hierarchy, execution queue, traceability and backlog reader.
- `python3 scripts/render-roadmap.py`: generated roadmap Markdown/HTML and Gantt SVG/Mermaid.
- `python3 scripts/check-planning.py`: PASS for 17 features, prerequisites, evidence links, generated views, hierarchy, requirements/scenarios, rollups and closure conditions.
- `python3 scripts/test-planning-rules.py`: 10 tests, OK.
- `git diff --check`: no whitespace errors in this change.

Owner-hour actuals remain 0 (unreported), with unchanged estimates and consistent task/story/feature rollups. Documentation commit records local story closure and the verified CI blocker; it does not claim CI acceptance or completed F01. Its own hash is supplied in the final handoff rather than embedded recursively in the commit.

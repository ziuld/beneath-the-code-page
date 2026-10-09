# F01 — accepted Java baseline and boundaries

Acceptance date: 2026-10-09. Reviewer: AI-assisted integration review, with Ziuld explicitly approving both PR merges and this local Java-baseline closure. The owner also explicitly approved retaining broader repository-governance findings as unfinished follow-up work. This document records acceptance of the existing canonical F01 stories, not full MVP/release acceptance.

## Integrated revisions and actual CI

| Revision | Integration | Actual verification |
|---|---|---|
| Java CI and boundary acceptance | [PR #1](https://github.com/ziuld/beneath-the-code-page/pull/1), squash merge `4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278`, 2026-10-09T16:50:33Z | [Main run 37962012176](https://github.com/ziuld/beneath-the-code-page/actions/runs/37962012176) passed; Java verification, packaged health and planning checks |
| Wrapper checksum correction | [PR #2](https://github.com/ziuld/beneath-the-code-page/pull/2), squash merge `487220a8eb7f0f5df2a08686c9442007a7e19a4e`, 2026-10-09T17:06:43Z | [PR run 37963702012](https://github.com/ziuld/beneath-the-code-page/actions/runs/37963702012) and [main run 37963939987](https://github.com/ziuld/beneath-the-code-page/actions/runs/37963939987) passed |

Final main run: head 487220a8eb7f0f5df2a08686c9442007a7e19a4e, job Java verification / 113933439951, 2026-10-09T17:06:49Z–17:07:28Z, all checkout/runtime/toolchain/Java/smoke/planning steps successful. Java result: 34 tests, 0 failures, 0 errors, 8 explicit absent-package skips; all 24 non-empty boundary fixtures passed. Packaged JAR health returned HTTP 200/UP. Planning integrity and all 10 planning-rule tests passed.

Actual versions: local Arch Linux OpenJDK/java/javac 25.0.4.1; remote Eclipse Adoptium Temurin-25.0.4.1+1 (25.0.4.1+1-LTS); Maven 3.10.0 through Wrapper 3.3.4; Spring Boot 4.1.1; ArchUnit 1.4.1. CI successfully resolved the agreed Temurin build from its vendor SemVer pin.

## Acceptance matrix

| Criterion | Recorded executed proof | Accepted outcome |
|---|---|---|
| F01-UH01-AC01 / R01 | [Baseline evidence](F00-F01-java-baseline.md): clean staged-source export verification and packaged process smoke; latest main CI repeats Maven verification and executable smoke | Build produces the actual executable JAR and it starts successfully |
| F01-UH01-AC02 / R02 | Baseline controlled failing JUnit test returned Maven exit 1; removed, then clean verification passed | Broken verification fails visibly |
| F01-UH02-AC01 / R01 | [Java CI evidence](F01-java-ci.md): 24 real-bytecode fixture checks plus raw domain-Spring mutation failure | Strict inward-domain rules identify and reject the outward dependency; empty selections are not counted as passing production coverage |
| F01-UH02-AC02 / R02 | PR #1 real [passing run 37960330981](https://github.com/ziuld/beneath-the-code-page/actions/runs/37960330981), [failing run 37960668718](https://github.com/ziuld/beneath-the-code-page/actions/runs/37960668718), [restored pass 37961154337](https://github.com/ziuld/beneath-the-code-page/actions/runs/37961154337); failure step/job returned exit 1 and subsequent steps skipped | Initial CI reports its actual verification outcome, including failure, and passes after restoration |
| Feature-level wrapper/checksum gate | [Checksum evidence](F01-wrapper-checksum.md): ZIP matches published SHA-512; derived SHA-256 pinned; separate fresh wrapper caches accept correct pin (exit 0) and reject wrong pin before install (exit 1); correction integrated via PR #2 | Checksum omission discovered during audit is resolved and its enforcement proven locally; normal CI passes on the integrated configuration |
| Runtime/context/packages/remote/initial CI | Existing context test, root entry point, unchanged generated starters/test dependencies, real package rules and least-privilege SHA-pinned workflow; exact origin and both merges reviewed | Prescribed Java baseline and first dependency boundaries are integrated without product/frontend implementation |

F00 prerequisite remains accepted with its documented historical-import limitations. All ten F01 tasks have outcome/verification evidence. F01-UH02-T05 completes integration/acceptance review of the coherent merged changes; no new implementation or artificial commit is required to prove that review.

## Integration review executed in this closure

- Git status/diff were clean at inspection; local main matched origin/main at 487220a8eb7f0f5df2a08686c9442007a7e19a4e.
- `gh pr view 1/2 --repo ziuld/beneath-the-code-page --json state,mergedAt,mergeCommit,url` confirmed actual merged state and SHAs.
- `gh run view 37963939987 --repo ziuld/beneath-the-code-page --json url,headSha,status,conclusion,jobs` confirmed the exact main revision and successful step/job conclusions. Previously inspected logs recorded the final test totals, Maven exit 0, actual JAR smoke and planning results; no fabricated output or generated password is included.
- `git diff --exit-code f3c8c4da1965ca91210bbf3beb48a0dd7b6e8db2 HEAD` returned 0: reviewed checksum PR head and final merged tree are identical.
- `git merge-base --is-ancestor 4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278 HEAD` returned 0: the accepted CI baseline is integrated in current main.
- `git ls-tree -r --name-only HEAD src/main src/test` confirmed one generated production Java class, YAML configuration, original context test and three architecture test files; no temporary mutation sources or production placeholders.
- Read-only review-thread query for both PRs returned no review threads and no further page; there are no unresolved review discussions. Solo-maintainer acceptance was supplied through the owner's explicit merge approvals, not an invented self-approval review.

## Scope disposition and unfinished follow-ups

The owner approved closing the Java-baseline F01 scope while retaining the audited governance findings as unfinished follow-up work. [Risks and decisions](../../docs/planning/risks-and-decisions.md) records their owner, unfinished status and next decision. Security-reporting guidance/contact, issue templates, dependency-update configuration and main protection/required-check enforcement are not claimed implemented. Node.js action-runtime maintenance remains open. Supply-chain scans and broader release gates also remain planned; no scan pass, branch-protection setting, security contact or automation is invented by F01 closure.

This disposition preserves all F01 EARS requirements/scenarios and does not remove later F12/F16 security/release acceptance. No architecture or product decision changed. F02 remains planned, and EPIC-MVP remains open.

Known limitations/warnings: 8 explicitly deferred production architecture checks; Windows checksum execution not tested; ZIP pin needs unzip and does not cover the tar.gz fallback; generated Thymeleaf/Security/Mockito/JVM warnings; GitHub Node.js 20 action-runtime deprecation warning. All are recorded separately from failures. No generated development password is committed.

## Local closure records

Canonical update: F01-UH02-T05 done; F01-UH02 done; F01 done, finish date 2026-10-09. Existing F01-UH01 acceptance is retained with the integrated checksum commit reference. All child tasks are done, F00 is done, evidence exists and real integrated commits are recorded. Actual owner hours remain 0 (unreported), not relabelled estimates; task/story/feature rollups remain consistent.

Only local documentation preparation is authorised in this step. Closure records are uncommitted/unpublished until separate approval; this does not imply the integrated implementation lacks acceptance. No new Java/checksum test run is claimed for a documentation-only change.

Planning regeneration and local closure checks executed successfully after canonical updates:

- `python3 scripts/render-backlog.py`: regenerated dossiers, hierarchy, Gherkin, execution queue, traceability and reader.
- `python3 scripts/render-roadmap.py`: regenerated roadmap Markdown/HTML and Gantt SVG/Mermaid.
- `python3 scripts/check-planning.py`: PASS for all 17 features, prerequisites, evidence/local links, generated views, requirement/scenario coverage, verification links, effort rollups and closure rules.
- `python3 scripts/test-planning-rules.py`: 10 tests, OK.
- `git diff --check`: no whitespace errors in tracked changes.

Review of the canonical diff confirms only F01 closure/evidence/commit references and its explicit scope disposition changed: requirements/scenarios, estimates/actual hours, other feature statuses and epic status are preserved. F02 remains planned. Git status contains only documentation and generated-view changes; application/build/workflow code is unchanged. The new closure evidence/task records are local and no commit/publication is claimed.

## Approved local commit handoff

The owner subsequently approved creating feature/F01-close-baseline and committing these records with `docs(F01): record final acceptance and close Java baseline`. The branch was created; planning validation and all 10 planning-rule tests passed again, and whitespace checks passed. The local commit result/hash belongs in the final handoff rather than recursively in its own evidence. Remote publication and PR creation remain separate approval steps.

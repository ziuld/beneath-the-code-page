# F01-UH02 — initial Java CI implementation and local verification

Date: 2026-10-09. This record includes the initial local implementation handoff and subsequent separately authorised publication/remote verification. T04 remote acceptance is now complete as recorded below; T05 integration/merge remains open. No feature closure is inferred from local checks or the remote pass alone.

## Delivered files and permissions review

- `.github/workflows/java.yml`: pull_request and push to main; named job Java verification; Ubuntu 24.04 GitHub-hosted runner, 15-minute timeout and per-ref concurrency cancellation.
- Workflow permissions: only contents: read. Checkout uses persist-credentials: false. No secrets, saved Git credentials, pull_request_target event, deployment, remote write operation, continue-on-error or success-only placeholder. Each command must succeed before the next step executes.
- SHA-pinned checkout v4.2.2: `11bd71901bbe5b1630ceea73d27597364c9af683`; setup-java v4.7.1: `c5195efecf7bdfc987ee8bae7a71cb8b11521c00`.
- `.github/CODEOWNERS` names the real repository owner @ziuld. CONTRIBUTING.md and the PR template document task/scenario evidence, short branches, intended required check, review/discussion resolution, squash integration and viable solo-owner review. No branch protection or repository setting was changed.
- `scripts/verify-java-baseline.py` executes real Maven verification, redacts generated development passwords and preserves failure status. Downloads and JVM temporary files remain repository-local. The workflow also runs packaged smoke and existing read-only planning checks.
- README and delivery guidance link the actual workflow/conventions. Frontend, browser, supply-chain and container jobs remain planned; this initial Java job does not claim those gates passed.

## Pin provenance and runtime mapping

Read-only upstream checks:

- `https://api.github.com/repos/actions/checkout/git/ref/tags/v4.2.2`: commit SHA matches checkout pin above.
- `https://api.github.com/repos/actions/setup-java/git/ref/tags/v4.7.1`: commit SHA matches setup-java pin above.
- Direct Adoptium version URL for 25.0.4.1+1 returned 404; this lookup was not treated as successful runtime installation.
- `https://api.adoptium.net/v3/assets/latest/25/hotspot?architecture=x64&image_type=jdk&os=linux&vendor=eclipse`: returned release jdk-25.0.4.1+1, openjdk_version 25.0.4.1+1-LTS, SemVer 25.0.4+101.0.LTS and the corresponding Linux x64 archive.
- The pinned setup-java base installer accepts SemVer, and its Temurin installer resolves vendor version_data.semver. CI therefore pins `25.0.4+101.0.LTS`, not the invalid four-part SemVer string. This represents the agreed JDK build, not a changed Java language level.

Actual local runtime remains Arch Linux OpenJDK/java/javac 25.0.4.1, Maven 3.10.0 through Wrapper 3.3.4 and Spring Boot 4.1.1. At initial handoff, Temurin installation on GitHub was only configured; the subsequent remote runs below verify the actual Temurin build.

## Executed local checks

| Check | Actual result |
|---|---|
| Parse workflow with installed PyYAML BaseLoader; assert PR/main events, permissions, action SHA pins, runtime pin, checkout credentials and absence of error masking/privileged events | PASS; no dependency installed. This is YAML parsing and targeted policy review, not actionlint or GitHub execution |
| `python3 scripts/verify-java-baseline.py -Dtest=CIArchitectureFailureTest` with temporary test-only domain Spring dependency | Expected exit 1; Maven BUILD FAILURE and ArchUnit Architecture Violation explicitly named CIFrameworkLeak and org.springframework.context.ApplicationContext. Outer subprocess check asserted exact exit status and diagnostic |
| Remove both temporary sources through patches; `./mvnw --batch-mode --no-transfer-progress clean` with repository-local MAVEN_OPTS | BUILD SUCCESS; stale mutation bytecode removed |
| `python3 scripts/verify-java-baseline.py` | Exit 0, Maven BUILD SUCCESS; 34 tests, 0 failures/errors, 8 explicit skips. All 24 non-empty boundary fixture tests passed; executable JAR repackaged |
| `python3 scripts/smoke-java-baseline.py` | Exit 0; manifest valid, Boot 4.1.1 startup, HTTP 200 health UP at loopback ephemeral port 45193; owned child stopped, exit 143 |

Verification script command: `./mvnw --batch-mode --no-transfer-progress verify`. Extra targeted-test arguments are forwarded to Maven; its failure is not converted to success. The temporary failure sources are absent from the final tree and never production code.

Warnings observed: missing Thymeleaf templates; generated development Security password (redacted); Mockito/Byte Buddy dynamic-agent and JVM class-sharing warnings; eight production package checks explicitly deferred until real capability packages exist. These warnings did not cause failures. The expected mutation failure was restored before final verification.

## Work-item acceptance at initial local handoff

- T02 deliverables implemented and inspected: existing ArchUnit rules retained, initial least-privilege Java workflow and branch/review conventions added.
- T03 / F01-UH02-AC01 verified by the current non-empty fixture suite and raw domain-Spring mutation failure; task done.
- T04 permission portion reviewed; remote F01-UH02-AC02 remains unverified. A real PR run with a failing architecture test must report failure, then a restored revision must pass. Record run/PR URLs, tested commit SHA, actual step/job conclusions and toolchain output.
- T05 integration/closure is pending. New CI files are locally verified working-tree changes, not a committed or remotely integrated revision. F01-UH02 and F01 remain blocked; F01-UH01 remains done; F02 remains planned.
- No commit, push, PR publication, workflow dispatch or GitHub settings change occurred in this continuation. Owner effort remains unreported, not inferred from estimates; child/parent actual-hour rollups remain consistent.

## Planning verification

Executed after canonical updates, all successful:

- `python3 scripts/render-backlog.py`: generated backlog reader, feature dossiers, Gherkin, hierarchy, queue and traceability.
- `python3 scripts/render-roadmap.py`: generated roadmap/Gantt outputs; unchanged outputs retained identical content.
- `python3 scripts/check-planning.py`: PASS, 17 features, dependencies, evidence/local links, generated views, requirements/scenarios, closure rules and effort rollups.
- `python3 scripts/test-planning-rules.py`: 10 tests, OK.
- `git diff --check`: no whitespace errors in tracked changes. Git status confirms only the intended workflow, conventions, helper, evidence/handoff and generated planning edits; no production-source or dependency changes.

## Subsequent publication handoff

The owner authenticated gh for ziuld and requested approval before each remaining write action. After explicit approval, `git push -u origin main` published the two existing baseline commits. `git rev-parse main` and `git ls-remote origin refs/heads/main` both returned `a2a354af5381c9300b00f6f129c4acd1c30d384d`.

Separate approval authorised creating local `feature/F01-java-ci` and committing the reviewed CI implementation. `git switch -c feature/F01-java-ci` succeeded. Planning validation and all 10 planning-rule tests were rerun successfully; Git whitespace checks passed. Commit result belongs in the final handoff to avoid a self-referential hash. CI branch push and PR creation remain unapproved and unexecuted at this handoff; no remote CI result is claimed.

## Remote CI acceptance — F01-UH02-T04 / AC02

The owner separately authorised branch publication, PR creation, the temporary failing revision, its removal/restoration, and this evidence/planning commit and push. Each write action followed its own approval. No merge, repository settings change or branch deletion has been performed.

PR: [#1 — build(F01): add initial Java CI verification](https://github.com/ziuld/beneath-the-code-page/pull/1), feature/F01-java-ci → main. All three completed runs below are real pull_request executions of Java baseline, job Java verification, with run/job conclusions and logs inspected using gh.

| Stage | Tested head commit | Run / job | Actual result |
|---|---|---|---|
| Initial baseline | `ff16f070f0c375888aaf8f4836794bed5df069ea` | [37960330981](https://github.com/ziuld/beneath-the-code-page/actions/runs/37960330981) / job 113921243662 | success; verification exit 0, 34 tests, zero failures/errors, 8 skips; packaged health UP; planning validation and 10 planning-rule tests passed |
| Intentional violation | `5d4fcf39ff03fd81da2c08aa1eb155953c1a5b7e` | [37960668718](https://github.com/ziuld/beneath-the-code-page/actions/runs/37960668718) / job 113922394636 | failure; Verify Java and architecture step failed with exit 1; 35 tests, 1 failure, 0 errors, 8 skips; smoke and planning steps correctly skipped |
| Restored baseline | `ee14bd8e4b43dad348234063ba99645341943355` | [37961154337](https://github.com/ziuld/beneath-the-code-page/actions/runs/37961154337) / job 113924019038 | success; verification exit 0, 34 tests, zero failures/errors, 8 skips; packaged health UP; planning validation and 10 planning-rule tests passed |

Run start/completion timestamps in UTC: initial 2026-10-09T16:36:30Z–16:37:07Z; intentional failure 16:39:21Z–16:39:48Z; restoration 16:43:26Z–16:44:03Z. All acceptance observations are from 2026-10-09.

Remote toolchain logs confirmed Java/javac 25.0.4.1, Temurin-25.0.4.1+1 (build 25.0.4.1+1-LTS), vendor Eclipse Adoptium, Maven 3.10.0 (c43a36b8d67be7e0805a411bc0898af1a51f5472), Spring Boot 4.1.1. Setup, checkout and toolchain steps succeeded in every run. The exact JDK SemVer pin successfully resolved the agreed runtime.

Failure diagnostic: `CIFrameworkLeak.forbiddenDependency` in the test-only tools.domain package had type `org.springframework.context.ApplicationContext`. The real inward-domain rule reported an Architecture Violation; Maven printed BUILD FAILURE and Maven exit status: 1, and GitHub reported Process completed with exit code 1. This was not a placeholder failure or a passing assertion around an expected failure. No production file changed.

Both temporary test sources were removed in restoration commit ee14bd8. A local clean removed their stale bytecode; `python3 scripts/verify-java-baseline.py` and `python3 scripts/smoke-java-baseline.py` passed again before the restoration commit/push (health UP on ephemeral loopback port 45651). `git rev-parse ff16f07^{tree} ee14bd8^{tree}` confirmed identical tree IDs `02594262c1fe57ffe54367792b9716140ca31e04`; the restored tree contains no temporary mutation.

Executed remote inspection commands: `gh run watch 37960330981 --repo ziuld/beneath-the-code-page --exit-status --interval 10`; `gh pr checks 1 --repo ziuld/beneath-the-code-page --watch --interval 10` for the failing/restored heads; `gh run view <run-id> --repo ziuld/beneath-the-code-page --json url,headSha,status,conclusion,jobs`; `gh run view <run-id> --repo ziuld/beneath-the-code-page --log` or `--log-failed`. Read-only reinspection asserted all three head SHAs and expected conclusions against the actual metadata. Logs were inspected without recording generated development passwords.

Warnings: the previously documented template/password/Mockito/class-sharing warnings and eight explicit production-rule skips persist. GitHub additionally annotates the pinned checkout/setup-java actions as Node.js 20 targets being forced onto Node.js 24 by its runner policy. This is a non-failing compatibility/deprecation warning; all setup/action steps succeeded. It is recorded separately from the intended architecture failure and is not silently suppressed. Action runtime maintenance remains a known follow-up; no action version was changed in this documentation update.

Current acceptance: workflow least-privilege permissions review, actual remote failure reporting and restored verification satisfy T04 / F01-UH02-AC02. T04 is done. F01-UH02 and F01 move to in_review, with T05 ready for review/approved merge. No story or feature is marked done before integration. Owner actual effort remains unreported; baseline/forecast estimates and child/parent hour rollups are unchanged.

Documentation verification after recording this acceptance: both planning renderers completed; `python3 scripts/check-planning.py` passed hierarchy, prerequisite, evidence, view, requirement/scenario and closure validation for all 17 features; `python3 scripts/test-planning-rules.py` passed all 10 tests; `git diff --check` found no whitespace errors. No Java test rerun is claimed for the documentation edit. The documentation commit's own hash and resulting PR run will be reported in the final handoff, avoiding recursive commit metadata.

## Subsequent final integration/acceptance

Acceptance documentation commit `7a4fbecd820316743dc1b13abb02bb80dd60da41` passed [PR CI 37961736196](https://github.com/ziuld/beneath-the-code-page/actions/runs/37961736196). PR #1 was separately approved and squash-merged to main `4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278` at 2026-10-09T16:50:33Z; [main CI 37962012176](https://github.com/ziuld/beneath-the-code-page/actions/runs/37962012176) passed. The checksum correction then integrated through PR #2 at `487220a8eb7f0f5df2a08686c9442007a7e19a4e`, with [main CI 37963939987](https://github.com/ziuld/beneath-the-code-page/actions/runs/37963939987) passing. Earlier pending-integration observations are historical; [final closure evidence](F01-closure.md) records completed T05 integration review and accepted Java-baseline scope. No broader governance setting or scan pass is inferred.

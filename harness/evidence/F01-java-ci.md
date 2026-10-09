# F01-UH02 — initial Java CI implementation and local verification

Date: 2026-10-09. Authorised continuation: T02 implementation and local follow-on verification. T04 permission review is recorded, but remote acceptance is blocked. No CI pass or feature closure is inferred from local checks.

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

Actual local runtime remains Arch Linux OpenJDK/java/javac 25.0.4.1, Maven 3.10.0 through Wrapper 3.3.4 and Spring Boot 4.1.1. Temurin installation on GitHub is configured but has not yet been executed or verified remotely.

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

## Work-item acceptance and remaining blocker

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

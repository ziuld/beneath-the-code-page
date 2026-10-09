# F00/F01 — imported Java baseline evidence

Date: 2026-10-09. Scope: owner's manual import, Java baseline, local architecture checks and local Git bootstrap. This is execution evidence; Gherkin remains a specification without Cucumber. OpenSpec is not installed.

## Actual versions and inspection

| Command / source | Actual result |
|---|---|
| `java -version` | OpenJDK 25.0.4.1, runtime/build 25.0.4.1, 64-bit Server VM |
| `javac -version` | javac 25.0.4.1 |
| `./mvnw --version` | Apache Maven 3.10.0, c43a36b8d67be7e0805a411bc0898af1a51f5472; Java vendor Arch Linux; Linux amd64 |
| `.mvn/wrapper/maven-wrapper.properties` | Wrapper 3.3.4, only-script, Maven distribution 3.10.0 |
| POM, context startup and executable manifest | Spring Boot 4.1.1; release 25; executable JAR; root entry point dev.beneaththecode.BeneathTheCodeApplication |
| POM dependency review | MVC, Thymeleaf, Security, Validation, Actuator; generated Thymeleaf Security extras and all five Boot test starters preserved; only ArchUnit 1.4.1 added, test scope |

The architecture specification's Maven 3.9.16 and Temurin vendor recommendation were provisional. Actual imported Maven 3.10.0 and Arch Linux OpenJDK 25.0.4.1 are verified here; no framework dependency override or system installation was made.

## F00 manual acceptance / preservation review

- F00-UH01-T01: required guidance, story, EARS, scenarios and checklist read before editing.
- F00-UH01-T02 / AC01: owner supplied the imported project before this session. Root POM, wrapper, Java package, YAML configuration and prescribed starters inspected. The agent did not generate or extract an archive. The acceptance/inspection date is today's date, not an invented import timestamp.
- F00-UH01-T03 / AC02: manual review found the existing guidance, planning hierarchy, architecture and brand documents present. No unresolved imported-file collision was reported in the owner's verified handoff or found during inspection. Existing guidance was retained; only authorised baseline metadata, tracking/handoff and renderer outputs are updated. No conflict overwrite was performed.
- Limitation: no pre-import hashes or original ZIP were supplied. Historical before/after import identity cannot be independently reconstructed. AC02 is accepted by the current preservation review of the owner's handoff, not represented as an executed historical hash test or Cucumber scenario.
- F00-UH01-T04: scope/integration review records the manual import beside the preserved planning tree. Local commit identity will be supplied in the final handoff, avoiding a self-referential metadata commit.

Preserved-document SHA-256 checks for this baseline session (not historical pre-import hashes):

```text
a7f87ab4b3c4a1179d529418171c583151aec91a35cec5df212e8574ad7ff0a3  AGENTS.md
0e5b69a02bcf8122973f363d3cd980819eb9266868fa998cd5a691a5470d8acc  docs/architecture/technical-architecture-v1.md
6d73c2176b52c8ecca029e4c4a713e8b6b69bc5c9721beff4e1fd46960c4479d  docs/architecture/feasibility-review.md
d1313ff7927bc9deef387a007ccdd5e0cc499aa3d5c852650beb51270189b7f9  docs/brand/brand-application.md
```

Command: `sha256sum AGENTS.md docs/architecture/technical-architecture-v1.md docs/architecture/feasibility-review.md docs/brand/brand-application.md`.

## Commands and actual Java results

To keep Maven downloads and temporary output inside the repository, verification used `MAVEN_OPTS="-Dmaven.repo.local=$PWD/.mvn/local-repository -Djava.io.tmpdir=$PWD/target"`. Initial commands used `$PWD/target/maven-repository` instead. Console output was redacted in memory before display; generated passwords were not copied into this evidence. Maven reports in ignored `target/` can contain generated runtime output and are not committed.

| Exact build/check command | Result |
|---|---|
| `./mvnw --no-transfer-progress verify` (initial target-local repository) | BUILD SUCCESS; 34 tests, 0 failures, 0 errors, 8 skips |
| `./mvnw verify -Dtest=ControlledFailureTest` (twice; second invocation explicitly captured status) | Expected BUILD FAILURE, Maven exit 1; one synthetic test failed with F01-UH01-AC02 marker |
| `./mvnw clean verify --no-transfer-progress` (target-local repository) | Failed: clean removed the dependency cache resolved earlier in the invocation, causing four missing Spring compilation errors. This was a verification-environment error, not an application defect |
| `./mvnw clean verify --no-transfer-progress` (corrected .mvn/local-repository) | BUILD SUCCESS; rebuilt 1 production and 4 test source files; 34 tests, 0 failures/errors, 8 skips; executable JAR repackaged |
| `./mvnw verify` (corrected repository) | Exit 0, BUILD SUCCESS; 34 tests, 0 failures/errors, 8 skips |
| `./mvnw package` (corrected repository) | Exit 0, BUILD SUCCESS; same test results; executable JAR generated |
| `python3 scripts/smoke-java-baseline.py` | Exit 0; executable manifest and BOOT-INF entry confirmed; Boot 4.1.1 started on loopback ephemeral port 42769; GET /actuator/health returned HTTP 200 and status UP; owned child terminated, exit 143 |
| `git checkout-index --all --prefix=/home/ziuld/AI/beneath-the-code/target/java-baseline-checkout/`, then `./mvnw verify` in that fresh index export | Exit 0; freshly compiled 1 production and 4 test source files; 34 tests, 0 failures/errors, 8 skips; executable JAR generated. Shared repository cache at the project root, no copied build output |
| `python3 scripts/smoke-java-baseline.py` in the fresh index export | Exit 0; manifest valid, packaged startup and health HTTP 200/UP on ephemeral loopback port 38491; child stopped with exit 143 |

The controlled failure source was added only for the check and removed through a patch immediately afterward. A clean rebuild removed its stale compiled output. It is absent from the final source tree. Failure behavior is demonstrated, not masked by a success placeholder.

Executable: `target/beneath-the-code-0.1.0-SNAPSHOT.jar`. Manifest main class is Boot's JarLauncher; start class is the root generated application. Packaged startup uses `java -Djava.io.tmpdir=/home/ziuld/AI/beneath-the-code/target -jar /home/ziuld/AI/beneath-the-code/target/beneath-the-code-0.1.0-SNAPSHOT.jar --server.address=127.0.0.1 --server.port=0`.

### Boundary proof (F01-UH02-AC01)

- Production import contains the actual generated entry point, excludes all test fixtures and tests, and is asserted non-empty.
- Six production boundary invocations and two cycle checks explicitly skip until their source packages/multiple slices exist. These eight skips are deferred production coverage, not successful checks on empty packages.
- Strict rule objects reject empty selections. `strictRulesRejectEmptySelections` verifies this for all six boundaries; no global empty-rule exemption is configured.
- 21 compiled negative fixtures verify Spring/servlet/Thymeleaf, platform/bootstrap/adapters, domain-to-application, both adapter directions, cross-capability internal adapters and capability-to-root wiring dependencies. Violations identify both source and target class.
- Three additional tests verify allowed inward/port dependencies, package/capability cycles and empty-selection failures. All 24 fixture tests passed on actual Java 25 bytecode with ArchUnit 1.4.1.
- No production placeholder class, interface or package was introduced. Package selectors activate on future capabilities, not just tools and learning.

## Warnings, failures and remaining acceptance

Warnings observed separately from failures:

1. Thymeleaf cannot find classpath:/templates/: expected before pages are implemented; warning retained.
2. Spring Security creates a temporary development password: expected generated baseline behavior; value redacted and never included here.
3. Mockito self-attaches its inline mock maker; Byte Buddy dynamic-agent warning and JVM class-sharing warning observed. Not suppressed and not build failures.
4. Eight explicitly deferred production architecture checks: future package behavior is proven by non-empty test-only fixtures.
5. Git warns that mvnw.cmd will use CRLF on checkout, consistent with the imported .gitattributes.
6. Unscoped `git diff --cached --check` reports existing trailing spaces/EOF blank lines in the preserved original brand source document (Markdown hard breaks). Scoped check excluding that original source passes; the source has not been reformatted.

Failures: the intentional controlled-test exit 1 and the recovered target-local Maven-cache clean failure are described above. Final local build checks have no failures.

F01-UH01-T01–T04 have local inspection/build/smoke/failure evidence. F01-UH01 remains in_review, with T05 ready: the initial commit hash does not exist until the evidence and plan themselves are committed. The planning validator requires a real commit reference for story closure; no guessed or circular hash is stored.

F01-UH02-T02 is only partially delivered (ArchUnit portion); Java CI has not been added or run under this Java-only scope. Fixture verification for T03 is recorded, but predecessor/CI work and remote F01-UH02-AC02 acceptance remain open. F01 is not done. F02 and later features remain planned.

Actual effort: owner time for the historical import and this assisted session was not supplied. Actual owner-hour fields remain 0 (unreported), with child/parent totals consistent; estimates are not relabelled as spent effort.

## Planning and Git review

Executed after canonical updates, all exit 0:

- `python3 scripts/render-backlog.py`: generated dossiers, Gherkin, hierarchy, queue, traceability and backlog reader.
- `python3 scripts/render-roadmap.py`: generated roadmap Markdown/HTML and Gantt SVG/Mermaid.
- `python3 scripts/check-planning.py`: PASS, 17 features, dependencies, estimates, evidence paths, local links, generated views, EARS/scenario/verification links, hierarchy rollups and closure rules. Its static “no application build” sentence describes the validator's scope, not the Java checks executed above.
- `python3 scripts/test-planning-rules.py`: 10 tests, OK.

Canonical changes: F00/UH01/T01–T04 done; F01 in_progress; F01-UH01 in_review, T01–T04 done, T05 ready; F01-UH02 blocked and T02 blocked/partial, T03 fixture evidence attached without marking the task done. All other feature/status/estimate/requirement/scenario records are preserved. Actual owner hours remain unreported; zero child/parent rollups agree.

Executed Git setup: `git init -b main`; `git remote add origin https://github.com/ziuld/beneath-the-code-page.git`; `git check-ignore -v target/beneath-the-code-0.1.0-SNAPSHOT.jar .mvn/local-repository/org/springframework/boot/spring-boot/4.1.1/spring-boot-4.1.1.jar`; `git status --short`; `git remote -v`; `git log --oneline -10`. Both generated paths are ignored. Log inspection correctly reported no commits on the new main branch. Existing Git name/email are available; no Git configuration was changed except the local remote. Commit creation awaits final checks and full staged review. No push or repository settings operation was executed.

Pre-commit review completed: full initial staged diff inventory (112 files), implementation/evidence diff, all staged diff content scanned for credential patterns and unintended generated/cache/failure-fixture files; no matches. `git diff --cached --check -- . ':!docs/reference/brand-guidelines-original.md'` passes. `git diff --stat` shows no unstaged changes at that review. Repeated preserved-document SHA-256 checks match the values above. Git identity is available, branch main and exact origin verified. Required local checks are passing; the coherent initial commit is authorised. Its real hash and final working-tree status belong in the final handoff, not a recursive metadata commit.

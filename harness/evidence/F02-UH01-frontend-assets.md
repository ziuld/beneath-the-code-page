# F02-UH01 — frontend asset execution evidence

Date: 2026-10-13. Scope: authorised local implementation of F02-UH01 only. Actual owner effort: unreported.

## Prerequisite review (T01)

F01 is `done` in `docs/planning/plan.json`, supported by `harness/evidence/F01-closure.md`. Existing source/configuration contains the root Boot entry point, generated context test, strict architecture fixtures and Maven-owned Java verification/smoke scripts. The frontend source tree, manifest resolver and frontend dependencies were absent at the start of this apply request.

Read and checked R01/R02 and AC01/AC02 against the F02 dossier and the OpenSpec delta. Confirmed packaging paths and test-only rendering/failure-fixture strategy. Recorded the authorised execution plan in [the task record](../tasks/F02-UH01-frontend-assets.md). Preserved pre-existing uncommitted setup/proposal documents.

T01 is a document/prerequisite review, not a fresh Java test pass. Implementation and verification results will be appended only after actual execution. No commit, publication, integration acceptance or behavioural migration is claimed.

## Toolchain preparation and blocking build check (T02, incomplete)

Published metadata was inspected at `https://nodejs.org/dist/index.json`, Maven Central's frontend-maven-plugin metadata and the npm registry. Selected pins: Node 24.21.0 (Krypton LTS), npm 11.21.0, frontend-maven-plugin 2.0.2, TypeScript 6.0.3, Vite 8.3.4, Vitest 5.0.4, ESLint 10.12.0, @eslint/js 10.0.1, typescript-eslint 8.71.2, Prettier 3.9.10 and @types/node 24.19.2. All selected Node engine constraints are compatible; TypeScript 7.0.2 was not selected because the ESLint adapter requires `<6.1.0`. Published engine compatibility does not establish passing build compatibility.

Actual local Maven version inspection returned Maven 3.10.0 and Arch Linux Java 25.0.4.1. Commands below used `--batch-mode --no-transfer-progress -Dmaven.repo.local=.mvn/local-repository`:

- `./mvnw frontend:install-node-and-npm`: exit 0; installed the exact Node/npm pins under `target/frontend-tooling/`, not globally. The downloader emitted an invalid Cloudflare cookie-header warning; installation nevertheless succeeded. No cookie value is copied into this evidence.
- `./mvnw frontend:npm -Dfrontend.npm.arguments="install --package-lock-only --ignore-scripts --no-audit --no-fund"`: exit 0; generated the npm lockfile. The npm upgrade notice was not acted on.
- `./mvnw frontend:npm -Dfrontend.npm.arguments="ci --no-audit --no-fund"`: exit 0; installed 130 packages using the lockfile.
- `./mvnw generate-resources`: **exit 1**. Pinned installation and `npm ci` succeeded; TypeScript, ESLint and Prettier checks passed. The real Vite-build Vitest case failed (1 test, 1 failure) because Vite 8/Rolldown rejects emitted asset name `../asset-manifest.json` with `INVALID_OPTION`. The check execution failed before the lifecycle's frontend bundling/resource packaging stages.

Prepared files include exact pins/lockfile, frontend checks, a CSS-importing site entry, a build-output test, Maven resource/lifecycle wiring and build documentation. These are partial implementation, not completed T02 or acceptance evidence. No startup resolver or packaged integration tests have been implemented; no clean package/verify or executable smoke was run.

## Pause and recommended correction

Apply progress: **1/12 checklist items complete**, T01 only. Checklist 2.1 and all later items remain unfinished. The explicit apply workflow requires pausing on an implementation error/design issue; no workaround was silently applied.

Recommended correction for review: set Vite's output root to `target/frontend/`, use `static/assets/` for generated public files and emit `asset-manifest.json` at the output root. Update build-test expectations and document manifest path-to-classpath/public-URL mapping coherently. This preserves the prescribed physical packaging paths and avoids an unsupported parent-relative manifest filename. It does not require changing R01/R02 or AC01/AC02, installing another bundler, serving the manifest publicly or adding product/security scope.

Current local changes are uncommitted. F02/F02-UH01/T02 are blocked by this build issue; T03–T05 and F02-UH02 remain planned. Actual owner effort is unreported. Await guidance before correcting the layout and resuming.

## Pause-state planning checks

Both `python3 scripts/render-backlog.py` and `python3 scripts/render-roadmap.py` completed successfully after the justified status updates. Review of the canonical diff confirmed only F02/F02-UH01 start/blocker status and T01/T02 progress/evidence changed; requirements, scenarios, effort and unrelated feature/task statuses were preserved.

- `openspec instructions apply --change f02-uh01-frontend-assets --json`: 1 complete, 11 remaining; no incomplete task was marked done.
- `openspec validate f02-uh01-frontend-assets --strict`: exit 0, change valid.
- `python3 scripts/test-planning-rules.py`: exit 0, 10 tests, OK.
- `git diff --check`: exit 0.
- `python3 scripts/check-planning.py`: **exit 1**, because its unrestricted Markdown scan descends into newly installed npm documentation under `target/frontend-tooling/` and dependency READMEs under `src/main/frontend/node_modules/`, then reports third-party documentation links as broken project links. This is a second observed blocker, not a successful planning validation. Inspection of `scripts/check-planning.py` lines 59–67 confirms `ROOT.rglob('*.md')` excludes only reference material, not generated output or downloaded dependencies.

Additional recommended correction for review: prune generated/dependency trees from the Markdown link scan while retaining authored project/plan checks, and add regression coverage. No validator change was made during this pause.

## Authorised resumption

The owner authorised both corrections and continuation. Vite now owns `target/frontend/`, emits files under `static/assets/` and emits the private manifest at the root. The planning scan prunes generated/dependency trees; a regression fixture retains authored documentation and excludes downloaded/generated/reference files.

After one formatting-check failure during correction (fixed without bypassing the check), `./mvnw --batch-mode --no-transfer-progress -Dmaven.repo.local=.mvn/local-repository generate-resources` exited 0: npm ci, typecheck, ESLint, Prettier, one real-build Vitest test and Vite bundle passed. `python3 scripts/test-planning-rules.py` passed 11 tests; `python3 scripts/check-planning.py` passed. Checklist 2.1 is complete. No packaged acceptance is inferred from this check.

Checklist 2.2: clean `package` with the same Maven flags exited 0, including frontend checks and 34 Java tests (0 failures/errors, 8 documented skips). An isolated temporary `verification-failure.ts` containing a string assigned to a number made clean `package` exit 1 with TS2322 before packaging; the executable JAR was absent. The fixture was removed. A subsequent clean `package` exited 0 and inspection verified the private root manifest and every listed hashed asset, with no frontend sources, node_modules or public manifest in the JAR. No acceptance is inferred for the not-yet-implemented resolver.

Checklist 2.3: `python3 scripts/verify-java-baseline.py` exited 0 after startup resolver implementation. Results: 51 Java tests, 0 failures/errors, 7 explicit absent-capability skips; 17 resolver cases passed, along with the generated context test and 24 architecture fixtures. Production package-cycle verification now executes with the introduced technical package. Frontend checks and the real build test also passed. Resolver documentation accompanies the code; no product page, core port or validation bypass was added.

Checklist 2.4: after Failsafe integration, the same verification wrapper exited 0. Output confirms Boot repackaging preceded `failsafe:3.5.6:integration-test`; 7 packaged tests passed with zero failures/errors/skips. The original `python3 scripts/smoke-java-baseline.py` exited 0, returned HTTP 200/health UP and stopped its child. Existing CI already calls the same wrapper/smoke; SHA pins, read-only permissions and disabled persisted checkout credentials are unchanged. No remote CI run is claimed.

Checklist 3.1: `distributableContainsExactlyTheBuiltAssetsAndNoFixturesOrTooling` passed in that Failsafe run, checking built/packaged bytes, hashed JS/CSS names, private root manifest and absence of test fixture classes/templates, frontend sources and node_modules. Artifact at that run: `target/beneath-the-code-0.1.0-SNAPSHOT.jar`, SHA-256 `865d5c0babe4532b6a29b9770769410dc0a27e3560ae2a4a642cf322f243fed0`. Subsequent rebuilds may change archive identity; final evidence will record the final artifact.

Checklist 3.2 / AC01: `packagedFixtureRendersAndServesTheMatchingScriptAndStylesheet` passed. A separate nested executable fixture contains only the two explicitly copied `btc.fixtures` classes and a test template, uses actual startup resolution/Thymeleaf rendering, and serves rendered references with HTTP 200, correct media types and byte/SHA-256 equality to packaged assets. The normal JAR's hash is unchanged by fixture assembly. Fixture reproduction and synthetic-credential/timeouts are documented in `docs/delivery/frontend-assets.md`; no production route or Security filter change occurred.

Checklist 3.3 / AC01: `python3 scripts/verify-java-baseline.py clean` invoked actual `./mvnw --batch-mode --no-transfer-progress clean verify` with project-local Maven cache and exited 0: 1 frontend test, 51 Java unit/context/architecture tests (7 explicit skips) and 7 Failsafe tests, no failures/errors. The unmodified-JAR test fetched matching JS/CSS bytes and health UP; authenticated requests to both private manifest paths and the test-only fixture route returned 404. The original packaged health smoke was repeated after this clean build, exited 0, returned HTTP 200/UP and stopped its child. Versions remain Java 25.0.4.1, Maven 3.10.0, Boot 4.1.1 and the documented exact frontend pins. No future browser/privacy/CSP/a11y/locale acceptance is claimed.

Checklist 4.1 / AC02: the missing-entry executable mutation exited non-zero before readiness with `BTC_ASSETS_REQUIRED_ENTRY_MISSING`; Failsafe asserted complete captured output omitted the synthetic manifest sentinel. The normal JAR's hash stayed unchanged. Full-log inspection confirmed all four mutation codes (required entry missing, manifest missing, malformed manifest, unsafe path), no sentinel and no readiness marker; all fixture JAR copies were deleted after the checks. Logs remain ignored under `target/asset-it/`.

Checklist 4.2: clean verification was repeated after mutation cleanup and exited 0 again, with the same 1 frontend / 51 Java (7 explicit skips) / 7 packaged tests and no failures/errors. The normal JAR smoke was repeated afterwards and passed HTTP 200/UP; its child stopped with the expected termination status 143. Fixture copies were absent; SHA-256 remained `865d5c0babe4532b6a29b9770769410dc0a27e3560ae2a4a642cf322f243fed0` before/after smoke. Supplemental unit fixtures cover malformed structures, unsafe paths, missing references and missing resources with safe diagnostic causes. Final local verification artifact uses that hash.

## Final local review (checklist 5.1)

Reviewed production resolver, unit/integration fixtures, frontend files, exact dependency/lockfile agreement, Maven/script diff and build documentation against both canonical acceptance scenarios. No outstanding material scope/architecture finding was discovered in this local review. The only production Java addition is the technical asset resolver; the root application class and existing Security configuration are unchanged. The browser entry imports CSS only: no payload/network/storage processing, user-facing text or test-only production hook. Build-watch/import restrictions, product pages, locale/security flows and editors remain outside this slice.

`git diff --check` and explicit whitespace checks on new implementation files passed; exact direct dependency pins match the lockfile, and the intentional failing source is absent. Existing uncommitted setup/proposal work is preserved. No broader security/dependency/SBOM scan, browser/privacy/CSP/a11y test or remote CI pass is claimed. Known baseline warnings (absent production templates, generated development Security password, Mockito/JVM agents) remain; passwords are redacted from displayed wrapper/smoke output. The initial compatibility and planning-scan failures are historical and resolved, not silently omitted.

Integration/owner acceptance status: implementation is verified **locally**, uncommitted and unintegrated. The owner authorised implementation and both corrections, not a commit, publication or final integrated story acceptance. Canonical T02/T03/T04 can be marked done with this evidence; T05 and F02-UH01 remain `in_review` rather than falsely `done`. F02 remains open because F02-UH02 is still planned. Behavioural ownership remains with `plan.json`; no sync/archive/migration occurs.

## Final planning update (checklist 5.2)

Canonical T01–T04 are done with this evidence; T05/story are in_review and F02 is in_progress. F02-UH02 is unchanged/planned. Actual owner effort remains unreported (existing numeric zero retained), not relabelled estimated effort. Start/completion dates record only actual work; story/feature finish dates and commit lists remain empty.

Executed both planning renderers, then planning integrity (PASS), all 11 planning-rule tests (OK), strict OpenSpec validation (valid) and tracked whitespace checks (exit 0). Read-only comparison against HEAD confirmed unchanged epic/unrelated features, F02-UH02, requirement/scenario text and all baseline/forecast/actual effort fields; no false integrated closure. Updated the current handoff and OpenSpec handoff. All 12 change checklist items are complete, while canonical integrated closure is explicitly pending.

Next action: integration/owner review of the verified local slice. Commit/publication require authorisation; sync/archive also waits for resolved behavioural ownership. This record contains no fabricated remote run, owner acceptance or commit hash.

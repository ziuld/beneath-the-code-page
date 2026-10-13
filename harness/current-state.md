# Current handoff

F03-UH01 accepted local closure, 2026-10-13: **F03-UH01 and T01–T05 are done**.
The owner accepted the Home result and explicitly authorised local commits/closure.
Implementation integrated on local main in `f2a3e3c`. Post-commit clean verification
passed 15 frontend tests, 90 Java cases (four explicit skips), 15 packaged cases,
six Chromium cases and the original executable health smoke, with no failures/errors.
The working tree was clean before/after verification. Closure metadata is recorded
separately. Owner acceptance does not invent individual manual-test results; disclosed
browser-UI/assistive-technology limitations remain. F03 is still in_progress;
F03-UH02/F04 remain planned. No push, remote CI, OpenSpec sync/migration or archive.
The completed OpenSpec change remains active; F03-UH01 behaviour stays plan-owned.
Actual owner effort unreported. Evidence: `harness/evidence/F03-UH01-home-page.md`.
Next story is F03-UH02 only when requested. Earlier handoffs below are historical.

F03-UH01 verified review handoff, 2026-10-13: SSR Home, approved unchanged B
composition, resource-backed EN/ES/FR copy, publication-aware navigation and bounded
anonymous read security are implemented. Canonical T01–T04 done; T05/story in_review
pending owner acceptance/local integration. Clean verification passed 15 frontend
tests, 90 Java cases (four explicit absent-capability skips), 15 packaged cases,
original executable health smoke and six real Chromium cases. Both unavailable
navigation and mapped/public fixture transitions pass; no tools/learning placeholders
ship. Chromium verifies JavaScript-disabled rendering, keyboard/reflow/contrast and
200% CSS layout zoom; independent owner translation/visual, browser-UI zoom and
assistive-technology review are not claimed. No commit/push/archive/ownership migration
or remote CI. F03 remains in_progress; F03-UH02/F04 remain planned. Owner effort
unreported. Evidence: `harness/evidence/F03-UH01-home-page.md`; local reproduction:
`docs/delivery/home-page.md`. Supersedes the historical compile-error pause below.

F03-UH01 apply pause, 2026-10-13: `f03-uh01-home-page` is 4/13 checkboxes
complete. T01 inspection and first rendered Home/navigation/resource slice passed
10 MVC and 15 frontend tests. Minimum shared styling/logo and bounded security
wiring are prepared but unverified. The next focused run failed test compilation:
`HomeSecurityTests` uses a nonexistent `MockHttpServletRequestBuilder.dispatcherType`
method. Proposed correction is a request post-processor calling `setDispatcherType`.
Paused awaiting guidance as required by apply; T02/story blocked, T03–T05 unfinished.
No browser/packaged/security acceptance, commit, push, archive or ownership migration.
F03-UH02/F04 remain planned; F02 remains done. Evidence:
`harness/evidence/F03-UH01-home-page.md`. Earlier handoffs below are historical.

F02 final handoff, 2026-10-13: **F02 is done**. F02-UH02/T01–T05 were explicitly
accepted by the owner and integrated on local main in `b1fb149`; F02-UH01 remains
accepted/integrated in `938b97c` and archived. Post-commit clean verification passed
15 frontend tests, 65 Java cases (7 explicit absent-capability skips), 15 packaged
cases; original executable health smoke passed. Both requirements/scenarios and
pure-layer import boundaries are evidenced in `harness/evidence/F02-UH02-local-assets.md`.
Local watch uses a single Spring origin, per-render manifest reload and direct
generated files, without HMR. Non-local/mixed-profile filesystem configurations
fail safely before startup binding. Owner-approved VS Code workspace auto-build
is disabled; explicit Maven owns builds. F02-UH01 behaviour is OpenSpec-owned;
F02-UH02 stays plan-owned. No push/remote CI/publication or F03 start. Next feature
is F03 only when requested. Earlier handoffs below are historical.

F02-UH02 implementation update, 2026-10-13: local build-watch serving and
per-render manifest reload are implemented; production/mixed-profile filesystem
rejection and pure algorithm/domain lint checks are verified. Clean verification
passed 15 frontend tests, 65 Java cases (7 explicit skips) and 15 packaged cases.
The real watcher served FIRST/SECOND/THIRD matching JS/CSS bytes through one
unchanged server. T01–T04 done; story/T05 in_review pending acceptance and local
integration. F02 remains in_progress. No new commit/push/OpenSpec migration yet;
F02-UH02 behaviour stays plan-owned. Evidence:
`harness/evidence/F02-UH02-local-assets.md`. Supersedes earlier UH02-planned handoffs.

Final handoff, 2026-10-13: F02-UH01 and T01–T05 are **done**, explicitly accepted
by the owner and integrated on local main in `938b97c`. Clean post-commit checks
passed: 1 frontend, 54 Java cases (7 explicit absent-capability skips), 9 packaged
cases; health smoke passed. The main OpenSpec specification owns this story's
behaviour (ADR 004); plan.json owns tracking. Change archived under
`openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/` after verifying
exact synchronisation and all 12 task checkboxes. F02 remains in_progress;
F02-UH02 remains planned. Next authorised work has not been requested; do not start
F02-UH02 automatically. No push/remote CI/publication occurred. Evidence:
`harness/evidence/F02-UH01-integration.md`. Earlier updates below are historical.

Integration update, 2026-10-13: owner accepted F02-UH01 and authorised local
commits including related OpenSpec setup/proposal, synchronisation and archival.
The role-validation review finding is fixed and regression-tested. Clean verify
passed 1 frontend test, 54 Java cases (7 explicit skips) and 9 packaged cases;
health smoke passed. Fifteen planning tests and strict main-spec validation pass.
F02-UH01's main OpenSpec spec now owns behaviour; plan.json retains IDs/tracking
(ADR 004). Local integration/closure is being recorded; F02-UH02 remains planned,
F02 remains open. No remote publication authorised. See
`harness/evidence/F02-UH01-integration.md`. This supersedes prior handoff statements.

F02-UH01 local verification update, 2026-10-13: both owner-approved corrections are implemented, and the frontend/Maven/private-manifest slice is locally verified. Repeated `clean verify` passed: 1 frontend test, 51 Java tests (0 failures/errors, 7 explicit absent-capability skips) and 7 packaged integration tests (0 failures/errors/skips). Packaged SSR/HTTP assets, authenticated private-manifest 404s, four safe startup-failure mutations and the original health smoke all passed. T01–T04 are done; F02-UH01/T05 are in_review because the slice is uncommitted/unintegrated and final acceptance is not claimed. F02 is in_progress; F02-UH02 remains planned. All 12 OpenSpec checklist items are complete, including evidence-backed status updates without claiming integrated closure. Both renderers, planning integrity, 11 planning-rule tests, strict OpenSpec validation and whitespace checks passed. See `harness/evidence/F02-UH01-frontend-assets.md` and `docs/delivery/frontend-assets.md`. No commit/publication/archive or behavioural-ownership migration is authorised/performed; plan.json remains authoritative. This update supersedes the historical pause/proposal observations below. Next action is integration/owner review of this verified slice, not automatic F02-UH02 implementation.

F02-UH01 apply update, 2026-10-13: explicit implementation authorised for `f02-uh01-frontend-assets`; T01 is done and OpenSpec progress is 1/12. Exact frontend pins/lockfile, local tooling, minimal source/build test and initial Maven wiring are prepared. Type/lint/format checks passed, but the Vite-build test and Maven returned exit 1 because Vite 8 rejects `../asset-manifest.json`. Apply is paused as required by the workflow; F02/F02-UH01/T02 are blocked, remaining tasks/stories are unfinished. Recommended correction is to emit from `target/frontend/`, place assets under `static/assets/` and keep the manifest at the output root, updating test/path mapping coherently. A second blocker is the planning validator's unrestricted Markdown scan of downloaded `target/`/`node_modules` documentation; generated/dependency-tree exclusions need regression coverage. Both renderers, strict OpenSpec validation, 10 planning-rule tests and whitespace checks passed, but full planning integrity failed on those third-party links. See `harness/evidence/F02-UH01-frontend-assets.md`. No resolver, packaged acceptance, commit, publication or behavioural migration is claimed; this update supersedes the proposal-only observations below.

OpenSpec proposal update, 2026-10-13: `f02-uh01-frontend-assets` now contains the proposal, `packaged-browser-assets` delta, design and tasks for F02-UH01. Strict validation and planning checks passed; see `harness/evidence/F02-UH01-openspec-proposal.md`. This supersedes the setup-only observation below that no change exists. No application implementation or behavioural-ownership migration occurred; plan.json remains authoritative, F02 remains planned and all implementation checkboxes are unfinished. Review the artifacts before explicitly requesting `/opsx-apply f02-uh01-frontend-assets`.

OpenSpec setup update, 2026-10-13: existing CLI 1.14.1 verified; project initialised with OpenCode integration (six skills and six commands), English artifacts and the spec-driven schema. See `harness/evidence/openspec-setup.md`. No proposed change or behavioural migration has been created; plan.json remains authoritative and F02 remains planned.

As of 2026-10-09: F00 import accepted; F01 Java baseline implemented, integrated and accepted. Final closure metadata is prepared on feature/F01-close-baseline with owner approval for the local commit; publication needs separate approval. Product features have not been implemented.

- F00 and F00-UH01 accepted by current import/preservation review; all four tasks done. Historical pre-import hashes and the original archive were not supplied; see evidence limitations.
- Actual Java/javac: Arch Linux OpenJDK 25.0.4.1. Maven: 3.10.0 through Wrapper 3.3.4. Spring Boot: 4.1.1. POM version: 0.1.0-SNAPSHOT, JAR packaging, prescribed generated starters/tests preserved.
- F01, both required stories and all ten tasks are done in the locally updated canonical plan. T05 records review of both approved merges and final main CI. Owner explicitly accepted the Java-baseline scope while retaining audited repository-governance findings as unfinished follow-ups; no wider security/release acceptance is implied.
- Local clean verification, ./mvnw verify and ./mvnw package pass. Executable target/beneath-the-code-0.1.0-SNAPSHOT.jar starts on loopback and returns health UP. Controlled test correctly returned Maven exit 1, then was removed.
- Wrapper checksum correction is integrated via PR #2, main 487220a8eb7f0f5df2a08686c9442007a7e19a4e. ZIP identity matched published SHA-512; SHA-256 1f6d9909266510f039f59aa0e13dcd2c66da85f043e56276e41f2918f8bddaff is pinned. Separate fresh caches accepted correct pin (exit 0) and rejected wrong pin before install (exit 1), verified locally. scripts/check-maven-wrapper.py is repeatable; warm caches bypass download validation; ZIP pin requires unzip. The PR and post-merge Java workflow passed on the integrated configuration.
- ArchUnit 1.4.1 checks inward dependencies, framework-free core, adapter separation, cross-capability adapters, bootstrap/root wiring and cycles. 24 fixture tests pass; eight future production checks explicitly skip absent packages. No production placeholders added; entry point remains dev.beneaththecode.
- Initial workflow: .github/workflows/java.yml, PRs and main pushes, SHA-pinned actions, read-only token, no persisted checkout credentials. GitHub runs verified Temurin-25.0.4.1+1, Maven 3.10.0 and Boot 4.1.1; the SemVer pin 25.0.4+101.0.LTS resolved correctly. PR #1 runs: 37960330981 passed, 37960668718 failed on the approved test-only domain-Spring mutation, 37961154337 passed after removal. Both passing runs verified 34 tests, zero failures/errors, 8 explicit skips, JAR health UP and planning checks. No repository settings were changed.
- Known warnings: missing Thymeleaf templates, generated development Security password (redacted), Mockito/Byte Buddy dynamic agent and JVM class sharing; GitHub warns that the pinned actions target Node.js 20 and are forced onto Node.js 24. Action/setup steps and restored verification pass. The earlier target-local Maven-cache error remains documented and resolved.
- GitHub CLI is authenticated for ziuld. PR #1 merged at main 4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278; PR #2 merged at main 487220a8eb7f0f5df2a08686c9442007a7e19a4e. Latest main CI 37963939987 passed (34 tests, zero failures/errors, 8 skips, JAR health UP, planning checks). Local main and origin/main match that integrated revision. Current local branch feature/F01-close-baseline contains only closure documentation; its commit hash belongs in the final handoff. Branch push/PR creation still require separate owner approval.
- Planning retains EPIC-MVP → F00–F16 → 36 UH stories → 190 tasks, with 72 EARS requirements and 72 linked Gherkin scenarios. Capacity remains 10 owner hours/week; no committed start date. Actual owner time is unreported, not inferred from estimates.
- Architecture and approved B identity preserved. F02/frontend, pages, controllers, templates, product behavior, OpenSpec and Cucumber have not been started.

Final acceptance: `harness/evidence/F01-closure.md`, backed by baseline, CI and wrapper-checksum evidence under `harness/evidence/`; task records under `harness/tasks/`. Historical sections retain earlier observations; final integration sections record subsequent merges/acceptance. Closure documentation is local only; no closure-branch push or PR creation is authorised yet.

Next planned task: **F02-UH01-T01** — read the frontend feature/story requirements and confirm prerequisites/evidence when the owner authorises F02. Its plan status remains planned; no F02 work has started. Unfinished security-reporting/contact, issue-template, dependency-update, main-protection/required-check and action-runtime follow-ups are recorded with owner/next decision in docs/planning/risks-and-decisions.md; no settings or automation were changed by closure.

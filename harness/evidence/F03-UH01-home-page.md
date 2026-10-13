# F03-UH01 — Home page implementation evidence

Date: 2026-10-13. Scope: explicit apply of `f03-uh01-home-page`; owner effort unreported. No commit, push, archive or behavioural-ownership migration.

## Completed inspection and first verification

T01 prerequisite/scope inspection is recorded in `harness/tasks/F03-UH01-home-page.md`. F02 is done and locally integrated; canonical R01/R02, AC01/AC02 and T01–T05 are preserved. F03-UH02/F04 are excluded.

Added site inbound Home controller/template and minimal shared fragments, immutable publication descriptors, UTF-8 EN/ES/FR resources and request-header locale resolution with English fallback. Only Home is published. No production tools/learning placeholder routes, preference form, payload processing or persistent storage introduced.

Executed `python3 scripts/verify-java-baseline.py -Dtest=HomeRenderingTests -Dit.test=PackagedAssetsIT -DskipITs`: exit 0. Frontend type/lint/format checks and 15 frontend tests passed; 10 actual Thymeleaf-rendered MVC tests passed, zero failures/errors/skips. Rendered semantic content/asset references, four publication states, EN/ES/FR plus unsupported-language fallback and catalogue key/placeholder parity verified. Packaged integration tests were explicitly skipped in this focused run; no browser acceptance is claimed.

## Prepared but not yet verified

Minimum shared Home styles and an unchanged source logo copy are present. Added a bounded anonymous-read security policy and adjacent route/method/logo tests. ADR 005 records the site/security boundary and intentional normal-JAR denial (403) of unpublished paths; isolated asset fixture gets copied-only authenticated access to retain its 404 checks. Security tests and prior packaged regressions have not passed with this new wiring yet.

## Blocking failure and exact next action

Executed `python3 scripts/verify-java-baseline.py -Dtest=HomeRenderingTests,HomeSecurityTests`: exit 1 during test compilation. Frontend checks and 15 tests passed, but `HomeSecurityTests.java` calls `dispatcherType(DispatcherType.ERROR)` on `MockHttpServletRequestBuilder`, which has no such method in the installed Spring version. No Java/security/packaged tests executed in this run.

Apply paused as required. Proposed bounded correction: use `.with(request -> { request.setDispatcherType(DispatcherType.ERROR); return request; })`, then rerun the focused checks and packaged regressions. No acceptance criterion needs to change. Await user guidance before correcting/continuing.

OpenSpec progress: 4/13 (1.1, 2.1, 2.2, 2.3). Canonical T01 done; T02 blocked/partial; T03–T05 unfinished. Logo/keyboard/reflow/contrast/browser/CI/publication-fixture/full clean checks remain unexecuted. Owner visual/translation review, acceptance and integration remain pending; F03 is not done.

Pause bookkeeping: both planning renderers ran. Initial planning integrity/rule checks rejected the missing actual-finish date on completed T01; recorded today's actual inspection date (not an estimated date or effort). Repeated planning integrity and all 15 planning-rule tests passed. Strict OpenSpec validation and whitespace checks passed.

## Resumed verification after authorised correction

The owner authorised the request post-processor correction and continuation. Applied `setDispatcherType` to the test request. Repeated `python3 scripts/verify-java-baseline.py -Dtest=HomeRenderingTests,HomeSecurityTests`: exit 0, 15 frontend tests, 20 Home MVC/security tests and all 15 packaged F02 tests passed, zero failures/errors/skips. Anonymous GET/HEAD, denial matrix, error dispatch, logo equality, filtered resources and unchanged normal-JAR fixture exclusion verified. Successive watcher rebuilds and startup rejection regressions passed.

Installed exact locked project-local Playwright 1.64.0 with the Maven-pinned Node 24.21.0/npm 11.21.0. `python3 scripts/verify-home-browser.py --install`: exit 0, all six Chromium tests passed against the unmodified normal executable. Browser revision 1248, Chromium/headless shell 156.0.8078.4; host Arch Linux uses Playwright's Ubuntu 24.04 fallback build. No sudo/system installation needed. Runner stopped its server. Downloaded tooling/browser binaries remain ignored, outside the distributable.

AC01: actual JavaScript-disabled EN/ES/FR browser contexts read the brand/heading/descriptions and served unchanged B image. AC02's current unavailable state has no actionable tools/learning link; all emitted navigation links return 200. Requests are same-origin GET with no body, no forms or preference cookies. Browser tests passed keyboard/visible focus/skip target, 320 CSS-pixel layout and 200% text enlargement, text-role contrast >=4.5:1 and no animation under reduced motion. Inspected generated three-language narrow/enlarged screenshots for clipping/brand integrity; text wraps heavily at the combined extreme but remains present and scrollable. System fonts and complete supplied raster are intentional limitations; independent owner visual/translation, actual browser-UI zoom and assistive-technology review are not claimed. Published-destination route-fixture transition and full clean verification remain pending.

Added an explicit 200% CSS layout-zoom check at desktop size (computed zoom = 2 and no horizontal overflow), distinct from text enlargement/device-scale-factor. Repeated all six browser checks successfully and inspected normal narrow plus layout-zoom screenshots. No content clipping observed. Added separate packaged-browser workflow using the existing SHA-pinned checkout/setup-java actions, read-only token, no persisted credentials, 15-minute limit and CI-only browser OS dependency installation. Local runner passed the same suite; no remote job ran. Reproduction/security/asset limitations documented in `docs/delivery/home-page.md`.

T04 publication fixtures: `python3 scripts/verify-java-baseline.py -Dtest=HomePublicationTests,HomeSecurityTests` exited 0 with four publication cases, ten security cases, 15 frontend tests and 15 packaged cases. Neither/one/both publication states use the real production controller/template and active security filters. Test-only mapped routes become public only when their descriptor is published; emitted links return 200, unavailable routes return 403 with no emitted link, section descriptions persist and status text disappears on publication. Fixture configuration is test-only, not in the normal JAR. This proves the transition mechanism, not publication of future tools/learning products.

## Final clean integration and local review

- `python3 scripts/verify-java-baseline.py clean`: exit 0. Frontend type/lint/format checks and 15 tests passed; 90 Java unit/context/architecture cases, zero failures/errors, four explicit absent-core/outbound capability skips; 15 real packaged cases, zero failures/errors/skips. Three architecture checks now select the actual inbound/site capability rather than skipping it. Added production handler-mapping assertion confirms no tools/learning/asset-fixture placeholder route.
- `python3 scripts/smoke-java-baseline.py`: exit 0, normal executable health HTTP 200/UP, child stopped with expected 143.
- Post-clean `python3 scripts/verify-home-browser.py --install`: exit 0, all six browser tests passed against the clean normal JAR; browser/server stopped. No local sudo or global configuration change.
- Artifact SHA-256: `e6afed16332d2257df753610f146a7b976479263f69c1c476069a0f36deb554f`.
- Original and served source B image SHA-256 both `83a37a77f8a8ba29fb6110cd15f30eb1737b226fff0d36238c17559bd054d209`; actual browser/MVC served bytes match.

Reviewed tracked diff plus new production/templates/configuration/tests/tooling against R01/R02 and inherited implemented-page quality checks. No remaining material implementation finding identified. Single application/inward direction retained; all visible Home copy comes from message resources, escaped Thymeleaf expressions only; no processing, persistence, speculative product route or external page dependency. Tests/tooling/configuration fixtures stay outside the normal JAR; existing packaged/watch/startup regressions remain passing. No new empty core packages or artificial ports.

Independent owner visual/translation acceptance, browser-UI zoom/assistive-technology review, remote CI and local integration/commit remain unclaimed. The six-check Chromium suite is not full shared-shell/F04 or cross-browser certification. Generated development-security and JVM agent warnings remain documented baseline limitations; no login endpoint exists. T01–T04 have actual local evidence; T05/story stay in_review pending owner acceptance/integration. Actual owner effort remains unreported. No commit/push/archive or requirements-owner migration performed.

Final tracking checks: regenerated backlog and roadmap; planning integrity, all 15 planning-rule tests, strict change validation and whitespace checks passed. Read-only comparison with HEAD confirmed only F03-UH01/parent tracking changed: original behavioural text, IDs, estimates/actual effort, entire F03-UH02 and all other features remain identical. F03 stays in_progress, F03-UH01/T05 in_review, T01–T04 done. OpenSpec's implementation checklist is complete; that does not establish integrated story/feature completion. Behaviour remains plan-owned until explicitly authorised migration.

## Owner acceptance and local integration authorisation

The owner reported liking the result after receiving the run/review instructions and explicitly approved recording acceptance, local commits and F03-UH01 closure. This supersedes the earlier pending-acceptance observations. It records acceptance of the implemented Home slice, not a claim that each suggested manual test was executed or that full shared-shell/F04 acceptance passed. Actual owner effort remains unreported.

Authorised scope: commit the reviewed implementation/planning artifacts locally on existing main, verify the committed result and close this story with evidence. No push, external publication, OpenSpec sync/ownership migration or archive was requested. Behaviour remains plan-owned; the completed change remains available for a separately authorised archive/ownership decision.

## Final local integration and closure

Accepted implementation integrated on existing local main in `f2a3e3c`. Post-commit `python3 scripts/verify-java-baseline.py clean` exited 0: 15 frontend tests, 90 Java cases (four explicit absent-capability skips), 15 packaged cases, zero failures/errors. Post-clean `python3 scripts/verify-home-browser.py --install` exited 0 with all six Chromium cases passing. Original executable health smoke exited 0, HTTP 200/UP, child stopped with expected 143. The working tree was clean before and after verification.

F03-UH01 and canonical T01–T05 close with owner acceptance, completed prerequisite F02, reviewed implementation, integration commit and post-commit evidence. Closure metadata is a separate local documentation commit. F03 remains in_progress because F03-UH02 remains planned; F04 and other features are unchanged. Actual effort remains unreported, not inferred from baseline hours. No remote publication/CI, broader security/shared-shell acceptance, main-spec synchronisation or OpenSpec archive occurred. The 13-task completed change remains active and behaviour remains plan-owned.

Closure checks: both planning renderers ran; planning integrity, all 15 planning-rule tests, strict change validation and whitespace checks passed. Reviewed plan diff: only F03-UH01/T05 status, actual finish date and implementation commit references changed; original behaviour, all effort values and unrelated stories/features are preserved.

# F04-UH02 secure HTTP execution evidence

Date: 2026-10-14. Status: accepted and done. Earlier execution/closure pauses are historical.

## Prerequisite and integration inspection

UH01's implemented native flow is evidenced by 46 passing Chromium cases and the preceding Maven run (15 frontend, 156 Java cases with four explicit skips, 15 packaged). Owner confirmed actual browser 200% zoom and language/visual review. UH01 closure remains pending combined integration; this is not an invented commit/dependency completion.

Read the F04-UH02 EARS/Gherkin/tasks and [delta/design](../../openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/design.md). Focused read-only inspection of pinned Spring Security 7.1.1 bytecode confirms: the CSRF request handler exposes a deferred token supplier, CsrfFilter materialises it only when required, then resolves the submitted value through parameter access. The bounded preference filter therefore must precede the security chain and supply all parameter accessors, not just a replayable input stream. Locale resolution already avoids servlet parameter/body access. Framework debug logs can interpolate raw request URLs, so defaults and scoped logging controls must remain safe.

Filter responsibilities: a global response-header/nonce filter must cover normal, early rejection and internal error dispatch; preference byte/media-type/parameter handling runs after that filter but before the security chain; one safe error renderer handles boundary/security/MVC errors without rendering token-bearing forms. No unsafe CSP relaxation, new runtime dependency or generic middleware framework is proposed.

Acceptance IDs: F04-UH02-AC01 (headers/security/no-session policy) and F04-UH02-AC02 (bounded input and non-disclosure). Tests/results will be recorded when executed, not inferred from design. Owner effort unreported; no commit/push/archive/adoption authorised.

## Header slice

Global REQUEST/ERROR response filter generates a 128-bit random nonce, exposes `cspNonce`, sets exact accepted CSP/security headers and no-store, and issues one-year HSTS only for non-local secure requests. Disabled duplicate default HSTS writer; existing deny-by-default route chain retained. Forwarded-header handling explicitly disabled.

Executed `./mvnw test -Dtest=SecurityResponseHeadersTests,LocalLanguagePreferenceTests,LanguagePreferenceTests,HomeSecurityTests -DfailIfNoTests=true`: frontend checks/15 tests and 39 Java tests passed, zero failures/errors/skips. Covers fresh nonces, normal/denied/internal-error policy, filtered GET/HEAD resources, preference CSRF, no sessions/login redirects, secure/local HSTS and spoofed forwarding. Documented reproduction in [delivery guidance](../../docs/delivery/secure-http-responses.md). No packaged/browser proof of the new CSP claimed yet.

## Cache slice — compiler pause

Prepared manifest-listed non-local successful-asset caching and local/missing-resource cache tests. Executed `./mvnw verify` with local log `target/f04-cache-verify.log`: frontend checks/15 tests passed, Java compilation failed because the pinned `OnCommittedResponseWrapper.sendError` methods are final and cannot be overridden. No Java or packaged tests ran in this command. Task 2.3 remains incomplete; current source is not buildable. Earlier header tests passed before this cache edit.

Recommended correction, not applied: remove the custom commit-wrapper approach and use Spring MVC's standard resource-handler cache settings, retaining no-store defaults/error policy and the existing local-watch exception. Do not add nested wrappers just to bypass final methods. Apply paused at 8/16 under the error guardrail; body limits, safe errors/logs, ASVS mapping and final integration remain unimplemented/unverified.

Canonical UH02 closure tracking retains its UH01 integration prerequisite: focused inspection/header work is evidenced here and in the change checklist, but UH01 is not falsely marked done while combined integration/local commit remains pending.

## Standard cache correction — current result

Owner authorised the simpler MVC approach. Removed the custom commit wrapper completely and restored the small response-header filter. The existing resource configuration now uses Spring MVC `CacheControl` for exact manifest-listed non-local resource paths; local wildcard/watch serving stays no-store.

Repeated `./mvnw verify`: frontend checks/15 tests passed, compilation succeeded, 162 Java cases ran with one failure and four explicit architecture skips. Packaged tests did not run because Surefire failed. The sole failure is the cache test's exact string ordering: expected `public, max-age=31536000, immutable`, received Spring's semantically equivalent `max-age=31536000, public, immutable`. Current source compiles; the earlier final-method compiler blocker is resolved.

Recommended test-only correction, not yet applied: split the header on comma-space and compare the three directives with `containsExactlyInAnyOrder`. This retains exact directives/values without asserting irrelevant ordering or adding a parser/abstraction. Task 2.3 stays incomplete, progress 8/16; apply paused on the failed check.

Owner approved the simple directive comparison; implemented without any parser/abstraction. Repeated `./mvnw verify` passed frontend checks/15 tests, 162 Java cases (four explicit architecture skips) and all 15 packaged cases, including successive local watcher rebuilds. Compilation/cache assertions and resource-error/local no-store checks pass. Task 2.3 complete; previous cache failures are historical. No browser proof of the new CSP or full-feature acceptance claimed yet.

## Preference byte boundary

Implemented exact preference-POST pre-security filtering: UTF-8 URL-encoded media type, declared/actual 4096-byte cap, at most 4097-byte read, strict decoding, multiplicity-preserving query/form parameters and bounded replay. Connector header limit is 16KB, form/swallow limits 4KB. Existing preference tests now submit real encoded bodies, not synthetic servlet parameters.

Executed `./mvnw test -Dtest=PreferenceRequestBoundaryTests,LanguagePreferenceTests,LocalLanguagePreferenceTests,SecurityResponseHeadersTests,HomeSecurityTests -DfailIfNoTests=true`: 15 frontend and 59 Java tests passed without failures/errors/skips. Includes unknown-length read cap, multibyte bytes, untouched oversized/unsupported streams, safe malformed input, exact-limit real CSRF success, query/form ambiguity and 400/413/415 before CSRF without cookie/session mutation. Task 2.4 complete. Real connector/streaming proof remains task 2.6.

## Error slice — API compilation pause

Prepared a shared fixed-content Thymeleaf/JSON renderer, MVC advice/internal error controller, early/security integration, EN/ES/FR messages, bounded HTTP event fields and scoped framework diagnostic suppression. Added localised 400/403/404/413/415 and test-only MVC 500 checks; these checks have not run successfully. Normal packaged fixture exclusion and process-log evidence remain unverified for this slice.

Executed `./mvnw test -Dtest=SafeHttpErrorsTests,PreferenceRequestBoundaryTests,LanguagePreferenceTests,LocalLanguagePreferenceTests,SecurityResponseHeadersTests,HomeSecurityTests -DfailIfNoTests=true`: frontend checks/15 tests passed; production compilation failed at `PublicPageSecurity.java` because pinned `CsrfConfigurer` has no `accessDeniedHandler` method. No Java tests ran. Current source does not compile; the last passing results above predate error-slice edits.

Read-only `javap` inspection of Spring Security config 7.1.1 confirms `CsrfConfigurer.getDefaultAccessDeniedHandler` obtains the handler from `ExceptionHandlingConfigurer`. Recommended correction, not applied: remove the redundant nonexistent CSRF-specific call and retain the already configured shared access-denied handler in `exceptionHandling`. No new abstraction/compatibility shim or weakened CSRF behaviour is required. Task 2.5 remains incomplete; apply paused at 10/16 awaiting guidance.

## API correction and architecture pause

Owner authorised removing the redundant call. Executed the focused error/boundary/preference/header/Home security command again: frontend checks/15 tests and 64 Java tests passed, no failures/errors/skips. The source compiles and the existing shared exception-handling handler applies to CSRF. No packaged error success is inferred from these focused checks.

Prepared two packaged cases in the existing `PackagedAssetsIT` harness: isolated-only failure controller/application with normal-JAR exclusion and digest checks, and declared/chunked/exact-limit/partial-stream/header-limit and response/log sentinel checks. No original JAR modification or new production failure route is introduced.

Executed `./mvnw verify` (local log `target/f04-http-verify.log`): frontend checks/15 tests passed; 185 Java cases ran with one architecture failure and four explicit skips. `productionPackagesAreAcyclic` reports i18n → security → i18n because `LanguagePreferenceController` now directly depends on `SafeHttpErrors`, while security already depends on the i18n cookie policy. Packaged tests did not run. Task 2.5 remains open, progress 10/16; apply paused under the error guardrail.

Recommended minimal correction, not applied: remove the controller's renderer dependency and raise a standard `ResponseStatusException(HttpStatus.BAD_REQUEST)` with no client message for invalid language. Existing shared MVC advice already handles `ErrorResponse` status and safely renders it. This restores the prior dependency direction, avoids null response returns and adds no new abstraction or architecture-test exception. Then rerun full verification before claiming tasks 2.5/2.6 complete.

## Controller correction and partial-stream pause

Owner authorised the minimal correction. Removed the controller's renderer dependency and null response return; invalid language now raises a message-free standard 400 exception handled by shared MVC advice. Executed `./mvnw verify`: frontend checks/15 tests and all 185 Java cases passed (four explicit architecture skips). Package-cycle gate passes. Of 17 packaged cases, 16 passed and one errored on a socket read timeout.

The isolated packaged 500 case passed in EN/ES/FR with no private sentinel/exception in response/logs, fixed headers, no token/form, unchanged normal-JAR digest, excluded fixture classes and normal-JAR 404 for the fixture path. Together with passing localised 400/403/404/413/415, safe non-HTML and internal-dispatch checks, this completes task 2.5.

Task 2.6's declared-length and fully terminated chunked oversize checks, exact 4096-byte real-token success and unsupported-media checks passed before the error. The unfinished chunked upload test timed out awaiting its 413 status line (`PackagedAssetsIT.java:170`). Oversized-header and final boundary log-sentinel assertions occur after that point and were not executed in this run. No complete streaming/log/header proof claimed; task 2.6 remains open, progress 11/16.

Inspection shows the renderer writes the small safe response without explicitly flushing/committing it. Recommended correction, not applied: flush the completed error response so the client can receive the rejection without finishing its upload; rerun the unchanged partial-stream case and full checks. This is a hypothesis until verified, not a confirmed connector diagnosis. Do not remove the unfinished-stream test, raise its timeout to hide a stall, or drain an unbounded body. Apply paused under error guardrail awaiting guidance.

## Flush attempt and confirmed read stall

Owner approved flushing the error response. Added `response.flushBuffer()` after safe HTML/JSON output; the streaming test is unchanged. Repeated `./mvnw verify`: 15 frontend tests and 185 Java cases passed (four explicit skips); 16/17 packaged cases passed, with the same partial-stream socket timeout. The flush hypothesis did not resolve the failure. Header-limit/final boundary-log checks still did not execute.

Read-only runtime diagnosis started the current executable JAR on a dynamic loopback port with the local profile, sent the same unfinished 4097-byte chunk, and captured `jstack`; the diagnostic process was stopped. The request thread is blocked in Tomcat `ChunkedInputFilter.parseChunkHeader` via `InputStream.readNBytes` at `PreferenceRequestBoundary.java:55`, before error rendering. Pinned Java 25 bytecode shows `readNBytes(int)` calls `read(byte[], off, 0)` after filling the requested bytes; Tomcat's stream attempts another chunk read. The buffer overload `readNBytes(byte[], off, len)` checks accumulated size before another read and stops when full.

Recommended minimal correction, not applied: allocate a fixed 4097-byte buffer, call that buffer overload, and copy only the returned bytes for accepted forms. Add a focused regression that rejects any zero-length extra read after reaching the cap, retaining the packaged unfinished-stream test unchanged. No generic streaming abstraction, timeout inflation or unbounded drain is needed. Apply paused at 11/16 under the error guardrail. Source compiles; full verification is not passing.

## Fixed-buffer correction — packaged verification passed

Owner agreed to retain the simple simulated and real checks and requested completion. Implemented fixed 4097-byte buffer/read overload, copying only accepted bytes, plus one simulated regression forbidding zero-length/extra reads. Packaged unfinished-upload case unchanged.

Executed `./mvnw verify`: frontend checks/15 tests, 186 Java cases (four explicit architecture skips) and all 17 packaged cases passed. Confirms declared/unknown-length rejection, exact-limit real-token acceptance, incomplete-upload early 413, 16KB connector header rejection, safe response/log sentinels and token/cookie non-disclosure, no rejected preference cookie, normal-JAR fixture exclusion/digest and successive local watcher rebuilds. Task 2.6 complete; this run is not a clean build or final combined acceptance.

## CSP browser-test pause

Executed `python scripts/verify-home-browser.py`: 31/46 Chromium cases passed, 15 failed. Failures are Home and shared keyboard/reflow tests using `page.addStyleTag` to inject unnonced CSS zoom/text enlargement, correctly blocked by the new `style-src` policy. Native preference/forgery cases and the other browser cases passed. No CSP relaxation or skipped accessibility coverage is proposed.

Recommended test-only correction, not applied: read the nonce from each current document's CSP response and set it on the synthetic style element before attaching it; retain all zoom/reflow assertions and keep normal tests under CSP. Do not globally bypass CSP or add unsafe-inline. Task 2.7 remains open, progress 12/16; ASVS mapping, clean integration, owner acceptance and closure remain outstanding. Apply paused on failed browser checks under the error guardrail.

## CSP browser correction and ASVS mapping

Owner authorised nonce-bearing synthetic accessibility-test styles. Added one small shared test helper that reads the current document's response nonce and assigns it before attaching the style; existing zoom/reflow/focus/contrast assertions retained. No production CSP change, bypass or skipped browser case.

Executed `python scripts/verify-home-browser.py`: 46/46 Chromium cases passed under CSP, including native preferences/forgery, JavaScript on/off and Home/shared/component/keyboard/contrast/reflow regressions. Prior Maven run passed all 17 packaged cases. Task 2.7 evidence maps AC01 (response/route/no-session/CSP policy) and AC02 (byte bounds, safe error/diagnostics) to actual checks in [ASVS mapping](../../docs/quality/F04-asvs-mapping.md). IDs verified directly against official tagged 5.0.0 source; partial cookie-prefix/HSTS/log-infrastructure controls disclosed; no certification claim. Local-profile browser preference assets remain filesystem-served; packaged tests separately prove classpath assets. Clean integration/owner acceptance remain open.

## Clean integration — browser tooling prerequisite

Executed `./mvnw clean verify`: frontend checks/15 tests, 186 Java cases (four explicit architecture skips), 17 packaged cases passed. Normal executable inspected directly: no fixture classes/templates, approved B bytes match the original. Executed `python scripts/smoke-java-baseline.py`: executable manifest/startup/HTTP 200 health UP passed; child stopped.

Executed post-clean `python scripts/verify-home-browser.py`: all 46 attempts failed at browser launch because `mvn clean` removed project-local `target/browser-cache`; no application/browser assertions ran in this attempt. Prior nonce-corrected 46/46 browser pass remains valid evidence but is not mislabelled as post-clean verification. Logs retained outside cleaned target at `/tmp/opencode/f04-clean-verify.log`, `/tmp/opencode/f04-final-browser.log`, `/tmp/opencode/f04-smoke.log`.

Standard existing remedy, not yet run: `python scripts/verify-home-browser.py --install` restores locked test tooling and Chromium project-locally; no `--with-deps`, sudo or system modification needed. Apply paused under tooling-error guardrail. Progress 13/16; task 3.1 remains incomplete until the post-clean browser run succeeds, owner acceptance/local commit authorisation remain separate. No main-spec sync/archive/migration/push performed.

## Google Chrome integration — complete verification

Owner requested installed Google Chrome instead of downloading Chromium and authorised continuation. Found `/usr/bin/google-chrome-stable`, version 152.0.7977.82. Added explicit `--browser chrome` selection to the existing runner and Playwright/snapshot channel; default CI Chromium retained. Chrome mode never installs a browser or OS dependencies. No outside-project changes or sudo.

Executed post-clean `python scripts/verify-home-browser.py --browser chrome`: 46/46 cases passed with Google Chrome 152.0.7977.82/Playwright 1.64.0. Local log `/tmp/opencode/f04-final-chrome.log`. Clean `./mvnw clean verify`, 15 frontend tests/186 Java cases (four explicit architecture skips)/17 packaged cases, normal-JAR exclusion/original B bytes and baseline smoke passed as above. Task 3.1 complete. No production Java/assets change after the clean build; subsequent changes select the browser and document actual evidence.

Integrated diff reviewed for publication boundary, dependency direction, masked-cookie CSRF, bounded reads, safe error/log fields, exact manifest caching, fixture isolation, unchanged production CSP and preserved unrelated VS Code edits. No material finding in that scoped review. ASVS mapping deliberately discloses cookie-prefix/HSTS/deployed-log limitations rather than inventing full compliance. Both acceptance pairs have executed evidence; owner zoom/language/visual review remains separately recorded with its stated limitations. Implementation/verification ready for owner acceptance, not falsely marked accepted/done. No local commit, push, archive, spec sync or ownership migration; actual owner effort unreported.

Canonical tracking/handoff updated to the acceptance-pending state; both planning renderers executed. `python scripts/check-planning.py` passed; `python scripts/test-planning-rules.py` passed 15 tests; strict OpenSpec validation and `git diff --check` passed. Behavioural ownership unchanged, F05 untouched. Task 3.3 complete; progress 15/16. Only checklist 3.2 remains open for explicit owner acceptance/closure; local commits only if separately authorised.

## Owner acceptance and closure — 2026-10-14

Owner explicitly accepted both F04 stories after the integrated checks and authorised tracking closure. F04-UH02-AC01/AC02 have actual Java/packaged/browser/privacy/header evidence above and ASVS mapping with explicit limitations. Closure attempt failed `check-planning.py` and the baseline planning-rule test: both done stories require a real commit reference. Strict OpenSpec and whitespace passed, but this did not establish valid closure. Restored acceptance-recorded pending-commit tracking and reopened checklist 3.2/3.3 (14/16); no validator relaxation or fabricated commit. UH01 accepted but not formally done, so dependent canonical statuses remain blocked until closure. Owner effort unreported; actual hours unchanged. No commit authorised/made, push/archive/spec sync/behavioural migration; F05 unchanged. Request authorisation for one coherent local F04 commit excluding unrelated VS Code edits, then record its real hash and rerun closure checks.

Owner subsequently authorised one coherent local F04 commit. Created `3ea174f` (`feat: implement F04 security and locale flow`), excluding `.vscode/settings.json`; recorded real hash on both stories/all tasks. UH01 prerequisite accepted/closed; UH02 and F04 now done against technical evidence and owner acceptance. No fabricated effort, validator exception or unrelated F05 work. Post-commit closure bookkeeping remains uncommitted, since only one local commit was authorised. No push/archive/spec sync/migration.

After committed closure, both planning renderers executed; planning integrity passed with real commit references, planning-rule tests passed 15/15, strict OpenSpec validation and whitespace checks passed. Checklist 3.3 complete: 16/16. No application code changed after final build/browser evidence.

## Archive — 2026-10-14

Owner requested archive and selected spec sync. Created both main specifications, preserving delta purpose/requirements/scenarios exactly; strict validation passed all five main specs. Archived complete spec-driven change to `openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/`, preserving `.openspec.yaml` and 16/16 task completion. Updated external evidence links; story behavioural ownership remains plan-owned, no automatic migration. Archive/sync/closure bookkeeping uncommitted; no new commit or push authorised.

# F04-UH01 locale-preferences execution evidence

Date: 2026-10-14. Status: accepted; required commit/closure pending. Earlier execution pauses are historical.

## Prerequisite and scope

F03 and both accepted stories are done and archived. Owner requested apply of the complete `f04-security-and-locale-flow` change. [Task record](../tasks/F04-security-and-locale-flow.md) and [delta](../../openspec/changes/f04-security-and-locale-flow/specs/locale-preferences/spec.md) retain the canonical F04-UH01-AC01/AC02 criteria. F04 remains plan-owned; no commit/push/archive authorised.

## Locale-resolution slice

- Replaced header-only resolver with request-scoped precedence: exact supported query language, unambiguous preference cookie, weighted regional Accept-Language, configured ES/FR country, English.
- Invalid/duplicate candidates fall through; q=0/wildcards and equal weights covered. No client country header is trusted. Resolving locale does not read POST parameters/body or mutate cookie/session state.
- Executed `./mvnw test -Dtest=PreferenceLocaleResolverTests,LocaleRenderingTests,HomeRenderingTests,HomeSecurityTests -DfailIfNoTests=true`: passed 15 frontend tests/checks and 59 Java tests (31 resolver, one locale MVC, 16 Home rendering, 11 Home security); zero failures/errors/skips.
- Runtime reported Java 25.0.4.1 and Spring Boot 4.1.1. Existing Mockito dynamic-agent warnings and unused generated development-security-password warning remain; no password values retained in evidence.

## Preference slice and pause

- Prepared cookie-backed XOR-masked CSRF, native EN/ES/FR selector and styles, exact preference POST, a language-only cookie and a Home-only 303 return allowlist. Home rendering tests were adjusted only for the newly authorised form.
- Executed `./mvnw test -Dtest=LanguagePreferenceTests,LocalLanguagePreferenceTests,LocaleRenderingTests,PreferenceLocaleResolverTests,HomeRenderingTests,HomeSecurityTests -DfailIfNoTests=true`: frontend checks and 15 tests passed; 83 Java tests ran, 82 passed, one errored, no skips. Build failed; full log is local `target/f04-preference-tests.log` and is not copied into evidence because it contains generated tokens/passwords.
- All 23 non-local preference tests passed: genuine Thymeleaf token/cookie round trips in EN/ES/FR, non-local cookie flags/masking, invalid/repeated/missing language, unsafe returns, and missing/mismatched/raw token rejection without session/login redirect. Locale and existing Home tests also passed in that run.
- `LocalLanguagePreferenceTests.onlyLocalHttpOmitsSecureAndLocalHttpsRetainsIt` errored at line 27: second form GET did not yield XSRF-TOKEN. Read-only inspection of the pinned Spring Security 7.1.1 test helper bytecode confirms `.with(csrf())` installs a `TestCsrfTokenRepository` backed by `HttpSessionCsrfTokenRepository` into the selected filter. The synthetic POST in the loop contaminates the next GET; its missing cookie is not evidence of broken production cookie persistence.
- Proposed correction, not applied: obtain and submit the actual masked token/cookie in the local HTTP/HTTPS test, avoiding `.with(csrf())`; verify isolation from legacy tests using that helper. Pause under the apply workflow's error guardrail. Checklist 1.3 is NOT complete.

## Acceptance coverage and remaining work

Resumed after owner approval: local HTTP/HTTPS and legacy Home denial tests now use genuine rendered masked tokens and cookie pairs, with no `.with(csrf())` repository replacement. Repeated the same six-class targeted command successfully: 15 frontend and 83 Java tests passed, no failures/errors/skips. Task 1.3 complete; initial failure statements above are historical. Local HTTP/HTTPS cookie attributes, actual-token submission and no-session behaviour now pass.

## Selector/browser slice and current pause

- Added [delivery and owner-review instructions](../../docs/delivery/locale-preferences.md), ten native preference/forgery browser cases, selector keyboard/focus/contrast coverage and updated prior no-form/no-cookie expectations for the authorised preference form and CSRF cookie.
- Shared the configured cookie CSRF repository with the isolated shell fixture's stateless chain; fixture-only GET exposure remains narrow and no session-backed form token is introduced.
- Extended `verify-home-browser.py` with a separate explicit loopback-local process for preference browser flow. Existing normal-JAR and component-fixture origins remain non-local/classpath-backed. Local browser flow is not classpath-asset evidence; packaged regressions remain separate.
- `./mvnw verify` passed: frontend checks/15 tests; 156 Java cases, zero failures/errors and four explicit architecture skips; 15 packaged cases, zero failures/errors/skips, including successive watcher rebuilds and fixture exclusion. This was not a clean build. Local log: `target/f04-selector-verify.log`.
- `python scripts/verify-home-browser.py` ran 46 Chromium cases (Playwright 1.64.0): 34 passed, 12 failed, zero skips. All six EN/ES/FR JS-on/off native POST cases and four forged-change cases passed. All component, Home, keyboard/focus/contrast/reflow cases passed; approved B bytes were verified. The normal JAR digest remained unchanged by the runner. No actual browser-UI 200% zoom or owner copy/visual review claimed.
- The 12 shared-shell cases all fail at `shared-shell.spec.mjs:23`, before later label assertions, because `response.headers()["set-cookie"]` is undefined. Official Playwright Response documentation confirms `headers()` omits security/cookie headers and `allHeaders()` includes them: https://playwright.dev/docs/api/class-response#response-headers . Successful Home/component browser cookie assertions independently show XSRF-TOKEN is present with expected flags.
- Proposed correction, NOT applied: change only this test assertion to `(await response.allHeaders())["set-cookie"]`, retaining all 12 cases and cookie expectations, then rerun the full browser suite. Apply paused on the error guardrail at 3/16 tasks complete; task 1.4/1.5 remain unchecked despite passing individual preference cases.

Locale matrix and genuine-token MVC/browser tests support AC01/AC02, but shared-shell regression is currently blocked. Task 1.6 actual browser zoom and owner visual/copy review remains pending. UH02 security/request-boundary implementation has not started. No final clean verification, acceptance, commit, push or behavioural migration claimed. Actual owner effort unreported.

## Current result — browser assertion repaired

Owner authorised a simple correction without overengineering. Changed only the failing assertion to `await response.allHeaders()`; no new test abstraction, application change or weakened expectation.

Executed `python scripts/verify-home-browser.py` again: **46/46 Chromium cases passed**, zero failures/skips. This includes the 12 previously blocked shared-label cases, ten native preference/forgery cases, and existing Home/component/keyboard/contrast/reflow cases. Both implementation checklist items 1.4 and 1.5 are complete; progress is 5/16. Earlier browser failures above are historical.

F04-UH01-AC01: genuine-token EN/ES/FR native GET→POST/reload with JS on/off and inspected cookie attributes/lifetime passes. F04-UH01-AC02: missing/mismatched/raw token rejection retains French preference, with no login redirect/session; MVC redirect and precedence matrices also pass. Packaged regressions passed in the preceding Maven verification; no production source changed after it.

Task 1.6 remains blocked only on unexecuted actual browser-UI 200% zoom and owner visual/copy review. Automated keyboard/focus/contrast/CSS reflow passes do not replace those observations. Follow [the short review checklist](../../docs/delivery/locale-preferences.md#required-owner-review-task-16). No final clean/full-F04 verification, owner acceptance, commit, push or UH02 completion claimed.

## Owner review — 2026-10-14

The owner reported that the application works and looks good at actual browser 200% zoom and in the languages after following the supplied local check command. Recorded as owner zoom/language/visual review for task 1.6, alongside the existing automated keyboard/focus/contrast/reflow and EN/ES/FR message/native-flow evidence. Browser/version, viewport and individual manual keyboard/JavaScript-disabled observations were not reported and are not invented. No broader F04 security acceptance or commit authorisation is inferred. Task 1.6 complete; UH01 closure still awaits combined integration.

## Combined security integration — 2026-10-14

After nonce-authorising synthetic accessibility-test styles only, all 46 browser cases passed under production CSP, including preference/native/forgery/keyboard/reflow checks. Subsequent `./mvnw clean verify` passed 15 frontend tests, 186 Java cases (four explicit skips), 17 packaged cases. Normal JAR excludes fixtures and retains original B bytes; baseline startup/health smoke passed. Post-clean browser rerun could not launch because clean removed project-local Chromium cache: no post-clean browser success claimed. Existing `--install` option must restore tooling and rerun. [UH02 evidence](F04-UH02-secure-http-responses.md) records details/ASVS limitations. Integrated owner acceptance and closure remain pending; no commit/push/archive/migration inferred.

Owner requested installed Google Chrome rather than a Chromium download. Executed post-clean `python scripts/verify-home-browser.py --browser chrome`: 46/46 passed with Google Chrome 152.0.7977.82 and Playwright 1.64.0, including real local preference/forgery and all prior Home/shared accessibility cases. Combined task 3.1 complete with the clean build/smoke/package/logo evidence above. Native-flow browser origin remains explicitly local/filesystem-serving; non-local classpath packaging verified separately. Integrated diff reviewed without material scoped findings. Final owner acceptance for both F04 stories remains pending; manual observations/actual owner effort are not invented, no commit/push/archive/migration made.

## Owner acceptance and closure — 2026-10-14

Owner explicitly accepted both F04 stories after the passing integrated result and authorised closing their tracking. F04-UH01-AC01/AC02 are evidenced above and F03 prerequisite done. Closure attempt failed planning validation: each done story requires a real commit reference. Corrected tracking to acceptance recorded/in_review pending commit authorisation, not falsely done. Owner effort remains unreported; no commit authorised or created. No push/archive/spec sync/behavioural migration; F05 unchanged. Checklist 3.2/3.3 remain open until valid committed closure.

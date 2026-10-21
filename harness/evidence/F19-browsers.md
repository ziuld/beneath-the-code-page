# F19 — final browser review evidence

Date:2026-10-21. Branch:verification/F19-browsers, from accepted T01 a46d6f1.
Owner requested the next F19 step; F18/F08/F09/F10 and T01 prerequisites complete.
Requirements/scenarios remain plan.json-owned, F19-UH01 R01/R02 and AC01/AC02.
Actual owner effort unreported;8h baseline/forecast retained. No subagents,
push/PR/deploy, sudo, Docker changes or global installation.

## Scope, defects and corrections

All three engines now select all169 retained checks, including all six tools,
13-route shared layouts, lessons, locales, keyboard, workers/CSP and payload privacy.
Focused --grep added; outer full-suite timeout180→300s, individual test/worker
limits unchanged. Harnesses run sequentially against one coherent packaged JAR.

- Initial full Firefox:163 pass/6 component failures. The old assertion equated
  Space with JavaScript matches(:active); native Firefox differs. Test now retains
  exact Space/Enter activation count and focus, and asserts rendered pointer-down
  token colour/release plus disabled tab exclusion. Focused6/6 then full169/169 pass.
- Initial focused WebKit:18 pass/18 fail. Secure cookies on production-profile
  plain HTTP are discarded by WebKit. Shared tests now assert actual Set-Cookie
  issuance and every Secure/HttpOnly/SameSite/Path flag; any stored cookie must
  retain those flags and no unexpected cookie may exist. Native locale forms use
  the existing local HTTP profile (also used by established preference tests).
  No production cookie/security configuration relaxed. A separate local-profile
  server from the unmodified JAR covers real lesson forms; the existing preference
  fixture retains its synthetic course catalogue for F13 tests.
- A real reload defect reproduced after injected503 lazy-module failure: requests
  recover200 and direct native import succeeds, while JS modulepreload still
  rejects. Vite modulePreload=false removes optional JS preloads; extracted CSS
  loading and native imports remain. Trade-off: ordinary import loading may add
  a JS waterfall. No retry/cache-busting framework, query URL, cache/CSP relaxation
  or tool processing change. Focused Vite3 and corrected WebKit6 checks pass.
- The three BTC-F07-WK-01 Validator reload fixmes are re-enabled, with original
  recovery assertions intact. Full WebKit169/169 now resolves BTC-F07-WK-01.
- First full WebKit:151 pass/18 lesson-fixture failures. Real lesson language forms
  had the same production-HTTP cookie mismatch. Also, Playwright WebKit screenshot
  preparation injects a body{} animation-sync style, creating a synthetic CSP event.
  CSP is now asserted for the real journey before diagnostic capture; no violation
  is ignored or reset. Caret initial preserves the native state too. A first attempt
  used the synthetic local course fixture and was stopped after known missing-route
  timeouts; corrected to the separate unmodified-JAR local profile. Focused6/6 pass.
  Log:target/f19-webkit-learning-focused.log; earlier full log:
  target/f19-webkit-full-initial.log. Application headers and content are unchanged.

## Runtime and executed checks

Playwright1.63.0 / Node24.21.0 / Linuxx86_64,12 hardware threads.
Actual browser.version(): Chromium153.0.8010.12, Firefox155.0, WebKit WPE26.6.
Versions:target/f19-browser-versions.json. Native Safari has NOT been executed.

Native cached WebKit lacked3 ABI libraries. Official Ubuntu packages ICU74.2-
1ubuntu3.1, libxml2 2.9.14+dfsg-1.3ubuntu3.10 and Flite2.2-6build3 were downloaded,
SHA256-verified and extracted under target only. No package scripts executed.
Pinned sources/hashes and launcher recipe: scripts/prepare-webkit-local.py.
See docs/quality/final-browser-review.md. This is a Linux test runtime, not an app
or Docker distribution dependency. Docker socket permission remains unchanged.

- Full Maven PASS:274 frontend,273 Java,17 packaged integration, plus type/lint/
  format/architecture/packaging. Log:target/f19-maven.log. The earlier focused
  -DskipTests package build was only a candidate build, not acceptance evidence.
- Security policy20 and strict main OpenSpec15 PASS; target/f19-policy.log and
  target/f19-openspec.log. No spec migration/archival.
- Fresh security and packaged startup/healthUP/shutdown PASS; logs:
  target/f19-security.log, target/f19-smoke.log. Security finished after the zoom
  and lesson-fixture changes: 53 production sources, zero findings, no exceptions.
  All 211 recorded code/test/harness/artifact input hashes still match on resume.
- Firefox final full169/169 PASS,0 skipped; target/f19-firefox.log and
  target/f19-firefox-results.json. Initial failures:target/f19-firefox-initial.log.
- After the lesson-fixture-only correction, affected Firefox43/43 PASS,0 skipped;
  target/f19-firefox-affected.log/results.json. The full169 pass above used the same
  application candidate; unchanged Firefox tests were not needlessly repeated.
- WebKit final full169/169 PASS,0 skipped/0 flaky; target/f19-webkit.log and
  target/f19-webkit-results.json. This includes all3 formerly deferred cases.
- Chromium final full169/169 PASS,0 skipped/0 flaky; target/f19-chromium.log and
  target/f19-chromium-results.json.
- Native Chromium200% zoom39/39 route/locale checks PASS: tabs API zoom2,
  devicePixelRatio2, CSS zoom1,720px CSS layout from1440px native window; final fonts,
  no horizontal page overflow, entire focused control visible and centre unobscured.
  Isolated test profile/extension removed. Initial full-page captures clipped at
  tab zoom; corrected to native-window/CDP viewport capture. Data/log/images:target/f19-native-zoom.json, target/f19-native-zoom.log,
  target/f19-zoom-*.png. Not CSS/device-scale emulation or owner manual review.

## Integration review and closure

Agent visually reviewed Firefox narrow French UUID, WebKit wide French JWT and
Chromium native200% focus captures. These are agent observations, not owner manual
acceptance. Retained automated journeys cover layouts, locales, keyboard, editor/
worker CSP, fault recovery and payload privacy without skips or flaky results.
No remaining demonstrated compatibility defect is open in these tested engines.

Real Safari is **UNVERIFIED**: no Apple device, OS or Safari version was reviewed.
Linux WebKit WPE is not Safari. F19-UH01-R02/AC02 explicitly permits this pending
limitation; closure uses that alternative and makes no Safari compatibility claim.
No full WCAG or screen-reader compatibility claim is made.

Candidate JAR SHA256:
`1d0799c6995f06fed46177e5a4673cffe0c7320caaf966d0b0d71077bb51131b`.
All engine runs use this unchanged application candidate. Firefox's full169 run
precedes the final fixture-only corrections; affected43 were then rerun. WebKit
and Chromium full169 runs follow those corrections. Passing gates were not repeated
for documentation-only closure. Final planning checks and commit identity are
recorded in the current handoff and canonical tracker.

Scoped diff reviewed: one production build option, demonstrated test-fixture
corrections, full engine selection and isolated local verification helpers.
Privacy, CSP, cookie flags, native keyboard activation and original recovery
assertions remain enforced. No new application dependency or architecture boundary.
The coherent changes are integrated locally on verification/F19-browsers; no push,
merge or deployment is implied. F19 T02–T04 complete with Safari limitation above;
F20 Docker portability is next and has not started.

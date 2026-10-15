# F05-UH01 — Accessible editor evidence

Updated: 2026-10-15. Status: Chromium/Firefox pass and WebKit EN/ES/FR axe passes after button correction. Minimal reproduction shows the pinned WebKit environment reports an inline-style CSP violation even for an unstyled native select, without app/editor code; no-select control passes. Tested CSS alternatives do not fix it. Browser-gate decision and explicit AT/manual details remain pending; no full three-engine acceptance claimed.

## Task 1.1 — Executed inspection

- F04/both stories are done in canonical plan.json, with accepted implementation commit 3ea174f and archived change. Current feature branch retains local Chromium correction 750e959.
- Pinned direct frontend packages: state 6.7.6, view 6.43.14, commands 6.11.1, search 6.7.2 (MIT). Browser-only @axe-core/playwright 4.13.0 and axe-core 4.13.0 (MPL-2.0). Lockfile entries include integrity hashes. Inspected new transitive CodeMirror/Lezer/style-mod/crelt/w3c-keyname licence metadata: MIT. This is licence metadata review, not a vulnerability audit or application licence selection.
- Pinned view exposes `EditorView.cspNonce`; its style mounting reads that facet. Escape enables tab focus for two seconds; search's Escape binding closes the search panel. Search uses state phrases for controls and announcements, so its dictionary must come from SSR resources.
- Added a focused Vite 8.3.4 build test using temporary target-local source/output: entry dynamically imports lazy module; lazy module constructs a static-URL worker. Build records dynamicImports and lazy chunk, emits hashed same-origin worker, but does not list that worker in the main manifest. Private metadata must include emitted worker assets explicitly, without preloading lazy chunks on Home. This is build evidence only, not proof of worker response CSP.
- Executed project-local `npm run check`: typecheck, lint, formatting and 16/16 Vitest tests pass. Initial format check identified the new test; applied project Prettier and reran the complete command successfully.

## Design blocker before task 1.2/1.3

Pinned `@codemirror/search/dist/index.js`, `announceMatch` (lines 1182–1200), extracts nearby document content and dispatches `EditorView.announce` containing that excerpt. Task 1.3 explicitly requires no payload-derived live-region text. The current design proposes the built-in search panel but does not address that conflict.

Recommended decision: retain built-in search/navigation but replace payload-bearing announcements with resource-backed generic status, verified before rendering. This preserves the current privacy contract; assistive-technology proof must confirm the remaining feedback is sufficient. Alternative: explicitly permit local search excerpts in assistive-technology announcements, revising the affected requirements/design/tasks; no network/storage relaxation.

The owner subsequently agreed to generic resource-backed announcements and requested continuation. The design now records this decision; it preserves the existing privacy requirement rather than permitting excerpts.

## Resumed implementation — executed results

- Added reusable CodeMirror editor/workspace wiring, lazy import and scoped editor styles, escaped SSR fragment/messages/nonce, resource-backed EN/ES/FR instructions/search phrases/status, and a fixture-only controller/template copied into the isolated JAR by the existing runner.
- Added pre-render transaction policy: search announcements carry only resource text and selected line number, other announcements use a generic resource message; selections, non-announcement effects and standard edit metadata are retained. No library patch or CSP relaxation.
- Added bounded Unicode byte counting (including split/unpaired surrogates), input transaction filtering and unit tests for insertion/replacement preservation. Pre-worker validation remains pending UH02; this does not prove every browser/IME allocation is bounded.
- Extended startup-validated manifest resource references to allow exact immutable lazy JS/CSS paths without adding Home preloads. Added lazy-resource/defensive-copy assertions.
- Executed frontend type/lint/format checks and 31/31 unit/build tests: pass, including private announcement effects and byte budgets.
- First non-clean full Maven verify before new editor MVC tests: pass, 17 packaged cases; existing Java checks pass with four explicit skips. Log `/tmp/opencode/f05-editor-verify.log` was subsequently overwritten by the next run; no retained first-run log claimed.
- Second non-clean Maven verify with the four new editor MVC cases: 190 Java cases, two locale failures, four existing skips. EN rendering and synthetic message/nonce escaping passed. Packaged tests did not run in this attempt. Log `/tmp/opencode/f05-editor-verify.log`.

### Current blocker

The new MVC test uses `.param("lang", locale)`. `PreferenceLocaleResolver` intentionally reads `request.getQueryString()` rather than servlet parameters, so that request resolves English for the ES/FR cases. Use actual `?lang=es/fr` request URLs in the test and rerun; no production locale change is necessary. Correction not applied pending guidance under the apply error guardrail.

Browser tests for keyboard/private search/axe/no-JS/input limits/Home isolation are authored but unexecuted. Tooltip/resize, cross-engine proof, actual AT/zoom/copy review, worker lifecycle and clean integration remain pending. Checklist stays 1/15; tasks 1.2–1.4 are not marked complete on partial evidence. AC01/AC02 remain unverified. No commit, push, acceptance, sync or archive. Actual owner effort unreported.

## Query correction and first browser run

Owner authorised the test-only correction: MVC requests now use actual query URLs. Executed `python scripts/verify-java-baseline.py`: frontend 31/31 tests, 190 Java cases with four explicit skips, 17/17 packaged cases pass. Retained log: `/tmp/opencode/f05-editor-query-verify.log`.

Executed `python scripts/verify-home-browser.py` with installed pinned Chromium: 50/54 cases pass. Existing 46 cases, three new EN/ES/FR JavaScript-disabled explanations and Home/proof-route isolation pass. Four JS-enabled editor cases fail waiting for enhancement; subsequent keyboard/announcement/axe/limit assertions do not execute. Retained log: `/tmp/opencode/f05-editor-browser.log`, traces/screenshots under `target/browser-results/`.

Trace confirms Vite's dynamic import/preload helper requests `/static/assets/editor-workspace-*.js` and `.css`; the server publishes generated resources at `/assets/` (stripping the classpath `static/` prefix). The JS is denied with 403; stylesheet is rejected for non-CSS error-response MIME. This is a generated public-URL mismatch, not evidence that CodeMirror violates CSP.

Recommended minimal correction: configure Vite's built-URL mapping to strip the packaging-only `static/` prefix for lazy JS/CSS and future worker references, retain private manifest paths unchanged, and add a build regression before rerunning the same browser checks. No broad server allowlist, CSP or MIME relaxation. Not applied pending guidance under the error guardrail. Checklist remains 1/15; runtime editor acceptance/three-engine/manual/worker proof pending.

## Built-URL correction and task 1.2 completion

Owner authorised Vite's public-URL correction. Added `experimental.renderBuiltUrl` stripping only the packaging `static/` prefix; private manifest/resource paths remain unchanged. Expanded pinned Vite build regression to check worker and lazy JS/CSS public references. No CSP/server route/MIME exemption.

Executed non-clean `python scripts/verify-java-baseline.py`: frontend checks/31 tests, 190 Java cases/four explicit skips and 17 packaged cases pass. Log `/tmp/opencode/f05-editor-url-verify.log`. Executed same Chromium runner: 51/54 cases pass; editor enhancement now loads in EN/ES/FR, Unicode insertion-limit case passes, and no-JS/Home isolation regressions still pass. Normal-JAR digest check completes during runner cleanup. Direct ZIP verification also confirms normal-JAR fixture exclusion and original B bytes.

Task 1.2 complete: reusable wrapper/selective enhancement, isolated SSR proof, Java/asset tests and delivery instructions exist; proof-route denial, fixture exclusion, digest/logo, cold Home isolation and three-locale no-JS explanation verified. This does not complete task 1.3's keyboard/axe or task 1.4's full browser/programmatic/pre-worker budget proof.

Three search cases fail only at expected announcement line number: test presses Enter and then next before expecting line 2, but the observed result is localised line 1 after wraparound. Built-in search may initialise from the word at the current selection; query filling/Enter/next sequencing must be made explicit. Observed announcement contains no excerpt; keyboard/axe/policy assertions later in those cases do not execute. Recommended test-only correction: assert each search step and selected line, including wraparound and excerpt absence, rather than claiming the wrong match. Not applied pending guidance under the error guardrail. Checklist 2/15; three-engine/manual/worker/final acceptance remain pending.

## Committed search query and keyboard failure

Owner authorised explicit search-sequence checks, then requested continuation after interruption. The first attempted correction still failed: `fill()` emits input but CodeMirror's panel commits query on change/keyup, so Enter's keydown ran against the old query. This corrects the earlier wraparound-only diagnosis. Log `/tmp/opencode/f05-editor-search-browser.log`; 51/54 passed.

The test now blurs the filled query before clicking next, asserts matches on lines 1 and 2, then wraparound to line 1 and excerpt absence at each step. Rerun `/tmp/opencode/f05-editor-committed-search-browser.log`: 51/54 passed. All three locales pass search navigation, generic line-number announcements, no sentinel in live-region text and search-panel Escape returning focus to the editor.

They now fail the subsequent Escape-then-Tab exit check with the matched text selected. Pinned `@codemirror/commands` `simplifySelection` returns true for non-empty selection; the default Escape keymap therefore prevents the later core Escape handler from enabling two-second Tab-focus mode. This is an actual wrapper keyboard-contract failure, not a test expectation to weaken. Axe/final policy assertions after this check remain unexecuted.

Recommended minimal fix: insert an explicit editor Escape binding after search-closing bindings and before default editing bindings, invoking public `EditorView.setTabFocusMode(2000)`; preserve first Escape closing search. Retain the unchanged exit/reverse-traversal checks. No new dependency/CSP relaxation or scope reduction. Fix not applied pending error-rule guidance. Checklist remains 2/15.

## Escape fix — task 1.3 complete

Owner authorised the minimal wrapper fix. Added explicit Escape binding after search bindings, before default editing bindings; calls public `setTabFocusMode(2000)` and handles the key. Search closing remains first; selected text no longer prevents Tab-focus mode.

Executed `python scripts/verify-java-baseline.py`: frontend checks/31 tests, 190 Java cases with four explicit skips, 17 packaged cases pass. Log `/tmp/opencode/f05-editor-escape-verify.log`.

Executed `python scripts/verify-home-browser.py`: 54/54 pinned Chromium cases pass, including all three locales' next-match/wraparound, resource-backed no-excerpt announcements, search Escape returning to editor, Escape-then-Tab exit with selected text, reverse traversal, axe (no violations) and recorded normal-operation CSP violations (none). Unicode paste/typing preservation, no-JS explanation and Home isolation cases pass too. Log `/tmp/opencode/f05-editor-escape-browser.log`.

Task 1.3 complete; checklist 3/15. This does not establish manual screen-reader/browser-UI zoom/copy acceptance, Firefox/WebKit or tooltip/resize coverage, programmatic/pre-worker budget proof, worker lifecycle or final clean integration. No policy relaxation, commit, push, sync or archive. Actual owner effort unreported. Earlier pause sections are historical.

## Input boundary — task 1.4 complete

Added shared `postWorkerInput` guard at the real worker posting boundary. Exact-budget Unicode posts with identity/operation; one-byte-over ASCII/multibyte input is rejected before `postMessage`/structured cloning. Three focused tests use a small fake worker. The future lifecycle manager must call this guard; actual worker execution/CSP/timeout is not claimed by these boundary tests.

Added real-browser programmatic API proof through the built workspace module, with no production test globals: exact-budget emoji replacement succeeds, one-byte-over replacement fails and preserves content/status; XSS-looking text remains inert; disposal is idempotent and rejects later replacements. Existing typing/paste preservation cases remain passing. Documented the guard and allocation caveats in delivery instructions.

Executed non-clean Maven verify: frontend checks and 34 tests, 190 Java cases/four explicit skips, 17 packaged cases pass. Log `/tmp/opencode/f05-editor-budget-verify.log`. Executed pinned Chromium: 55/55 cases pass, including new programmatic boundary/disposal and existing keyboard/private-search/axe/policy checks. Log `/tmp/opencode/f05-editor-budget-browser.log`.

Task 1.4 complete; checklist 4/15. Three-engine tooltip/resize proof, actual manual review, lifecycle integration and final clean acceptance remain pending.

## Tooltip/resize and first Firefox proof — task 1.5 partial

Added CodeMirror help hover tooltip using existing resource-backed keyboard instructions only. Instructions also remain accessible through the described paragraph without hovering. No payload text is used in tooltip content. Scoped shared-token styling constrains tooltip width.

Added critical selection/scroll/tooltip/narrow resize/fresh-nonce test, observing requests from initial load and checking same-origin GETs, generated asset MIME/cache/bytes and no policy violations. Added Firefox/WebKit editor-only projects plus explicit runner `--engine`; default full suite and screenshots remain Chromium, manual Chrome unchanged. Install targets selected pinned project-local engine; local privileged dependencies remain disallowed.

Executed non-clean Maven verify: frontend checks/34 tests, 190 Java cases/four explicit skips and 17 packaged cases pass. Log `/tmp/opencode/f05-editor-tooltip-verify.log`. Chromium full suite 56/56 passes, including new selection/scroll/tooltip placement after 375px resize/fresh nonce/lazy MIME/immutable cache/exact byte assertions. Log `/tmp/opencode/f05-editor-tooltip-chromium.log`.

Executed `python scripts/verify-home-browser.py --engine firefox --install`: downloaded Firefox 157.0, Playwright build 1555 project-locally; Ubuntu 24.04 fallback on unsupported local OS, no sudo/system changes. Firefox 9/10 passes: three-locale keyboard/search/axe/no-JS, Home isolation, real programmatic input/disposal and selection/scroll/tooltip/resize/nonce/assets/CSP proof. Synthetic paste/typing case fails at missing limit status.

Focused Firefox reproduction confirms `DataTransfer` contains 524,288 characters but the constructed `ClipboardEvent.clipboardData` exposes zero; no text is inserted, so typing one character cannot exceed the budget. Diagnostic log at `target/firefox-paste-diagnostic.log`; browser failure log `/tmp/opencode/f05-editor-firefox.log`. No production budget bypass established.

Recommended minimal test-only correction: attach the intended read-only clipboardData property explicitly to the synthetic paste event for all engines, preserving the same paste/typing/boundary assertions. This remains simulated paste, not a claim of native OS clipboard acceptance. Not applied pending error-rule guidance. WebKit not yet run; task 1.5 remains unchecked, task 1.6/manual and dependent worker work pending. Checklist 4/15.

## Portable synthetic paste correction and WebKit launch blocker

Owner explicitly authorised correcting the test simulation rather than omitting Firefox coverage. Both synthetic paste events now have the intended read-only clipboardData property attached explicitly; production code and all existing limit assertions are unchanged. No browser-specific skip or relaxed boundary.

Executed Firefox critical suite: 10/10 passes, including synthetic paste/typing, exact/over-budget programmatic updates, keyboard/search/private announcements/axe, tooltip/resize/selection/scroll/nonce/assets/CSP. Log `/tmp/opencode/f05-editor-firefox-paste-fixed.log`. Executed Chromium full suite: 56/56 passes. Log `/tmp/opencode/f05-editor-chromium-paste-fixed.log`.

Executed `python scripts/verify-home-browser.py --engine webkit --install`: project-local fallback browser downloaded, but every case errors before browser launch because required host libraries are absent (reported libicu74, libxml2 and libflite1). No WebKit assertions execute; the 10 launch failures are infrastructure errors, not observed editor failures. Log `/tmp/opencode/f05-editor-webkit.log`. No sudo, system package install or OS modification.

Recommended next action: run required WebKit smoke in the existing supported Ubuntu CI environment using the existing CI-only dependency-install path, rather than install Ubuntu packages on the local unsupported distribution. Workflow change/remote run not performed during this pause. Task 1.5 remains unchecked until actual passing three-engine evidence; manual task 1.6 and dependent lifecycle remain pending. Checklist 4/15.

## WebKit CI step prepared

Owner authorised adding required WebKit smoke to the existing Ubuntu workflow. Added one step after full Chromium: `python3 scripts/verify-home-browser.py --engine webkit --install --with-deps`. Existing runner, Ubuntu 24.04 host, action pins, permissions, checkout restrictions and timeout are preserved. The runner restricts OS dependency installs to CI.

No commit/push/remote workflow invocation or local privileged install performed. This is configured coverage, not passing WebKit evidence. Checklist remains 4/15; task 1.5 stays open until actual supported-environment results and manual/dependent work remains pending.

Executed local checks: workflow YAML parsing/configuration assertions, runner rejection of `--with-deps` with CI false, planning integrity and whitespace all pass. actionlint is unavailable; no actionlint result claimed. Remote WebKit execution remains blocked on later authorised delivery.

## Owner review and authorised draft delivery — 2026-10-15

- Prepared the existing isolated fixture from the packaged JAR, verified the normal JAR SHA-256 is unchanged, and started it on loopback port 8081 with the local profile. Editor GET returned HTTP 200.
- Presented manual keyboard/search, actual browser-UI 200% zoom, EN/ES/FR review and optional screen-reader checks. Owner response: “i see everything working propperly as you said, approved”. Record this as the owner's reported successful review and approval, not independently observed individual test steps.
- Browser/version, viewport, review OS and screen-reader use/version/results were not explicitly reported. In particular, the optional screen-reader request does not establish that assistive-technology checks were performed. Task 1.6 remains open pending the required details and actual AT observations; no acceptance exemption or fabricated result.
- Owner authorised committing the current F05 slice, pushing its feature branch and opening a draft PR to execute WebKit smoke in supported Ubuntu CI. No merge, release, system changes, CSP relaxation, story closure, archive or spec synchronisation is authorised by that delivery approval.
- Fresh non-clean `python scripts/verify-java-baseline.py` passed frontend checks/34 tests, 190 Java cases with four explicit skips and 17 packaged cases. Full pinned Chromium passed 56/56; Firefox critical smoke passed 10/10. Logs: `/tmp/opencode/f05-approved-delivery-maven.log`, `/tmp/opencode/f05-approved-delivery-chromium.log` and `/tmp/opencode/f05-approved-delivery-firefox.log`.
- Executable startup/health smoke passed (HTTP 200, UP); log `/tmp/opencode/f05-approved-delivery-smoke.log`. Both planning renderers ran; planning integrity, 15 planning-rule tests, strict OpenSpec validation (six items) and whitespace checks passed. Scoped source/test diff review found no material issue; no claim of complete F05 integration review.
- Tasks 1.5/1.6 and dependent worker work remain open; checklist stays 4/15 until the required evidence exists.

## Draft PR CI result — 2026-10-15

- Created and pushed implementation commit `db0f06c0a5d09e4b6b2d527ee0d28c0f02f7f2fb`; branch also retains Chromium correction `750e959`. Opened draft [PR #5](https://github.com/ziuld/beneath-the-code-page/pull/5) with owner approval. No merge or release.
- [Java baseline run 38738672625](https://github.com/ziuld/beneath-the-code-page/actions/runs/38738672625) passed Java/architecture verification, executable health smoke and canonical planning. The browser workflow's separate clean Maven build also passed.
- [Browser run 38738672614](https://github.com/ziuld/beneath-the-code-page/actions/runs/38738672614) failed Chromium: 55/56 passed. The selection/scroll/tooltip/resize test failed at `tests/e2e/editor.spec.mjs:159`: immediate `scrollTop > 0` assertion observed zero after Control+End. Subsequent tooltip/resize/nonce/resource assertions in that case did not execute. WebKit step was skipped because Chromium failed; no WebKit result exists.
- Pinned CodeMirror view schedules measurement using `requestAnimationFrame` (`requestMeasure`, dist/index.js:8367–8369) and applies the pending scroll in measurement (line 8258). The test's text-content assertion can succeed before this scheduled scroll. This supports a timing-race hypothesis, not a confirmed production scrolling failure or a passing CI result.
- Recommended minimal test-only correction: use Playwright `expect.poll` for the unchanged positive scroll condition rather than one immediate DOM read. Preserve all selection/tooltip/resize/CSP/resource assertions, normal assertion timeout and zero test retries; no sleeps, policy bypass or production change. Not applied pending guidance under the apply error guardrail.
- CI logs retained at `/tmp/opencode/f05-pr5-browser-ci-failed.log`; watch summary at `/tmp/opencode/f05-pr5-ci-watch.log`. Task 1.5 remains open and checklist stays 4/15. Delivery-result bookkeeping is local and uncommitted; no extra commit/push inferred from the failed run.

## Approved scroll assertion correction — 2026-10-15

- Owner authorised the proposed test-only correction, local verification, commit and push to the existing draft PR.
- Replaced the single immediate scrollTop read with `await expect.poll(...).toBeGreaterThan(0)`. The positive-scroll condition, all other assertions, default assertion timeout and zero test retries are unchanged. No production/CSP/system change or fixed sleep.
- Executed full pinned Chromium: 56/56 pass; Firefox critical smoke: 10/10 pass. Logs: `/tmp/opencode/f05-scroll-poll-chromium.log` and `/tmp/opencode/f05-scroll-poll-firefox.log`. Existing packaged JAR used; no new Maven run claimed for this test-only edit.
- Supported Ubuntu CI must still rerun Chromium and execute WebKit before task 1.5 can close. Required explicit AT/manual environment evidence remains outstanding; checklist 4/15, dependent worker work pending.

## Scroll correction CI and actual WebKit failures — 2026-10-15

- Committed approved correction and preceding delivery-result records in `9780a763c9b5384ddd4006c87d3e240f00724750`, pushed to draft PR #5. No merge or release.
- [Java run 38739467192](https://github.com/ziuld/beneath-the-code-page/actions/runs/38739467192) passed. [Browser run 38739466295](https://github.com/ziuld/beneath-the-code-page/actions/runs/38739466295) passed clean Maven (34 frontend tests, 190 Java cases/four skips, 17 packaged cases) and all 56 Chromium cases, including corrected scroll/CSP/tooltip/resize proof.
- Required WebKit smoke now launches on supported Ubuntu and executes: 6/10 pass, four fail. Three EN/ES/FR keyboard/search cases reach axe and report serious color-contrast failure on the fixture Continue button: white text (#ffffff) against native #c0c0c0 background, 1.81:1 instead of 4.5:1. Final policy assertions after axe do not execute in those three cases.
- WebKit selection/scroll/help-tooltip/narrow-resize assertions pass, then the policy assertion at `tests/e2e/editor.spec.mjs:175` detects one `style-src-attr` violation with blocked resource `inline`. Later resource/header/cache/byte and fresh-document nonce assertions do not execute. The log does not identify the originating DOM write; no confirmed CodeMirror root cause or policy exception is claimed.
- WebKit no-JS explanations (three locales), synthetic paste/typing budget, Home/proof-route isolation and programmatic byte-boundary/inert-content/disposal cases pass. This is partial evidence, not an engine acceptance pass.
- Pause under task 1.5's compatibility/error guardrail. Recommended next scope: diagnose the blocked inline style and reuse approved shared button styling for contrast, preserving CSP and all accessibility/policy assertions. Any actual policy relaxation requires explicit artifact/ADR approval; none is proposed or applied now.
- Full CI log `/tmp/opencode/f05-pr5-scroll-poll-ci-full.log`, failed step log `/tmp/opencode/f05-pr5-scroll-poll-ci-failed.log`, watch summary `/tmp/opencode/f05-pr5-scroll-poll-ci-watch.log`. Checklist remains 4/15; task 1.6/worker/final evidence outstanding. This post-run bookkeeping remains uncommitted.

## Approved WebKit investigation — local changes, 2026-10-15

- Owner authorised diagnosing/fixing both WebKit failures while preserving the CSP and accessibility requirements. No additional commit/push was requested in that approval; work remains local.
- Confirmed contrast cause in source: the editor fragment rendered a plain native Continue button rather than the existing BTC button component. Reused `fragments/components :: button('action.continue', false)`, preserving resource-backed text, type=button and keyboard order while applying approved shared colours. EN/ES/FR MVC rendering tests now require the shared button class/type. Actual WebKit contrast re-verification remains pending.
- Existing remote violation data contains only directive/resource; GitHub reports zero retained artifacts for browser run 38739466295. No trace/source location is available from that run. Pinned CodeMirror has CSSOM writes, but this alone does not identify the failing write; no speculative library patch, global interception or policy exemption applied.
- Extended test-only policy event records with source file/line/column and operation phase (initial enhancement, selection/scroll, help tooltip, narrow resize). Phase reflects event delivery, not a guaranteed originating-call timestamp. No content samples are captured. Existing empty-violations assertions and all other checks are unchanged. This is diagnostic preparation, not a fix or passing WebKit result.
- Executed non-clean Maven verification: frontend checks/34 tests, 190 Java cases with four explicit skips and 17 packaged cases pass. Full pinned Chromium 56/56 and Firefox critical smoke 10/10 pass. Logs: `/tmp/opencode/f05-webkit-diagnostics-maven.log`, `/tmp/opencode/f05-webkit-diagnostics-chromium.log`, `/tmp/opencode/f05-webkit-diagnostics-firefox.log`.
- Local WebKit remains unavailable due to previously confirmed missing host libraries; no repeated failing launch or system install. Next action requires authorisation to commit/push this contrast correction and diagnostic instrumentation to the existing draft PR, then inspect actual supported-environment WebKit output. Task 1.5/1.6 remain open; checklist 4/15, worker work pending.

## Diagnostic delivery approval — 2026-10-15

Owner approved committing/pushing the locally verified shared-button correction, CSP diagnostics and related evidence/tracking to draft PR #5 for another WebKit CI run. This authorises delivery, not a WebKit pass, further fixes, merge/release, policy relaxation or feature acceptance. Actual results follow after execution.

## Button/diagnostics delivery result — 2026-10-15

- Committed the authorised button correction, CSP diagnostics and related records as `65ce664e449e3235b9842a36c49bb672634f6a09`, pushed to draft PR #5. No merge/release.
- [Java run 38741818288](https://github.com/ziuld/beneath-the-code-page/actions/runs/38741818288) passes. [Browser run 38741818319](https://github.com/ziuld/beneath-the-code-page/actions/runs/38741818319) passes clean Maven and Chromium 56/56. WebKit 27.2 / Playwright build 2370 executes 6/10 pass, four fail.
- The EN/ES/FR keyboard/search cases now pass axe with no accessibility violations, confirming the shared-button contrast correction in WebKit. They subsequently fail the unchanged empty-CSP-violations assertion. Selection/scroll/help-tooltip/narrow-resize also pass before the same CSP assertion fails. Later resource/cache/bytes/fresh-nonce assertions in that case remain unexecuted.
- All four CSP reports contain `style-src-attr`, blocked resource `inline`, empty sourceFile, lineNumber 23 and columnNumber 1. The phase-enabled case reports `initial enhancement`, not tooltip/resize. The log does not identify a script write or establish CodeMirror as the source.
- Inspected fresh packaged fixture HTML using the existing local copied-JAR runner: line 23 is `<select id="interface-language" name="language">` in the shared shell, with no authored style attribute. This is a diagnostic clue only: event line attribution and browser-generated styles need isolation before assigning a cause. No payload sample, browser patch, library patch, CSP relaxation or assertion filtering added.
- Full CI log: `/tmp/opencode/f05-pr5-button-diagnostics-ci-full.log`; watch summary: `/tmp/opencode/f05-pr5-button-diagnostics-ci-watch.log`; local HTML-inspection server log: `/tmp/opencode/f05-csp-html-location.log`. The copied fixture process was stopped and the copied JAR removed by the diagnostic runner.
- Pause after failed CI under apply guardrail. Recommended next scope: isolate initial-load CSP on real Home/shared shell versus editor enhancement under unchanged response policy, then fix only a confirmed cause. Further code changes/commit/push require guidance. Checklist remains 4/15; required AT/manual details and worker/final work pending. Post-run bookkeeping remains uncommitted.

## Approved initial-load isolation — local verification, 2026-10-15

- Owner authorised isolating the shared shell versus editor under unchanged CSP. Added three initial-load cases in `tests/e2e/editor-csp-isolation.spec.mjs`: actual production Home, existing script-free shared-shell fixture and existing enhanced editor fixture. Each test uses a fresh browser context, installs the policy listener before navigation, validates the restrictive response header and asserts no policy violations after initial rendering/measurement. No production code, response headers, route interception, event filtering or existing assertions changed.
- Cases record only engine/page identity, script URL paths and policy source metadata, not HTML, cookies, nonces or content samples. The shared-shell case additionally requires zero script requests; Home must not load editor chunks. Initial rendering observation uses animation frames, not arbitrary sleeps or test retries. Passing initial-load cases alone do not replace the existing interaction proof or establish all later events are absent.
- Full pinned Chromium 59/59 and Firefox critical suite 13/13 pass. In both engines Home requests only the site script, shared shell requests no script and editor requests site plus editor-workspace scripts. All three fresh initial-load observations have empty violation lists. Logs: `/tmp/opencode/f05-csp-isolation-chromium.log` and `/tmp/opencode/f05-csp-isolation-firefox.log`.
- Existing packaged JAR used; no Maven rerun claimed for this test-only change. Actual WebKit isolation cannot execute locally due to missing host libraries. Need authorisation to commit/push these tests and related evidence to draft PR #5 and inspect supported Ubuntu results. Root cause remains unconfirmed; no speculative fix or CSP relaxation. Checklist 4/15, tasks 1.5/1.6 and worker/final work remain open. Changes uncommitted.

Owner subsequently approved committing/pushing these three initial-load tests and related evidence/tracking to draft PR #5 for Ubuntu WebKit comparison. No further fix, CSP change, merge/release or acceptance is authorised by this delivery approval.

## Initial-load isolation CI result — 2026-10-15

- Committed and pushed authorised tests/records as `bf8007df50af4ee617da25bcedb4a30e3dac3314` to draft PR #5, not merged.
- [Java run 38743541537](https://github.com/ziuld/beneath-the-code-page/actions/runs/38743541537) passes. [Browser run 38743541682](https://github.com/ziuld/beneath-the-code-page/actions/runs/38743541682) passes clean Maven and all 59 Chromium cases. Required WebKit executes 13 cases: six pass, seven fail (three newly added initial-load diagnostics plus four existing policy checks). This increased failure count reflects added coverage, not seven newly introduced production regressions.
- WebKit Home reports one `style-src-attr`/`inline` violation, empty sourceFile, line 31/column 1; script requests contain only the site entry, no editor chunk. Script-free shared-shell fixture reports the same violation at line 28/column 1 and zero script requests. Editor fixture reports the same at line 23/column 1 with site/editor chunks. No editor interaction is required. EN/ES/FR axe still passes before existing policy assertions fail.
- Fresh local rendered-HTML inspection confirms the reported lines for all three paths exactly match `<select id="interface-language" name="language">`: Home 31, shared shell 28, editor 23. No authored inline style appears on that element. Inspection used the existing copied-JAR runner and stopped its child/removed its copied JAR afterwards; server log `/tmp/opencode/f05-isolation-html-location.log`.
- Confirmed boundary: editor enhancement and application scripts are not required to reproduce the WebKit failure. The shared native language-selector rendering path is implicated; a browser-internal defect, exact style write or safe correction is not yet proven. Do not patch CodeMirror, remove the selector, filter the event or relax CSP on this evidence.
- Pause after failed CI. Recommended next authorised scope: narrow the native selector rendering/CSS interaction with a minimal reproduction under the existing CSP and then implement only an evidence-backed policy-preserving correction. No further code/commit/push authorised by the delivery approval. Full log `/tmp/opencode/f05-pr5-isolation-ci-full.log`; watcher `/tmp/opencode/f05-pr5-isolation-ci-watch.log`.
- Checklist remains 4/15; task 1.5 still blocked on passing full WebKit proof and task 1.6 on explicit AT/manual observations. Worker/final work pending. This post-run bookkeeping remains uncommitted.

## Continued diagnosis scope and minimal selector comparison — 2026-10-15

- Owner asked to continue and prioritises Chrome/Chromium and Firefox. Explained WebKit's Safari-engine role and that Linux Playwright WebKit is not Safari itself. Owner-approved scope now includes continued debugging/verification and commits/pushes to the existing draft PR without repeated intermediate approval requests; still stop for real design/security/scope decisions. Required WebKit coverage is not waived; no CSP relaxation, check removal, merge/release or acceptance inferred.
- Added one test-only controlled comparison using fresh contexts and intercepted HTML on the existing fixture URL: no-select control, unstyled native select, appearance:none, dark colour scheme and native listbox. Preserve the actual server response CSP/headers; any diagnostic stylesheet uses that response's nonce. All content is static synthetic diagnostic markup, not application output or user payload. No production code or existing acceptance check changed; report every variant before the empty-violation assertion so a failure does not hide remaining observations.
- Local full Chromium 60/60 and Firefox critical suite 14/14 pass. All five controlled variants have empty violation lists in both engines. Logs `/tmp/opencode/f05-minimal-select-chromium.log`, `/tmp/opencode/f05-minimal-select-firefox.log`. Existing packaged JAR used; no Maven rerun for test-only changes. Actual WebKit comparison follows delivery.
- Inspected upstream source against Playwright v1.64.0's declared WebKit base revision (`56453fdfe0b0ca6258c23e6453b34f70b885d13f`); current WebKit main differs, so its inline-style implementation is not treated as proof of the pinned engine's root cause. No dependency/browser patch or speculative CSS change applied.

## Minimal native-select CI result and browser-gate decision — 2026-10-15

- Authorised diagnostic slice committed/pushed as `e5e62bd6c888ff7a3ece553a8959f464491c7256` to draft PR #5, not merged. [Java run 38745556539](https://github.com/ziuld/beneath-the-code-page/actions/runs/38745556539) passes. [Browser run 38745556636](https://github.com/ziuld/beneath-the-code-page/actions/runs/38745556636) passes clean Maven (34 frontend tests, 190 Java cases/four skips, 17 packaged) and Chromium 60/60. Latest local Firefox is 14/14, not remote Firefox evidence.
- Required WebKit executes 14 cases: six pass, eight fail (the five-case minimal comparison is one additional test, alongside the three prior initial-load and four original policy failures). Controlled no-select document has no violations. Every select variant reports the same `style-src-attr`/`inline` event: unstyled native dropdown, appearance:none, dark colour scheme and native listbox. Documents contain no app/editor script or authored style attribute. The CSS variants use permitted nonce-backed style tags under the unchanged server policy.
- This confirms an incompatibility in the pinned WebKit/browser-tooling environment with a plain native select, independent of the application stylesheet and CodeMirror. It does not identify the exact engine implementation defect or prove identical behaviour in released Safari. No safe application CSS correction was demonstrated; no speculative replacement widget or policy exception applied.
- Checked official npm metadata and [Playwright 1.64.1 release](https://github.com/microsoft/playwright/releases/tag/v1.64.1). Its browser metadata retains WebKit revision 2370/version27.2 (and the same Chromium/Firefox revisions). Listed fixes concern Electron startup and Chromium redirects, not this select/CSP issue. No dependency upgrade performed because it would retain the same WebKit engine, not establish a fix.
- This is now a genuine browser-support/gating decision: retain strict required WebKit acceptance and remain blocked pending a verified engine fix, or explicitly revise the agreed acceptance policy to require Chromium/Firefox while retaining visibly failing advisory WebKit coverage until the incompatibility is resolved. The latter needs owner approval, coherent planning/spec/design updates and an ADR; it cannot be inferred from prioritising Chrome/Firefox. Never label failed tests as passes, remove CSP, filter events or silently waive manual evidence.
- No browser-policy choice made. Task 1.5 remains open under the existing three-engine contract; checklist 4/15, required AT/manual observations and dependent worker/final work pending. Full CI log `/tmp/opencode/f05-pr5-minimal-select-ci-full.log`, watch `/tmp/opencode/f05-pr5-minimal-select-ci-watch.log`. Post-run bookkeeping uncommitted; no external bug report or release published.

## Exact upstream defect and matched tooling correction — 2026-10-15

- Owner requested fixing the problem instead of making WebKit advisory. Found the exact existing [WebKit bug 327212](https://bugs.webkit.org/show_bug.cgi?id=327212), filed 2026-10-12, status NEW when checked: regression 321159@main (`ef67848e58750b33e018150541e1085fd5dedfd9`) applies `text-overflow:inherit` to a detached browser-owned select button slot, before it qualifies for the user-agent-shadow-tree CSP exemption. The report reproduces with `document.createElement('select')` alone in Playwright WebKit27.2 and reports Safari27.0.1 unaffected. This source-level report matches our controlled evidence; Safari observations belong to the upstream reporter, not our tests. No new external report/message created.
- No fixed stable bundle found: Playwright1.64.1 retains WebKit2370/27.2. Official Playwright1.63.0 metadata bundles pre-regression WebKit26.6/build2359 with Chromium153.0.8010.12/build1243 and Firefox155/build1543. Explained that a matched test-tooling pin changes all three reference versions and would need full verification, rather than mixing incompatible browser/protocol versions or claiming WebKit27.2 fixed.
- Temporarily changed exact browser-test tooling pin from1.64.0 to1.63.0 and regenerated/deduplicated its integrity-bearing lockfile: @playwright/test, playwright and playwright-core all1.63.0, axe unchanged. No application dependencies, CSP, native controls, assertion/timeout/retry settings or engine requirements changed. `npm audit --package-lock-only` reports zero vulnerabilities; this is package advisory metadata, not proof that older browser binaries are current security releases.
- Executed project-local `--install` runners without privileged changes. Chromium153 full suite60/60 and Firefox155 critical suite14/14 pass, including every minimal native-select variant. Logs `/tmp/opencode/f05-pre-regression-chromium.log`, `/tmp/opencode/f05-pre-regression-firefox.log`. Earlier Chromium156/Firefox157 passing evidence remains historical and is not relabelled as these versions' results. Local WebKit host dependencies remain unavailable; no repeated failing install/launch or system changes attempted.
- Added the quality plan's required Firefox critical smoke to the existing Ubuntu browser workflow before the still-required WebKit step. No continue-on-error, skip or CSP exception. All three engine gates must pass. Actual Ubuntu WebKit26.6 proof follows authorised delivery; task1.5 remains open until it passes.
- Documented temporary tooling pin, exact engines and upgrade owner/trigger in `docs/delivery/editor-and-worker-proof.md`: Ziuld with AI assistance reassesses when Playwright bundles the upstream fix, then reruns minimal reproduction and full three-engine gates. No browser-support waiver or architecture change is adopted. Checklist4/15; task1.6 and worker/final evidence remain pending.

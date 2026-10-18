# Evidence — F07-UH01 JSON validation

Date / identity: 2026-10-18; local apply based on `d6455d4`, with pre-existing
uncommitted MVP replan and F07 proposal preserved. Reviewer: OpenCode; owner effort
unreported. Owner authorised F07 commit/push/new draft PR on2026-10-18; no merge,
release or system/dependency changes authorised. Earlier delivery-permission notes
below are historical and superseded by this explicit approval.

## Baseline and scope

F06 is accepted and archived. Its actual final runtime head `ed0e502` passed
Chromium84/Firefox38/WebKit38 and owner review, as recorded in F06 integrated
evidence. This is prerequisite evidence, not a new-code F07 pass.

Read all apply context files and the canonical F07 requirements/scenarios/tasks;
checked current source, nearby tests and exact route/security/locale/asset seams.
OpenSpec reports ready, spec-driven, initially 0/14. Work is bounded to Validator
and the shared JSON seam first. Minifier, catalogue promotion and acceptance are
not claimed. No automatic behavioural ownership migration or V2 work.

## Executed results

### Authorised bounded fixture correction and testing policy

Owner approved non-cacheable injected failures, then explicitly asked to prioritise
important MVP tests, use a75% rather than100% coverage target and leave troublesome
WebKit checks documented as TODO/pending if they delay delivery. ADR008 records
this narrow verification-policy decision; production behaviour/CSP/budgets remain
unchanged. No instrumented coverage percentage is claimed or new framework added.

Changed only two test fixtures: failed lazy module now receives HTTP503/no-store;
substituted busy-worker body now has no-store while retaining the real response's
CSP. All same-context reload, same-page retry, deadline and exact source assertions
remain. Pending-test register records the current four-case follow-up. No test is
deferred yet; first verify this one bounded correction through the existing CI.
No runtime change after tested0ca9f94; no redundant local Maven build required for
test-only fixture edits. Actual corrected browser result is not yet claimed.

### Actual Ubuntu CI result — WebKit recovery-fixture pause

At exact head`0ca9f940c60412341c68b6f46c82fb979cf90145`, Java baseline
run39113573326 **SUCCEEDS**. Browser run39113573357 completes with clean Maven,
**Chromium94/94 and Firefox48/48 passing**, but **WebKit44/48, four failures**.
These are actual supported-Ubuntu results, not the local missing-library limitation.
Logs `/tmp/opencode/f07-validator-ci-browser.log` and
`/tmp/opencode/f07-validator-ci-browser-failed.log` fetched from the completed run.

Failure details:
- EN/ES/FR no-JS/lazy/worker-failure cases reach line187 after an intentionally
  aborted lazy-script request, unroute and page reload. Readiness stays false.
  Subsequent worker-load failure/retry assertions are not reached in those cases.
- Bounds/deadline case reaches line234, after full-source equality at1MiB/depth128
  and the injected busy worker's expected timeout. The post-unroute retry still
  times out instead of validating. Its expected successful retry is **not passed**.
- All existing F06/foundation WebKit tests and ordinary Validator correctness,
  privacy/CSP/diagnostics/rejected-edit/Clear/Back locale cases pass.

Shared persistent failure after intercepted immutable assets suggests cache
contamination by injected faults; this is a **hypothesis, not a proved cause**.
Proposed test-only correction: serve a deliberately failed lazy-script response
with `Cache-Control: no-store`, and make only the substituted busy-worker response
non-cacheable while retaining its original CSP. Retain all current failure,
same-context reload, same-page retry and exact source-preservation assertions.
Do not weaken production immutable asset headers, CSP, deadlines, retries or
coverage; no new runtime dependency or application fix is proposed without evidence.

Paused under the functional-error rule before any correction. Checklist4/14;
task1.4/publication/UH01 closure blocked, owner review retained and Minifier unstarted.
Draft PR7 remains open at0ca9f94; no additional push, merge or release performed.
Delivery-result bookkeeping remains local until a scoped follow-up is authorised.

### Draft delivered — 2026-10-18

Committed/pushed `0ca9f940c60412341c68b6f46c82fb979cf90145` on
`feature/F07-json-validator-and-minifier`, based on merged `origin/main`8de4639.
Authorised scope includes the existing MVP replan/proposal and reviewed Validator
slice. Draft PR#7: https://github.com/ziuld/beneath-the-code-page/pull/7.
Confirmed actual workflows at that exact head are in progress:
- Java baseline run39113573326.
- Packaged Home browser run39113573357 (clean build and three required engines).

Watchers are running; no new-code WebKit pass inferred from configured/running CI.
Checklist4/14;1.4, catalogue publication and UH01 closure pending. Bookkeeping after
delivery is local until the next authorised scoped commit. No merge/release or
Minifier work. All earlier no-delivery statements below are historical.

### Draft delivery authorised — 2026-10-18

Owner explicitly approved committing/pushing the Validator slice plus existing MVP
planning changes to a new F07 draft PR for required Ubuntu CI. Fetched `origin/main`
at`8de4639` (the merged F06 PR); its tracked tree matches previous local`d6455d4`
exactly. Created `feature/F07-json-validator-and-minifier` from merged main without
discarding any working-tree changes or altering the old F06 branch. Prepare this
reviewed slice and inspect actual changed-code CI results; no WebKit pass, catalogue
promotion, UH01 closure, merge or release inferred from authorisation alone.

### Owner manual acceptance — 2026-10-18

After being asked to review keyboard navigation, Clear/Back, narrow layout, actual
200% browser zoom and EN/ES/FR on the supplied Validator preview, the owner replied
“it works all”. Record those requested checks as **owner-reported passing manual
acceptance**, not agent-observed measurements or an automated result. No issues
reported. Browser/product version, OS, viewport dimensions and exact launched-build
identity were not supplied by the owner; do not invent them or reuse F06's browser
details. Screen-reader compatibility/manual speech testing remains excluded.

OpenSpec1.5 complete;4/14 overall. Manual review was recorded in parallel with the
outstanding required WebKit gate; it does not complete1.4 or authorise catalogue
publication, canonical UH01 closure or dependent Minifier work. Canonical closure
T05 remains blocked on predecessor verification/publication, not on missing manual
acceptance. Runtime/JAR unchanged since the recorded clean build and browser runs.

The reply reports review results; it does **not** explicitly authorise commit/push
or a new draft PR. Await that scoped authorisation for the required Ubuntu CI path.

### Current continuation — full Chromium passes

Final local result: `python3 scripts/verify-home-browser.py --engine firefox`
**PASSES48/48**, including the ten new Validator cases and controlled timeout/clean
retry. Log `/tmp/opencode/f07-validator-firefox.log`. Both browser runs retain
exact full-document source equality and all F06 regressions. No passing WebKit or
owner review is claimed. Task1.4 remains unchecked;3/14 overall.

Review preview confirmed by actual GETs in EN/ES/FR: HTTP200, expected HTML locale
and Validator markup at `http://127.0.0.1:8082/tools/json-validator?lang=en` (also
`es`/`fr`). Background child started by this apply using the reviewed normal JAR;
log `/tmp/opencode/f07-validator-review.log`. This is a review aid, not evidence
of owner interaction or a production deployment.

Remaining external decisions: authorise committing/pushing the scoped Validator
slice with its existing MVP planning/proposal prerequisites to a new F07 draft PR
for actual required Ubuntu CI, and provide actual owner keyboard/narrow/200%-zoom/
EN-ES-FR observations. Catalogue promotion and canonical closure follow only after
their gates; Minifier remains unstarted. No merge/release or archive requested.

Owner authorised the test-only full-document assertion correction and continuation
through UH01. Replaced only the large-document rendered-DOM comparison with Select
All plus CodeMirror's explicit copy event into a local `DataTransfer`; exact full
source equality remains. No production code, real clipboard access, test limits,
timeouts or CSP changed. Earlier Chromium93/94 pause below is resolved.

`python3 scripts/verify-home-browser.py --engine chromium`: **94/94 pass**, including
both large/deep input equality checks and controlled two-second timeout/clean retry.
Log `/tmp/opencode/f07-validator-chromium-fixed.log`. All existing F06/foundation
regressions and the ten new Validator cases pass. Runtime unchanged since the clean
Maven166/204(three skips)/17 and health pass.

Locked Firefox155/build1543 and WebKit26.6/build2359 restored project-locally;
installer exits successfully but reports WebKit host dependencies still missing
(`libicu74`, `libxml2`, `libflite1`). No system package install or mixed browser
version attempted. Log `/tmp/opencode/f07-browser-install.log`. Firefox verification
is running, not yet claimed passing. Required changed-code Ubuntu WebKit remains
pending through separately authorised delivery; this is not a passing WebKit test.

Read-only GitHub inspection confirms PR#6 is now merged (not merged by this apply).
New F07 work must not be pushed as more work on that completed PR. No F07 commit,
push, PR message or repository setting change has been made. Preview process uses
the reviewed local JAR on loopback8082; startup/HTTP confirmation follows before
presenting it as ready. JAR SHA-256:
`89cc9319e1a5c367de6e9510ab4566861143e2b45066edb7360923120ca8cb9c`.

### Latest result — Chromium preservation-fixture pause

`python3 scripts/verify-home-browser.py --engine chromium --install` completed:
**93/94 pass**, log `/tmp/opencode/f07-validator-chromium.log`. The project-local
locked browser was restored after Maven clean, without system packages or a
dependency/version change. All nine new EN/ES/FR cases pass: real validation/root
types and input preservation for ordinary documents, current verdicts, cancellation/
replacement, safe diagnostics/CRLF/Unicode/EOF, rejected oversized edits retaining
valid or invalid verdicts, Clear/undo/Back, no-JS/lazy/worker failures and retry,
axe, exact traffic/storage/cookie/log/CSP/worker-byte checks. Retained F06 and
foundation cases pass.

The final bounds/deadline case reports a valid verdict for the 1 MiB string, then
fails its `.cm-line` rendered-text equality assertion at line211. CodeMirror's
rendered viewport is not the full large document; this assertion cannot establish
complete input preservation. The subsequent deep-input and controlled deadline/
retry checks in that case were **not reached**, not passed. No runtime correction
or assertion relaxation applied. Firefox/WebKit were not run after this functional
test failure, under the explicit pause rule. Task1.4 remains unchecked,3/14 overall;
canonical F07/UH01/T03 blocked, implementationT02 remains done.

Read-only inspection of the pinned CodeMirror copy handler confirms it obtains
text from `state.sliceDoc` for the selection, then fills the copy event's
`clipboardData`. Proposed test-only correction: select all and dispatch an explicit
copy event with an in-memory `DataTransfer`, then compare **the exact entire
document** against the original source. No real clipboard read, payload global,
new production action, app code change or weaker length-only check is proposed.
Await owner guidance before implementing this fixture correction and rerunning
the suite; routine formatting permission does not cover functional test logic.

Post-build planning integrity, all21 planning-rule tests, strict change validation
and whitespace checks pass. Owner review, all-engine acceptance, catalogue
publication, Minifier and final F07 closure remain pending.

### Current result — build passes; packaged browser verification running

Owner explicitly authorised routine formatting-only corrections while retaining
pauses for functional failures and scope/security decisions. Applied the single
workspace line wrap; no behaviour changed. Earlier style pauses below are resolved.

`python3 scripts/verify-java-baseline.py clean` now **PASSES**:166 frontend tests,
204 Java cases with three explicit architecture skips,17 packaged integration
tests; full types/lint/style checks pass. Log:
`/tmp/opencode/f07-validator-clean-maven.log` (Maven exit0). This includes the new
validation session and SSR/HEAD/locale/CSRF/method/security assertions, existing
Formatter regressions and actual packaged asset/watch checks.

`python3 scripts/smoke-java-baseline.py` completed successfully; log
`/tmp/opencode/f07-validator-health.log`. OpenSpec1.3 complete,3/14 overall. Canonical
implementationT02 done,valid-root/SSR/browser verificationT03 in progress. Neither
canonical verification nor owner acceptance is falsely closed by a passing build.

Added ten packaged browser cases in `editor-json-validator-minifier.spec.mjs`
(Validator only so far): all roots, private lexical input, status invalidation,
diagnostic positions, retained rejected edits, Clear/undo/Back, no-JS/lazy/worker
failure, byte/depth limits, controlled deadline/retry and exact traffic/storage/
cookie/log/CSP/worker-byte checks. Chromium full suite is running via the existing
runner with project-local `--install` after Maven clean; no browser result claimed
until completion. Firefox/WebKit and owner review remain required.

### Latest continuation — workspace prepared, clean build style pause

After owner-approved corrections, the original77 focused tests, full TypeScript,
touched-file ESLint/Prettier and all21 planning tests passed; task1.2 is complete,
2/14 overall. These results apply to the shared-validation slice, not all later
workspace changes.

Prepared task1.3: shared session now accepts validation; workspace reuses lifecycle/
Clear and hides absent output/Copy; Validator has its own insertion-feedback region
so a rejected edit can retain the matching verdict. Added EN/ES/FR page/resources,
shared message fragment, exact controller/security/language-return/safe log mapping,
session tests and MVC assertions. Existing negative route tests now exclude the
still-unimplemented Minifier while positively requiring Validator; catalogue still
lists Formatter only. Updated local usage docs. No Minifier implementation.

Executed `python3 scripts/verify-java-baseline.py clean`, log
`/tmp/opencode/f07-validator-clean-maven.log`: **FAIL at frontend style gate**.
Project-local pinned tools/dependencies restored after clean; full TypeScript and
ESLint pass. Prettier reports only `tools/json/formatter-workspace.ts`: the editor
feedback query needs a three-line wrap. Read-only formatter comparison confirms
this is the sole difference. No formatting correction applied under the explicit
stop-on-error workflow. New unit tests, Java/MVC, packaging, health and browsers
were not reached; task1.3 remains unchecked. The npm update notice is not the cause
and no global/version update was made.

Next proposal: permit this formatting-only correction and rerun clean verification.
To avoid repeated pauses on style-only differences, the owner can explicitly
authorise routine formatting corrections while retaining stops for functional
failures, security/scope changes and genuine blockers. No such waiver is assumed.

### Earlier shared-validation checks and resolved pause

Resumed after owner approval of the formatting and isolated test-fixture corrections:
77 focused tests, full TypeScript, touched-file ESLint/Prettier and all21 planning
rule tests now pass. The planning regression constructs its explicit initial
state instead of assuming live F07 progress never changes. All original assertions
remain. OpenSpec1.2 complete (2/14); Validator page/session work1.3 next. Earlier
formatting/stale-fixture pause below is historical, not an unresolved failure.

- Baseline `git status --short`: existing changes are planning/guidance/tooling and
  the proposal; no pre-existing application source/test/CI changes.
- CLI root/status/apply checks: local root resolved, all context files present,
  14 unstarted tasks and no blocking schema state.
- Added shared `algorithms/validation.ts` containing the existing strict preflight/
  parser checks; Formatter retains its token-gap writer and calls this helper.
  Added explicit `json-validate` dispatch with an empty success acknowledgement.
  Added focused validation/protocol fixtures and `docs/delivery/json-validation.md`.
- Executed with project-local Node/Vitest from `src/main/frontend`:
  `../../../target/frontend-tooling/node/node node_modules/vitest/vitest.mjs run tools/json/algorithms/formatter.test.ts tools/json/algorithms/validation.test.ts tools/json/algorithms/position.test.ts tools/json/worker-protocol.test.ts`:
  **77 tests pass in four files**. Log: `/tmp/opencode/f07-validation-focused.log`.
  Cases include all root types, strict syntax failures, Unicode/CRLF/EOF positions,
  exact UTF-8/depth limits, unchanged Formatter goldens and validation succeeding
  when pretty output would exceed its cap.
- Project-local `typescript/bin/tsc --noEmit`: **PASS**.
- Project-local ESLint on the five touched algorithm/protocol source/test files:
  **PASS**.
- Project-local Prettier `--check` on those five files: **FAIL**, formatting only in
  `tools/json/algorithms/formatter.ts` and `tools/json/worker-protocol.test.ts`.
  No formatting correction applied: owner explicitly requires pause on errors.
- Maven, packaged/browser, actual worker runtime and manual acceptance checks:
  **not run**. Validator page/session/SSR integration and Minifier are unstarted.

## Current pause

OpenSpec task 1.1 complete; task 1.2 remains unchecked because its style gate fails.
Canonical F07/UH01/T02 blocked; reading/baseline T01 done with this evidence.
Proposed next action: apply only the project Prettier formatting to the two files,
rerun focused/type/lint/style checks, then continue 1.3 if green. Await owner guidance;
no assertion, dependency, limit or CSP change is proposed or applied.

Tracking verification after recording the pause:
- Both planning renderers ran; planning integrity, strict change validation and
  `git diff --check` pass.
- Planning-rule suite: **20/21 pass**. The generated-view regression test hardcodes
  `F07-UH01-T01` as the next task using live tracking data; this analysis task is now
  genuinely done and T02 blocked, so the renderer correctly reports no unblocked
  V1 task. The assertion is stale, not evidence that the renderer should advertise
  a completed task. No test/validator change applied under the error rule.
- Proposed additional correction: make that test construct its expected initial
  planning state as an isolated fixture, retaining the next-action assertion and
  V2/accepted-work exclusion checks. Await guidance before editing the test.

## Remaining gates

Passing style, clean Maven, real health, Chromium/Firefox/WebKit,
privacy/CSP/history proof and actual owner keyboard/zoom/EN-ES-FR acceptance remain.
No screen-reader compatibility or full WCAG conformance claim. Record actual
commands/results and blockers here as work proceeds.

# Current handoff

Browser workflow correction, 2026-10-14: owner reversed the earlier automated
Google Chrome choice. Automated tests/snapshots now use pinned Playwright Chromium;
owner uses Google Chrome for manual review. Removed optional Chrome channel/selector,
leaving existing CI Chromium workflow unchanged. Historical F04 Chrome evidence and
archived artifacts preserved. Work on `chore/chromium-browser-tests` from merged
origin/main; F05 not started. Owner authorised a local correction commit and asked
to defer pushing it until the next feature; retain it in that feature's branch/PR.
Reproduce: `python scripts/verify-home-browser.py --install` (no --with-deps locally).
Executed that command: 46/46 browser cases passed with Playwright Chromium build
1248 (headless shell 156.0.8078.4). Project-local install only; no sudo/system changes.
Playwright reports Linux unsupported/fallback ubuntu24.04 build; checks passed on
this machine, not a claim of official OS support. Planning integrity and whitespace
checks passed. Log: `/tmp/opencode/chromium-workflow-check.log`.

F04 archived, 2026-10-14: owner requested archive and selected main-spec sync.
Archived complete spec-driven change to
`openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/` (16/16 tasks).
Main `locale-preferences` and `secure-http-responses` specifications created with
verbatim purpose/requirements/scenarios; strict validation passed all five specs.
Evidence links updated. F04 remains accepted/done, implementation commit 3ea174f;
behavioural ownership remains plan-owned, F05 unchanged. Archive/sync/post-commit
closure bookkeeping remains uncommitted; unrelated VS Code work preserved.
No new commit or push authorised. Earlier pre-archive handoffs below historical.

F04 committed closure, 2026-10-14: owner accepted both stories and explicitly
authorised one local F04 commit. Created 3ea174f, excluding unrelated VS Code work.
Recorded real hash on both stories/tasks; F04/UH01/UH02 done against owner acceptance
and final technical evidence. Post-commit closure bookkeeping remains uncommitted,
not silently included in a second commit. No push/archive/spec-sync/migration;
F05 unchanged. Clean build/17 packaged/46 installed Chrome/smoke/logo/fixture
checks passed; four explicit Java skips and ASVS limitations documented. Owner
effort unreported. Earlier failed-closure/approval handoffs below are historical.

Post-commit closure validation passed: planning integrity, 15 rule tests, strict
OpenSpec and whitespace. Checklist 16/16; no remaining technical/acceptance blocker.

F04 accepted, required-commit pause, 2026-10-14: owner explicitly accepted both
stories and authorised tracking closure. Attempted done state failed planning
validator/rule baseline because both stories require real commit references. Restored
accepted/in_review/pending-commit tracking; dependent UH02 canonical closure blocked.
Checklist 3.2/3.3 reopened, progress 14/16. All application technical evidence remains
passing: clean build, 186 Java cases/four skips, 17 packaged, 46 installed Chrome,
smoke/logo/fixture checks. No commit authorised or created; request permission for
one coherent local F04 commit excluding unrelated VS Code work, then record real hash
and finish closure checks. Do not weaken validator or invent commit. No push/archive/
sync/migration; owner effort unreported. Earlier done/acceptance handoffs historical.

F04 accepted and closed, 2026-10-14: owner explicitly accepted both F04 stories and
authorised tracking closure. F04/UH01/UH02/all canonical tasks done; checklist 16/16.
Evidence: both F04 story files and ASVS 5.0.0 mapping with stated partial/deferred
controls. Final checks: clean Maven verify (15 frontend tests, 186 Java cases/four
explicit skips, 17 packaged), 46/46 Google Chrome 152.0.7977.82 browser cases,
startup/health smoke, original B bytes and normal-JAR fixture exclusion passed.
No technical blocker. Owner effort unreported; actual hours not fabricated.
No commit authorised or created; work uncommitted, unrelated VS Code edits preserved.
No push/archive/spec sync/behavioural migration; F05 unchanged and not started.
Reproduce browser: `python scripts/verify-home-browser.py --browser chrome`.
Earlier acceptance-pending and failure handoffs below are historical.

F04 owner-acceptance handoff, 2026-10-14: owner requested installed Google Chrome;
added explicit --browser chrome mode, no browser download/system change. Chrome
152.0.7977.82/Playwright 1.64.0 passes 46/46 post-clean browser cases. Clean Maven
verify passes 15 frontend tests, 186 Java cases (four explicit skips), 17 packaged
cases; baseline startup/health smoke, normal-JAR fixture exclusion and original B
bytes pass. Production CSP unchanged; synthetic accessibility styles nonce-authorised.
ASVS 5.0.0 mapping complete with partial/deferred limitations explicit. Integrated
diff reviewed without material scoped findings. All implementation/technical checks
complete; final owner acceptance of both stories pending (checklist 3.2). No local
commit/push/archive/spec-sync/ownership migration; owner effort unreported. Canonical
feature/UH01 in_review; UH02 retains blocked prerequisite closure rather than falsely
marking UH01 done. Evidence: both F04 story files, `docs/quality/F04-asvs-mapping.md`.
Reproduce browser with `python scripts/verify-home-browser.py --browser chrome`;
logs /tmp/opencode/f04-clean-verify.log, f04-final-chrome.log, f04-smoke.log.
Earlier failure/tooling handoffs below are historical, not current blockers.

Planning renderers/integrity, 15 planning-rule tests, strict OpenSpec and whitespace
checks pass. Checklist progress 15/16; only 3.2 owner acceptance/closure remains.

F04 clean-browser tooling pause, 2026-10-14: nonce-bearing test styles implemented,
production CSP unchanged; browser 46/46 passed. ASVS 5.0.0 map verified against tagged
source with partial/deferred controls explicit. Task 2.7 done; progress 13/16.
Clean Maven verify passed 15 frontend tests, 186 Java cases (four explicit skips),
17 packaged cases. Direct normal-JAR fixture exclusion/original B byte checks and
baseline startup/health smoke passed. Post-clean browser attempt cannot launch:
clean removed project-local target/browser-cache. No browser assertions ran there.
Standard next action: `python scripts/verify-home-browser.py --install` to restore
locked local Chromium/tooling and rerun, without --with-deps/sudo/system changes.
Not run; awaiting guidance under error guardrail. Task 3.1 remains open, owner
integrated acceptance/local commit authorisation pending. Evidence in both F04 files;
clean/smoke/browser logs at /tmp/opencode/f04-*.log. Source/tests pass except missing
browser prerequisite. No sync/archive/migration/push. Earlier pauses historical.

F04 CSP browser-test pause, 2026-10-14: owner agreed to simple simulated/real checks
and requested completion. Fixed-buffer read implemented; zero-length/extra-read
regression added, packaged unfinished-upload test unchanged. Maven verify passes
15 frontend tests, 186 Java cases (four explicit skips), all 17 packaged cases including
unfinished upload/header/log privacy/local watcher. Task 2.6 done; progress 12/16.
Browser run: 31/46 passed, 15 Home/shared keyboard/reflow failures because test-only
CSS zoom/text styles are injected without a CSP nonce. Native preference/forgery
and other cases pass. Recommended next change: nonce-authorise only synthetic styles
using current response nonce; do not relax production CSP/bypass it globally or drop
accessibility checks. Not applied; waiting under failed-check guardrail. ASVS mapping,
clean integration, owner acceptance/closure remain open. Evidence:
`harness/evidence/F04-UH02-secure-http-responses.md`. No commit/push/archive/migration.

F04 confirmed-read pause, 2026-10-14: owner-approved response flush applied;
unchanged unfinished-upload test still times out. Maven: 15 frontend/185 Java cases
pass (four explicit skips), 16/17 packaged pass. Live loopback reproduction/jstack
confirms blocking in readNBytes at PreferenceRequestBoundary.java:55 before rendering.
Pinned Java bytecode: allocating readNBytes(int) performs a final zero-length read;
Tomcat waits for next chunk. Buffer overload stops at requested size. Proposed minimal
next fix: fixed 4097-byte buffer + readNBytes(buffer,0,length), copy accepted bytes;
regression forbids zero-length extra read. Not applied; awaiting guidance under error
guardrail. Retain packaged partial-stream test/timeouts. Header/final-log checks remain
unexecuted. Diagnostic process stopped. Progress 11/16, source compiles/full verify fails.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No acceptance/commit/push/archive/migration.

F04 partial-stream pause, 2026-10-14: owner-authorised controller cycle correction
applied with message-free standard 400 exception/shared advice. Maven verify passes
15 frontend tests and 185 Java cases (four explicit skips), including acyclic packages.
16/17 packaged cases pass, including isolated EN/ES/FR safe 500, fixture exclusion,
normal-JAR digest and local watcher rebuilds. Task 2.5 complete; progress 11/16.
Task 2.6 timeout: unfinished chunked upload waits for 413; preceding declared/chunked
oversize, exact-limit real-token success and media rejection pass. Header-limit/final
boundary-log assertions after the timeout did not execute. Renderer writes but does
not explicitly flush. Proposed next fix: flush completed error responses and rerun
unchanged streaming test; hypothesis not yet verified, no timeout inflation/unbounded
draining. Not applied; awaiting guidance. Source compiles, full verify still fails.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
Integrated acceptance/commit/push/archive/migration remain pending/unperformed.

F04 architecture pause, 2026-10-14: owner-approved redundant CSRF call removed.
Compilation and 15 frontend/64 focused Java checks pass. Prepared packaged HTTP
cases using existing harness, including isolated-only 500 fixture and bounded
stream/header/log checks. Full Maven verify: 15 frontend tests pass; 185 Java cases
with one architecture failure and four explicit skips. Packaged tests did not run.
Cycle introduced by controller renderer dependency: i18n -> security -> i18n.
Recommended minimal next change: invalid-language controller raises a standard
message-free 400 ResponseStatusException, shared MVC advice renders it; remove
direct SafeHttpErrors dependency and null response return. Not applied; awaiting
guidance under error guardrail. Source compiles but architecture gate fails.
Task 2.5/2.6 incomplete, progress 10/16; integrated acceptance remains pending.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit/push/archive/migration; unrelated editor work preserved.

F04 error-slice API pause, 2026-10-14: simple cache test correction applied; Maven
verify passed 15 frontend tests, 162 Java cases (four explicit skips), 15 packaged
cases including successive watcher rebuilds. Task 2.3 done. Preference byte boundary
(2.4) complete; 15 frontend/59 targeted Java tests passed including exact 4096-byte
real-token acceptance, before-CSRF rejection and multiplicity-preserving forms.
Progress 10/16. Error slice 2.5 prepared but compilation fails: CsrfConfigurer has no
accessDeniedHandler method. Pinned bytecode confirms CSRF inherits exceptionHandling's
configured denial handler. Recommended next correction: remove only the redundant
CSRF call, retain shared exceptionHandling handler, rerun focused checks. Not applied;
waiting under error guardrail. Current source does not compile, no error-slice Java
or new packaged/browser result claimed. Canonical UH01 closure/integrated acceptance
remain pending; UH02/F04 blocked. Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit/push/archive/migration. Earlier cache/API handoffs below are historical.

F04 standard-cache test pause, 2026-10-14: owner approved simpler MVC caching.
Removed the custom commit wrapper; exact manifest resource paths now use standard
MVC CacheControl, preserving local no-store. Source compiles. Maven verify passes
15 frontend tests but reports one failure among 162 Java cases (four explicit skips):
cache directives are correct but exact-string assertion expects a different order.
Packaged tests did not run. Recommended test-only correction: simple split/directive
comparison with containsExactlyInAnyOrder, not a parser/extra abstraction. Not applied;
waiting under error guardrail. Task 2.3 remains open, progress 8/16. Previous compiler
blocker is historical. Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No acceptance, commit, push, archive or behavioural migration.

F04 owner-review/header/cache pause, 2026-10-14: owner confirmed actual browser 200%
zoom and language/visual result works/looks good; browser/version/viewport and
individual manual keyboard/JS-off observations unreported. Checklist 1.6 complete.
Focused pinned CSRF integration inspection (2.1) and document-header slice (2.2)
complete: 15 frontend and 39 targeted Java tests passed. Progress 8/16. Cache slice
2.3 prepared but Maven verify fails compilation: pinned commit-wrapper sendError
methods are final. Current source does not compile; no new JAR/browser result claimed.
Recommended next action: replace custom commit-wrapper caching with standard MVC
resource-cache settings, preserving error/local no-store, not nested wrappers.
Apply paused awaiting guidance. UH01 T01–T04 done/story in_review awaiting combined
integration; UH02 blocked with canonical prerequisite closure retained. F04 blocked;
body limits/safe errors/ASVS/final integration remain open. Evidence under
`harness/evidence/F04-UH01-locale-preferences.md` and `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit, push, archive or ownership migration; unrelated VS Code changes preserved.
Earlier handoffs below are historical.

F04 selector review handoff, 2026-10-14: owner authorised the simple test correction
and requested no overengineering. One assertion now uses Playwright `allHeaders()`;
full browser rerun passed 46/46 Chromium cases, including ten real preference/forgery
cases and all shared/Home/component/keyboard/reflow/contrast regressions. Checklist
1.4/1.5 complete; progress 5/16. Last Maven verify passed 15 frontend tests, 156 Java
cases (four explicit skips) and 15 packaged cases; no production change afterwards.
Canonical UH01 T01–T03 done; T04/story and F04 blocked only on checklist 1.6 actual
browser-UI 200% zoom and owner visual/copy review. Instructions: `docs/delivery/locale-preferences.md`.
UH02 remains planned. Evidence: `harness/evidence/F04-UH01-locale-preferences.md`.
No final clean/full-feature acceptance, commit, push, archive or ownership migration;
unrelated `.vscode/settings.json` work preserved. Earlier failure handoffs are historical.

F04 resumed browser pause, 2026-10-14: owner approved real-token local test correction;
local and legacy Home tests now avoid synthetic `.with(csrf())` repository replacement.
Checklist 1.3 complete; progress 3/16. Maven verify passed 15 frontend tests, 156 Java
cases (four explicit architecture skips) and 15 packaged cases, including watch and
fixture regressions. Selector docs/tests/runner prepared; Chromium run passed 34/46
cases, including all ten native preference/forgery cases and keyboard/reflow/contrast.
Twelve shared-shell cases fail only at cookie-header assertion: Playwright `headers()`
omits cookie headers; official docs require `allHeaders()`. Proposed test-only fix
not applied; awaiting guidance under apply error rule. Checklist 1.4/1.5 remain open;
actual UI zoom/owner review and UH02 not done. F04/UH01/T02 remain blocked; prior
local-cookie blocker below is historical. Evidence: `harness/evidence/F04-UH01-locale-preferences.md`.
No clean final/health acceptance, commit, push, archive or ownership migration;
unrelated `.vscode/settings.json` work preserved.

F04 apply pause, 2026-10-14: `f04-security-and-locale-flow` has 2/16 tasks complete
(1.1 prerequisite record and 1.2 locale precedence). Native selector/cookie-CSRF/
preference POST are prepared, but task 1.3 remains incomplete. Initial targeted
verification passed 15 frontend and 59 Java tests; subsequent run passed frontend
checks/15 tests and 82/83 Java cases, with one local-cookie test error. Pinned
Spring Security `.with(csrf())` helper replaces the filter's cookie repository with
a test session repository, contaminating the loop's next GET. Proposed next action:
use genuine rendered cookie/masked token in the local HTTP/HTTPS test and verify
legacy helper isolation; not applied, awaiting guidance under the error guardrail.
Evidence: `harness/evidence/F04-UH01-locale-preferences.md`. F04/UH01/T02 blocked,
UH01/T01 done; other canonical tasks and UH02 remain planned. No browser/packaged/
final acceptance, commit, push or ownership migration. Prior planning and unrelated
`.vscode/settings.json` work preserved. Earlier handoffs below are historical.

F04 whole-feature proposal handoff, 2026-10-14: owner requested one planning-only
change for complete F04. `f04-security-and-locale-flow` contains proposal, two delta
specs (locale-preferences and secure-http-responses), design and 16 unchecked tasks,
preserving both stories' four requirement/acceptance IDs and ten canonical task IDs.
Strict change validation and all 15 planning-rule tests passed; planning evidence:
`harness/evidence/F04-openspec-proposal.md`. F04 and both stories remain planned and
plan-owned; no application code/main-spec edits, implementation, commit, push, sync
or archive. Existing `.vscode/settings.json` work preserved. Next is artifact review
and a separately requested apply workflow. F03 remains done and archived. Earlier
handoffs below are historical.

F03 archival handoff, 2026-10-13: owner requested F03-UH02 archive, confirmed
spec synchronisation (without behavioural ownership migration), clarified “close
F03” and authorised committing all remaining project changes locally. F03 remains
done (`0246b37` implementation, `968fc35` closure). All 11 tasks/artifacts complete;
shared-interface main spec contains exact delta behaviour and canonical headings.
Archived at `openspec/changes/archive/2026-10-13-f03-uh02-localised-shared-shell/`.
The previously approved F03-UH01 archive/main-spec ownership migration is included
in this archival commit too. F03-UH02 remains plan-owned; F04 unchanged. No application
changes, push or release. Earlier uncommitted/active-change statements are historical.

F03 accepted local closure, 2026-10-13: owner authorised finishing local commits and
closure. F03-UH02 implemented/integrated on local main in `0246b37`; canonical
T01–T05/story and F03 done against both accepted stories, passing clean verification
(15 frontend, 100 Java with four explicit skips, 15 packaged), 36 Chromium cases,
health smoke and recorded owner review decision. No source change after that test run.
Earlier F03-UH01 archival/migration edits remain preserved and uncommitted; closure
stages only F03-UH02 tracking in shared files. No push or automatic F03-UH02 sync/archive.
F04 remains planned; owner effort unreported. Next is separately authorised archival
or F04 planning, not automatic implementation. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
Earlier handoffs below are historical.

F03-UH02 verified apply handoff, 2026-10-13: shared-interface implementation and
acceptance checks pass under the owner's confirmed review decision (Home walkthrough
steps 1–3 passed; automated component coverage accepted instead of repeated manual
fixture review; browser/version/viewport details unreported). Final clean Maven passed
15 frontend tests, 100 Java cases (four existing explicit skips), 15 packaged cases
including F02 startup/watch regressions; original health smoke and all 36 Chromium
cases passed. Normal JAR excludes fixtures and preserves B bytes; scoped integration
review found no issues. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
Canonical T01–T04 done; story/T05 in_review pending formal local integration/closure.
No commit, push, archive or behavioural-ownership migration authorised/performed.
F03 remains in_progress, F04 unchanged, prior F03-UH01 archival changes preserved.
Owner effort remains unreported. Earlier handoffs below are historical.

F03-UH02 documentation check repaired, 2026-10-13: user authorised doc-only fixture
command correction; planning integrity, all 15 planning-rule tests, strict OpenSpec
validation and whitespace checks now pass. Progress remains 8/11. Next blocker is
actual browser-UI 200% zoom and human keyboard/visual/EN/ES/FR copy review under
checklist 4.2; instructions in `docs/delivery/shared-interface.md`. Final integration,
acceptance/closure and any authorised local commit remain open. No push or ownership
migration. Earlier handoffs below are historical.

Pause-time planning check, 2026-10-13: strict OpenSpec, 15 planning-rule tests and
whitespace checks passed. Planning integrity flags the Python fixture command in
`docs/delivery/shared-interface.md` as a Markdown link (dictionary-index/call syntax
false positive). Proposed doc-only fix is `module.get` call syntax; not applied yet.
Progress remains 8/11; actual manual review still required. Earlier handoffs follow.

F03-UH02 manual-review gate, 2026-10-13: checklist 1.1–4.1 complete (8/11);
canonical T01/T02/T03 done, T04 blocked on unexecuted actual browser-UI 200% zoom
and human keyboard/visual/EN/ES/FR copy review. All prior test harness failures repaired.
Latest non-clean Maven verification passed 15 frontend tests, 100 Java cases (four
explicit architecture skips), 15 packaged cases including F02 startup/watch regressions;
36 Chromium Home/component/locale/keyboard cases passed. Shared styles/fragments/native
button/resources implemented; focused skip link inset avoids clipped outline.
No final clean verification, health smoke, owner acceptance/integration/commit/push or
ownership migration claimed. Final checklist 4.2/5.1/5.2 remain open. Prior Home
archival changes preserved and F04 excluded. Evidence/manual instructions:
`harness/evidence/F03-UH02-shared-shell.md`, `docs/delivery/shared-interface.md`.
Earlier handoffs below are historical.

F03-UH02 locale-test pause, 2026-10-13: user authorised no-JS oracle correction;
all 12 Chromium Home/component cases now pass, including six component cases across
EN/ES/FR with JavaScript on/off. Checklist 2.3 complete; progress 4/11.
New checklist 2.4 assertions: 20 Java cases ran, four exact-locale cases failed because
the test helper entity-encodes Unicode whereas Thymeleaf emits correct UTF-8.
Synthetic parity and button escaping checks passed; integration tests did not run.
Proposed fix: explicitly UTF-8-aware test escaping, no production change. Apply paused
awaiting guidance. No acceptance/commit/push; earlier handoffs below are historical.

F03-UH02 resumed verification, 2026-10-13: user authorised fixture-only bean rename;
startup collision resolved with `shellFixtureFilterChain`. Targeted Maven verification
again passed 15 frontend, 14 Java rendering/component and 15 packaged cases.
Browser verification now runs: nine passed, three JavaScript-disabled component cases
failed on a test-only JavaScript click-counter oracle that cannot execute callbacks
when JavaScript is disabled. Apply paused at 3/11 checklist tasks complete; proposed
next action is separate JS-enabled event counting from native state/no-submission
assertions in JS-disabled cases, retaining all locales/cases and scope.
No acceptance/commit/push; prior archival work preserved. Earlier handoffs are historical.

F03-UH02 apply paused, 2026-10-13: `f03-uh02-localised-shared-shell` has 3/11
checklist tasks complete (1.1, 2.1, 2.2). Shared tokens/styles and real Home card/header
fragment extraction are verified; native button and isolated component fixture are
partially implemented. Targeted Maven verification passed 15 frontend tests, 14 Java
rendering/component cases and 15 packaged cases. Browser runner failed before tests:
fixture configuration class/method collide on `shellFixtureSecurity` bean name.
Proposed next action is rename the fixture-only bean method and repeat verification;
workflow paused awaiting guidance. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
No new acceptance, commit, push or ownership migration. Prior F03-UH01 archival work
preserved; F04 excluded. Earlier handoffs below are historical.

F03-UH01 archive handoff, 2026-10-13: accepted/integrated F03-UH01 remains done
(`f2a3e3c`, closure `baf975c`). Owner requested archive and explicitly selected sync
and incremental ownership migration. `openspec/specs/home-page/spec.md` now owns
its two requirements/scenarios; plan.json retains IDs/verification/tracking. Complete
13-task change archived at `openspec/changes/archive/2026-10-13-f03-uh01-home-page/`.
No application changes or push. Archival metadata remains uncommitted. F03 remains
in_progress, F03-UH02/F04 remain planned and plan-owned. Next is an F03-UH02-only
proposal, not automatic implementation. Earlier handoffs below are historical.

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

# Evidence — F06-UH02 localised diagnostics and safe budgets

Date: 2026-10-17. Status: locally verified diagnostics/freshness slice after explicit owner acceptance of UH01; updated WebKit CI and UH02 acceptance pending. Owner effort unreported; actual tests are recorded below, not inferred from implementation.

## Current blocker — Back-navigation output restoration

Owner subsequently approved the proposed output-region fix and continuation. Replaced the read-only textarea with a labelled, focusable/selectable `pre` region, retaining bounded scrolling/resizing. Both worker success and disposal write only `textContent`; no HTML interpretation or form-control value remains. Browser assertions now read exact text (including indentation) and still require empty output after Back. SSR checks require the labelled region and prohibit a textarea in the workspace; existing inert-markup sentinel and Axe checks remain.

Actual local verification after the fix: Maven passes129 frontend tests,199 Java cases (three explicit skips),17 packaged cases; Chromium78/78 andFirefox32/32 pass. Logs: `/tmp/opencode/f06-output-region-maven.log`, `/tmp/opencode/f06-output-region-chromium.log`, `/tmp/opencode/f06-output-region-firefox.log`. The first Maven attempt stopped on Prettier layout only; corrected formatting and reran successfully. No privacy/CSP/budget/deadline changes, assertion relaxation or manual acceptance. Updated Ubuntu WebKit remains necessary; task2.3 remains reopened and task2.5 incomplete pending its result. The following pause/approval statements describe the earlier failed head, not the current authorisation.

At `7c0114e`, Java run39070308263 passed and browser run39070308306 passed clean Maven,Chromium78/78 andFirefox32/32. WebKit again passed29/32, but the CRLF insertion/position assertions now pass: the three locale tests reach their final history-restoration assertion and find previous output `{}` rather than the required empty result after Back navigation. This establishes a remaining runtime/lifecycle problem, not a passing matrix or merely another CRLF-fixture failure. Log `/tmp/opencode/f06-crlf-ci-browser.log`.

Pause runtime edits under the owner's distinction between routine test-only corrections and behaviour/security decisions. Proposed minimal direction: replace the read-only textarea with an equivalently labelled, selectable text-only output region so browser form-control history restoration cannot repopulate it; retain the existing input/editor/worker lifecycle, limits and exact clearing expectations. The exact engine event/restore ordering is not yet independently proved, so no upstream browser-bug or universal workaround claim is made. No code/expectation/timeout change is applied before agreement.

Reopened task2.3 and canonical implementation T02; dependent canonical verification statuses remain blocked even though their recorded diagnostic checks passed. Checklist10/22; task2.5 and UH02 closure remain open. No stale-output assertion removed, WebKit waiver, new system dependency, F06 merge or release. Earlier delivery/CI-pending statements below are historical.

## Prerequisite and scope

F06-UH01 is done at `cd3460d`: clean Maven92 frontend/199 Java cases with three explicit skips/17 packaged, Chromium71/71,Firefox25/25,WebKit25/25 on actual Ubuntu CI and explicit owner slice acceptance. Read the F06 dossier/EARS/Gherkin/tasks and current change artifacts; UH02 preserves input while explaining syntax locations and rejecting oversized edits safely.

## Planned verification matrix

- F06-UH02-R01/AC01 and T03: strict malformed/empty/comments/trailing-comma/extra-root errors in EN/ES/FR; one-based CRLF/Unicode/EOF positions; resource-backed codes only, no content excerpts, input unchanged and no current partial output.
- F06-UH02-R02/AC02 and T04: accepted-change notifications versus rejected insertion, input/depth/output exact and overflow budgets, deadline/cancel/replacement/stale/disposal paths and future Copy eligibility; retain unchanged worker CSP and ADR006's exact startup-asset exception.
- Shared manager protocol regression: validate optional structured codes/offsets, reject malformed/current/unknown metadata safely, ignore obsolete jobs and preserve all F05 behaviour.
- State/worker unit tests plus actual packaged Chromium and critical Firefox/WebKit, real responsiveness/size observations and existing Java/packaged/Home/editor/locale/security regressions.

Final full-feature manual review, Copy/Clear implementation, story acceptance and external merge are not implied by starting this story. Actual commands/results will be recorded separately after execution.

## Executed diagnostic/protocol verification — 2026-10-17

Added allowlisted syntax/depth/input/output diagnostic metadata and an optional shared-manager callback. Syntax offsets must be safe integers within the matching job input; unknown codes/extra fields/invalid positions fall back to generic errors. Reentrant error callbacks cannot publish diagnostics for replacement jobs. Existing callers retain generic behaviour. Formatter errors carry no excerpts/raw exception text; EOF positions are at input end, with one-based code-point columns and CRLF-aware lines.

Project-local `npm run check` passed typecheck, lint/import boundaries, Prettier and121/121 tests, including the entire previous editor/worker/build suite plus malformed/obsolete/reentrant diagnostics and Unicode/CRLF/EOF cases. Log: `/tmp/opencode/f06-diagnostics-frontend.log`. Task2.2 complete. Actual EN/ES/FR browser diagnostics, freshness and budget scenarios remain pending; no story closure or new three-engine pass inferred yet.

## Freshness, real diagnostics and local budgets — 2026-10-17

Added accepted-document-change callbacks to the existing editor and a small page-local formatter session owning revision/current-result state. Accepted input/settings/retry/cancel invalidate current results and terminate obsolete work; rejected oversized edits preserve accepted input and its still-matching result. Old visible output is explicitly non-current, and the future Copy boundary receives no current result until a matching success. Page exit disposes state/workers/editors and clears result contents; back-forward restoration cannot revive old payloads or live processing. No history-reset/Clear/clipboard implementation is claimed in this story.

- `python scripts/verify-java-baseline.py`:129/129 frontend tests,199 Java cases with three explicit architecture skips,17/17 packaged integration cases pass. Types/lint/import boundaries/formatting and existing architecture/locale/Home/editor/security/watch/logo/fixture checks pass. Log `/tmp/opencode/f06-diagnostics-maven.log`.
- Final `python scripts/verify-home-browser.py`:78/78 Chromium cases pass. `--engine firefox`:32/32 critical cases pass. Logs `/tmp/opencode/f06-diagnostics-chromium-final.log` and `/tmp/opencode/f06-diagnostics-firefox-final.log`.
- Real EN/ES/FR browser cases verify empty/whitespace, comments, trailing commas, extra roots, supplementary-Unicode/normalised-CRLF/EOF locations; unchanged input; no content excerpts; stale output after edits/settings; oversize paste rejection preserving matching state; same-task edit cancellation; real worker-script load failure and retry; and back-navigation state clearing. Existing cold/warm exact-asset/privacy/CSP cases remain in the same suite.
- Unit cases verify current-result eligibility, revision changes, delayed/unknown/malformed diagnostics, cancellation, deadline recovery, worker creation failure, oversize output and disposal without reviving state. Exact8 MiB output succeeds and next byte fails; depth128/129 and multibyte1 MiB input boundaries remain tested. Actual output above1 MiB renders read-only without reusing the input editor's lower cap, and real over-cap expansion returns a safe translated diagnostic.
- Reference measurements use the actual packaged tool with10 KiB,100 KiB and1 MiB ASCII JSON strings, deep expansion, repeated jobs and keyboard responsiveness. Host: Intel Core i5-12400F,12 reported logical CPUs; Playwright1.63.0,Chromium153.0.8010.12,Firefox155.0. Complete per-run observations are in browser logs; representative earlier1 MiB insertion/job observations were roughly220/200ms in Chromium and128/169ms in Firefox, including automation/rendering overhead. These are measurements, not hardware-independent promises or precise watchdog assertions. F05's actual busy-worker timeout proof remains passing in the same regression suite.

Tasks2.3/2.4 complete on this local evidence; task2.5 remains pending updated required WebKit CI (previous UH01 WebKit success is not a pass for changed UH02 code). Final owner manual review/zoom/localised visual acceptance is still unperformed and not inferred from tests. No budgets, CSP, worker asset allowlist or storage/privacy constraints were relaxed.

## Continued draft delivery

### First changed-code CI result and CRLF fixture correction

At `b77ac8a`, Java run39069636791 passed. Browser run39069636868 passed the clean Maven build,Chromium78/78 andFirefox32/32; WebKit passed29/32 and failed the three locale copies of the CRLF-position fixture (expected line2,column5; reported line3,column5). No other WebKit case failed, including reference-size/budget, real worker load recovery and previous privacy/CSP regressions. This is not a passing WebKit gate.

The failure is isolated to CRLF insertion through Playwright's contenteditable `fill` path, consistent with an extra editor line rather than the unit-tested CRLF position calculation. The fixture now supplies the original raw CRLF text through the existing explicit `ClipboardEvent`/DataTransfer paste path in every engine; CodeMirror's paste implementation uses `state.toText`, whose default split treats CRLF as one line break. A new assertion verifies exact normalised editor text before formatting; existing post-operation preservation and expected line/column assertions remain unchanged. No application/package source, timeout, retry, budget or CSP change.

After this test-only correction, local Chromium78/78 andFirefox32/32 pass again (`/tmp/opencode/f06-diagnostics-crlf-chromium.log`, `/tmp/opencode/f06-diagnostics-crlf-firefox.log`). Updated Ubuntu WebKit remains pending; task2.5 stays open. The correction is within the owner's permission to resolve straightforward test-only integration mismatches while preserving coverage.

Correction delivered as `7c0114e` on draft PR #6. Java run39070308263 and browser run39070308306 started at that head; updated WebKit evidence pending. Runtime code is unchanged from b77ac8a. No assertion, test, timeout or gate removed.

Executed continuation, 2026-10-17: committed verified diagnostics/freshness and completed UH01 acceptance bookkeeping as `b77ac8af663c2df6dec0161a16adab43941dc725`, pushed it to the existing draft PR #6 and updated that PR's scope/verification description. Java run39069636791 and browser run39069636868 are in progress at this head. The first watcher returned before GitHub registered the checks; inspection confirmed no test failure, and watching resumed after registration. No changed-code WebKit pass or task2.5 completion is claimed yet. Local real health smoke also passes (`/tmp/opencode/f06-diagnostics-health.log`). No runtime change after the tested/pushed slice.

Owner requested continuation after the model discussion. Continue the already authorised existing draft-PR verification path with this verified slice and completed UH01 acceptance bookkeeping; no new model/delegation, F06 merge, release or manual acceptance is inferred. Record the actual next commit/CI identity after delivery, leaving task2.5 open until the updated required checks pass.

Pre-delivery checks found one stale negative planning-test fixture: its selected baseline UH01 was now accepted, so simply marking it done no longer constructed an invalid closure. The test now explicitly leaves a child open and removes evidence/finish date before asserting the same two validator failures. The validator and assertions are unchanged; all15 planning-rule tests pass again. Planning integrity, strict OpenSpec and whitespace checks also pass. This is the owner-authorised straightforward test-only integration correction, not a change to closure policy.

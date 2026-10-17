# Evidence — F06-UH02 localised diagnostics and safe budgets

Date: 2026-10-17. Status: locally verified diagnostics/freshness slice after explicit owner acceptance of UH01; updated WebKit CI and UH02 acceptance pending. Owner effort unreported; actual tests are recorded below, not inferred from implementation.

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

Owner requested continuation after the model discussion. Continue the already authorised existing draft-PR verification path with this verified slice and completed UH01 acceptance bookkeeping; no new model/delegation, F06 merge, release or manual acceptance is inferred. Record the actual next commit/CI identity after delivery, leaving task2.5 open until the updated required checks pass.

Pre-delivery checks found one stale negative planning-test fixture: its selected baseline UH01 was now accepted, so simply marking it done no longer constructed an invalid closure. The test now explicitly leaves a child open and removes evidence/finish date before asserting the same two validator failures. The validator and assertions are unchanged; all15 planning-rule tests pass again. Planning integrity, strict OpenSpec and whitespace checks also pass. This is the owner-authorised straightforward test-only integration correction, not a change to closure policy.

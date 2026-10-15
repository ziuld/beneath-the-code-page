# F05-UH02 — Bounded worker processing evidence

Date: 2026-10-15. Status: implementation and Chromium/Firefox proof pass locally; actual updated WebKit CI and final integrated/manual acceptance pending. No full feature acceptance claimed.

## Authorised scope and prerequisites

- Owner approved deferring manual screen-reader review until final acceptance and continuing the existing F05 implementation without additional tools, frameworks or repeated intermediate gates. Design/tasks and canonical prerequisites now use completed editor implementation/three-engine automated proof, not full UH01 manual acceptance, to start worker work. Manual task 1.6 remains unchecked. Behavioural requirements/scenarios, budgets, IDs and final acceptance remain unchanged; no Orca/system installation.
- F04 is accepted; editor implementation and automated three-engine CSP gate passed in `baf1153`. Scope remains shared lifecycle and isolated proof, not F06 algorithms or public processing routes. Existing frontend tooling, private manifest, copied-JAR runner, response headers and design-system/i18n resources are reused.

## Implemented slice

- `createWorkerManager` owns one active job, unique increasing IDs, a two-second monotonic deadline, validated current responses, cancellation/replacement, safe errors, timer cleanup, termination and clean recreation. Accepted output is updated only on a bounded valid current success. Late/unknown/duplicate results cannot alter newer state; disposal is idempotent and blocks later callbacks/jobs.
- Shared pre-post 1 MiB UTF-8 and pre-accept 8 MiB output guards count bytes without an unbounded encoded copy. Exact/over-boundary Unicode cases pass. These limits do not bound worker allocations, browser internals or output structured-clone allocations.
- Proof-only frontend build emits a same-origin hashed worker plus explicit private resource metadata. Runner merges namespaced fixture entries into the copied JAR's private manifest, preserving normal eager/lazy graphs, startup validation, exact immutable caching and Home isolation. Copied YAML supplies only the proof entry to the fixture controller; no production controller/route or worker algorithm is added.
- Existing CodeMirror input feeds the manager; inert output uses textContent, while EN/ES/FR status uses server resources and never includes payload excerpts. Synthetic echo/busy/oversize/error/network/eval operations live only under src/test/frontend and are excluded from the normal distributable.

## Executed local checks

- Clean `python scripts/verify-java-baseline.py clean` passes frontend type/lint/format checks and 51 unit/build tests; 191 Java cases with four explicit absent-capability skips; all 17 packaged integration cases. This includes the actual `localPageServesTwoSuccessiveWatcherRebuildsWithoutRestart` regression. Log `/tmp/opencode/f05-worker-clean-verify.log`.
- Full pinned Chromium 64/64 and Firefox critical suite 18/18 pass with Playwright 1.63.0, including EN/ES/FR real worker echo, responsive keyboard interaction during a busy worker, timeout, cancel, replacement, recovery after worker error/output-limit, output preservation, disposal, inert text, request/storage/cookie/log privacy and unchanged editor/Home/locale/security regressions. Logs `/tmp/opencode/f05-worker-chromium.log`, `/tmp/opencode/f05-worker-firefox.log`.
- Real worker-response cases verify exact script metadata path, status/MIME/bytes, nosniff, immutable cache, restrictive response CSP, blocked fetch/evaluation and missing worker 404/no-store. Unit Java verification rejects missing explicit worker resources at startup without preloading them on Home. No policy bypass or relaxation.
- Baseline executable health/startup smoke passes; log `/tmp/opencode/f05-worker-health.log`. Direct normal-JAR inspection confirms no proof classes/workers and original B image bytes unchanged. The browser runner verifies the normal JAR digest is unchanged after its copied-fixture runs.
- Initial browser attempt exposed fixture-only packaging issues: property injection targeted properties rather than the repository's YAML, and non-namespaced manifest keys replaced normal lazy entries. Corrected both without changing application security/cache policy; byte assertions now compare each response to its actual normal/proof build output. The same unchanged functional/cache requirements pass on rerun. The failed run log was overwritten by the passing run; no retained failure log claimed.
- Strict TypeScript also checks test-only fixture sources. Existing ESLint scope remains production/frontend after rejecting unnecessary cross-root lint configuration; fixture formatting is checked with existing Prettier. No new dependency or lint framework.

## Lifecycle measurements and limitations

- Local Omarchy 4.0.4, 12 logical CPUs exposed by browsers. Synthetic input/output 51 UTF-8 bytes for the echo sample. Chromium153 observations across EN/ES/FR: echo about 69–71ms, cancel 33–34ms, timeout observed 2324–2334ms. Firefox155: echo 97–101ms, cancel 48–50ms, timeout observed 2372–2439ms. Measurements include browser automation/status observation overhead, not a precision deadline benchmark. Unit tests prove the exact 2000ms boundary, including a response delivered before the queued timer callback.
- Stale A-after-B, duplicate/unknown/malformed response, factory/post errors and disposal races use small fake workers/timers; real workers prove busy termination/recovery and UI responsiveness. No claim that termination permits a dead worker to send a real late message or that budgets cap all memory allocation.
- Actual WebKit results for this updated worker slice are pending supported Ubuntu CI; earlier editor-only WebKit passes do not prove workers. No local privileged browser dependency install attempted.
- Final manual accessibility/copy observations and owner acceptance remain pending. No actual owner effort, completion date, feature closure, merge/release or archival is fabricated.

## Acceptance mapping

- F05-UH02-AC01 / R01: exact unit deadline plus executed real timeout/cancel/error/recovery/UI tests in Chromium and Firefox; updated WebKit smoke pending.
- F05-UH02-AC02 / R02: executed identity/race/protocol/disposal unit cases and fresh-context document/worker/static-request/storage/cookie/server-log privacy cases in EN/ES/FR. Full three-engine/final integrated acceptance pending.

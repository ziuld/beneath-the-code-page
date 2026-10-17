# Evidence — F06-UH01 token-preserving formatting

Date: 2026-10-17. Status: first formatter slice implemented with passing local and required three-engine Ubuntu CI verification; story closure/review and final feature acceptance remain pending. Owner authorised F06 apply and ADR 006's exact worker-script GET exception. F05 PR #5 merged as `8033ef0127b8c6e0da22f1e396e28f0eb88c4485`; implementation branch is based on the merged main and preserves local documentation work.

## Prerequisites and intended evidence

F05 is accepted/archived with editor/worker/browser proof. Read F06 dossier, EARS/Gherkin, proposal/spec/design/tasks and relevant current code. Retain F06-UH01-R01/R02, AC01/AC02 and T01–T05; no ownership migration or effort invention.

AC01: golden lexical comparisons, numeric notation/duplicates/escapes/order/primitive roots, strict full-input validation, indentation/idempotence and budgets. AC02: real cold/warm browser document/worker capture, exact immutable-script allowlist, no payload in traffic/storage/cookies/logs, inert rendering and unchanged CSP.

## Dependency inspection

Registry inspection returned `jsonc-parser` 3.3.1, MIT licence, integrity `sha512-HUgH65KyejrUFPvHFPbqOY0rsFip3Bo5wb4ngvdi1EpCYWUQDC5V+Y7mZws+DLkr4M//zQJoanu1SP+87Dv1oQ==`. Installed exact version through existing project-local Node/npm, ignored install scripts. npm reported 145 audited packages and zero vulnerabilities at installation. This is a point-in-time audit, not a permanent security guarantee.

## Execution results

### First-slice acceptance — 2026-10-17

After the actual passing three-engine CI results were presented, the owner explicitly answered “yes, continue” to accepting the first formatting slice and proceeding to diagnostics/Copy/Clear while retaining final full-feature manual review. Accept UH01's two evidence-backed formatting/privacy pairs; implementation commit `cd3460d` is recorded and the integrated first-slice review found no blocker. UH01-T05/story now done; checklist1.7 complete. This is acceptance of this bounded slice, not a fabricated manual200% zoom/translation observation, F06 feature completion or PR merge. Final manual gate4.2 remains pending.

### Required Ubuntu CI completed — 2026-10-17

Inspected actual remote steps/logs at full implementation commit `cd3460d5509a889826cf2e6d2428ad57a41da870`, not merely a workflow definition or pending status:

- [Browser run39063899165](https://github.com/ziuld/beneath-the-code-page/actions/runs/39063899165): SUCCESS on Ubuntu24.04. Clean normal-executable Maven build passes92 frontend tests,199 Java cases with three explicit architecture skips and17 packaged integration tests. Chromium71/71, Firefox25/25 and **WebKit25/25** all pass, including all seven real formatter cases in every engine and retained regressions.
- [Java run39063899168](https://github.com/ziuld/beneath-the-code-page/actions/runs/39063899168): SUCCESS. Build/verification, architecture/planning and actual executable health checks pass.
- Matched Playwright1.63.0; WebKit26.6/build2359 installed by the existing CI-only dependency path on supported Ubuntu. No local privileged installation or application CSP/timeout/coverage relaxation was needed.
- Logs inspected: `/tmp/opencode/f06-pr6-browser-ci.log` and `/tmp/opencode/f06-pr6-java-ci.log`. Browser run head matches the PR head and the reviewed implementation commit. No application code changed after those results.

Task1.6 and canonical UH01-T04 are complete; checklist6/22. Both UH01 acceptance pairs now have actual automated evidence: AC01 lexical/golden/large-number preservation and AC02 cold/warm exact-asset privacy/CSP/storage/log checks. No blocking issue found in the integrated first-slice review. UH01-T05/story remain in review pending acceptance; no owner manual200% zoom or independent translation/visual observation is invented. Later feature work and final manual gate are not passed by this CI run. PR #6 remains draft/open and unmerged; earlier host-library/CI-delivery blockers below are historical.

### Current verified slice and remaining gate — 2026-10-17

Draft delivery executed, 2026-10-17: created coherent commit `cd3460d` containing the current first slice and completed approved documentation updates, pushed `feature/F06-json-formatter-implementation`, and opened draft [PR #6](https://github.com/ziuld/beneath-the-code-page/pull/6) against merged `main`. Existing Ubuntu CI checks started; actual results are pending at this entry. No F06 merge/release or task1.6 completion inferred from configuring/starting CI. Earlier statements that no F06 delivery had occurred are historical.

Subsequent owner authorisation: commit this slice and completed local documentation updates, push its branch and open a draft PR for existing Ubuntu CI. No F06 merge/release, manual acceptance or WebKit exemption inferred. Actual delivery identity and remote results will be recorded after execution.

Owner approved updating stale pre-F06 mapping assertions and continuing straightforward test-only integration corrections while retaining coverage. The revised Home test requires the exact real Tools mappings and excludes unfinished tool/Learn/fixture mappings. No access-policy waiver, assertion deletion or new dependency was needed.

- `python scripts/verify-java-baseline.py`: BUILD SUCCESS;92/92 frontend tests,199 Java cases with zero failures/errors and three explicit architecture skips,17/17 packaged integration cases. New Tools MVC6/6 passes, as do full locale/CSRF/redirect, architecture, editor, Home/publication and actual repeated watch-rebuild regressions. This was a normal verify, not a clean final F06 build.
- `python scripts/smoke-java-baseline.py`: actual normal JAR starts on loopback; executable identity and HTTP200 health UP pass; its child process stops.
- `python scripts/verify-home-browser.py --install` and final rerun without install:71/71 Chromium cases pass. Final log `/tmp/opencode/f06-formatter-chromium-final.log`.
- `python scripts/verify-home-browser.py --engine firefox --install` and final rerun:25/25 critical cases pass. Final log `/tmp/opencode/f06-formatter-firefox-final.log`.
- Formatter's seven additional cases run against the normal production JAR, not the proof fixture. EN/ES/FR real-worker large integers, duplicate keys, negative zero, exponent/escape fidelity, two/four-space output, same-task cancel/replacement, invalid-input preservation/retry, inert output, keyboard exit, axe, CSP and no-form checks pass. Cold document/worker traffic is allowlisted to exact built asset paths; warmed requests are limited to the exact hashed worker path with GET/no body/query/fragment. Synthetic sentinels are absent from request URLs/bodies/headers, cookies, persistent storage and captured application logs. Actual worker response MIME/no-sniff/cache/CSP and immutable bytes match the normal build. No-JS explanations, disabled controls on lazy-load failure and Home/index asset isolation pass. Existing F05 isolated lifecycle/timeout/privacy and other regressions also pass.
- Runner verifies normal-JAR digest remains unchanged during fixture work; packaged tests retain proof exclusion and B-byte checks. The production worker is `static/assets/json-formatter-worker-DGqSfD3G.js` in this tested build, recorded as an exact private manifest resource; generated hashes are not hardcoded in application/tests.
- Playwright1.63.0; direct browser-version inspection confirms Chromium153.0.8010.12 and Firefox155.0. Browser runs report12 logical CPUs. Local OS is Playwright's unsupported Linux fallback, not an official support claim.
- `python scripts/verify-home-browser.py --engine webkit --install` downloaded pinned WebKit26.6/build2359 project-locally but all25 cases fail at launch before assertions due to unavailable fallback-build libicu74/libxml2/libflite1 host dependencies. Log `/tmp/opencode/f06-formatter-webkit.log`. No WebKit functional pass, sudo/system install, browser downgrade, CSP relaxation or coverage waiver is claimed. Existing Ubuntu CI remains the supported verification path; committing/pushing the current branch/opening a draft PR requires explicit delivery approval.

Checklist1.1–1.5 complete (5/22). Canonical UH01-T01/T02/T03 done; T04 blocked on WebKit, T05/story acceptance/commit pending. UH02 diagnostics/freshness and UH03 Copy/Clear remain unstarted under the approved story sequence. Actual200% browser zoom and independent EN/ES/FR owner visual review are not inferred from automated results. The historical pauses below are superseded except where explicitly retained here.

Latest fixture correction/Java verification, 2026-10-17: owner approved isolating the generic Vite fixture naming. Added a fixture-only `worker.rollupOptions.output.entryFileNames` override; production configuration and every prior assertion remain. `python scripts/verify-java-baseline.py` now passes all92 frontend tests plus type/lint/format, compiles Java and runs199 Java tests with three explicit architecture skips and one failure. All six new Tools MVC cases pass, as do locale/preference, editor, publication and architecture cases. The remaining failure is `HomeSecurityTests.productionHasNoMappedPlaceholderDestinations` line36: its pre-F06 assertion prohibits any `/tools` mapping, although the new real index now exists. Proposed test-only correction explicitly requires the exact index/formatter mappings and retains the absence of unfinished tool/Learn/test-fixture mappings. No production access-policy relaxation or assertion deletion proposed. Paused before that edit under the error guardrail. Packaged/browser verification remains unexecuted. Log: `/tmp/opencode/f06-fixture-fixed-verify.log`. This supersedes the previous fixture blocker below; checklist remains2/22.

Latest worker/SSR integration attempt, 2026-10-17: added a production request boundary/worker, exact private hashed-worker manifest metadata, lazy formatter workspace, translated SSR pages, safe exact return paths and matching MVC tests. Home Tools remains disabled. Pure worker-boundary tests and actual Vite production metadata/self-contained-worker checks pass in the full frontend run. Updated obsolete unpublished-route test cases to retain denial coverage for genuinely unpublished routes; retained all other assertions.

`python scripts/verify-java-baseline.py` stopped in frontend verification: typecheck/ESLint/Prettier pass,91/92 Vitest tests pass. The generic lazy-worker build fixture inherits production `json-formatter-worker-…js` output naming but expects its original `probe.worker-…js`; the separate real production metadata/build test passes. Proposed correction is a fixture-local output naming override, not dropping assertions or changing the production worker. Apply paused pending guidance under the error rule. Full log: `/tmp/opencode/f06-first-worker-verify.log`. No Java compilation/test, packaged or browser result from this run is claimed. Tasks1.3/1.4 remain unchecked until their complete verification passes.

Latest algorithm resolution, 2026-10-17: owner approved retaining strict library parsing/scanning and generating bounded whitespace-only gaps locally. Original token slices remain untouched; no package patch, speculative downgrade or reduced limits. Added depth49/50/51/99/100/101/127/128 × two/four-space regression coverage. Focused Vitest32/32 passes; complete frontend `npm run check` passes typecheck, ESLint/boundary rules, Prettier and83/83 tests (including existing editor/worker/build tests). Task1.2 complete; production worker/UI/packaged/browser verification still pending. The earlier failures below remain historical evidence, not current algorithm results.

Executed with existing project-local Node 24.21.0 and locked tools:

- Prettier formatted only the two new algorithm files.
- TypeScript `tsc --noEmit`: passed.
- ESLint restricted pure-algorithm boundary checks for `tools/json`: passed.
- Focused Vitest formatter suite: 22/24 passed; nesting-128 and output-expansion tests failed with `TypeError: text is not iterable` while counting an undefined library edit's content. No test was removed or marked passed.
- Direct reproduction against the dependency alone confirms no invalid edits at depth 99, one at depth 100 and two at depths 101/127/128 with two-space indentation. The library's indentation-cache branch uses an out-of-range index at its cache boundary. Its published 3.3.0 and 3.2.1 formatter source contains the same branch; no unverified downgrade was applied.
- An initial direct ESM-import diagnostic failed on the package's extensionless imports; using its supported CommonJS entry produced the successful isolated reproduction above.

Apply paused at task 1.2 under the error guardrail. Proposed direction: keep the pinned strict parser/visitor and scanner, but generate bounded whitespace-only token-gap edits without the defective library formatting routine. This preserves full-input validation, lexical fidelity, depth 128, indentation and output limits; it changes the implementation approach and needs agreement before proceeding. No package-source patch, fabricated fallback output, relaxed budget or omitted test.

No production worker, route, UI, packaged build, browser result, story acceptance, owner manual review or new implementation commit is claimed. Actual owner effort unreported.

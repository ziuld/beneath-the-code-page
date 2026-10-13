# F03-UH02 shared-shell evidence

Date: 2026-10-13. Implementation authorised; acceptance/integration not yet complete. Owner effort unreported. Canonical R01/R02, AC01/AC02 and T01–T05 remain unchanged (10h baseline). No commit/push or ownership migration performed.

## Final apply verification — 2026-10-13

Tracking/handoff regenerated with both backlog and roadmap renderers. Planning integrity, all 15 planning-rule tests, strict change validation and whitespace checks passed. Checklist 5.2 records the evidence-supported `in_review` state, not premature story/feature closure. All 11 OpenSpec apply checklist items are complete; canonical T05 remains in_review for formal authorised integration/closure.

Executed after the owner's review decision:

- `python3 scripts/verify-java-baseline.py clean`: successful clean Maven verification; frontend type/lint/format/build checks and 15 unit tests passed, 100 Java cases (four existing explicit architecture skips), 15 packaged integration cases; zero failures/errors. Includes architecture boundaries, Home rendering/security/publication, component escaping/locales, F02 manifest/startup and successive watch rebuild regressions.
- `python3 scripts/smoke-java-baseline.py`: original executable-manifest/startup check and HTTP 200 health UP passed; child stopped with normal SIGTERM exit 143.
- `python3 scripts/verify-home-browser.py --install`: locked project-local tooling installed after clean; all 36 Chromium cases passed. No privileged OS dependency installation; Playwright used its Ubuntu fallback build. Both dynamic-loopback processes and temporary fixture cleaned up; normal executable digest preserved.
- Direct JAR inspection: no fixture classes/templates or SharedComponentTests in the normal executable; packaged B bytes exactly match the original source. JAR SHA-256 `f74f17fcc1822c98fd02b22b75c0b476dc41ff1417d520e41125cf3d6d0c44fb`; B SHA-256 remains `83a37a77f8a8ba29fb6110cd15f30eb1737b226fff0d36238c17559bd054d209`.
- Scoped diff/integration review: no findings. Production security/locale resolver/publication descriptors, dependency pins and CI permissions remain unchanged; no new public destination, persistence or payload flow. F04 subtree equals HEAD exactly. F03-UH01 remains done/main-spec owned; prior archival/migration files preserved, not folded into a new commit.

Owner Home review and explicit acceptance of automated component coverage are recorded below. Formal story closure/local integration commit are not claimed: current apply authorises implementation/verification, not a new commit, push or archive. Story/canonical T05 remain `in_review`; F03 remains `in_progress`. AC01/AC02 checks pass under the approved review decision. Remote CI, cross-browser/assistive-technology certification and omitted manual fixture review remain unclaimed. Owner actual effort is unreported, so recorded zeros are not inferred effort.

## Latest result and remaining gate

Owner review decision, 2026-10-13: Ziuld reported reviewing the supplied steps 1, 2 and 3 (start/Home, browser zoom/keyboard and supported-language copy) and that they worked well. The owner explicitly declined repeating already-executed automated component tests manually, then confirmed the proposal/design/checklist revision accepting those automated results. Browser/version, precise viewport sizes and individual review actions were not reported and remain unspecified. No independent manual component-fixture review or accessibility certification is claimed. This satisfies the revised checklist 4.2 without changing R01/R02 or equating CSS zoom with browser-UI zoom. Final integration verification/tracking now resumes; earlier pauses below are historical.

User authorised the documentation-only fixture command correction to `module.get` call syntax. Repeated planning integrity, all 15 planning-rule tests, strict OpenSpec validation and whitespace checks: all passed. The false-positive link issue is resolved; actual browser-UI zoom/human review remains the next blocker. Progress remains 8/11; no application change or new runtime verification in this correction.

Pause-time validation: strict OpenSpec validation, 15 planning-rule tests and whitespace check passed. Planning integrity reported a false-positive broken link in the newly documented Python fixture command: the regex treats dictionary-index/call syntax as a Markdown link. Proposed documentation-only correction uses `module.get` syntax instead; not yet applied because the workflow pauses on errors. Actual manual-review gate remains unexecuted.

Checklist 1.1–4.1 complete: 8/11. Task 4.2 awaits actual browser-UI 200% zoom and independent human narrow keyboard/visual/EN/ES/FR copy review. T05 acceptance/integration and final clean verification remain open; no feature completion claimed. Earlier failures below are retained as historical evidence and have been repaired.

Latest `python3 scripts/verify-java-baseline.py` (non-clean) passed frontend checks/build/15 tests, 100 Java cases with four explicit architecture skips and 15 packaged-asset cases, zero failures/errors. Packaged cases include the original F02 manifest/startup and two successive watcher rebuild regressions. The earlier clean run predates final fragment/button/test additions; no final clean-run claim is made.

Latest `python3 scripts/verify-home-browser.py` passed all 36 Chromium cases: six retained Home, six native button, 12 exact-label/privacy and 12 keyboard/quality cases. Keyboard matrix covers EN/ES/FR × 320/1280 widths × production Home/isolated fixture, forward/reverse traversal of every reachable control, skip activation/exit, disabled/unavailable exclusion, native button pressed/released/hover states, full focus-outline viewport bounds, centre-point obscuration, text/focus contrasts, target geometry, 200% CSS layout zoom and separate 200% text enlargement, reflow and reduced-motion no-animation/transition states. Disabled-control contrast is a recorded usability test, not a mandatory WCAG contrast claim.

Moved the focused skip link 0.75rem down from the viewport edge so its offset outline is not clipped at the top. The hidden default state/approved visual layout remain unchanged. This is a bounded focus-visibility fix under R02, not a visual redesign. Browser-UI zoom, assistive-technology certification and independent human copy review are not implied by these checks.

## T01 — prerequisite review

Confirmed accepted Home commits `f2a3e3c`/`baf975c`, current archival handoff and canonical story. Read all apply context and recorded the bounded task plan in `harness/tasks/F03-UH02-shared-shell.md`. Pre-existing migration/archive changes preserved.

## T02 / checklist 2.1 — shared styles

Extracted used tokens, shared semantic component styles and Home layout, preserving the single cascade layer and immediate interaction states. Documented roles/states/breakpoint in `docs/delivery/shared-interface.md`.

Executed `python3 scripts/verify-java-baseline.py clean`: frontend typecheck/lint/format checks and 15 unit tests passed; Vite build passed; 90 Java cases (four explicit architecture skips), 15 packaged-asset cases passed, zero failures/errors. This predates fragment/button additions; not full story acceptance.

Captured the original normal JAR before editing via the new snapshot helper. Maven clean subsequently removed those images from target. Reproduced the reference using the unchanged current Home template/JAR with browser-only stylesheet substitution of the exact accepted `f2a3e3c` base.css (`git show` to `/tmp/opencode/f03-uh01-reference.css`). This is explicitly a reference-style reconstruction, not retained original-JAR screenshots. Compared it with the rebuilt JAR's actual stylesheet at identical locale/viewport settings: all six PNG files were byte-identical (EN/ES/FR, widths 320/1280, height 900). Commands:

```sh
python3 scripts/verify-home-browser.py --install --snapshot target/shared-shell-after
python3 scripts/verify-home-browser.py --snapshot target/shared-shell-reference --snapshot-reference-css /tmp/opencode/f03-uh01-reference.css
```

Comparison SHA-256 (reference equals actual):
- en-1280: `85216b0d5d09fab6a2e4e77430ba2649639e3326347816a80f43cac88ed555dc`
- en-320: `060ab1b6afbb86e028912f1fb7f6dffe770341ec3a1096ec3a0f65412923843c`
- es-1280: `d32d310716b2a3790ea89b00745d6b913ba9df781a98d97b3fae06130e59432c`
- es-320: `f3b3eb14900d6e9c954dadbf5a0393d4d7438a77eb588f6a5c25c6f83aa9cc15`
- fr-1280: `6e9eadefb7207542e82a4e5c3100220ee31bab7e6a22c896e166f9e5a9ab76c0`
- fr-320: `5f007f3eeec6b69c37de150618a915f68c1e1233c089ae7de4079e988a23ff95`

Unchanged B source SHA-256: `83a37a77f8a8ba29fb6110cd15f30eb1737b226fff0d36238c17559bd054d209`. Playwright 1.64.0, Chromium 156.0.8078.4 fallback build on this Linux distribution; no OS dependency installation or sudo used.

## Outstanding

Checklist 2.4 added exact EN/ES/FR/unsupported-locale labels/metadata assertions, synthetic parity positive/negative cases and production button-fragment escaping coverage. Targeted Maven run failed: frontend checks/15 tests passed; 20 Java cases ran with four failures, zero errors. Synthetic parity and escaping cases passed. Four new locale cases fail because the test helper `HtmlUtils.htmlEscape` defaults to entity-encoding Unicode (`&mdash;`, `&eacute;`), while production Thymeleaf correctly emits UTF-8 Unicode. Packaged integration did not run after this failure. Proposed test-only correction is `HtmlUtils.htmlEscape(message, "UTF-8")`; no production text/encoding or assertion coverage is to change. Apply paused at 4/11 awaiting guidance; 2.4 remains unchecked.

Checklist 2.2: extracted real card fragment and explicit header current-path parameter. Added semantic landmark/current-page/card rendering assertions; existing four publication combinations still pass. Executed `python3 scripts/verify-java-baseline.py -Dtest=HomeRenderingTests -Dit.test=PackagedAssetsIT`: 15 frontend unit tests, 11 rendered Java cases and 15 packaged-asset cases passed, zero failures/errors. No new production route/control or security change.

Checklist 2.3 partially implemented: native button fragment/styles, three resource labels, test-only controller/security/template and isolated JAR browser runner added. Executed `python3 scripts/verify-java-baseline.py -Dtest=HomeRenderingTests,SharedComponentTests -Dit.test=PackagedAssetsIT`: 15 frontend tests, 14 Java rendering/component cases and 15 packaged-asset cases passed. This includes EN/ES/FR button text/disabled/non-submitting type and non-Home current-route markup. No browser activation result claimed.

Executed `python3 scripts/verify-home-browser.py`: failed before Playwright tests at isolated fixture startup. `target/shell-browser-server.log` confirms BeanDefinitionOverrideException: the `ShellFixtureSecurity` configuration class and `shellFixtureSecurity` method share a bean name. Both processes were cleaned up, temporary fixture removed, normal JAR digest unchanged. Proposed resolution is a fixture-only method rename, preserving disabled bean overriding and production security. Apply paused awaiting guidance as required by the workflow; checklist 2.3 remains unchecked.

Stronger locale/keyboard acceptance checks remain pending. Actual browser-UI zoom, human visual/translation review and remote CI are not claimed. F04 remains excluded; story/feature remain open.

## Resumed verification

Checklist 3.2: added 12 exact accessible-name/resource browser cases (EN/ES/FR × JS on/off × production Home/isolated fixture). Executed browser runner: all 24 Chromium cases passed, including six retained Home and six native button cases. Verified metadata, document language, French AC01 names, untranslated-key absence, same-origin GET-only/no-payload requests, empty cookies/local/session storage, fixture exclusion and unchanged normal-JAR digest. Existing separate CI workflow SHA pins/read-only credentials retained unchanged. Local results only: remote CI and independent human translation review unexecuted.

User authorised UTF-8-aware exact-label escaping. Corrected only the test helper to `HtmlUtils.htmlEscape(message, "UTF-8")`. Executed targeted Maven verification: frontend checks/build and 15 tests, 20 rendering/component Java cases and 15 packaged-asset cases all passed, zero failures/errors. This covers AC01 exact labels/accessible names/metadata/footer/document language in EN/ES/FR plus unsupported `de` fallback, whole-catalogue parity, synthetic missing/blank/placeholder negative cases and production-fragment escaping. Identical `brand.name` across locales is intentional, not an untranslated functional label. Checklists 2.4 and 3.1 are supported by this run; no human translation review or AC02 completion claimed.

User authorised correcting the no-JavaScript oracle. Updated component cases to retain event counting only with JavaScript enabled and verify native Space pressed/released state, maintained focus after Enter, no navigation/form submission and enabled/disabled traversal in every case. Executed `python3 scripts/verify-home-browser.py`: all 12 Chromium cases passed (six components, six retained Home). Normal JAR fixture exclusion/digest and bounded cleanup verified by the runner. Checklist 2.3 complete; stronger AC01/AC02 matrices remain pending.

User authorised the fixture-only bean rename. Renamed the method to `shellFixtureFilterChain`, retaining bean-overriding protection and production security. Repeated targeted Maven verification: 15 frontend tests, 14 rendering/component Java cases and 15 packaged cases passed, zero failures/errors.

Repeated `python3 scripts/verify-home-browser.py`: the isolated fixture now starts. Nine browser cases passed (six existing Home cases and three JavaScript-enabled component cases); three JavaScript-disabled component cases failed at the test-only click counter, expected 2 but observed 0. JavaScript event callbacks do not execute with page JavaScript disabled, even though Playwright can inject evaluation code. This counter is not a valid no-JavaScript activation oracle. No evidence of a production button regression was established, and disabled/no-submission/traversal assertions after the counter were not reached in those three cases.

Apply paused on the new verification error. Proposed correction: keep click-event activation counting in JavaScript-enabled cases; in no-JavaScript cases verify native enabled/disabled/type/focus and keyboard press/release states plus no form submission/navigation/request, without pretending a JavaScript listener can run. No requirement, locale or JavaScript-disabled case would be removed. Checklist 2.3 remains unchecked.

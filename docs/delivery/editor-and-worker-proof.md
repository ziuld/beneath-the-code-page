# Editor and worker proof

F05's proof is isolated at `/__editor-fixture` in the copied test JAR, not a published tool. The normal executable denies that route and contains no fixture controller/template. Use pinned Playwright Chromium for automation and Google Chrome for manual review; Firefox/WebKit critical coverage is required separately.

## Automated checks

Build: `python scripts/verify-java-baseline.py`.
Browser: `python scripts/verify-home-browser.py --install`.
Critical editor smoke: `python scripts/verify-home-browser.py --engine firefox --install` and `python scripts/verify-home-browser.py --engine webkit --install`. These install only pinned project-local browsers, not system dependencies. Local system changes require separate approval. The default and screenshots remain Chromium; Google Chrome remains manual only.
The existing Ubuntu 24.04 browser workflow runs the full Chromium suite followed by required Firefox and WebKit editor smoke, using the CI-only `--with-deps` path. A workflow edit is not passing remote evidence; acceptance requires actual passing engine results.
The browser runner starts the normal app, the copied proof JAR and the local preference app on dynamic loopback ports; it stops them afterwards and checks the original JAR digest.

### Browser-tooling regression pin

Browser tooling is temporarily pinned to Playwright 1.63.0 and its matched engines: Chromium 153.0.8010.12/build1243, Firefox 155.0/build1543 and WebKit 26.6/build2359. The previously tested Playwright 1.64.0 WebKit 27.2/build2370 reports an internal inline-style violation for every native select, matching [WebKit bug 327212](https://bugs.webkit.org/show_bug.cgi?id=327212). Playwright 1.64.1 retains that same WebKit build.

This is a tooling-version correction under the unchanged CSP, not a fix to WebKit 27.2 or a waiver of WebKit coverage. All three engine suites remain required, with unchanged assertions. Current-engine Chromium 156 and Firefox 157 results remain recorded in evidence; the older matched versions must pass separately. Upgrade owner: Ziuld with AI assistance; reassess when a Playwright release bundles the upstream fix, rerunning the minimal select reproduction and the full three-engine gates before removing the pin. Do not treat these pinned reference browsers as a promise of current-browser security or released Safari certification.

To run a persistent manual fixture, import `scripts/verify-home-browser.py` using Python importlib, call its `component_fixture` with `target/beneath-the-code-0.1.0-SNAPSHOT.jar`, then run:

```sh
java -jar target/shell-browser-fixture.jar --server.address=127.0.0.1 --server.port=8081
```

Open `http://127.0.0.1:8081/__editor-fixture?lang=en` (also `es` and `fr`). Stop the process after review. This is an isolated local proof, not deployment.

Use the default profile for this copied proof, as the browser runner does: its extra worker assets are classpath-only. The local build-watch profile serves the normal frontend output and is not the worker-proof asset source.

## Manual acceptance

Current owner-approved scope revision, 2026-10-15: screen-reader operation and speech testing are no longer F05 acceptance requirements. The historical deferral below is superseded for screen readers only. Retain actual keyboard navigation, visible focus, 200% browser zoom, visual/EN/ES/FR copy review and automated checks. Existing semantic markup/status privacy stays unchanged; no verified screen-reader or full WCAG AA conformance claim is made. Project-wide reconciliation is proposed separately in `clarify-keyboard-accessibility-scope`.

Final owner review, 2026-10-15: after the focused request to check actual200% browser zoom and EN/ES/FR readable controls without clipping/untranslated text, the owner confirmed they tested these and everything worked well. Alongside earlier functional/keyboard feedback and passing three-engine CI, this completes the retained manual acceptance. Record this as owner-reported observation, not agent-observed speech output or translation certification. See the latest UH01/UH02 evidence sections; earlier pending/deferral statements below are historical.

On 2026-10-15 the owner reported that the presented local review worked as described and approved draft delivery for WebKit CI. Explicit browser/environment details and screen-reader use/results remain unreported; the required manual evidence is not yet complete. See `harness/evidence/F05-UH01-accessible-editor.md`.

Owner-approved sequencing: finish worker implementation and automated integration first. The remaining actual screen-reader/zoom/copy observations stay required at final F05 acceptance, not as a gate on further coding. No Orca installation is required or authorised by this deferral.

- Record browser, OS and viewport. Navigate with keyboard only; confirm label/instructions, visible focus, Escape then Tab within two seconds and reverse traversal.
- Search with Ctrl+F/Command+F. Find next/previous, replace and close. Escape closes search first; Escape then Tab leaves the editor. Retain automated verification that status messages are localised and contain no content excerpt; no spoken-output observation is required.
- Resize, select and scroll long text. Review controls at actual browser-UI 200% zoom, narrow viewport, EN/ES/FR and with JavaScript disabled. Confirm usable explanatory text and no input-submitting tool form.
- Hover editor text to show the resource-backed keyboard-help tooltip; confirm it stays readable after resizing. The same instructions remain available without hovering through the editor’s described paragraph.
- Report observed outcomes and any inaccessible search feedback, clipping, untranslated labels or CSP errors. Automated axe/keyboard checks do not establish manual acceptance.

## Limits and privacy

Input budget starts at 1 MiB UTF-8; rejected edits preserve accepted content. Transaction filtering checks the new immutable document before editor state/rendering, with bounded iteration rather than a full encoded copy. This does not bound every paste/IME allocation or all browser internals. The shared `postWorkerInput` boundary checks the same byte budget before posting/structured cloning and returns false without posting oversized content. `createWorkerManager` uses that boundary and resource-backed status callbacks; it rejects outputs above 8 MiB before updating the UI. Output checking occurs after structured cloning and does not bound worker-internal/transient allocation.

CodeMirror announcements are replaced before live-region rendering with resource-backed feedback. No content/query appears in status messages, URLs, logs or persistent storage. The document policy is unchanged; nonce authorises generated style tags, not style attributes. Evidence files, not these instructions, record actual engine/manual results and acceptance limitations.

## Worker lifecycle and isolated proof

`platform/worker-manager.ts` owns one active job with monotonically increasing IDs and a two-second monotonic deadline. Starting another job invalidates/terminates the previous worker; cancel, timeout, terminal response and disposal release the worker and timer. The next job gets a fresh worker. Unknown/obsolete/duplicate terminal responses cannot replace current output; malformed current responses and worker errors yield safe status codes, never raw errors. Disposal is idempotent and prevents subsequent UI callbacks. The caller owns translated announcements and retains accepted output on failure.

The browser runner builds `src/test/frontend/worker-proof.ts` and its synthetic worker into separate `target/worker-proof/` output. Explicit private worker metadata is merged into the copied JAR's private manifest, with namespaced fixture entries to preserve the normal lazy graph. Existing startup validation and exact immutable resource caching apply. The copied fixture alone receives its hashed proof entry; normal Maven assets/JAR/Home remain free of synthetic workers and proof routes. No new server endpoint or processing algorithm is published.

On the copied editor page, edit the existing CodeMirror input and use Run, Run busy job, Cancel and Close workspace. Additional proof-only controls exercise oversized output, errors and deliberately blocked worker network/evaluation. Those negative probes are not normal-operation privacy violations and never carry payloads. The ordinary lifecycle/privacy cases allow only expected same-origin static GETs, including scripts needed for clean worker recreation; content stays in in-memory messages. Browser response headers and blocked probes independently verify worker CSP rather than assuming document-policy inheritance.

Fake-timer/fake-worker tests cover exact deadlines, races, limits and cleanup. Real browser tests use eventual timeout/recovery observations and keyboard interaction, not a precise two-second wall-clock expectation. Console measurements use synthetic 51-byte input and record browser project/logical CPU count; they include automation overhead and are not hardware-independent performance guarantees. Normal-JAR exclusion, original JAR digest and B bytes remain separate checks.

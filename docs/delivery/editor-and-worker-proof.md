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
java -jar target/shell-browser-fixture.jar --server.address=127.0.0.1 --server.port=8081 --spring.profiles.active=local
```

Open `http://127.0.0.1:8081/__editor-fixture?lang=en` (also `es` and `fr`). Stop the process after review. This is an isolated local proof, not deployment.

## Manual acceptance

On 2026-10-15 the owner reported that the presented local review worked as described and approved draft delivery for WebKit CI. Explicit browser/environment details and screen-reader use/results remain unreported; the required manual evidence is not yet complete. See `harness/evidence/F05-UH01-accessible-editor.md`.

- Record browser, OS, screen-reader/version and viewport. Navigate with keyboard only; confirm label/instructions, visible focus, Escape then Tab within two seconds and reverse traversal.
- Search with Ctrl+F/Command+F. Find next/previous, replace and close. Escape closes search first; Escape then Tab leaves the editor. Confirm the screen reader announces a localised search result/line number without reading a content excerpt from the live region. Normal reading of selected content is not prohibited.
- Resize, select and scroll long text. Review controls at actual browser-UI 200% zoom, narrow viewport, EN/ES/FR and with JavaScript disabled. Confirm usable explanatory text and no input-submitting tool form.
- Hover editor text to show the resource-backed keyboard-help tooltip; confirm it stays readable after resizing. The same instructions remain available without hovering through the editor’s described paragraph.
- Report observed outcomes and any inaccessible search feedback, clipping, untranslated labels or CSP errors. Automated axe/keyboard checks do not establish manual acceptance.

## Limits and privacy

Input budget starts at 1 MiB UTF-8; rejected edits preserve accepted content. Transaction filtering checks the new immutable document before editor state/rendering, with bounded iteration rather than a full encoded copy. This does not bound every paste/IME allocation or all browser internals. The shared `postWorkerInput` boundary checks the same byte budget before posting/structured cloning and returns false without posting oversized content. Its caller must announce a resource-backed limit status; the later worker manager must use this boundary. Actual worker integration, 8 MiB output budget and two-second worker lifecycle remain pending F05-UH02 work.

CodeMirror announcements are replaced before live-region rendering with resource-backed feedback. No content/query appears in status messages, URLs, logs or persistent storage. The document policy is unchanged; nonce authorises generated style tags, not style attributes. Worker response policy, three-engine/runtime accessibility evidence and final acceptance are not claimed by these instructions.

# Final browser review

F19 checks the retained suite across Chromium, Firefox and Linux WebKit, with
separate real-Safari evidence or an explicit pending limitation. Current results,
versions, defects and candidate identity belong in
[F19 evidence](../../harness/evidence/F19-browsers.md), not historical V1 reports.

## Run the retained suite

Build once and stop the verified preview before rebuilding. Never rebuild while
packaged browser tests run. From the project root, with pinned browser caches:

```sh
python3 scripts/verify-home-browser.py --engine chromium
python3 scripts/verify-home-browser.py --engine firefox
python3 scripts/verify-home-browser.py --engine webkit
```

Every engine now selects the full suite. `--grep 'pattern'` supports focused defect
investigation; final acceptance uses an unfiltered run. Individual test and worker
deadlines remain unchanged. The outer suite allowance is five minutes to cover
all completed tools and shared journeys. Engines run sequentially because the
existing harness owns shared fixture/result paths. Preserve each engine report
and log before starting the next one.

## Optional local WebKit libraries on this host

The pinned WebKit2359 WPE binary on this Linux x86_64 host needs ICU74, libxml2.so.2
and Flite. This helper supplies exactly those demonstrated dependencies in target:

```sh
python3 scripts/prepare-webkit-local.py
BTC_WEBKIT_EXECUTABLE="$PWD/target/f19-webkit-runtime/webkit" python3 scripts/verify-home-browser.py --engine webkit
```

It verifies pinned SHA256 values from official Ubuntu Noble package indexes,
extracts shared libraries only and never runs package installation scripts. Its
launcher sets library paths for that test process. No sudo, system installation,
Docker access, global environment changes or application dependency is required.
It is specific to this pinned Linux browser revision; re-evaluate it when updating
Playwright. Hosts with the required native libraries use the ordinary command.

## Native Chromium zoom

The standalone review uses an isolated temporary Chromium profile and extension
to call the browser's native `tabs.setZoom/getZoom` at200%. It checks all13 routes
in EN/ES/FR, final font layout, reflow, full control visibility and unobscured focus.
The browser reports zoom2, devicePixelRatio2 and CSS zoom1; no viewport emulation
or CSS zoom substitutes for browser zoom. Screenshots capture the native viewport
through CDP because Playwright's normal screenshot clip is incorrect at tab zoom.
The temporary profile/extension is removed; the user's browser is untouched.

```sh
export PLAYWRIGHT_BROWSERS_PATH="$PWD/target/browser-cache"
export BTC_BASE_URL=http://127.0.0.1:39793
cd tests/e2e
../../target/frontend-tooling/node/node native-zoom.mjs
```

Use the actual current loopback preview URL from the handoff. Outputs:
`target/f19-native-zoom.json`, `target/f19-zoom-*.png`.
Method references: [Chromium tab zoom](https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom)
and [Playwright isolated extension testing](https://playwright.dev/docs/chrome-extensions).

WebKit automation is not real Safari review. Record the Apple device, OS and
Safari version separately when actually reviewed. Do not infer owner observations,
Safari compatibility, full WCAG conformance or screen-reader support from automation.

# Home page — F03-UH01

Home is semantic Thymeleaf SSR at `/`, with translated EN/ES/FR copy selected from the request's supported `Accept-Language`, otherwise English. GET does not persist a preference. Full language switching and locale-precedence policy remain later slices.

Only Home is published. Tools and learning descriptions remain visible without actionable links. Publishing a destination requires updating the code-owned `HomeNavigation` descriptor together with a real mapped/public route and a test following the rendered link. Tests use isolated routes, not production placeholders.

The B composition is an unchanged copy of `docs/reference/logo-composition-original.png`. No standalone/vector mark is invented. Shared dark-theme styles use system serif/sans stacks; licensed font selection and broader shared components remain open. Essential text uses contrast-checked roles rather than the decorative muted palette.

## Reproduce checks

From the repository root:

```bash
python3 scripts/verify-java-baseline.py clean
python3 scripts/smoke-java-baseline.py
python3 scripts/verify-home-browser.py --install
```

Maven installs the pinned Node/npm before browser tooling is used. Browser tooling has its own exact dependency lock in `tests/e2e`, separate from production frontend code. The runner installs locked tooling and Chromium into project-local ignored directories, launches the normal executable JAR on a dynamic loopback port, waits at most 30 seconds and stops its server even if tests fail. Later runs can omit `--install`; rerun it after Maven clean, which removes the project-local browser cache.

Local installation never invokes sudo. On an unsupported host/missing OS library, record a blocked browser check and obtain approval before privileged installation. The CI-only `--with-deps` option installs Chromium's OS dependencies on the ephemeral Ubuntu runner. No browser binaries enter the JAR.

Browser output is under `target/`: JSON results, failure traces/screenshots, narrow-view/zoom screenshots and server log. Chromium verifies JavaScript-disabled Home in all three languages, unchanged served logo bytes, absence of unpublished links/forms, same-origin read requests, keyboard/focus, 320 CSS-pixel reflow, 200% CSS layout zoom and additional 200% text enlargement, contrast and reduced motion. CSS layout zoom enlarges the rendered layout; it is not device-scale-factor scaling or browser-UI zoom. Automated checks do not establish independent actual browser-UI zoom review; use the recorded owner evidence for that result. Historical assistive-technology observations remain unclaimed. Under the owner's later project-wide scope decision, screen-reader compatibility/manual speech testing are excluded, not a remaining manual acceptance gate; see the quality plan.

## Security boundary

Anonymous GET/HEAD is allowed for Home, `/assets/**`, the exact B image and health smoke. Other routes/methods are denied; security filters and CSRF remain active. No login, account, preference POST or payload endpoint exists. See [ADR 005](../architecture/adr-005-home-page-boundary.md). This slice does not claim F04's broader CSP, preference-cookie, request-limit or logging acceptance.

Remote CI and owner visual/translation acceptance must be recorded separately from local automated verification. F03-UH02 and F04 remain unfinished.

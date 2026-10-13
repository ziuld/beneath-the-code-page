# Design

## Context

See [proposal.md](proposal.md) for motivation and [the delta](specs/home-page/spec.md) for the exact behavioural contract.

Inspection found a Java 25 / Boot 4.1.1 Maven application, MVC/Security/Thymeleaf dependencies, root bootstrap class and F02's production/local asset resolver. Production has no page controller, template, message bundles, explicit SecurityFilterChain or published tools/learning destination. The site entry imports only the one-line shared CSS layer. Existing Failsafe tests assemble isolated SSR fixtures, exercise real executable processes and preserve the normal JAR; the original health smoke expects HTTP 200/UP. Java CI has SHA-pinned actions/read-only credentials but no browser job or Playwright dependency. F02 is done in the tracker and backed by local integration evidence; no application tests were rerun for this proposal.

The supplied `docs/reference/logo-composition-original.png` is the complete B/wireframe raster. Brand application permits this composition but forbids inventing a standalone/vector master. Exact font families/licences remain open. Existing generic ArchUnit layer/capability predicates can cover a new site inbound adapter without adding artificial core packages.

## Goals / Non-Goals

**Goals:**
- A real anonymous Home response usable without JavaScript, including the approved image, semantic landmarks, a single main heading and tools/learning descriptions.
- Reuse asset resolution, translation resources and a small shared visual vocabulary; make publication-aware links testable without implementing the destination products.
- Preserve packaged/local asset validation and build-watch tests while adding real-page browser evidence.

**Non-Goals:**
- No complete component library, preference form, language selector, custom locale-precedence policy, course/tool catalogue use cases, editor, payload processing or SPA.
- No broad F04 baseline, deployment, global tooling/configuration change, or automatic behavioural-ownership migration.

## Decisions

### 1. Static product page in the site inbound web adapter

Place the Home controller and small immutable view/navigation models in `site.adapter.in.web`; use `templates/home.html` and only the shared fragments needed by this page. No domain/application service or core port is needed for static editorial content. Keep the root application class and inward dependency direction unchanged, and record the site-package/minimum-security responsibility decision in an ADR during implementation.

Alternative: placing Home in `platform` would hide product content in a technical concern; placing it in `tools` would misrepresent its learning/brand responsibility. A new module or generic page framework is unnecessary.

### 2. Explicit publication metadata, not speculative links

Use code-owned, immutable descriptors for the known `/`, `/tools` and `/learn` destinations. Initially only Home is published; unavailable sections have translated descriptions/status text and no actionable `href`, click handler or fake disabled link. Published paths are fixed same-site paths, not user input or arbitrary configuration. Publication metadata must agree with real GET mappings and the public route policy, verified by integration tests; a boolean alone is not evidence of publication.

T04 tests use isolated test-only mapped destinations and publication metadata to demonstrate the actual link replaces the unavailable state and follows to HTTP 200. They must exercise the same production navigation rendering code, not a separate fake template. Production must not acquire placeholder `/tools` or `/learn` controllers. Future destination features repeat the real-route assertion when published; this slice claims fixture-proven transition, not completion of those products.

Alternative: always emitting future URLs fails R02; probing URLs during rendering introduces unnecessary requests and failures. Runtime scanning of unrelated adapters is unnecessary coupling.

### 3. Minimum shared styling and resource-backed copy

Extend the existing design-system CSS layer with only Home's tokens, layout, navigation/footer and section/card states. Preserve approved dark/serif/sans visual direction with system font stacks, role-appropriate contrast, visible focus, skip navigation and responsive/zoom-friendly layout. Copy the supplied logo unchanged to a specific author-owned static brand resource and verify its bytes; never crop/redraw it into an alleged standalone mark. Keep its busy background separate from essential text.

Add UTF-8 `i18n/messages.properties`, `messages_es.properties` and `messages_fr.properties` for every Home title, description, navigation/status label, metadata and accessible image/control text. Use escaped Thymeleaf message expressions, set the document language and prevent host-locale fallback. Verify Home key/placeholder parity and rendered request locales with existing Spring locale facilities; do not implement F04's custom cookie/country/explicit-language precedence. Full shared-shell language switching remains F03-UH02 work. Reuse `AssetManifest.site()` for scripts, stylesheets and preloads; local renders must still reload generated references.

### 4. Bounded anonymous access is required page integration, not full F04

The current generated Security default blocks anonymous pages, so the Home acceptance test cannot authenticate artificially. Add the minimum explicit route policy for GET/HEAD `/`, hashed `/assets/**`, the exact logo path and the existing health smoke endpoint. Preserve error dispatch handling, deny unlisted routes/methods and retain CSRF/security filters; do not ignore static resources or globally permit requests. No preference POST, login/account surface, session-based feature, custom CSP/nonce pipeline or request/logging baseline is added here. Verify the exact method/route matrix, absence of a login redirect for Home and preservation of health smoke.

Existing `/__asset-fixture` SSR tests currently use synthetic Basic credentials. If the bounded production policy denies that unpublished test path, adapt only the isolated fixture JAR's copied test configuration to allow its authenticated route. Do not add a production test-profile exemption, public fixture route or alter negative manifest-startup tests. Explicit fixture configuration must be absent from the normal distributable.

### 5. Browser proof against the unmodified executable JAR

Add project-local `@playwright/test` **1.64.0** as a proposed exact pin: npm's published latest metadata observed during planning reports Node `>=20` and matching `playwright` 1.64.0, compatible with the pinned Node 24. Reconfirm/pin the lockfile and bundled browser revision during implementation; no install occurred here. Use Chromium with JavaScript disabled for canonical AC01, plus page-level keyboard/reflow/contrast and EN/ES/FR checks. Keep tests under `tests/e2e`; scripts invoke pinned local binaries, start the packaged app on loopback and stop it with bounded timeouts. Missing browser/system dependencies are a blocked check, not permission to skip the browser assertion or run local sudo unasked.

Keep Maven verification responsible for frontend/JVM/Failsafe checks. Add a separate packaged-browser CI job that builds the normal JAR and runs the same browser suite, preserving SHA pins, read-only permissions and no persisted credentials. Browser downloads/installations are test tooling, never JAR contents or committed binaries. Verify only same-origin page/asset requests and no accidental form submission for this static page; do not claim future tool-payload privacy or full F04/CSP compliance.

## Risks / Trade-offs

- [First public route intersects F04] → Limit changes to the explicit Home/resource/health route matrix, document that boundary and leave F04 tasks/status untouched.
- [Published metadata diverges from route/security reality] → Test unavailable, partially published and fully mapped/public fixture states; follow every emitted section link and fail on a missing/denied destination.
- [New security wiring breaks prior fixture tests] → Keep fixture-only access in copied test configuration; inspect normal JAR and rerun all F02 regressions, including successive watch builds.
- [Home looks complete while broader shell is unfinished] → Verify inherited quality for implemented elements only; leave F03 and F03-UH02 open and disclose unexecuted human-review checks.
- [Logo/font constraints] → Preserve supplied raster bytes, use system fonts, inspect responsive legibility; no new licensed assets assumed.
- [Browser dependencies or owner translation/visual review unavailable] → Record the actual blocker/limitations and retain in_review status; estimates are not evidence of completion.
- [IDE/CLI write contention] → Retain F02's m2e lifecycle instruction and owner-approved workspace auto-build setting; do not broaden writable roots or change global editor settings.

## Migration Plan

After a separate apply request, implement the smallest Home slice, add test/tooling configuration, then run clean Maven verification, packaged health/browser tests and planning gates. Keep baseline/forecast effort and all canonical IDs unchanged; record actual effort only if supplied. Integration/final owner acceptance and authorised commit references are required for story closure. This proposal does not synchronise a main spec or edit plan-owned behavioural text. Use ADR 004's explicit single-owner migration workflow only if separately authorised at final acceptance/archive.

No deployment/data migration exists. Rollback consists of an authorised revert of the eventual bounded Home/tooling/security additions; preserve completed F02 assets, local watch behaviour and archived specifications.

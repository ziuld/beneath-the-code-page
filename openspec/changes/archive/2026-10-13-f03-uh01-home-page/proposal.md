# Proposal

## Why

F02 is complete, but the application has no public Home page explaining Beneath the Code. Visitors need a usable server-rendered introduction that does not advertise destinations which have not been published.

## What Changes

- Implement **F03-UH01 only**, retaining F03-UH01-R01/R02, AC01/AC02 and T01–T05 from `docs/planning/plan.json`; retain the 8h baseline without double-counting checklist subdivisions.
- Add semantic Home content, a small reusable navigation/footer and the approved B composition, using the shared design-system CSS and EN/ES/FR message keys.
- Render tools/learning descriptions without actionable links while their destinations are unavailable; test the transition when an actual mapped destination is published in an isolated fixture.
- Integrate existing packaged/local manifest references into the real page. Allow anonymous Home and its required static GET/HEAD resources through a bounded security configuration, preserving health smoke and rejecting unlisted access; do not disable security filters or CSRF globally.
- Verify rendered HTML, actual packaged browser behaviour with JavaScript disabled, navigation/publication states and page-level inherited responsive/accessibility/resource checks.
- Exclude F03-UH02's full shared-shell/language-switching slice, F04's locale-preference/CSRF/header/request-limit baseline, product tool/course pages, editors, SPA routing, accounts and publication.

## Capabilities

### New Capabilities

- `home-page`: Describe the site's tools/learning purpose in semantic SSR content and expose only published navigation destinations.

### Modified Capabilities

None. `packaged-browser-assets` is reused without changing its requirements.

## Impact

Expected additions: a site web adapter, Home template/fragments, message resources, minimum shared CSS tokens, served copy of the supplied logo and bounded public-route security wiring. Java MVC/Security/Thymeleaf and F02 asset/watch regressions remain in the same Maven application. Browser verification needs pinned project-local Playwright tooling and a separate packaged-app CI job; no browser runtime dependency enters the JAR.

The supplied image is a complete raster composition; no clean standalone/vector mark or licensed font master exists in the inspected files. Preserve that image and use system font stacks unless separately approved assets become available.

This is planning only. F03-UH01 remains plan-owned until an explicitly authorised ownership migration; the delta is a proposal, not a second independent editable backlog. No application code, plan status, commit, deployment or remote publication is changed by this proposal.

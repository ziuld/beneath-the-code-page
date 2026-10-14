# Proposal

## Why

F03 is accepted and archived, but visitors cannot retain a chosen language and the public-page security configuration is only the minimum Home boundary. Complete F04 as one cohesive change so the existing SSR application has a stateless language-preference flow and an evidenced secure HTTP baseline before F05's editor proof.

## What Changes

- Deliver both F04-UH01 (choose and retain interface language) and F04-UH02 (bounded requests and safe responses), preserving their four requirement IDs, four acceptance IDs and ten canonical task IDs.
- Replace header-only localisation with explicit `lang`, cookie, weighted Accept-Language, trusted configured country and English precedence; add an accessible EN/ES/FR server-rendered selector.
- Add CSRF-protected `POST /preferences/language`, a language-only cookie and allowlisted same-site redirects without server sessions.
- Extend the existing route/method allowlist and apply CSP, per-HTML-response nonces, cache policy, other documented headers, bounded preference bodies, safe localised errors and privacy-preserving HTTP diagnostics.
- Verify real GET-to-POST browser flow, rejection paths, streamed bodies, production cookie/HSTS policy and regressions; map applicable controls to an exact ASVS release without claiming certification.
- Out of scope: F05 editor/worker runtime proof, tool or learning pages, accounts, database, deployment, container work, geolocation, external reporting, broad CI/governance changes and automatic behavioural-ownership migration.

## Capabilities

### New Capabilities

- `locale-preferences`: supported locale resolution, accessible preference submission, cookie persistence and forged-change rejection (F04-UH01).
- `secure-http-responses`: public route/method policy, response protections, bounded request handling and safe errors/diagnostics (F04-UH02).

### Modified Capabilities

None. Existing Home, shared-interface and packaged-browser-assets requirements remain unchanged and are regression obligations. Adding the selector uses the shared interface rather than redefining its localisation or focus contract.

## Impact

Affected areas are `platform.web.i18n`, `platform.web.security`, new `platform.web.error`/bounded diagnostic support where needed, `templates/fragments/shell.html`, error templates, EN/ES/FR resources, shared form styles and application configuration. Tests extend Java MVC/security and packaged HTTP coverage plus `tests/e2e` and its existing packaged-app runner. Reuse Boot-managed MVC/Security/Thymeleaf APIs and pinned tooling; no new runtime dependency is planned.

`docs/planning/plan.json` remains authoritative for F04 behaviour and tracking until explicit adoption. This proposal is a proposed delta, not completed behaviour; F04 and both stories remain planned. Its implementation requires a separate apply request. No commit, push, release, archive or main-spec edit is authorised by this planning request.

# ADR 005 — Static Home adapter and minimum public-route policy

Date: 2026-10-13. Status: accepted for implementation through the explicit apply request for `f03-uh01-home-page`; product acceptance remains pending.

## Context

F03-UH01 introduces the first public page. Static product/brand content does not belong in a technical platform package or require an artificial application service. Generated security defaults require authentication and cannot satisfy anonymous Home acceptance.

## Decision

Use `dev.beneaththecode.site.adapter.in.web` for Home and its immutable view/navigation descriptors. Keep shared technical asset, locale and security wiring in platform; preserve inward dependency direction and the root entry point.

Publish only Home. Code-owned descriptors keep tools/learning descriptive and non-actionable until an actual public route is tested. Fixtures demonstrate publication transition without shipping placeholder product pages.

Add the bounded read-route security policy required by Home: GET/HEAD Home, hashed assets, exact logo path and existing health smoke; necessary error dispatch; deny other routes/methods. Disable login/basic/logout/request cache, retain filters/CSRF and use stateless sessions. This is minimum integration, not F04 preference, CSP, limits, logging or broader security acceptance.

## Consequences

No new module, port or domain service. Generic architecture rules now select the real site adapter. Real-page tests cover anonymous access; full shared-shell and F04 tasks remain open.

The normal executable now denies unpublished fixture/private-manifest paths with 403 rather than authenticated 404. The manifest remains unserved. Existing isolated asset fixture retains authenticated 404 checks through a higher-priority chain copied only into that test JAR; no production test-profile bypass exists. Hashed asset private-manifest probes still return 404.

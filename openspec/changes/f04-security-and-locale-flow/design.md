# Design

## Context

See `proposal.md` for motivation and the two delta specs for behaviour. F03 is done in the canonical plan; F04 and its stories are still planned. The accepted architecture is a single Java 25/Spring MVC/Thymeleaf application, with no domain/application framework dependencies and no payload-processing HTTP API.

Observed implementation:

- `HomeLocaleConfiguration` installs an EN/ES/FR `AcceptHeaderLocaleResolver` with English fallback; preference handling is explicitly deferred to F04.
- `PublicPageSecurity` permits GET/HEAD Home, `/assets/**`, the approved logo and health, permits internal ERROR dispatch, denies all other requests and disables login/basic/logout/request cache with stateless session policy.
- Home supplies its resolved language to `<html lang>`; `fragments/shell.html` has native navigation but no selector. UTF-8 EN/ES/FR resources and a shared design system already exist.
- `HomeSecurityTests` deliberately expects 403 for unlisted routes. Unknown application identifiers are not yet published. A 404 can be tested with a missing resource within `/assets/**`; F04 must not globally permit arbitrary routes to manufacture a 404.
- `LocalAssetWebConfiguration` serves fresh local filesystem assets with no-store. Preserve this F02 contract; immutable caching applies only to successful non-local hashed assets.
- `PackagedAssetsIT` exercises executable JARs, isolated fixture copies, startup rejection and successive real watcher rebuilds. `verify-home-browser.py` launches normal and shell-fixture JARs on dynamic loopback ports; fixtures must remain outside the normal distributable.

## Goals / Non-Goals

**Goals:** A small platform-owned solution with bounded form handling before framework parsing, one locale decision per request (including security errors), and real packaged evidence where MockMvc cannot prove connector behaviour. Keep the two stories ordered in one change, with final integration covering both.

**Non-Goals:** No artificial business use cases or ports for technical preference handling, no JavaScript requirement for selection, no external geolocation/proxy integration, no permissive global routing, no generic observability framework. F04 supplies document CSP/nonce infrastructure; F05 retains CodeMirror and worker response-policy/browser proof. Preserve the current health endpoint boundary; later runtime management isolation is not implemented here.

## Decisions

### 1. Platform locale resolution and exact supported preference values

Replace the header-only resolver with platform i18n resolution shared by MVC and error rendering. Parse a single canonical `lang` or cookie value (`en`, `es`, `fr`); ignore absent, invalid or ambiguous request candidates. For Accept-Language, use bounded standards-aware parsing, match regional tags to supported base languages, exclude q=0 and resolve equal weights by original order. A wildcard alone supplies no preference. Country is optional typed server configuration only: ES→es, FR→fr, otherwise en. Never read country request headers.

Resolve query/cookie/header/config inputs before rendering, without parsing a POST body merely to select a locale. Expose the resolved language consistently on normal and error requests. Avoid divergent resolver and security-error implementations. The alternative, a stock cookie resolver plus interceptor, does not alone express the full precedence or safely unify pre-controller rejection rendering.

### 2. Native shared selector and cookie-backed masked CSRF

Add a labelled native select and explicit submit button to the existing shell, backed by EN/ES/FR messages and shared focus/form styling. Render the active selection, hidden masked CSRF token and exact current published return path. Retain the approved B bytes and unpublished navigation state. Do not nest future tool controls inside this form.

Use Spring Security's cookie CSRF repository and XOR-masked request-token handling; retain deferred token loading and cause it to materialise when rendering the form. Use HttpOnly CSRF cookies because no JavaScript needs to read them. Apply Path=/, SameSite=Lax, no Domain and Secure outside explicitly local HTTP to both cookies; the language cookie alone gets Max-Age=31536000 and contains only the supported code. Do not use the raw cookie token as the submitted token and do not disable CSRF for this POST. No session-backed token repository.

Preference POST validates a single supported form language and sets its cookie only after CSRF validation. Unsupported/missing/repeated language produces 400 with no mutation. A successful POST uses 303. Redirects accept only exact code-owned published page paths (currently `/`), not an arbitrary relative URI or Referer; invalid, repeated or absent targets fall back to `/`. Reject query/fragment/encoded/scheme-relative forms from this allowlist, so an explicit GET `lang` cannot defeat the saved cookie. Future real pages can deliberately extend the same small publication boundary; do not introduce a general catalogue abstraction now.

Alternative: client-side persistence or GET preference mutation would violate stateless SSR, storage and CSRF contracts.

### 3. Extend one production security chain; keep deny-by-default

Add only the preference POST to the existing production chain and retain filtered resources, disabled login/basic/logout/request cache and STATELESS sessions. Allow ERROR dispatch, not direct public `/error`. Keep existing denial statuses; update tests only for deliberately added POST behaviour. Reuse safe handlers for authentication-entry/access-denied errors rather than redirects. Do not enable a CORS API or broad method exceptions.

The alternative of permitting all GET requests to simplify error pages weakens the publication boundary and conflicts with the accepted Home tests.

### 4. Document CSP, response headers and precise cache rules

Generate at least 128 bits of SecureRandom nonce entropy for each HTML response; keep it as a server request attribute, including error dispatch, and use the identical value in the CSP. Separate requests get fresh values. No inline scripts/styles are required on Home; availability of a nonce is groundwork, not a reason to add inline content.

Install the exact accepted CSP plus nosniff, DENY, no-referrer and restrictive Permissions-Policy. Apply no-store to HTML and errors, including preference rejection/redirect responses. Override default blanket cache headers only for successful manifest-backed non-local hashed assets; keep local/watch assets no-store and never cache resource errors as immutable. Expose no external reporting endpoint. HSTS is one year only for non-local secure requests, with neither subdomain nor preload directives.

Non-local configuration requires Secure cookies even if accidentally served via HTTP; only an explicitly local configuration permits insecure cookies. Default forwarded-header handling remains disabled. Test spoofed Forwarded/X-Forwarded-Proto values rather than trusting every proxy. Public TLS/proxy deployment is out of scope.

Alternative: unsafe-inline or blanket public caching is not acceptable. Any later CSP relaxation needs evidence and an accepted ADR; none is proposed here.

### 5. Bound actual bytes before CSRF/form parsing

Install one deliberately ordered request-boundary filter before the security chain for exact preference POST requests. Reject unsupported media types with 415, declared length above 4096 with 413, and otherwise read no more than 4097 bytes to detect unknown-length/chunked overflow. For an accepted bounded UTF-8 URL-encoded form, expose a single parsed parameter map/replayable input through a wrapper; neither the container nor CSRF handler may trigger unbounded original form parsing. Merge query/form parameters without losing multiplicity so ambiguous submissions cannot become a silently selected value. Malformed encoding yields safe 400. Bound errors and do not include failed values in exceptions.

Apply size/media-type checks before CSRF inspection; therefore an oversized or unsupported POST is 413/415 even without a token, while an in-budget supported form with invalid CSRF is 403. Denied routes/methods do not trigger body parsing. Configure Tomcat's 16 KiB request-header cap and compatible form/swallow limits as defence in depth, not as the sole body limiter. Do not drain arbitrarily large rejected streams. Connector-level header rejection status/translation is not promised.

Alternatives: Content-Length alone misses streaming bodies; MVC validation is too late; a wrapper intercepting only `getInputStream` does not necessarily intercept servlet parameter parsing. Verify the selected ordering and parameter access against the pinned Boot/Security APIs during the focused implementation task.

### 6. Safe errors and bounded HTTP diagnostic events

Use one minimal error rendering policy for filter rejections, MVC errors and internal error dispatch. Error templates reuse existing assets/shared styling and EN/ES/FR resources, preserve statuses and escape text; they do not render exception messages or request values. Error pages omit the preference form/token rather than materialising CSRF state during rejection; keep a safe Home link and accessible error heading. Non-HTML clients receive only safe status/error codes. Rendering must tolerate an error before controller model population without recursive dispatch failure.

Disable stack trace/message/binding-detail disclosure and raw access/request logging. If recording HTTP events, use server-generated IDs, a fixed normalised route or unmatched marker, status, elapsed time and event codes only. Do not attach raw exception objects or interpolate query, path, cookie, header, form or token data. Scope any new platform observability support to these bounded events; metrics, log pipelines and runtime retention belong to later work.

Alternative: Boot's unconstrained default error payload and exception logging are not evidence of the required privacy contract. Safe 500 verification uses an isolated test-only controller/JAR fixture, never a production failure route.

### 7. Evidence and control mapping

Use MockMvc for deterministic locale matrices, masking/cookie combinations, headers, statuses and spoofed secure-request policy. Use real executable HTTP integration tests for declared-length/chunked streams, connector header caps, sentinel-free logs, package exclusion and normal asset behaviour. Browser tests must obtain the real token via GET, submit natively and inspect the resulting cookie/language with JavaScript both on and off. Extend the existing runner to exercise explicit local-HTTP preference configuration and separately retain non-local packaged checks; if activating `local` changes asset serving, do not mislabel that browser run as proof of packaged classpath resources.

Select **OWASP ASVS 5.0.0**, verified against its official tagged release: https://github.com/OWASP/ASVS/tree/v5.0.0 . During verification, map exact version-prefixed control IDs from that release to real test/evidence references; document partial, deferred and inapplicable controls (especially accounts/authentication and storage). Do not invent control IDs or claim a complete ASVS level/certification. No runtime dependency follows from this documentation choice.

## Risks / Trade-offs

- [CSRF masking/deferred-token API behaviour varies by framework version] → Verify on the pinned build through a real GET→POST round trip; never replace browser evidence with `.with(csrf())` alone.
- [A bounded-body wrapper can bypass normal parameter semantics or read too late] → Test query/form duplicates, malformed UTF-8, exact byte boundaries and streaming traffic; prove the wrapper is invoked before token/parameter parsing.
- [Secure cookies fail on non-local plain HTTP] → Use explicitly local configuration for local browser acceptance, separately verify secure defaults and HSTS; no production HTTP compatibility relaxation.
- [Multiple isolated fixture security chains bypass production header filters] → Keep fixtures narrow and test production responses on the original JAR; make fixture integration changes only where necessary and verify no fixture leaks.
- [Safe errors need locale/assets before controllers run] → Reuse platform resolution and bounded model support, and test early filter, missing-asset and isolated 500 paths in all languages.
- [Additional selector affects the accepted layout] → Repeat keyboard, contrast, reflow, actual browser 200% zoom and owner copy/visual review; automated checks do not fabricate human acceptance.
- [The 14-hour baseline is not proof of effort or completion] → Retain canonical estimates; record actual owner effort only when reported, and disclose any measured reforecast.

## Migration Plan

After a separate apply request, implement UH01 and prove its behaviour, then UH02 and full integration. UH01 closure can wait for this change's combined security regression rather than mark a story done prematurely. No database or stored-state migration exists; the new language cookie is the only preference state and GET remains non-mutating.

Retain F04 plan-owned behavioural tracking throughout implementation; delta scenarios refine the accepted architecture without replacing the tracker automatically. Record execution evidence per story, update canonical task/story/feature status only against real results and owner acceptance, regenerate both planning views and run planning validation. Main-spec sync/archive and behavioural adoption remain separate decisions. Rollback, if requested, is a coherent reversal of this slice with tracking updated; existing clients' language cookies can simply be ignored by the earlier resolver. No push or deployment follows automatically.

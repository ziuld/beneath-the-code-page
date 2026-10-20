# Spec Delta

## MODIFIED Requirements

### Requirement: F04-UH02-R01 — Apply the documented response security policy

When Beneath the Code serves an HTML page, it SHALL apply the documented response security policy. It SHALL allow only published GET/HEAD routes and learning GET/HEAD lookups, required assets, health and CSRF-protected preference POST, deny other routes/methods, and permit necessary internal error dispatch. HTML and errors SHALL be non-cacheable and safe; non-local hashed public assets SHALL be immutable. Security handling SHALL NOT create sessions, login redirects or sensitive diagnostics.

#### Scenario: F04-UH02-AC01 — Protect an ordinary page

- **GIVEN** the app uses the Phase 1 security configuration
- **WHEN** a visitor requests a published page
- **THEN** the response has the configured CSP, framing, referrer and content-type protections
- **AND** HTML has Cache-Control: no-store and Permissions-Policy disables camera, microphone and geolocation

#### Scenario: Enforce the baseline CSP and per-response nonce

- **WHEN** two HTML responses, including an error page, are served
- **THEN** each carries its own cryptographically random nonce in `style-src`, available to trusted server-rendered content
- **AND** the CSP is `default-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'nonce-{responseNonce}'; style-src-attr 'none'; img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`
- **AND** X-Content-Type-Options is nosniff, X-Frame-Options is DENY and Referrer-Policy is no-referrer
- **AND** existing Home assets and the native preference form work without an unsafe-inline or unsafe-eval exception

#### Scenario: Keep access bounded and resources filtered

- **WHEN** anonymous GET/HEAD requests target Home, required public assets, the approved logo or `/actuator/health`
- **THEN** they remain available through the security filters without login redirects or JSESSIONID
- **AND** only POST is allowed for `/preferences/language` and requires a valid CSRF token
- **AND** unlisted routes outside the reserved learning shapes, unpublished tools, direct `/error` requests and other methods remain denied with safe 403 responses
- **AND** GET/HEAD `/learn`, `/learn/java-fundamentals` and `/learn/java-fundamentals/{lessonSlug}` (one path segment only) reach publication-aware lookup; missing/unpublished content and an empty learning catalogue return safe localised 404 without exposing draft lessons
- **AND** this exception does not allow `/learn/**`, arbitrary course paths, nested lesson paths or body-bearing learning methods
- **AND** necessary internal error dispatch can render a safe error and the private asset manifest remains unavailable

#### Scenario: Distinguish HTML and hashed-asset cache policies

- **WHEN** a visitor requests HTML, an error response or a successful version-hashed public asset
- **THEN** HTML and errors use no-store while successful non-local hashed public assets use `public, max-age=31536000, immutable`
- **AND** local build-watch assets retain their existing no-store policy
- **AND** neither cookie-dependent HTML nor asset failures are cached as immutable

#### Scenario: Restrict HSTS and forwarded-header trust

- **WHEN** responses are produced over non-local HTTPS, local HTTP or non-local HTTP
- **THEN** HSTS with max-age=31536000 is issued only for non-local HTTPS, without includeSubDomains or preload
- **AND** untrusted forwarded headers cannot alter effective scheme or security policy

#### Scenario: Return localised safe errors without exposing request data

- **GIVEN** a missing resource within an allowed route, a denied request or an isolated test-only server failure
- **WHEN** the application returns 404, 403 or 500 respectively in EN, ES or FR
- **THEN** it retains the actual status and provides escaped resource-backed error content without raw paths, queries, preference values, cookies, tokens, stack traces or exception messages
- **AND** any non-HTML error representation is equally non-disclosing and does not redirect to login
- **AND** application HTTP diagnostics contain only bounded event metadata such as a server-generated request ID, normalised route and status, not raw request data

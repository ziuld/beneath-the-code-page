# secure-http-responses Specification

## Purpose

Protect the public server-rendered application through explicit HTTP access rules, response security policy, bounded preference requests and non-disclosing errors and diagnostics.

## Requirements

### Requirement: F04-UH02-R01 — Apply the documented response security policy

When Beneath the Code serves an HTML page, it SHALL apply the documented response security policy. It SHALL allow only published GET/HEAD routes, required assets, health and CSRF-protected preference POST, deny other routes/methods, and permit necessary internal error dispatch. HTML and errors SHALL be non-cacheable and safe; non-local hashed public assets SHALL be immutable. Security handling SHALL NOT create sessions, login redirects or sensitive diagnostics.

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
- **AND** unlisted routes, unpublished tools/learning pages, direct `/error` requests and other methods remain denied with safe 403 responses
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

### Requirement: F04-UH02-R02 — Reject oversized requests without content disclosure

If a request exceeds the allowed body size, then Beneath the Code SHALL reject it without returning or logging its content. Preference POST bodies SHALL be limited to 4 KiB of actual bytes before form or CSRF parsing, including unknown-length streams; request headers SHALL be limited to 16 KiB. Only URL-encoded preference forms SHALL be accepted, without uploads or a general payload endpoint.

#### Scenario: F04-UH02-AC02 — Reject oversized preference input

- **GIVEN** a synthetic form body exceeds 4 KiB
- **WHEN** it is submitted to the preference endpoint
- **THEN** the request is rejected and the sentinel is absent from response and logs
- **AND** a safe 413 is returned before preference mutation or form processing

#### Scenario: Bound declared-length and streamed bodies

- **WHEN** declared-length and chunked preference requests exceed 4096 bytes, including a late sentinel and multibyte UTF-8 content
- **THEN** both return safe 413 responses and leave the existing preference unchanged
- **AND** unknown-length input is read only far enough to detect overflow, rather than buffering the entire body
- **AND** an otherwise valid form of exactly 4096 bytes is not rejected for size alone

#### Scenario: Reject unsupported representations and oversized headers

- **WHEN** preference POST uses JSON, multipart data or another unsupported representation
- **THEN** it returns a safe 415 without processing or echoing that body
- **WHEN** request headers exceed 16 KiB
- **THEN** the HTTP server rejects the request without reflecting or logging header content; no particular connector-generated status or translated body is required

#### Scenario: Keep rejection diagnostics independent of payload content

- **GIVEN** synthetic sentinels in the body, query, unmatched path, cookie and header of rejected requests
- **WHEN** responses and captured application logs are inspected
- **THEN** none contains those sentinels, raw tokens or payload-derived exception text
- **AND** no diagnostic writes a body dump or establishes external reporting

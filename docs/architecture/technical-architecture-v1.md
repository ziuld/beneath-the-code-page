# Beneath the Code Technical Architecture & Repository Bootstrap Specification v1

Date: 2026-10-09. Status: architecture accepted by the user; implementation not started. This saved edition consolidates the agreed specification into repository documentation. Subsequent feasibility clarifications are explicit in `feasibility-review.md`; they do not silently replace product decisions.

## 1. Validated architecture

One deployable Spring Boot application; MVC web adapter; Thymeleaf server-side HTML; selective TypeScript enhancement. All eight developer tools process payloads locally. Learn begins with Java Fundamentals. No Phase 1 accounts, database, microservices, SPA or cloud design. Remain stateless where practical so identical application instances can scale behind a future load balancer.

The supplied B image is the logo composition; the standalone B is the second approved variant. See `../brand/brand-application.md`.

## 2. Versions

Java 25 LTS without preview features; Temurin `25.0.4.1+1`; Spring Boot `4.1.1`; Boot-managed MVC/Security/Thymeleaf/Tomcat; Maven `3.9.16` via wrapper; Node 24 LTS for tooling. Revalidate exact patches, advisories and availability during bootstrap. Node patch and frontend dependencies must be pinned in Sprint 0; no nonexistent lockfile is implied. Primary sources are recorded in `sources.md`.

## 3. Maven strategy

One module, `dev.beneaththecode:beneath-the-code:0.1.0-SNAPSHOT`, executable JAR, compiler release 25. Use Boot dependency management; do not independently pin its managed components. Select MVC, Thymeleaf, Security, Validation and Actuator; add testing and ArchUnit. No unused persistence/reactive/message dependencies.

Maven owns the distributable build: install pinned frontend tooling project-locally, `npm ci`, type/lint/unit checks, frontend bundle, generated resource inclusion, Java compile/unit/architecture tests, packaging and integration verification. Clean `./mvnw verify` must build from source. Browser end-to-end tests run against the packaged application in a separate CI job. Avoid globally installed npm tools.

## 4. Package structure

Root `dev.beneaththecode` (an internal namespace, not a domain ownership claim):

| Package | Responsibility |
|---|---|
| `bootstrap` | Composition and framework wiring |
| `platform.configuration` | Typed settings |
| `platform.web.assets` | Asset manifest |
| `platform.web.i18n` | Locale and preferences |
| `platform.web.security` | Filters, nonce, headers |
| `platform.web.error` | Safe errors |
| `platform.observability` | Safe operational events |
| `tools.domain` | Tool identities/catalogue definitions |
| `tools.application` | Tool/page catalogue queries |
| `tools.adapter.in.web` | Controllers and view models |
| `learning.domain` | Courses/lessons and structure |
| `learning.application` | Course/lesson lookup |
| `learning.application.port.out` | Course-content access contract |
| `learning.adapter.in.web` | Learn controllers and view models |
| `learning.adapter.out.content` | Classpath content loader |

Create packages as needed. No backend formatting services and no empty interfaces for appearance. Keep Initializr's application entry point at the root initially; if moved into `bootstrap`, explicitly scan the root and verify discovery.

## 5. Dependencies

Web adapter → application → domain. Outbound adapters implement application-owned ports. Bootstrap wires implementations. Domain and application use no Spring, servlet, Thymeleaf or persistence APIs. Controllers translate requests/results, not business logic. Capabilities cannot reach another capability's adapters. Platform contains shared technical concerns, never hidden business services. Introduce ports at meaningful external boundaries only.

## 6. SSR flow and routes

GET → security/nonce → locale resolver → MVC controller → application query if needed → view model → Thymeleaf → HTML → local TypeScript enhancement. A static page needs no artificial use case. Pasted tool input never goes back to this request pipeline.

Routes: `/`, `/tools`, `/tools/json-formatter`, `/learn`, `/learn/java-fundamentals`, `/learn/java-fundamentals/{lessonSlug}`, and CSRF-protected `POST /preferences/language`. Publish remaining tool routes when their slices are complete. Unknown identifiers return localised 404. Tool controls have no form that could submit content. Without JavaScript, show usable explanatory content and a translated processing notice.

## 7–8. Frontend architecture and tooling

`src/main/frontend`: entries, design system, platform/i18n, pure tool algorithms and worker adapters. TypeScript strict mode, Vite, plain CSS, CodeMirror 6, Vitest, ESLint, Prettier and Playwright. Vite bundles assets; it does not render or route the app. Load CodeMirror only on editor pages.

Generate hashed public files in `target/frontend/static/assets/` and a private manifest at `target/frontend/asset-manifest.json`. Package these at `classpath:/static/assets/` and `classpath:/asset-manifest.json`. Resolve manifest CSS/imports at startup; fail on missing entries. Do not serve the manifest publicly or commit compiled assets. Author-only static resources may remain in `resources/static`.

Development initially uses build-watch and Spring's single browser origin, without HMR. Serve the freshly generated resources directly in a local profile or copy them on each rebuild; do not rely on a one-time Maven copy. Production accepts no filesystem resource locations. Workers are bundled same-origin files. Pure algorithms cannot depend on DOM, editors, network or storage.

## 9. Design system

Visual CSS tokens and component styles under `frontend/design-system/styles`; reusable behaviours under `frontend/design-system/components`; semantic Thymeleaf markup under `templates/fragments`. Centralise component states/accessibility, use CSS custom properties/cascade layers and avoid duplicate page implementations. Brand details and component inventory are in `../brand/brand-application.md`.

## 10. Internationalisation

UTF-8 `i18n/messages.properties` (English), `messages_es.properties`, `messages_fr.properties`; disable host-locale fallback. All UI strings, errors, titles, metadata, ARIA and CodeMirror phrases use resources. Course prose uses localised content files.

Order: supported explicit `lang` → supported cookie → weighted `Accept-Language` match → trustworthy configured country default → English. Spain→Spanish and France→French only when country fallback applies. No guessed language for multilingual countries, no client-controlled country headers, no Phase 1 IP geolocation. GET locale selection does not persist; selector POST persists then uses an allowlisted same-site route redirect.

Preference cookie: language only, HttpOnly, Secure outside local HTTP, SameSite=Lax, Path=/, no Domain, one year. Use escaped HTML attributes/text nodes for the page's browser message dictionary. Never create a separately drifting TS catalogue. HTML `no-store`; immutable hashed public assets. Check key/placeholder parity and human translation quality.

## 11–12. Security and headers

Explicit SecurityFilterChain: permit published GET/HEAD and assets; protect preference POST with CSRF; deny unlisted methods/routes; allow necessary error dispatch; disable login/basic/logout/request cache; stateless sessions; keep assets inside security filters. Cookie-backed CSRF storage with Spring token masking avoids server sessions; test absence of JSESSIONID. No CORS API, payload endpoint, uploads or unsafe output insertion.

Escape Thymeleaf output; prohibit unreviewed raw HTML. No eval or payload-to-innerHTML. Initial form body limit 4 KiB, header limit 16 KiB; verify chunked and streamed rejection as well as declared lengths. Errors contain no stack traces or sensitive values. Public rate-limiting belongs to a measured exposure boundary; no distributed limiter in local Phase 1.

Starting CSP:

```text
default-src 'none'; script-src 'self'; script-src-attr 'none';
style-src 'self' 'nonce-{responseNonce}'; style-src-attr 'none';
img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'self';
object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none';
```

Generate a cryptographically random nonce per HTML response and pass it to CodeMirror's cspNonce facet. Verify runtime styling and attributes in target browsers; nonce does not authorise style attributes. Any relaxation requires evidence and an ADR. Do not add unsafe script execution. Test workers with their own response CSP as well as the document's policy.

Headers: nosniff, DENY framing, no-referrer, camera/microphone/geolocation disabled, no-store HTML. HSTS one year on production HTTPS only; no includeSubDomains/preload before domain review. Trust only configured proxy forwarding. No external CSP reporting/analytics. Production HTTPS design remains Phase 2; local HTTP is explicitly local only.

## 13. Processing and testing

Browser limits initially: 1 MiB UTF-8 input, depth 128, output 8 MiB, two-second worker deadline, one active job. These are hypotheses until benchmarked. Enforce insertion limits before expensive editor work; cancel stale jobs; termination recreates a clean worker. Avoid recursive/unbounded conversion and duplicated huge intermediate structures.

JSON Formatter/Validator/Minifier share strict syntax logic. Configure jsonc-parser to reject comments/trailing commas; format original tokens via edits, never JS-number serialisation. Preserve duplicate keys, escapes, numeric notation and ordering; validate complete input before output. YAML conversions use bounded single-document parsing, string mapping keys, no custom tags and explicit lossless conversion policies. Reject unsupported values or duplicate-key conversions rather than quietly losing data. Base64 defines UTF-8 mode; UUID uses cryptographic v4; JWT decoding is explicitly not signature verification.

Use JUnit/AssertJ, MockMvc/Security Test, SpringBootTest, ArchUnit, Vitest, Playwright/axe. Surefire unit tests; Failsafe integration tests; packaged-app browser tests. Locations: `src/test/java` mirroring production, colocated TS `*.test.ts`, `tests/e2e`. Cases include precision, Unicode, invalid syntax, depth/output limits, cancellation, XSS-looking input, three languages, CSRF, CSP and keyboard accessibility. Privacy tests must inspect all document/worker requests and storage/logs, with synthetic sentinels only. See `../quality/quality-plan.md`.

## 14. Architecture checks

ArchUnit prohibits framework dependencies in domain/application, outward dependencies, web→outbound adapters, outbound→web adapters, cross-capability internals, cycles and capability→bootstrap dependencies. Controllers belong under adapter.in.web; framework configuration belongs in composition/platform. Ensure rules select real classes rather than vacuously passing empty packages. ESLint enforces equivalent browser import boundaries.

## 15. Local development

Maven Wrapper plus project-local frontend tooling. Multi-stage Docker build with pinned base digests, minimal Java runtime, non-root UID, read-only root, tmpfs, dropped capabilities, no-new-privileges, resource limits, graceful shutdown and a tested health check. Compose contains the app only, bound to 127.0.0.1. No database, Redis, source/credential/socket mounts or cloud resources. Actuator on an unexposed separate port, health only; verify health probe execution without assuming curl is installed.

## 16–17. Repository and CI

Public remote is `ziuld/beneath-the-code-page`; protected main, short branches, PRs, squash, Conventional Commit-style titles, real CODEOWNERS, contribution/security guidance and dependency-update PRs. Public status does not settle licences for code, brand or course content.

CI: static/type/i18n checks, frontend unit tests, Maven verification, packaged browser/privacy/CSP/a11y tests, container build/scan, dependency/secret/SAST checks, SBOM and reports. Pin actions by SHA; read-only default token; no privileged execution of untrusted PR code; expiry/owner for exceptions. Full Chromium PR suite plus Firefox/WebKit critical smoke; broad matrix scheduled/before release. No deployment job. See `../delivery/repository-and-ci.md`.

## 18. Observability

Structured stdout: time, level, event code, version, server-generated request ID, normalised route, status and duration. No bodies, queries, cookies, auth headers, raw JWTs, payloads or unmatched raw paths. Safe exception codes by default; optional local diagnostics still redact payload-derived text. Micrometer/Actuator for bounded metrics; no session replay, external browser errors or payload analytics. Initial local retention seven days; revisit public deployment retention.

## 19. Repository structure

See `repository-tree.md` for current planning files and the future implementation tree. Do not populate future directories with empty interfaces/classes.

## 20. Backlog and sprints

`../planning/plan.json` is the canonical feature tracker. `../planning/feature-backlog.md` defines acceptance; `../planning/sprints.md` defines Sprint 0/1 and subsequent feature sequence. F00 is manual import; F01–F05 foundations; F06 JSON Formatter is the first functional vertical slice. All eight tools and Java Fundamentals remain in the full Phase 1 scope. A pilot lesson is an intermediate milestone, not completion of the course.

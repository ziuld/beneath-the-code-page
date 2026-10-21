# F10 — JWT Decoder acceptance evidence

Date: 2026-10-21. Branch: feature/F10-jwt, from local F09 d807253.
Owner approved F09 and requested F10. Prerequisites F06/F18 complete; behaviour
remains plan.json-owned (F10-UH01 R01/R02, AC01/AC02). Actual owner effort unreported;
8h baseline/forecast retained. Existing scope/planning/F09 closure edits preserved.

## Implementation and review

Three-part compact JWT inspection at /tools/jwt, native textarea and Decode/Clear,
shared SSR shell/styles/catalogue, exact safe language return and EN/ES/FR.
Permanent signature-not-verified notice before input, including untrusted issuer,
claims and exp; no authentication, authorisation, validity or expiration verdict.
No signature verification, key fetching, clipboard, worker, editor or dependency.

16 KiB ASCII compact processing limit before split/decode; JSON nesting32 before
native JSON.parse using the existing jsonc-parser scanner. Canonical unpadded
base64url, fatal UTF-8, strict JSON object header/claims. Binary/empty signature
can be inspected without trust. Five-part JWE, detached payloads, malformed
segments and unencoded payload option rejected with fixed translated messages.
Raw decoded JSON displayed through textContent; no numeric reserialization, claim
interpretation, prototype merging or URLs generated from token values.

Edits/errors clear decoded output. Clear and pagehide empty input/output. Native
textarea buffer is editable beyond the processing limit; oversized decode fails
before allocating decoded data. Output size is bounded by decoded input size.
No-JS/lazy-load failure retains disabled controls, notice and explanation.
Verified UUID preview PID80780/cwd/listener41067, SIGTERM and process/listener gone
before rebuilding. No push/PR/deploy/subagents; F11 remains removed.

## Executed checks

- Focused decoder39 PASS; typecheck/lint PASS after two test-only lint corrections.
  Cases: original Unicode/HTML-like claims, numeric notation/large integers and
  duplicates, prototype-looking keys, exp absent/past/future/string/null/object,
  empty signature, five-part JWE, malformed/detached segments, alphabet/padding/
  unused-bit errors in all segments, bad UTF-8, strict JSON/object shape, BOM,
  unencoded option, depth32/33 and exact16KiB/next-byte processing boundaries.
- Full scripts/verify-java-baseline.py PASS: frontend274, Java273, packaged
  integration17 plus type/lint/format/architecture/build. Log: target/f10-maven.log.
- scripts/smoke-java-baseline.py PASS: executable startup, health UP and shutdown.
  Log: target/f10-smoke.log.
- Fresh scripts/verify-security.py PASS against built candidate: 53 production
  sources, 0 findings; DBs 2026-10-21T07:13:45Z / 01:09:45Z; policy mode none.
  Log: target/f10-security.log; target/security/summary.json.
- Security policy20 and strict main OpenSpec15 PASS. Logs: target/f10-policy.log,
  target/f10-openspec.log. No behavioural migration or archival.
- Full scripts/verify-home-browser.py Chromium PASS: 169/169, Playwright1.63.0.
  Log: target/f10-chromium.log. All7 F10 cases pass: EN/ES/FR exact escaped output,
  unchanged large integer/duplicate claims, untrusted exp, key URLs as inert data,
  malformed/JWE/UTF-8/JSON/depth/oversized input, real16KiB boundary, permanent
  notice, edit invalidation, Clear/undo, keyboard Tab/Enter, axe, pagehide clearing,
  no-JS/lazy-load failure/retry and native language return. No worker/editor loads.
- Cold Home→Tools→JWT permits exact known page/asset GETs only. Decode/error/Clear
  issue no requests and change no cookies or local/session/IndexedDB/cache storage.
  No synthetic claim/token in captured requests or server logs; no CSP violations.
- Shared design-system matrix covers13 routes in EN/ES/FR,320/1440px. Agent visually
  reviewed initial/populated wide EN and populated narrow FR: labelled native
  controls, readable warning and literal/wrapped claims. Screenshots:
  target/f10-{en,es,fr}-{320,1440}.png and target/f18-_tools_jwt-*.png.
- All545 scanned input digests rechecked unchanged before documentation closure.
  Candidate JAR SHA256: 4795999ca8ce35acbd62c4bd518a8e9bfe07c51e9ced95a06a88313ea0124aec.

Agent integration review: inspected complete decoder/workspace/publication diff,
limits, fixed errors, absence of trust decisions, translated notice and actual
browser evidence. AC01/AC02 accepted.
F19 Firefox/WebKit, real Safari and actual browser zoom remain later work;
no owner manual observations or cross-browser compatibility are claimed here.


## Local closure and handoff

Implementation: a9eb6e47b2e8b1b2c0cc0ed24d6841c9a7b315ed.
T01–T05, story and feature complete against recorded acceptance/integration review.
Both planning renderers, planning integrity,23 planning-rule tests and whitespace
checks PASS (target/f10-planning.log). All194 runtime/test/JAR security input
digests remain unchanged after closure; only planning/handoff inputs changed.
Existing owner scope/planning changes and F09/F10 tracking/handoff updates remain
uncommitted. Only the scoped F10 implementation/tests/new docs were committed.
No push/PR/deployment, no F11 restoration. Actual owner effort unreported.

Preview: http://127.0.0.1:39793/tools/jwt?lang=en, loopback-only local profile,
PID88549 / exec session56940; target/f10-preview.log. HTTP200/disclaimer verified.
Verify identity and stop before rebuilding. Next: bounded simplification review
(F19 T01) → F19 final browser acceptance → F20 Docker/second-PC handoff.

# Secure HTTP responses — F04 verification

Implementation is in progress; this is not a public-exposure or full acceptance claim.

The response-boundary filter runs before the security chain and covers REQUEST/ERROR dispatch. Each request has a fresh 128-bit random CSP nonce, reused only within its own error dispatch. The documented deny-all-first CSP, nosniff, DENY framing, no-referrer and disabled camera/microphone/geolocation policies apply without unsafe-inline/unsafe-eval. HSTS is one year only for non-local secure requests; forwarding is disabled until a trusted deployment boundary is configured.

The existing exact route/method allowlist is retained. Anonymous published GET/HEAD and resources remain filtered; preferences require POST and masked CSRF. Unlisted routes and direct `/error` requests stay denied, while internal error dispatch is permitted. No session/login redirect is introduced.

HTML, redirects, errors, logo and local-watch resources use `no-store`. Successful non-local GET/HEAD assets listed in the private validated manifest use `public, max-age=31536000, immutable`; missing resources never receive immutable caching. The local exception preserves F02's successive watcher rebuilds.

Preference POST accepts only UTF-8 URL-encoded forms of at most 4096 actual bytes. Unsupported media types return 415 and oversize forms 413 before token inspection. Malformed encoding returns 400; bounded invalid CSRF returns 403. The boundary never drains an unlimited body.

Errors share fixed EN/ES/FR content, existing stylesheet assets and a Home link, without a preference form/token or failed values. HTML is selected for `Accept: text/html`; other clients receive only a fixed status/code JSON object. Reproduce with `curl -H 'Accept: text/html' -H 'Accept-Language: fr' http://127.0.0.1:8080/assets/missing.css`.

HTTP events contain only a generated UUID, fixed route label (or `unmatched`), status, elapsed milliseconds and the fixed `BTC_HTTP_RESPONSE` code. No exception object or client-controlled field is logged. Raw Tomcat access logs and request/exception-bearing framework web/connector diagnostics are disabled; this trades detailed framework diagnostics for the Phase 1 privacy boundary. Do not enable them on real traffic to investigate a failure. Startup/build diagnostics remain available. Real process-log sentinel verification is still required before acceptance.

## Final verification

Executed clean build, packaged HTTP/asset tests and baseline smoke; all applicable checks pass. Browser suite passed 46/46 with installed Google Chrome 152.0.7977.82 using `python scripts/verify-home-browser.py --browser chrome`. Playwright calls the Chrome engine `chromium` internally; `channel: chrome` selects Google Chrome, not the bundled browser. Production CSP remains enforced; only synthetic accessibility-test styles carry the document's nonce.

The Chrome result above is historical F04 acceptance evidence. The owner subsequently selected **pinned Chromium for all automated tests/snapshots and Google Chrome for manual review**; the former `--browser chrome` selector has been removed. Run `python scripts/verify-home-browser.py --install` to install locked tooling/Chromium project-locally and execute checks, or omit `--install` when already installed. Restore the project-local cache after `mvn clean`. Never use `--with-deps` locally without separate privilege approval. [ASVS map](../quality/F04-asvs-mapping.md) states partial/deferred controls; no ASVS certification is claimed.

Verification: `./mvnw test -Dtest=SecurityResponseHeadersTests,LocalLanguagePreferenceTests,LanguagePreferenceTests,HomeSecurityTests -DfailIfNoTests=true`. Evidence: [F04-UH02 execution](../../harness/evidence/F04-UH02-secure-http-responses.md). Body limits, safe error rendering/logs and full packaged/browser checks remain later checklist items until evidenced.

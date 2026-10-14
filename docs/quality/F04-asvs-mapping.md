# F04 — scoped OWASP ASVS mapping

Reference: **OWASP ASVS 5.0.0**, official [tagged release](https://github.com/OWASP/ASVS/tree/v5.0.0), tree SHA `3383877f732ce89a458a1af43288f2f1b1d7db0c`, inspected 2026-10-14. IDs below use the version-prefixed form. This is a scoped evidence map, **not** an ASVS level, certification or complete assessment. Summaries do not replace the upstream requirements.

Tagged source chapters: [V3](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x12-V3-Web-Frontend-Security.md), [V4](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x13-V4-API-and-Web-Service.md), [V14](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x23-V14-Data-Protection.md), [V16](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x25-V16-Security-Logging-and-Error-Handling.md).

## Executed evidence

`./mvnw verify`: 15 frontend tests, 186 Java cases (four explicit architecture skips), 17 packaged cases passed. `python scripts/verify-home-browser.py`: 46 Chromium cases passed after nonce-authorising only synthetic accessibility-test styles. Reproduction and historical failures: [UH02 evidence](../../harness/evidence/F04-UH02-secure-http-responses.md). Clean combined verification is recorded there separately when executed.

Final combined verification: `./mvnw clean verify` passed the same counts; `python scripts/verify-home-browser.py --browser chrome` passed 46/46 with installed Google Chrome 152.0.7977.82 after the clean build. Startup/health smoke, direct original B bytes and normal-JAR fixture exclusion also passed. Owner acceptance/closure is separate from these executed technical results.

| Version-prefixed control | Scope/status | Actual evidence and limitations |
| --- | --- | --- |
| v5.0.0-3.3.1 | Partial | `LanguagePreferenceTests`, `LocalLanguagePreferenceTests` and browser cookie inspection prove non-local Secure; explicitly local HTTP omits it. Accepted cookie names do not use the required security prefixes. No full-control claim. |
| v5.0.0-3.3.2 | Evidenced for F04 cookies | SameSite=Lax asserted for language/CSRF cookies; forged submissions rejected by token validation. |
| v5.0.0-3.3.3 | Not met | Existing accepted `BTC_LANGUAGE`/`XSRF-TOKEN` names lack `__Host-`. Renaming is not silently added to F04. |
| v5.0.0-3.3.4 | Partial | Both cookies are HttpOnly; raw CSRF cookie token is never used in the form, but a derived masked token is deliberately rendered. Language code is also necessarily visible as selected UI state. |
| v5.0.0-3.4.1 | Partial | `SecurityResponseHeadersTests` prove one-year HSTS only for non-local secure requests. HTTP/local responses and subdomains are deliberately excluded; deployed TLS boundary not assessed. |
| v5.0.0-3.4.3 | Evidenced for current document policy | Exact CSP, random 128-bit per-request nonce, object-src/base-uri restrictions asserted by header tests; all 46 browser cases pass. F05 editor/worker-specific proof remains separate. |
| v5.0.0-3.4.4 | Evidenced for application responses | nosniff tested; real packaged asset MIME/byte checks and browser loading pass. Connector-level malformed/oversize-header errors are not claimed to receive application filters. |
| v5.0.0-3.4.5 | Evidenced | no-referrer asserted on normal/denied/error application responses. |
| v5.0.0-3.4.6 | Evidenced | frame-ancestors 'none' asserted in exact policy; DENY supplied additionally, not relied upon alone. |
| v5.0.0-3.4.7 | Deferred/not met | No CSP reporting endpoint; accepted scope deliberately excludes external reporting infrastructure. |
| v5.0.0-3.5.1 | Evidenced for preference POST | Real masked-token/native browser flows with JavaScript on/off; absent cookie/token, mismatch and raw token rejected without preference mutation. |
| v5.0.0-3.5.2 | Inapplicable | No reliance on CORS preflight for preference protection; CSRF tokens are used. |
| v5.0.0-3.5.3 | Evidenced | Preference changes are POST-only; resolver GET does not persist; denied method checks retain exact allowlist. |
| v5.0.0-3.6.1 | Inapplicable to current assets | Current assets are self-hosted, verified by browser same-origin requests and packaged manifest tests; no CDN resources. |
| v5.0.0-3.7.2 | Evidenced for preference redirects | `LanguagePreferenceTests.neverReflectsNonAllowlistedRedirects` proves code-owned Home-only 303 destination, including hostile/encoded/query targets. |
| v5.0.0-4.1.3 | Evidenced for current direct-server boundary | Forwarded-header strategy disabled; spoofed Forwarded/X-Forwarded-Proto tests do not enable HSTS. No trusted proxy deployment assessed. |
| v5.0.0-4.1.4 | Evidenced for current published routes | `HomeSecurityTests` and response-header tests cover filtered GET/HEAD, preference POST, denied methods/unlisted/direct-error/fixture routes. |
| v5.0.0-4.2.1 | Partial | Real chunked/declared HTTP/1.1 body-boundary cases pass, including unfinished upload. This is not a complete request-smuggling/HTTP2/HTTP3 or intermediary assessment. |
| v5.0.0-14.2.5 | Evidenced for current asset cache | Only exact successful non-local manifest assets immutable; HTML/error/logo/local-watch no-store; missing assets 404. Packaged local rebuilds still work. |
| v5.0.0-14.3.2 | Evidenced | no-store on token-bearing HTML, error and redirect responses asserted by Java/browser/packaged checks. |
| v5.0.0-14.3.3 | Partial | No browser payload storage is introduced; cookies contain only language and CSRF state. Full future tool/browser-storage review remains outside F04. |
| v5.0.0-16.1.1 | Partial/deferred | [Delivery guidance](../delivery/secure-http-responses.md) identifies bounded HTTP events and disabled raw diagnostics. Operational access, retention and complete deployed-stack inventory are not established. |
| v5.0.0-16.2.5 | Evidenced for F04 HTTP events | Real packaged sentinel/token/cookie/exception checks show no leak; fixed route labels, generated IDs, status/elapsed/code only. No entire infrastructure logging claim. |
| v5.0.0-16.3.2 | Partial | Failed HTTP authorization responses yield bounded status events. No accounts or authenticated authorization exists; broader L3 decisions not assessed. |
| v5.0.0-16.4.1 | Evidenced for new HTTP event fields | No client strings or exceptions interpolated; fixed labels/generated IDs/numbers. Packaged sentinel checks pass. Unrelated startup/build logging is not a blanket claim. |
| v5.0.0-16.4.2 | Deferred | Runtime log access/integrity policy is deployment work, not local bootstrap evidence. |
| v5.0.0-16.4.3 | Deferred | No external log pipeline in Phase 1. |
| v5.0.0-16.5.1 | Evidenced | EN/ES/FR safe 400/403/404/413/415 and isolated 500, fixed non-HTML codes, no form/token/private exception/request values. |
| v5.0.0-16.5.3 | Evidenced for preference rejection | Validation/CSRF/byte/media failures preserve status and do not mutate preference/session; unfinished upload rejected at byte cap. |
| v5.0.0-16.5.4 | Partial | Shared MVC advice/error dispatch handles exercised failures safely; this is not an all-runtime-failures/availability guarantee. |

## Excluded scope

Account/password/MFA/authenticated-session controls are inapplicable to this anonymous, stateless Phase 1 feature; no login or session is introduced. Database and stored-tool-payload controls are inapplicable because neither exists. Runtime TLS/proxy, log retention/access, distributed infrastructure and F05 tool/editor policies are deferred, not silently satisfied. The body cap and incomplete-stream regression also directly evidence F04-UH02-AC02; no unrelated ASVS ID is invented to label them.

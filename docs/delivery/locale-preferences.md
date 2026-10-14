# Locale preferences — local verification

F04-UH01 implements a native EN/ES/FR selector in the shared header. Apply is still in progress; this document is not an acceptance claim. The language preference is the only persistent visitor preference; tool payloads are never stored or submitted.

## Resolution and submission

Supported explicit `lang` query → `BTC_LANGUAGE` cookie → weighted Accept-Language → optional server `btc.locale.country` (ES/FR only) → English. Unsupported/ambiguous candidates fall through; GET never saves a language preference. A GET can issue the HttpOnly cookie-backed CSRF token needed by the native form.

The form submits only `language`, `returnTo` and masked `_csrf` to `/preferences/language`. Valid POST stores the language code for one year (HttpOnly, SameSite=Lax, Path=/, no Domain) and redirects 303 to the current exact published allowlist, currently Home only. No query is retained, so an explicit GET locale does not override the saved preference. Unsupported or repeated languages are 400; missing/mismatched/raw CSRF tokens are 403. No session or login redirect is used.

Both cookie types require Secure outside the single loopback `local` profile. Plain HTTP is local-only; secure defaults are not relaxed for production. The local profile serves watched generated assets and must not be presented as classpath-packaging evidence.

## Automated checks

- `./mvnw verify` builds assets/JAR, executes Java/architecture and packaged regressions.
- `python scripts/verify-home-browser.py` checks the non-local normal JAR and isolated shell fixture, plus a separate explicitly local process for actual browser native preference GET→POST. The runner sets dynamic loopback origins, checks the original JAR hash and uses pinned project-local Chromium tooling. If absent, use its `--install` option; do not use local `--with-deps` without authorisation.

Browser suites inspect actual masked token/cookie pairs, JS on/off, exact EN/ES/FR selector messages/selected state, cookie attributes/lifetime, forged-change rejection, no JSESSIONID, local storage emptiness, keyboard/focus/contrast/reflow and unchanged B bytes. Local HTTP/HTTPS and non-local flags are also covered by genuine-token MockMvc tests. CSS layout zoom is not a claim of actual browser-UI zoom.

## Required owner review (task 1.6)

After `./mvnw verify`, run `java -jar target/beneath-the-code-0.1.0-SNAPSHOT.jar --spring.profiles.active=local --server.port=8080` from the project root and open `http://127.0.0.1:8080/` in your browser.

1. Review EN/ES/FR labels/options/apply copy using `/?lang=en`, `/?lang=es`, `/?lang=fr`; confirm the approved B/layout and untranslated-key absence.
2. Tab forward/back through the header and select, apply each language, then reload Home. Check visible unobscured focus, no trap and retained language, with JavaScript enabled and disabled.
3. Set the browser's actual UI zoom to 200%, inspect narrow/wide layout and every header control, and confirm no clipped focus or horizontal overflow. CSS zoom or deviceScaleFactor does not substitute.
4. Report pass/fail observations, browser/version, viewport and any copy/visual concerns. Record unperformed checks honestly; no owner acceptance is inferred from automated tests.

Execution evidence: [F04-UH01](../../harness/evidence/F04-UH01-locale-preferences.md). Security/body/error guarantees still require the remaining F04-UH02 slice; this partial application is not ready for public exposure.

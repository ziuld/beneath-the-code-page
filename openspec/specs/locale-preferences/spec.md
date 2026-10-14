# locale-preferences Specification

## Purpose

Let visitors resolve and retain an English, Spanish or French interface language through a safe, accessible, stateless server-rendered preference flow.

## Requirements

### Requirement: F04-UH01-R01 — Persist a supported language preference

When a visitor submits a supported language with a valid CSRF token, Beneath the Code SHALL persist the supported preference in the language cookie. The interface SHALL resolve supported languages by explicit `lang`, preference cookie, weighted Accept-Language, trusted configured country default, then English; GET selection SHALL NOT persist a preference. The selector SHALL work without JavaScript and redirect only to allowlisted published same-site pages.

#### Scenario: F04-UH01-AC01 — Persist Spanish preference

- **GIVEN** the browser prefers English and the visitor has a valid preference form
- **WHEN** the visitor selects Spanish and submits the form
- **THEN** subsequent pages resolve Spanish without creating JSESSIONID
- **AND** the server responds with a 303 redirect to the validated published page and persists only the language code in the preference cookie

#### Scenario: Render and use an accessible selector without JavaScript

- **GIVEN** a Home page in EN, ES or FR and JavaScript disabled
- **WHEN** the visitor traverses the selector and submit button using the keyboard
- **THEN** labels come from that locale's resources, the resolved language is selected, focus is visible and a native form submits to `/preferences/language` with a masked CSRF token
- **AND** selection remains usable at narrow widths and actual browser 200% zoom

#### Scenario: Resolve the full locale precedence without GET persistence

- **GIVEN** conflicting supported values in `lang`, the preference cookie and weighted Accept-Language, with a configured country fallback
- **WHEN** a page is requested
- **THEN** the first supported value in the declared precedence wins and GET does not create or refresh a language-preference cookie
- **AND** unsupported or malformed candidates are ignored, regional language tags in Accept-Language match EN/ES/FR, q=0 candidates are excluded and equal weights use header order
- **AND** a wildcard alone does not guess a language; country ES resolves Spanish, FR resolves French, and absent or other country defaults resolve English
- **AND** client-supplied country headers do not influence the result

#### Scenario: Enforce preference-cookie attributes

- **WHEN** a valid preference submission succeeds in local HTTP or a non-local configuration
- **THEN** the language cookie has HttpOnly, SameSite=Lax, Path=/, no Domain and a one-year lifetime
- **AND** Secure is required outside explicitly local HTTP and no server-session cookie is issued

#### Scenario: Reject unsupported or ambiguous submitted preferences

- **GIVEN** a valid CSRF token and an existing French preference
- **WHEN** the form submits an unsupported, missing or repeated language value
- **THEN** the server returns a safe 400 response, leaves the language cookie unchanged and does not echo the submitted value

#### Scenario: Constrain the post-submission redirect

- **GIVEN** a supported language and a valid CSRF token
- **WHEN** the return target is external, scheme-relative, malformed, encoded to bypass validation, contains a query or fragment, or names an unpublished destination
- **THEN** the preference is saved but the 303 redirect falls back to `/` without reflecting the unsafe target
- **AND** a valid exact allowlisted page path is retained without a `lang` query overriding the saved preference

### Requirement: F04-UH01-R02 — Reject forged preference changes

If a preference submission has an invalid CSRF token, then Beneath the Code SHALL reject the change. The preference SHALL remain unchanged for missing, mismatched or unmasked tokens, without a login redirect, server session or sensitive error disclosure.

#### Scenario: F04-UH01-AC02 — Reject forged preference change

- **GIVEN** the visitor has an existing French preference
- **WHEN** a request attempts to change it without a valid CSRF token
- **THEN** the preference is unchanged and the response is a safe rejection
- **AND** the response is 403 without a login redirect or JSESSIONID

#### Scenario: Reject missing and mismatched token pairs

- **GIVEN** the visitor has an existing French preference
- **WHEN** the CSRF cookie or masked hidden token is missing, the pair does not match, or the submitted token is the raw cookie value
- **THEN** the server returns a safe 403 and does not issue a changed language cookie or disclose either token

# Design

## Context

See `proposal.md` for motivation. F07/F12 are accepted. No learning Java packages,
templates or course resources exist yet. The current application already provides
the shared shell/styles, locale resolver, safe errors, exact preference redirects
and response headers; F13 extends them, not their frameworks.

`PublicPageSecurity` currently denies all learning routes. Its main spec explicitly
says unpublished learning pages return 403, conflicting with F13's required 404.
`LanguagePreferenceController` has a fixed path set; `SecurityResponseHeaders`
normalises only current route identities. The browser runner already makes an
isolated copied JAR and checks that the normal JAR digest is unchanged.

## Goals / Non-Goals

**Goals:** one publication-aware learning model, three SSR page types and a small
safe classpath Markdown path, proven independently of real lesson authoring.

**Non-Goals:** CMS/import pipeline, generic course/plugin registry, accounts,
progress storage, dynamic routing, live content reload, client Markdown rendering,
extra published units, editor widgets, a separate answer-route framework or new
runtime. F14 supplies real unit/answer content; F16 enables Home/shared Learn links.

## Decisions

### 1. Minimal immutable catalogue and one real resource boundary

Use small records under `learning.domain` for the single course, ordered unit
identities and localised metadata/body. A pure `learning.application` query owns
publication lookup, course context and previous/next selection. Add one
application-owned content-source port implemented by `learning.adapter.out.content`:
this is the actual classpath I/O boundary and allows fixture substitution without
Spring/domain coupling. Do not add separate repositories/use cases per page.

Use UTF-8 Java properties for `content/java-fundamentals/catalogue.properties`
(an explicit ordered list of published slugs), and locale directories `en`, `es`,
`fr` containing metadata properties and unit Markdown. No front-matter/JSON/YAML
binding pipeline. Slugs are catalogue-owned lowercase hyphenated identifiers;
never concatenate an unchecked request value into a resource path. A draft file
not listed as published is not a destination.

Load once into an immutable snapshot. Reject duplicate/invalid published slugs
and missing required title/body/locale resources with bounded diagnostic codes;
do not silently drop a broken published entry. The production published list is
empty in F13 and valid without real unit resources. F14 can supply one complete
entry later through ordinary resource changes, without an extension framework.

Alternative: hard-coded fixture pages or a configurable CMS would either duplicate
F14 work or add unnecessary publication infrastructure.

### 2. Preserve layering and the existing shared presentation

The learning web adapter maps `/learn`, `/learn/java-fundamentals` and the single
unit-segment route to three Thymeleaf templates using the common shell/assets,
message resources and scoped prose styles. Domain/application use no Spring,
Thymeleaf or Markdown framework APIs. The web adapter renders Markdown as HTML
presentation; it must not call another adapter's internals.

Course metadata/body are locale-specific resources; shared controls, breadcrumbs,
errors and navigation labels use existing EN/ES/FR message bundles. Fenced code
uses ordinary escaped `pre/code`, not CodeMirror or a highlighting service.
Add only the reading-width/heading/list/code/reflow styles required by these
pages. Preserve the B identity and shared tokens, with no global restyling.

Reading, navigation and language selection work without JavaScript. Reuse current
asset loading; do not add a learning entry point or fetch editor/worker chunks.

### 3. A narrow 404 exception, not a general route allowance

Permit only GET/HEAD on the two exact learning roots and one lesson path segment;
the controller's publication query returns the existing safe localised 404 for
unknown/unpublished units and empty catalogue/course pages. Keep arbitrary course
paths, nested routes, unknown tools and body-bearing methods denied. Do not use
`/learn/**` or change CSP, error dispatch, request limits or session behaviour.

The accompanying security delta preserves the complete existing requirement and
all other scenarios. Updating stale tests from blanket learning403 to this exact
exception is planned behaviour, not weakening the unrelated denial assertions.

Compose exact published return paths from the same immutable catalogue. Pass
those paths into the preference adapter through a small immutable technical path
value assembled in bootstrap alongside the existing fixed paths; do not make
platform i18n depend on learning web/resource adapters, parse a slug permissively
in the redirect handler, or create a generic provider registry. Unpublished,
duplicate, encoded, external, query-bearing or fragment-bearing targets retain
the existing `/` fallback. Normalise logs to fixed learning page categories,
never the supplied slug or raw route.

Internal learning navigation carries a supported explicit GET-selected language
when necessary, without persisting it. Preference `returnTo` remains query-free;
the successful POST's clean-path redirect uses the saved language cookie.

### 4. One Markdown library with safe output rules

Use pinned `org.commonmark:commonmark:0.30.1` (published in Maven Central; BSD-style
licence), rechecking its licence/advisories at installation and retaining required
notices. Configure server-side HTML rendering with `escapeHtml(true)` and
`sanitizeUrls(true)`, both explicit because upstream defaults are unsafe for this
purpose. Permit ordinary safe links; test dangerous/encoded schemes. Reject image
nodes in V1 content validation so authored Markdown cannot fetch remote resources;
the supplied site logo is unaffected. Do not implement sanitisation with regex.

Only this configured renderer's output enters the lesson-body HTML insertion point;
titles, metadata and all other values remain normally escaped. Raw HTML is inert,
fenced code is escaped and unknown template syntax is never evaluated. No raw-HTML
extensions, executable embeds or second HTML sanitiser is needed while raw HTML
is disabled; tests must prove this rather than relying on CSP alone.

### 5. Reuse the copied-JAR harness for synthetic publication

Place the synthetic single-unit catalogue, complete locales and malicious-content
fixtures under test resources. Extend `component_fixture` to overlay only those
private content resources in the existing copied shell JAR, so the real learning
controllers/loader and production security chain handle fixture requests. Its
fixture-only chain already matches only shell/editor fixture routes and must not
bypass learning security. No new fixture application, published synthetic unit,
production test flag, extra runtime service or copy of the page implementation.

Browser tests start the fixture journey directly at `/learn`; they must not turn
on Home Learn promotion to reach it. Unit/application tests use a synthetic
two-published-unit/draft dataset for ordering boundaries; no second public unit
or second browser server is required. Assert fixture resources are absent from
the normal JAR and the normal JAR retains an empty catalogue and unchanged digest
through fixture construction. Under owner-approved ADR009, Chromium is the only
required engine for remaining MVP features/CI and final acceptance. Keep existing
Firefox/WebKit selections/results for optional post-MVP evaluation, not automatic
runs or pending release gates. Remove their automatic steps from the existing
browser workflow during apply without introducing a new CI framework.

### 6. Verify changed behaviour once, retain existing acceptance

Tests belong with their slice: catalogue/resource tests, rendering/hostile-markup
tests, exact-route/locale/log integration and then the packaged browser journey.
Owner-approved sequencing correction: the verified catalogue (OpenSpec task 1.1)
is the shared foundation, not the whole SSR task. UH02 and its analysis task depend
on completed `F13-UH01-T01`; the additional prerequisite of delivered task 1.1 is
recorded in this checklist/evidence. Implement the renderer core before final SSR,
then finish renderer/SSR assertions together. No temporary renderer, extra task or
premature completion. Retain IDs/baselines/forecasts and one integrated acceptance.
Reuse existing security/privacy/locale assertions for unchanged behaviours; one
combined F13 evidence/closure record can serve both stories. Manual review covers
only the new learning pages (keyboard, narrow layout, actual 200% zoom, EN/ES/FR),
not a repeat owner review of accepted JSON tools. No speech-review/conformance claim.

New server classes, resources and the parser dependency invalidate the F12 review
fingerprint. Reassess each existing disposition against actual F13 code and the new
dependency scan. An updated fingerprint requires owner approval of the reassessed
scope, with the existing 2026-11-01 expiry unless separately changed; never refresh
it automatically or treat F13 apply as a blanket waiver. If approval/verification
is unavailable, keep acceptance blocked and record the precise cause. Boot stays
4.1.1; no independent managed-component overrides or silent gate bypass.

## Risks / Trade-offs

- A lesson route reaches MVC but publication is missing → exact 404 lookup and
  no draft/title leakage; retain denial outside the three reserved shapes.
- Content rendering accidentally enables HTML/remote images → explicit safe
  renderer configuration, image rejection and parser plus browser fixtures.
- Synthetic content leaks into the product → copied-JAR-only overlay, normal-JAR
  resource absence/digest tests and no production publication switch.
- F12 approvals become invalid → explicit bounded reassessment; the 10h forecast
  is provisional and cannot justify suppression or false completion.
- Learning objects create outward dependencies → activate real learning ArchUnit
  rules and keep the content boundary/application records framework-free.

## Migration Plan

No data migration or deployment is involved. During apply add the immutable empty
catalogue, loader/query and safe renderer, then SSR/routes/locale/log integration
and fixtures. Reassess security approvals and execute the changed checks before
acceptance. Keep production Learn promotion off. If publication data is invalid,
fail safely rather than exposing placeholders. F14 adds the real reviewed unit;
F16 promotes the completed journey. No main-spec sync or archive is implicit.

## References

- https://repo.maven.apache.org/maven2/org/commonmark/commonmark/maven-metadata.xml
  (0.30.1 published; metadata checked during planning).
- https://github.com/commonmark/commonmark-java
  (HTML renderer escaping/URL-sanitisation APIs and upstream licence).

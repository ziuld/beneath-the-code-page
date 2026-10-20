# Proposal

## Why

F13 supplies the learning page structure needed before F14 can deliver the first
reviewed unit. The application currently has no learning implementation; build the
small SSR/content slice once, prove it with synthetic fixtures and keep unfinished
course material out of production navigation.

## What Changes

- Add Learn → Java Fundamentals → unit pages, course context, breadcrumbs and
  return navigation. One published unit has no previous/next links; ordered
  synthetic multi-unit data verifies those boundaries without publishing V2 units.
- Load immutable local EN/ES/FR metadata and Markdown with safe rendering, complete
  locale coverage and publication decisions shared by page lookup/navigation.
- Return localised 404 for missing/unpublished learning content within the exact
  learning route shapes; retain 403 for unknown tools, unrelated routes and denied
  methods. This explicitly resolves the current blanket 403 policy conflict with
  F13-UH01-R02; it is not a global routing/security relaxation.
- Preserve native locale preferences and the shared design system/CSP. No editor
  enhancement, browser routing or JavaScript dependency for reading lessons.
- Verify with the existing copied-JAR fixture mechanism. The normal JAR contains
  no synthetic units or public learning content; Home/shared Learn promotion waits
  for F14's reviewed unit and F16 integration, per ADR 007.
- Reassess the existing bounded security dispositions after server/configuration
  changes; never auto-refresh their approval fingerprint. Keep Boot 4.1.1 unchanged.
- Refine UH02's prerequisite to the completed shared navigation implementation
  task, not a second acceptance of the whole UH01 story, so both stories can use
  one integrated review without temporary rendering or duplicate checkpoints.

## Capabilities

### New Capabilities

- `learning-navigation`: bounded learning routes, publication-aware catalogue and
  unit navigation, localised missing-content handling and locale-preserving journeys.
- `localised-learning-content`: complete classpath EN/ES/FR learning resources and
  inert, safe Markdown rendering for published content.

### Modified Capabilities

- `secure-http-responses`: narrowly dispatch GET/HEAD learning route shapes to
  publication-aware lookup so unknown/unpublished learning content returns 404;
  retain all other denial, no-session, privacy, cache and CSP behaviour.

## Impact

During apply: add the minimum learning domain/application and resource/web adapters,
three SSR templates, localised labels and scoped prose styles; extend exact locale
return paths, bounded route matching and safe log categories. Add one pinned
CommonMark dependency, not a second sanitisation/CMS/rendering platform. Extend
existing tests and copied-JAR fixture resources without adding a runtime profile
that publishes fixtures. Retain the 16h baseline/10h provisional forecast and stable
F13 IDs; plan.json ownership does not migrate automatically.

No real lesson authoring or technical/language acceptance (F14), Home Learn
publication/polish (F16), accounts, progress storage, database, containers, new
course framework, extra published units, dependency upgrades or global redesign.
This proposal changes planning artifacts only; it does not implement F13 or alter
the current security policy/dispositions. Existing F07/F12 archive work is separate.

Owner browser-policy revision,2026-10-19 (ADR009): remaining F13/F14/F16 work and
final MVP acceptance require Chromium only. Retain Firefox/WebKit tests/results
for optional post-MVP evaluation, not required final-project checks. Align existing
browser CI during apply; other Java/frontend/privacy/security/manual gates remain.

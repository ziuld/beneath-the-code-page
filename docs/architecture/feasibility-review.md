# Feasibility review

Current delivery,2026-10-21: selected V2 work is complete: F17 maintenance,
F15-UH01/UH02 lessons, F18 design, F08–F10 tools, F19 review and F20 Docker.
F11 is removed; five further lessons remain deferred. F20 is owner-accepted on
local Linux evidence; Windows/other machines/ARM64 and real Safari are unverified.
Future VPS deployment is outside this delivery. Earlier scope/forecast statements
below are historical where superseded. See plan.json and the current handoff.

Current scope, 2026-10-20: V1 is accepted and F16 merged. [ADR010](adr-010-v2-delivery-and-portable-handoff.md)
and the [selected V2 sequence](../planning/roadmap.md#v2-delivery-sequence) supersede the blanket freeze and remaining-V1
forecasts below. Only two additional lessons are selected; design agreement precedes
remaining tools, then final browser review and Docker Desktop/second-PC handoff.
Earlier estimates, scope exclusions and pending statements below are historical
where superseded; they do not reopen V1 or claim new checks have passed.

Reviewed 2026-10-09. Verdict: **feasible; proceed to manual bootstrap and bounded technical proofs.** This is a documentation review supported by official references, not evidence that an application has been compiled or tested.

Scope update, 2026-10-18: [ADR 007](adr-007-focused-mvp.md) explicitly supersedes
the historical eight-tool/full-course release gate and container prerequisite below.
F00–F06 are now accepted with implementation evidence in the current handoff. V1
retains F06/F07, the complete website journey and one reviewed EN/ES/FR learning
unit; other tools, additional units and Docker/Compose are V2. The original review
below remains historical, not a new bootstrap or course-completion instruction.

## Findings and trade-offs

| Area | Assessment | Required action / gate |
|---|---|---|
| Java/Boot | Java 25 and Boot 4.1.1 are offered by live Initializr; documented compatible | F01: generated POM/context/packaged smoke; pin actual runtime and wrapper |
| Monolith/SSR | Fits public pages, content and browser tools with low operational overhead | Keep one module; add interfaces at actual boundaries only |
| Stateless locale | Cookie preference and cookie-backed CSRF are compatible with server-rendered forms | F04: real GET→POST flow; no JSESSIONID; explicit cookie flags |
| CodeMirror/CSP | Nonce support exists, but editor runtime styling and worker policy need browser proof | F05: selection, scroll, tooltips, resize, search and worker tests in Chromium/Firefox/WebKit |
| JSON correctness | Parse/stringify can change large numbers, duplicate keys, escapes and ordering | F06: strict validation plus token-preserving text edits; no silent data changes |
| YAML fidelity | YAML's type/key/alias system exceeds JSON | F11: reject lossy/ambiguous input; no general-object round-trip assumptions |
| i18n | Single server message source is straightforward; prose translation is substantial work | F03/F04 key checks; human review per feature and lesson |
| Accessibility | Dark brand is feasible; muted values are not universally readable | F03: role-specific contrast; F05/F06 manual editor checks |
| Build-watch | Target assets are feasible but one-time Maven copies become stale | F02: prove successive rebuilds are served; choose a dev-only generated-resource path |
| Container health | Minimal images may not contain curl/wget | F12: choose and test a probe available in the image; keep management unpublished |
| Logging | Privacy goals conflict with indiscriminate stack traces/request logging | F04/F12: event codes, route templates, no payload-derived diagnostics |
| Ten hours/week | AI reduces some coding effort but not acceptance, translation or ownership | Serial schedule; measured reforecast after foundations and formatter |
| Complete course | An initial lesson is not a complete Java Fundamentals course | F14 outline gate; F15 content/translation reviewed independently from engineering |

## Explicit refinements to the accepted baseline

1. **Entry point:** preserve the root Initializr package initially. Moving to `bootstrap` adds an unnecessary scan configuration immediately; composition classes can still live there. No dependency boundary changes.
2. **No-network verification:** checking only “no requests after warm-up” misses cold-start/lazy/worker leaks. Test a fresh browser context, all document and worker traffic, request bodies and synthetic sentinel occurrences. Allowlist expected immutable asset GETs. Then assert no operation-triggered requests after assets are loaded.
3. **Worker CSP:** document CSP is not the full worker execution policy. Serve worker JavaScript with an appropriate response CSP (at least deny outbound connections and unsafe evaluation), and inspect worker traffic separately.
4. **Resource budgets:** two seconds and 1 MiB are initial hypotheses, not hardware-independent promises. Record reference browser/hardware and benchmark pathological nesting, expansion, cancellation and editor insertion. Do not claim an output cap prevents all transient allocations.
5. **Requests:** servlet form-size settings alone do not bound every request body. Deny unneeded body-bearing methods/routes and test chunked/streamed bodies for the actual allowed form endpoint.
6. **Release scope:** M1 formatter, M2 all tools and M3 pilot lesson are incremental releases. Only M4 (complete reviewed course plus full regression) meets the entire Phase 1 scope.
7. **Public repository:** no deployment is implied; keep licences, font/asset permissions and reporting contacts explicit rather than adding a default MIT licence.

These refinements preserve the agreed product and stack. Any material CSP relaxation, lossless-conversion compromise or reduced course scope requires an explicit decision and an updated ADR.

## What has actually been checked

- User source request and supplied brand document reviewed; logo correction recorded.
- Original workspace has no application source; destination did not exist at initial inspection.
- `git ls-remote` returned no refs for the supplied repository on 2026-10-09.
- Initializr live metadata returned Boot 4.1.1, Java 25 and all five requested dependency IDs.
- Official Boot compatibility, JDK release, Spring Security, Vite, accessibility and ASVS references reviewed.

Not yet checked: dependency vulnerability scan of an actual lockfile, application compilation, editor CSP compatibility, benchmark results, translations, container runtime, CI permissions or branch protection. These require the imported project and are scheduled gates, not reasons to generate the app early.

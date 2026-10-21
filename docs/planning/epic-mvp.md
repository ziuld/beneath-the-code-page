# EPIC-MVP — Beneath the Code Phase 1

Current delivery,2026-10-21: selected V2 work is complete: F17 maintenance,
F15-UH01/UH02 lessons, F18 design, F08–F10 tools, F19 review and F20 Docker.
F11 is removed; five further lessons remain deferred. F20 is owner-accepted on
local Linux evidence; Windows/other machines/ARM64 and real Safari are unverified.
Future VPS deployment is outside this delivery. Earlier scope/forecast statements
below are historical where superseded. See plan.json and the current handoff.

Current scope, 2026-10-20: V1 is accepted and F16 merged. [ADR010](../architecture/adr-010-v2-delivery-and-portable-handoff.md)
and the [selected V2 sequence](roadmap.md#v2-delivery-sequence) supersede the blanket freeze and remaining-V1
forecasts below. Only two additional lessons are selected; design agreement precedes
remaining tools, then final browser review and Docker Desktop/second-PC handoff.
Earlier estimates, scope exclusions and pending statements below are historical
where superseded; they do not reopen V1 or claim new checks have passed.

Status: V1 locally accepted,2026-10-20; all retained V1 features accepted with evidence. Owner: Ziuld, supported by AI. Hierarchy: **Epic → Feature → User Story (UH) → Task**. Scope revised 2026-10-18 in [ADR 007](../architecture/adr-007-focused-mvp.md).

## Outcome

Deliver a complete small, secure SSR website with F06 JSON Formatter, F07 JSON Validator and Minifier, and one complete Java Fundamentals learning unit in English, Spanish and French. Preserve the approved B logo and editorial/workspace visual direction. The first unit demonstrates explanation, example, exercise and answer; it is not a complete course.

## Scope and boundaries

Home, header/footer and shared navigation/design system; language selection; secure SSR/browser foundation; Formatter/Validator/Minifier; Learn landing, course overview and one complete source-to-JVM unit; responsive visual polish; safe errors/no-JS states; existing packaged-JAR local run and contributor handoff.

F08–F11 and F15 are frozen for V2: Base64, UUID, JWT, JSON/YAML conversion and additional course units. Docker/Compose and a broad redesign are also deferred. No accounts, stored payloads/progress, CMS, plugin framework, unjustified persistence, SPA router, microservices, production hosting or cloud deployment.

## Feature hierarchy

[Open the feature → UH → task index](hierarchy.md). Retain F00–F16 and original baseline estimates. Feature release membership separates V1 from frozen V2; execution status does not imply release membership. F12 integrates only JSON tools and the existing local runtime; F13 builds learning pages; F14 delivers one unit; F16 polishes and accepts the retained website.

## Epic completion

All V1 feature stories/tasks are accepted with evidence; F06/F07 and the complete first unit work in EN/ES/FR; Home → Tools → JSON operations and Home → Learn → course → unit/answer journeys work without dead links. Shared privacy/security/keyboard/visual/architecture criteria pass; the local build/JAR run is reproducible; no unresolved release-blocking defects remain. Deferred V2 work neither blocks closure nor counts as completed.

The original 298-hour all-backlog baseline and the October18 remaining-V1 forecast
of42h plus20% contingency were planning history. Remaining V1 work is now zero;
V2 is still frozen, not completed. [Final local acceptance evidence](../../harness/evidence/F16-integrated-acceptance.md)
records the tested implementation/handoff revisions and limitations. No remote
release or deployment is implied. Actual owner effort is unreported; this is not a measured delivery promise. No product completion is awarded for replanning.

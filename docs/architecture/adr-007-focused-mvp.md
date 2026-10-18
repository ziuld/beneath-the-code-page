# ADR 007 — Focused MVP and frozen V2 backlog

Date: 2026-10-18. Status: accepted by the owner in the MVP replanning conversation.

## Context

F00–F06 are accepted; F06 is archived with actual three-engine evidence. The
original eight-tool/full-course plan is too broad for the first release. The
owner wants a complete small website that demonstrates every required page type,
not a framework or an unfinished course catalogue.

## Decision

- V1 product scope is F06 JSON Formatter, F07 JSON Validator and Minifier, the
  shared website, learning landing/course/unit pages and one complete learning
  unit in EN/ES/FR. F06/F07 are two feature IDs, covering three JSON operations.
- F08–F11 and F15 are frozen for V2. Preserve IDs, baseline estimates and
  requirements; exclude them from V1 scheduling, progress and acceptance.
- F12 integrates only the published JSON tools and verifies the existing local
  packaged-JAR workflow. Docker/Compose, container scans and container-specific
  hardening are V2 work, not a new MVP prerequisite. Retain application-level
  health, dependency/security checks, privacy and safe local configuration.
- F13 provides Learn → Java Fundamentals → one published unit, breadcrumbs and
  return navigation. A single unit needs no previous/next links; test future
  consecutive-unit navigation with synthetic fixtures, not extra published units.
  Verify F13 infrastructure with synthetic content so it can close before F14;
  expose production Learn navigation only once the real reviewed unit is ready.
- F14 delivers the existing source → bytecode → JVM unit with explanation, worked
  example, exercise and explanatory answer. A short unit brief replaces the full
  eight-lesson syllabus gate. Additional units require a later scope decision.
- F16 completes shared page integration/visual polish and accepts this V1 only.
  Home, Tools, JSON pages, Learn, course overview, unit/answer, errors and no-JS
  states must form coherent EN/ES/FR journeys. No new unrelated page families.
- Keep the approved B identity and visual direction. Improve consistency,
  responsive behaviour and readability; defer a broad redesign to V2.

## Architecture and simplicity

Keep one Spring MVC/Thymeleaf application with selective browser-local TypeScript.
Reuse the accepted JSON parser, worker lifecycle, diagnostics and editor. Use
local content resources, minimal course metadata and shared SSR templates; no CMS,
plugin platform, generic tool registry framework, database or speculative ports.
Add abstractions only at demonstrated boundaries. Preserve strict JSON fidelity,
limits, CSP, payload privacy, keyboard/visual checks and EN/ES/FR review.

## Tracking and estimates

Feature `release` is V1 or V2, separate from execution status. V2 stays planned,
not falsely done or technically blocked. V1 must never depend on V2. Epic closure
requires every V1 feature accepted with evidence; V2 is not counted as completed.
Original baseline hours remain historical; only forecasts change. Revised forecasts
are provisional owner-time budgets, not measured velocity or dates. Zero recorded
actual hours means unreported effort, not that accepted work took no time.

## Consequences

The MVP demonstrates all retained page types and supports later additions through
ordinary content and code changes. It does not deliver a complete course, all
tools, container reproducibility, production hosting or a redesign. This explicitly
supersedes the old all-tools/full-course M2–M4 exit gates and container prerequisite;
it does not waive retained quality checks or authorise implementation/publication.

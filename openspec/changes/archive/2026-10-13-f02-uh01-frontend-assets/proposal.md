# Proposal

## Why

The accepted F01 Java baseline builds and starts, but it has no browser asset pipeline or manifest-to-view integration. F02-UH01 provides reproducible, versioned assets inside the executable application before product pages are introduced.

## What Changes

- Implement **F02-UH01 — Package browser assets with server views**, under EPIC-MVP → F02, after the accepted F01 prerequisite.
- Pin project-local frontend tooling; build a minimal TypeScript site entry and imported CSS with Vite as part of Maven verification and packaging.
- Package hashed public assets and a private manifest; resolve entry scripts, imported stylesheets and static imports for server-rendered views.
- Reject a build missing a required manifest entry at application startup with a safe diagnostic.
- Verify JAR contents, manifest traversal, rendered asset references, actual HTTP asset bytes and incomplete-build startup failure; retain F02-UH01-R01/R02, AC01/AC02 and T01–T05.
- Use test-only rendering fixtures instead of introducing a product route or shared shell.

Out of scope: F02-UH02 build-watch and import-boundary enforcement; F03 pages, design-system implementation and translations; F04 security/locale changes; editors, workers, developer-tool processing, SPA routing, Cucumber installation and deployment.

## Capabilities

### New Capabilities

- `packaged-browser-assets`: Hashed browser assets referenced by server views are available from the packaged application, and missing required manifest entries prevent startup.

### Modified Capabilities

None. The installed OpenSpec capability inventory is empty; this proposal does not assert that planned behaviour already exists.

## Impact

Future implementation affects `pom.xml`, project-local frontend configuration and lockfile, `src/main/frontend/`, `dev.beneaththecode.platform.web.assets`, bootstrap wiring, test fixtures and build documentation. Generated output remains under `target/frontend/` and is never committed; Node is build tooling, not an application runtime dependency. The existing Java entry point, dependency boundaries, generated starters and security baseline remain intact.

Planning authority remains `docs/planning/plan.json`. These deltas are a reviewable translation of its existing acceptance, not a second editable catalogue. Before behavioural adoption, explicitly migrate this story's requirements/scenarios to stable OpenSpec links, adapt the planning renderers/validator together and retain tracker status, estimates, dependencies and evidence; that migration is not silently performed by this proposal. F02-UH02 and the remaining MVP retain their existing authority and scope.

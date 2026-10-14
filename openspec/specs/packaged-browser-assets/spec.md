# packaged-browser-assets Specification

## Purpose

Provide versioned browser assets that server-rendered views can reference reliably from the packaged application, and prevent startup when a required manifest entry is absent.

## Requirements

### Requirement: F02-UH01-R01 — Serve packaged hashed browser assets

When the clean application build succeeds, the packaged application SHALL serve the hashed browser assets referenced by its rendered pages.

#### Scenario: F02-UH01-AC01 — Resolve packaged assets

- **GIVEN** a clean build has generated a site entry and its imported stylesheet
- **WHEN** the packaged application renders the page
- **THEN** the referenced JS and CSS URLs return the matching built assets

### Requirement: F02-UH01-R02 — Reject a missing required manifest entry

If a required manifest entry is absent, then application startup SHALL fail with a safe diagnostic.

#### Scenario: F02-UH01-AC02 — Reject an incomplete build

- **GIVEN** the generated manifest is missing a required entry
- **WHEN** the packaged application starts
- **THEN** startup fails instead of serving a page with broken asset links

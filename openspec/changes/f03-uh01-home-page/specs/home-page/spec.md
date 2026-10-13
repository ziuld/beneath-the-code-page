# Spec Delta

## Purpose

Help visitors understand Beneath the Code's tools and learning purpose through a semantic server-rendered Home page, with navigation that does not advertise unpublished destinations.

## ADDED Requirements

### Requirement: F03-UH01-R01 — Describe the site through server-rendered Home content

When a visitor requests the Home page, Beneath the Code SHALL return semantic server-rendered content describing its tools and learning purpose.

#### Scenario: F03-UH01-AC01 — Read Home without JavaScript

- **GIVEN** JavaScript is disabled
- **WHEN** a visitor opens the Home page
- **THEN** the response contains the brand identity, a main heading and the tools and learning descriptions

### Requirement: F03-UH01-R02 — Avoid links to unpublished destinations

If a section has no published destination, then the Home page SHALL present that section without a broken actionable link.

#### Scenario: F03-UH01-AC02 — Avoid advertising an unavailable destination

- **GIVEN** a tools or learning destination has not been published in the current increment
- **WHEN** a visitor inspects the Home navigation
- **THEN** the section is described without a link to a missing page

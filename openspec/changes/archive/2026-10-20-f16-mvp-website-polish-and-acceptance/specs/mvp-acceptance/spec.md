# Spec Delta

## Purpose

Define the evidence-based acceptance boundary for the complete retained V1
website journey, so incomplete verification cannot become MVP completion.

## ADDED Requirements

### Requirement: F16-UH01-R01 — Accept the complete retained website journey

When V1 acceptance is evaluated, the website SHALL provide coherent Home, Tools,
JSON tool, Learn, course overview, unit, answer and error journeys in EN/ES/FR
using the approved shared design system.

#### Scenario: F16-UH01-AC01 — Review complete scope

- **GIVEN** all prerequisite V1 feature stories report completion with evidence and V2 features remain frozen
- **WHEN** the owner evaluates M4
- **THEN** the review covers F06/F07, one complete learning unit, every retained page type and shared quality gates without requiring V2 scope
- **AND** evidence covers Chromium, privacy/security/architecture, keyboard, responsive layout, actual 200% browser zoom and EN/ES/FR journeys
- **AND** native reading/navigation remains usable without JavaScript and tool pages explain the processing limitation
- **AND** no unavailable tool or unit is advertised as an actionable destination

### Requirement: F16-UH01-R02 — Reject incomplete MVP acceptance

If a required acceptance criterion fails, then the MVP epic SHALL remain open.

#### Scenario: F16-UH01-AC02 — Reject incomplete MVP acceptance

- **GIVEN** one required accessibility or privacy scenario fails
- **WHEN** the release review runs
- **THEN** the failing story is reopened or blocked and the epic is not marked done

#### Scenario: Incomplete or blocking security evidence prevents acceptance

- **GIVEN** a required security scan is incomplete or a blocking finding lacks a valid applicable owner-approved disposition
- **WHEN** final V1 acceptance is evaluated
- **THEN** the unresolved result is visible and MVP acceptance remains open despite passing build or browser checks
- **AND** an expired or changed-scope approval cannot be silently renewed

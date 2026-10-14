# shared-interface Specification

## Purpose

Provide consistent shared-interface labels in English, Spanish and French and a keyboard-accessible interface with visible focus on every reachable control.

## Requirements

### Requirement: F03-UH02-R01 — Render shared labels from the active locale

While a supported locale is active, the shared interface SHALL render its labels from that locale's message resources.

#### Scenario: F03-UH02-AC01 — Render French interface labels

- **GIVEN** the resolved locale is French
- **WHEN** the Home page is rendered
- **THEN** its navigation and accessibility labels use French resources and no unresolved message keys

### Requirement: F03-UH02-R02 — Expose visible keyboard focus

When a keyboard user navigates the shared interface, the interface SHALL expose visible focus on every reachable control.

#### Scenario: F03-UH02-AC02 — Navigate without a mouse

- **GIVEN** the Home page is at a narrow viewport and the user uses only a keyboard
- **WHEN** the user traverses the shared navigation and controls
- **THEN** focus remains visible and the user can reach and leave every control

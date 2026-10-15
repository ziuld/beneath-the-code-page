# Spec Delta

## Purpose

Provide a reusable browser-local editor that keyboard and assistive-technology users can operate in English, Spanish or French under the application's restrictive content security policy.

## ADDED Requirements

### Requirement: F05-UH01-R01 — Leave the labelled editor without a keyboard trap

When a keyboard user invokes the documented editor escape action, the editor SHALL allow focus to move to the next workspace control. Labels, instructions and status announcements SHALL use the active EN/ES/FR resources, and reachable controls SHALL retain visible focus.

#### Scenario: F05-UH01-AC01 — Leave the editor

- **GIVEN** focus is inside the labelled editor
- **WHEN** the user invokes the documented escape action and advances focus
- **THEN** focus reaches the next workspace control without a trap

#### Scenario: Discover and use the keyboard instructions

- **GIVEN** an EN, ES or FR workspace with its editor and following control
- **WHEN** the visitor enters the editor by keyboard or with a screen reader
- **THEN** the editor has a resource-backed accessible name and discoverable Escape-then-Tab instructions
- **AND** Escape followed by Tab exits forward, reverse traversal remains possible and focus is visible

#### Scenario: Bound editor insertion before expensive processing

- **GIVEN** an editor with the initial 1 MiB UTF-8 input budget
- **WHEN** typing, paste or programmatic replacement would exceed that budget
- **THEN** the edit is rejected before expensive editor processing, existing accepted content remains unchanged and a localised status is announced
- **AND** Unicode byte size, not character count, determines the boundary

#### Scenario: Preserve safe browser-local enhancement

- **WHEN** text resembling HTML or script is edited
- **THEN** it remains inert text and is neither transmitted nor placed in URLs, logs, cookies or persistent browser storage
- **WHEN** JavaScript is unavailable
- **THEN** resource-backed explanatory content and a processing notice remain available, without an input-submitting form

### Requirement: F05-UH01-R02 — Operate the editor under restrictive page CSP

While the restrictive page CSP is enforced, the editor SHALL support selection, scrolling and search without prohibited resource loads. Tooltips, resizing and focus behaviour SHALL remain usable without weakening the accepted security policy. Editor assets SHALL load only for editor workspaces, not ordinary Home visits.

#### Scenario: F05-UH01-AC02 — Use editor under CSP

- **GIVEN** the page enforces the proposed nonce-based style policy
- **WHEN** the user selects text, scrolls and searches
- **THEN** the editor remains usable and no prohibited resource request occurs

#### Scenario: Exercise nonce styling, tooltips and resize across engines

- **GIVEN** the accepted page policy with per-response style nonce, style-src-attr 'none', no unsafe-inline and no unsafe-eval
- **WHEN** the editor is used, a tooltip/search panel is shown and the workspace is resized in Chromium, Firefox and WebKit
- **THEN** selection, scrolling, search and tooltip placement work, controls remain reachable and relevant security-policy violations do not occur
- **AND** a separate document uses its own nonce and no external resource is loaded

#### Scenario: Keep the shared shell independent of editor loading

- **WHEN** Home loads in a fresh browser context
- **THEN** it does not fetch editor/worker assets or publish an unfinished tool link
- **AND** existing language preferences, shared styling, no-session behaviour and approved B bytes remain unchanged

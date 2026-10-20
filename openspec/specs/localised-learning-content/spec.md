# localised-learning-content Specification

## Purpose

Render complete, repository-owned learning resources in the learner's supported
language without treating authored Markdown as executable browser content.

## Requirements

### Requirement: F13-UH02-R01 — Render complete localised learning content

A published unit SHALL render its localised title, prose and exercise instructions
in the resolved EN/ES/FR language using immutable local resources. Publication
SHALL require complete resources for all three languages; missing translations
SHALL NOT silently produce mixed-language or placeholder content.

#### Scenario: F13-UH02-AC01 — Read the Spanish lesson

- **GIVEN** a synthetic published unit has complete EN/ES/FR resources
- **WHEN** the learner opens it with Spanish selected
- **THEN** its title, prose and exercise instructions are Spanish, with Spanish shared labels
- **AND** the same content identity is available in English and French through the existing locale rules

#### Scenario: Reject incomplete publication data

- **WHEN** an entry declared published is missing a required locale, title or body resource
- **THEN** content initialisation fails with a safe bounded diagnostic rather than publishing a partial catalogue or substituting another language
- **AND** an intentionally empty production catalogue remains valid and publishes no units

### Requirement: F13-UH02-R02 — Keep authored markup inert

Markdown rendering SHALL prevent raw HTML, scripts, event handlers and executable
link targets from becoming active lesson markup. Fenced examples SHALL remain
selectable inert text. Lesson content SHALL NOT trigger automatic remote-resource
loads or require weaker document CSP; escaping only the surrounding page is not
sufficient protection for rendered lesson content.

#### Scenario: F13-UH02-AC02 — Treat embedded script as untrusted markup

- **GIVEN** a synthetic Markdown fixture contains inline/block script elements and event-handler markup
- **WHEN** the lesson renderer processes it
- **THEN** no executable fixture script or handler appears in the rendered lesson
- **AND** the existing CSP remains unchanged and ordinary rendering causes no CSP violations

#### Scenario: Reject active links and embedded resources

- **WHEN** fixtures contain javascript/data links, encoded unsafe schemes or Markdown images
- **THEN** unsafe link targets cannot execute and image content cannot initiate an automatic resource request
- **AND** invalid source content cannot be silently published as a successful lesson

#### Scenario: Preserve useful learning structure safely

- **WHEN** a fixture contains headings, paragraphs, lists, emphasis, safe links and fenced Java code with HTML-looking characters
- **THEN** normal reading structure remains available and the code is displayed as inert text without loading an editor or syntax service

### Requirement: Load only catalogue-owned course resources

Published content SHALL be selected only from the configured local course catalogue
and supported locale resources. Request paths, query values and Markdown links
SHALL NOT select arbitrary files, remote documents or templates. Source failures
SHALL expose only safe diagnostics, never raw content or resource locations.

#### Scenario: Keep resource lookup inside the course boundary

- **WHEN** an unknown, encoded or traversal-like slug is supplied or a draft file exists outside the published catalogue
- **THEN** it cannot be loaded as a published unit or escape the local content root
- **AND** errors and application logs contain no raw attacker-supplied value or content excerpt

### Requirement: F14-UH02-R01 — Explain the source-to-JVM sequence with a verified example

The published first unit SHALL explain Java source, compilation to bytecode and
execution by a compatible JVM through a consistent diagram and worked example
in EN/ES/FR. Its commands, terminology and expected results SHALL agree with
verified behaviour on the baseline JDK.

#### Scenario: F14-UH02-AC01 — Inspect the pilot explanation

- **GIVEN** the unit has completed technical and language review
- **WHEN** the learner reads the explanation, diagram and worked example in a supported language
- **THEN** source, compiled bytecode and JVM execution are distinguished consistently
- **AND** the documented compile/run sequence and output agree with the verified example
- **AND** the content does not claim that a JVM always interprets code or that bytecode runs on every Java version

#### Scenario: Publish only complete reviewed translations

- **GIVEN** the first unit is published in the normal application
- **WHEN** the learner selects English, Spanish or French
- **THEN** the title, explanation, diagram description, example instructions and exercise are complete in that language
- **AND** no synthetic fixture text or fallback-language placeholder is presented as reviewed course content

### Requirement: F14-UH02-R02 — Provide an accessible explanatory exercise answer

The unit SHALL provide a clearly labelled exercise and answer that explain the
reasoning behind a compilation/execution outcome, not merely a final value.
The answer SHALL be readable on the same unit page through ordinary headings
and text without requiring JavaScript, an account or code execution by the site.

#### Scenario: F14-UH02-AC02 — Review an explanatory answer

- **GIVEN** the exercise asks the learner to trace a compilation/execution outcome
- **WHEN** the learner reaches its answer in English, Spanish or French
- **THEN** the answer states the expected result and explains the source/bytecode/JVM reasoning
- **AND** the reasoning is consistent with the worked example and the tested outcome

#### Scenario: Read the answer without interactive dependencies

- **WHEN** the learner reads the exercise and answer with JavaScript disabled
- **THEN** both remain visible under distinguishable localised headings
- **AND** keyboard navigation, narrow reflow and actual 200% zoom preserve access to the explanation
- **AND** the site does not submit learner code or load an editor, worker or remote diagram resource for this unit

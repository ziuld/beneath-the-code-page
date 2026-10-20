# Spec Delta

## ADDED Requirements

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

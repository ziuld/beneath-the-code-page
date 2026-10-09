@EPIC-MVP @F15 @F15-UH02
Feature: F15-UH02 — Control flow and tracing
  As a learner, I want to trace branches and loops deliberately, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH02-AC01 @F15-UH02-R01
  Scenario: Connect the model to execution
    Given a worked example has a branch and bounded loop
    When the learner follows the execution trace
    Then the trace and verified program output agree

  @F15-UH02-AC02 @F15-UH02-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

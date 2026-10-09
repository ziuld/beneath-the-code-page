@EPIC-MVP @F15 @F15-UH01
Feature: F15-UH01 — Values, types and numeric limits
  As a learner, I want to predict primitive values and recognise numeric limits, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH01-AC01 @F15-UH01-R01
  Scenario: Connect the model to execution
    Given a worked example reaches an integer limit
    When the learner traces the next operation
    Then the explanation and observed output agree on the overflow behaviour

  @F15-UH01-AC02 @F15-UH01-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

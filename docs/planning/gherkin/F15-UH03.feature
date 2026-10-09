@EPIC-MVP @F15 @F15-UH03
Feature: F15-UH03 — Methods and stack frames
  As a learner, I want to understand calls and local-variable lifetimes, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH03-AC01 @F15-UH03-R01
  Scenario: Connect the model to execution
    Given a worked example calls a nested method
    When the learner inspects the call/return trace
    Then the explanation distinguishes each invocation and its local values

  @F15-UH03-AC02 @F15-UH03-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

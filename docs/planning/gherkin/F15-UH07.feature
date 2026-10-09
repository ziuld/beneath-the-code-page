@EPIC-MVP @F15 @F15-UH07
Feature: F15-UH07 — Collections, generics and equality
  As a learner, I want to choose and reason about basic collections, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH07-AC01 @F15-UH07-R01
  Scenario: Connect the model to execution
    Given a worked example uses equality in a collection
    When the learner predicts lookup or membership
    Then the explanation agrees with the verified equality/hash behaviour

  @F15-UH07-AC02 @F15-UH07-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

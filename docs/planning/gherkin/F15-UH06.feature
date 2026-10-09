@EPIC-MVP @F15 @F15-UH06
Feature: F15-UH06 — Exceptions and resource lifetimes
  As a learner, I want to reason about failures and cleanup, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH06-AC01 @F15-UH06-R01
  Scenario: Connect the model to execution
    Given a worked example exits a try-with-resources block exceptionally
    When the learner traces cleanup
    Then the answer explains the verified cleanup and exception outcome

  @F15-UH06-AC02 @F15-UH06-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

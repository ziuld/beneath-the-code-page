@EPIC-MVP @F15 @F15-UH05
Feature: F15-UH05 — Encapsulation and interfaces
  As a learner, I want to understand contracts and substitutable implementations, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH05-AC01 @F15-UH05-R01
  Scenario: Connect the model to execution
    Given a worked example invokes an interface through two implementations
    When the learner compares the results
    Then the explanation separates the shared contract from implementation behaviour

  @F15-UH05-AC02 @F15-UH05-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

@EPIC-MVP @F15 @F15-UH04
Feature: F15-UH04 — Objects, references and heap
  As a learner, I want to distinguish objects from references, so that I can explain Java behaviour using a concrete mental model.

  @F15-UH04-AC01 @F15-UH04-R01
  Scenario: Connect the model to execution
    Given two variables refer to the same mutable object
    When the learner predicts a mutation through one reference
    Then the lesson explains the shared-object outcome consistently with program output

  @F15-UH04-AC02 @F15-UH04-R02
  Scenario: Deliver the complete translated lesson
    Given the lesson is selected in French
    When the learner reads its explanation, exercise and answer
    Then all three sections are present in reviewed French without untranslated placeholders

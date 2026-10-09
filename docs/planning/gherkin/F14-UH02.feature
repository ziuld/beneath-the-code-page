@EPIC-MVP @F14 @F14-UH02
Feature: F14-UH02 — Learn the source-to-JVM mental model
  As a learner, I want to understand how Java source becomes running code, so that I can explain compilation and execution beyond syntax.

  @F14-UH02-AC01 @F14-UH02-R01
  Scenario: Inspect the pilot explanation
    Given the pilot has completed technical and language review
    When the learner opens it
    Then the sequence, example and vocabulary match the verified Java behaviour

  @F14-UH02-AC02 @F14-UH02-R02
  Scenario: Review an explanatory answer
    Given the pilot exercise asks the learner to trace a compilation/execution outcome
    When the learner opens its answer
    Then the answer explains the outcome rather than supplying only a final value

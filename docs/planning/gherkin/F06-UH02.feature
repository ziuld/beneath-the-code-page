@EPIC-MVP @F06 @F06-UH02
Feature: F06-UH02 — Correct invalid or oversized JSON safely
  As a developer, I want to receive actionable errors without losing my input, so that I can correct a document and retry.

  @F06-UH02-AC01 @F06-UH02-R01
  Scenario: Explain a trailing comma
    Given the input is {"id":1,}
    When the developer requests formatting
    Then a localised syntax diagnostic identifies the error and the original input is unchanged

  @F06-UH02-AC02 @F06-UH02-R02
  Scenario: Reject oversized paste before editor work
    Given the editor contains a small valid document
    When the developer pastes more than 1 MiB of UTF-8 content
    Then the oversized replacement is rejected and the previous input remains available

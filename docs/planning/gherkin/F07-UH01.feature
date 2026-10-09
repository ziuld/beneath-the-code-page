@EPIC-MVP @F07 @F07-UH01
Feature: F07-UH01 — Validate strict JSON
  As a developer, I want to check whether text is valid JSON, so that I can identify syntax errors before using the document.

  @F07-UH01-AC01 @F07-UH01-R01
  Scenario: Validate a primitive root
    Given the input is the JSON value true
    When the developer validates it
    Then the result is valid without rewriting the input

  @F07-UH01-AC02 @F07-UH01-R02
  Scenario: Reject comments
    Given the document contains a line comment
    When the developer validates it
    Then the validator reports a syntax error with a location

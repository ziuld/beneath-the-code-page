@EPIC-MVP @F06 @F06-UH01
Feature: F06-UH01 — Format valid JSON without changing its data
  As a developer, I want to format valid JSON while preserving its tokens, so that I can inspect documents without corrupting their values.

  @F06-UH01-AC01 @F06-UH01-R01
  Scenario: Preserve an unsafe JavaScript integer
    Given the input is {"id":9007199254740993}
    When the developer formats with two-space indentation
    Then the output retains the numeric token 9007199254740993

  @F06-UH01-AC02 @F06-UH01-R02
  Scenario: Process a private sentinel locally
    Given the formatter contains a unique synthetic sentinel and all initial assets are loaded
    When the developer formats the document
    Then no operation-triggered request is made and the sentinel is absent from persistent storage and application logs

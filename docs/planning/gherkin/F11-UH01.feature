@EPIC-MVP @F11 @F11-UH01
Feature: F11-UH01 — Convert supported JSON to YAML faithfully
  As a developer, I want to convert JSON to YAML without silent data loss, so that I can change notation while retaining meaning.

  @F11-UH01-AC01 @F11-UH01-R01
  Scenario: Convert an ordinary JSON document
    Given the JSON contains strings, finite supported numbers, booleans, null and arrays
    When the developer converts it to YAML
    Then parsing the result under the documented schema yields equivalent values and structure

  @F11-UH01-AC02 @F11-UH01-R02
  Scenario: Reject duplicate-key conversion
    Given the JSON is {"a":1,"a":2}
    When the developer requests YAML conversion
    Then an ambiguity diagnostic appears without a lossy output

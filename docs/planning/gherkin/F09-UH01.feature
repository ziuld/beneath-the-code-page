@EPIC-MVP @F09 @F09-UH01
Feature: F09-UH01 — Generate bounded cryptographic UUID v4 values
  As a developer, I want to generate UUID v4 values locally, so that I can create identifiers without sharing them.

  @F09-UH01-AC01 @F09-UH01-R01
  Scenario: Generate three identifiers
    Given the selected batch size is 3
    When the developer activates Generate
    Then three correctly shaped version-4 and variant-correct UUIDs appear

  @F09-UH01-AC02 @F09-UH01-R02
  Scenario: Reject an oversized batch
    Given the requested count is 101
    When the developer activates Generate
    Then a localised limit error appears and no batch is generated

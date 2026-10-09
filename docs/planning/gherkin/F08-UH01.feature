@EPIC-MVP @F08 @F08-UH01
Feature: F08-UH01 — Encode and decode UTF-8 Base64
  As a developer, I want to convert UTF-8 text to and from Base64, so that I can inspect encoded text locally.

  @F08-UH01-AC01 @F08-UH01-R01
  Scenario: Round-trip accented text
    Given the input text is café
    When the developer encodes it and decodes that result
    Then the resulting text is café

  @F08-UH01-AC02 @F08-UH01-R02
  Scenario: Reject invalid encoded text
    Given decode mode contains the input %%%
    When the developer requests decoding
    Then an invalid-input message appears without successful decoded output

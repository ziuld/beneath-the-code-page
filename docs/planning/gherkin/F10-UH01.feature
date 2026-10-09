@EPIC-MVP @F10 @F10-UH01
Feature: F10-UH01 — Inspect a JWT without implying signature verification
  As a developer, I want to decode JWT header and claims locally, so that I can inspect a token without mistaking decoding for validation.

  @F10-UH01-AC01 @F10-UH01-R01
  Scenario: Decode a synthetic signed-shaped token
    Given the input is a synthetic three-part compact JWS with JSON header and payload
    When the developer decodes it
    Then the JSON fields are shown alongside a localised signature-not-verified notice

  @F10-UH01-AC02 @F10-UH01-R02
  Scenario: Reject encrypted-token form
    Given the input has five dot-separated segments
    When the developer requests decoding
    Then the tool reports unsupported format without fetching keys or implying validation

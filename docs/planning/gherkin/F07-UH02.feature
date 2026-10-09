@EPIC-MVP @F07 @F07-UH02
Feature: F07-UH02 — Minify JSON without changing tokens
  As a developer, I want to remove unnecessary JSON whitespace, so that I obtain compact content without data changes.

  @F07-UH02-AC01 @F07-UH02-R01
  Scenario: Preserve whitespace inside a string
    Given the document contains a string whose value is a b
    When the developer minifies the document
    Then the space inside the string remains while insignificant whitespace is removed

  @F07-UH02-AC02 @F07-UH02-R02
  Scenario: Do not minify a broken document
    Given a previous successful result exists and the input becomes invalid
    When the developer requests minification
    Then the old result is marked stale and cannot be copied as the new result

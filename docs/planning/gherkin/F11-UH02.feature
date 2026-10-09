@EPIC-MVP @F11 @F11-UH02
Feature: F11-UH02 — Convert supported YAML to strict JSON
  As a developer, I want to convert a safe YAML subset to JSON, so that I can use configuration values in JSON tools.

  @F11-UH02-AC01 @F11-UH02-R01
  Scenario: Convert a safe mapping
    Given the YAML is a single document with unique string keys and supported scalar values
    When the developer converts it to JSON
    Then the output is strict JSON representing those values

  @F11-UH02-AC02 @F11-UH02-R02
  Scenario: Reject resource-expanding YAML
    Given the input contains aliases exceeding the configured expansion budget
    When the developer requests conversion
    Then the worker rejects the input without freezing the workspace

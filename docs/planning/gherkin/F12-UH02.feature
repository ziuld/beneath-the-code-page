@EPIC-MVP @F12 @F12-UH02
Feature: F12-UH02 — Run the complete tools locally in a hardened container
  As a maintainer, I want to run a reproducible local container, so that I can verify the integrated application without cloud infrastructure.

  @F12-UH02-AC01 @F12-UH02-R01
  Scenario: Start the local runtime
    Given the pinned image is built and documented prerequisites are available
    When the maintainer starts the Compose service
    Then the application becomes healthy and the management port is not published

  @F12-UH02-AC02 @F12-UH02-R02
  Scenario: Block an unsafe release candidate
    Given the release scan contains a finding classified as blocking
    When integrated verification runs
    Then the release gate fails with a traceable finding record

@EPIC-MVP @F12 @F12-UH02
Feature: F12-UH02 — Verify the existing packaged application locally
  As a maintainer, I want to use the existing packaged-JAR workflow, so that I can verify the MVP without adding container infrastructure.

  @F12-UH02-AC01 @F12-UH02-R01
  Scenario: Start the local runtime
    Given the executable JAR is built and documented prerequisites are available
    When the maintainer follows the existing local JAR workflow
    Then the application becomes healthy on loopback without unintended management exposure or a separate management server requirement

  @F12-UH02-AC02 @F12-UH02-R02
  Scenario: Block an unsafe release candidate
    Given the release scan contains a finding classified as blocking
    When integrated verification runs
    Then the release gate fails with a traceable finding record

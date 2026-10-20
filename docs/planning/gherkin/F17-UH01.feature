@EPIC-MVP @F17 @F17-UH01
Feature: F17-UH01 — Security maintenance and current documentation
  As a maintainer, I want to resolve current security maintenance and stale documentation, so that the next changes start from an accurate supported baseline.

  @F17-UH01-AC01 @F17-UH01-R01
  Scenario: Verify maintenance
    Given the accepted baseline and current advisories are available
    When compatible dependency fixes and documentation corrections are applied
    Then relevant build, security and planning checks pass with actual evidence

  @F17-UH01-AC02 @F17-UH01-R02
  Scenario: Keep unresolved findings visible
    Given a finding cannot be resolved within the approved scope
    When the security gate evaluates it
    Then the finding and any required owner decision remain visible without fabricated acceptance

@EPIC-MVP @F16 @F16-UH02
Feature: F16-UH02 — Reproduce and document the local release candidate
  As a maintainer, I want to hand off a tested local release with known limitations, so that another person can reproduce the accepted result.

  @F16-UH02-AC01 @F16-UH02-R01
  Scenario: Reproduce the release
    Given the accepted commit and pinned prerequisites are available
    When a maintainer follows the local runbook
    Then the application becomes healthy and the documented smoke checks pass

  @F16-UH02-AC02 @F16-UH02-R02
  Scenario: Keep the release inside agreed scope
    Given the local release candidate is ready
    When the release instructions are reviewed
    Then they contain no implied hosting, account setup or unauthorised publication step

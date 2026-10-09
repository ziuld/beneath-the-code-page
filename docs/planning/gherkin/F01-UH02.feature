@EPIC-MVP @F01 @F01-UH02
Feature: F01-UH02 — Protect dependency boundaries and review entry
  As a maintainer, I want to detect invalid dependencies before integration, so that the agreed architecture remains enforceable.

  @F01-UH02-AC01 @F01-UH02-R01
  Scenario: Reject an outward domain dependency
    Given a domain class has a synthetic dependency on Spring
    When architecture checks run
    Then the check identifies the forbidden dependency and fails

  @F01-UH02-AC02 @F01-UH02-R02
  Scenario: Surface a failing required check
    Given a pull request includes a failing architecture test
    When the initial CI job executes
    Then the job reports failure rather than a successful placeholder result

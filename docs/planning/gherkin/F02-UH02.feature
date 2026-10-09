@EPIC-MVP @F02 @F02-UH02
Feature: F02-UH02 — See current assets during local development
  As a maintainer, I want to serve each rebuilt asset during local development, so that I do not test a stale copy.

  @F02-UH02-AC01 @F02-UH02-R01
  Scenario: Observe a second rebuild
    Given the local server has served the first version of an asset
    When the asset changes and the watcher completes another build
    Then the next page load receives the second version

  @F02-UH02-AC02 @F02-UH02-R02
  Scenario: Reject development paths in production
    Given a production configuration points to a developer filesystem directory
    When configuration verification runs
    Then the production configuration is rejected

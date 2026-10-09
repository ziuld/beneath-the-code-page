@EPIC-MVP @F02 @F02-UH01
Feature: F02-UH01 — Package browser assets with server views
  As a maintainer, I want to build versioned browser assets into the application, so that SSR pages use the same tested assets in every environment.

  @F02-UH01-AC01 @F02-UH01-R01
  Scenario: Resolve packaged assets
    Given a clean build has generated a site entry and its imported stylesheet
    When the packaged application renders the page
    Then the referenced JS and CSS URLs return the matching built assets

  @F02-UH01-AC02 @F02-UH01-R02
  Scenario: Reject an incomplete build
    Given the generated manifest is missing a required entry
    When the packaged application starts
    Then startup fails instead of serving a page with broken asset links

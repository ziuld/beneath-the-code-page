@EPIC-MVP @F04 @F04-UH01
Feature: F04-UH01 — Choose and retain my interface language
  As a visitor, I want to choose a supported language, so that subsequent pages follow my preference.

  @F04-UH01-AC01 @F04-UH01-R01
  Scenario: Persist Spanish preference
    Given the browser prefers English and the visitor has a valid preference form
    When the visitor selects Spanish and submits the form
    Then subsequent pages resolve Spanish without creating JSESSIONID

  @F04-UH01-AC02 @F04-UH01-R02
  Scenario: Reject forged preference change
    Given the visitor has an existing French preference
    When a request attempts to change it without a valid CSRF token
    Then the preference is unchanged and the response is a safe rejection

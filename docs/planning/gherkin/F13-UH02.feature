@EPIC-MVP @F13 @F13-UH02
Feature: F13-UH02 — Read localised course content safely
  As a learner, I want to read clear course content in my selected language, so that I can learn without unsafe embedded markup.

  @F13-UH02-AC01 @F13-UH02-R01
  Scenario: Read the Spanish lesson
    Given the Spanish version of a lesson is reviewed and published
    When the learner opens it with Spanish selected
    Then the title, prose and exercise instructions are in Spanish

  @F13-UH02-AC02 @F13-UH02-R02
  Scenario: Treat embedded script as untrusted markup
    Given a synthetic Markdown fixture contains a script element
    When the lesson renderer processes it
    Then no executable script from the fixture appears in the rendered lesson

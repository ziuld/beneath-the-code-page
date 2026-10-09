@EPIC-MVP @F03 @F03-UH02
Feature: F03-UH02 — Use the shared interface in each supported language
  As a visitor, I want to read and navigate a consistent accessible interface, so that language or input method does not prevent me using the platform.

  @F03-UH02-AC01 @F03-UH02-R01
  Scenario: Render French interface labels
    Given the resolved locale is French
    When the Home page is rendered
    Then its navigation and accessibility labels use French resources and no unresolved message keys

  @F03-UH02-AC02 @F03-UH02-R02
  Scenario: Navigate without a mouse
    Given the Home page is at a narrow viewport and the user uses only a keyboard
    When the user traverses the shared navigation and controls
    Then focus remains visible and the user can reach and leave every control

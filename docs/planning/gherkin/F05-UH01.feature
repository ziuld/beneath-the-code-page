@EPIC-MVP @F05 @F05-UH01
Feature: F05-UH01 — Edit content with an accessible shared editor
  As a keyboard user, I want to edit and leave the code workspace without a trap, so that I can use the tool with my preferred input method.

  @F05-UH01-AC01 @F05-UH01-R01
  Scenario: Leave the editor
    Given focus is inside the labelled editor
    When the user invokes the documented escape action and advances focus
    Then focus reaches the next workspace control without a trap

  @F05-UH01-AC02 @F05-UH01-R02
  Scenario: Use editor under CSP
    Given the page enforces the proposed nonce-based style policy
    When the user selects text, scrolls and searches
    Then the editor remains usable and no prohibited resource request occurs

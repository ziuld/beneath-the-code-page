@EPIC-MVP @F18 @F18-UH01
Feature: F18-UH01 — Page-by-page design agreement and implementation
  As a website visitor, I want to use clearer and more attractive pages, so that I can read lessons and use tools comfortably.

  @F18-UH01-AC01 @F18-UH01-R01
  Scenario: Agree before implementation
    Given the maintenance and first two additional lessons have been reviewed
    When the owner explores Learn, course/unit, Tools/tool workspace and Home/shared shell one page at a time
    Then each page has a concrete prompt, owner concepts and explicit design agreement before visual implementation

  @F18-UH01-AC02 @F18-UH01-R02
  Scenario: Preserve function during redesign
    Given a page design has been agreed
    When the shared styles and templates are updated
    Then spacing and hierarchy improve while existing functionality and quality gates continue to pass

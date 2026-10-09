@EPIC-MVP @F00 @F00-UH01
Feature: F00-UH01 — Import the agreed Spring Initializr project
  As a project owner, I want to import the agreed project manually, so that I control the starting application and preserve its planning files.

  @F00-UH01-AC01 @F00-UH01-R01
  Scenario: Import the prescribed project
    Given the planning documents exist and the prescribed Initializr ZIP is available
    When the owner imports the generated files
    Then pom.xml is at the project root and selects Boot 4.1.1 and Java 25

  @F00-UH01-AC02 @F00-UH01-R02
  Scenario: Preserve a conflicting planning file
    Given the archive contains a file with the same path as existing project guidance
    When the owner reviews the conflict
    Then the existing guidance remains intact until the owner chooses the merged content

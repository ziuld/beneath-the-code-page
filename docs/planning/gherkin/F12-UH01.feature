@EPIC-MVP @F12 @F12-UH01
Feature: F12-UH01 — Discover the complete published tool suite
  As a visitor, I want to find and open each available developer tool, so that I can choose the right operation.

  @F12-UH01-AC01 @F12-UH01-R01
  Scenario: Open all published tools
    Given the eight tool implementations have passed their own acceptance criteria
    When the visitor opens the Tools catalogue
    Then each tool has a labelled link to its server-rendered page

  @F12-UH01-AC02 @F12-UH01-R02
  Scenario: Handle an unknown tool
    Given the route names a tool that is not in the catalogue
    When the visitor opens that route
    Then a safe localised 404 appears without a stack trace

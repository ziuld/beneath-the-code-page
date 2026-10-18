@EPIC-MVP @F12 @F12-UH01
Feature: F12-UH01 — Discover the published MVP JSON tools
  As a visitor, I want to find and open each available developer tool, so that I can choose the right operation.

  @F12-UH01-AC01 @F12-UH01-R01
  Scenario: Open all published tools
    Given F06 and F07 have passed their own acceptance criteria and additional tools are frozen for V2
    When the visitor opens the Tools catalogue
    Then Formatter, Validator and Minifier each have a labelled working link and no deferred tool is advertised as available

  @F12-UH01-AC02 @F12-UH01-R02
  Scenario: Handle an unknown tool
    Given the route names a tool that is not in the catalogue
    When the visitor opens that route
    Then a safe localised 404 appears without a stack trace

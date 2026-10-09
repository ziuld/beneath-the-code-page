@EPIC-MVP @F06 @F06-UH03
Feature: F06-UH03 — Copy or clear the formatter workspace deliberately
  As a developer, I want to copy the current result or clear the workspace, so that I control what leaves the tool through my clipboard.

  @F06-UH03-AC01 @F06-UH03-R01
  Scenario: Copy current result
    Given formatting has produced a current successful output
    When the developer activates Copy
    Then the clipboard receives that output and a localised success status is announced

  @F06-UH03-AC02 @F06-UH03-R02
  Scenario: Clear a running workspace
    Given the workspace contains input and a job is running
    When the developer activates Clear
    Then input and output become empty and a late job result does not repopulate them

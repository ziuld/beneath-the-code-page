@EPIC-MVP @F14 @F14-UH01
Feature: F14-UH01 — Understand the first unit scope and learning outcomes
  As a learner, I want to see the first unit prerequisites and learning outcomes, so that I understand what this published unit teaches without mistaking it for a complete course.

  @F14-UH01-AC01 @F14-UH01-R01
  Scenario: Understand the course scope
    Given the owner has accepted a short brief for the source-to-JVM unit
    When the learner opens the overview
    Then the unit prerequisites and outcomes are visible and only one unit is presented as available

  @F14-UH01-AC02 @F14-UH01-R02
  Scenario: Keep additional units outside the MVP
    Given only the first unit is reviewed and published and F15 is frozen for V2
    When the learning navigation and course overview are reviewed
    Then no unavailable unit has a working lesson link and the course is not advertised as complete

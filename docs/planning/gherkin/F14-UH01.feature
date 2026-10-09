@EPIC-MVP @F14 @F14-UH01
Feature: F14-UH01 — Agree a complete Java Fundamentals learning path
  As a learner, I want to follow an explicit set of learning outcomes, so that I know the prerequisites and what completing the course means.

  @F14-UH01-AC01 @F14-UH01-R01
  Scenario: Understand the course scope
    Given the owner has accepted the course outline
    When the learner opens the overview
    Then prerequisites and ordered outcomes are visible

  @F14-UH01-AC02 @F14-UH01-R02
  Scenario: Keep unreviewed syllabus provisional
    Given the outline is still under owner review
    When the course production milestone is evaluated
    Then bulk-content work is not reported as accepted scope

@EPIC-MVP @F13 @F13-UH01
Feature: F13-UH01 — Navigate a course and its published lessons
  As a learner, I want to browse Java Fundamentals and move between lessons, so that I can follow a coherent learning path.

  @F13-UH01-AC01 @F13-UH01-R01
  Scenario: Navigate consecutive lessons
    Given two reviewed consecutive lessons are published
    When the learner opens the first lesson
    Then its course context and next-lesson link are available

  @F13-UH01-AC02 @F13-UH01-R02
  Scenario: Do not expose an unpublished lesson
    Given the requested lesson is not published
    When the learner requests its route
    Then a localised 404 appears without placeholder course content

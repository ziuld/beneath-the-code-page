@EPIC-MVP @F13 @F13-UH01
Feature: F13-UH01 — Navigate a course and its published lessons
  As a learner, I want to browse Java Fundamentals and move between lessons, so that I can follow a coherent learning path.

  @F13-UH01-AC01 @F13-UH01-R01
  Scenario: Navigate the single published unit
    Given a synthetic test catalogue contains exactly one publishable unit
    When the learner follows Learn to the course overview and unit page
    Then course context, breadcrumbs and a return link are available without nonexistent previous or next links

  @F13-UH01-AC02 @F13-UH01-R02
  Scenario: Do not expose an unpublished lesson
    Given the requested lesson is not published
    When the learner requests its route
    Then a localised 404 appears without placeholder course content

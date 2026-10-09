@EPIC-MVP @F03 @F03-UH01
Feature: F03-UH01 — Understand the Home page and discover available sections
  As a visitor, I want to understand Beneath the Code from its Home page, so that I can choose practical tools or engineering education.

  @F03-UH01-AC01 @F03-UH01-R01
  Scenario: Read Home without JavaScript
    Given JavaScript is disabled
    When a visitor opens the Home page
    Then the response contains the brand identity, a main heading and the tools and learning descriptions

  @F03-UH01-AC02 @F03-UH01-R02
  Scenario: Avoid advertising an unavailable destination
    Given a tools or learning destination has not been published in the current increment
    When a visitor inspects the Home navigation
    Then the section is described without a link to a missing page

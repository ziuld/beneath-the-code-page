@EPIC-MVP @F20 @F20-UH01
Feature: F20-UH01 — Portable Docker Desktop handoff and final closure
  As a project owner, I want to develop and run the application in Docker, so that host toolchain versions do not determine the workflow.

  @F20-UH01-AC01 @F20-UH01-R01
  Scenario: Build and run the single application
    Given Docker Desktop or a compatible local engine is available
    When the maintainer follows the documented clean build and run commands
    Then the application becomes healthy with correct assets, EN/ES/FR and browser-local tools without a database or cloud service

  @F20-UH01-AC02 @F20-UH01-R02
  Scenario: Accept local handoff with honest platform limits
    Given the available-host container and development checks passed and other environments are unverified
    When the owner accepts local execution as sufficient for this version
    Then F20 closes with untested platforms recorded and future cross-PC failures handled as bugs

  @F20-UH01-AC03 @F20-UH01-R03
  Scenario: Develop with containerized tooling
    Given a source checkout and Docker Linux-container support are available
    When the maintainer follows the documented development build/test workflow
    Then project tooling runs inside the documented image and edited source can be rebuilt without host Java, Node or Python, with actual host results and pending platforms recorded

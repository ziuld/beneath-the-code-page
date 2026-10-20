@EPIC-MVP @F20 @F20-UH01
Feature: F20-UH01 — Portable Docker Desktop handoff and final closure
  As a project owner, I want to run the application with Docker Desktop on another PC, so that I can reproduce the finished website without installing its build toolchain on that PC.

  @F20-UH01-AC01 @F20-UH01-R01
  Scenario: Build and run the single application
    Given Docker Desktop or a compatible local engine is available
    When the maintainer follows the documented clean build and run commands
    Then the application becomes healthy with correct assets, EN/ES/FR and browser-local tools without a database or cloud service

  @F20-UH01-AC02 @F20-UH01-R02
  Scenario: Hand off to another PC
    Given the reviewed image or source and runbook are available on a second PC
    When the owner follows the documented build or image-load workflow
    Then the application works and supported architecture, platform and browser limitations are recorded honestly

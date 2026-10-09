@EPIC-MVP @F01 @F01-UH01
Feature: F01-UH01 — Build the Java baseline reproducibly
  As a maintainer, I want to build the imported project from a clean checkout, so that another contributor can reproduce the application.

  @F01-UH01-AC01 @F01-UH01-R01
  Scenario: Build a clean checkout
    Given the prescribed JDK and imported Maven project are available
    When the maintainer runs the documented verification command
    Then verification succeeds and the executable JAR starts

  @F01-UH01-AC02 @F01-UH01-R02
  Scenario: Fail visibly on a broken test
    Given a synthetic test fails
    When the maintainer runs verification
    Then the command fails and does not report a successful verification

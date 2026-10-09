@EPIC-MVP @F05 @F05-UH02
Feature: F05-UH02 — Run bounded processing without blocking the workspace
  As a tool user, I want to cancel or recover from expensive processing, so that a difficult input does not make the tool unusable.

  @F05-UH02-AC01 @F05-UH02-R01
  Scenario: Recover from an overlong job
    Given a synthetic worker job runs longer than the initial two-second deadline
    When the deadline expires
    Then the job is terminated and another job can be started

  @F05-UH02-AC02 @F05-UH02-R02
  Scenario: Ignore stale output
    Given job A is cancelled and job B has become current
    When a late response for job A arrives
    Then job B's state and output remain unchanged

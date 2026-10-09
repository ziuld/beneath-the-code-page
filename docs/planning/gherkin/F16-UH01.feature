@EPIC-MVP @F16 @F16-UH01
Feature: F16-UH01 — Verify the full Phase 1 acceptance set
  As a project owner, I want to review the integrated tools and complete course against their criteria, so that I can distinguish a finished MVP from partial demonstrations.

  @F16-UH01-AC01 @F16-UH01-R01
  Scenario: Review complete scope
    Given all feature stories report completion with evidence
    When the owner evaluates M4
    Then the review covers all eight tools, the complete accepted course and shared quality gates

  @F16-UH01-AC02 @F16-UH01-R02
  Scenario: Reject incomplete MVP acceptance
    Given one required accessibility or privacy scenario fails
    When the release review runs
    Then the failing story is reopened or blocked and the epic is not marked done

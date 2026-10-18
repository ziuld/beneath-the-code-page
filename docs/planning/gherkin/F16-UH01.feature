@EPIC-MVP @F16 @F16-UH01
Feature: F16-UH01 — Polish and accept the complete MVP website journey
  As a project owner, I want to use the JSON tools and first learning unit through a coherent polished website, so that the MVP demonstrates every retained page type without unfinished navigation.

  @F16-UH01-AC01 @F16-UH01-R01
  Scenario: Review complete scope
    Given all prerequisite V1 feature stories report completion with evidence and V2 features remain frozen
    When the owner evaluates M4
    Then the review covers F06/F07, one complete learning unit, every retained page type and shared quality gates without requiring V2 scope

  @F16-UH01-AC02 @F16-UH01-R02
  Scenario: Reject incomplete MVP acceptance
    Given one required accessibility or privacy scenario fails
    When the release review runs
    Then the failing story is reopened or blocked and the epic is not marked done

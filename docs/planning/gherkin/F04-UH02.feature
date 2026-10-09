@EPIC-MVP @F04 @F04-UH02
Feature: F04-UH02 — Receive bounded requests and safe responses
  As a visitor, I want to receive safe pages and errors, so that the public application does not expose sensitive internals.

  @F04-UH02-AC01 @F04-UH02-R01
  Scenario: Protect an ordinary page
    Given the app uses the Phase 1 security configuration
    When a visitor requests a published page
    Then the response has the configured CSP, framing, referrer and content-type protections

  @F04-UH02-AC02 @F04-UH02-R02
  Scenario: Reject oversized preference input
    Given a synthetic form body exceeds 4 KiB
    When it is submitted to the preference endpoint
    Then the request is rejected and the sentinel is absent from response and logs

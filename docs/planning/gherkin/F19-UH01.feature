@EPIC-MVP @F19 @F19-UH01
Feature: F19-UH01 — Final Firefox, WebKit and Safari compatibility review
  As a website visitor, I want to use a frontend checked across supported browsers, so that compatibility limitations are understood before handoff.

  @F19-UH01-AC01 @F19-UH01-R01
  Scenario: Review the finished frontend
    Given agreed designs and selected tools are integrated
    When the retained browser suite and manual journeys run
    Then actual engine results cover editors, workers/CSP, locale flow, layouts, keyboard access and payload privacy with defects resolved or explicitly triaged

  @F19-UH01-AC02 @F19-UH01-R02
  Scenario: Separate Safari evidence
    Given WebKit test results exist
    When the final compatibility report is prepared
    Then a real Safari device/version review is recorded separately or remains an explicit pending limitation

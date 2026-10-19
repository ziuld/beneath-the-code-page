# ADR 009 — Chromium-only browser verification for the remaining MVP

Date: 2026-10-19. Status: accepted by the owner's explicit project-wide instruction.

## Context

Repeated Firefox/WebKit execution and investigation consume disproportionate time
and agent tokens. The owner explicitly replaces project-end cross-browser testing
with optional evaluation after the MVP, across remaining F13, F14 and F16 work.

## Decision

- Chromium is the sole required browser for remaining features, PRs and final MVP
  acceptance. Align the existing browser CI workflow; no new testing framework.
- Firefox/WebKit execution, repair and dependency installation are not MVP gates.
  After the MVP, evaluate whether their extra coverage is worthwhile; this does
  not automatically authorise implementation or runs.
- Retain test definitions, historical results and known issues. Unexecuted
  non-Chromium coverage is optional post-MVP work, not passing verification or
  compulsory project-end debt. Keep Chromium assertions unchanged.
- Java/integration/architecture, frontend unit/type/lint/i18n, privacy, CSP,
  security and manual keyboard/visual requirements remain unchanged. F13's
  declined security approval is not overridden.
- Reuse valid results for unchanged inputs; rerun only affected checks.

## Consequences

Required browser coverage and verification cost are reduced. Do not claim
Firefox/Safari compatibility, full accessibility conformance or a measured code
coverage percentage. Surface actual defects regardless of the engine involved.

This supersedes the multi-engine gate in technical architecture section17,
the quality plan, ADR008's mandatory WebKit checks and the earlier project-end
Firefox/WebKit schedule. Preserve accepted feature history. Configuration and
planning changes are not evidence of a CI run or feature acceptance.

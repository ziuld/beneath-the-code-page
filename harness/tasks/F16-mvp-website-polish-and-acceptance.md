# Task — F16 MVP website polish and acceptance

Status / owner / date: complete / Ziuld with AI assistance / 2026-10-20.

User outcome and authorised scope: apply F16, plus explicit owner checklist,
bounded F16 security scope and scoped local commit approvals. Complete retained
MVP journeys and a reproducible local handoff; no external publication/archive.

Prerequisites and files read: accepted F12/F14 evidence; current handoff,
architecture/feasibility, F16 EARS/scenarios/canonical tasks and all OpenSpec
artifacts; existing navigation/templates/tests, quality/security and local runbooks.

Acceptance criteria: docs/planning/features/F16.md and proposed capability deltas
in openspec/changes/archive/2026-10-20-f16-mvp-website-polish-and-acceptance/specs/. Canonical
behaviour ownership remains unchanged until a separate authorised migration.

Implementation steps: catalogue-aware shared promotion → EN/ES/FR link integration
→ retained build/Chromium and owner acceptance → scoped security gate → local
candidate commit → clean-checkout runbook/build/JAR reproduction → evidenced closure.

Security, privacy, accessibility and locale implications: browser-local payloads,
CSP/native preferences and approved keyboard/visual criteria retained. Existing
8 bounded security decisions explicitly reassessed/approved for F16; expiry remains
2026-11-01. Chromium only; no full-WCAG/speech or optional-engine compatibility claim.

Verification commands and manual checks: Maven257+17 Java/185 frontend, Chromium125,
owner checklist,18 policy tests and final actual security gate PASS. Separate clean
checkout reran the build and runbook health/page/error/asset/shutdown checks; JAR
bytes and server configuration fingerprint exactly match the reviewed candidate.
Planning integrity/22 rule tests/strict14 OpenSpec items/whitespace PASS.

Results / evidence links / actual effort: harness/evidence/F16-integrated-acceptance.md.
Implementation3bfc8c59c0bf5e9f9ca01901b9847b7f8d60c608; tested handoff
 a6ed966ec2a03548bca8100b5054b0f0c93de127. Owner effort unreported; all11 canonical
tasks and OpenSpec10/10 complete; retained V1/epic done, V2 frozen. Servers stopped.

Open issues and next action: no unresolved V1 acceptance task. Future public
publication, extra V2 work, optional browsers and OpenSpec sync/archive require
their own authorised workflow. Security decisions retain their fixed expiry.

Archive follow-up,2026-10-20: owner requested /opsx-archive and selected Sync now.
Three capability deltas fully synced, strict15 main specs PASS, all7 archived
files unchanged by move. See harness/evidence/F16-openspec-archive.md. Canonical
status/behavioural ownership unchanged; no new commit/push/deployment.

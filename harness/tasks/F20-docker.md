# Task — F20 Docker handoff

Status: T01/T02 complete; T03 in progress; T04 pending. Owner: Ziuld with AI assistance. Date: 2026-10-21.
Prerequisite F19 complete. Read AGENTS/current handoff, F20 dossier/EARS/scenarios/
ordered tasks, architecture/feasibility and ADR010. Requirements remain plan-owned.

Plan: T01 pinned Java25 multi-stage source build, linux/amd64 first, guarded local
container HTTP with packaged assets; T02 Dockerfile/ignore/runbook; T03 clean build,
non-root/health/assets/locales/tools/privacy/shutdown and image scan; T04 scoped
review/commit and honest handoff. Retain native JAR workflow. No Compose needed. Owner clarified Windows/Linux development: optional tooling
image isolates Python/Java/Node/Maven versions; rebuild/recreate app after edits.

No push/publication/deploy/system changes/subagents. Existing owner planning edits
preserved. Docker works via newgrp docker child shell using owner-added membership.
Second-PC execution requires actual owner hardware evidence; leave T03/T04 and
portable acceptance open until it runs. Real Safari remains unverified from F19.
Evidence: harness/evidence/F20-docker.md. Actual owner effort unreported.

Local checks passed: Docker build and mounted development verifier274/277/17,
container HTTP39, Chromium73, application security0, image0HIGH/CRITICAL with
28 unresolved medium/low findings, policy20/specs15. See evidence for limitations.

# Current handoff — 2026-10-21

Project: `/home/ziuld/AI/beneath-the-code`. Branch: `delivery/F20-docker`.
[PR11](https://github.com/ziuld/beneath-the-code-page/pull/11) targets main.
Resolve current source revision with git rev-parse HEAD. Owner authorised docs,
push and PR; no merge, deployment, image publication or release tag authorised.

## Accepted scope and next work

V1 and selected V2 are complete: F17 maintenance, F15-UH01/UH02 lessons, F18 design,
F08 Base64, F09 UUID, F10 JWT, F19 simplification/browser review, F20 Docker.
F11 JSON/YAML is removed, with original scope in docs/planning/history/.
Five further course lessons remain deferred. No automatic next feature or VPS work.
Next: review PR checks/diff, then prioritise concrete bugs/improvements with owner.

Owner approved the Docker preview and explicitly removed second-PC testing as a
closure gate on2026-10-21. Other machines/Windows/ARM64 and real Safari remain
unverified; future cross-PC problems are bugs. No universal compatibility claim.
Actual owner effort remains unreported; historical baseline estimates preserved.

## Verification and evidence

- Full F20 source-image build and mounted developer verifier: each274 frontend,
 277 Java,17 packaged integration tests, type/lint/format/architecture PASS.
- F19 Chromium/Firefox/Linux WebKit169 each, affected Firefox43 and actual native
  Chromium200% zoom39 journeys PASS. All3 old WebKit recovery fixmes active/pass.
- F20 retained six-tool Chromium73 and container HTTP39 routes/locales, non-root,
  packaged assets, health, CSRF/locale, management isolation and shutdown PASS.
- Application security0 findings/53 sources; policy20/specs15/planning23 PASS.
  New image gate6 regression cases, runtime/SBOM/inventory scan, workflow YAML and
  whitespace PASS locally. Image:0 HIGH/CRITICAL;24 MEDIUM/4 LOW Ubuntu findings,
  no fixes reported, no waivers. Runtime code unchanged in publication slice.
- Remote Java/Chromium/Docker CI results are live in PR11 checks. Consult the latest
  head; local passes and superseded runs are not remote evidence for a new head.
  Main is unprotected (read-only check2026-10-21); no settings were changed.
- Evidence: harness/evidence/F09-uuid.md, F10-jwt.md, F19-simplification.md,
  F19-browsers.md, F20-docker.md and2026-10-21-publication.md. Historical handoff
  preserved in harness/history/current-state-through-2026-10-21.md.

## Runtime and workflow

Docker runtime image ID:
`sha256:4a8ec8f74a3ea2aadb490a8143d6825f325394ffbd789fe25e75637de5f82f84`.
JAR SHA256 `5189833f50fff3276c364753d653d14435eaddad7e936f7570af64e0e432695b`.
Preview container btc-f20-preview (c310c96d8c37) uses only127.0.0.1:8080; application
http://localhost:8080. It was stopped for local verification and may be restarted
without rebuilding. Inspect actual Docker status before assuming availability.
Identity-verify/stop previews before rebuilding; never replace shared build output
while packaged browser tests run. Verification containers were removed.

Docker works via newgrp docker child shell using owner-added group membership;
direct commands in this session may still have stale groups. No further host
changes or sudo/pkexec without approval. Preserve native sandbox/approval controls.
No subagents. Existing PostgreSQL container/image/volume untouched.

Runbook: docs/delivery/docker-handoff.md (Windows/Linux commands, optional tooling
image with Python/Java/Git; pinned Node/npm/Maven). Architecture: ADR010/012,
technical-architecture-v1.md and feasibility-review.md. Canonical tracking:
docs/planning/plan.json. Regenerate both planning views and validate for tracking
changes. Use focused reads/checks; repeat runtime gates only for changed inputs.

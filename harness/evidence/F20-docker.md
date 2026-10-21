# F20 — local Docker handoff evidence

Date:2026-10-21. Work in progress; second-PC acceptance is pending.
Prerequisite F19 complete. Requirements: F20-UH01 R01/R02, AC01/AC02, plan-owned.
Actual owner effort unreported; baseline/forecast8h retained. No subagents,
push/publication/deployment or new host configuration changes.

## Approach and environment

See ADR012 and docs/delivery/docker-handoff.md. Multi-stage source build with full
Maven verification; pinned official Temurin25.0.4.1 JDK/JRE Noble digests. Numeric
non-root runtime, packaged assets, compiled Java health probe, read-only filesystem,
bounded tmpfs, dropped capabilities, no-new-privileges and host-loopback publication.
Container profile supports local HTTP locale preferences without development assets.
Default production Secure cookies/CSP/CSRF/statelessness remain unchanged.

Host: Linux/Omarchy x86_64,12 CPUs, approximately16GiB RAM. Docker Engine29.7.2,
API1.55, containerd2.3.5, runc1.5.1. Only linux/amd64 is tested here. This is compatible
Engine evidence, not Docker Desktop or a separate-machine execution claim.
Owner added docker group membership; child newgrp docker activates it without
further host edits. Existing postgres18 container/images/volume are untouched.

## Executed checks and triage

- First clean build stopped at Maven ZIP checksum: builder lacked unzip, so wrapper
  selected tar.gz while configured checksum remained for ZIP. Added build-only
  unzip, retained exact pinned checksum; clean source build then passed.
- Clean --no-cache source build:274 frontend/277 Java/17 packaged integration
  checks pass plus type/lint/format/architecture. Log target/f20-build.log.
- Initial health probe rejected automatic container health groups alongside UP.
  Corrected to check UP while allowing groups; final image/check results follow.
- First image scan:24 MEDIUM/4 LOW, no HIGH/CRITICAL. Final scan remains pending.

## Final local results

- Final Docker source build PASS:274 frontend/277 Java/17 packaged integration;
  type/lint/format/architecture included. target/f20-build-final.log.
- Mounted-checkout developer workflow PASS using beneath-the-code:tooling,
  UID/GID1000, Python3.12.3 and Temurin25.0.4.1 inside Docker. Full Maven verifier
  again274/277/17; target/f20-tooling-verify.log and f20-tooling-versions.log.
  No host Java/Node/Python version used by that workflow. Host Git/editor/Docker
  still required. Windows PowerShell commands documented but NOT executed.
- Runtime verifier PASS:39 route/locale responses, packaged immutable shell assets,
  healthUP without component details, all3 real HTTP locale/CSRF round trips,
  missing-token rejection, private-management denial, no unexpected cookies,
  UID10001, read-only root, dropped capabilities and localhost-only port mapping.
- Existing six-tool Chromium tests:73/73 PASS,0 skipped/0 flaky. Actual image tested;
  exact worker/asset privacy allowlists and synthetic sentinel log checks retained.
  target/f20-browser-results.json, f20-runtime-final.log, f20-container.log.
- SIGTERM graceful shutdown completed, exit143, no OOM. Verification container
  removed by helper; unrelated containers untouched. Probe negative check PASS
  (no running application); Dockerfile build check PASS.
- Application security PASS:0 findings/53 production sources, no exceptions;
  extracted image JAR used by existing gate. target/f20-security.log and
  target/security/summary.json. Policy20 and strict OpenSpec15 PASS.
- Final image Trivy0.76.0 scan:0 HIGH/CRITICAL;24 MEDIUM/4 LOW in Ubuntu packages,
  no fixed versions reported. These28 findings remain unresolved and are not
  waived or described as a clean image. Packaged Java scan has0 findings.
  target/f20-image-scan.json/log; update base digest and rescan as fixes become
  available. Databases2026-10-21T07:13:45Z and01:09:45Z, within freshness policy.

Runtime image ID: `sha256:4a8ec8f74a3ea2aadb490a8143d6825f325394ffbd789fe25e75637de5f82f84`.
JAR SHA256: `5189833f50fff3276c364753d653d14435eaddad7e936f7570af64e0e432695b`.
Image export: target/f20-image.tar (local transfer only; not published).
Tooling image identity is separate: target/f20-image-identities.log.

Test-runner triage: first invocation accidentally let --project consume file
arguments; corrected argument order. A second invocation placed filters after --,
which this Playwright version excludes from selection; the unintended fixture
suite was interrupted and is NOT acceptance evidence. Final exact file selection
ran all73 retained tool checks successfully. Earlier health/runtime failure logs
are retained separately. No assertions or existing tool tests were weakened.

## Integration and remaining acceptance

Scoped production/config/tests/Docker/runbook diff reviewed. Native JAR workflow
retained; container-only profile never enables filesystem frontend assets. Source
build context excludes caches, Git and credentials. No database/worker/framework
added. Developer target provides Python/Git/Java while Maven pins Node/npm tooling.
F20 R03/AC03 records the owner's clarified development scope. No VPS deployment,
HTTPS/public-hosting configuration or registry publication is included.

T01/T02 locally implemented. T03 remains in progress: actual Windows/Docker Desktop
and second-PC build/run/development smoke have NOT run. T04/owner acceptance and
portable feature closure remain pending under R02/AC02. Linux Engine checks do
not establish Windows, ARM64, Safari or universal portability. Actual owner effort
unreported;8h baseline/forecast unchanged. Final planning/commit identities and
preview are recorded in current-state.md and plan.json.

# Current handoff — 2026-10-21

Project: `/home/ziuld/AI/beneath-the-code`. Repo: ziuld/beneath-the-code-page.
Branch: `delivery/F20-docker`. HEAD: `c979d7e394dbf7db505681bb5165c010a7782f22`.

## Completed and next

F19 and F20 are complete. Owner accepted the Docker preview and explicitly
removed second-PC testing as a closure gate on2026-10-21. Local results suffice
for this version; future cross-PC problems are bugs. Windows/other machines/ARM64
remain unverified. No cross-platform result is invented. Selected V2 sequence is
complete; next is a bounded improvement/bug prioritisation discussion, not an
automatic new feature or VPS deployment. Five further lessons remain deferred.
Owner authorised documentation reconciliation, branch push and PR on2026-10-21.
Merge, registry publication and deployment remain unauthorised. F11 JSON/YAML remains removed, not deferred.

## F20 local results and handoff

Owner clarified that Docker also isolates development dependencies across Windows
and Linux: optional development target, editable mounted checkout, build/test in
Docker, rebuild/recreate app after source edits. Runtime target stays small and
separate for later VPS work; no VPS deployment is included. See ADR012 and
`docs/delivery/docker-handoff.md`; task/evidence: harness/{tasks,evidence}/F20-docker.md.

- Commit `ad4934b0a92d31865125c48b419ab3e35e170177`: Dockerfile/context allowlist, non-root runtime, guarded
  container HTTP profile, Java health probe, developer tooling and runbook/tests.
- Full image build and mounted development verifier: each274 frontend/277 Java/
 17 integration PASS. Developer Python3.12.3/Java25.0.4.1 execute inside Docker.
- Container HTTP39 route/locale checks, retained six-tool Chromium73/73, CSRF/locale
  persistence, packaged assets, health, management isolation and graceful shutdown
  PASS; no skips/flaky. Probe negative and Dockerfile checks PASS.
- Application security0 findings/53 sources; policy20/specs15 PASS. Final image
  scan:0 HIGH/CRITICAL;24 MEDIUM/4 LOW unresolved Ubuntu findings, no fixes reported.
  No exceptions/waivers.218 recorded runtime/test/build input hashes still match.
- Both planning views regenerated and integrity/23 rules PASS using Python inside
  development image. Full native/JVM/browser history below remains separate.
- Runtime image ID `sha256:4a8ec8f74a3ea2aadb490a8143d6825f325394ffbd789fe25e75637de5f82f84`.
  JAR SHA256 `5189833f50fff3276c364753d653d14435eaddad7e936f7570af64e0e432695b`.
  Local transfer archive target/f20-image.tar; detailed target/f20-* logs/reports.
- Live review container `btc-f20-preview`, ID c310c96d8c37, healthy at
  http://localhost:8080; published only127.0.0.1:8080. UID10001/read-only/tmpfs,
  capabilities dropped/no-new-privileges. Stop it before source-image rebuild or
  further packaged browser acceptance. Verification containers already removed.
- Tested host is Linux/Omarchy x86_64, Docker Engine29.7.2. Windows/second machine,
  ARM64, real Safari and public HTTPS/VPS are unverified. Owner has not supplied
  a second-machine result and explicitly waived that gate. T03/T04 close against
  revised R02/AC02 and actual local evidence. Acceptance docs commit `c979d7e394dbf7db505681bb5165c010a7782f22`.
  Planning integrity/23 rule tests and whitespace PASS. Only docs/tracking changed;
  no runtime checks repeated. Remaining improvement discussion should prioritise
  concrete bugs, usability/content and dependency maintenance before future VPS.

## Previously accepted delivery

- F18 shared redesign owner-approved: implementation `527fe5269ed1195a05ee2455a067917897d7364b`, handoff `50d39cd`.
- F08 Base64: `32dc6f6e1be4aad025dc96bed714b3dd34ac53b6`, handoff `8ee247f`.
- F09 UUID: `d8072539306ccca1e18b6a77e188d16c06b59f91`; native UUIDv4 batches1–100,
  Generate/Copy, EN/ES/FR, explicit API errors. Evidence `harness/evidence/F09-uuid.md`.
- F10 JWT: `a9eb6e47b2e8b1b2c0cc0ed24d6841c9a7b315ed`; bounded local inspection,
  no signature verification/key fetching. Evidence `harness/evidence/F10-jwt.md`.
- F19 T01: `a46d6f1a4965af7437cbe2820798ae067893e469`; five unused Maven declarations
  and empty CSS removed, runtime libraries59→53. Evidence `harness/evidence/F19-simplification.md`.
- F19 T02–T04: `f74420582bd8937de12965375f0f1395f64031ca`; WebKit module reload recovery
  fixed by disabling optional JS modulepreloads, CSS/native imports retained.
  All3 Validator fixmes active and passing. No CSP/cache/cookie/privacy relaxation.
  Evidence `harness/evidence/F19-browsers.md`; workflow `docs/quality/final-browser-review.md`.

## F19 verified candidate (historical)

- Chromium169, WebKit169, Firefox169 plus43 affected-fixture rechecks: all pass,
  zero skipped/flaky. Full Firefox precedes final fixture-only changes; the43
  affected cases were rerun afterward. Same application JAR throughout.
- Native Chromium200% zoom39/39 route/locale checks pass; agent reviewed Firefox
  narrow French UUID, WebKit wide French JWT and native-zoom focus captures.
  These are agent observations, not owner manual acceptance.
- Maven274 frontend/273 Java/17 integration; security0 findings/53 production
  sources/no exceptions, policy20, strict OpenSpec15 and packaged smoke: PASS.
- Final closure: both planning views regenerated; planning integrity and23 rule
  tests PASS; whitespace PASS. No OpenSpec migration/archive.
- Playwright1.63.0/Node24.21.0/Linuxx86_64; Chromium153.0.8010.12, Firefox155.0,
  WebKit WPE26.6. **Real Safari is UNVERIFIED**; no Apple device/OS/version review.
  F19 R02/AC02 explicitly permits this pending limitation. No full WCAG or
  screen-reader compatibility claim.
- JAR SHA256 `1d0799c6995f06fed46177e5a4673cffe0c7320caaf966d0b0d71077bb51131b`.
  All211 security-recorded code/test/harness/artifact hashes match on resume.
  Detailed reports/logs/screenshots remain under target/f19-*. Repeat runtime
  gates only for changed inputs or new unresolved failures.

## Working tree and runtime

The scoped F19 and F20 implementation/docs/evidence commits are local. Pre-existing owner
planning/scope changes and F09/F10/T01 tracking/handoff remain uncommitted, together
with F19/F20 tracking/views. Preserve these edits; do not stage everything.
Actual owner effort remains unreported; baseline/forecast8h unchanged for F19.
V1 remains accepted; five additional lessons remain deferred.

The old JWT preview PID122106 and loopback39793 are no longer running (checked
on resume); its saved log is target/f19-preview.log. Current Docker preview is
listed above; no native Java preview is running.
Verify process identity and stop any future preview before rebuilding. Never
rebuild while packaged browser tests run.

WebKit used three pinned SHA256-verified Ubuntu libraries under target only,
via scripts/prepare-webkit-local.py. No sudo/system install/Docker permission
change. Owner added docker group membership. Current session uses newgrp docker child
shells; direct docker commands still have stale groups. No additional host edits.
Use native approval controls for writes in this authorised AI project. No global
changes, sudo/pkexec, push, publication, deployment or subagents without approval.

Historical checkpoints: `harness/history/current-state-through-2026-10-21.md`.
Current requirements/tracking: `docs/planning/plan.json`; architecture: AGENTS.md,
technical-architecture-v1.md, feasibility-review.md and ADR010. Read targeted
sections and keep evidence concise.

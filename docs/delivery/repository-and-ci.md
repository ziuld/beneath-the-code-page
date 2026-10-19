# Repository, CI and local delivery

Public remote: https://github.com/ziuld/beneath-the-code-page. No push or settings changes are part of the planning delivery.

V1 scope is governed by [ADR 007](../architecture/adr-007-focused-mvp.md): F06/F07
JSON tools, complete retained website journeys and one learning unit. Use the
existing packaged JAR and CI checks; Docker/Compose and container-specific work
are frozen for V2. Historical bootstrap follow-ups below are not new frameworks
or evidence that external repository settings have been configured.

## Repository conventions to establish during F01

Main branch, short feature branches such as `feature/F06-json-formatter`, PRs, squash merges, Conventional Commit-style titles, required checks, resolved discussions, real maintainer CODEOWNERS and dependency-update PRs. A solo owner must be able to merge; do not require impossible self-approval. Public visibility does not choose a licence; discuss code and brand/course licensing separately.

Add contributor guidance, security-reporting method with real contact, PR template and issue templates when bootstrap starts. Optional GitHub Projects fields mirror local IDs/status/estimates; do not maintain two conflicting authoritative trackers. Local `plan.json` remains canonical until an explicit migration decision.

F01 closure disposition (2026-10-09): contributor guidance, CODEOWNERS and PR template are delivered. The owner accepted Java-baseline closure while retaining security-reporting guidance/contact, issue templates, dependency-update configuration and main protection/required-check enforcement as unfinished follow-ups. Their owner/next decisions are recorded in [risks and decisions](../planning/risks-and-decisions.md); closure does not claim these settings/deliverables exist.

## CI jobs to implement

| Job | Checks | Introduced |
|---|---|---|
| Java | Maven verify, unit/integration/architecture | F01 |
| Frontend | npm lockfile, types, lint, unit, translations, build | F02–F03 |
| Browser | Packaged JAR, CSP/privacy/a11y; Chromium only for remaining MVP (ADR 009) | F05–F06 |
| Supply chain | Dependencies, secrets, SAST; report failures | F01 onward |
| Container | Build, non-root/runtime probe, image scan, image SBOM | V2 — deferred, not an MVP gate |

Pin action SHAs; default token read-only; no secrets/elevated token for untrusted PR execution; avoid privileged pull_request_target checkout. Use Gitleaks, Trivy and CodeQL (public repository eligibility/configuration verified during setup) or a documented SAST substitute. Choose exact tool/ruleset versions at installation. Critical/high exploitable findings block release; triage disputed/non-applicable findings with owner and expiry rather than silent suppression.

The initial Java workflow is integrated in `.github/workflows/java.yml`: real Maven verification, executable-JAR smoke and planning checks on PRs/main pushes, SHA-pinned actions, read-only token and no persisted checkout credentials. PR #1 proved actual pass/failure/restored-pass reporting; PR #2 integrated the wrapper checksum correction; both post-merge main runs passed. See [final acceptance](../../harness/evidence/F01-closure.md), [CI evidence](../../harness/evidence/F01-java-ci.md) and [contributor guidance](../../CONTRIBUTING.md). GitHub's non-failing Node.js 20 action-runtime warning and maintenance follow-up are recorded separately. No branch-protection or required-check setting has been changed. The F12 security steps below are now configured; configuration is not evidence of an actual remote CI run or a passing scan.

## Remaining MVP browser gate

Remaining MVP browser policy: [ADR 009](../architecture/adr-009-chromium-only-mvp-verification.md)
requires Chromium only, including final F16 acceptance. Firefox/WebKit are optional
post-MVP evaluation, not required CI steps. `.github/workflows/home-browser.yml`
now runs the existing packaged Chromium suite only; their automatic steps are
removed, while Playwright definitions/results are retained. This local edit does
not establish a remote CI pass or change remote required-check settings. No pushes
or CI runs are authorised here.

## F12 application security gate

After the existing verified build, use the same commands as the Java CI workflow:

```sh
python3 scripts/install-security-tools.py
python3 scripts/test-security.py
python3 scripts/verify-security.py
```

No second build or browser/manual review is required just for F12. An executable
JAR from the candidate source must already exist. Linux x86-64 and Python 3.10–3.14
are required; downloads/virtual environment/caches remain under `target/`. Scanner
versions, hashes, selected rule scope and licence restrictions are documented in
[security tooling](../../security/README.md). No hosted account or elevated token
is used. Dependency metadata/database downloads are not browser payload traffic;
application source is analysed locally.

The command covers Maven runtime/compile resolution, the shipped JAR and both npm
lockfiles including development dependencies; secrets cover the candidate tree
(tracked files plus untracked, non-ignored candidate files). SAST covers main Java
and TypeScript source, excluding colocated test files. Maven test/build-plugin
dependencies and Git history are not claimed as covered. Empty dependency results,
missing application source, parse errors, scanner failures and database metadata
older than 24h fail closed. High/critical dependency findings, Semgrep ERROR/high
impact findings and all detected secrets block; other findings remain recorded.

Trivy uses filesystem mode for source dependency inputs and a separate local
rootfs scan for the staged executable JAR. Rootfs here is only a binary-analysis
mode; it does not start an OS, application or container. Both Java inventories
must be present before the gate can finish successfully.

`target/security/summary.json` records source/input hashes, versions, command scope,
database freshness and redacted finding identities/locations. The command does not
print raw scanner output or store secret values/source excerpts in shared reports.
Do not upload downloaded rules or raw scanner output. No blanket scanner ignore is
used. `security/applicability.json` contains only the eight approved exact finding/
package/version decisions for the reviewed Boot4.1.1 configuration, expiring on
2026-11-01. Their source/packaged-code fingerprint must still match; changes require
reassessment, not automatic renewal. Reports retain the original findings and the
owner/reason/expiry. Secrets, SAST, unrelated findings and scanner failures remain
blocking. Fix applicable findings; further dispositions require explicit approval.
Never use `continue-on-error`, stale reports or
empty scanner output as a substitute for a passing gate. Reuse applicable results
for unchanged inputs; rerun only affected verification when inputs/data change.

## V2 local container acceptance — deferred

Multi-stage pinned build/runtime images, Java 25, no Node runtime in final image, non-root, read-only root, tmpfs, no-new-privileges, dropped capabilities, CPU/memory limits, graceful shutdown. Compose app port binds 127.0.0.1 only. No DB/Redis/Docker socket/credential mounts. Separate unpublished health management endpoint; select a probe actually available in the image. Validate failing and recovering readiness, not just HTTP success once.

## Operations baseline

Structured safe stdout logs, request IDs and normalised routes; bounded Micrometer labels; no request bodies or raw URI/query/header dumps. Only necessary Actuator health exposed locally, no details. Local rotation initially seven days. No external telemetry service, cloud deployment, production domain or release publication in Phase 1 planning.

## Eventual local release procedure

For V1, reproduce the reviewed commit using the existing clean Maven build and
packaged-JAR runbook; record health/smoke results, security evidence and known
limitations. Do not require a container or new release automation. Any tagging,
public release or deployment remains a separately authorised action.

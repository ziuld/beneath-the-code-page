# Repository, CI and local delivery

Public remote: https://github.com/ziuld/beneath-the-code-page. Owner authorised this branch push and PR on2026-10-21. Merge, settings changes,
image publication and deployment are not authorised.

V1 is accepted and F16 merged. [ADR010](../architecture/adr-010-v2-delivery-and-portable-handoff.md)
selects maintenance, two lessons, design, tools, final browser review and portable
Docker handoff. The current JAR workflow remains supported. Historical bootstrap
follow-ups are not evidence that external repository settings were configured.

## Repository conventions and historical F01 follow-ups

Main branch, short feature branches such as `feature/F06-json-formatter`, PRs, squash merges, Conventional Commit-style titles, required checks, resolved discussions, real maintainer CODEOWNERS and dependency-update PRs. A solo owner must be able to merge; do not require impossible self-approval. Public visibility does not choose a licence; discuss code and brand/course licensing separately.

Add contributor guidance, security-reporting method with real contact, PR template and issue templates when bootstrap starts. Optional GitHub Projects fields mirror local IDs/status/estimates; do not maintain two conflicting authoritative trackers. Local `plan.json` remains canonical until an explicit migration decision.

F01 closure disposition (2026-10-09): contributor guidance, CODEOWNERS and PR template are delivered. The owner accepted Java-baseline closure while retaining security-reporting guidance/contact, issue templates, dependency-update configuration and main protection/required-check enforcement as unfinished follow-ups. Their owner/next decisions are recorded in [risks and decisions](../planning/risks-and-decisions.md); closure does not claim these settings/deliverables exist.

## Current CI coverage

| Job | Checks | Introduced |
|---|---|---|
| Java | Maven verify, unit/integration/architecture | F01 |
| Frontend | npm lockfile, types, lint, unit, translations, build | F02–F03 |
| Browser | Packaged JAR, CSP/privacy/a11y; Chromium only for remaining MVP (ADR 009) | F05–F06 |
| Supply chain | Dependencies, secrets, SAST; report failures | F01 onward |
| Container | Docker source build/Maven checks, non-root runtime/HTTP/health/shutdown, image vulnerability inventory and CycloneDX SBOM | F20 follow-up; configured for PR/main |

Pin action SHAs; default token read-only; no secrets/elevated token for untrusted PR execution; avoid privileged pull_request_target checkout. Use Gitleaks, Trivy and CodeQL (public repository eligibility/configuration verified during setup) or a documented SAST substitute. Choose exact tool/ruleset versions at installation. Critical/high exploitable findings block release; triage disputed/non-applicable findings with owner and expiry rather than silent suppression.

The initial Java workflow is integrated in `.github/workflows/java.yml`: real Maven verification, executable-JAR smoke and planning checks on PRs/main pushes, SHA-pinned actions, read-only token and no persisted checkout credentials. PR #1 proved actual pass/failure/restored-pass reporting; PR #2 integrated the wrapper checksum correction; both post-merge main runs passed. See [final acceptance](../../harness/evidence/F01-closure.md), [CI evidence](../../harness/evidence/F01-java-ci.md) and [contributor guidance](../../CONTRIBUTING.md). GitHub's non-failing Node.js 20 action-runtime warning and maintenance follow-up are recorded separately. No branch-protection or required-check setting has been changed. The F12 security steps below are now configured; configuration is not evidence of an actual remote CI run or a passing scan.

## Browser verification

[ADR009](../architecture/adr-009-chromium-only-mvp-verification.md) retains the
Chromium intermediate gate. The `Packaged browser verification` workflow runs the
full retained Chromium website/tool suite. F19 separately recorded full169 checks
per engine in Chromium/Firefox/Linux WebKit; those are not rerun in every PR.
Actual Safari remains unverified. See [F19 evidence](../../harness/evidence/F19-browsers.md).

All three workflows trigger on pull requests and pushes to main, not ordinary
feature-branch pushes. Job names: Java verification; Chromium packaged website;
Docker build, runtime and security. Workflows use SHA-pinned actions, read-only
contents permission and no persisted checkout credentials. No deployment job.
Main protection is currently disabled (read-only GitHub check2026-10-21); no
required-check enforcement or protection setting is claimed or changed.
Remote CI status for the current PR belongs in its checks, not inferred from
local passes. New Docker CI was locally exercised before publication.

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
used. `security/applicability.json` applies no exceptions. Historical F16 decisions
remain under `security/history/` with their original fingerprint and expiry;
only the active file is loaded. ADR011 records the narrow patch overrides. Both
POM and packaged-JAR inventories must match the selected Boot/Tomcat/Jackson
versions. New or unresolved blocking findings stay blocking; any future bounded
disposition requires actual reassessment and explicit owner approval.
Never use `continue-on-error`, stale reports or
empty scanner output as a substitute for a passing gate. Reuse applicable results
for unchanged inputs; rerun only affected verification when inputs/data change.

## Docker development and runtime — F20

F20 is complete under owner-approved local acceptance. [Runbook](docker-handoff.md)
and [evidence](../../harness/evidence/F20-docker.md) document pinned images, non-root
runtime, classpath assets, HTTP locale/CSRF, health, graceful shutdown and optional
Java/Python/Git development tooling. Windows/other machines remain unverified;
second-PC verification is optional by owner decision. No public hosting is implied.

The Docker CI job builds from source, runs `scripts/verify-container.py` without
host frontend output, installs the existing pinned security tools and runs
`scripts/test-container-security.py` plus `scripts/verify-container-security.py`.
The gate requires OS and expected packaged Java inventory, scanner success/fresh
DBs, records all findings, blocks HIGH/CRITICAL and creates a nonempty CycloneDX
SBOM. No ignore/waiver or continue-on-error. Local image results:24 MEDIUM/4 LOW,
no HIGH/CRITICAL, no fixed versions reported. Actual current results are in
`target/container-security/summary.json`, report.json and sbom.cdx.json; raw scanner
source/secret reports are never uploaded by CI.

## Operations baseline

Structured safe stdout logs, request IDs and normalised routes; bounded Micrometer labels; no request bodies or raw URI/query/header dumps. Only necessary Actuator health exposed locally, no details. Local rotation initially seven days. No external telemetry service, cloud deployment, production domain or release publication in Phase 1 planning.

## Local release procedure

For V1, follow the [local release runbook](local-release.md) to reproduce the
reviewed revision with the existing Maven build and packaged JAR. The F16 evidence
records source/artifact identity, health/route smoke/shutdown, security and limits. Do not require a container or new release automation. Any tagging,
public release or deployment remains a separately authorised action.

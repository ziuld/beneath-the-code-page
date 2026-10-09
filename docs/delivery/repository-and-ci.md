# Repository, CI and local delivery

Public remote: https://github.com/ziuld/beneath-the-code-page. No push or settings changes are part of the planning delivery.

## Repository conventions to establish during F01

Main branch, short feature branches such as `feature/F06-json-formatter`, PRs, squash merges, Conventional Commit-style titles, required checks, resolved discussions, real maintainer CODEOWNERS and dependency-update PRs. A solo owner must be able to merge; do not require impossible self-approval. Public visibility does not choose a licence; discuss code and brand/course licensing separately.

Add contributor guidance, security-reporting method with real contact, PR template and issue templates when bootstrap starts. Optional GitHub Projects fields mirror local IDs/status/estimates; do not maintain two conflicting authoritative trackers. Local `plan.json` remains canonical until an explicit migration decision.

## CI jobs to implement

| Job | Checks | Introduced |
|---|---|---|
| Java | Maven verify, unit/integration/architecture | F01 |
| Frontend | npm lockfile, types, lint, unit, translations, build | F02–F03 |
| Browser | Packaged JAR, CSP/privacy/a11y; engine smoke | F05–F06 |
| Supply chain | Dependencies, secrets, SAST; report failures | F01 onward |
| Container | Build, non-root/runtime probe, image scan, SBOM | F12 |

Pin action SHAs; default token read-only; no secrets/elevated token for untrusted PR execution; avoid privileged pull_request_target checkout. Use Gitleaks, Trivy and CodeQL (public repository eligibility/configuration verified during setup) or a documented SAST substitute. Choose exact tool/ruleset versions at installation. Critical/high exploitable findings block release; triage disputed/non-applicable findings with owner and expiry rather than silent suppression.

The initial Java workflow is now defined in `.github/workflows/java.yml`: real Maven verification, executable-JAR smoke and planning integrity checks on pull requests and main pushes. Its action revisions are SHA-pinned; the token is read-only and checkout credentials are not persisted. See [contributor guidance](../../CONTRIBUTING.md) for branch/review conventions, runtime pin and the intended required check. Remote execution and failure-reporting acceptance are still pending; a local pass is not a GitHub run.

## Local container acceptance

Multi-stage pinned build/runtime images, Java 25, no Node runtime in final image, non-root, read-only root, tmpfs, no-new-privileges, dropped capabilities, CPU/memory limits, graceful shutdown. Compose app port binds 127.0.0.1 only. No DB/Redis/Docker socket/credential mounts. Separate unpublished health management endpoint; select a probe actually available in the image. Validate failing and recovering readiness, not just HTTP success once.

## Operations baseline

Structured safe stdout logs, request IDs and normalised routes; bounded Micrometer labels; no request bodies or raw URI/query/header dumps. Only necessary Actuator health exposed locally, no details. Local rotation initially seven days. No external telemetry service, cloud deployment, production domain or release publication in Phase 1 planning.

## Eventual local release procedure

Tag only reviewed commits, create release notes and known limitations, archive verification/SBOM evidence and test the clean container run instructions. Publishing a public release or deploying remains a separate authorised action.

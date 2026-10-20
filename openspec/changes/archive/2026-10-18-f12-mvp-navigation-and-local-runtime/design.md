# Design

## Context

See `proposal.md` for motivation. Inspection confirms:

- `PublicPageSecurity` denies unknown routes with 403; `SafeHttpErrorsTests` already
  covers safe localised 403 in EN/ES/FR. The main security spec agrees. Only F12's
  plan-owned 404 text conflicts. No runtime security change is needed.
- `templates/tools.html`, `ToolsRenderingTests`, existing browser journeys and
  `harness/evidence/F07-UH02-json-minification.md` establish catalogue acceptance.
- README and `scripts/smoke-java-baseline.py` already cover loopback JAR startup,
  health and shutdown; `.github/workflows/java.yml` runs that smoke check.
- The workflows/POM contain no integrated dependency/secret/SAST gate. Frontend
  installation uses `--no-audit`; ESLint/type checks are not a vulnerability scan.
  `docs/delivery/repository-and-ci.md` explicitly leaves these scans unfinished.

A design is warranted for scanner failure handling and report privacy, not an
application architecture change. No new ADR is needed to retain accepted 403.

## Goals / Non-Goals

**Goals:** close the missing gate through a small project-local command reused by
existing CI; reconcile the stale requirement; close both stories once with evidence.

**Non-Goals:** new runtime/deployment infrastructure, generic scanner adapters,
dashboard/reporting services, hosted accounts, repository-settings changes, full
Git-history scanning or repetition of unchanged catalogue/browser/manual checks.

## Decisions

### 1. Reconcile documentation, not routing

During apply, change F12-UH01-R02/AC02 to safe localised 403 and reference the main
`secure-http-responses` policy and accepted error evidence. No new route matcher,
controller or duplicate OpenSpec capability. A 404 exception would add behaviour
and security-policy complexity for no retained MVP outcome. Add a tool-path-specific
assertion only if the existing accepted coverage leaves a demonstrated gap.

### 2. Two command-line scanners, no new scanning platform

Use Trivy for dependency/secret scanning and Semgrep OSS for Java/TypeScript SAST,
as a documented SAST substitute for hosted CodeQL. Run binaries/project-local
tool environments, not containers. Pin supported scanner versions and distribution
checksums during installation; pin the selected upstream security rules to an
immutable revision after checking their licence. Do not invent versions now.

Use Trivy's Maven analysis and the packaged JAR for shipped Java dependencies;
include both npm lockfiles and their development dependencies. Scan the current
tracked repository for secrets. Exclude generated reports/caches/tool installations,
not source or lockfiles. Record Maven test/build-plugin coverage limitations rather
than claiming every build-time component is scanned. Confirm expected Java and npm
inputs actually appear in results; an empty inventory is not a clean scan.

Use reviewed Java/TypeScript security rules with Semgrep OSS local scanning,
explicit failure-on-findings, strict error handling, metrics/version checks off,
and no login, registry auto-selection or source upload. Preserve scanner errors
and skipped applicable source as incomplete verification. Static analysis is
bounded detection, not a correctness or coverage-percentage claim.

The alternatives are three or more overlapping scanners, hosted credentials and
CodeQL reporting/API gates; these add integration work unnecessary for F12.

### 3. One fail-closed command with a small fixed policy

Add one straightforward script under `scripts/`, using existing Python conventions,
to invoke the fixed scanner commands, inspect their results and return failure for
blocking findings or incomplete execution. No plugin API, class hierarchy or
general-purpose report framework. Keep scanner/configuration and database-download
failures distinct from a clean result; do not use `continue-on-error` or swallow
nonzero exit codes. Sanity-check scanner result errors as well as process status.

Block high/critical dependency findings, high/critical selected SAST findings and
detected secrets until triaged. Retain lower-severity results for review. A narrow
false-positive/non-applicable disposition needs finding identity, owner, reason
and expiry; do not create a generic waiver engine or blanket ignore file. If no
dispositions are needed, do not add exception machinery speculatively.

Implementation decision after actual findings and owner instruction to continue:
retain Boot4.1.1 and use the eight exact decisions in `security/applicability.json`,
with owner/reason/approval reference, expiry2026-11-01 and a reviewed source plus
packaged-server configuration fingerprint. Preserve original findings in reports;
only matching POM/JAR vulnerability observations become non-blocking. Changed
scope, expiry and all unrelated findings still fail closed. This is the concrete
bounded disposition case anticipated above, not a general waiver platform.

Write redacted summaries to `target/security/`: revision/dirty-state identity,
input hashes, scanner/rule identities, database timestamp, outcomes and finding
IDs/locations. Do not print or upload raw secret matches or unsanitised snippets.
Disable telemetry where supported. Metadata/database downloads are allowed, but
browser input is never a scanner input and repository source stays local.

### 4. Reuse existing CI and accepted evidence

Invoke the same command after the existing build in `java.yml`, with project-local
tools, read-only permissions and immutable action references if any action is
added. No second build, browser job or dedicated release workflow. Document the
local invocation and triage in the existing delivery runbook. A completed full
security run plus focused gate tests provides the new evidence; no extra rerun
solely for closure. Reused security data must be applicable to identical inputs
and refreshed within the documented scanner policy (default maximum age 24h).

Catalogue/runtime evidence remains inherited with its original limitations. One
combined F12 evidence record serves UH01-T05 and UH02-T05; completion is not a
second owner review, empty commit or authority to publish. Keep F12's plan-owned
behaviour ownership and original IDs/baselines; regenerate views after updating
the canonical requirement, verification links and actual status during apply.

## Risks / Trade-offs

- Scanner installation, databases or real findings may exceed the provisional
  2h budget → record the blocker/actual effort; do not suppress findings to fit it.
- False positives or expired exceptions → narrow explicit triage, otherwise fail.
- Scanner success with skipped Java 25/TypeScript input → verify actual coverage;
  unsupported applicable input keeps the gate incomplete, not falsely passing.
- Reports can contain secrets/source excerpts → keep raw output local and sanitise
  before any shared output; prove redaction with synthetic fixtures.
- New advisory data can invalidate old results → reuse unchanged acceptance, but
  refresh affected security data rather than calling an old scan permanently safe.

## Migration Plan

Apply only the requirement reconciliation, security tooling/CI and concise evidence
updates. Run the new gate and its focused checks, then update both story records
and regenerate planning views. No server deployment or data migration exists.
If scanner integration is broken, leave F12 open with a recorded blocker; reverting
new tooling must not turn missing security evidence into a passing release gate.

## References

- Trivy Java coverage: https://trivy.dev/latest/docs/coverage/language/java/
  (Maven resolution and nested JAR support; missing versions and scope limitations).
- Semgrep CLI: https://semgrep.dev/docs/cli-reference
  (`scan` is local; default findings do not fail without explicit enforcement).

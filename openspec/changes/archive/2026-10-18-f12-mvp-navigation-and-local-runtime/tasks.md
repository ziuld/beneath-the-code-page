# Tasks

Only outstanding F12 work is tracked below. UH01/UH02-T01–T03 are already credited
in `harness/evidence/F12-simplification.md`; do not reimplement, retest or seek a
second owner review of those unchanged deliverables. Each task includes its checks.

## 1. Reconcile the accepted route policy

- [x] 1.1 (F12-UH01-T04) Change the plan-owned R02/AC02 from 404 to the accepted safe localised 403; link existing security/error evidence and regenerate backlog/roadmap views. Verify planning integrity and rule tests; add/run only a genuinely missing tool-route assertion if existing accepted coverage is insufficient. Do not change routing, CSP or the security allowlist.

## 2. Supply the missing security verification

- [x] 2.1 (F12-UH02-T04) Add the minimal project-local Trivy/Semgrep OSS command and pinned configuration described in design.md, including reviewed immutable Java/TypeScript rules and documented input coverage. Verify installation identities, expected Java/JAR and both npm lockfile inventories, and actual source coverage. Include focused clean/blocking/incomplete-result tests and synthetic-secret redaction checks with this implementation; do not add a scanner framework or speculative waiver machinery.
- [x] 2.2 (F12-UH02-T04) Invoke that same command after the existing build in java.yml and document the local invocation, scope, failure policy and triage in the delivery runbook. Verify read-only/no-secret CI configuration, scanner failure propagation and a synthetic SAST/secret failure through the actual commands; test policy handling of a blocking dependency report without adding a vulnerable production dependency. Preserve existing build/smoke/browser checks without duplicating them.

## 3. Integrated result and one closure record

- [x] 3.1 (F12-UH02-T04) Run the new security verification against the actual candidate once, recording versions, input identity, database freshness, coverage and redacted findings; triage any blockers explicitly and confirm the integrated invocation cannot report success on scanner failure. Reuse this result for closure; no extra build/browser/manual-review cycle solely for F12. Record unavailable remote CI honestly and do not claim it ran without authorised delivery.
- [x] 3.2 (F12-UH01-T05 and F12-UH02-T05) Write one combined acceptance record linking inherited catalogue/JAR/error evidence and the new security result, then update both stories/F12 only when their criteria pass. Preserve IDs, baseline and honest actual effort; regenerate both planning views and verify planning integrity, all planning-rule tests, strict OpenSpec validation and whitespace. If unresolved findings or unavailable required verification remain, leave affected work open with a precise blocker, not another review task.

## Workflow follow-up

- Commit/push, publication, spec synchronisation and archival require their own
  applicable authorisation; this checklist does not perform or require them merely
  to manufacture progress. No empty commits or repository-settings changes.

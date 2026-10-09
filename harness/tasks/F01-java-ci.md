# Task — F01-UH02 initial Java CI

Status / owner / date: implementation, verification and integration accepted / Ziuld with AI assistance / 2026-10-09. Final local closure record: ../evidence/F01-closure.md.

User outcome and authorised scope: T02 implementation, T03 local verification and T04 separately approved PR pass/fail/restoration proof; record actual acceptance in this authorised documentation commit/push. Merge requires separate owner approval.

Prerequisites and files read: F01-UH01 and F01-UH02-T01 done; current handoff, F01 dossier/EARS/Gherkin/ordered tasks, canonical F01 records, architecture/feasibility, repository/CI guidance, POM and existing fixture/smoke checks.

Acceptance criteria: F01-UH02-AC01/AC02. Local architecture fixtures prove AC01; actual failing and restored PR runs now prove AC02. URLs, head commits, job/step results and runtime versions are recorded in evidence.

Implementation steps: add SHA-pinned checkout/setup-java workflow on PRs and main pushes; pin actual Temurin build using vendor SemVer; run password-redacted Maven verification with unchanged exit status; smoke the executable; validate planning; document real owner, branches, PR review and required check name.

Security, privacy, accessibility and locale implications: read-only token, no saved checkout credentials, secrets, deployment or privileged PR event; no product UI changed. Generated development passwords are redacted from console output.

Verification commands/manual checks: YAML parse and workflow permission/pinning review; local workflow commands; non-empty ArchUnit fixtures; controlled verifier-script failure check; both renderers, planning validation and planning-rule tests; Git diff review.

Results/evidence/actual effort: ../evidence/F01-java-ci.md. Owner hours remain unreported.

Open issues/next action: T05 review of the approved merges/main checks is complete; local closure metadata awaits commit/publication approval. The pinned actions' Node.js runtime maintenance and broader governance follow-ups remain unfinished. F02 has not started.

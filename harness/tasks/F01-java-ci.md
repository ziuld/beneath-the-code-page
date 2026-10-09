# Task — F01-UH02 initial Java CI

Status / owner / date: implementation and local verification complete; remote acceptance blocked / Ziuld with AI assistance / 2026-10-09.

User outcome and authorised scope: continue T02 with pinned, least-privilege Java checks and repository review conventions; verify T03 locally; review T04 permissions without claiming remote acceptance.

Prerequisites and files read: F01-UH01 and F01-UH02-T01 done; current handoff, F01 dossier/EARS/Gherkin/ordered tasks, canonical F01 records, architecture/feasibility, repository/CI guidance, POM and existing fixture/smoke checks.

Acceptance criteria: F01-UH02-AC01/AC02. Local architecture fixtures prove AC01; a real remote failing PR run is still required for AC02.

Implementation steps: add SHA-pinned checkout/setup-java workflow on PRs and main pushes; pin actual Temurin build using vendor SemVer; run password-redacted Maven verification with unchanged exit status; smoke the executable; validate planning; document real owner, branches, PR review and required check name.

Security, privacy, accessibility and locale implications: read-only token, no saved checkout credentials, secrets, deployment or privileged PR event; no product UI changed. Generated development passwords are redacted from console output.

Verification commands/manual checks: YAML parse and workflow permission/pinning review; local workflow commands; non-empty ArchUnit fixtures; controlled verifier-script failure check; both renderers, planning validation and planning-rule tests; Git diff review.

Results/evidence/actual effort: ../evidence/F01-java-ci.md. Owner hours remain unreported.

Open issues/next action: remote runs need publication authorised by the user; no push or settings change is included. F02 remains gated by F01 acceptance.

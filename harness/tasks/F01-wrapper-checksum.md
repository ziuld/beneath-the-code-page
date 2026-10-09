# Task — F01 Maven wrapper checksum gap

Status / owner / date: checksum pin, local positive/negative verification and approved integration accepted / Ziuld with AI assistance / 2026-10-09. Final local closure record: ../evidence/F01-closure.md.

User outcome and authorised scope: add and locally verify the Maven distribution checksum identified during the post-merge F01 audit. No commit, push or repository setting change is authorised by this step.

Prerequisites and files read: merged Java baseline and passing main CI; current handoff; F01 feature/checksum summary and story acceptance; existing wrapper properties and download/checksum/cache behavior; initial Java evidence and current canonical F01 status.

Acceptance criteria: F01 feature-level Wrapper/checksum gate. Keep Maven 3.10.0, Wrapper 3.3.4, Boot 4.1.1 and Java 25; prove archive identity and actual checksum enforcement without relying on a warm cache.

Implementation steps: download the configured ZIP and official SHA-512; verify the archive; derive and pin SHA-256; use isolated copies/caches for valid and deliberately incorrect pins; verify the actual baseline build; record the discovery, limitation and results in evidence/handoff.

Security/privacy/accessibility/locale implications: downloaded build tooling is checked before use; tests execute only the checksum-verified distribution. No product UI, dependency or global configuration change. All caches/temporary output stay project-local; generated development password remains redacted.

Verification commands/manual checks: script print-sha256 provenance check; script valid/invalid checksum tests with fresh caches; local Java verification; planning validator/tests and Git diff review.

Results/evidence/actual effort: ../evidence/F01-wrapper-checksum.md. Owner effort remains unreported.

Open issues/next action: PR #2 is merged and main CI passed; final closure metadata needs separate commit/publication approval. Broader governance follow-ups remain unfinished under the owner-approved scope disposition.

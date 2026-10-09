# Task — F00/F01 Java baseline

Status / owner / date: local Java scope verified and pre-commit review completed / Ziuld with AI assistance / 2026-10-09. Initial commit result is reported in the final handoff.

User outcome and authorised scope: inspect the owner's imported project, establish Java metadata and tested dependency boundaries, verify locally, record evidence and initialise one local commit.

Prerequisites and files read: AGENTS.md; current handoff and workflow; F00/F01 feature dossiers, EARS, Gherkin and ordered tasks; story workflow; architecture and feasibility; repository/CI guidance; canonical plan; imported POM, wrapper, application and context test.

Acceptance criteria: F00-UH01-AC01/AC02; F01-UH01-AC01/AC02; local boundary proof for F01-UH02-AC01. F01-UH02-AC02 requires later remote CI evidence.

Implementation steps: preserve generated production code and dependencies; set metadata; pin ArchUnit 1.4.1; import production bytecode only; explicitly defer absent package rules and exercise those same rules against compiled test-only positive/negative fixtures; verify JAR startup and controlled Maven failure; update canonical status and regenerate views; review and commit locally if all required local checks pass.

Security, privacy, accessibility and locale implications: no product surface added; generated security configuration retained. Redact generated passwords from evidence. No frontend or translation changes.

Verification commands and manual checks to run: Java/javac and wrapper versions; ./mvnw verify; ./mvnw package; executable manifest/startup smoke; controlled failing test; both planning renderers, validator and planning-rule tests; Git ignore/status/diff/identity review.

Results / evidence links / actual effort: see ../evidence/F00-F01-java-baseline.md. Owner time for the historical import is not supplied; do not substitute baseline estimates for actual effort.

Open issues and next action: CI remains outside this Java-only handoff; story closure requires commit/integration evidence. Historical pre-import document hashes are unavailable.

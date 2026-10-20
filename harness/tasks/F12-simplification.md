# Task — F12 remove duplicated work

Status / owner / date: complete / Ziuld with AI assistance / 2026-10-18.

User outcome and authorised scope: simplify F12 planning; accepted, tested and
reviewed work must not be queued again. No application or OpenSpec changes.

Prerequisites and files read: F12 dossier and canonical plan; current handoff;
architecture, feasibility review and ADR 007; existing catalogue/controller/tests,
JAR smoke/CI/configuration, README and final F07 acceptance evidence.

Acceptance criteria: preserve F12 IDs, baseline estimates and unresolved criteria;
credit accepted catalogue/runtime work; retain only genuine gaps and shared closure.

Implementation steps: record inherited evidence, update canonical task tracking,
regenerate both planning views, run planning integrity/rule/whitespace checks.

Security, privacy, accessibility and locale implications: retain accepted checks
without repeating them. Do not declare unknown-tool 404 or security-scan gates
passed; those remain unresolved. No new manual review of unchanged pages.

Verification commands and manual checks to run: both planning renderers,
`python3 scripts/check-planning.py`, `python3 scripts/test-planning-rules.py`,
`git diff --check`. No application tests needed for planning-only changes.

Results / evidence links / actual effort: see
[simplification evidence](../evidence/F12-simplification.md). Both renderers,
planning integrity, all 21 planning-rule tests and whitespace checks pass.
Effort unreported; no application tests rerun.

Open issues and next action: resolve the two remaining gaps during F12 execution;
one shared closure record updates both stories. No commit/push authorised here.

# Task — F17 security maintenance and current documentation

Status / owner / date: complete / Ziuld with AI / 2026-10-20.

Authorised scope: compatible security remediation and stale current documentation;
no UI/content feature additions or exception renewal. Existing V2 planning edits retained.

Read: AGENTS; current handoff; architecture/feasibility; F17 requirements, scenarios,
ordered tasks; security scripts/policy/tests; current runbooks; official upstream
metadata/advisories. F16 prerequisite accepted/merged; clean upstream baseline790b578.

Acceptance: F17-UH01-R01/R02 and AC01/AC02 in canonical plan.json (no behaviour_spec).

Steps: baseline scan; same-line Tomcat/Jackson patches under ADR011; explicit
no-exception policy with historical approval preserved; enforce resolved inventory;
correct current docs; full Java/frontend/Chromium/security/planning verification;
review evidence and scoped commit. First push/PR follows the two lessons.

Privacy/accessibility/locales: no payload handling, application route or visual
changes; existing checks retained. Scanner data/source remain local.

Verification: verify-java-baseline; smoke-java-baseline; verify-home-browser
--engine chromium; test-security; verify-security; planning renderer/validator/rules;
OpenSpec main specs strict validation; diff whitespace. No Firefox/Safari/Docker
runs or system installation in F17.

Results/evidence: harness/evidence/F17-security-maintenance.md. Implementation commit e38cb17b48348d749b428b0d066dc893cf073d87; all applicable checks pass. Actual effort unreported. Next: F15-UH01.

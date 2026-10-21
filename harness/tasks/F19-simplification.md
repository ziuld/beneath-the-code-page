# Task — F19-UH01-T01 bounded simplification

Status: review and cleanup verified; recording T01 closure. Owner: Ziuld with AI assistance. Date: 2026-10-21.
Scope: review unused dependencies, unnecessary abstractions, duplicate tests and
conflicting current docs; implement justified small improvements before browsers.
Read: AGENTS/current-state, F19 dossier/EARS/Gherkin/tasks, technical architecture,
feasibility/ADR010, package manifests, affected code/tests and release guidance.
Prerequisites F18/F08/F09/F10 done. Criteria: F19-UH01-T01; F19 AC01/AC02 remain
for subsequent browser acceptance, not claimed by this task.
Changes: remove five unused Maven declarations (Bean Validation and unused
Thymeleaf security dialect, plus unused actuator/Thymeleaf/validation test starters);
remove empty formatter CSS import/file; refresh current README/release guidance.
Keep required CSRF/security, shared styles/lazy enhancement, EN/ES/FR and tests.
No framework or algorithm rewrite. All frontend dependencies have real consumers;
result-session adapter retains Validator's distinct no-Copy/stale semantics.
Verification: focused frontend check; full Maven, Chromium, security, smoke,
strict specs and planning once coherent. Review existing Firefox/WebKit selection,
cache presence and unavailable real Safari; engine execution belongs to T02/T03.
Evidence: harness/evidence/F19-simplification.md. Owner effort unreported.

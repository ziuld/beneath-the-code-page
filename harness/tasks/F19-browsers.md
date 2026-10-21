# Task — F19 final browser verification (T02–T04)

Status: complete. Owner: Ziuld with AI assistance. Date: 2026-10-21.
Read: AGENTS/current-state, F19 dossier/EARS/scenarios/tasks, retained browser
harness/tests, pending browser register and T01 evidence. Prerequisites complete.
Scope: expand retained Firefox/WebKit selection to completed tools/shared journeys,
run focused checks then full relevant engine suites; fix demonstrated defects
without weakening privacy/CSP/keyboard/correctness. Record real engine versions.
No native Safari here; keep its separate pending limitation under F19 R02.
Plan: investigate local runtime; targeted Firefox/tools; triage/fix; final engines;
record evidence/commit/tracking. All3 WebKit Validator recovery fixmes were investigated, re-enabled and passed. No sudo/global installation or Docker
permission changes without owner approval. Project-local dependencies permitted.
Use accepted T01 packaged JAR until production changes require rebuild; never
rebuild while browser tests run. Stop verified preview before any production build.
Evidence: harness/evidence/F19-browsers.md. Actual owner effort unreported.

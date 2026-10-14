# Task — F04 security and locale flow

Status / owner / date: Accepted and done; local commit 3ea174f; Ziuld with AI assistance; 2026-10-14.

User outcome and authorised scope: Apply `f04-security-and-locale-flow`, covering both F04 stories, without F05, publication, archive or behavioural migration.

Prerequisites and files read: F03 and both stories confirmed done in plan.json and archived in the current handoff. Read architecture, feasibility review, F04 dossier/EARS/Gherkin/ordered tasks, all CLI context files and existing locale/security/Home/shell/tests/build configuration. Existing `.vscode/settings.json` changes preserved.

Acceptance criteria (link, do not drift): [F04-UH01-AC01/AC02 and F04-UH02-AC01/AC02](../../docs/planning/features/F04.md); [locale delta](../../openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/specs/locale-preferences/spec.md); [HTTP delta](../../openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/specs/secure-http-responses/spec.md).

Implementation steps: Follow the [16-item checklist](../../openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/tasks.md): locale resolution, preference flow/selector, actual browser evidence and owner review, then bounded HTTP/security, full integration and acceptance-backed closure.

Security, privacy, accessibility and locale implications: Native resource-backed EN/ES/FR preference form; cookie masked CSRF; no sessions; exact redirects; no preference GET mutation; bounded pre-parser requests; safe errors/logs; exact CSP; preserve B and existing publication/local-watch boundaries.

Verification commands and manual checks to run: Targeted Maven tests per slice; packaged/browser verification; clean Maven verify and original smoke; actual 200% browser zoom and owner copy/visual review; planning renderers/validator/rule tests, strict OpenSpec and whitespace checks. These are planned, not passing results.

Results / evidence links / actual effort: Implementation and technical checks complete. [UH01 evidence](../evidence/F04-UH01-locale-preferences.md) records 46 passing post-clean Google Chrome cases and prior owner actual zoom/language/visual review. [UH02 evidence](../evidence/F04-UH02-secure-http-responses.md) records clean verify (186 Java cases/four skips, 17 packaged), smoke/logo/package/diff review and ASVS mapping. Owner effort unreported.

Open issues and next action: Owner accepted both stories and authorised local commit 3ea174f; real hash recorded for closure. Post-commit closure bookkeeping remains uncommitted, unrelated editor change excluded/preserved. No further technical blocker. Reproduce browser with --browser chrome. Main-spec sync/archive/ownership migration remain separate workflows; no push authorised.

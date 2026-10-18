# Task — F12 MVP navigation and local runtime

Status / owner / date: complete / Ziuld with AI assistance / 2026-10-18.

User outcome and authorised scope: implement the five tasks in
`openspec/changes/f12-mvp-navigation-and-local-runtime/tasks.md`. Credit accepted
catalogue/runtime checks; reconcile 403 and supply only the missing security gate.

Prerequisites and files read: F07 accepted; current handoff, F12 requirements,
scenarios and ordered tasks, architecture/feasibility/ADR007, all change artifacts,
security implementation/tests, existing build/CI and final acceptance evidence.

Acceptance criteria: change delta and F12 canonical R01/R02/AC01/AC02 links. No
behaviour ownership migration. No runtime route/CSP or management topology change.

Implementation steps: reconcile requirement; add pinned project-local scanners and
focused tests; reuse command in existing CI/runbook; execute security verification;
record one shared acceptance outcome and regenerate planning views.

Security, privacy, accessibility and locale implications: preserve localised safe
403, accepted keyboard/locale/runtime evidence, fail-closed scans and redacted
reports. No tool payloads, hosted accounts, containers, global installation or
external publication.

Verification commands and manual checks to run: task-specific checks in the
OpenSpec checklist, planning integrity/rule tests, strict OpenSpec and whitespace.
Do not repeat unchanged application/browser/manual acceptance.

Results / evidence links / actual effort: see
[F12 integrated evidence](../evidence/F12-integrated-acceptance.md). Effort unreported.

Open issues and next action: all5/5 tasks complete. Boot4.1.1 remains
unchanged. Owner instruction to continue after the bounded proposal approved its
eight exact CVE/package/version applicability decisions until2026-11-01, invalidated
by server-source/configuration or packaged-code changes.18 policy tests pass;
actual candidate gate passes with all8 CVEs retained as16 annotated observations,
zero remaining blockers,2 medium CVEs visible and35/35 source coverage. UH01 done
against inherited accepted code/evidence; UH02/F12 accepted at local implementation
commit71aeefc. No repeated manual/functional review or invented new-code commit
reference. No push/release/sync/archive; reassess bounded decisions before expiry
or server configuration changes. Next MVP feature is F13, not started here.

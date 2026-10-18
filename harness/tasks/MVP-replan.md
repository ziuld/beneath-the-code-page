# Task — MVP scope and delivery replan

Status / owner / date: complete (planning only) / Ziuld with AI assistance / 2026-10-18.

User outcome and authorised scope: replan the MVP around completed F00–F06, F07,
the full website journey and one complete EN/ES/FR learning unit. Freeze additional
tools and remaining course units for V2. Planning/tooling only; no application work.

Prerequisites and files read: current handoff; architecture and feasibility review;
F07/F12/F13/F14/F16 dossiers; canonical plan; renderers and planning rules; epic,
feature summary and PM plan. Clean working tree; F06 accepted and archived.

Acceptance criteria: [ADR 007](../../docs/architecture/adr-007-focused-mvp.md)
and the revised [epic](../../docs/planning/epic-mvp.md).

Implementation steps:
1. Record the accepted scope decision; preserve completed work and stable IDs.
2. Separate V1/V2 scheduling and acceptance; revise remaining tasks/dependencies.
3. Reconcile planning/architecture guidance and regenerate read-only views.
4. Run planning-rule tests, integrity, strict OpenSpec and whitespace checks;
   record actual evidence and the next action.

Security, privacy, accessibility and locale implications: retained gates unchanged;
no CSP, runtime, dependency or application test changes. Container work deferred.

Verification commands and manual checks to run: both planning renderers;
`python3 scripts/check-planning.py`; `python3 scripts/test-planning-rules.py`;
`openspec validate --all --strict`; `git diff --check`; scoped diff review.

Results / evidence links / actual effort: [evidence](../evidence/MVP-replan.md);
21 planning-rule tests, planning integrity, 8 strict OpenSpec specs and whitespace
checks pass. Both views regenerated. All baseline estimates/IDs/product statuses
preserved; F00–F06 unchanged except V1 metadata. Owner effort unreported.

Open issues and next action: provisional estimates and future content/language
review risks remain explicit. Next eligible task F07-UH01-T01; no implementation,
commit, push, merge or release performed.

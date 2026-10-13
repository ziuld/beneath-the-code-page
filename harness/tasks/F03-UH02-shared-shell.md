# Task — F03-UH02 shared shell

Status / owner / date: accepted and locally integrated, done; Ziuld with AI assistance; 2026-10-13.

User outcome and authorised scope: implement `f03-uh02-localised-shared-shell` only. No F04 locale selection/persistence/security expansion, product destinations, commit, push or automatic ownership migration.

Prerequisites and files read: F03-UH01 accepted and integrated in `f2a3e3c`/`baf975c`; current handoff and evidence, hierarchy/F03 dossier, canonical plan.json story, technical architecture, feasibility review and all four change artifacts. Preserve pre-existing uncommitted F03-UH01 archival/migration files and planning fixture correction.

Acceptance criteria (link, do not drift): [canonical F03-UH02](../../docs/planning/features/F03.md#f03-uh02), R01/R02 and AC01/AC02; [change checklist](../../openspec/changes/f03-uh02-localised-shared-shell/tasks.md). Canonical T01–T05 and 10h baseline remain unchanged; subdivisions do not add effort.

Implementation steps: T01 confirm context; T02 extract used tokens/shared styles and semantic navbar/footer/card/button fragments with adjacent tests; T03 exact locale labels/parity and packaged cases; T04 keyboard/focus/reflow/contrast/motion plus actual browser-UI zoom and human translation review; T05 evidence-backed integration and accepted closure only.

Security, privacy, accessibility and locale implications: keep header resolver and security policy unchanged; fixtures isolated from production JAR; use native semantic controls/resource-backed labels and preserve original B bytes. No new payload/network/storage flow.

Verification commands and manual checks to run: frontend check/build, MVC tests, clean Java baseline, packaged Home/component browser runner, health and F02 regressions, planning integrity/rule tests, strict OpenSpec validation and whitespace checks. Compare same-viewport EN/ES/FR screenshots before/after. Actual browser-UI 200% zoom and human copy/visual review are separate required checks, not inferred from CSS zoom.

Results / evidence links / actual effort: `harness/evidence/F03-UH02-shared-shell.md` records successful final clean verification (15 frontend, 100 Java with four skips, 15 packaged), original health smoke, 36 Chromium cases and the owner's review decision. Owner effort unreported. No commit/push or ownership migration.

Open issues and next action: local commit/closure explicitly authorised and implementation integrated in `0246b37`; F03-UH02/F03 done with evidence. Preserve pre-existing Home archival changes. F03-UH02 behavioural sync/archive and any push require separate authorisation; do not invent effort or claim omitted manual reviews ran.

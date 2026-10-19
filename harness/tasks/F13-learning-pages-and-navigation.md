# Task — F13 learning pages and navigation

Status / owner / date: security and page review approved; local commit closure in review / Ziuld with AI assistance / 2026-10-19.

User outcome and authorised scope: apply the six F13 tasks, not F14 content or
F16 production Learn promotion. Keep Boot 4.1.1 and existing archive edits intact.

Owner policy update,2026-10-19(ADR009): Chromium-only browser acceptance across all
remaining F13/F14/F16 work and final MVP closure. Firefox/WebKit are optional
post-MVP evaluation, superseding earlier final-project deferral below. Retain
definitions/evidence; task2.2's CI alignment is implemented. Manual/security gates
and declined security approval remain.

Latest continuation: CI alignment implemented and exact-diff verified; runtime
and passing Chromium suite unchanged. Owner approved the requested preview review;
no detailed per-check observations supplied. Task2.2 complete; preview PID92157
verified and sent SIGTERM. OpenSpec4/6. Security decline unchanged, not overridden
by page approval; final acceptance remains blocked. No unchanged approval retry.

Prerequisites and files read: F07/F12 accepted; F13 dossier, architecture,
feasibility/ADR007, current handoff and all proposal/design/delta/task artifacts.

Acceptance criteria: `openspec/changes/f13-learning-pages-and-navigation/specs/`;
canonical IDs remain plan-owned. No automatic behaviour ownership migration.

Implementation steps: catalogue/loader; SSR/security/locale integration; safe
Markdown; copied-JAR fixtures/browser review; bounded security reassessment;
combined evidence and closure.

Security, privacy, accessibility and locale implications: catalogue-owned paths,
complete locales, inert content and no promotion of synthetic lessons. Server
changes invalidate the existing security fingerprint; do not refresh it silently.

Verification commands and manual checks to run: focused Java tests per slice,
clean Maven and packaged browsers for integrated pages, policy tests/security
reassessment, new-page owner review, planning/OpenSpec/whitespace checks.

Results / evidence links / actual effort: see
[F13 evidence](../evidence/F13-integrated-acceptance.md); effort unreported.

Open issues and next action: authorised container fix passes Maven verify
(243+17 Java,185 frontend),Chromium119/119 and Firefox73/73; malformed-slash fixture
retained. WebKit3 API cases pass,70 launch failures from known host dependencies.
Owner defers Firefox/WebKit execution to final project verification; interim work
uses Chromium, no waiver or false completion.18 security tests pass; current scans
find no new CVEs/secrets/SAST findings and cover44 source files/CommonMark0.30.1.
Gate rejects obsolete F12 fingerprint as expected. Eight exact applicability
decisions reassessed; owner declined the fingerprint update. Policy stays unchanged
and security acceptance blocked; no unchanged approval retry without owner prompt.
Owner narrow/actual200%-zoom review and closure still pending.
OpenSpec3/6. No fingerprint refresh, commit/push or production Learn promotion.

Latest clarification supersedes the historical security refusal above: owner
explicitly approved F13 bounded scope; current fingerprint matches;18 policy tests
and actual security gate pass. Page review approved, preview stopped; OpenSpec5/6.
Closure requires an authorised coherent local F13 commit/reference under planning
rules; none authorised/made. Reuse unchanged build/Chromium evidence; no push.

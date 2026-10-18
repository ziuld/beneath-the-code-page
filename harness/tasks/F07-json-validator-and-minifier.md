# Task — F07 JSON Validator and Minifier

Status / owner / date: paused on actual WebKit recovery failures / Ziuld with AI assistance / 2026-10-18.

User outcome and authorised scope: apply `f07-json-validator-and-minifier`; Validator
first, Minifier after accepted UH01. No publication before acceptance, no V2 work,
dependency/CSP change, behavioural migration, sync/archive or remote delivery implied.

Prerequisites and files read: all CLI context files, canonical F07 dossier/EARS/
scenarios/tasks, accepted F06 integrated evidence, architecture/feasibility,
current JSON/editor/worker code and nearby tests. Baseline `d6455d4`; the uncommitted
MVP replan and proposal records were present before apply and will be preserved.
No runtime changes were present at the start of this apply.

Acceptance criteria: delta specs and checklist in
`openspec/changes/f07-json-validator-and-minifier/`; canonical F07 IDs remain stable.

Implementation steps: follow the returned OpenSpec checklist, extract shared strict
validation, add Validator/protocol/workspace/SSR tests, verify packaged behaviour,
then obtain actual owner acceptance before publication and dependent Minifier work.

Security/privacy/keyboard/locale implications: retain memory-only processing,
exact worker startup exception, input/depth/output/deadline limits, exact routes,
no sessions, EN/ES/FR, existing keyboard/visual checks and text-only history clearing.

Checks planned: focused Vitest/type/lint/style checks; clean Maven and health;
full Chromium and critical Firefox/WebKit; actual owner keyboard/zoom/locale review;
planning/rule/OpenSpec/whitespace checks. Planned checks are not passes.

Results/evidence: [Validator evidence](../evidence/F07-UH01-json-validation.md).
Actual CI at0ca9f94 on draftPR7: Java/clean Maven/Chromium94/Firefox48 pass;
WebKit44/48 fails three lazy-abort/reload and one busy-worker/retry case. Suspect
injected-fault cache contamination, not proved. Propose non-cacheable test failure
responses retaining all assertions/CSP/deadlines. Await guidance; no correction,
catalogue publication,closure or Minifier; checklist4/14. Earlier pending-CI notes
below are superseded by actual failure evidence, not waived.

Owner reports all requested manual checks pass;1.5 recorded,4/14 overall. Browser/
version/OS/viewport unreported. Required Ubuntu WebKit still awaits explicit
commit/push/new-draft-PR permission; no catalogue promotion/UH01 closure/Minifier.
The review report is not delivery authorisation. Prior pending-manual notes below
are historical; automated gate and canonical predecessor rules remain in force.

Current: authorised full-document test correction passes exact equality. Chromium
94/94,Firefox48/48 and clean Maven/health pass; required Ubuntu WebKit requires
authorised delivery because local host libraries are absent. Preview8082 EN/ES/FR
HTTP200/markup verified. Owner acceptance/promotion and Minifier pending; checklist
3/14,1.4 unchecked. Earlier fixture/style pauses below are resolved.

Current pause: Chromium93/94, all nine new locale cases and retained regressions
pass.1 MiB preservation fixture compares virtualised DOM with full input; valid
verdict observed but full equality/deep/deadline checks unproved. Propose explicit
test copy event into in-memory DataTransfer after Select All, preserving exact
source equality without real clipboard reads or app changes. Await guidance;
1.4 unchecked,3/14 overall, remaining browsers/manual acceptance pending.

Latest: routine style-only corrections authorised; clean Maven166 frontend/204
Java cases (three skips)/17 packaged and health pass.1.3 complete,3/14 checklist;
new packaged Validator cases written and Chromium running. Firefox/WebKit/manual
acceptance remain, catalogue Formatter-only and Minifier unstarted. Earlier style
pauses below are historical and resolved, not current blockers.

Actual owner effort unreported. Baseline1.1 done; shared validation/protocol task1.2
complete after approved corrections, with77 focused tests/type/lint/style and all21
planning tests passing. Checklist2/14. Validator session/page/exact routes/messages/
MVC tests prepared in1.3. New clean Maven passes type/lint then stops on one
formatter-workspace.ts line-wrap warning, before unit/Java/package tests. Await
guidance under the error rule;1.3 unchecked, browser/owner acceptance and Minifier
remain unstarted. Log /tmp/opencode/f07-validator-clean-maven.log.

Post-pause bookkeeping checks: planning integrity/strict OpenSpec/whitespace pass;
planning-rule20/21, with one stale generated-queue fixture expecting the now-completed
T01 as next. Recommend isolating its initial-state fixture; no correction applied.

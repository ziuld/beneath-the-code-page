# Current handoff

First selected V2 delivery accepted,2026-10-20: F17 maintenance and F15-UH01/UH02
complete with explicit owner EN/ES/FR content/reading approval. Three units use
existing ordered navigation. F15 stays planned/open for its five deferred stories,
not active WIP or a complete course. Final refreshed Maven260+17/185 frontend,
actual security0 findings/0 exceptions, policy20/planning23/strict15 PASS; full
Chromium137 applies to unchanged lesson/runtime inputs. Preview stopped.
Branch:planning/v2-delivery-sequence, based on merged main790b578. Scoped push and
first PR explicitly authorised; use the attached GitHub PR for live publication
and remote-CI state. Local evidence does not claim a remote pass. No merge,
deployment, tag, registry publication or new OpenSpec archival authorised.
Evidence:harness/evidence/V2-first-delivery-pr.md and the linked F17/F15 evidence.
Next:F18 Learn-first page-by-page design prompts and owner-generated concepts;
agreement precedes visual implementation. Other tools then F19/F20 follow ADR010.
Actual effort remains unreported.

## Earlier accepted delivery checkpoints

F15-UH01 COMPLETE,2026-10-20: owner explicitly approved the EN/ES/FR content and
reading-review request (“Approved continue”). All6 tasks complete; implementation
b2e240760ac93d3b09acde88935debb4a7e35c0c. Maven258+17/185 frontend, Chromium131+affected6,
security0 findings/policy20/planning23/strict15 PASS. No detailed owner observations
invented. F15 remains in progress; UH02 control flow/tracing now active, T01 done,
T02 in progress. Other5 stories stay deferred. No push/PR yet; first PR follows
both selected lessons. The old preview will be replaced for the next review.
Evidence:harness/evidence/F15-values-types-review.md.

F17 COMPLETE,2026-10-20: full Maven257+17 Java/185 frontend, packaged
health smoke, Chromium125/125, policy20/planning23 and strict15 main specs PASS.
Boot4.1.1 retained; Tomcat11.0.27/Jackson BOM3.1.8 patches under ADR011. Fresh
actual scan covers45 main sources and POM70/JAR60/npm166+5 packages:0 findings,
0 blockers,0 active exceptions. Original F16 approval JSON preserved byte-for-byte
in security/history/ with unchanged expiry; no fingerprint or approval renewed.
Docs now distinguish accepted V1 history from selected V2. All4 tasks/story/feature complete; implementation commit e38cb17b48348d749b428b0d066dc893cf073d87.
Evidence:harness/evidence/F17-security-maintenance.md. Next:F15-UH01.
Branch:planning/v2-delivery-sequence, based on merged main790b578. No push/PR yet;
first push/PR follows the two lessons. No UI/lesson changes or new owner acceptance.

Selected V2 order (ADR010/plan.json): F17 maintenance → F15-UH01/UH02 → push/PR →
F18 prompts/owner concepts/agreed design implementation page by page → F08–F11 →
F19 final Firefox/WebKit/separate Safari → F20 Docker Desktop/second-PC handoff.
F15-UH03–UH07 remain deferred. V1 acceptance and baseline estimates are preserved.

## Historical handoffs — superseded status statements below

The notes below record earlier checkpoints. Pending commits, archives, previews,
pushes and the blanket V2 freeze are historical, not current instructions.

F16 OpenSpec synced and archived,2026-10-20: owner explicitly requested archive
and selected Sync now. Archive: openspec/changes/archive/2026-10-20-f16-mvp-website-polish-and-acceptance/.
Added1 requirement/3 scenarios to learning-navigation, preserving all existing
content/title/Purpose; created local-release-handoff(2/2) and mvp-acceptance(2/3)
with delta Purpose/bodies verbatim. All3 fully synced; strict15 main specs PASS
before move; all4 artifacts/10 tasks complete. All7 file hashes incl.openspec.yaml
unchanged by move. F16/epic acceptance, canonical ownership/status/effort unchanged.
Archive bookkeeping remains local/uncommitted; no runtime/browser/security rerun,
commit/push/deployment. Evidence: harness/evidence/F16-openspec-archive.md.

F16 COMPLETE,2026-10-20: implementation3bfc8c59c0bf5e9f9ca01901b9847b7f8d60c608;
runbook/handoff tested from clean checkout a6ed966ec2a03548bca8100b5054b0f0c93de127.
Both stories/all11 canonical tasks/OpenSpec10of10 complete; all retained V1
features and EPIC-MVP locally accepted. Five V2 features remain frozen, not done.
Catalogue-aware Learn promotion/shared navigation and EN/ES/FR links integrated;
no redesign. Maven257+17 Java/185 frontend and Chromium125 PASS; explicit owner
review, bounded F16 security scope and scoped local commits approved. Actual gate
PASS after final docs/fixtures, all45 source files,16 visible approved observations
plus4 medium,0 blockers. Boot4.1.1/expiry2026-11-01 unchanged. Planning22/strict14
items/whitespace PASS; negative fixtures explicitly open copied V1 states.
Clean checkout freshly built without copied target/node_modules; temporary Maven
cache link removed. Whole JAR identical SHA256 d5a13164…42db and approved scope
86448545…9250. Runbook health,24 localised page/6 safe-error/3 packaged-asset
responses PASS from separate normal-profile run directory; all servers stopped.
Local runbook docs/delivery/local-release.md; evidence harness/evidence/F16-integrated-acceptance.md.
Actual effort unreported. No push, remote CI claim, public release/deployment or
OpenSpec sync/archive/ownership migration. Change ready for separate authorised
archive workflow. Earlier pending candidate notes below are historical.

F16 candidate verified, 2026-10-20: apply implemented catalogue-aware Learn
promotion, shared Home/Tools/Learn descriptors and locale-preserving native links,
including tool/error recovery. Empty/draft/synthetic boundaries retained. Maven
257+17 Java/185 frontend and Chromium125/125 PASS; planning22/security-policy18
PASS. OpenSpec4/10 (1.1,1.2,1.3,2.1). Actual scan fresh DBs/all45 production sources,
same8 bounded CVEs+2 medium; old F14 fingerprint correctly rejected changed scope.
Proposed F16 fingerprint86448545…9250, same expiry2026-11-01; policy unchanged.
Owner review/security-scope/local-commit questions pending. Local-profile preview
RUNNING http://127.0.0.1:34365, PID76706, exec session50621; stop after review.
F16/UH01 in progress, T01/T02 done; UH02 depends on accepted UH01/real revision.
No owner acceptance, security renewal, commit/push/release/sync/archive. Effort
unreported. Evidence: harness/evidence/F16-integrated-acceptance.md.

F16 proposal ready, 2026-10-20: explicit /opsx-propose F16 produced
f16-mvp-website-polish-and-acceptance with proposal, design, three capability
deltas and 10 unchecked slices covering all 11 canonical tasks/four R/four AC IDs.
Catalogue-aware Learn promotion, shared explicit-language links, retained Chromium/
owner/privacy/security acceptance and clean-checkout local JAR handoff proposed.
Strict change and all-spec validation PASS (14 items); planning integrity and
22 rule tests PASS; ID/whitespace checks PASS. F16 remains planned, 20h baseline/
8h forecast; owner effort unreported. No runtime/build/browser/security/manual
acceptance, policy renewal, commit/push, sync/archive or ownership migration.
Eight bounded security decisions require final V1 reassessment; expiry unchanged.
Local-profile filesystem preview is separate from packaged-JAR evidence. Next:
review proposal and begin apply only after a new explicit user request.
Evidence: harness/evidence/F16-openspec-proposal.md.

F14 OpenSpec synced and archived, 2026-10-20, at the owner's request and selected
Sync now. Archive: openspec/changes/archive/2026-10-20-f14-first-complete-learning-unit/.
Added two requirements/four scenarios to each existing learning-navigation and
localised-learning-content main spec; existing titles/Purpose/requirements retained.
Both delta bodies verified exactly; strict 13-spec validation PASS before move.
All four artifacts/eight tasks complete; all six archived file hashes unchanged,
including .openspec.yaml. Canonical status/behaviour ownership unchanged. No runtime,
browser or security rerun, commit/push/release or F16 implementation. Separate
archive/closure edits preserved. Evidence: harness/evidence/F14-openspec-archive.md.

F14 COMPLETE,2026-10-19: implementation7ccc77338b7f88c2ae546822e1198ed6542a8d38
contains43 scoped files; F07/F12/F13 archival/main-spec/task/evidence edits excluded
and handoff staged selectively. Both stories/all11 tasks,OpenSpec8/8 done. One
EN/ES/FR source-to-jvm unit, honest overview, same-page answer; baseline-JDK example
and locale parity verified. Maven254+17 Java/185 frontend,Chromium125/125, owner
review,18 policy tests and actual security gate PASS reused unchanged. Staged
runtime/security/browser hashes match passing scan. Boot4.1.1 retained;8 visible
exact CVE decisions expire2026-11-01, final V1 reassessment required. Chromium-only;
Firefox/WebKit optional post-MVP. Home/shared Learn promotion off; nextF16 not
started. Preview stopped; effort unreported. No push/remote CI/merge/release/spec
sync/archive. Evidence F14-integrated-acceptance.md; earlier pending notes historical.

F14 sign-off,2026-10-19: owner explicitly approved all3 requested items: EN/ES/FR
content/page checklist, same8 bounded F14 decisions until2026-11-01, scoped local
commits after passing gate(no push,archives excluded). No detailed manual notes
supplied/invented. PreviewPID140430 verified and stopped(SIGTERM/exit143).
Fingerprint f0114f9e…c1550a matched proposed scope; policy reference/fingerprint
updated only.18 policy tests and actual gate PASS,44 source files,16 approved
observations+4 medium,0 blockers;target/f14-approved-security.log. Reuse unchanged
Maven254+17/185 frontend and Chromium125 results. OpenSpec7/8; closure in_review
pending actual local implementation hash/bookkeeping. Existing archival edits
preserved. Boot4.1.1 and expiry unchanged; Home/shared Learn promotion remains off.

F14 implementation candidate,2026-10-19: owner approved brief; metadata/overview,
EN/ES/FR real source-to-jvm lesson/diagram/exercise/answer and one-unit catalogue
implemented. BaselineJDK25.0.4.1 verifies example/stale-class/recompile/failure
caveat; all locale Java/shell blocks identical. Maven254+17 Java/185 frontend and
Chromium125/125 PASS; logs target/f14-verified-candidate.log,f14-chromium.log.
Explicit empty/draft/fixture tests retained; copied-JAR unique entries/digest pass.
OpenSpec5/8. Preview RUNNING http://127.0.0.1:35291/learn?lang=en,PID140430,
shell sh_152fae786001sMqLyX6OEFpN5I; stop after owner review. Real content/keyboard/
translation/narrow/actual200%-zoom review pending. Security18 tests PASS; scan same8
high/critical CVEs(no new findings),44 sources; gate correctly rejects old scope.
Proposed same8 exact decisions/expiry2026-11-01 for new f0114f9e…c1550a fingerprint,
await explicit approval; policy unchanged. Evidence F14-integrated-acceptance.md.
Boot4.1.1/Chromium-only unchanged; no F16 promotion, commit/push or archival edits.

F14 proposal ready,2026-10-19: f14-first-complete-learning-unit contains proposal,
two learning-capability deltas,design and8 unchecked implementation tasks. Short
source-to-JVM brief, two overview metadata fields, same-page answer/text diagram
and real-unit/copied-fixture test transition planned;18h baseline/10h forecast,
all11 canonical IDs preserved. Strict change validation/requirement-ID checks and
whitespace PASS. Planning only: no code/content implementation, canonical status
advance, security renewal, commit/push or main-spec sync. F14 remains planned;
start apply only after a new user request. Chromium only; F16 promotion/V2 frozen
scope unchanged. F07/F12/F13 archival edits remain separate and preserved.

F13 OpenSpec synced and archived,2026-10-19, at owner's request and selected
Sync now. Archive: openspec/changes/archive/2026-10-19-f13-learning-pages-and-navigation/.
Created main learning-navigation(4 requirements/8 scenarios) and localised-learning-
content(3/6), preserving delta Purpose/bodies exactly. Updated only F04-UH02-R01
in secure-http-responses; existing title/Purpose/other requirement unchanged.
All3 capabilities verified fully synced; strict13-spec validation PASS before
move. All4 artifacts/6 tasks complete;7 files including .openspec.yaml unchanged
by move. F13 remains accepted at0742b43/a64b7d2; canonical ownership/status unchanged.
No new runtime/test/scan claim, commit/push or F14 implementation. F07/F12 archival
edits preserved; this archive bookkeeping also remains local/uncommitted. Evidence
harness/evidence/F13-openspec-archive.md.

F13 COMPLETE,2026-10-19: local implementation0742b43815243f9539eef74fa934cfa2722795ee
contains71 scoped files; separate F07/F12 archival/main-spec/task/evidence edits
excluded, F13 handoff staged selectively. Both stories/all10 tasks and OpenSpec6/6
done with actual commit reference. Maven243+17 Java/185 frontend,Chromium119/119,
owner page approval,18 security tests and gate PASS reused for unchanged inputs;
staged runtime/security/workflow hashes match reviewed scan. Boot4.1.1 unchanged;
8 exact config-bound CVE decisions visible until2026-11-01, final reassessment
required. Chromium-only MVP policy; Firefox/WebKit optional after MVP. Empty
production catalogue/Learn promotion off. Next F14, not started. Owner effort
unreported. No push/remote CI/merge/release/spec sync/archive. Evidence F13-integrated-
acceptance.md; earlier incomplete/refusal handoffs historical and superseded.

F13 local commit authorised,2026-10-19: owner "yes" to coherent local F13 commit
excluding unrelated F07/F12 archival changes, no push. Stage implementation and
reviewed evidence first, then record its actual hash for closure; no invented
commit reference. Existing successful runtime/browser/security evidence reused.

F13 security approval clarified,2026-10-19: owner explicitly "yes" to reassessed
security configuration/same8 dispositions/expiry2026-11-01. Prior refusal superseded.
Current fingerprint matches proposed36d5e839…a333; policy approval date/reference/
fingerprint updated only.18 security tests and actual gate PASS;POM70/JAR60/npm166/
e2e5,44 source files,16 approved observations+4 medium,0 blockers. Log
target/f13-approved-security.log. Reuse unchanged Maven/Chromium119 results and
owner review; preview stopped. OpenSpec5/6;F13/stories/closure tasks in_review,
remaining item authorised coherent LOCAL F13 commit/reference required by planning
rules. No commit authorised/made; do not reuse F07/F12 hash. Exclude unrelated
archive edits, no push/publication. Boot4.1.1/expiry unchanged; production Learn off.

F13 owner review,2026-10-19: owner "approved" directly after the preview checklist
(Learn/course/unit EN/ES/FR,native locale/keyboard,narrow/actual200%-zoom). Record
owner checklist approval only; no detailed observations supplied/invented. Task2.2
and canonical UH01/UH02 T03/T04 complete;OpenSpec4/6. Preview PID92157 verified and
sent SIGTERM; no longer needed. No suite/scanner rerun. Prior security refusal is
NOT reversed: policy unchanged,task3.1/3.2 and feature/story closure remain blocked.
Do not repeat unchanged security approval request. No commit/push/promotion.

F13 continuation,2026-10-19: Chromium-only CI alignment implemented by removing
only automatic Firefox/WebKit steps; exact baseline comparison PASS, optional
projects retained. Reuse unchanged Maven/Chromium results; no suite/scanner rerun.
Owner review preview RUNNING loopback-only at http://127.0.0.1:36773/learn?lang=en,
PID92157,shell sh_152d16a48001aeFah2NYFyKMDg,log target/f13-owner-review-server.log.
Copied fixture only; normal-JAR digest unchanged;3 readiness GETs PASS. Owner must
review Learn/course/unit EN/ES/FR, keyboard/native locale, narrow/actual200%-zoom;
no observation invented. Stop preview after review. OpenSpec3/6,task2.2 still
unchecked. Declined security approval remains unchanged/blocking; no repeat ask,
gate bypass, commit/push or production promotion. Evidence F13-integrated-acceptance.md.

Owner project-wide browser policy,2026-10-19 (ADR009): Chromium is the only required
browser for ALL remaining MVP work(F13/F14/F16), PR verification and final MVP
acceptance. Firefox/WebKit are optional evaluation AFTER the MVP, not pending
project-end gates. Preserve test definitions/results/known issues; do not run,
repair or install dependencies for optional engines. This supersedes earlier
final-project deferral instructions. Other Java/frontend/privacy/security/manual
gates unchanged; declined F13 security approval still blocks acceptance. Quality/
architecture/remaining canonical plan and F13 proposal/design/tasks updated.
CI alignment is queued in F13 task2.2: existing automatic Firefox/WebKit workflow
steps still need removal during apply; no implementation/CI change made in this
planning update. No tests rerun or tasks marked complete due to the policy alone.

Owner decision,2026-10-19: declined the proposed F13 security fingerprint update.
Keep security/applicability.json unchanged; no replacement approval, waiver,
dependency upgrade or gate bypass is authorised. F13 security/final acceptance
remain blocked; the pending proposal below is now declined, not awaiting a retry.
Do not request the same approval again without a changed proposal or owner prompt.
Manual new-page review remains outstanding; Firefox/WebKit stay deferred to final
project verification. No runtime or scanner change made for this decision.

F13 security reassessment,2026-10-19: continuing under owner's Chromium-only interim
schedule; Firefox/WebKit pending final project verification, not an interim gate
or waiver. No browser rerun. Pinned scanners installed locally;18 policy tests PASS.
Actual scan POM70/JAR60/npm166/e2e5;Semgrep44/44,no findings;secrets none;CommonMark
0.30.1 explicitly inventoried with0 advisory matches. Same8 high/critical CVEs as16
POM/JAR observations,2 medium CVEs as4. Fresh databases. Gate correctly exit1/
incomplete invalid-applicability-scope: F12 approval does not cover changed F13.
All8 CNA prerequisites reviewed against learning/headers/current sources; proposed
same exact decisions until2026-11-01, new candidate fingerprint recorded in
F13-integrated-acceptance.md#proposed-bounded-f13-approval. Approval pending; policy
unchanged. OpenSpec3/6; next owner bounded-security approval, then gate rerun;
new-page narrow/actual200%-zoom manual review and closure pending. No Boot upgrade/
fingerprint renewal/commit/push. Earlier WebKit-only interim blocker superseded.

Owner verification scheduling decision,2026-10-19: run Chromium only for upcoming
interim tasks. Defer Firefox and WebKit execution to final project verification;
keep those checks pending, not waived or marked complete. Retain existing passing
Firefox evidence. Do not repeat local WebKit installation attempts or install
system dependencies under this scheduling instruction. This supersedes earlier
handoff instructions to resolve WebKit before continuing interim work; it does
not establish final acceptance or waive manual review/security requirements.

F13 container correction,2026-10-19: owner approved; narrow Tomcat engine valve
reuses existing header policy for already-rejected/unmapped URI requests. Slash
rejection/Boot4.1.1 unchanged. Maven verify PASS(243+17 Java,185 frontend);
Chromium119/119 and Firefox73/73 PASS, original malformed-path tests retained.
Logs target/f13-container-{verify,chromium,firefox}.log. WebKit install attempted:
3 API cases pass,70 cannot launch due to known missing libicu74/libxml2/libflite1;
target/f13-container-webkit.log. No system install or coverage waiver. OpenSpec3/6
(1.1,1.2,2.1), UH01-T02 done; browser task2.2 blocked pending supported-runner
WebKit and owner new-page narrow/actual200%-zoom review. Security reassessment/
fingerprint approval and closure pending. No commit/push/remote CI or production
Learn promotion. Evidence F13-integrated-acceptance.md; earlier failures superseded.

F13 tooling continuation,2026-10-19: authorised fixes applied; explicit HTML Accept
and narrowly excluded executable learning Markdown fixtures from document checks.
22 planning-rule tests/integrity PASS. Existing --install restored project-local
Chromium without sudo. Browser116/119 PASS, including all6 EN/ES/FR learning
JS/no-JS journeys and110 retained regressions.3 malformed-path cases FAIL because
Tomcat's encoded-slash400 bypasses application filters and lacks no-store; trace
confirms ordinary404/double-encoded-dot400 retain headers. Keep assertion and
encoded-slash denial. Pause before runtime container-boundary correction, which
is beyond approved tooling/test fixes. Log target/f13-chromium-restored-browser.log;
evidence F13-integrated-acceptance.md. OpenSpec2/6; Firefox/WebKit, owner new-page
review and security reassessment pending. No Boot change/fingerprint renewal/
commit/push. Prior missing-browser/HTML-header/planning-fixture pauses superseded.

F13 SSR/renderer continuation,2026-10-19: URL allowlist fix approved and passes;
three SSR pages, EN/ES/FR labels, exact preference returns/routes/log categories
implemented. Clean verify PASS:243 Surefire+17 Failsafe,185 frontend tests;
target/f13-clean-verify.log. OpenSpec2/6 (1.1,2.1), UH02-T02 done, UH01-T02 still
in progress. Copied-JAR learning resources and three-engine suite added. Chromium
runner FAIL:116/119 cases cannot launch after clean removed browser cache;3 API
cases request default JSON but assert HTML (missing Accept header). No browser
pass claimed. Proposed existing --install plus explicit HTML Accept test fix;
pause before correction under apply rule. Firefox/WebKit/manual new-page review/
security reassessment pending. Boot4.1.1 unchanged; no fingerprint renewal,
commit/push or archival changes. Evidence F13-integrated-acceptance.md supersedes
earlier pauses. Existing F07/F12 archives preserved. Planning integrity also flags
nine deliberately unsafe Markdown fixture links as broken documentation links;
needs narrow fixture/document distinction, not removal of hostile test cases.
21 planning-rule tests, strict F13 validation and whitespace PASS; views regenerated.

F13 renderer safety pause,2026-10-18: owner approves simplest catalogue→renderer→
SSR ordering; prerequisite/checklist/design updated, IDs/effort unchanged. Added
CommonMark0.30.1 and renderer core with HTML escaping, URL sanitisation and AST
image rejection. Focused Maven26 cases:25 pass/1 fail, default sanitizer retains
data:text/html link. Log target/f13-renderer-tests.log. Installed library exposes
DefaultUrlSanitizer(Collection); propose explicit http/https/mailto schemes, no new
dependency/custom sanitizer, retain failing assertion. Pause before correction per
apply rule. OpenSpec1/6, F13/UH02/T02 blocked, SSR/browser/manual not run; Boot4.1.1
unchanged, security fingerprint not refreshed. Existing archives intact; no commit/
push. Evidence F13-integrated-acceptance.md. Earlier sequencing-only pause resolved.

F13 apply started/sequencing pause,2026-10-18: OpenSpec1/6 complete. Immutable
catalogue/query/content-source port and UTF-8 classpath loader delivered; normal
published list empty, no Learn promotion.11 focused Java tests pass (Maven test,
not full verify),21 planning rules/integrity/whitespace pass; views regenerated.
UH02/T01 prerequisite refined as planned to UH01-T02, but inspection confirms
that whole SSR task still gates the safe renderer required by final SSR. Pause
before SSR for approval to render after the verified catalogue and before finishing
SSR; no temporary renderer or premature task completion. UH01-T01 done,T02 in
progress; no story/feature acceptance. Boot4.1.1 unchanged, no security-fingerprint
refresh, commit/push or archive changes. Evidence F13-integrated-acceptance.md;
test log target/f13-catalogue-tests.log. Existing F07/F12 archives preserved.

F12 OpenSpec synced and archived,2026-10-18, at owner's request and selected
Sync now. Archive: openspec/changes/archive/2026-10-18-f12-mvp-navigation-and-local-runtime/.
New main supply-chain-verification spec preserves delta Purpose and3 requirements/
5 scenarios; exact canonical comparison and strict11-spec validation pass before
move. All4 artifacts/5 tasks complete; metadata preserved; no active changes.
Task-record path updated; canonical behaviour ownership/status unchanged. F12
remains accepted at71aeefc/cfd8d14, Boot4.1.1 unchanged, bounded decisions still
expire2026-11-01 and invalidate on config changes. No new runtime/test/scan claim,
commit/push/release; F07 archival edits intact. Archive bookkeeping local/uncommitted.
Evidence harness/evidence/F12-openspec-archive.md. Next F13 not started here.

F12 COMPLETE,2026-10-18: owner continued after the sole remaining coherent-commit
item; local implementation71aeefc contains verified scanner/CI/policy/test/runbook
and evidence.18 security+21 planning tests, actual gate and strict OpenSpec pass;
committed executable/policy/lock/workflow hashes match the passing report. Both
stories/all10 canonical tasks and OpenSpec5/5 done; final renderers, planning
integrity,21 rule tests,strict OpenSpec/whitespace pass; apply state all_done.
Boot4.1.1/runtime unchanged;8 CVEs remain visible under exact config-bound owner
decisions until2026-11-01,16 annotated observations,0 remaining blockers;2 medium
CVEs visible. Reassess on server/config changes and final V1 acceptance. Actual
effort unreported. Next F13 not started. No push/remote CI/merge/release/sync/archive
claimed; separate F07 archival edits preserved and excluded from F12 commits.
Earlier pending/blocked F12 handoffs below historical. Final closure documentation
follows the implementation commit; no new runtime or test changes.

F12 bounded policy verified,2026-10-18: owner "then can you continue?" follows
the explicit eight-finding proposal; implement that scope, expiry2026-11-01 UTC,
with exact CVE/package/version and source+packaged-server fingerprint. Boot4.1.1
unchanged.18 policy tests pass; actual full gate exit0/pass with all8 CVEs retained
as16 annotated observations,0 remaining blockers and2 medium CVEs also visible.
POM69/JAR59/npm166/e2e5;Semgrep35/35,no findings;secret scan none;DBs fresh.
No runtime/build/browser/manual rerun. UH01 done against accepted770aa98;
UH02/T04 done, UH02/T05+F12 in review pending a real coherent security commit;
OpenSpec remains4/5 (3.2 pending), not falsely done using the F07 hash for new code.
No further review task or version upgrade invented. No commit/push/release/sync/
archive. Earlier blocked/pending-approval notes below superseded; evidence and
redacted report record the exact policy/result. Existing F07 archival work intact.

F12 version retained/triage complete,2026-10-18: owner keeps Boot4.1.1 through app
completion unless genuinely blocked. No dependency edits. Advisory/source review
and actual scan task3.1 complete; OpenSpec4/5, not feature acceptance. Prepared
eight exact finding/version-specific applicability proposals in integrated
evidence, expiry proposed2026-11-01 with configuration-change invalidation.
Approval pending; keeping the version is not interpreted as risk acceptance.
Gate still blocks all8, F12/UH02/T04 remain open/blocked;3.2 pending. No new
build/browser/manual/scan run, exception, commit/push/release or F07 archive edits.

F12 managed-upgrade investigation,2026-10-18: owner authorised recommended
advisory-led stable Boot patch approach. CNA records confirm8 blocking affected
versions; Tomcat fixes11.0.25, Jackson remaining3.1 fixes newer than3.1.6. Maven
Central latest stable4.1 is4.1.1;4.1.2 BOM404.4.0.8 manages same11.0.24/3.1.5,
so downgrade not a fix;4.2 milestones not selected. Source-level prerequisites
not configured (no container FORM/DIGEST/constraints or untrusted typed-Jackson
input/polymorphism/identity bindings); this is not an approved exception. No POM,
dependency override, code/build/scan change. Evidence F12-integrated-acceptance.md
contains authoritative sources/applicability table. F12 still blocked,3/5 tasks;
await suitable stable managed release or explicit temporary-disposition decision.
No new publication/commit/push or F07 archive changes.

F12 inventory corrected/security findings pause,2026-10-18:3/5 OpenSpec tasks done
(1.1,2.1,2.2). Authorised diagnosis confirms Trivy filesystem skips JARs; added
local rootfs JAR scan without fs-only dev flag, retaining both Java requirements.
13 policy tests pass. Actual candidate completes all scans: POM69 unique package
names,JAR59,npm166/e2e5;Semgrep35/35 source files,no findings/errors;secret scan
none;both DBs fresh. Gate correctly exits1/blocked on8 unique reported CVEs:
Tomcat11.0.24 three critical;Jackson3.1.5 five high,each observed in POM+JAR.
Two medium CVEs also retained. No exploitability/exception/fixed-version claim,
dependency change or application-test rerun. Pause under apply blocker rule for
advisory triage/remediation guidance; F12/UH02/T04 blocked,3.1/3.2 open. Earlier
inventory-only blocker superseded. Evidence F12-integrated-acceptance.md;report
target/security/summary.json. No commit/push/release; F07 archive work preserved.

F12 security apply paused,2026-10-18:2/5 OpenSpec tasks complete (1.1,2.2).
Owner-approved Python hashlib correction succeeds. Pinned project-local
Trivy0.76.0/Semgrep1.181.0/uv0.13.1 installed; hashed Python lock/rules, fixed
fail-closed command,10 passing policy tests and existing-Java-CI integration/runbook
delivered. Actual synthetic secret+Java/TS findings/redaction and invalid-config
failure propagation pass. Candidate gate exits1/incomplete-java-inventory on dirty
3635912; npm checks reached, Java/JAR inventory and later application-source scans
not established. No clean scan, remote CI or new application-test claim. UH02/T04
blocked;2.1/3.1/3.2 unchecked. Inspect returned Java inventory before correction;
pause under apply error rule, no weakened assertion. Evidence F12-integrated-
acceptance.md; redacted result target/security/summary.json. Prior checksum-only
pause below superseded; F07 archive preserved, no commit/push/sync/archive/release.

F12 apply paused,2026-10-18: change f12-mvp-navigation-and-local-runtime,1/5 tasks
complete. Task1.1 aligns canonical unknown-tool R02/AC02 with accepted safe403;
runtime/CSP/allowlist unchanged, existing error evidence reused. Both renderers,
planning integrity,21 rule tests and whitespace passed before task completion.
Task2.1 read-only rule-metadata helper failed because Code Mode lacks
crypto.subtle.digest; owner error rule requires pause. Proposed Python hashlib
correction awaits guidance. No scanner installation/security implementation/CI
edits or new application tests. Existing F07 archive and prior planning changes
preserved. F12/stories open; UH01-T04 done,remaining security/closure uncompleted.
Evidence: harness/evidence/F12-integrated-acceptance.md. No commit/push/release.

F12 planning simplified,2026-10-18, at the owner's request: credit accepted F06/F07
catalogue/locale/keyboard and existing documented loopback JAR smoke evidence;
six task records done by inspection/evidence reuse, not new application test runs.
Stable IDs and14h baseline retained; forecast4h→2h. No repeat build, browser/manual
review, runtime launcher or separate management server. Only UH01-T04 (404/403
requirement conflict) and UH02-T04 (missing security blocking-gate evidence) remain,
plus two tracking entries served by one combined closure record. UH02 depends on
F07 directly. F12/stories remain open; next task UH01-T04. No runtime/OpenSpec edits,
commit/push or release; existing F07 archival changes preserved. See
harness/evidence/F12-simplification.md for inherited evidence and validation results.
Earlier statements that every F12 task is unstarted are historical.

F07 OpenSpec synchronised and archived,2026-10-18, at the owner's explicit request
and selected "Sync now" option. Archive:
openspec/changes/archive/2026-10-18-f07-json-validator-and-minifier/.
New main json-validator(4 requirements)/json-minifier(5) specs preserve delta Purpose
and scenarios; Formatter catalogue requirement updated with prior content intact.
All artefacts and14/14 tasks complete; exact post-sync comparisons and strict10-spec
validation pass before moving. Canonical plan behaviour ownership unchanged (ADR004);
no code/runtime change or new test claim. F07 remains done with3 documented WebKit
TODOs; F12 next,unstarted. Archive changes local/uncommitted; no archive commit/push,
merge or release inferred. See harness/evidence/F07-openspec-archive.md.
Earlier no-sync/no-archive statements below historical and superseded.

F07 COMPLETE,2026-10-18: Validator+Minifier accepted, final three-tool catalogue at
770aa98. Ubuntu Java39117056490/browser39117056486 SUCCESS: clean Maven185 frontend,
207 Java(three existing architecture skips),17 packaged; Chromium110,Firefox64,
WebKit61 passed/3 documented Validator reload TODOs (BTC-F07-WK-01,ADR008). Local
Chromium110 and health pass; both owner reviews accepted, environment/build details
unreported. Checklist14/14 subject to final planning checks; canonical UH02/F07 done.
Actual effort unrecorded. Next MVP action is reduced F12, not started. Keep V2 frozen.
No merge/release/spec-sync/archive; PR7 remains draft pending owner delivery choice.
Closure records are documentation-only; all runtime/test code verified at770aa98.
Earlier pending/blocked handoff entries below historical.

Final local packaged Chromium110/110 passes at770aa98; no new runtime/test changes.
Includes three Minifier catalogue journeys, locale Copy/Clear/privacy/fidelity and
no-JS/worker retry plus retained regressions. Await existing Ubuntu Java39117056490/
browser39117056486 watchers for final clean/cross-engine evidence. Checklist10/14;
no feature closure inferred from local Chromium alone.

Final F07 publication candidate770aa98 committed/pushed to draftPR7 with explicit
owner permission; both tool reviews accepted, actual environment details unreported.
Java39117056490/browser39117056486 confirmed running at exact head; watchers active.
Final local Maven185/207(three skips)/17 and health pass; Chromium run active.
Checklist10/14; UH02/F07 remain open pending actual final browser/clean-CI evidence.
Three WebKit reload TODOs retained; no new test investigation or V2 work. PR title/
body updated for both tools. No merge/release/spec sync/archive; previous unpushed/
unadvertised/owner-review-pending notes historical. Reviewed preview on8083 is the
accepted pre-catalogue JAR; final source adds only catalogue/link assertions since.

Minifier owner review accepted ("perfect, continue"); browser/version/OS/viewport/
exact build identity unreported, acceptance owner-reported not observed. Added final
three-link Tools catalogue and EN/ES/FR Minifier journeys; V2/Learn absent. Final
normal Maven185/207(three skips)/17 passes; packaged Chromium/health running.
Owner explicitly approves commit/push of Minifier+acceptance records to draftPR7
for final Ubuntu clean-build/three-engine CI. Checklist10/14;2.4/2.6/3.1/3.2 pending.
No UH02/F07 closure until actual final evidence; no merge/release/sync/archive.

Minifier build verification passes:185 frontend tests,207 Java(three existing skips),
17 packaged integration tests and health. Normal Maven verify, not clean. Source
implements token-preserving minify and EN/ES/FR SSR/shared Copy-Clear lifecycle;
catalogue remains Formatter/Validator only. Checklist9/14;UH02 implementation done,
packaged browser and owner acceptance pending. Project-local Chromium download
active; preview launched on8083 from verified JAR (old8082 is Validator build).
Next: actual browser result, verify preview readiness, owner keyboard/narrow/200%
zoom/locales/actual Copy review. No new dependency/CSP/route wildcard or V2 work.

F07 Minifier UH02 implementation started under owner's "continue" instruction.
UH01 accepted at ab2f956; existing closure bookkeeping preserved. Added pure
validated-token minification, explicit json-minify dispatch, shared session/mode,
SSR/EN-ES-FR/exact security-locale-log mappings and focused tests. Catalogue still
excludes Minifier until review. Checklist7/14; UH02-T01 done,implementation active.
First Maven run compiled old HomeSecurity route negatives during an edit and
failed2 stale assertions; corrected assertions already in source, rerun active.
Project-local pinned Chromium download active (no system libraries). Next: actual
Maven/browser/health results then owner Copy/Clear/keyboard/zoom/locale review.
No new dependency/CSP/runtime-policy change; no speculative WebKit TODO investigation.

Validator UH01 accepted,2026-10-18, at publication commit ab2f956. Actual Ubuntu
Java39115413719/browser39115413739 succeed: Chromium103,Firefox57,WebKit54 passed
plus3 explicit TODO skips (BTC-F07-WK-01,ADR008). Changed catalogue journeys and
separate failure/worker-retry tests pass. Clean Maven166/204(three skips)/17,health
and owner manual review pass; owner additionally confirms Chrome page works.
Checklist6/14; canonical UH01 tasks done, F07 in progress. Next: Minifier UH02 using
accepted shared seams; no further Validator fault-test investigation. Actual effort
unrecorded; no merge/release/spec-sync/archive. Earlier blockers are historical.

Publication candidate ab2f956 pushed to draft PR7. Clean Maven166/204(three skips)/17
and health pass. Local Chromium could not launch because clean target lacks its
browser binary; not an application assertion failure. Use already running Ubuntu
Java39115413719/browser39115413739 at exact ab2f956; watchers active, no redundant
local reinstall. Await actual publication/split-test results before UH01 closure.
Three WebKit-only module-reload TODOs documented as BTC-F07-WK-01; important tests
remain active. No Minifier/merge/release; checklist4/14 until verification arrives.

F07 publication verification in progress: e5c8d7d Ubuntu Java succeeds; browser
build/Chromium/Firefox pass, WebKit45/48. Busy-worker retry fixed by test no-store;
only three injected-module reload cases deferred under owner-approved ADR008.
Split them into WebKit-only fixme/TODO BTC-F07-WK-01; no-JS/failure feedback and
worker-load retry remain active in all engines. Pending register documents risk.
Added accepted Validator Tools link/localized description and three-locale journey
checks; Minifier/V2/Learn unadvertised. Clean build for changed publication state
running; no final verification or UH01 closure claimed yet. Checklist4/14, no
Minifier/merge/release. Earlier running-CI/no-deferral notes are historical.

F07 bounded fixture correction delivered,2026-10-18: e5c8d7d pushed to draftPR7;
Java39114716031/browser39114716064 confirmed running at that exact head,watchers
active. Only two test failure responses made non-cacheable; production code/CSP/
cache/deadlines/assertions unchanged, no test skipped yet. ADR008 and pending-browser
register capture owner's explicit75%-target/bounded-WebKit-debt policy, not measured
coverage or permission to hide important failures. Checklist4/14; awaiting actual
correctedCI, no catalogue promotion/closure/Minifier/merge/release. Local syntax,
planning/rule21/strict OpenSpec9/whitespace pass; no redundant local Maven rerun for
test-only edits. Earlier0ca9f94 WebKit44/48 is historical, not a new-head result.

F07 bounded test follow-up authorised,2026-10-18: owner approves the targeted fixture
correction and permits troublesome WebKit recovery checks as explicit TODO/pending
debt rather than repeated delays;75% code-coverage target, not100%, no measured
coverage claim. ADR008/pending-browser-tests register record this narrow policy;
important engine/privacy/security/correctness checks and runtime behaviour unchanged.
Applied only HTTP503/no-store lazy-failure fixture and no-store substituted busy
worker with original CSP; all reload/retry/deadline/exact-input assertions retained.
No tests deferred yet; deliver this bounded attempt through existing authorised
PR7 path and inspect actualCI. Checklist4/14;owner review accepted, no catalogue
promotion/UH01 closure/Minifier yet. Old0ca9f94 Java/Chrome94/Firefox48 pass,WebKit44/48;
earlier unconditional-WebKit stop wording superseded only as documented in ADR008.

F07 actual WebKit recovery-test pause,2026-10-18: PR7 head0ca9f94 Java39113573326
SUCCESS; browser39113573357 clean Maven/Chromium94/Firefox48 pass,WebKit44/48. Three
EN/ES/FR injected-lazy-abort tests fail readiness after unroute/reload(line187);
bounds/deadline test reaches final retry(line234) but still times out after injected
busy worker. Earlier source equality/depth/expected-timeout assertions reached;
successful retry not proved. Retained F06/foundation and normal Validator privacy/
diagnostic/history cases pass. Suspect immutable-asset injected-fault cache
contamination, not confirmed. Proposed test-only failed lazy response/no-store and
busy-worker response/no-store, keeping CSP,all reload/retry/exact-source assertions
and production cache/deadline policy. Not applied; await functional-error guidance.
Checklist4/14,1.4/UH01 verification/publication/closure blocked; owner review accepted,
Minifier unstarted. Logs /tmp/opencode/f07-validator-ci-browser.log and
f07-validator-ci-browser-failed.log. PR7 remains draft at0ca9f94; local delivery
bookkeeping only, no further push/merge/release/runtime change. Earlier running/
pending-WebKit notes superseded by this actual failure, no gate waiver.

F07 Validator draft delivered,2026-10-18: committed/pushed0ca9f94 on new
feature/F07-json-validator-and-minifier from merged main8de4639, including authorised
MVP replan/proposal prerequisites. Draft PR7 https://github.com/ziuld/beneath-the-code-page/pull/7.
Confirmed Java39113573326/browser39113573357 running at exact head; watchers active.
Await actual required WebKit, not config/running jobs;4/14 tasks complete. Owner
manual acceptance and local Maven166/204(three skips)/17,health,Chromium94/Firefox48
pass. Catalogue Formatter-only; no1.6 publication/UH01 closure/Minifier/merge/release.
Post-delivery evidence/real-commit tracking local; previous no-permission/no-delivery
notes below historical. No runtime changes after committed tested slice.

F07 draft delivery authorised,2026-10-18: owner approved committing/pushing current
Validator slice and existing MVP planning updates to a new F07 draft PR for Ubuntu
WebKit CI. Fetched merged origin/main8de4639; tracked tree equals old locald6455d4.
Created feature/F07-json-validator-and-minifier from merged main, preserving all
local work and old F06 branch. Prepare coherent delivery and inspect actualCI.
Owner manual review already accepted; local Maven166/204(three skips)/17,health,
Chromium94/94 and Firefox48/48 pass. Checklist4/14;1.4 actualWebKit and1.6 publication/
closure pending. No merge/release/sync/archive/Minifier or WebKit waiver. Earlier
delivery-permission blockers below superseded; authorisation is not passing CI.

F07 validator owner review accepted,2026-10-18: in direct response to requested
keyboard/Clear-Back/narrow/actual200%-zoom/EN-ES-FR checks, owner reports all work.
Recorded as owner-reported manual acceptance, not measured/agent-observed results;
browser/version/OS/viewport/build identity unreported.1.5 complete,checklist4/14.
No runtime changes after clean Maven166 frontend/204 Java cases (three skips)/17
packaged,health,Chromium94/94 and Firefox48/48 passes. Required Ubuntu WebKit still
pending1.4; canonical closureT05 blocked on verification/publication/real commit,
not manual review. Need explicit commit/push/new F07 draft-PR authorisation for
CI (including existing MVP planning/proposal prerequisites); review report does
not authorise external delivery. Catalogue Formatter-only,Minifier unstarted;
no merge/release/sync/archive. Evidence F07-UH01-json-validation.md; preview8082
unchanged. Earlier pending-manual notes below superseded; no WebKit waiver.

F07 validator local verification complete/CI-owner gates,2026-10-18: corrected full
document assertion retains exact equality; Chromium94/94 and Firefox48/48 pass all
new Validator and retained F06/foundation cases, including1MiB/depth128 and real
controlled deadline/retry. Clean Maven166 frontend/204 Java cases (three explicit
architecture skips)/17 packaged and health pass; runtime unchanged since that build.
Preview http://127.0.0.1:8082/tools/json-validator?lang=en (es/fr too),actualHTTP200
locale/markup verified; manual observations not inferred. Required Ubuntu WebKit
still pending: fallback host lacks libicu74/libxml2/libflite1. Need explicit commit/
push/new F07 draft-PR authorisation, including current MVP planning/proposal work;
PR6 read-only inspection confirms MERGED. No remote message/delivery performed.
Owner keyboard/narrow/actual200%/EN-ES-FR acceptance also pending.3/14 tasks complete;
1.4 unchecked,canonical F07/UH01/T03 blocked at remaining gates,implementationT02
done. Catalogue Formatter-only; no Minifier,merge/release/sync/archive/system install
or dependency/CSP/assertion relaxation. Evidence F07-UH01-json-validation.md; logs
/tmp/opencode/f07-validator-chromium-fixed.log, f07-validator-firefox.log and
f07-validator-review.log. Prior in-progress/fixture/style notes below historical.

F07 validator local Chromium green,2026-10-18: owner authorised exact full-document
test correction and continuation through UH01. Select All/copy event into local
DataTransfer retains exact source equality; no real clipboard/app/limit/CSP change.
Full Chromium94/94 now passes including1MiB/depth128/deadline/retry and retained F06
regressions. Clean Maven166 frontend/204 Java cases (three skips)/17 packaged and
health pass. Firefox verification running; WebKit installer confirms missing host
libicu74/libxml2/libflite1, no system install. Need authorised new F07 draft-PR/Ubuntu
CI path (read-only check confirms PR6 MERGED, not merged by this apply). No F07
commit/push/PR/publication yet. Local reviewed JAR preview on127.0.0.1:8082; EN/ES/FR
validator GETs return200 with correct locale/markup. Owner keyboard/narrow/actual200%
zoom/locale acceptance unreported, catalogue still Formatter-only. Checklist3/14,
1.4 unchecked;canonical F07/UH01/T03 blocked only on remaining gates,implementation
T02 done. Minifier unstarted. Evidence F07-UH01-json-validation.md; logs
/tmp/opencode/f07-validator-chromium-fixed.log and f07-validator-firefox.log. Existing
MVP replan preserved; earlier style and Chromium fixture pauses are resolved.

F07 validator browser-fixture pause,2026-10-18: routine style corrections explicitly
authorised/applied. Clean Maven166 frontend/204 Java cases (three skips)/17 packaged
and real health pass.1.3 complete,checklist3/14; exact SSR/session/route/locale/log
integration prepared, catalogue Formatter-only and Minifier unstarted. Full Chromium
93/94: all nine new EN/ES/FR validation/privacy/CSP/diagnostics/rejected-edit/Clear/
Back/load-recovery cases and retained F06/foundation regressions pass. Final bounds
case fails exact 1 MiB preservation at .cm-line DOM comparison (virtualised editor);
valid verdict observed, but full document equality and later depth/deadline/retry
assertions unproved. No fix/assertion relaxation. Pause under functional error rule;
1.4 unchecked,canonical F07/UH01/T03 blocked,implementationT02 done. Recommend
test-only Select All/copy event into in-memory DataTransfer using CodeMirror's
state-based copy handler, retaining full exact equality without real clipboard
read/app changes; await guidance. No Firefox/WebKit/manual acceptance yet. Logs
/tmp/opencode/f07-validator-clean-maven.log, f07-validator-health.log and
f07-validator-chromium.log; evidence F07-UH01-json-validation.md. Planning/rule21/
strict OpenSpec/whitespace pass. No commit/push/merge/release/CSP/dependency/system
changes; prior MVP replan preserved. Earlier style pauses below are resolved.

F07 continuation/workspace style pause,2026-10-18: owner approved the original
formatting and isolated planning-fixture fixes.77 focused tests/type/lint/style and
all21 planning tests pass;1.2 complete,checklist2/14. Prepared1.3 shared validation
session/workspace, EN/ES/FR SSR/resources, shared message fragment, exact controller/
security/language-return/log identities and session/MVC tests. Catalogue Formatter
only,Minifier unstarted. Clean Maven log /tmp/opencode/f07-validator-clean-maven.log
passes full TypeScript/ESLint then fails Prettier on one formatter-workspace.ts
feedback-query line wrap. Confirmed read-only formatting diff; no functional fix,
assertion weakening or further correction. Pause under error rule;1.3 unchecked,
canonical F07/UH01/T02 blocked. Unit/Java/package/health/browser gates not reached
in this run; no manual acceptance or new-code WebKit pass. Next approve formatting
correction (optionally routine style-only correction permission), rerun verification.
Evidence F07-UH01-json-validation.md; prior MVP work preserved, no commit/push/merge/
release/sync/archive/system install or new dependency/version/CSP change.

F07 apply paused on formatting, 2026-10-18: explicit apply authorised. Baseline1.1
complete (1/14), accepted F06/current uncommitted MVP replan preserved. Extracted
existing strict validation to algorithms/validation.ts, retained Formatter writer
and added json-validate dispatch/empty acknowledgement plus focused tests/docs.
77 tests across four files,full TypeScript and touched-file ESLint pass. Prettier
reports formatting differences in algorithms/formatter.ts and worker-protocol.test.ts;
paused under owner error rule before correction. Task1.2 unchecked; canonical
F07/UH01/T02 blocked,analysisT01 done. Evidence F07-UH01-json-validation.md and log
/tmp/opencode/f07-validation-focused.log. Proposed next formatting-only correction
and rerun checks, then1.3; await guidance. No page/session/SSR/browser/Maven/manual
acceptance or Minifier yet; no catalogue promotion,dependency/CSP/CI/main-spec change,
commit/push/merge/release/sync/archive. Owner effort unreported.
Post-pause tracking checks: renderers/integrity/strict OpenSpec/whitespace pass;
planning-rule20/21, stale live-data queue test still expects completedF07-UH01-T01
as next. Renderer correctly says no unblocked task withT02 blocked. Recommend
explicit initial-state test fixture, retaining assertions; await guidance, no fix.

F07 proposal ready, 2026-10-18: owner requested planning only. Created spec-driven
change f07-json-validator-and-minifier with proposal/design/tasks and deltas for
new json-validator/json-minifier plus the existing json-formatter publication rule
(formatter-only catalogue must admit accepted F07 pages). Reuse current strict
parser/editor/worker/session; no new dependency, generic framework or CSP change.
Design separates validation from pretty-output expansion, keeps one worker and
empty validation acknowledgement, text-only output/history clearing and exact
route/locale/log identities. All four artefact types ready; checklist0/14. Strict
change validation,planning integrity,21 rule tests and whitespace pass; stable F07
IDs/10h forecast/statuses unchanged. Evidence harness/evidence/F07-openspec-proposal.md.
No application/main-spec/CI edits, build/browser/manual acceptance, apply, sync,
archive,commit/push/merge/release. Prior uncommitted MVP replan preserved. Next review
artefacts; await a new explicit request to apply. F07 implementation remains unstarted.

Focused MVP replanned, 2026-10-18: owner authorised the reduced scope in ADR 007.
F00–F06 remain accepted; F06 archived and its runtime evidence unchanged. V1 keeps
F06/F07 JSON tools, full retained website journeys and one complete EN/ES/FR
source-to-JVM unit. F08–F11/F15 frozen V2; Docker/Compose and broad redesign deferred.
Remaining order F07 → reduced F12 (JSON catalogue/existing JAR) → F13 (learning
structure with synthetic fixtures) → F14 (real reviewed unit) → F16 (enable Learn,
shared-page polish/retained acceptance). F13 depends on F07, F16 on F12/F14; no V1
dependency/milestone includes V2. Forecast42h +8.4h contingency, provisional, not
measured velocity or committed dates; baseline298h and all IDs/statuses preserved.
Both renderers, planning integrity,21 rule tests,strict OpenSpec8/8 and whitespace
pass. Evidence harness/evidence/MVP-replan.md. Planning/tooling only, no runtime,
application tests,CI or OpenSpec edits; no commit/push/merge/release. Next eligible
F07-UH01-T01 remains unstarted; this request does not start F07 implementation.
Earlier all-tools/full-course/bootstrap instructions are historical and superseded.

F06 archived,2026-10-18: all22/22 tasks complete; spec synced and verified at
openspec/specs/json-formatter/spec.md. Change archived to
openspec/changes/archive/2026-10-18-f06-json-formatter/ including .openspec.yaml.
Canonical F06 done/all stories accepted; Home Tools enabled on testeded0e502,
Ubuntu Java39074613656/browser39074613616 pass,Chromium84/Firefox38/WebKit38.
Clean Maven140 frontend/199 Java (three skips)/17 packaged and local health pass.
Planning integrity,15 rule tests,strict change/main-spec checks and whitespace pass
before archive and again after archive; OpenSpec lists no active changes. No runtime changes after tested head,
manual environment omissions explicit, no merge/release. Closure/spec/archive
bookkeeping prepared for coherent delivery on existing draft PR #6 path. Required
runtime CI evidence remains tied to ed0e502, not inferred from documentation edits.
Next feature F07 is not started; proceed only on owner request.

F06 accepted/complete,2026-10-18: tested final publication ed0e502 passes Ubuntu
Java39074613656/browser39074613616,Chromium84/Firefox38/WebKit38;clean Maven140
frontend/199 Java (three skips)/17 packaged,local health pass. All three stories/
all15 canonical tasks and all22 OpenSpec tasks done; owner Chrome manual acceptance
recorded without invented version/OS/viewport. Home Tools enabled, Learn unpublished.
Owner chose Sync then archive: new main json-formatter spec matches exact Purpose/
seven requirements/scenarios; strict main-spec8/8 pass. Final closure checks and
archive in progress; no merge/release. Runtime remains testeded0e502 on draft PR #6.

F06 final publication delivered,2026-10-18: ed0e502 pushed to draft PR #6;
Java39074613656/browser39074613616 running. Local Chromium84/Firefox38,clean Maven/
health and planning/rule/OpenSpec/whitespace checks pass;21/22. Owner selected
Sync then archive after final CI: new json-formatter main spec (ADDED only), verify
and archive. Specs instructions snapshot fetched successfully; no extra rules.
Do not refetch for inline sync. Required final WebKit before4.3/F06 closure; manual
Chrome confirmation recorded with version/OS/viewport unreported. No merge/release.

F06 owner final review accepted/publication local,2026-10-18: owner confirmed all
requested Chrome keyboard/narrow/actual200% zoom/EN-ES-FR/Copy-Clear checks passed
and asked to close/archive. Chrome version/OS/viewport not reported; no invented
environment or agent-observed visual measurements. Evidence F06-integrated-acceptance.
4.2 done,21/22. Enabled Home Tools, Learn remains unpublished; real three-locale
journey added. Local clean Maven140 frontend/199 Java (three skips)/17 packaged,
Chromium84/Firefox38/health pass; updated Ubuntu WebKit and4.3 still pending.
Prepare final publication slice on draft PR #6, no merge/release. Archive requires
completion and explicit spec-sync choice; no sync/archive performed yet.

F06 UH03 accepted, 2026-10-18: owner explicitly accepted Copy/Clear after actual
05a688a three-engine CI. All three stories/all15 canonical tasks now done with
evidence; task3.6 closed,20/22. F06 itself remains in progress: actual final owner
keyboard/visual/200% zoom/EN-ES-FR review4.2 and integrated publication/closure4.3
pending. No manual observation inferred; Home promotion off, no merge/release.
Runtime still tested05a688a on draft PR #6; acceptance/evidence updates local.
Next obtain actual final review observations/environment, then complete authorised
Home publication plus journey verification; merge/release remain separate.

F06 Copy/Clear required CI green, 2026-10-17: 05a688a Java39072823450 and browser
39072823403 succeed;Chromium81/81,Firefox35/35,WebKit35/35. Clean Maven140 frontend/
199 Java (three skips)/17 packaged plus local health pass. Completed3.5/T04 and4.1;
19/22. UH03 owner acceptance3.6 and actual final visual/200% zoom/EN-ES-FR review4.2
remain pending before integrated Home publication/closure4.3. No runtime changes,
Home promotion, merge/release or fabricated manual observations. Evidence/tracking
updates local; draft PR #6 remains at tested05a688a. Prior CI-pending notes superseded.

F06 Copy/Clear delivered, 2026-10-17: committed/pushed05a688a to draft PR #6 and
updated PR scope/results. Java39072823450/browser39072823403 running at this head;
required updated WebKit pending. Local clean Maven140 frontend/199 Java cases
(three skips)/17 packaged,Chromium81/Firefox35/health and planning checks pass.
Checklist17/22; task3.5, UH03 acceptance and final integrated/manual gates remain.
No runtime changes after commit. Delivery-result bookkeeping local; no Home
promotion, feature merge/release or invented acceptance.

F06 UH02 accepted/Copy-Clear locally verified, 2026-10-17: owner accepted UH02
after f4e9b47 required CI; story/all five tasks done. UH03 adds explicit exact Copy
with revision/attempt-guarded translated clipboard feedback, no reads; Clear cancels
first, discards input/history/result/diagnostics and retains focus/clipboard unchanged.
Clean Maven140 frontend/199 Java cases (three skips)/17 packaged pass. Chromium81/81,
Firefox35/35 pass including clipboard/undo/all-action sentinel privacy/CSP regressions.
Checklist17/22 through3.4;3.5 awaits updated required Ubuntu WebKit, not old UH02 CI.
Prepare scoped commit/push on existing draft PR #6 path; no UH03/final manual acceptance,
Home promotion, merge/release or budget/security waiver. Evidence F06-UH03 recorded;
owner effort unreported. Earlier Copy/Clear-unstarted/UH02-acceptance-pending notes
below are historical and superseded.

F06 UH02 required CI green, 2026-10-17: f4e9b47 Java39071829961 and browser
39071830007 succeed. Actual Ubuntu results Chromium78/78,Firefox32/32,WebKit32/32;
clean Maven succeeds. Output-region fix resolves Back-navigation clearing with exact
assertions/privacy/CSP/budgets retained. Reclosed2.3/completed2.5 and canonical T02–T04;
checklist12/22. UH02 owner acceptance/task2.6 pending before dependent Copy/Clear.
No Home promotion, final manual acceptance, F06 merge/release. Result bookkeeping
local; draft PR #6 remains at tested f4e9b47. Earlier blockers below superseded.

F06 output-region fix authorised/locally verified, 2026-10-17: owner approved
replacing textarea with labelled selectable text-only output and continuation.
Implemented focusable pre region, textContent-only writes/clearing, bounded scrolling;
exact whitespace/inert HTML/history-clearing/accessibility checks retained. Local
Maven129 frontend/199 Java (three skips)/17 packaged,Chromium78/78,Firefox32/32 pass.
Prepare scoped delivery on existing draft PR #6; updated Ubuntu WebKit required.
Task2.3 remains reopened,10/22; no UH02 acceptance/Copy/Clear/Home promotion/merge.
Prior approval-pending notes below are superseded; no constraints waived.

F06 runtime history blocker, 2026-10-17: 7c0114e Java39070308263 succeeds; browser
39070308306 clean Maven/Chromium78/Firefox32 pass,WebKit29/32. CRLF paste/position
assertions now pass; three locale cases instead reach final Back-navigation check
and find old output {} rather than empty. Runtime/lifecycle issue, not test-only.
Pause before runtime change under owner guardrail. Recommend labelled selectable
text-only output region instead of textarea to avoid form-control history restore,
retaining all clearing/limit/CSP expectations; exact engine ordering not proved.
Task2.3 reopened:10/22; canonical UH02 implementation/dependent verification blocked.
No assertion relaxation, system install, model switch, F06 merge/release or Copy/Clear.
Evidence F06-UH02 and log /tmp/opencode/f06-crlf-ci-browser.log updated locally;
draft PR #6 remains at7c0114e. Earlier CI-pending/CRLF-only blockers are superseded.

F06 raw-CRLF test correction delivered, 2026-10-17: committed/pushed 7c0114e to
draft PR #6 after corrected local Chromium78/Firefox32 and planning/rule/OpenSpec/
whitespace checks pass. Java run39070308263/browser run39070308306 are running at
this head; require actual updated WebKit result. Runtime remains b77ac8a unchanged.
Checklist11/22, no UH02 closure, Copy/Clear, Home promotion or F06 merge/release yet.

F06 changed-code CI/CRLF fixture correction, 2026-10-17: b77ac8a Java39069636791
passes; browser39069636868 clean Maven/Chromium78/Firefox32 pass, WebKit29/32.
Only EN/ES/FR CRLF-position fixtures fail (expected line2, observed line3). Switched
those raw CRLF fixtures from contenteditable fill to the existing explicit paste
path in every engine, adding exact editor-text assertion before formatting and
retaining all position/preservation assertions. Runtime/packages/CSP/budgets/timeouts
unchanged. Corrected local Chromium78/78 andFirefox32/32 pass; prepare scoped test/
evidence delivery to draft PR #6 and require actual updated WebKit. Checklist11/22;
task2.5/UH02 acceptance and dependent Copy/Clear pending. No merge/release or waiver.

F06 diagnostics slice delivered, 2026-10-17: continued on owner request, fixed a
stale negative planning-test fixture without changing validator/assertions (all15
tests pass), and pushed b77ac8a to existing draft PR #6. Java run39069636791 and
browser run39069636868 are running against that head; no new-code WebKit pass yet.
First watcher exited before checks were registered, not because CI failed; restarted
after confirming both jobs running. Local129 frontend/199 Java (three skips)/17
packaged,Chromium78/78,Firefox32/32 and real health pass. Checklist11/22; task2.5 and
UH02 acceptance pending. No runtime changes after commit; delivery-result bookkeeping
local. No Copy/Clear, Home promotion, F06 merge/release or manual acceptance claimed.

F06 diagnostics delivery continuing, 2026-10-17: owner requested continuation with
the existing Sol session. Prepare the locally verified UH02 diagnostics/freshness
slice and accepted UH01 bookkeeping for the existing authorised draft PR #6/Ubuntu
CI path. Checklist11/22; updated WebKit result and UH02 acceptance remain pending.
No code/test scope changes, model switch, Home promotion, F06 merge or release.

F06 UH01 accepted/UH02 local verification, 2026-10-17: owner explicitly accepted
the first formatting slice and asked to continue. UH01/all five tasks done against
cd3460d and actual clean three-engine CI; final feature manual gate remains pending.
UH02 adds validated optional worker diagnostic metadata, safe Unicode/CRLF/EOF
locations, editor accepted-change notifications and revision-owned current-result
state. Accepted edits/settings/retry/cancel/exit invalidate stale work; rejected
oversized edits preserve accepted input/matching result. No Copy/Clear yet.
Maven129 frontend/199 Java cases (three skips)/17 packaged passes; Chromium78/78,
Firefox32/32 pass real diagnostics/freshness/budgets/load failure/history restoration
and all retained regressions. Reference10/100 KiB/1 MiB and deep output observations
recorded, no universal timing claim. Checklist11/22 (through2.4); canonical UH02-T04
and task2.5 pending updated required Ubuntu WebKit CI for changed code. Old UH01 CI
is not a new-code pass. Changes/result tracking remain local/uncommitted on existing
draft PR #6 branch. Next publish verified slice through that existing CI path; no
merge/release/Home promotion. Evidence harness/evidence/F06-UH02-json-diagnostics.md.
Owner asked about simpler models; no automatic model switch or delegation performed.

F06 three-engine CI passed, 2026-10-17: actual head cd3460d on draft PR #6 has Java
run39063899168 and browser run39063899165 SUCCESS. Ubuntu24.04 clean Maven92 frontend/
199 Java cases (three explicit architecture skips)/17 packaged pass; Chromium71/71,
Firefox25/25,WebKit25/25 pass all real formatter and retained regression cases. No
runtime changes since the tested commit, CSP relaxation, local system install or
gate waiver. Checklist1.1–1.6 done (6/22); canonical UH01-T01–T04 done, T05/story
in_review pending acceptance. Both UH01 automated acceptance pairs evidenced; manual
browser200%/visual/EN/ES/FR owner observations not fabricated. Existing dependency
sequence still places UH02 after accepted UH01 closure; later diagnostics/freshness/
Copy/Clear unstarted. PR #6 remains draft/open/unmerged, Home promotion off. Result
tracking/evidence updates currently local; no F06 release or automatic feature close.
Earlier required-WebKit/CI-permission blockers are historical.

F06 draft PR delivered, 2026-10-17: authorised commit cd3460d includes verified first
formatter slice plus completed approved documentation updates, pushed on
feature/F06-json-formatter-implementation; draft PR #6 opened against main:
https://github.com/ziuld/beneath-the-code-page/pull/6. Required Ubuntu CI is running;
wait for actual Java/three-engine results, not configuration alone. Checklist5/22,
UH01-T04/story/dependent work still pending. No local privileged install, F06 merge,
release, Home promotion or owner-acceptance fabrication. Delivery-result bookkeeping
is currently local; earlier no-authorisation/no-delivery statements are historical.

F06 draft delivery authorised, 2026-10-17: owner approved committing the current
formatter slice and completed documentation updates, pushing the feature branch and
opening a draft PR for supported Ubuntu WebKit CI. Deliver this scoped snapshot;
inspect actual remote checks before claiming task1.6 complete. Checklist5/22; Home
promotion and later story implementation remain pending. No F06 merge/release or
acceptance waiver authorised. This supersedes the earlier delivery-permission pause.

F06 first slice verified/WebKit gate, 2026-10-17: owner authorised resolving ordinary
test-only integration mismatches while retaining coverage and stopping for material
decisions. Exact real-route/unfinished-route assertions corrected. Maven passes92
frontend/199 Java cases (three explicit architecture skips)/17 packaged; real health
passes. Normal-JAR Chromium71/71 and Firefox25/25 pass real formatter/fidelity,
cancel/replacement/error recovery, exact-asset privacy, actual worker CSP/cache/bytes,
EN/ES/FR axe/no-JS/lazy failure and Home/index isolation; existing regressions pass.
Checklist1.1–1.5 done (5/22); canonical UH01-T01/T02/T03 done. WebKit26.6/build2359
downloaded locally but all25 cases fail before assertions: unavailable fallback-build
libicu74/libxml2/libflite1. No system install, CSP relaxation or gate waiver. Need
authorisation to commit/push current slice and completed doc updates/open draft PR
for existing supported Ubuntu CI. No F06 delivery/commit/acceptance yet; Home Tools
off. UH01-T04/story/dependent work blocked; positioned diagnostics/freshness/Copy/Clear
unstarted. Final owner manual acceptance remains required, not invented. Evidence
harness/evidence/F06-UH01-json-formatting.md has actual commands/logs and supersedes
earlier pauses; branch feature/F06-json-formatter-implementation based on merged main.

F06 fixture fixed/Java assertion pause, 2026-10-17: owner-approved fixture-local
worker naming override retains all assertions and production naming/metadata.
Frontend92/92 plus type/lint/style pass. Java compiles;199 cases,three explicit
architecture skips,one failure: pre-F06 HomeSecurityTests line36 forbids any /tools
mapping. New Tools MVC6/6, locale/editor/publication/architecture checks pass.
Recommend replacing that obsolete blanket assertion with required exact real Tools
mappings and retained absence of unfinished tools/Learn/fixtures; no access-policy
relaxation. Not applied pending guidance under error rule. Checklist2/22;
packaged/browser checks not run. Log /tmp/opencode/f06-fixture-fixed-verify.log;
canonical blocker/evidence updated. Earlier formatter/Vite failures resolved.

F06 algorithm fixed/worker verification pause, 2026-10-17: owner approved replacing
the dependency formatter routine with bounded local token-gap whitespace editing,
retaining strict library validation/scanning and all fidelity/budget requirements.
Algorithm32/32 and initial full frontend83/83 pass. Checklist2/22 (1.1/1.2) complete.
Added production worker/protocol/build metadata and lazy EN/ES/FR SSR formatter/index,
exact GET/HEAD/security/locale returns and corresponding tests; Home promotion off.
Combined Maven verification stops at generic Vite fixture inheriting production
worker output naming while expecting probe.worker;91/92 tests pass (types/lint/style
pass). Actual production metadata build test passes. Java/packaged/browser gates
unexecuted;1.3/1.4 remain unchecked, canonical F06/UH01/T02 blocked. Recommend a
fixture-local naming override retaining all assertions; not applied pending guidance
under the requested error rule. No skipped tests, budget/CSP relaxation or F06
commit/push/merge. Log /tmp/opencode/f06-first-worker-verify.log; evidence F06-UH01.

F05 merged/F06 started, 2026-10-17: owner authorised PR #5 ready/squash merge and
ADR 006's exact same-origin immutable worker-script GET exception, never payload
traffic or arbitrary asset-prefix allowance. F05 merged as 8033ef0. New branch
feature/F06-json-formatter-implementation is based on merged origin/main, preserving
all local archive/accessibility/spec/planning work. Canonical F06 acceptance and
delta/quality guidance reconciled; CSP/storage restrictions unchanged.
F06 checklist 1/22: analysis/evidence recorded, exact MIT jsonc-parser3.3.1 installed
project-locally (audit zero findings). Pure formatter/types/lint prepared; focused
tests22/24 pass. Depth128 and output-expansion cases fail because dependency format
returns undefined edit content at its indentation-cache boundary; direct dependency
reproduction confirms at depth100 (two-space). No skipped tests or lowered limits.
Apply paused under error rule; task1.2 and canonical F06/UH01/T02 blocked pending
direction. Recommend retain strict parser/scanner and generate bounded whitespace-
only edits without defective library formatter; not implemented without agreement.
No worker/route/UI or packaged/browser acceptance yet, no F06 commit/push/release.
Evidence harness/evidence/F06-UH01-json-formatting.md; owner effort unreported.

F06 apply/PR review, 2026-10-17: owner authorised proposed planning reconciliation
and requested F05 PR review. Corrected F06 Home publication timing, formatting-only
UH01 versus final all-action privacy verification, and archived accessibility-follow-up
wording. Strict change validation, planning integrity and whitespace pass; no code edits.
Strict request-free processing/recovery remains a design blocker: worker recreation
after hard termination loads a script; cache hits and successful-worker reuse alone
do not prove zero browser requests. No policy exception/CSP relaxation accepted.
Apply paused at 0/22 pending that decision; task record harness/tasks/F06-json-formatter.md.
PR #5 actual head e83be62d remains draft/open, clean/mergeable; Java and Chromium/
Firefox/WebKit CI steps pass at that head. No blocking implementation review finding.
Evidence harness/evidence/F05-pr5-review.md. Local archives/spec/accessibility/F06
planning updates remain uncommitted and absent from PR; no push/merge performed.

Scope clarification archived, 2026-10-17: owner explicitly requested archival of
clarify-keyboard-accessibility-scope after all three tasks and validation completed.
Moved complete spec-driven change, including metadata, to
openspec/changes/archive/2026-10-17-clarify-keyboard-accessibility-scope/.
Specs deliberately skipped; no delta sync or main-spec changes. Task links updated.
Only f06-json-formatter remains active: planning ready, implementation unstarted
(0/22). No application changes, commit/push/merge/release or F06 apply authorised.

Clarification validation completed, 2026-10-17: owner approved rewording the evidence
search expression. Plain-language wording resolves the Markdown-link false positive
without changing the validator. Final planning integrity, all 15 planning-rule tests,
strict OpenSpec (nine items), whitespace and empty runtime/test/build/CI scope diff
pass. clarify-keyboard-accessibility-scope now complete (3/3), ready for review and
separately requested archival; evidence/task record updated. No application changes,
commit/push/merge/release/archive or F06 implementation. This supersedes the pause below.

Final clarification validation paused, 2026-10-17: after evidence creation, planning
integrity misread its inline search expression as a Markdown link to `review|test`.
Earlier planning checks passed before the evidence existed; final closure does not.
Task 2.1 reopened, progress 2/3. Proposed fix is documentation-only rewording of that
expression, then rerun planning/whitespace checks; no validator change. Waiting for
guidance under apply's error rule. This supersedes the completion claim immediately
below; all retained-scope edits remain, no runtime changes or F06 implementation.

Keyboard/visual scope clarification applied, 2026-10-17: owner explicitly requested
apply of clarify-keyboard-accessibility-scope. All three documentation tasks complete;
quality/brand guidance, future-feature inheritance, F16 manual review wording,
delivery guidance and evidence template now retain explicit keyboard/visual/locale/
axe criteria without mandatory speech review or blanket WCAG AA conformance target.
Historical evidence preserved; speech compatibility is excluded, not passed/deferred.
Both renderers, planning integrity, all 15 rule tests, strict OpenSpec (nine items),
whitespace and runtime/test/build/CI scope checks passed. Canonical plan changed only
F16-UH01-T03 title; IDs, estimates, requirements/scenarios and statuses unchanged.
Evidence: harness/evidence/clarify-keyboard-accessibility-scope.md. No application
build/browser/manual checks run, no code/dependency/security/CI changes. F05 remains
archived; F06 remains planning-only (0/22). No commit/push/merge/release or automatic
archive of this clarification; ready for review and separately requested archive.

F05 archived, 2026-10-17: owner requested completed-change archival and confirmed
main-spec synchronisation. Created accessible-editor and bounded-worker-processing
main specs with verbatim accepted purpose/requirements/scenarios and canonical
structure; exact-content comparison and strict validation of all seven main specs
passed before archival. Complete F05 change (15/15) moved to
openspec/changes/archive/2026-10-17-f05-editor-and-csp-proof/; task-record links updated.
No application changes or behavioural ownership migration, commit/push/merge/release.
clarify-keyboard-accessibility-scope remains unapplied (0/3), not completed work.
f06-json-formatter has all four planning artifacts ready, strictly validated, with
0/22 implementation checklist items; apply has not started. Earlier no-archive
instructions and F05 active-change references are historical.

F05 final acceptance recorded, 2026-10-15: owner confirmed successful manual200%
browser zoom and EN/ES/FR visual/copy checks in direct response to the final review
questions. Together with earlier functional/keyboard feedback, approved speech-
review scope removal and existing all-engine CI, all four acceptance pairs pass.
Canonical F05/both stories/all ten tasks now done; actual finish2026-10-15, no
invented effort. Checklist15/15; both planning renderers, planning integrity, all15
planning-rule tests, strict OpenSpec validation(seven items) and whitespace pass. Existing
code c3e94e6 CI green: Java38805367982/browser38805367966; no runtime changes.
Latest acceptance sections in both evidence files supersede historical blockers.
Screen-reader compatibility is out of scope, not passed/deferred; keyboard/focus/
contrast/zoom/locales/axe/privacy remain. Separate documentation-only proposal
clarify-keyboard-accessibility-scope ready, unapplied (0/3); future apply reconciles
quality/brand guidance, not application code. Coherent closure commit follows; no
merge/release/archive or behavioural migration. F06 is unstarted and prerequisites
are now satisfied; don't start it without a request. Manual review versions are
preparation metadata, exact viewport unreported, observations owner-reported.

F05 scope revision approved, 2026-10-15: owner explicitly removed screen-reader
compatibility/manual speech testing and confirmed the proposed artifact revisions.
Updated existing F05 proposal/editor delta/design/tasks, canonical verification and
delivery instructions; keyboard/navigation/labels/focus/contrast/zoom/locales/axe
remain. This supersedes prior AT deferral, not a passing Orca test. User reported
general manual satisfaction then clarified silence; audible output/compatibility
not established. Existing all-engine CI on c3e94e6 is green; no runtime changes.
F05 remains12/15: retained actual200% browser zoom and EN/ES/FR visual/copy checks
have no explicit observations; do not invent them or mark closure done. Separate
documentation-only change clarify-keyboard-accessibility-scope has proposal,
design/tasks and deliberately skipped specs; ready for review/apply, not applied.
It will reconcile project-wide quality/brand WCAG/speech-review wording. No merge,
release/archive, desktop changes or F06 implementation. Current revisions local.

F05 manual-review setup installed, 2026-10-15: owner retained original acceptance
requirements and explicitly authorised installing needed screen-reader software.
Orca50.2, eSpeak NG1.52.0, Speech Dispatcher0.12.1 and required dependencies installed
through graphical authenticated pkexec after Omarchy installer lacked a terminal.
No password shared, extra user-group membership or unrelated desktop settings.
Orca running in current Hyprland/Wayland session; speech user service active and
espeak-ng output module available. Current copied proof server runs default profile
on http://127.0.0.1:8081/__editor-fixture?lang=en (es/fr also), HTTP200 and normal JAR
digest verified. Need actual user-heard output and manual review observations;
installation is not a test pass. Checklist12/15;1.6/3.2/3.3 open. Latest final CI on
c3e94e6 passed both jobs. Setup evidence updates local/uncommitted; no app changes,
merge/release/archive or feature closure. Earlier no-install restrictions historical.

F05 implementation/automated verification complete, 2026-10-15: worker1990264
and test inspection fix5f5a151 pushed to draft PR#5 (not merged). Java38803570316
passes verification/architecture/real health/planning; browser38803570203 passes
clean Maven51 frontend/191 Java/four skips/17 packaged, Chromium64/64, Firefox18/18,
WebKit18/18 on Ubuntu24.04. Lifecycle, budgets, stale/protocol/disposal, actual worker
CSP/no-network/no-eval, immutable assets and EN/ES/FR privacy/status pass. Existing
Home/locale/security/watch/logo/JAR-exclusion/digest checks pass; no F06 or CSP
relaxation/new dependency/framework/system install. Checklist12/15: only1.6 manual
review,3.2 owner acceptance,3.3 final closure remain. Owner explicitly defers manual
review to final acceptance, not coding; don't claim it passed. WorkerT01–T04 done,
story/T05 in review; editor manual review open; F05 remains in progress. Next final
manual/integrated owner review when ready, not more implementation or Orca install.
Manual proof uses default profile/classpath assets (see delivery doc). Final
evidence/tracking recorded after tested code; no production changes since its
passing run. No merge/release/archive authorised.

F05 worker CI test correction, 2026-10-15: slice `1990264` pushed to draft PR #5.
Java38802356561/clean Maven pass; Chromium63/64 passes all real lifecycle/privacy
cases but body inspection of a terminated worker response fails in browser CI
38802356507; later Firefox/WebKit steps skipped. Test-only correction retains
actual worker headers/CSP assertions and reads bytes at the same immutable URL
through existing HTTP client. Local corrected Chromium64/64 and Firefox18/18 pass.
Next deliver correction under ongoing approval and inspect actual three-engine CI.
No application/CSP/timeouts/retry changes. Checklist9/15; manual review deferred
to final acceptance, not coding. No feature closure/merge/release or system changes.

F05 worker slice implemented locally, 2026-10-15: owner confirmed proposed
implementation-first task ordering and minimal scope. Manual task1.6 remains a
final acceptance gate, not a worker coding prerequisite; no Orca/new framework.
One-job manager, bounded input/output, timeout/cancel/replacement/stale-result/
disposal handling and isolated worker proof added using existing harness/assets/
headers/i18n. Normal JAR has no proof worker/classes/routes; original B bytes and
JAR digest preserved. Clean Maven51 frontend/191 Java/four skips/17 packaged
(including actual successive watch rebuilds) passes. Local Chromium64/64 and
Firefox18/18 pass real lifecycle/CSP/privacy/status cases; health smoke passes.
Task1.1–1.5/2.1–2.4 complete:9/15. Updated WebKit worker proof still requires
Ubuntu CI, not earlier editor-only evidence. Next review/deliver to draft PR #5
under ongoing scope, inspect CI, record integration; final manual/owner acceptance
still open. No F06, CSP relaxation, system changes, merge/release or closure.
Evidence: F05-UH01 and new F05-UH02 file. Changes uncommitted at this handoff.

F05 manual/AT preparation, 2026-10-15: user requested continuation. Task1.6 is
next, not more automated debugging. Installed Chrome155.0.8059.79 and Omarchy4.0.4
discovered; Orca not on PATH. This does not establish the owner's previous review
environment or AT use. Replaced our stale manual fixture child on loopback8081
with current copied JAR; HTTP200/shared button and normal JAR digest verified.
Review URL http://127.0.0.1:8081/__editor-fixture?lang=en (es/fr also). Need explicit
screen-reader observations/environment; ask whether prior review included AT or
arrange an available reader. No system install/configuration change authorised or
performed. Checklist5/15, task1.6 and worker/final work pending; previous all-engine
passing evidence unchanged. Tracking/evidence updates remain uncommitted.

F05 WebKit gate resolved, 2026-10-15: tooling correction committed/pushed as
`baf1153` to draft PR #5, not merged. Java run 38747569779 passes; browser run
38747569700 passes clean Maven (34 frontend/190 Java/four skips/17 packaged),
Chromium60/60, Firefox14/14 and WebKit14/14 on Ubuntu24.04. Matched Playwright1.63.0
engines Chromium153/build1243, Firefox155/build1543, WebKit26.6/build2359; upstream
WebKit27.2 bug327212 remains open, no application/CSP/check relaxation. Required
Firefox CI added; all three engines mandatory. Task1.5 done, checklist5/15. T02
implementation done; canonical T03/T04 blocked only on required manual/AT evidence
and predecessor closure, not automated engine failures. Next task1.6: explicit
screen-reader/browser/OS/viewport observations; earlier owner review positive but
optional AT use unreported. Worker work follows required UH01 evidence. Upgrade
pin owner/trigger in delivery doc. No story acceptance, merge/release or system
changes; result bookkeeping currently uncommitted. Earlier blockers historical.

F05 upstream regression fix route, 2026-10-15: owner requested fixing rather than
waiving WebKit. Found exact upstream WebKit bug 327212 (native select UA-shadow
inline style before attachment; NEW, no published fix found). Keep all three
engine gates required. Test environment temporarily pinned to matched Playwright
1.63.0: Chromium153/build1243, Firefox155/build1543, WebKit26.6/build2359; no binary
mixing, browser patch or application/CSP changes. Local Chromium60/60 and Firefox
14/14 pass with project-local installs; lockfile deduped, audit reports zero
vulnerabilities. Added required Firefox CI smoke (quality plan already requires
it) before WebKit. Next deliver under ongoing debugging/draft-PR approval and
verify actual Ubuntu WebKit results. Checklist4/15; no passing WebKit or full
acceptance yet. Upgrade follow-up owner/trigger recorded in delivery instructions.
Earlier advisory-policy proposal is not adopted; no merge/release/system changes.

F05 browser-gate decision, 2026-10-15: continued diagnosis pushed as `e5e62bd` to
draft PR #5. Java run 38745556539 passes; browser run 38745556636 clean Maven and
Chromium 60/60 pass, latest local Firefox 14/14. WebKit 6/14: no-select minimal
control passes, every plain native-select variant reports style-src-attr/inline
without application/editor code; appearance:none, dark scheme and listbox do not
help. Pinned browser/tooling incompatibility confirmed, exact implementation bug
and released Safari behaviour not claimed. Available Playwright 1.64.1 retains
WebKit2370/27.2; no speculative dependency upgrade or application/CSP workaround.
Genuine decision now needed: retain required WebKit gate and stay blocked, or
explicitly adopt Chromium/Firefox-required and visibly advisory WebKit via agreed
artifact changes/ADR. User priority alone is not a waiver. Checklist remains 4/15;
AT/manual and dependent worker/final work pending. No policy decision, acceptance,
merge/release, system change, test omission or external issue publication. Post-run
bookkeeping uncommitted. Evidence in F05-UH01; prior handoffs historical.

F05 continued debugging authorised, 2026-10-15: owner prioritises Chrome/Chromium
and Firefox, asked to continue after explanation of WebKit/Safari coverage.
Ongoing scoped diagnosis, verification and commits/pushes to draft PR #5 approved;
do not ask for each intermediate step. Stop for genuine design/security/scope
decisions; no CSP relaxation/check omissions/merge/release/closure authorised.
Added controlled native-selector reproduction (no-select control, unstyled native
select, appearance:none, dark scheme and listbox), with actual unchanged server
CSP and trusted nonce-backed diagnostic CSS. Original application acceptance
tests untouched. Local Chromium 60/60 and Firefox 14/14 pass; no Maven rerun for
test-only changes. Next deliver tests/records and inspect Ubuntu WebKit results,
then fix only a confirmed cause. Checklist 4/15; AT/manual and worker/final pending.

F05 shell isolation confirmed, 2026-10-15: tests/records committed and pushed as
`bf8007d` to draft PR #5, not merged. Java run 38743541537 passes; browser run
38743541682 clean Maven/Chromium 59/59 pass. WebKit executes 6/13 pass: three added
initial-load diagnostics and four existing policy assertions fail. Home (only
site script), script-free shared shell (zero scripts) and editor all report one
style-src-attr/inline violation; HTML lines 31/28/23 respectively. Fresh rendered
HTML confirms each line is the native language select, without authored inline
style. Editor enhancement/application scripts are not required; exact native-
control/CSS cause and safe fix unconfirmed. Pause for guidance to narrow selector
rendering under unchanged CSP, then fix only a confirmed cause. No CodeMirror
patch, selector removal, event filtering or policy relaxation. Checklist 4/15;
AT/manual details, worker/final work pending. Post-run bookkeeping uncommitted;
no further commit/push, merge/release/system changes or sync/archive authorised.
Evidence: `harness/evidence/F05-UH01-accessible-editor.md`. Earlier handoffs historical.

F05 isolation delivery authorised, 2026-10-15: owner approved committing/pushing
the three locally verified initial-load tests and related evidence/tracking to
draft PR #5. Deliver and inspect Ubuntu WebKit Home/shared-shell/editor comparison;
no further fixes, policy change, merge/release or acceptance inferred. Checklist
remains 4/15. Earlier pending-approval restrictions below historical.

F05 initial-load isolation prepared, 2026-10-15: owner authorised shared-shell
versus editor diagnosis under unchanged CSP. Added three fresh-context tests for
real Home, existing script-free shared-shell fixture and enhanced editor fixture;
pre-navigation violation listeners, response policy/script isolation checks and
safe diagnostic output. No production/policy edits or existing-check omissions.
Local Chromium 59/59 and Firefox 13/13 pass; all three initial-load cases have no
violations in those engines. Existing packaged JAR used, no Maven rerun claimed.
Need approval to commit/push local tests/evidence to draft PR #5 for actual Ubuntu
WebKit isolation. Latest remote remains 65ce664, WebKit last 6/10; cause unconfirmed.
Checklist 4/15; AT/manual evidence, worker/final work pending. Changes uncommitted;
no further delivery, system changes, merge/release or sync/archive authorised.

F05 diagnostic CI pause, 2026-10-15: authorised button/diagnostics slice committed
and pushed as `65ce664` to draft PR #5, not merged. Remote Java 38741818288 and
browser 38741818319 clean Maven/Chromium 56/56 pass. WebKit 27.2/build2370 still
6/10: EN/ES/FR axe now passes (button contrast corrected), four cases instead
fail unchanged CSP assertions. Reports: style-src-attr/inline, sourceFile empty,
line 23/column 1; phase-enabled case says initial enhancement. Fresh packaged
HTML line 23 is shared language select without authored style; clue, not confirmed
cause or proof against CodeMirror. No filtering/policy relaxation. Pause for
guidance to isolate real Home/shared-shell initial load versus editor enhancement
and fix confirmed cause. Post-run evidence/tracking uncommitted; no further
commit/push inferred. Checklist 4/15; AT/manual details, dependent worker/final
work pending. No merge/release/system changes/sync/archive. Earlier handoffs historical.

F05 diagnostic delivery authorised, 2026-10-15: owner approved committing/pushing
the shared-button correction, test-only CSP source/phase diagnostics and related
evidence/tracking to draft PR #5 for another Ubuntu WebKit run. Deliver this exact
verified slice and inspect actual CI results; no merge/release, CSP relaxation,
system changes or feature closure authorised. Checklist remains 4/15 pending
WebKit and explicit AT/manual evidence. Prior local-only restrictions historical.

F05 WebKit local investigation, 2026-10-15: owner authorised diagnosis/fixes under
unchanged CSP/accessibility checks. Reused existing BTC button fragment for the
editor Continue control (previously native button); EN/ES/FR MVC checks require
its shared class/type. Added test-only CSP source-file/line/column and operation-
phase diagnostics without payload samples or assertion changes. Previous CI has
no retained trace artifacts; originating blocked write still unconfirmed. Fresh
non-clean Maven (34 frontend/190 Java/four skips/17 packaged), Chromium 56/56 and
Firefox 10/10 pass. Local WebKit still lacks host libraries. Next: ask approval
to commit/push local contrast correction and diagnostics to draft PR #5, then
inspect real Ubuntu WebKit output. No extra commit/push performed or authorised;
latest remote remains 9780a76, last WebKit 6/10 with four failures. Checklist 4/15;
AT/manual details, worker work and final acceptance pending. No CSP relaxation,
system change, merge/release or sync/archive. Earlier handoffs historical.

F05 actual WebKit pause, 2026-10-15: approved scroll correction committed/pushed
as `9780a76` to draft PR #5 (not merged). Local Chromium 56/56 and Firefox 10/10
pass. Remote Java run 38739467192 passes; browser run 38739466295 clean Maven
(34 frontend/190 Java/four skips/17 packaged) and Chromium 56/56 pass. WebKit now
launches in Ubuntu: 6/10 pass, four fail. EN/ES/FR axe cases report Continue button
contrast 1.81:1 (white on native grey, needs 4.5:1); tooltip/resize case reaches
policy assertion and reports style-src-attr / inline violation. Originating write
not yet identified; later asset/nonce assertions unexecuted. Pause for guidance
before diagnosing/fixing these failures under unchanged CSP; no policy relaxation,
assertion omissions or ADR decision inferred. Task 1.5 open, checklist 4/15;
explicit AT/manual environment evidence and dependent worker work remain pending.
Results recorded in F05-UH01 evidence; post-run bookkeeping uncommitted. No
further commit/push, merge/release/system change or sync/archive. Earlier blockers
and WebKit-unexecuted statements below historical.

F05 scroll assertion correction, 2026-10-15: owner authorised test-only expect.poll
correction plus commit/push to draft PR #5. Applied only the retrying positive
scroll condition; all other checks/default timeout/zero test retries unchanged.
Fresh full Chromium 56/56 and Firefox critical 10/10 pass against the packaged
JAR; no new Maven run for this test-only edit. Next: deliver correction and
inspect actual Ubuntu Chromium/WebKit results. Task 1.5 remains open until WebKit
passes; task 1.6 still needs explicit AT/manual environment evidence. Checklist
4/15; dependent worker implementation pending. No merge/release/CSP or system
change. Earlier failure and unapproved-correction statements below historical.

F05 draft delivery pause, 2026-10-15: owner-approved commit `db0f06c` pushed on
`feature/F05-editor-and-csp-proof`, including deferred Chromium correction 750e959;
draft PR https://github.com/ziuld/beneath-the-code-page/pull/5 opened, not merged.
Fresh local Maven (34 frontend/190 Java/four skips/17 packaged), Chromium 56/56,
Firefox 10/10, health/planning/OpenSpec checks pass. Remote Java run 38738672625
passes, browser clean build passes; browser run 38738672614 fails Chromium 55/56
at immediate scrollTop > 0 assertion (editor.spec.mjs:159 observed zero).
WebKit step skipped; no WebKit evidence. Pinned CodeMirror schedules scrolling
through animation-frame measurement; recommend test-only expect.poll for the same
positive scroll assertion, preserving all checks/timeouts. Not applied; pause for
guidance under apply error rule. Owner reports successful presented manual review;
explicit screen-reader/browser/environment details remain unreported. Checklist
4/15; dependent workers/final acceptance pending. Delivery-result bookkeeping is
uncommitted; no further commit/push, merge/release/CSP relaxation/system changes.
Evidence: `harness/evidence/F05-UH01-accessible-editor.md`. Earlier handoffs historical.

F05 resumed, 2026-10-15: owner reports the presented local editor manual review
works as described and approves committing the current F05 slice, pushing
`feature/F05-editor-and-csp-proof` and opening a draft PR for Ubuntu WebKit CI.
Explicit browser/viewport/OS and screen-reader use/version/observations remain
unreported; task 1.6 stays open, not waived by general review approval. Local
fixture runs on loopback 8081; editor HTTP 200 and normal JAR digest unchanged.
Fresh non-clean Maven and Chromium verification exit successfully; detailed
evidence in `harness/evidence/F05-UH01-accessible-editor.md`. Checklist remains
4/15; task 1.5 requires actual WebKit results, dependent workers remain pending.
Next: complete authorised draft delivery, inspect remote results and obtain
remaining manual evidence. No merge/release/system change/CSP relaxation or
sync/archive authorised. Earlier stop and delivery restrictions below historical.

Owner-requested stop, 2026-10-14: pause F05 until the owner resumes, intended next
day. Branch `feature/F05-editor-and-csp-proof`; work uncommitted, deferred local
Chromium correction 750e959 retained. Checklist 4/15 complete (1.1–1.4).
Latest checks: Chromium 56/56, Firefox 10/10; Maven frontend 34, Java 190 with four
explicit skips, packaged 17 pass. WebKit cannot launch locally due to missing
fallback-build libraries; required Ubuntu CI smoke step added but not run remotely.
Workflow/configuration safety, planning and whitespace checks pass. No application
CSP relaxation or system changes, commit/push/acceptance/sync/archive.

Resume with `/opsx-apply f05-editor-and-csp-proof`: inspect current diff/checklist,
obtain actual supported-environment WebKit results through separately authorised
delivery, then actual keyboard/screen-reader/200% browser zoom and EN/ES/FR review
using `docs/delivery/editor-and-worker-proof.md`. Tasks 1.5/1.6 remain open; do not
claim CI configuration as WebKit evidence. Dependent worker lifecycle follows only
after required UH01 evidence. No authorisation to push/commit inferred from this
stop. Evidence: `harness/evidence/F05-UH01-accessible-editor.md`; task record:
`harness/tasks/F05-editor-and-csp-proof.md`. Earlier handoffs below historical.

F05 WebKit CI step prepared, 2026-10-14: owner authorised adding WebKit smoke to
existing Ubuntu browser workflow. Added one step after Chromium using --engine
webkit --install --with-deps; preserves runner CI-only dependency guard, permissions,
pins and timeout. No push/remote run/local privileged install; WebKit acceptance
still unverified. Chromium 56/56 and Firefox 10/10 remain latest executed results.
Checklist 4/15; required WebKit/manual/dependent worker evidence pending.
No commit/publication/CSP relaxation. Earlier handoffs historical.

F05 WebKit launch pause, 2026-10-14: owner authorised portable synthetic paste
correction without omissions. Firefox 10/10 and Chromium 56/56 pass; clipboard
property attached explicitly on test events, no production change or skipped case.
WebKit project-local download succeeds but all 10 cases error before launch due to
missing host libicu74/libxml2/libflite1; no WebKit assertions executed. No sudo/system
changes. Recommended required smoke in supported existing Ubuntu CI with CI-only
dependency install; workflow/remote run not yet performed. Checklist 4/15; task
1.5/manual/dependent worker remain open. Evidence F05-UH01; logs
`/tmp/opencode/f05-editor-firefox-paste-fixed.log`,
`f05-editor-chromium-paste-fixed.log`, `f05-editor-webkit.log`.
No acceptance/commit/push/CSP relaxation. Earlier handoffs historical.

F05 Firefox paste-fixture pause, 2026-10-14: task 1.4 completed (pre-post input
guard/unit cases and programmatic browser limits/inert output/disposal). Checklist
4/15. Added resource-backed CodeMirror help tooltip, selection/scroll/375px resize,
fresh nonce and lazy-asset MIME/immutable cache/bytes proof; explicit --engine
runner with Firefox/WebKit critical projects, default/snapshots Chromium unchanged.
Maven 34 frontend/190 Java (four skips)/17 packaged pass; Chromium 56/56 passes.
Firefox 157/build1555 downloaded locally without sudo: 9/10 passes, one synthetic
paste failure. Focused reproduction: source DataTransfer 524288 chars, constructed
ClipboardEvent exposes zero; no paste inserted. Programmatic limits pass. Proposed
test-only explicit clipboardData property on synthetic event, unchanged assertions;
not applied pending error-rule guidance. WebKit/manual/worker/final checks pending.
Evidence F05-UH01; logs /tmp/opencode/f05-editor-tooltip-verify.log,
f05-editor-tooltip-chromium.log, f05-editor-firefox.log. No CSP relaxation,
commit/push/acceptance. Earlier handoffs historical.

F05 Escape fix verified, 2026-10-14: owner authorised explicit wrapper binding.
Search-close retains priority; editor Escape calls setTabFocusMode(2000) before
default simplifySelection. Maven passes 31 frontend tests, 190 Java cases/four
explicit skips, 17 packaged. Pinned Chromium 54/54 passes: EN/ES/FR search/privacy,
selected-match Escape-Tab exit/reverse traversal, axe and executed policy checks.
Task 1.3 done; checklist 3/15. No CSP relaxation. Full input/pre-worker proof,
tooltip/resize/Firefox/WebKit, actual AT/zoom/copy, worker and final integration
remain pending; no acceptance/commit/push/archive. Evidence F05-UH01; logs
`/tmp/opencode/f05-editor-escape-verify.log`, `f05-editor-escape-browser.log`.
Earlier blockers/handoffs below historical.

F05 keyboard pause, 2026-10-14: owner-authorised search test correction now commits
query before navigation. Chromium 51/54: EN/ES/FR search line1/line2/wraparound,
no-excerpt announcements and search-panel Escape focus return pass. Earlier
wraparound-only diagnosis corrected: fill did not commit query before Enter.
Actual remaining failure: default Escape simplifySelection consumes selected-match
Escape before core Tab-escape handler. Proposed minimal wrapper binding calls public
setTabFocusMode(2000), after search-close and before default keymap; preserve tests.
Not applied pending error-rule guidance. Checklist 2/15; axe/final policy checks
after failure, actual manual/three-engine/worker evidence pending. Log
`/tmp/opencode/f05-editor-committed-search-browser.log`; F05-UH01 evidence updated.
No commit/push/acceptance/CSP changes. Earlier handoffs historical.

F05 search-test pause, 2026-10-14: owner-authorised Vite built-URL mapping applied
with lazy JS/CSS/worker build regression; server/CSP unchanged. Maven passes 31
frontend tests, 190 Java cases/four explicit skips, 17 packaged. Chromium 51/54:
editor loads and Unicode limits pass; three search cases expect line 2 after two
advances but see localised line 1 after wraparound. Proposed test-only per-step
selection/announcement assertions, retaining excerpt absence; not applied pending
error-rule guidance. Task 1.2 complete, checklist 2/15; normal JAR digest/fixture
exclusion/original B bytes and no-JS/cold Home isolation verified. Later keyboard/
axe/policy assertions in failed cases unexecuted; manual/three-engine/worker pending.
Evidence F05-UH01; logs `/tmp/opencode/f05-editor-url-verify.log`,
`f05-editor-url-browser.log`. No commit/push/acceptance. Earlier handoffs historical.

F05 browser URL pause, 2026-10-14: owner-authorised MVC query correction applied.
Maven verify passes 31 frontend tests, 190 Java cases/four explicit skips and 17
packaged cases. Chromium run passes 50/54: four JS-enabled editor cases cannot
enhance because Vite generates `/static/assets/` lazy JS/CSS URLs while packaged
resources serve at `/assets/`. Trace confirms 403/MIME failures, not CodeMirror
CSP incompatibility. Proposed minimal correction: Vite built-URL mapping strips
packaging-only static prefix; build regression then same browser rerun. Not applied
pending error-rule guidance. Checklist 1/15; no runtime/manual/worker acceptance.
Logs `/tmp/opencode/f05-editor-query-verify.log`, `f05-editor-browser.log`; evidence
in F05-UH01 file. No commit/push/CSP relaxation. Earlier handoffs historical.

F05 resumed apply pause, 2026-10-14: owner agreed to generic no-excerpt search
announcements. Wrapper/lazy workspace/escaped SSR/messages/nonce, bounded input,
exact lazy-asset caching and isolated editor proof are prepared. Frontend checks
and 31/31 tests pass. New Java MVC verification: 190 cases, two locale failures,
four explicit skips; packaged tests did not run. MockMvc `.param` does not set raw
query read by locale resolver. Proposed minimal test-only fix: real `?lang=es/fr`
URLs, then rerun; not applied pending error-rule guidance. Browser/axe/manual and
worker checks unexecuted; checklist remains 1/15, no false partial completion.
Evidence: `harness/evidence/F05-UH01-accessible-editor.md`. No CSP relaxation,
commit/push/sync/archive; Chromium correction retained. Earlier handoffs historical.

F05 apply pause, 2026-10-14: `feature/F05-editor-and-csp-proof` retains deferred
Chromium correction 750e959. Spec-driven checklist 1/15 complete (task 1.1).
Pinned minimal CodeMirror packages and browser axe with integrity/licence metadata;
focused Vite test confirms worker files need explicit private build metadata.
Frontend type/lint/format and 16/16 unit/build tests pass. Wrapper implementation
paused: built-in search announces document excerpts, conflicting with task 1.3's
no-payload-derived live-region text. Recommended owner decision: generic resource-
backed search announcements, preserving privacy, with actual AT proof. No editor
runtime/browser/manual acceptance or worker lifecycle implemented. Evidence:
`harness/evidence/F05-UH01-accessible-editor.md`; task record under `harness/tasks/`.
No commit/push/sync/archive; actual owner effort unreported. Prior handoffs historical.

Browser workflow correction, 2026-10-14: owner reversed the earlier automated
Google Chrome choice. Automated tests/snapshots now use pinned Playwright Chromium;
owner uses Google Chrome for manual review. Removed optional Chrome channel/selector,
leaving existing CI Chromium workflow unchanged. Historical F04 Chrome evidence and
archived artifacts preserved. Work on `chore/chromium-browser-tests` from merged
origin/main; F05 not started. Owner authorised a local correction commit and asked
to defer pushing it until the next feature; retain it in that feature's branch/PR.
Reproduce: `python scripts/verify-home-browser.py --install` (no --with-deps locally).
Executed that command: 46/46 browser cases passed with Playwright Chromium build
1248 (headless shell 156.0.8078.4). Project-local install only; no sudo/system changes.
Playwright reports Linux unsupported/fallback ubuntu24.04 build; checks passed on
this machine, not a claim of official OS support. Planning integrity and whitespace
checks passed. Log: `/tmp/opencode/chromium-workflow-check.log`.

F04 archived, 2026-10-14: owner requested archive and selected main-spec sync.
Archived complete spec-driven change to
`openspec/changes/archive/2026-10-14-f04-security-and-locale-flow/` (16/16 tasks).
Main `locale-preferences` and `secure-http-responses` specifications created with
verbatim purpose/requirements/scenarios; strict validation passed all five specs.
Evidence links updated. F04 remains accepted/done, implementation commit 3ea174f;
behavioural ownership remains plan-owned, F05 unchanged. Archive/sync/post-commit
closure bookkeeping remains uncommitted; unrelated VS Code work preserved.
No new commit or push authorised. Earlier pre-archive handoffs below historical.

F04 committed closure, 2026-10-14: owner accepted both stories and explicitly
authorised one local F04 commit. Created 3ea174f, excluding unrelated VS Code work.
Recorded real hash on both stories/tasks; F04/UH01/UH02 done against owner acceptance
and final technical evidence. Post-commit closure bookkeeping remains uncommitted,
not silently included in a second commit. No push/archive/spec-sync/migration;
F05 unchanged. Clean build/17 packaged/46 installed Chrome/smoke/logo/fixture
checks passed; four explicit Java skips and ASVS limitations documented. Owner
effort unreported. Earlier failed-closure/approval handoffs below are historical.

Post-commit closure validation passed: planning integrity, 15 rule tests, strict
OpenSpec and whitespace. Checklist 16/16; no remaining technical/acceptance blocker.

F04 accepted, required-commit pause, 2026-10-14: owner explicitly accepted both
stories and authorised tracking closure. Attempted done state failed planning
validator/rule baseline because both stories require real commit references. Restored
accepted/in_review/pending-commit tracking; dependent UH02 canonical closure blocked.
Checklist 3.2/3.3 reopened, progress 14/16. All application technical evidence remains
passing: clean build, 186 Java cases/four skips, 17 packaged, 46 installed Chrome,
smoke/logo/fixture checks. No commit authorised or created; request permission for
one coherent local F04 commit excluding unrelated VS Code work, then record real hash
and finish closure checks. Do not weaken validator or invent commit. No push/archive/
sync/migration; owner effort unreported. Earlier done/acceptance handoffs historical.

F04 accepted and closed, 2026-10-14: owner explicitly accepted both F04 stories and
authorised tracking closure. F04/UH01/UH02/all canonical tasks done; checklist 16/16.
Evidence: both F04 story files and ASVS 5.0.0 mapping with stated partial/deferred
controls. Final checks: clean Maven verify (15 frontend tests, 186 Java cases/four
explicit skips, 17 packaged), 46/46 Google Chrome 152.0.7977.82 browser cases,
startup/health smoke, original B bytes and normal-JAR fixture exclusion passed.
No technical blocker. Owner effort unreported; actual hours not fabricated.
No commit authorised or created; work uncommitted, unrelated VS Code edits preserved.
No push/archive/spec sync/behavioural migration; F05 unchanged and not started.
Reproduce browser: `python scripts/verify-home-browser.py --browser chrome`.
Earlier acceptance-pending and failure handoffs below are historical.

F04 owner-acceptance handoff, 2026-10-14: owner requested installed Google Chrome;
added explicit --browser chrome mode, no browser download/system change. Chrome
152.0.7977.82/Playwright 1.64.0 passes 46/46 post-clean browser cases. Clean Maven
verify passes 15 frontend tests, 186 Java cases (four explicit skips), 17 packaged
cases; baseline startup/health smoke, normal-JAR fixture exclusion and original B
bytes pass. Production CSP unchanged; synthetic accessibility styles nonce-authorised.
ASVS 5.0.0 mapping complete with partial/deferred limitations explicit. Integrated
diff reviewed without material scoped findings. All implementation/technical checks
complete; final owner acceptance of both stories pending (checklist 3.2). No local
commit/push/archive/spec-sync/ownership migration; owner effort unreported. Canonical
feature/UH01 in_review; UH02 retains blocked prerequisite closure rather than falsely
marking UH01 done. Evidence: both F04 story files, `docs/quality/F04-asvs-mapping.md`.
Reproduce browser with `python scripts/verify-home-browser.py --browser chrome`;
logs /tmp/opencode/f04-clean-verify.log, f04-final-chrome.log, f04-smoke.log.
Earlier failure/tooling handoffs below are historical, not current blockers.

Planning renderers/integrity, 15 planning-rule tests, strict OpenSpec and whitespace
checks pass. Checklist progress 15/16; only 3.2 owner acceptance/closure remains.

F04 clean-browser tooling pause, 2026-10-14: nonce-bearing test styles implemented,
production CSP unchanged; browser 46/46 passed. ASVS 5.0.0 map verified against tagged
source with partial/deferred controls explicit. Task 2.7 done; progress 13/16.
Clean Maven verify passed 15 frontend tests, 186 Java cases (four explicit skips),
17 packaged cases. Direct normal-JAR fixture exclusion/original B byte checks and
baseline startup/health smoke passed. Post-clean browser attempt cannot launch:
clean removed project-local target/browser-cache. No browser assertions ran there.
Standard next action: `python scripts/verify-home-browser.py --install` to restore
locked local Chromium/tooling and rerun, without --with-deps/sudo/system changes.
Not run; awaiting guidance under error guardrail. Task 3.1 remains open, owner
integrated acceptance/local commit authorisation pending. Evidence in both F04 files;
clean/smoke/browser logs at /tmp/opencode/f04-*.log. Source/tests pass except missing
browser prerequisite. No sync/archive/migration/push. Earlier pauses historical.

F04 CSP browser-test pause, 2026-10-14: owner agreed to simple simulated/real checks
and requested completion. Fixed-buffer read implemented; zero-length/extra-read
regression added, packaged unfinished-upload test unchanged. Maven verify passes
15 frontend tests, 186 Java cases (four explicit skips), all 17 packaged cases including
unfinished upload/header/log privacy/local watcher. Task 2.6 done; progress 12/16.
Browser run: 31/46 passed, 15 Home/shared keyboard/reflow failures because test-only
CSS zoom/text styles are injected without a CSP nonce. Native preference/forgery
and other cases pass. Recommended next change: nonce-authorise only synthetic styles
using current response nonce; do not relax production CSP/bypass it globally or drop
accessibility checks. Not applied; waiting under failed-check guardrail. ASVS mapping,
clean integration, owner acceptance/closure remain open. Evidence:
`harness/evidence/F04-UH02-secure-http-responses.md`. No commit/push/archive/migration.

F04 confirmed-read pause, 2026-10-14: owner-approved response flush applied;
unchanged unfinished-upload test still times out. Maven: 15 frontend/185 Java cases
pass (four explicit skips), 16/17 packaged pass. Live loopback reproduction/jstack
confirms blocking in readNBytes at PreferenceRequestBoundary.java:55 before rendering.
Pinned Java bytecode: allocating readNBytes(int) performs a final zero-length read;
Tomcat waits for next chunk. Buffer overload stops at requested size. Proposed minimal
next fix: fixed 4097-byte buffer + readNBytes(buffer,0,length), copy accepted bytes;
regression forbids zero-length extra read. Not applied; awaiting guidance under error
guardrail. Retain packaged partial-stream test/timeouts. Header/final-log checks remain
unexecuted. Diagnostic process stopped. Progress 11/16, source compiles/full verify fails.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No acceptance/commit/push/archive/migration.

F04 partial-stream pause, 2026-10-14: owner-authorised controller cycle correction
applied with message-free standard 400 exception/shared advice. Maven verify passes
15 frontend tests and 185 Java cases (four explicit skips), including acyclic packages.
16/17 packaged cases pass, including isolated EN/ES/FR safe 500, fixture exclusion,
normal-JAR digest and local watcher rebuilds. Task 2.5 complete; progress 11/16.
Task 2.6 timeout: unfinished chunked upload waits for 413; preceding declared/chunked
oversize, exact-limit real-token success and media rejection pass. Header-limit/final
boundary-log assertions after the timeout did not execute. Renderer writes but does
not explicitly flush. Proposed next fix: flush completed error responses and rerun
unchanged streaming test; hypothesis not yet verified, no timeout inflation/unbounded
draining. Not applied; awaiting guidance. Source compiles, full verify still fails.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
Integrated acceptance/commit/push/archive/migration remain pending/unperformed.

F04 architecture pause, 2026-10-14: owner-approved redundant CSRF call removed.
Compilation and 15 frontend/64 focused Java checks pass. Prepared packaged HTTP
cases using existing harness, including isolated-only 500 fixture and bounded
stream/header/log checks. Full Maven verify: 15 frontend tests pass; 185 Java cases
with one architecture failure and four explicit skips. Packaged tests did not run.
Cycle introduced by controller renderer dependency: i18n -> security -> i18n.
Recommended minimal next change: invalid-language controller raises a standard
message-free 400 ResponseStatusException, shared MVC advice renders it; remove
direct SafeHttpErrors dependency and null response return. Not applied; awaiting
guidance under error guardrail. Source compiles but architecture gate fails.
Task 2.5/2.6 incomplete, progress 10/16; integrated acceptance remains pending.
Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit/push/archive/migration; unrelated editor work preserved.

F04 error-slice API pause, 2026-10-14: simple cache test correction applied; Maven
verify passed 15 frontend tests, 162 Java cases (four explicit skips), 15 packaged
cases including successive watcher rebuilds. Task 2.3 done. Preference byte boundary
(2.4) complete; 15 frontend/59 targeted Java tests passed including exact 4096-byte
real-token acceptance, before-CSRF rejection and multiplicity-preserving forms.
Progress 10/16. Error slice 2.5 prepared but compilation fails: CsrfConfigurer has no
accessDeniedHandler method. Pinned bytecode confirms CSRF inherits exceptionHandling's
configured denial handler. Recommended next correction: remove only the redundant
CSRF call, retain shared exceptionHandling handler, rerun focused checks. Not applied;
waiting under error guardrail. Current source does not compile, no error-slice Java
or new packaged/browser result claimed. Canonical UH01 closure/integrated acceptance
remain pending; UH02/F04 blocked. Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit/push/archive/migration. Earlier cache/API handoffs below are historical.

F04 standard-cache test pause, 2026-10-14: owner approved simpler MVC caching.
Removed the custom commit wrapper; exact manifest resource paths now use standard
MVC CacheControl, preserving local no-store. Source compiles. Maven verify passes
15 frontend tests but reports one failure among 162 Java cases (four explicit skips):
cache directives are correct but exact-string assertion expects a different order.
Packaged tests did not run. Recommended test-only correction: simple split/directive
comparison with containsExactlyInAnyOrder, not a parser/extra abstraction. Not applied;
waiting under error guardrail. Task 2.3 remains open, progress 8/16. Previous compiler
blocker is historical. Evidence: `harness/evidence/F04-UH02-secure-http-responses.md`.
No acceptance, commit, push, archive or behavioural migration.

F04 owner-review/header/cache pause, 2026-10-14: owner confirmed actual browser 200%
zoom and language/visual result works/looks good; browser/version/viewport and
individual manual keyboard/JS-off observations unreported. Checklist 1.6 complete.
Focused pinned CSRF integration inspection (2.1) and document-header slice (2.2)
complete: 15 frontend and 39 targeted Java tests passed. Progress 8/16. Cache slice
2.3 prepared but Maven verify fails compilation: pinned commit-wrapper sendError
methods are final. Current source does not compile; no new JAR/browser result claimed.
Recommended next action: replace custom commit-wrapper caching with standard MVC
resource-cache settings, preserving error/local no-store, not nested wrappers.
Apply paused awaiting guidance. UH01 T01–T04 done/story in_review awaiting combined
integration; UH02 blocked with canonical prerequisite closure retained. F04 blocked;
body limits/safe errors/ASVS/final integration remain open. Evidence under
`harness/evidence/F04-UH01-locale-preferences.md` and `harness/evidence/F04-UH02-secure-http-responses.md`.
No commit, push, archive or ownership migration; unrelated VS Code changes preserved.
Earlier handoffs below are historical.

F04 selector review handoff, 2026-10-14: owner authorised the simple test correction
and requested no overengineering. One assertion now uses Playwright `allHeaders()`;
full browser rerun passed 46/46 Chromium cases, including ten real preference/forgery
cases and all shared/Home/component/keyboard/reflow/contrast regressions. Checklist
1.4/1.5 complete; progress 5/16. Last Maven verify passed 15 frontend tests, 156 Java
cases (four explicit skips) and 15 packaged cases; no production change afterwards.
Canonical UH01 T01–T03 done; T04/story and F04 blocked only on checklist 1.6 actual
browser-UI 200% zoom and owner visual/copy review. Instructions: `docs/delivery/locale-preferences.md`.
UH02 remains planned. Evidence: `harness/evidence/F04-UH01-locale-preferences.md`.
No final clean/full-feature acceptance, commit, push, archive or ownership migration;
unrelated `.vscode/settings.json` work preserved. Earlier failure handoffs are historical.

F04 resumed browser pause, 2026-10-14: owner approved real-token local test correction;
local and legacy Home tests now avoid synthetic `.with(csrf())` repository replacement.
Checklist 1.3 complete; progress 3/16. Maven verify passed 15 frontend tests, 156 Java
cases (four explicit architecture skips) and 15 packaged cases, including watch and
fixture regressions. Selector docs/tests/runner prepared; Chromium run passed 34/46
cases, including all ten native preference/forgery cases and keyboard/reflow/contrast.
Twelve shared-shell cases fail only at cookie-header assertion: Playwright `headers()`
omits cookie headers; official docs require `allHeaders()`. Proposed test-only fix
not applied; awaiting guidance under apply error rule. Checklist 1.4/1.5 remain open;
actual UI zoom/owner review and UH02 not done. F04/UH01/T02 remain blocked; prior
local-cookie blocker below is historical. Evidence: `harness/evidence/F04-UH01-locale-preferences.md`.
No clean final/health acceptance, commit, push, archive or ownership migration;
unrelated `.vscode/settings.json` work preserved.

F04 apply pause, 2026-10-14: `f04-security-and-locale-flow` has 2/16 tasks complete
(1.1 prerequisite record and 1.2 locale precedence). Native selector/cookie-CSRF/
preference POST are prepared, but task 1.3 remains incomplete. Initial targeted
verification passed 15 frontend and 59 Java tests; subsequent run passed frontend
checks/15 tests and 82/83 Java cases, with one local-cookie test error. Pinned
Spring Security `.with(csrf())` helper replaces the filter's cookie repository with
a test session repository, contaminating the loop's next GET. Proposed next action:
use genuine rendered cookie/masked token in the local HTTP/HTTPS test and verify
legacy helper isolation; not applied, awaiting guidance under the error guardrail.
Evidence: `harness/evidence/F04-UH01-locale-preferences.md`. F04/UH01/T02 blocked,
UH01/T01 done; other canonical tasks and UH02 remain planned. No browser/packaged/
final acceptance, commit, push or ownership migration. Prior planning and unrelated
`.vscode/settings.json` work preserved. Earlier handoffs below are historical.

F04 whole-feature proposal handoff, 2026-10-14: owner requested one planning-only
change for complete F04. `f04-security-and-locale-flow` contains proposal, two delta
specs (locale-preferences and secure-http-responses), design and 16 unchecked tasks,
preserving both stories' four requirement/acceptance IDs and ten canonical task IDs.
Strict change validation and all 15 planning-rule tests passed; planning evidence:
`harness/evidence/F04-openspec-proposal.md`. F04 and both stories remain planned and
plan-owned; no application code/main-spec edits, implementation, commit, push, sync
or archive. Existing `.vscode/settings.json` work preserved. Next is artifact review
and a separately requested apply workflow. F03 remains done and archived. Earlier
handoffs below are historical.

F03 archival handoff, 2026-10-13: owner requested F03-UH02 archive, confirmed
spec synchronisation (without behavioural ownership migration), clarified “close
F03” and authorised committing all remaining project changes locally. F03 remains
done (`0246b37` implementation, `968fc35` closure). All 11 tasks/artifacts complete;
shared-interface main spec contains exact delta behaviour and canonical headings.
Archived at `openspec/changes/archive/2026-10-13-f03-uh02-localised-shared-shell/`.
The previously approved F03-UH01 archive/main-spec ownership migration is included
in this archival commit too. F03-UH02 remains plan-owned; F04 unchanged. No application
changes, push or release. Earlier uncommitted/active-change statements are historical.

F03 accepted local closure, 2026-10-13: owner authorised finishing local commits and
closure. F03-UH02 implemented/integrated on local main in `0246b37`; canonical
T01–T05/story and F03 done against both accepted stories, passing clean verification
(15 frontend, 100 Java with four explicit skips, 15 packaged), 36 Chromium cases,
health smoke and recorded owner review decision. No source change after that test run.
Earlier F03-UH01 archival/migration edits remain preserved and uncommitted; closure
stages only F03-UH02 tracking in shared files. No push or automatic F03-UH02 sync/archive.
F04 remains planned; owner effort unreported. Next is separately authorised archival
or F04 planning, not automatic implementation. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
Earlier handoffs below are historical.

F03-UH02 verified apply handoff, 2026-10-13: shared-interface implementation and
acceptance checks pass under the owner's confirmed review decision (Home walkthrough
steps 1–3 passed; automated component coverage accepted instead of repeated manual
fixture review; browser/version/viewport details unreported). Final clean Maven passed
15 frontend tests, 100 Java cases (four existing explicit skips), 15 packaged cases
including F02 startup/watch regressions; original health smoke and all 36 Chromium
cases passed. Normal JAR excludes fixtures and preserves B bytes; scoped integration
review found no issues. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
Canonical T01–T04 done; story/T05 in_review pending formal local integration/closure.
No commit, push, archive or behavioural-ownership migration authorised/performed.
F03 remains in_progress, F04 unchanged, prior F03-UH01 archival changes preserved.
Owner effort remains unreported. Earlier handoffs below are historical.

F03-UH02 documentation check repaired, 2026-10-13: user authorised doc-only fixture
command correction; planning integrity, all 15 planning-rule tests, strict OpenSpec
validation and whitespace checks now pass. Progress remains 8/11. Next blocker is
actual browser-UI 200% zoom and human keyboard/visual/EN/ES/FR copy review under
checklist 4.2; instructions in `docs/delivery/shared-interface.md`. Final integration,
acceptance/closure and any authorised local commit remain open. No push or ownership
migration. Earlier handoffs below are historical.

Pause-time planning check, 2026-10-13: strict OpenSpec, 15 planning-rule tests and
whitespace checks passed. Planning integrity flags the Python fixture command in
`docs/delivery/shared-interface.md` as a Markdown link (dictionary-index/call syntax
false positive). Proposed doc-only fix is `module.get` call syntax; not applied yet.
Progress remains 8/11; actual manual review still required. Earlier handoffs follow.

F03-UH02 manual-review gate, 2026-10-13: checklist 1.1–4.1 complete (8/11);
canonical T01/T02/T03 done, T04 blocked on unexecuted actual browser-UI 200% zoom
and human keyboard/visual/EN/ES/FR copy review. All prior test harness failures repaired.
Latest non-clean Maven verification passed 15 frontend tests, 100 Java cases (four
explicit architecture skips), 15 packaged cases including F02 startup/watch regressions;
36 Chromium Home/component/locale/keyboard cases passed. Shared styles/fragments/native
button/resources implemented; focused skip link inset avoids clipped outline.
No final clean verification, health smoke, owner acceptance/integration/commit/push or
ownership migration claimed. Final checklist 4.2/5.1/5.2 remain open. Prior Home
archival changes preserved and F04 excluded. Evidence/manual instructions:
`harness/evidence/F03-UH02-shared-shell.md`, `docs/delivery/shared-interface.md`.
Earlier handoffs below are historical.

F03-UH02 locale-test pause, 2026-10-13: user authorised no-JS oracle correction;
all 12 Chromium Home/component cases now pass, including six component cases across
EN/ES/FR with JavaScript on/off. Checklist 2.3 complete; progress 4/11.
New checklist 2.4 assertions: 20 Java cases ran, four exact-locale cases failed because
the test helper entity-encodes Unicode whereas Thymeleaf emits correct UTF-8.
Synthetic parity and button escaping checks passed; integration tests did not run.
Proposed fix: explicitly UTF-8-aware test escaping, no production change. Apply paused
awaiting guidance. No acceptance/commit/push; earlier handoffs below are historical.

F03-UH02 resumed verification, 2026-10-13: user authorised fixture-only bean rename;
startup collision resolved with `shellFixtureFilterChain`. Targeted Maven verification
again passed 15 frontend, 14 Java rendering/component and 15 packaged cases.
Browser verification now runs: nine passed, three JavaScript-disabled component cases
failed on a test-only JavaScript click-counter oracle that cannot execute callbacks
when JavaScript is disabled. Apply paused at 3/11 checklist tasks complete; proposed
next action is separate JS-enabled event counting from native state/no-submission
assertions in JS-disabled cases, retaining all locales/cases and scope.
No acceptance/commit/push; prior archival work preserved. Earlier handoffs are historical.

F03-UH02 apply paused, 2026-10-13: `f03-uh02-localised-shared-shell` has 3/11
checklist tasks complete (1.1, 2.1, 2.2). Shared tokens/styles and real Home card/header
fragment extraction are verified; native button and isolated component fixture are
partially implemented. Targeted Maven verification passed 15 frontend tests, 14 Java
rendering/component cases and 15 packaged cases. Browser runner failed before tests:
fixture configuration class/method collide on `shellFixtureSecurity` bean name.
Proposed next action is rename the fixture-only bean method and repeat verification;
workflow paused awaiting guidance. Evidence: `harness/evidence/F03-UH02-shared-shell.md`.
No new acceptance, commit, push or ownership migration. Prior F03-UH01 archival work
preserved; F04 excluded. Earlier handoffs below are historical.

F03-UH01 archive handoff, 2026-10-13: accepted/integrated F03-UH01 remains done
(`f2a3e3c`, closure `baf975c`). Owner requested archive and explicitly selected sync
and incremental ownership migration. `openspec/specs/home-page/spec.md` now owns
its two requirements/scenarios; plan.json retains IDs/verification/tracking. Complete
13-task change archived at `openspec/changes/archive/2026-10-13-f03-uh01-home-page/`.
No application changes or push. Archival metadata remains uncommitted. F03 remains
in_progress, F03-UH02/F04 remain planned and plan-owned. Next is an F03-UH02-only
proposal, not automatic implementation. Earlier handoffs below are historical.

F03-UH01 accepted local closure, 2026-10-13: **F03-UH01 and T01–T05 are done**.
The owner accepted the Home result and explicitly authorised local commits/closure.
Implementation integrated on local main in `f2a3e3c`. Post-commit clean verification
passed 15 frontend tests, 90 Java cases (four explicit skips), 15 packaged cases,
six Chromium cases and the original executable health smoke, with no failures/errors.
The working tree was clean before/after verification. Closure metadata is recorded
separately. Owner acceptance does not invent individual manual-test results; disclosed
browser-UI/assistive-technology limitations remain. F03 is still in_progress;
F03-UH02/F04 remain planned. No push, remote CI, OpenSpec sync/migration or archive.
The completed OpenSpec change remains active; F03-UH01 behaviour stays plan-owned.
Actual owner effort unreported. Evidence: `harness/evidence/F03-UH01-home-page.md`.
Next story is F03-UH02 only when requested. Earlier handoffs below are historical.

F03-UH01 verified review handoff, 2026-10-13: SSR Home, approved unchanged B
composition, resource-backed EN/ES/FR copy, publication-aware navigation and bounded
anonymous read security are implemented. Canonical T01–T04 done; T05/story in_review
pending owner acceptance/local integration. Clean verification passed 15 frontend
tests, 90 Java cases (four explicit absent-capability skips), 15 packaged cases,
original executable health smoke and six real Chromium cases. Both unavailable
navigation and mapped/public fixture transitions pass; no tools/learning placeholders
ship. Chromium verifies JavaScript-disabled rendering, keyboard/reflow/contrast and
200% CSS layout zoom; independent owner translation/visual, browser-UI zoom and
assistive-technology review are not claimed. No commit/push/archive/ownership migration
or remote CI. F03 remains in_progress; F03-UH02/F04 remain planned. Owner effort
unreported. Evidence: `harness/evidence/F03-UH01-home-page.md`; local reproduction:
`docs/delivery/home-page.md`. Supersedes the historical compile-error pause below.

F03-UH01 apply pause, 2026-10-13: `f03-uh01-home-page` is 4/13 checkboxes
complete. T01 inspection and first rendered Home/navigation/resource slice passed
10 MVC and 15 frontend tests. Minimum shared styling/logo and bounded security
wiring are prepared but unverified. The next focused run failed test compilation:
`HomeSecurityTests` uses a nonexistent `MockHttpServletRequestBuilder.dispatcherType`
method. Proposed correction is a request post-processor calling `setDispatcherType`.
Paused awaiting guidance as required by apply; T02/story blocked, T03–T05 unfinished.
No browser/packaged/security acceptance, commit, push, archive or ownership migration.
F03-UH02/F04 remain planned; F02 remains done. Evidence:
`harness/evidence/F03-UH01-home-page.md`. Earlier handoffs below are historical.

F02 final handoff, 2026-10-13: **F02 is done**. F02-UH02/T01–T05 were explicitly
accepted by the owner and integrated on local main in `b1fb149`; F02-UH01 remains
accepted/integrated in `938b97c` and archived. Post-commit clean verification passed
15 frontend tests, 65 Java cases (7 explicit absent-capability skips), 15 packaged
cases; original executable health smoke passed. Both requirements/scenarios and
pure-layer import boundaries are evidenced in `harness/evidence/F02-UH02-local-assets.md`.
Local watch uses a single Spring origin, per-render manifest reload and direct
generated files, without HMR. Non-local/mixed-profile filesystem configurations
fail safely before startup binding. Owner-approved VS Code workspace auto-build
is disabled; explicit Maven owns builds. F02-UH01 behaviour is OpenSpec-owned;
F02-UH02 stays plan-owned. No push/remote CI/publication or F03 start. Next feature
is F03 only when requested. Earlier handoffs below are historical.

F02-UH02 implementation update, 2026-10-13: local build-watch serving and
per-render manifest reload are implemented; production/mixed-profile filesystem
rejection and pure algorithm/domain lint checks are verified. Clean verification
passed 15 frontend tests, 65 Java cases (7 explicit skips) and 15 packaged cases.
The real watcher served FIRST/SECOND/THIRD matching JS/CSS bytes through one
unchanged server. T01–T04 done; story/T05 in_review pending acceptance and local
integration. F02 remains in_progress. No new commit/push/OpenSpec migration yet;
F02-UH02 behaviour stays plan-owned. Evidence:
`harness/evidence/F02-UH02-local-assets.md`. Supersedes earlier UH02-planned handoffs.

Final handoff, 2026-10-13: F02-UH01 and T01–T05 are **done**, explicitly accepted
by the owner and integrated on local main in `938b97c`. Clean post-commit checks
passed: 1 frontend, 54 Java cases (7 explicit absent-capability skips), 9 packaged
cases; health smoke passed. The main OpenSpec specification owns this story's
behaviour (ADR 004); plan.json owns tracking. Change archived under
`openspec/changes/archive/2026-10-13-f02-uh01-frontend-assets/` after verifying
exact synchronisation and all 12 task checkboxes. F02 remains in_progress;
F02-UH02 remains planned. Next authorised work has not been requested; do not start
F02-UH02 automatically. No push/remote CI/publication occurred. Evidence:
`harness/evidence/F02-UH01-integration.md`. Earlier updates below are historical.

Integration update, 2026-10-13: owner accepted F02-UH01 and authorised local
commits including related OpenSpec setup/proposal, synchronisation and archival.
The role-validation review finding is fixed and regression-tested. Clean verify
passed 1 frontend test, 54 Java cases (7 explicit skips) and 9 packaged cases;
health smoke passed. Fifteen planning tests and strict main-spec validation pass.
F02-UH01's main OpenSpec spec now owns behaviour; plan.json retains IDs/tracking
(ADR 004). Local integration/closure is being recorded; F02-UH02 remains planned,
F02 remains open. No remote publication authorised. See
`harness/evidence/F02-UH01-integration.md`. This supersedes prior handoff statements.

F02-UH01 local verification update, 2026-10-13: both owner-approved corrections are implemented, and the frontend/Maven/private-manifest slice is locally verified. Repeated `clean verify` passed: 1 frontend test, 51 Java tests (0 failures/errors, 7 explicit absent-capability skips) and 7 packaged integration tests (0 failures/errors/skips). Packaged SSR/HTTP assets, authenticated private-manifest 404s, four safe startup-failure mutations and the original health smoke all passed. T01–T04 are done; F02-UH01/T05 are in_review because the slice is uncommitted/unintegrated and final acceptance is not claimed. F02 is in_progress; F02-UH02 remains planned. All 12 OpenSpec checklist items are complete, including evidence-backed status updates without claiming integrated closure. Both renderers, planning integrity, 11 planning-rule tests, strict OpenSpec validation and whitespace checks passed. See `harness/evidence/F02-UH01-frontend-assets.md` and `docs/delivery/frontend-assets.md`. No commit/publication/archive or behavioural-ownership migration is authorised/performed; plan.json remains authoritative. This update supersedes the historical pause/proposal observations below. Next action is integration/owner review of this verified slice, not automatic F02-UH02 implementation.

F02-UH01 apply update, 2026-10-13: explicit implementation authorised for `f02-uh01-frontend-assets`; T01 is done and OpenSpec progress is 1/12. Exact frontend pins/lockfile, local tooling, minimal source/build test and initial Maven wiring are prepared. Type/lint/format checks passed, but the Vite-build test and Maven returned exit 1 because Vite 8 rejects `../asset-manifest.json`. Apply is paused as required by the workflow; F02/F02-UH01/T02 are blocked, remaining tasks/stories are unfinished. Recommended correction is to emit from `target/frontend/`, place assets under `static/assets/` and keep the manifest at the output root, updating test/path mapping coherently. A second blocker is the planning validator's unrestricted Markdown scan of downloaded `target/`/`node_modules` documentation; generated/dependency-tree exclusions need regression coverage. Both renderers, strict OpenSpec validation, 10 planning-rule tests and whitespace checks passed, but full planning integrity failed on those third-party links. See `harness/evidence/F02-UH01-frontend-assets.md`. No resolver, packaged acceptance, commit, publication or behavioural migration is claimed; this update supersedes the proposal-only observations below.

OpenSpec proposal update, 2026-10-13: `f02-uh01-frontend-assets` now contains the proposal, `packaged-browser-assets` delta, design and tasks for F02-UH01. Strict validation and planning checks passed; see `harness/evidence/F02-UH01-openspec-proposal.md`. This supersedes the setup-only observation below that no change exists. No application implementation or behavioural-ownership migration occurred; plan.json remains authoritative, F02 remains planned and all implementation checkboxes are unfinished. Review the artifacts before explicitly requesting `/opsx-apply f02-uh01-frontend-assets`.

OpenSpec setup update, 2026-10-13: existing CLI 1.14.1 verified; project initialised with OpenCode integration (six skills and six commands), English artifacts and the spec-driven schema. See `harness/evidence/openspec-setup.md`. No proposed change or behavioural migration has been created; plan.json remains authoritative and F02 remains planned.

As of 2026-10-09: F00 import accepted; F01 Java baseline implemented, integrated and accepted. Final closure metadata is prepared on feature/F01-close-baseline with owner approval for the local commit; publication needs separate approval. Product features have not been implemented.

- F00 and F00-UH01 accepted by current import/preservation review; all four tasks done. Historical pre-import hashes and the original archive were not supplied; see evidence limitations.
- Actual Java/javac: Arch Linux OpenJDK 25.0.4.1. Maven: 3.10.0 through Wrapper 3.3.4. Spring Boot: 4.1.1. POM version: 0.1.0-SNAPSHOT, JAR packaging, prescribed generated starters/tests preserved.
- F01, both required stories and all ten tasks are done in the locally updated canonical plan. T05 records review of both approved merges and final main CI. Owner explicitly accepted the Java-baseline scope while retaining audited repository-governance findings as unfinished follow-ups; no wider security/release acceptance is implied.
- Local clean verification, ./mvnw verify and ./mvnw package pass. Executable target/beneath-the-code-0.1.0-SNAPSHOT.jar starts on loopback and returns health UP. Controlled test correctly returned Maven exit 1, then was removed.
- Wrapper checksum correction is integrated via PR #2, main 487220a8eb7f0f5df2a08686c9442007a7e19a4e. ZIP identity matched published SHA-512; SHA-256 1f6d9909266510f039f59aa0e13dcd2c66da85f043e56276e41f2918f8bddaff is pinned. Separate fresh caches accepted correct pin (exit 0) and rejected wrong pin before install (exit 1), verified locally. scripts/check-maven-wrapper.py is repeatable; warm caches bypass download validation; ZIP pin requires unzip. The PR and post-merge Java workflow passed on the integrated configuration.
- ArchUnit 1.4.1 checks inward dependencies, framework-free core, adapter separation, cross-capability adapters, bootstrap/root wiring and cycles. 24 fixture tests pass; eight future production checks explicitly skip absent packages. No production placeholders added; entry point remains dev.beneaththecode.
- Initial workflow: .github/workflows/java.yml, PRs and main pushes, SHA-pinned actions, read-only token, no persisted checkout credentials. GitHub runs verified Temurin-25.0.4.1+1, Maven 3.10.0 and Boot 4.1.1; the SemVer pin 25.0.4+101.0.LTS resolved correctly. PR #1 runs: 37960330981 passed, 37960668718 failed on the approved test-only domain-Spring mutation, 37961154337 passed after removal. Both passing runs verified 34 tests, zero failures/errors, 8 explicit skips, JAR health UP and planning checks. No repository settings were changed.
- Known warnings: missing Thymeleaf templates, generated development Security password (redacted), Mockito/Byte Buddy dynamic agent and JVM class sharing; GitHub warns that the pinned actions target Node.js 20 and are forced onto Node.js 24. Action/setup steps and restored verification pass. The earlier target-local Maven-cache error remains documented and resolved.
- GitHub CLI is authenticated for ziuld. PR #1 merged at main 4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278; PR #2 merged at main 487220a8eb7f0f5df2a08686c9442007a7e19a4e. Latest main CI 37963939987 passed (34 tests, zero failures/errors, 8 skips, JAR health UP, planning checks). Local main and origin/main match that integrated revision. Current local branch feature/F01-close-baseline contains only closure documentation; its commit hash belongs in the final handoff. Branch push/PR creation still require separate owner approval.
- Planning retains EPIC-MVP → F00–F16 → 36 UH stories → 190 tasks, with 72 EARS requirements and 72 linked Gherkin scenarios. Capacity remains 10 owner hours/week; no committed start date. Actual owner time is unreported, not inferred from estimates.
- Architecture and approved B identity preserved. F02/frontend, pages, controllers, templates, product behavior, OpenSpec and Cucumber have not been started.

Final acceptance: `harness/evidence/F01-closure.md`, backed by baseline, CI and wrapper-checksum evidence under `harness/evidence/`; task records under `harness/tasks/`. Historical sections retain earlier observations; final integration sections record subsequent merges/acceptance. Closure documentation is local only; no closure-branch push or PR creation is authorised yet.

Next planned task: **F02-UH01-T01** — read the frontend feature/story requirements and confirm prerequisites/evidence when the owner authorises F02. Its plan status remains planned; no F02 work has started. Unfinished security-reporting/contact, issue-template, dependency-update, main-protection/required-check and action-runtime follow-ups are recorded with owner/next decision in docs/planning/risks-and-decisions.md; no settings or automation were changed by closure.

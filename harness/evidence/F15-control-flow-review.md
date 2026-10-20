# F15-UH02 — Control flow and tracing review candidate

Date:2026-10-20. Current status: owner-approved and closed; see acceptance/commit records below.
Earlier pending-review statements describe the candidate checkpoint.
Prerequisite UH01 was explicitly approved (“Approved continue”) and closed with
implementation b2e2407 (full identity in the first lesson evidence); closure records
are in F15-values-types-review.md. Planning initially caught a missing T06 evidence
link; corrective commit8ed464e restored passing integrity before UH02 implementation.
This candidate does not imply approval of new content. F15 remains partial; its
other5 stories are deferred. No new commit/push/PR/deployment for UH02 yet.

## Bounded lesson brief

Audience: learner who has completed source-to-JVM and values/types. Outcome: trace
if/else, bounded for and while loops using initial values, condition, body, update
and final false test. Explain strict/inclusive boundaries, zero/one/multiple
iterations, loop-local scope and termination without assuming unbounded int
arithmetic. Original worked program, trace diagram/table, exercise, reasoned answer
and understanding questions are complete in EN/ES/FR. The missing-update variant
is explained but intentionally never executed. No switch/streams/advanced control,
object model expansion, new compiler service, CMS or complete-course gate.

Primary reference: [Java25 JLS14](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html),
sections14.9,14.12 and14.14.1. Code/prose/diagrams are original teaching material.
The catalogue now orders source-to-JVM → values/types → control flow. Course
summary/outcomes and EN/ES/FR scope text honestly report3 units, not a full course.

## Actual verification

- Full Maven verify PASS:260 Java/unit/architecture tests and17 packaged integration
  tests,0 failures/errors/skips;185 frontend tests plus type/lint/i18n and bundle.
  Baseline JDK25.0.4.1/Boot4.1.1 with the F17 Tomcat/Jackson security patches retained.
- LearningLessonExamplesTests extends the previous numeric test to both selected
  lessons. It compiles/runs all12 actual Markdown Java blocks across EN/ES/FR and
  compares published numeric output and translated source parity. Four additional
  terminating variants verify boundary answers. A renamed obsolete generated test
  class/report was removed project-locally so it could not inflate the current run.
- ControlFlowTrace output, successive lines:1 1;2 3;3 4;4 8;8.
  ControlFlowExercise:4;14. Verified variants:for with n<4 ends at total4;
  while with n<=4 prints5;18; initial n=4 prints4;0; initial n=3 prints4;3.
  No deliberately nonterminating variant was run; process execution has a timeout.
- Published loader/MVC checks PASS for all3 catalogue identities, complete answers,
  locale-preserving previous/next links, HEAD, safe rendering and absent editor
  enhancement. Existing empty/single/multi/draft/hostile fixture checks retained.
- Full packaged Chromium suite137/137 PASS,0 skipped/flaky/unexpected. Both F15
  lessons exercised in EN/ES/FR with JS enabled/disabled, keyboard previous/next,
  CSRF-protected locale return, no session/storage/editor/processing traffic,
  no page errors, narrow reflow and CSS zoom2 screenshots. Normal-JAR identity,
  fixture isolation and real/fixture content boundaries remain checked.
- CSS zoom2 is automated layout evidence, not actual200% browser zoom or human
  visual/content acceptance. Owner review of this new unit remains pending.
- Actual security scan PASS:0 findings,0 blockers, active policy none. All45 main
  Java/TypeScript sources; POM70, shipped Java60, frontend npm166/browser npm5.
  Databases `2026-10-20T13:14:22.737606427Z` and
  `2026-10-20T00:59:02.286523053Z` satisfy the unchanged24h gate. No renewal/waiver.
- Security policy20/planning rules23 PASS; main OpenSpec strict15/15 PASS.
  Both planning renderers and integrity/link checks PASS; git diff --check PASS.

Packaged JAR SHA256:
`f874c9c80000e70e0bad37c07bfd8bd7fc629d93f309ae6b7c18037b6f5eb73b`.
Local detailed logs:target/f15-flow-maven.log, target/f15-flow-chromium.log,
target/browser-results.json, target/f15-flow-security.log and
 target/security/summary.json. Ignored diagnostic files remain local.

## Owner review and handoff

Review explanation, trace, exercise and all reasoned answers in EN/ES/FR; check
reading/navigation at narrow/wide sizes and actual200% browser zoom. T05 requires
an actual owner decision. UH01 acceptance does not cover this candidate. T06 and
first push/PR follow this review and relevant checks. Keep F15 open for deferred
stories; do not label the complete course delivered.

Preview RUNNING, loopback/local-profile:
http://127.0.0.1:41511/learn/java-fundamentals/control-flow-tracing?lang=en
Also lang=es/fr or native selector. PID188609, exec session43863; log
 target/f15-flow-preview/server.log. Earlier values-only preview is no longer
running. Local preview is distinct from normal packaged-JAR browser evidence.
Stop this preview after review when no longer needed. A detached start was not
retained by the execution environment; only the verified managed session above
is claimed running.

Screenshots:target/f15-flow-<en|es|fr>-narrow-js-<true|false>.png and
 target/f15-flow-<en|es|fr>-css-zoom.png. No templates/CSS/algorithms changed;
visual redesign remains F18. No Firefox/WebKit/Safari/container checks or system
installation performed. No remote CI pass or new owner observations invented.
Actual owner effort remains unreported.

## Owner acceptance,2026-10-20

The owner explicitly replied “Approved” to the concrete EN/ES/FR lesson and
reading/navigation review request. This accepts F15-UH02 only; no detailed
observations are supplied or invented. T05 is complete. T06 records the scoped
local implementation commit and final integration review before the authorised
push/PR. The other five F15 stories remain deferred, not completed.

F15-UH02 CLOSED: all6 tasks complete; implementation commit `2f3abf373ec0261654703ec84b5f8176f53adcc6`.
Selected F15-UH01/UH02 accepted; feature stays planned for its deferred five
stories, not done and not active WIP. First push/PR is authorised now.

Final acceptance/package refresh and PR handoff:see [first V2 delivery](V2-first-delivery-pr.md).
Reviewed preview stopped; earlier running/pending statements are historical.

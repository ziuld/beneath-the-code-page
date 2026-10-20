# F15-UH01 — Values, types and numeric limits review candidate

Date:2026-10-20. Current status: owner-approved and closed; see the acceptance
and commit records below. Earlier pending statements describe the review checkpoint. This is the first of the two selected ADR010 stories. F15-UH02 remains
planned until its prerequisite is accepted; UH03–UH07 remain deferred. F15 as a
whole is not done. No new lesson acceptance, commit, push, PR or deployment claimed.

## Lesson brief and scope

Audience: learner who has read source-to-JVM, no programming background assumed.
Outcome: identify primitive/reference values, predict int overflow and the effect
of widening before/after evaluation, explain integer division and binary decimal
approximation. Eight primitive types and signed numeric limits are introduced;
char is a UTF-16 code unit, not necessarily a whole Unicode character. Diagrams
are conceptual, not claims about stack/heap placement. Ordinary integer addition
wrapping is distinguished from an exception. No object-mutation or full-course
syllabus is introduced. Two original runnable programs, an exercise with explicit
reasoned answer and understanding questions are complete in each language.

Primary references checked: [Java25 JLS4](https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html),
[division](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.17.2),
[numeric addition](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.18.2).
Original examples/prose; no copied lesson, external illustration or new licence grant.

## Actual verification

- Full Maven verification PASS:258 Java/unit/architecture tests and17 packaged
  integration tests,0 failures/errors/skips;185 frontend tests and retained
  type/lint/i18n checks/bundle. JDK25.0.4.1; Boot4.1.1 with F17 security patches.
- NumericLessonExamplesTests compiles and executes both actual Markdown Java
  blocks in all3 locales using --release25. Code and numeric output blocks match
  across translations and actual execution matches the displayed output.
  NumericValues: -2147483648,2147483648,-2147483648,2,2.5,
  0.30000000000000004, then7 9 on successive lines.
  NumericExercise: -294967296,4000000000,2.0 on successive lines.
- Published loader/MVC checks verify exact two-unit order and both native
  previous/next links, complete answers, safe rendering and locale identities.
  Empty/single/multi/draft/hostile synthetic fixtures are retained.
- Browser harness initially stopped on its obsolete source-to-JVM-only guard;
  no test results were claimed for that attempt. It now requires source/JAR
  catalogue equality, valid unique identities and all published locale resources,
  retaining fixture-leak/duplicate-entry and unchanged-normal-JAR checks.
- Full Chromium suite PASS:131/131,0 skipped/flaky/unexpected. Normal packaged
  app and separate copied synthetic fixture exercised. Six new EN/ES/FR JS-on/off
  cases verify ordered keyboard navigation, answers, locale return, no page errors,
  no processing worker/network/storage and narrow reflow. Fixture checks retained.
- Added screenshot/enlarged-text assertions then reran the affected6 cases:
  6/6 PASS against the normal local-profile preview. CSS zoom2 was automated;
  this is not an actual200% browser-zoom or human accessibility acceptance claim.
- Actual security gate PASS:0 findings,0 blockers, active policy none;45 main
  Java/TypeScript sources, inventories POM70/JAR60/frontend166/browser5. Database
  timestamps: `2026-10-20T13:14:22.737606427Z` and
  `2026-10-20T00:59:02.286523053Z`;24h freshness rule unchanged. No disposition renewal.
- Security policy20/planning rules23 PASS; main OpenSpec strict15/15 PASS;
  both planning renderers and integrity/link checks PASS; whitespace diff PASS.

JAR SHA256: `d7ff44007e625a3d3855849939c8c3062d03f42e6f3a08922009c703e7ecf02d`.
Local logs:target/f15-values-maven.log, target/f15-values-chromium.log,
target/f15-values-full-browser-results.json, target/f15-values-reading-layout.log,
target/f15-values-security.log and target/security/summary.json. Final scan retains
input hashes; ignored diagnostic files are not published source/secret excerpts.

## Historical candidate review and preview

F15-UH01-T05 requires actual owner review of explanation, exercise and reasoned
answer in EN/ES/FR; previous F16 approval does not apply. Review clarity, technical
accuracy, translation completeness, previous/back links and reading at narrow/wide
sizes and actual200% browser zoom. No owner decision or detailed observation invented.
T06 closure/real commit follows that acceptance; F15-UH02 follows accepted UH01.

Loopback-only preview RUNNING: http://127.0.0.1:37907/learn/java-fundamentals/values-types-numeric-limits?lang=en
Use lang=es/fr or the native selector. PID174802, exec session50649; log
 target/f15-values-preview/server.log. Local-profile preview is separate from
packaged browser evidence. Keep running for review, then stop when no longer needed.
Screenshots:target/f15-values-<en|es|fr>-narrow-js-<true|false>.png and
 target/f15-values-<en|es|fr>-css-zoom.png. Existing breadcrumb spacing is unchanged;
visual redesign remains F18, not part of lesson authoring.

No main Java/TypeScript algorithm/template/CSS changes or system installs. No
Firefox/WebKit/Safari/Docker runs. Actual owner effort unreported.

## Owner acceptance,2026-10-20

The owner explicitly replied “Approved continue” to the concrete EN/ES/FR content
and reading-review request. This accepts F15-UH01 only; no detailed observations
are supplied or invented. T05 is complete. T06 records the scoped local commit
and integration review before the dependent control-flow story starts. Earlier
pending-review statements describe the candidate checkpoint, not current status.

F15-UH01 CLOSED: all6 tasks complete; implementation commit `b2e240760ac93d3b09acde88935debb4a7e35c0c`.
Owner approval applies to this lesson; F15 remains partial with UH02 next.
The earlier running preview is superseded when the control-flow candidate starts.

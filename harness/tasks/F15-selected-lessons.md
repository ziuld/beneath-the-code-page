# Task — F15 selected Java lessons

Status / owner / date: F15-UH01 accepted; F15-UH02 in progress / Ziuld with AI / 2026-10-20.

Authorised outcome: ADR010 selects only F15-UH01 values/types/numeric limits and
F15-UH02 control flow/tracing. Other five stories stay deferred. First push/PR
follows the two reviewed lessons; no design changes now.

Read: AGENTS, current handoff, architecture/feasibility, F15 requirements/scenarios/
ordered tasks, immutable content loader/navigation, Markdown/rendering policy,
real/fixture Java/browser tests and local learning-content guide. F14/F17 accepted.
Reference: Java25 JLS4 (types/values) and15.17.2/15.18.2 (division/overflow).

Steps: establish bounded first lesson brief; draft EN/ES/FR explanation/diagram,
worked example, exercise/answer; compile every Java block on baselineJDK and compare
all translations' code/output; add to local review catalogue; verify actual ordered
navigation, locale return paths and no-JS reading; full build/Chromium/security/
planning checks; concrete owner content/language review before first story closure.
Only then complete the dependent second story and repeat its acceptance checks.

Privacy/accessibility: static content only, existing safe renderer and templates;
no online compiler, uploads, storage, JS features or CSS changes. Long ranges/code
must reflow or scroll without whole-page overflow. Explicit same-page answers.

Acceptance: canonical F15-UH01-R01/R02/AC01/AC02; T05 requires actual human
EN/ES/FR review. No earlier F16 approval applies to this new content. Record
technical results separately from pending owner acceptance. Actual effort unreported.

Evidence: harness/evidence/F15-values-types-review.md. Next: prepare verified preview.

Owner accepted UH01 on2026-10-20 (“Approved continue”). Read UH02 requirements,
scenarios and tasks; prerequisite is accepted. Next unit brief: trace if/else and
bounded for/while loops, include initial/test/body/update/final-test states, boundary
cases and termination reasoning. Exclude switch/patterns/streams and unsafe
infinite-loop exercises. Use original examples and complete EN/ES/FR answers.
References: Java25 JLS14.9,14.12,14.14.1. Next: author and verify UH02.

UH02 candidate technical checks complete: Maven260+17/185 frontend, Chromium137,
security0 findings/0 exceptions, policy20/planning23/strict15 PASS. T05 actual
EN/ES/FR review pending; evidence:harness/evidence/F15-control-flow-review.md.
Preview41511/PID188609/session43863. After approval close the selected story and
prepare the authorised first push/PR, keeping the other5 F15 stories deferred.

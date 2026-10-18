# F07-UH02 — JSON Minifier evidence

Date: 2026-10-18. Status: accepted; F07 complete with documented ADR008 test debt.

## Final integrated acceptance

Verified exact runtime/test publication head
`770aa98ea3ceafe7e7678c3e35109ec844d1d925`:
- [Ubuntu Java CI](https://github.com/ziuld/beneath-the-code-page/actions/runs/39117056490): success.
- [Ubuntu packaged browser CI](https://github.com/ziuld/beneath-the-code-page/actions/runs/39117056486): success.
- Actual clean Maven:185 frontend tests,207 Java cases(three existing architecture
  skips),17 packaged integration tests, BUILD SUCCESS.
- Chromium110/110, Firefox64/64, WebKit61 passed/3 skipped. Skips are the existing
  owner-authorised Validator module-reload TODOs BTC-F07-WK-01, not passes.
- Local packaged Chromium110/110 and health pass on the same publication source.
- All three EN/ES/FR Home→Tools→Minifier journeys and exact three-tool catalogue
  checks pass. Retained Formatter/Validator/foundation regressions remain active;
  no V2/Learn publication, dependency, CSP or production-budget relaxation.

Review of integrated diff/evidence confirms both UH02 scenarios, deliberate
current-result Copy/stale gating, Clear/history, real worker fidelity, diagnostics
and action privacy. Owner accepted the supplied manual checklist; actual browser
environment/build identity unreported, no automated or speech-review substitution.
Shared manager/session tests establish deadline/output-budget/clipboard-race
behaviour; no expanding-minifier fixture or measured coverage percentage claimed.

Canonical UH02 tasks and F07 close on this evidence; OpenSpec14/14 after final
planning checks. Actual hours remain0/unrecorded, not an invented elapsed estimate.
Next authorised MVP candidate is reduced F12; it is not started. No merge/release,
main-spec sync or archive performed. Earlier pending-result notes are historical.
Full CI log: `/tmp/opencode/f07-final-ci-browser.log`.

Closure checks executed: regenerated both planning views; planning integrity and
closure rules pass,21 planning-rule tests pass, strict OpenSpec9/9 and whitespace
pass. Checklist14/14. Follow-up closure edits touch documentation/planning only;
no runtime or test changes after verified770aa98. Commit/push of these acceptance
records remains within the owner's explicit draftPR7 delivery authorisation.

## Baseline and scope

Owner accepted the supplied Minifier review checklist with "perfect, continue"
after preview readiness/URL and requested Copy/Clear, invalid input, Clear/Back,
keyboard, narrow layout, actual200% zoom and EN/ES/FR review. This is owner-reported
acceptance, not agent-observed browser interaction. Browser/version/OS/viewport and
exact build identity remain unreported. The offered verified preview JAR hash is
recorded below. Acceptance does not itself establish a passing automated test or
authorise merge/release. Published the labelled Tools link for changed-state
verification; Minifier closure still awaits actual integrated evidence.

UH01 accepted at ab2f956 with actual three-engine results and three owner-approved
WebKit reload TODOs (ADR008). Existing local closure documentation is preserved.
Minifier reuses strict validation, the same worker, session and text-only output/
explicit Copy/Clear lifecycle. It concatenates original non-trivia scanner slices;
no parse/stringify, regex whitespace deletion or dependency/CSP/runtime-policy change.

## Verification plan

- Algorithm/protocol: all roots, exact number/duplicate-key/escape/string fidelity,
  idempotence, complete invalid input rejection, shared byte/depth limits and
  valid compact documents whose pretty output exceeds8MiB.
- Reuse existing session/manager tests for cancellation, deadlines, output budgets,
  clipboard failure/races and disposal; add minifier dispatch/current-result proof.
- MVC: EN/ES/FR SSR, exact GET/HEAD, CSRF preference return, method denial,
  no-session/no-store/CSP; catalogue still excludes Minifier before acceptance.
- Packaged browser: real worker fidelity, stale Copy gating, diagnostics, Clear/
  Back, failure/retry and all-action privacy/CSP. Important cross-engine checks
  remain; do not reopen the bounded WebKit reload investigation.

No passing checks, owner acceptance or measured coverage percentage claimed yet.

## Implementation and initial verification

Added `algorithms/minifier.ts`, explicit `json-minify` protocol/session selection,
the third lazy workspace mode and exact minifier page/security/locale/log identities.
Shared status fragment accepts an explicit minification flag for translated ready/
stale/current text. EN/ES/FR page has no indentation or submitting tool form;
Copy/Clear/output use the existing ownership and disposal code. Catalogue unchanged.

Added algorithm/protocol/session/MVC tests and four focused browser cases (three
locale privacy/fidelity/Copy/Clear histories plus no-JS/worker retry). Existing
manager/session coverage remains authoritative for shared deadlines/output budgets/
clipboard races; no redundant production minifier output-expansion case invented.

First Maven attempt passed frontend checks but compiled old HomeSecurity route
negative assertions before their update; two stale negatives failed. Those source
assertions now require the real minifier route and still deny V2/unlisted routes.
Rerun pending. Logs `/tmp/opencode/f07-minifier-maven.log` and
`/tmp/opencode/f07-minifier-maven-fixed.log`. Browser download project-local only;
no privileged/system dependency install. No acceptance inferred from tests authored.

## Executed build and health results

Final local packaged Chromium succeeds: **110/110**, including all three Minifier
catalogue journeys, locale fidelity/Copy/Clear/privacy and no-JS/worker retry cases,
with retained Formatter/Validator/foundation regressions. Log:
`/tmp/opencode/f07-final-chromium.log`. Ubuntu cross-engine/clean-CI result pending.

Delivered `770aa98ea3ceafe7e7678c3e35109ec844d1d925` to existing draftPR7 under
explicit owner approval. Final local publication health passes; Chromium running.
Ubuntu Java39117056490/browser39117056486 confirmed running at this exact head,
watchers active. No new-head CI or browser pass inferred from running workflows.
PR updated to include Minifier, owner reviews and explicit WebKit TODO debt.

Final three-link catalogue candidate also passes normal Maven verify:185 frontend,
207 Java cases(three existing skips),17 packaged integration tests. Log
`/tmp/opencode/f07-final-publication-maven.log`. Packaged Chromium/health running.
Owner explicitly authorised committing/pushing Minifier and acceptance records to
existing draftPR7 for final Ubuntu clean-build/three-engine CI; no merge/release.

`python3 scripts/verify-java-baseline.py` passes:185 frontend tests,207 Java
cases (three existing architecture skips),17 packaged integration tests; type,
lint, formatting and resource checks pass. This was a normal verify, not a fresh
clean run. `/tmp/opencode/f07-minifier-maven-fixed.log` records BUILD SUCCESS.
`python3 scripts/smoke-java-baseline.py` passes; log
`/tmp/opencode/f07-minifier-health.log`. Earlier stale-route failures resolved.
Implementation task done; packaged browser/cross-engine and owner review pending.

Preview launched on loopback8083 from the verified JAR; do not confuse it with
the previous Validator preview8082. Actual HTTP readiness is checked separately.
Usage/manual walkthrough: `docs/delivery/json-minification.md`.

Confirmed HTTP200 at `http://127.0.0.1:8083/tools/json-minifier?lang=en`.
Reviewed JAR SHA256:
`b71cbe398886c46c6fc0a998f11a24b27300c7b5f54ac389a83a38333bb0003a`.
Planning integrity,21 planning-rule tests and whitespace checks pass. Checklist9/14.
Browser install still pending; no browser pass or manual acceptance claimed.

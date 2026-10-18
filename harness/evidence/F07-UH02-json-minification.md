# F07-UH02 — JSON Minifier evidence

Date: 2026-10-18. Status: implementation/verification in progress; not accepted.

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

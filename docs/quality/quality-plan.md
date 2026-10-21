# Quality, security and verification plan

Current F19 result,2026-10-21: Chromium/Firefox/Linux WebKit each passed169 retained
checks, with43 affected Firefox rechecks and39 native Chromium200% zoom journeys.
The three deferred WebKit recovery checks are now active and passing. Real Safari
remains **unverified**, the explicit F19 R02 alternative. Versions, fixture changes,
limitations and integration review: [F19 evidence](../../harness/evidence/F19-browsers.md).
[Execution workflow](final-browser-review.md). ADR009 still governs intermediate
feature gates; the historical policies below do not supersede these F19 results.

Targets: the explicit keyboard/visual criteria below and applicable OWASP ASVS controls, not full WCAG 2.2 AA conformance or certification. F04 selects an exact ASVS release and maps applicable control IDs to tests; explain inapplicable auth/storage controls. Use primary sources in `../architecture/sources.md`.

Browser policy,2026-10-19: [ADR 009](../architecture/adr-009-chromium-only-mvp-verification.md)
requires Chromium only for remaining F13/F14/F16 work and final MVP acceptance.
Firefox/WebKit are optional post-MVP evaluation, not pending release gates. Retain
their tests/results without rerunning them or claiming compatibility. Other Java,
frontend, security and manual-review requirements remain unchanged.

Historical owner refinement,2026-10-18: target75% code coverage rather than100%; no instrumented
percentage is currently measured. Prioritise important MVP checks rather than
adding tests just for a number. [ADR 008](../architecture/adr-008-bounded-browser-test-follow-up.md)
permits explicitly documented WebKit fault-injection test debt after one bounded
fixture correction; its multi-engine execution requirement is superseded by ADR009. Record any deferred
checks in the [pending test register](pending-browser-tests.md), never as passes.
Production privacy/security/correctness requirements are unchanged.

Owner decision, 2026-10-15, reconciled project-wide on 2026-10-17: screen-reader compatibility and manual speech testing are excluded from acceptance, not passed or deferred to F16. The attempted Orca review did not establish audible output or compatibility. Preserve semantic markup, resource-backed labels, privacy-safe live statuses and existing automated checks. Non-visual usability is not verified; do not advertise screen-reader compatibility or full WCAG AA conformance.

V1 scope revision, 2026-10-18 ([ADR 007](../architecture/adr-007-focused-mvp.md)):
apply retained checks to F06/F07, shared website journeys and one complete
EN/ES/FR learning unit. Extra tools/units and containers are V2, not release
prerequisites. Preserve existing checks; reducing scope is not a quality waiver.

## Threat boundaries

Browser input → editor → worker → output is untrusted data. All source/diagnostics stay in memory. HTTP traffic contains page requests and locale preferences only, never tool payload. Bundled code and course content are trusted only after repository review. Dependencies, PR contributions and CI artifacts are separate supply-chain boundaries.

| Threat | Control | Evidence |
|---|---|---|
| XSS through tool content | Escaped text rendering; no innerHTML/eval; CSP | Literal script-like payload tests |
| Accidental exfiltration | No payload endpoint/network/storage; worker policy | Cold/warm browser traffic plus sentinel checks |
| JSON/YAML resource exhaustion | Bounded inputs, depth/output, workers and cancellation | Adversarial fixtures and responsive UI measurement |
| Lossy conversion | Token preservation and explicit conversion subset | Golden values, numeric/duplicate-key tests |
| CSRF/open redirect | Cookie CSRF, masked hidden token, allowlisted redirects | GET/POST round trip, missing/wrong token rejection |
| Sensitive logs/errors | Event codes and route patterns, no raw input | Captured logs/response checks with synthetic sentinels |
| Supply-chain compromise | Pinned dependencies, scans, action SHAs, least privilege | Lockfile/SBOM/scan results and reviewed updates |
| Keyboard/visual editor barriers | Shared labels/focus/privacy-safe live status; keyboard escape | Manual keyboard/visual evidence plus existing axe checks |

## Test layers

- Java: JUnit/AssertJ domain and application tests; MVC/Security tests; packaged integration; ArchUnit real-package assertions.
- TypeScript: Vitest pure processing and state transitions; ESLint restricted imports; typecheck and translation-key parity.
- Browser: Chromium remains the intermediate feature gate (ADR009). F19 runs the full retained suite in Chromium, Firefox and Linux WebKit; real Safari requires separate evidence or an explicit unverified limitation.
- Keyboard/visual accessibility: existing axe checks plus keyboard-only navigation, visible/unobscured focus and return, editor Escape/Tab, labelled controls, dialog focus management, no colour-only status, reduced motion, actual 200% browser zoom, narrow reflow and EN/ES/FR review. Retain WCAG 2.2 AA text/non-text contrast thresholds for the applicable roles; these specific criteria and automated results do not establish full conformance.
- Security: applicable static/dependency/secret scans; container scans are V2 with the deferred runtime. No real token or user payload fixtures. Scanner errors fail visibly.

## Privacy test protocol

Start a fresh context without service workers. Observe document, popup and worker traffic from navigation onward. Allow only expected static/page requests and the explicit language form. Enter unique synthetic sentinel text in each tool, exercise successful/error/cancel/copy/clear paths, inspect URLs and bodies, browser storage and captured application logs. After initial UI assets load, processing must not issue requests except body-free GETs without query/fragment to exact build-known hashed worker scripts needed for clean-worker startup/recovery (ADR 006). Never allow an entire asset prefix or treat cache hits as absent requests. No tool content is permitted in any request. Test lazy-load/error paths too. Ensure tools cannot submit an enclosing form. Browser-local processing is not a claim that the whole website makes no network requests.

## Performance protocol

Record reference hardware, browser and tool versions. Measure 10 KiB, 100 KiB and 1 MiB documents; wide/deep shapes; just-over-limit input; malicious alias expansion; cancellation and repeated runs. Provisional budgets: 1 MiB input, depth 128, 8 MiB output and two-second worker timeout. Observe UI responsiveness and peak behaviour; smaller safe limits are acceptable with a documented rationale and translated feedback. Worker kill alone does not protect main-thread editor insertion.

## Evidence

Each feature evidence file records commands/versions, fixture identity, results, manual checks, deviations, reviewer, actual dates and limitations. Never record planned tests as passed. Checklists do not substitute for executed tests. Do not include payload dumps, real secrets or sensitive logs in evidence.

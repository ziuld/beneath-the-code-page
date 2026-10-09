# Quality, security and verification plan

Targets: WCAG 2.2 AA and applicable OWASP ASVS controls, not a certification claim. F04 selects an exact ASVS release and maps applicable control IDs to tests; explain inapplicable auth/storage controls. Use primary sources in `../architecture/sources.md`.

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
| Inaccessible editor | Shared labels/focus/live status; keyboard escape | Manual keyboard/screen-reader evidence plus axe |

## Test layers

- Java: JUnit/AssertJ domain and application tests; MVC/Security tests; packaged integration; ArchUnit real-package assertions.
- TypeScript: Vitest pure processing and state transitions; ESLint restricted imports; typecheck and translation-key parity.
- Browser: Playwright Chromium full suite; critical Firefox/WebKit editor/CSP smoke each PR; broader matrix before release.
- Accessibility: axe plus keyboard-only, focus visibility/return, Tab escape, screen reader, reduced motion, 200% zoom and narrow reflow.
- Security: static/dependency/secret/container scans. No real token or user payload fixtures. Scanner errors fail visibly.

## Privacy test protocol

Start a fresh context without service workers. Observe document, popup and worker traffic from navigation onward. Allow only expected static/page requests and the explicit language form. Enter unique synthetic sentinel text in each tool, exercise successful/error/cancel/copy/clear paths, inspect URLs and bodies, browser storage and captured application logs. After initial assets load, processing must not issue requests. Test lazy-load/error paths too. Ensure tools cannot submit an enclosing form. Browser-local processing is not a claim that the whole website makes no network requests.

## Performance protocol

Record reference hardware, browser and tool versions. Measure 10 KiB, 100 KiB and 1 MiB documents; wide/deep shapes; just-over-limit input; malicious alias expansion; cancellation and repeated runs. Provisional budgets: 1 MiB input, depth 128, 8 MiB output and two-second worker timeout. Observe UI responsiveness and peak behaviour; smaller safe limits are acceptable with a documented rationale and translated feedback. Worker kill alone does not protect main-thread editor insertion.

## Evidence

Each feature evidence file records commands/versions, fixture identity, results, manual checks, deviations, reviewer, actual dates and limitations. Never record planned tests as passed. Checklists do not substitute for executed tests. Do not include payload dumps, real secrets or sensitive logs in evidence.

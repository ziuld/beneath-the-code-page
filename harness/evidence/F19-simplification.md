# F19-UH01-T01 — bounded simplification review

Date: 2026-10-21. Branch: maintenance/F19-simplification, from F10 a9eb6e4.
Scope: owner requested the next task, the bounded review before final browsers.
F18/F08/F09/F10 prerequisites done. F19 browser acceptance is not claimed here.
Actual owner effort unreported; baseline/forecast preserved.

## Review and concrete improvements

- Removed unused Bean Validation runtime/test starters, unused Thymeleaf security
  dialect, and unused actuator/Thymeleaf test starters. No matching validation
  annotations, dialect attributes or specialised test imports exist in src.
  Request/language checks remain explicit; Spring Security/MVC CSRF is retained.
- Packaged runtime libraries59→53. Removed classmate1.7.3, Hibernate Validator9.1.3,
  Jakarta Validation API3.1.1, JBoss Logging3.6.3, Boot Validation4.1.1 and Thymeleaf
  security extras3.1.5. JAR31556696→29854853 bytes (1701843 bytes smaller).
- Removed comment-only formatter.css and its import. Shared eager workspace CSS
  and real lazy editor styles remain. No algorithm/session/framework rewrite.
- README now lists all six delivered tools; local release guide reflects three
  published units, current handoff/results, all tool routes and final browser
  scope. Dependency guidance records pruning without altering historical evidence.
- All five frontend runtime dependencies have actual consumers. Retained the JSON
  session adapter because Validator intentionally has different Copy/stale
  semantics. Reviewed worker/session, codec/protocol and UI/browser tests: these
  exercise distinct contracts/boundaries; no assertions or tests were dropped to
  reduce counts. No new dependencies, abstraction or placeholder tests.

JWT preview PID88549/cwd/listener39793 verified and stopped before rebuilding.
All existing owner scope/planning and F09/F10 closure changes preserved.

## Executed verification

- Focused typecheck/lint/format PASS.
- Full scripts/verify-java-baseline.py PASS:274 frontend,273 Java and17 packaged
  integration tests; architecture and packaging included. Counts unchanged.
  Log: target/f19-simplification-maven.log.
- Security policy20 and strict main OpenSpec15 PASS.
  Logs: target/f19-simplification-policy.log, target/f19-simplification-openspec.log.
- Full packaged Chromium169/169 PASS, Playwright1.63.0. All retained tests run,
  including all six tools,13-route EN/ES/FR reflow, no-JS/lazy failure, editor/
  worker lifecycle/CSP, keyboard, locale/CSRF and payload privacy. No assertions
  weakened. Log: target/f19-simplification-chromium.log.
- Fresh security gate PASS:53 production sources,0 findings, policy mode none.
  DBs2026-10-21T07:13:45Z /01:09:45Z. All546 scanned input hashes matched before
  documentation closure. Log: target/f19-simplification-security.log.
- Packaged executable startup/healthUP/shutdown PASS.
  Log: target/f19-simplification-smoke.log.
- Candidate JAR SHA256: 6f2350fddb7d40327b4f00778f5c88d39ceaedec43cac6460801a28a9501375c.
  Integration review inspected removed dependencies, unchanged validation/CSRF,
  real editor/shared styles, retained tests and focused documentation diff.

## Final-browser preparation (T02/T03, not passing evidence)

Playwright1.63.0; cached Firefox revision1543 and WebKit2359 on Linux. Current
Firefox/WebKit project selectors retain editor*.spec.mjs and learning.spec.mjs;
final acceptance needs the completed Base64/UUID/JWT, shared layouts, locale and
keyboard/privacy journeys as well. Retain all meaningful assertions when widening
selection. Existing3 WebKit-only Validator reload fixmes remain BTC-F07-WK-01;
review/retry under the final-browser task, never count them as passes.

Firefox ldd reports no missing libraries. WebKit headless WPE ldd with its actual
bundled library paths still reports missing ICU74, libxml2.so.2 and Flite libraries;
a bare GTK binary ldd is not sufficient because the wrapper supplies libraries.
Cached binaries do not establish launchability. Docker CLI exists, but a read-only
docker info check fails with permission denied on /var/run/docker.sock; no
container runtime is established for this user. No OS installation, sudo or configuration
changes performed. No native Safari on this Linux host; real Apple device/version
review remains separate or an explicit pending limitation under F19 R02.

T01 closure/commit/planning verification follows; T02–T04 remain open.

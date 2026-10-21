# F08 — UTF-8 Base64 acceptance evidence

Date:2026-10-21. Branch:feature/F08-base64, from accepted local F18 handoff50d39cd.
User requested the next selected feature. Prerequisites F06/F18 are complete;
F08 behaviour remains owned by plan.json (R01/R02, AC01/AC02).

## Implementation and review

Explicit Encode/Decode at /tools/base64, published through the existing catalogue
and native navigation in EN/ES/FR. Four cards use the approved shared styles in a
balanced two-column wide layout. Shared workspace/editor controls retain native
keyboard access and no-JS/lazy-failure explanation; language POST returns only to
the exact published route. GET/HEAD are public, tool body methods remain denied.

Pure codec: canonical standard alphabet, required padding, zero unused bits,
strict UTF-8 decoding, empty input, BOM/combining characters/emoji/CRLF preservation
and rejection of isolated surrogates. Input1MiB, output8MiB, output preflight and
existing2s/one-active-worker lifecycle. Codec and worker budget alignment is tested.
No normalization, Base64URL, uploads, server conversion or persistence added.
The input/output caps bound accepted data, not every transient allocation.

One existing production worker asset/manifest/CSP identity is retained with a closed
set of JSON and Base64 operations. No registry/framework/new dependency. Shared
revision/result ownership extracted at its second real consumer into tool-session;
JSON adapter retains its own operation names and Validator acknowledgement/no-Copy
contract. The initial unit run caught that distinction; it was fixed without
weakening the existing19 JSON session tests. Empty Base64 success is copyable;
editing/mode changes invalidate current output and Copy while retaining stale
output honestly. Clear resets editor history/results; timeout/cancel/failure permit
retry. Decoding invalid data yields no current successful decoded result.

Base64 opts into LF-only editor splitting, retaining literal CR from pasted CRLF;
existing JSON editors keep their defaults. All real browser locale tests pasted a
Unicode/CRLF/BOM/synthetic-script string and recovered it exactly. Output uses
textContent; diagnostics never contain input/exception text. Existing CSS palette,
controls and responsive layouts remain authoritative; no per-page palette added.

Agent integration review: inspected codec, explicit worker dispatch, shared-session
compatibility, exact route/security/locale additions and screenshots. Reviewed the
wide Base64 workspace, mobile FR workspace and four-card catalogue. Earlier owner
F18 style acceptance is reused; no new owner manual observations or browser-zoom
approval are claimed. F08's canonical scenarios are fixture/browser acceptance;
its closure requires diff/evidence/integration review, now completed by the agent.

## Executed checks

- Full Maven verify PASS:265 Java tests +17 packaged integration tests;224 frontend
  tests plus typecheck/lint/format, pure-boundary/architecture and packaging checks.
  Log:target/f08-maven.log.
- Full packaged Chromium153/153 PASS. Log:target/f08-chromium.log. F08 covers accented/
  multilingual text, emoji/combining/BOM/pasted CRLF, empty encode/decode and Copy,
  invalid alphabet/length/padding/unused bits/non-UTF-8, retained stale output,
  explicit clipboard/irreversible Clear, keyboard Escape→Tab/Mode, aXe, Cancel,
  real1MiB boundary/rejected extra byte, real worker timeout/retry/load failure,
  no-JS/lazy-load recovery, EN/ES/FR and native locale return. Existing JSON/Learn/
  shell/CSP/privacy regressions pass; design-system matrix now includes all11 routes.
- Payload privacy from cold Home→Tools→Base64 through every action: same-origin
  exact asset/document GETs only, no request bodies/query/hash sentinel, no storage/
  cookies change, no synthetic payload in server logs; worker CSP denies outbound
  connections/evaluation. Nothing was relaxed to admit processing requests.
- Actual fresh security gate PASS:49 production source files,0 findings,0 active
  exceptions. Policy mode=none unchanged. Vulnerability DB2026-10-21T07:13:45Z and
  Java DB2026-10-21T01:09:45Z. Log:target/f08-security.log; target/security/summary.json.
- Security policy20 and strict main OpenSpec15 PASS. Logs:target/f08-policy.log and
  target/f08-openspec.log. No behavioural ownership migration or OpenSpec archival.
- Additional mobile390px and CSS zoom2/reflow checks for EN/ES/FR PASS; this is not
  actual browser zoom or Safari/Firefox/WebKit verification (F19).
  Log:target/f08-visual-review.log; Chromium153.0.8010.12 / Playwright1.63.0,
  Linux current host,12 hardware threads. Ordinary UI-inclusive encode/decode
  observations were roughly64–76ms/137–142ms; not hardware-independent promises.
- Planning integrity,23 planning-rule tests, generated views and git whitespace
  checks PASS (final closure rerun recorded below).

Screenshots:target/f08-base64-{320,768,1440}.png, target/f08-base64-{en,es,fr}-390.png,
and target/f08-catalogue-1440.png. Packaged candidate SHA256:
`7d8044a9280708bbb2b096a9720dadba48ec76d03807ac98d2a9441f122cd37d`.
Rechecked184 runtime/test/JAR input digests against the passing scan: unchanged.
Documentation-only handoff updates reuse these actual runtime results.

## Local handoff

T01–T04 complete; T05 recording coherent local revision/closure. Actual owner effort
unreported; original6h baseline/forecast retained. No push/PR/deployment/archival.
Preview RUNNING http://127.0.0.1:45915/tools/base64?lang=en, loopback-only local
profile, PID66355 / exec session26521; log:target/f08-preview.log. Stop that preview
before rebuilding for subsequent features. The packaged production-profile test
servers stopped automatically; the preview is for trying the tool.
Next selected feature:F09. F19 browsers and F20 Docker remain later work.

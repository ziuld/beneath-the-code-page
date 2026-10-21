# F09 — UUID Generator acceptance evidence

Date: 2026-10-21. Branch: feature/F09-uuid, from the local F08 handoff.
Prerequisites F06/F18 complete. Canonical requirements/scenarios: plan.json,
F09-UH01 R01/R02 and AC01/AC02. Actual owner effort unreported; 4h estimates retained.

## Implementation and review

Native crypto.randomUUID(), integer batches 1–100, explicit Generate/Copy at
/tools/uuid. Shared SSR shell, styles, catalogue/navigation, safe preference return
and EN/ES/FR text. No dependency, editor, worker, framework or random fallback.
Count changes and errors clear output and disable Copy. Copy denial/missing APIs
have translated feedback; exceptions are never rendered. Inert no-JS/lazy-failure
fallback. Generated data stays in memory and is cleared on pagehide.

Verified old preview PID66355 identity, cwd and loopback listener45915 using host
visibility, sent SIGTERM and verified both process/listener gone before building.
Existing scope-removal/planning edits were inspected and preserved outside the
F09 implementation commit. No F11 restoration, push, PR, deployment or subagents.

## Executed verification

- Focused UUID unit tests 11/11; typecheck/lint pass. Tests check native calls,
  v4/variant shape, 1/3/100 and rejection of 0/-1/101/fraction/NaN/infinity before
  generation; absent crypto or randomUUID fails. No finite test proves uniqueness.
- Full scripts/verify-java-baseline.py PASS: 235 frontend, 269 Java and 17 packaged
  integration tests; type/lint/format/architecture/build gates included.
  Log: target/f09-maven.log. An old unpublished-UUID assertion failed the first
  attempt; updated to the remaining unpublished JWT route, then full verify passed.
- scripts/smoke-java-baseline.py PASS: packaged startup, health UP and shutdown.
  Log: target/f09-smoke.log.
- Fresh scripts/verify-security.py PASS against the built candidate: 51 production
  sources, 0 findings. DBs 2026-10-21T07:13:45Z / 01:09:45Z, policy mode none.
  Log: target/f09-security.log; target/security/summary.json.
- Security policy 20/20; strict main OpenSpec 15/15 PASS.
  Logs: target/f09-policy.log, target/f09-openspec.log. No spec migration/archival.
- Full scripts/verify-home-browser.py Chromium PASS: 162/162, Playwright 1.63.0.
  Log: target/f09-chromium.log. All 9 F09 locale cases pass: native calls and v4/
  variant shape, 1/3/100, 0/101/-1/fraction/empty, count invalidation, explicit
  exact Copy, missing/throwing crypto, unavailable/denied clipboard, safe errors,
  no-JS/lazy-load failure/retry, native locale return, keyboard Tab/Enter and axe.
  Cold Home→Tools→UUID allows exact known asset/page GETs only; generation/Copy/
  errors issue no requests and change no cookies/storage. Generated UUIDs are
  absent from captured requests and server logs; no CSP violations.
- Shared design-system matrix now covers all 12 routes, EN/ES/FR, 320/1440px.
  Agent visually reviewed wide EN, narrow EN and populated narrow FR screenshots;
  shared styles, focus/controls and bounded horizontal output scrolling retained.
  Images: target/f09-{en,es,fr}-{320,1440}.png and target/f18-_tools_uuid-*.png.
- All 536 security input digests rechecked unchanged after verification.
  Candidate JAR SHA256: 0f55b44e6f6787d1809c53a59123ba16bb45b1ab44c0b5c69cd88189c0c86cee.

Agent integration review: inspected the complete F09 diff, native API boundary,
error/copy ownership, SSR/security/locale publication and actual browser evidence.
AC01/AC02 accepted. F19 Firefox/WebKit, real Safari and actual browser zoom remain
later work; no compatibility or owner manual-review claim here.

Final planning validation and coherent local commit reference follow in the handoff.
Existing owner planning edits remain uncommitted; no publication.

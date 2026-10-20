# Pending browser verification

Current follow-up,2026-10-20: [ADR010](../architecture/adr-010-v2-delivery-and-portable-handoff.md)
schedules final Firefox/WebKit review under F19 after design/tools, plus separate
real Safari evidence or an explicit pending limitation. Existing ADR009 policy
continues for intermediate features; historical results below are not new passes.

## Historical V1 policy — optional post-MVP evaluation

Owner decision,2026-10-19 ([ADR 009](../architecture/adr-009-chromium-only-mvp-verification.md)):
Chromium is the only required browser for remaining MVP work and final acceptance.
Firefox/WebKit are not pending MVP gates; evaluate their value after the MVP.
Retain existing tests, results and known issues below as historical/optional
follow-up, not passes or compulsory final-project work. Their earlier execution/
revisit schedule is superseded; no Firefox/Safari compatibility is guaranteed.
Security, privacy, correctness and manual-review requirements remain unchanged.

## Historical bounded follow-up policy

Owner decision, 2026-10-18: prioritise working MVP behaviour and important checks;
do not pursue 100% coverage or repeatedly block delivery on troublesome WebKit
fault-injection tests. Deferred checks must be explicit TODOs with follow-up, not
reported as passing. See [ADR 008](../architecture/adr-008-bounded-browser-test-follow-up.md).

## F07-UH01 — injected asset failure recovery

Status: three WebKit-only reload checks deferred as `BTC-F07-WK-01`.
Final F07 publication `770aa98`, run39117056486: Chromium110/Firefox64 pass;
WebKit61 passed, the same3 deferred. No Minifier tests deferred or new exception.
Final publication `ab2f956`, run39115413739: Chromium103/Firefox57 pass;
WebKit54 passed,3 deferred. Important split failure/retry checks pass all engines.
Tracking: draft PR7, head `e5c8d7d`, Ubuntu browser run39114716064:
Java/Chromium/Firefox pass; WebKit45/48. The busy-worker retry now passes.

| Check | Previous result | Targeted correction / follow-up |
|---|---|---|
| EN/ES/FR lazy-script failure → same-context reload | WebKit remains unavailable after the bounded no-store correction; Chromium/Firefox pass | WebKit-only `test.fixme`, TODO BTC-F07-WK-01; investigate module failure caching on the next engine update |
| Busy-worker timeout → same-page clean retry | Passes WebKit after no-store fixture correction | Resolved; assertions remain active |

Production code/cache/CSP/deadlines are unchanged. Existing normal processing,
syntax/privacy/CSP/limits/Clear/history cases and F06 regressions remain important
gates. Only `JSON validator en/es/fr: lazy load recovery after reload` are deferred
on WebKit, using `test.fixme` and a source TODO. Their assertions remain active on
Chromium/Firefox. Basic no-JS/lazy-failure feedback and worker-load failure/retry
are separate active tests on all engines. Reproduce on supported Ubuntu with
`python3 scripts/verify-home-browser.py --engine webkit`; remove the conditional
fixme to investigate these three cases. A real failed module download might leave
a WebKit page unavailable after reload; cache contamination remains a hypothesis,
not a confirmed application defect. Normal successful loads/processing are not
affected by this test-only deferral; recovery from a real failed module download
on WebKit is explicitly unverified, not guaranteed.

Owner: Ziuld with AI assistance. Revisit before expanding F07's affected lifecycle,
on the next pinned Playwright/WebKit update, or immediately if ordinary user
processing/recovery fails. No blanket Safari compatibility claim or coverage
percentage is established by passing the remaining suite.

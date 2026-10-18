# Pending browser verification

Owner decision, 2026-10-18: prioritise working MVP behaviour and important checks;
do not pursue 100% coverage or repeatedly block delivery on troublesome WebKit
fault-injection tests. Deferred checks must be explicit TODOs with follow-up, not
reported as passing. See [ADR 008](../architecture/adr-008-bounded-browser-test-follow-up.md).

## F07-UH01 — injected asset failure recovery

Status: one targeted fixture correction under verification; no test deferred yet.
Tracking: draft PR7, previous head`0ca9f94`, Ubuntu browser run39113573357.

| Check | Previous result | Targeted correction / follow-up |
|---|---|---|
| EN/ES/FR lazy-script failure → same-context reload | WebKit remains unavailable; Chromium/Firefox pass | Inject a non-cacheable HTTP503 instead of an aborted immutable script; retain reload readiness assertion |
| Busy-worker timeout → same-page clean retry | WebKit retry times out; Chromium/Firefox pass | Make only the injected busy response non-cacheable; retain deadline and retry assertions |

Production code/cache/CSP/deadlines are unchanged. Existing normal processing,
syntax/privacy/CSP/limits/Clear/history cases and F06 regressions remain important
gates. If this bounded attempt still fails, isolate only the problematic WebKit
recovery assertions as clearly labelled TODO/fixme tests. Keep basic no-JS/failure
feedback and real-worker correctness checks active; document exact deferred test
names, reason, affected engine, reproduction command and known user-facing risk.

Owner: Ziuld with AI assistance. Revisit before expanding F07's affected lifecycle,
on the next pinned Playwright/WebKit update, or immediately if ordinary user
processing/recovery fails. No blanket Safari compatibility claim or coverage
percentage is established by passing the remaining suite.

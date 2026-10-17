# JSON Formatter — implementation preview

Status: F06-UH01 is implemented but blocked on required WebKit verification, not accepted. Do not promote Home Tools yet. The slice adds exact SSR GET/HEAD `/tools` and `/tools/json-formatter`, localised EN/ES/FR explanations, input editor, two/four-space selection, Format/Cancel and a read-only last-successful result. Copy/Clear and positioned diagnostics belong to subsequent story work and are not claimed here. Packaged, Chromium and Firefox verification pass; WebKit cannot launch locally.

## Processing boundary

Strict full-input validation uses pinned `jsonc-parser`3.3.1 after non-recursive depth preflight. The library formatting routine is intentionally not used: a reproduced indentation-cache defect emitted invalid edits. Local bounded gap formatting copies original data-bearing tokens, never decoded JS values. Input/depth/output limits remain1 MiB UTF-8/128/8 MiB; the shared worker manager retains one active job and two-second termination/recovery.

ADR006 permits only body-free GETs without query/fragment to exact hashed worker scripts identified by private build metadata. No tool content may enter traffic, URLs, cookies, logs or persistent storage. The production worker is bundled separately, self-contained and subject to unchanged worker response CSP. Home and the Tools index do not load editor/worker assets merely by visiting them.

## Verification and current limitation

Run `python scripts/verify-java-baseline.py`, then the existing packaged browser runner with full Chromium and critical Firefox/WebKit checks. Do not claim a workflow configuration or a unit test proves real-browser privacy/CSP. Actual results and limitations belong in [UH01 evidence](../../harness/evidence/F06-UH01-json-formatting.md).

The owner-approved fixture naming and exact-mapping assertion corrections retain coverage. Current checks:92/92 frontend,199 Java cases with three explicit architecture skips,17/17 packaged, real health,71/71 Chromium and25/25 Firefox pass. WebKit26.6/build2359 downloaded project-locally but cannot launch without fallback-build host libraries. Use the existing supported Ubuntu CI job rather than local privileged installation or a waiver. Story closure/owner acceptance and later feature work remain pending.

When a reviewed build is available, open `/tools/json-formatter?lang=en` (also `es`/`fr`), enter strict JSON including a large integer or duplicate keys, select two/four spaces and Format. Check Escape→Tab exit, Cancel/retry, visible controls at actual200% browser zoom and narrow layout, and translated explanations/status/copy. Record actual observations and environment. Generic errors are deliberate in this first slice; positioned diagnostics and stale-result/Copy/Clear behaviour are not yet delivered. This walkthrough is not evidence that manual review occurred.

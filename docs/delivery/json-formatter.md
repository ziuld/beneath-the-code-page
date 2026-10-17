# JSON Formatter — implementation preview

Status: F06-UH01 is accepted/done with passing three-engine CI. UH02 adds localised positioned diagnostics and current-result ownership, verified locally and awaiting updated supported-environment WebKit CI. Do not promote Home Tools yet. Exact SSR GET/HEAD `/tools` and `/tools/json-formatter` provide EN/ES/FR explanations, input editor, two/four-space selection, Format/Cancel and a read-only result labelled current or previous. Copy/Clear remain the next story, not delivered here. WebKit still cannot launch on this local host.

## Processing boundary

Strict full-input validation uses pinned `jsonc-parser`3.3.1 after non-recursive depth preflight. The library formatting routine is intentionally not used: a reproduced indentation-cache defect emitted invalid edits. Local bounded gap formatting copies original data-bearing tokens, never decoded JS values. Input/depth/output limits remain1 MiB UTF-8/128/8 MiB; the shared worker manager retains one active job and two-second termination/recovery.

ADR006 permits only body-free GETs without query/fragment to exact hashed worker scripts identified by private build metadata. No tool content may enter traffic, URLs, cookies, logs or persistent storage. The production worker is bundled separately, self-contained and subject to unchanged worker response CSP. Home and the Tools index do not load editor/worker assets merely by visiting them.

## Verification and current limitation

Owner approved the history-restoration fix: output is now a labelled, keyboard-focusable/selectable text-only region rather than a textarea, populated/cleared through `textContent`. Local Maven,Chromium78/78 andFirefox32/32 pass; actual updated Ubuntu WebKit verification is pending. Exact output and Back-navigation clearing assertions remain. The failed-head details below are historical, not a new-code pass.

Current CI blocker at `7c0114e`: Java, clean Maven,Chromium78/78 andFirefox32/32 pass; WebKit29/32 passes the corrected raw-CRLF position checks but restores old output after Back navigation in three locale cases. Safe history restoration is not verified. Proposed text-only output-region fix awaits agreement; do not weaken that assertion or claim full three-engine success for UH02.

Run `python scripts/verify-java-baseline.py`, then the existing packaged browser runner with full Chromium and critical Firefox/WebKit checks. Do not claim a workflow configuration or a unit test proves real-browser privacy/CSP. Actual results and limitations belong in [UH01 evidence](../../harness/evidence/F06-UH01-json-formatting.md) and [UH02 evidence](../../harness/evidence/F06-UH02-json-diagnostics.md).

The accepted first slice at `cd3460d` passes actual Ubuntu24.04 browser run39063899165 and Java run39063899168. Updated UH02 local checks pass129/129 frontend tests,199 Java cases with three explicit architecture skips,17/17 packaged,78/78 Chromium and32/32 Firefox. WebKit26.6/build2359 requires the supported CI environment; its earlier first-slice success is not a new-code pass. No local privileged installation or waiver. UH02 story closure/acceptance and later feature work remain pending.

When a reviewed build is available, open `/tools/json-formatter?lang=en` (also `es`/`fr`), enter strict JSON including a large integer or duplicate keys, select two/four spaces and Format. Edit input or change indentation: previous output remains visible but is non-current until a matching success. Invalid JSON preserves input and reports a translated one-based line/Unicode-column location without content excerpts. Oversized edits preserve accepted input; depth/output/deadline failures permit retry. Leaving the page clears active state, including back-forward restoration.

Check Escape→Tab exit, Cancel/retry, visible controls at actual200% browser zoom and narrow layout, and translated explanations/status/copy. Record actual observations and environment. Copy/Clear remain unimplemented; this walkthrough is not evidence that manual review occurred or that the complete feature is accepted.

# JSON Formatter — accepted delivery

Status,2026-10-18: UH01/UH02/UH03 are accepted and done. Required Ubuntu CI passes
at05a688a (Java39072823450; browser39072823403:Chromium81/81,Firefox35/35,WebKit35/35).
Owner confirmed the keyboard/narrow/actual200% zoom/EN-ES-FR/Copy-Clear review passed
in Google Chrome and requested closure/archive; version/OS/viewport unreported.
Home Tools is enabled and final publication-state CI passes at ed0e502: Ubuntu
Java39074613656 and browser39074613616,Chromium84/84,Firefox38/38,WebKit38/38.
F06 is accepted/done; [main specification](../../openspec/specs/json-formatter/spec.md)
synced and [change archived](../../openspec/changes/archive/2026-10-18-f06-json-formatter/tasks.md).
No merge/release performed.

Copy writes only a current
successful result on explicit activation and reports translated success/denied/
unavailable feedback. Clear cancels work, discards active input/history/output and
diagnostics, disables Copy and retains button focus; it leaves the system clipboard
alone. Pending authorised clipboard writes cannot necessarily be retracted. No
secure heap-erasure or speech-compatibility guarantee.

Exact SSR GET/HEAD `/tools` and `/tools/json-formatter` provide EN/ES/FR explanations,
input editor, two/four-space selection, Format/Cancel, Copy/Clear and a labelled,
selectable text-only result marked current or previous.

## Processing boundary

Strict full-input validation uses pinned `jsonc-parser`3.3.1 after non-recursive depth preflight. The library formatting routine is intentionally not used: a reproduced indentation-cache defect emitted invalid edits. Local bounded gap formatting copies original data-bearing tokens, never decoded JS values. Input/depth/output limits remain1 MiB UTF-8/128/8 MiB; the shared worker manager retains one active job and two-second termination/recovery.

ADR006 permits only body-free GETs without query/fragment to exact hashed worker scripts identified by private build metadata. No tool content may enter traffic, URLs, cookies, logs or persistent storage. The production worker is bundled separately, self-contained and subject to unchanged worker response CSP. Home and the Tools index do not load editor/worker assets merely by visiting them.

## Verification and current limitation

Clean Maven passes140 frontend tests,199 Java cases (three explicit architecture
skips) and17 packaged cases. Local health smoke passes; required Ubuntu browser
results above include all-action privacy/CSP, history clearing and clipboard races.
The output region uses only `textContent`; exact whitespace and Back-navigation
clearing assertions remain. Local WebKit cannot launch with available host libraries;
supported Ubuntu CI supplies the actual pass, without privileged local installation.

Run `python scripts/verify-java-baseline.py clean`, the health smoke and the existing
packaged browser runner with full Chromium and critical Firefox/WebKit checks. Actual
results/limitations belong in [UH01 evidence](../../harness/evidence/F06-UH01-json-formatting.md),
[UH02 evidence](../../harness/evidence/F06-UH02-json-diagnostics.md) and
[UH03 evidence](../../harness/evidence/F06-UH03-json-copy-clear.md).

## Accepted owner walkthrough and evidence limits

When a reviewed build is available, open `/tools/json-formatter?lang=en` (also `es`/`fr`), enter strict JSON including a large integer or duplicate keys, select two/four spaces and Format. Edit input or change indentation: previous output remains visible but is non-current until a matching success. Invalid JSON preserves input and reports a translated one-based line/Unicode-column location without content excerpts. Oversized edits preserve accepted input; depth/output/deadline failures permit retry. Leaving the page clears active state, including back-forward restoration.

Check Escape→Tab exit, Cancel/retry, visible focus and controls at actual200% browser
zoom and narrow layout, plus translated explanations/status/copy in EN/ES/FR. Exercise
Copy and Clear after success/error; verify Clear focus and undo non-restoration.
Record browser/version, OS, viewport, actual browser zoom and observations/issues
per locale. Automated clipboard stubs cover denied/unavailable access; distinguish
those from any actual manual observations. This walkthrough is not evidence that
manual review occurred. Actual owner confirmation is recorded separately in
[integrated evidence](../../harness/evidence/F06-integrated-acceptance.md), with
unreported environment details explicit. Screen-reader compatibility/manual speech
testing is excluded.

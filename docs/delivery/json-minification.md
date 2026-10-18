# JSON Minifier

Route: `/tools/json-minifier?lang=en` (also `es` and `fr`). The owner accepted the
review checklist; the Tools link is present in the final publication candidate.
Changed-state verification at770aa98 passes clean Ubuntu Java/browser CI:
Chromium110,Firefox64,WebKit61 passed with3 existing documented reload TODOs.
UH02 and integrated F07 accepted; no merge/deployment implied.

The minifier validates complete strict JSON first, then joins original scanner
token slices. Spaces inside strings, escapes, duplicate keys, ordering, large
numbers, negative zero and exponent spelling are retained. No parse/stringify or
payload transfer occurs. Shared limits remain1MiB input/depth128/8MiB worker output/
two-second deadline. Minification cannot grow a valid input beyond its input size.

The existing editor/session/worker owns cancellation, revision and clipboard races,
Clear and disposal. Output is selectable inert text. Copy writes only the current
successful output on explicit activation; denied/unavailable clipboard feedback
does not discard content. Edits/failures leave earlier output visibly non-current
and disable Copy. Clear cancels work, clears editor history/output/diagnostics and
retains focus without reading or clearing the clipboard. Back does not revive data.

## Owner review on the verified build

1. Minify ` { "s": "a b", "n": 9007199254740993, "n": -0 } `.
   Expect `{"s":"a b","n":9007199254740993,"n":-0}`, with input unchanged.
2. Copy and paste into a disposable editor: verify the exact result. Change input
   to `{"x":1,}`: Copy must disable and Minify must show a located syntax error.
3. Use keyboard Escape then Tab, Minify/Cancel/Copy/Clear and reverse traversal.
   Clear must keep focus; undo and leaving/Back must not restore cleared content.
4. Check narrow layout, actual200% browser zoom and EN/ES/FR labels/feedback.

Record browser/version, OS, viewport and actual observations, or explicitly mark
unreported details. Automated clipboard stubs are not real clipboard/manual review.
No speech-compatibility or secure heap/clipboard-erasure claim is made.

Actual results: [UH02 evidence](../../harness/evidence/F07-UH02-json-minification.md).
Existing WebKit reload TODOs remain in the [pending register](../quality/pending-browser-tests.md);
do not repeat that investigation for this slice.

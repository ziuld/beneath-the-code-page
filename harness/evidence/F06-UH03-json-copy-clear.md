# Evidence — F06-UH03 deliberate Copy and Clear

Date: 2026-10-17. Status: started after explicit owner acceptance of UH02 at
f4e9b47 with required Ubuntu CI passing. Owner effort unreported.

## Scope and planned checks

Read F06 dossier, EARS/Gherkin, ordered tasks and OpenSpec proposal/spec/design.
UH02 is accepted/done; no requirement ownership migration. Implement R01/AC01
user-activated exact current-result clipboard writes with translated allowed,
denied/unavailable and obsolete-completion handling. No reads, automatic writes,
fallback forms, URLs or persistence.

Implement R02/AC02: cancel first, advance revision, reset input via fresh editor
state/history, remove output/diagnostics, disable Copy and retain Clear focus.
Test running/success/error/repeated empty, late worker replies, undo and pending
clipboard promises. Do not touch the system clipboard on Clear or claim secure
heap/clipboard erasure; a previously authorised pending write cannot be retracted.

Planned verification: session unit races, editor state/history checks, EN/ES/FR
keyboard/browser clipboard stubs (allowed/denied/unavailable), cold/warm all-action
privacy/CSP/storage/cookie/log checks, full Chromium and critical Firefox/WebKit
against packaged app. No new test result, story or final manual acceptance yet.

## Implemented and locally verified

- Session Copy invokes the writer synchronously in explicit user activation only
  for a current success; translated success/rejection/unavailable feedback preserves
  content. Revision/disposal and attempt guards suppress obsolete/out-of-order
  completions, including after edits, replacement, cancel and Clear.
- Clear invalidates/cancels first, removes session result/diagnostics, then resets
  the editor to fresh state with the same CSP nonce, labels, phrases, insertion
  policy and keymaps. History/search state is not carried forward. Focus remains
  on Clear, Copy disables; Clear never reads/writes the clipboard.
- Real CodeMirror-state unit checks (only DOM view mocked) prove zero undo/redo
  depth after reset and retained nonce/labels/phrases/oversize rejection. Session
  tests exercise exact writes, synchronous/asynchronous rejection, unavailable API,
  repeated Clear, captured late worker callbacks and both clipboard promise outcomes
  across invalidation/cancel/clear/disposal/replacement and competing attempts.
- Packaged EN/ES/FR browser checks retain exact output, inert HTML, Axe and the
  exact-asset network/CSP/storage/cookie/log matrix while adding explicit Copy/Clear
  to the sentinel journey. Separate keyboard allowed/denied/unavailable/pending
  clipboard tests verify unchanged content, no reads, obsolete feedback suppression,
  Clear during running/success/error/repeated-empty and undo/redo non-restoration.

Executed: first Maven passes138 frontend/199 Java cases (three explicit skips)/17
packaged. Chromium81/81 andFirefox35/35 pass. Added two substantive shared-editor
history/extension tests afterwards; clean Maven now passes140 frontend/199 Java
cases (three explicit skips)/17 packaged. Logs `/tmp/opencode/f06-copy-clear-maven.log`,
`/tmp/opencode/f06-copy-clear-clean-maven.log`, `/tmp/opencode/f06-copy-clear-chromium.log`,
`/tmp/opencode/f06-copy-clear-firefox.log`. The two additional tests change no runtime
or browser fixture code. Updated supported Ubuntu WebKit remains pending; previous
UH02 WebKit does not verify Copy/Clear. No budgets/CSP/privacy/assertions relaxed.

Tasks3.2/3.3/3.4 locally verified;3.5/canonical T04 remains open for required updated
three-engine evidence. UH03 closure/acceptance, full final owner visual/200% zoom
review and Home promotion remain pending. No merge/release or screen-reader pass.

Real health smoke passes (`/tmp/opencode/f06-copy-clear-health.log`); planning
integrity,15 planning-rule tests, strict OpenSpec8/8 and whitespace checks pass.
Refreshed apply instructions confirm17/22 complete. Scope reviewed before draft
delivery; no blocking local implementation findings, but required new-code WebKit
and owner UH03 acceptance remain explicit gates.

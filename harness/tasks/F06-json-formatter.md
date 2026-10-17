# Task — F06 JSON Formatter

Current scope: owner accepted UH02 after f4e9b47 required CI. Close2.6 and start3.1
with UH03 R01/AC01 exact explicit clipboard writes and R02/AC02 irreversible active
editor/history clearing. Preserve current-result revision ownership, no clipboard
reads/persistence, exact worker-asset privacy allowlist, CSP/budgets and Clear focus.
Unit races and three-engine keyboard/clipboard/undo/all-action privacy checks planned;
no UH03 or final manual acceptance inferred. See F06-UH03 evidence for results.

Latest result: required Ubuntu CI at f4e9b47 passes Java39071829961 and browser
39071830007 (Chromium78/78,Firefox32/32,WebKit32/32), including history clearing.
Tasks2.3/2.5 and canonical T02–T04 complete;12/22. Await UH02 owner acceptance before
task2.6 closure/Copy/Clear. No feature merge, release or final manual review claimed.

Latest continuation: owner approved the labelled text-only output-region fix.
Implemented textContent-only rendering/clearing, focusable/selectable bounded output
and exact-text/SSR checks. Local Maven129 frontend/199 Java (three skips)/17 packaged,
Chromium78/78,Firefox32/32 pass. Deliver to existing draft PR #6 and require updated
Ubuntu WebKit history-restoration result before closing reopened2.3 or2.5. Earlier
approval-pending notes below are historical; no acceptance/constraint is waived.

Status / owner / date: UH01 accepted/done; UH02 history-restoration blocker (10/22; task2.3 reopened); Ziuld with AI assistance; 2026-10-17.

User outcome and authorised scope: Apply the complete F06 change. Owner approved correcting publication/verification ordering and investigating a worker-lifecycle plan preserving strict zero-request acceptance, and requested read-only F05 PR review. No push/merge, dependency install, application changes or acceptance-policy exception has been performed in this reconciliation.

Prerequisites and files read: F05 accepted/archived; current handoff, architecture/feasibility/hierarchy, F06 dossier/EARS/Gherkin/tasks, proposal/spec/design/checklist, existing worker manager/input/budget and editor/build code, F05 worker main spec. Preserve existing local archival, specification and accessibility-documentation changes.

Acceptance criteria (link, do not drift): [F06 dossier](../../docs/planning/features/F06.md) and [proposed capability](../../openspec/changes/f06-json-formatter/specs/json-formatter/spec.md). Canonical tracking/behavioural ownership remains plan-owned.

Implementation steps: Follow the [existing checklist](../../openspec/changes/f06-json-formatter/tasks.md) after resolving the documented request-free worker-lifecycle conflict. Home publication waits for integrated acceptance; formatting-only UH01 privacy checks do not depend on unimplemented Copy/Clear; final all-action privacy remains required.

Security, privacy, accessibility and locale implications: No payload in traffic/URLs/logs/storage, unchanged restrictive CSP, hard worker deadlines/recovery and explicit keyboard/visual/locale/axe scope. Do not treat browser cache as proof of absent requests or introduce blob/data workers, persistent caching or exceptions without agreement.

Verification commands and manual checks to run: Algorithm/unit/build/MVC/packaged and full Chromium/critical Firefox/WebKit checks per checklist; actual owner manual acceptance before closure. None executed for F06 implementation yet.

Results / evidence links / actual effort: Maven passes92 frontend/199 Java cases with three explicit skips/17 packaged; real health smoke passes. Actual Ubuntu CI at cd3460d passes Chromium71/71,Firefox25/25,WebKit25/25 plus Java run39063899168/browser run39063899165. See [actual UH01 evidence](../evidence/F06-UH01-json-formatting.md). Commit pushed to draft PR #6; no final/manual acceptance or owner effort invented.

Open issues and next action: 7c0114e passes Java39070308263 and CI clean Maven/Chromium78/Firefox32; WebKit29/32 now passes CRLF positions but fails final Back-navigation output clearing in three locales (old output restored). This is runtime behaviour, outside routine test-only fixes. Proposed labelled selectable text-only output region instead of textarea avoids form-control restoration; pause before changing runtime or expectations pending owner agreement. Task2.3/canonical implementation reopened; no Copy/Clear, Home promotion, F06 merge/release or manual acceptance. See actual UH02 evidence.

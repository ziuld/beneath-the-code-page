# Task — F06 JSON Formatter

Status / owner / date: UH01 accepted/done; UH02 local diagnostics/freshness verified (11/22); Ziuld with AI assistance; 2026-10-17.

User outcome and authorised scope: Apply the complete F06 change. Owner approved correcting publication/verification ordering and investigating a worker-lifecycle plan preserving strict zero-request acceptance, and requested read-only F05 PR review. No push/merge, dependency install, application changes or acceptance-policy exception has been performed in this reconciliation.

Prerequisites and files read: F05 accepted/archived; current handoff, architecture/feasibility/hierarchy, F06 dossier/EARS/Gherkin/tasks, proposal/spec/design/checklist, existing worker manager/input/budget and editor/build code, F05 worker main spec. Preserve existing local archival, specification and accessibility-documentation changes.

Acceptance criteria (link, do not drift): [F06 dossier](../../docs/planning/features/F06.md) and [proposed capability](../../openspec/changes/f06-json-formatter/specs/json-formatter/spec.md). Canonical tracking/behavioural ownership remains plan-owned.

Implementation steps: Follow the [existing checklist](../../openspec/changes/f06-json-formatter/tasks.md) after resolving the documented request-free worker-lifecycle conflict. Home publication waits for integrated acceptance; formatting-only UH01 privacy checks do not depend on unimplemented Copy/Clear; final all-action privacy remains required.

Security, privacy, accessibility and locale implications: No payload in traffic/URLs/logs/storage, unchanged restrictive CSP, hard worker deadlines/recovery and explicit keyboard/visual/locale/axe scope. Do not treat browser cache as proof of absent requests or introduce blob/data workers, persistent caching or exceptions without agreement.

Verification commands and manual checks to run: Algorithm/unit/build/MVC/packaged and full Chromium/critical Firefox/WebKit checks per checklist; actual owner manual acceptance before closure. None executed for F06 implementation yet.

Results / evidence links / actual effort: Maven passes92 frontend/199 Java cases with three explicit skips/17 packaged; real health smoke passes. Actual Ubuntu CI at cd3460d passes Chromium71/71,Firefox25/25,WebKit25/25 plus Java run39063899168/browser run39063899165. See [actual UH01 evidence](../evidence/F06-UH01-json-formatting.md). Commit pushed to draft PR #6; no final/manual acceptance or owner effort invented.

Open issues and next action: UH02 b77ac8a passes Java39069636791 and CI clean Maven/Chromium78/Firefox32; WebKit29/32 fails only three raw-CRLF insertion fixtures. Owner-authorised test-only correction uses explicit raw paste plus pre-format editor-text assertion, retaining all expected positions; corrected local Chromium78/Firefox32 pass. Deliver that fixture/evidence correction on existing draft PR #6 and require updated WebKit before completing2.5/closing UH02. Runtime code unchanged since b77ac8a. No F06 merge/release or Home promotion. Copy/Clear and final manual acceptance remain pending; see actual UH02 evidence.

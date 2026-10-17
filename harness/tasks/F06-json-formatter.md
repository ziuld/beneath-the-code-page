# Task — F06 JSON Formatter

Status / owner / date: UH01 accepted/done; UH02 local diagnostics/freshness verified (11/22); Ziuld with AI assistance; 2026-10-17.

User outcome and authorised scope: Apply the complete F06 change. Owner approved correcting publication/verification ordering and investigating a worker-lifecycle plan preserving strict zero-request acceptance, and requested read-only F05 PR review. No push/merge, dependency install, application changes or acceptance-policy exception has been performed in this reconciliation.

Prerequisites and files read: F05 accepted/archived; current handoff, architecture/feasibility/hierarchy, F06 dossier/EARS/Gherkin/tasks, proposal/spec/design/checklist, existing worker manager/input/budget and editor/build code, F05 worker main spec. Preserve existing local archival, specification and accessibility-documentation changes.

Acceptance criteria (link, do not drift): [F06 dossier](../../docs/planning/features/F06.md) and [proposed capability](../../openspec/changes/f06-json-formatter/specs/json-formatter/spec.md). Canonical tracking/behavioural ownership remains plan-owned.

Implementation steps: Follow the [existing checklist](../../openspec/changes/f06-json-formatter/tasks.md) after resolving the documented request-free worker-lifecycle conflict. Home publication waits for integrated acceptance; formatting-only UH01 privacy checks do not depend on unimplemented Copy/Clear; final all-action privacy remains required.

Security, privacy, accessibility and locale implications: No payload in traffic/URLs/logs/storage, unchanged restrictive CSP, hard worker deadlines/recovery and explicit keyboard/visual/locale/axe scope. Do not treat browser cache as proof of absent requests or introduce blob/data workers, persistent caching or exceptions without agreement.

Verification commands and manual checks to run: Algorithm/unit/build/MVC/packaged and full Chromium/critical Firefox/WebKit checks per checklist; actual owner manual acceptance before closure. None executed for F06 implementation yet.

Results / evidence links / actual effort: Maven passes92 frontend/199 Java cases with three explicit skips/17 packaged; real health smoke passes. Actual Ubuntu CI at cd3460d passes Chromium71/71,Firefox25/25,WebKit25/25 plus Java run39063899168/browser run39063899165. See [actual UH01 evidence](../evidence/F06-UH01-json-formatting.md). Commit pushed to draft PR #6; no final/manual acceptance or owner effort invented.

Open issues and next action: Owner accepted UH01 and authorised continuation; story closed against cd3460d/actual three-engine CI, not invented manual observations. UH02 diagnostics/freshness now pass129 frontend/199 Java cases (three skips)/17 packaged,Chromium78/78,Firefox32/32; source and results are local/uncommitted. Task2.5 awaits updated Ubuntu WebKit verification on this changed code, not the earlier UH01 run. Continue the existing draft-PR verification path; no F06 merge/release or Home promotion. Copy/Clear and final manual owner acceptance remain pending. See [UH02 evidence](../evidence/F06-UH02-json-diagnostics.md).

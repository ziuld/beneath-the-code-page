# Task — F06 JSON Formatter

Status / owner / date: Paused at required WebKit verification; first formatter slice complete (5/22); Ziuld with AI assistance; 2026-10-17.

User outcome and authorised scope: Apply the complete F06 change. Owner approved correcting publication/verification ordering and investigating a worker-lifecycle plan preserving strict zero-request acceptance, and requested read-only F05 PR review. No push/merge, dependency install, application changes or acceptance-policy exception has been performed in this reconciliation.

Prerequisites and files read: F05 accepted/archived; current handoff, architecture/feasibility/hierarchy, F06 dossier/EARS/Gherkin/tasks, proposal/spec/design/checklist, existing worker manager/input/budget and editor/build code, F05 worker main spec. Preserve existing local archival, specification and accessibility-documentation changes.

Acceptance criteria (link, do not drift): [F06 dossier](../../docs/planning/features/F06.md) and [proposed capability](../../openspec/changes/f06-json-formatter/specs/json-formatter/spec.md). Canonical tracking/behavioural ownership remains plan-owned.

Implementation steps: Follow the [existing checklist](../../openspec/changes/f06-json-formatter/tasks.md) after resolving the documented request-free worker-lifecycle conflict. Home publication waits for integrated acceptance; formatting-only UH01 privacy checks do not depend on unimplemented Copy/Clear; final all-action privacy remains required.

Security, privacy, accessibility and locale implications: No payload in traffic/URLs/logs/storage, unchanged restrictive CSP, hard worker deadlines/recovery and explicit keyboard/visual/locale/axe scope. Do not treat browser cache as proof of absent requests or introduce blob/data workers, persistent caching or exceptions without agreement.

Verification commands and manual checks to run: Algorithm/unit/build/MVC/packaged and full Chromium/critical Firefox/WebKit checks per checklist; actual owner manual acceptance before closure. None executed for F06 implementation yet.

Results / evidence links / actual effort: Maven passes92 frontend/199 Java cases with three explicit skips/17 packaged; real health smoke passes. Chromium71/71 and Firefox25/25 pass real formatter/fidelity/privacy/CSP/recovery and all retained regressions. WebKit launch blocked by missing host libraries; see [actual UH01 evidence](../evidence/F06-UH01-json-formatting.md). No final acceptance or owner effort invented; no F06 commit/push/PR yet.

Open issues and next action: Required WebKit cannot launch locally (fallback-build libicu74/libxml2/libflite1 missing). No system install or waiver. Request scoped commit/push/draft-PR delivery for existing supported Ubuntu CI; do not infer that authority from F05's completed merge. Preserve local completed archival/accessibility/documentation work. Canonical UH01 T04/story and dependent work remain blocked; Home promotion remains off. Later structured diagnostics/freshness, Copy/Clear and final owner acceptance remain pending. Earlier implementation/test-only blockers are resolved.

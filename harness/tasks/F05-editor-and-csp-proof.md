# Task — F05 editor and CSP proof

Status / owner / date: Initial-load isolation tests pass locally; owner approved Ubuntu WebKit diagnostic delivery; Ziuld with AI assistance; 2026-10-15.

User outcome and authorised scope: Apply both stories in `f05-editor-and-csp-proof`. On 2026-10-15 the owner authorised committing the current F05 slice, pushing its feature branch and opening a draft PR for WebKit CI. No F06, production proof route, merge, release, archive or behavioural migration.

Prerequisites and files read: F04 and both stories confirmed done with commit 3ea174f in plan.json and archived in the handoff. Read architecture, feasibility review, hierarchy, F05 dossier/EARS/Gherkin/tasks, all apply context files and existing frontend/browser build configuration. Branch retains Chromium correction 750e959.

Acceptance criteria (link, do not drift): [F05 dossier](../../docs/planning/features/F05.md), [editor delta](../../openspec/changes/f05-editor-and-csp-proof/specs/accessible-editor/spec.md), [worker delta](../../openspec/changes/f05-editor-and-csp-proof/specs/bounded-worker-processing/spec.md).

Implementation steps: Follow the [15-item checklist](../../openspec/changes/f05-editor-and-csp-proof/tasks.md): dependency/API inspection, isolated editor enhancement and bounded insertion, unchanged-CSP engine proof, actual manual review, then dependent worker lifecycle and integration.

Security, privacy, accessibility and locale implications: Same-origin lazy assets, escaped server messages/nonces, EN/ES/FR, no payload transmission/storage, no CSP relaxation, visible focus and documented keyboard escape. Synthetic workers remain test-only.

Verification commands and manual checks to run: Project-local frontend checks/build, targeted Java/packaged tests, pinned Chromium and Firefox/WebKit critical smoke, axe, actual screen-reader/keyboard/browser 200% zoom, clean Maven integration and planning/OpenSpec checks. These are planned checks, not results.

Results / evidence links / actual effort: Tasks 1.1–1.4 complete. Latest recorded full Maven verification passes 34 frontend tests, 190 Java cases with four explicit skips and 17 packaged cases; Chromium 56/56 and Firefox 10/10 pass. Fresh pre-delivery Maven/Chromium runs also exit successfully. Owner reports the presented local manual review works as described; explicit browser/AT/environment details remain unreported. See [UH01 evidence](../evidence/F05-UH01-accessible-editor.md). Actual owner effort unreported.

Open issues and next action: WebKit last 6/10 with initial-load CSP failures but passing EN/ES/FR axe. Owner-approved isolation adds three fresh-context Home/script-free-shell/editor cases; full Chromium 59/59 and Firefox 13/13 pass locally. Owner approved committing/pushing the tests and evidence to draft PR #5; deliver and inspect actual Ubuntu WebKit comparison. Cause still unconfirmed. Explicit AT/manual environment evidence, worker/final work remain pending. Checklist 4/15; no full story/feature acceptance claimed.

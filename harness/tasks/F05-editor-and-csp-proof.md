# Task — F05 editor and CSP proof

Status / owner / date: Implementation and automated integration pass all three engines; manual/final acceptance deferred/open; Ziuld with AI assistance; 2026-10-15.

User outcome and authorised scope: Apply both stories in `f05-editor-and-csp-proof`. On 2026-10-15 the owner authorised committing the current F05 slice, pushing its feature branch and opening a draft PR for WebKit CI. No F06, production proof route, merge, release, archive or behavioural migration.

Latest owner steering: continue debugging, local/CI verification and commits/pushes to the existing draft PR without repeated intermediate approval requests. Chromium/Google Chrome and Firefox are the owner's priorities; existing required WebKit smoke is retained, not silently waived. Stop for a genuine design/security/scope decision. No authority to weaken CSP, omit checks, merge/release or close F05 without acceptance evidence.

Owner approved the proposed ordering edits: require completed editor implementation/automated proof for workers, defer manual task1.6 to final acceptance, retain all behavioural requirements and avoid extra infrastructure, tools and intermediate approval gates. The dependency refinement is recorded in design/tasks/plan; not a permission to claim manual acceptance or install Orca.

Prerequisites and files read: F04 and both stories confirmed done with commit 3ea174f in plan.json and archived in the handoff. Read architecture, feasibility review, hierarchy, F05 dossier/EARS/Gherkin/tasks, all apply context files and existing frontend/browser build configuration. Branch retains Chromium correction 750e959.

Acceptance criteria (link, do not drift): [F05 dossier](../../docs/planning/features/F05.md), [editor delta](../../openspec/changes/f05-editor-and-csp-proof/specs/accessible-editor/spec.md), [worker delta](../../openspec/changes/f05-editor-and-csp-proof/specs/bounded-worker-processing/spec.md).

Implementation steps: Follow the [15-item checklist](../../openspec/changes/f05-editor-and-csp-proof/tasks.md): dependency/API inspection, isolated editor enhancement and bounded insertion, unchanged-CSP engine proof, actual manual review, then dependent worker lifecycle and integration.

Security, privacy, accessibility and locale implications: Same-origin lazy assets, escaped server messages/nonces, EN/ES/FR, no payload transmission/storage, no CSP relaxation, visible focus and documented keyboard escape. Synthetic workers remain test-only.

Verification commands and manual checks to run: Project-local frontend checks/build, targeted Java/packaged tests, pinned Chromium and Firefox/WebKit critical smoke, axe, actual screen-reader/keyboard/browser 200% zoom, clean Maven integration and planning/OpenSpec checks. These are planned checks, not results.

Results / evidence links / actual effort: Checklist1.1–1.5,2.1–2.6 and3.1 complete (12/15). Clean local/Ubuntu Maven passes51 frontend tests,191 Java cases/four explicit skips,17 packaged cases including actual successive local-watch rebuilds. Worker-inclusive Ubuntu Chromium64/64, Firefox18/18 and WebKit18/18 pass, plus real health, planning and normal-JAR/digest/proof exclusion/B-byte checks. See [UH01 evidence](../evidence/F05-UH01-accessible-editor.md) and [UH02 evidence](../evidence/F05-UH02-bounded-worker-processing.md). Actual owner effort unreported.

Open issues and next action: Implementation1990264/correction5f5a151 delivered to draft PR#5 and their CI is green. No remaining implementation/automated blocker. Actual task1.6 manual/AT review,3.2 final owner acceptance and3.3 acceptance-backed closure remain open; do not claim F05 done before those. Tooling pin follow-up retained. No merge/release/archive/system change or CSP relaxation. Evidence/tracking follows tested code; final accepted closure remains open.

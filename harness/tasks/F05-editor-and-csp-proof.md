# Task — F05 editor and CSP proof

Status / owner / date: Done within revised scope; manual/automated acceptance and closure validation complete (15/15); Ziuld with AI assistance; 2026-10-15.

User outcome and authorised scope: Apply both stories in `f05-editor-and-csp-proof`. On 2026-10-15 the owner authorised committing the current F05 slice, pushing its feature branch and opening a draft PR for WebKit CI. No F06, production proof route, merge, release, archive or behavioural migration.

Latest owner steering: continue debugging, local/CI verification and commits/pushes to the existing draft PR without repeated intermediate approval requests. Chromium/Google Chrome and Firefox are the owner's priorities; existing required WebKit smoke is retained, not silently waived. Stop for a genuine design/security/scope decision. No authority to weaken CSP, omit checks, merge/release or close F05 without acceptance evidence.

Owner approved the proposed ordering edits: require completed editor implementation/automated proof for workers, defer manual task1.6 to final acceptance, retain all behavioural requirements and avoid extra infrastructure, tools and intermediate approval gates. The dependency refinement is recorded in design/tasks/plan; not a permission to claim manual acceptance or install Orca.

Prerequisites and files read: F04 and both stories confirmed done with commit 3ea174f in plan.json and archived in the handoff. Read architecture, feasibility review, hierarchy, F05 dossier/EARS/Gherkin/tasks, all apply context files and existing frontend/browser build configuration. Branch retains Chromium correction 750e959.

Acceptance criteria (link, do not drift): [F05 dossier](../../docs/planning/features/F05.md), [editor delta](../../openspec/changes/archive/2026-10-17-f05-editor-and-csp-proof/specs/accessible-editor/spec.md), [worker delta](../../openspec/changes/archive/2026-10-17-f05-editor-and-csp-proof/specs/bounded-worker-processing/spec.md).

Implementation steps: Follow the [15-item checklist](../../openspec/changes/archive/2026-10-17-f05-editor-and-csp-proof/tasks.md): dependency/API inspection, isolated editor enhancement and bounded insertion, unchanged-CSP engine proof, actual manual review, then dependent worker lifecycle and integration.

Archival update, 2026-10-17: Owner requested archiving completed work and confirmed main-spec synchronisation. Both accepted delta specifications were synchronised verbatim into canonical main-spec structure and verified before moving the complete change to `openspec/changes/archive/2026-10-17-f05-editor-and-csp-proof/`. This supersedes the historical no-archive boundary below; no application changes, behavioural ownership migration, commit, push, merge or release. The accessibility clarification and F06 remain unimplemented.

Security, privacy, accessibility and locale implications: Same-origin lazy assets, escaped server messages/nonces, EN/ES/FR, no payload transmission/storage, no CSP relaxation, visible focus and documented keyboard escape. Synthetic workers remain test-only.

Verification scope: Project-local frontend checks/build, Java/packaged tests, pinned Chromium and Firefox/WebKit critical smoke, axe, manual keyboard/browser200% zoom/visual/locale checks, clean Maven integration and planning/OpenSpec checks. Owner explicitly removed mandatory speech review; retain labels, semantic markup and privacy-safe statuses. Actual results are recorded below and in evidence, not inferred from this list.

Results / evidence links / actual effort: Owner confirmed retained200% browser zoom and EN/ES/FR visual/copy checks worked well; earlier functional/keyboard review satisfactory. All four acceptance pairs pass under revised scope. Existing clean local/Ubuntu Maven passes51 frontend tests,191 Java cases/four explicit skips,17 packaged including actual successive local-watch rebuilds; Chromium64/64,Firefox18/18,WebKit18/18,real health and normal-JAR/digest/proof exclusion/B-byte checks pass. Latest tested c3e94e6 CI green, no runtime changes since. See [UH01 evidence](../evidence/F05-UH01-accessible-editor.md) and [UH02 evidence](../evidence/F05-UH02-bounded-worker-processing.md). Actual owner effort unreported.

Open issues and next action: No remaining F05 acceptance/implementation defect reported. Canonical stories/tasks done; checklist15/15 and final validation passes both renderers, planning integrity/all15 rule tests, strict OpenSpec(seven items),whitespace. Record the coherent closure commit on the existing authorised feature branch/PR. Separate clarify-keyboard-accessibility-scope proposal remains ready, not applied, for future quality/brand reconciliation. Tooling pin upgrade follow-up remains documented, not silently waived. No runtime changes, merge/release/archive or full WCAG/AT claim. Historical speech-review/deferral instructions above are superseded by explicit owner scope decision.

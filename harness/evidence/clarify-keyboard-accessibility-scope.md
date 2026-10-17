# Evidence — Keyboard/visual accessibility scope reconciliation

Date / reviewer / working-tree identity: 2026-10-17; OpenCode with owner-authorised apply of `clarify-keyboard-accessibility-scope`. Uncommitted documentation changes; existing F05 archive/spec sync and F06 proposal preserved. No commit, push, merge or archive performed in this apply.

Subsequent authorised archival, 2026-10-17: owner separately requested archive after completion. All three tasks complete; proposal/design/tasks done and specs deliberately skipped. Moved the complete change with its metadata to `openspec/changes/archive/2026-10-17-clarify-keyboard-accessibility-scope/`; no delta specs or main-spec sync. Only F06 remains active and unimplemented. Historical no-archive statements below describe the apply phase, not this later operation.

## Acceptance and delivered changes

- Task 1.1: quality/brand guidance now records the owner's 2026-10-15 exclusion of screen-reader compatibility/manual speech testing and retains keyboard navigation, labelled controls, semantics, visible/unobscured focus, editor escape, dialog focus, contrast, reduced motion, actual 200% browser zoom, narrow reflow, EN/ES/FR and existing axe/browser gates. No full WCAG AA or verified non-visual-usability claim.
- Task 1.2: future-feature inheritance, F16's manual-review task title, delivery guidance, WCAG source description and the evidence template follow that scope. F05 delivery's earlier deferral is explicitly historical rather than an active instruction. F06 design context reflects the applied clarification without starting F06. Both renderers regenerated the views.
- Task 2.1: validation below passed. Canonical scope/IDs/effort/status and application/test/security/browser coverage remain unchanged.

## Executed checks and results

- `python scripts/render-backlog.py`: passed; regenerated feature dossiers, Gherkin, hierarchy, execution queue and traceability. Actual changed generated views are F16's dossier and backlog HTML for its clarified task title.
- `python scripts/render-roadmap.py`: passed; regenerated roadmap outputs without a status/effort change.
- `python scripts/check-planning.py`: passed for all 17 features, local links/generated views, hierarchy, EARS/scenario coverage, verification links, rollups and closure rules.
- `python scripts/test-planning-rules.py`: all 15 tests passed.
- `openspec validate --all --strict`: all nine active change/main-spec items passed; deliberate `skip_specs` remains valid for this documentation-only change.
- `git diff --check`: passed.
- `git diff --exit-code -- src tests scripts .github pom.xml`: passed with no differences; no runtime code, tests, build dependencies, security or CI change. An additional untracked-path assertion found no application/test/script/CI additions.
- Recursive comparison of HEAD and working-tree `plan.json`: exactly one value changed, the F16-UH01-T03 title. IDs, estimates, requirements, scenarios, statuses and evidence links are unchanged.
- Repository reference searches covered screen-reader, assistive-technology, WCAG and speech-review/testing terminology, including space/hyphen variants, across documentation, templates, active changes/main specs and historical records. In active guidance, remaining matches are explicit exclusions/limitations or specific retained contrast criteria. Earlier speech obligations remain only in identified historical observations, archived planning and historical evidence. Generated F05 references already express the approved exclusion. No future mandatory speech-review gate remains.

## Resolved validation blocker

After adding this evidence file, the final `python scripts/check-planning.py` rerun failed: its Markdown link detector interpreted the inline reference-search expression as a link with target `review|test`. The earlier planning check passed before this evidence existed; final closure is not passing. Whitespace still passes. Task 2.1 is reopened pending a documentation-only rewording of that expression and a fresh planning check, with no validator change proposed. Apply paused under the requested error guardrail.

Resolution, 2026-10-17: the owner authorised rewording the expression and rerunning validation. Replaced only the inline regex with plain-language search terms; the validator is unchanged. Planning integrity now passes, all 15 planning-rule tests pass, strict OpenSpec validation passes all nine items, whitespace passes and the runtime/test/build/CI scope diff remains empty. This supersedes the blocker above; task 2.1 is complete.

## Limitations and checks not run

This is documentation-only verification. No Maven/application build, browser suite, manual keyboard/zoom/locale or speech test was run during this apply; previous passing application evidence was not reclassified as a new run. The Orca attempt did not establish audible output or compatibility. Screen-reader compatibility is outside scope, not a passing or deferred acceptance test; retained manual/browser/security/privacy checks still apply to later feature delivery.

F05 remains accepted/archived under its own evidence. F06 remains proposal-only, 0/22 implementation items. No automatic behavioural ownership migration, release or application feature closure. Actual owner effort remains unreported.

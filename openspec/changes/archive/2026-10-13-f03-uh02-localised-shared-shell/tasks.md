# Tasks

Scope: F03-UH02 only. Checkboxes subdivide canonical F03-UH02-T01–T05; preserve all IDs, dependencies and the 10h baseline without adding subdivision effort. R01/AC01 map to T03; R02/AC02 map to T04. Tests/documentation accompany their implementation group; later groups complete canonical acceptance and cross-slice integration, not deferred unit testing.

## 1. F03-UH02-T01 — Confirm prerequisites and acceptance

- [x] 1.1 Confirm accepted F03-UH01 evidence/commit and current archival ownership state, read the canonical F03-UH02 requirements/scenarios/tasks and record the bounded plan using `harness/templates/task.md`; verify the delivered record names R01/R02, AC01/AC02, T01–T05, unchanged 10h baseline and F04 exclusions, and preserves all pre-existing uncommitted migration work.

## 2. F03-UH02-T02 — Complete shared components with adjacent verification

- [x] 2.1 Consolidate used typography, colour-role, spacing/gutter, border, focus and motion tokens plus shared CSS component styles without changing the approved Home visual direction; verify frontend type/lint/format/unit/build checks and same-viewport before/after Home screenshots, retaining the unchanged B bytes and system-font stacks. Document token roles, literal media-query thresholds and supported states.
- [x] 2.2 Reuse header/footer and extract the real Home card into a semantic shared fragment, supplying current-route context deliberately; add MVC tests for landmarks/current-page labels, published/unavailable navigation and resource-backed card content, and verify they pass without nested interactive elements, new product routes or a public component gallery. Document the bounded fragment contracts.
- [x] 2.3 Add the minimal native button fragment/style with translated label key, explicit non-submitting type, enabled/disabled states and shared focus; add rendered/native-semantics tests through isolated test-only component fixtures and verify disabled behaviour, keyboard activation and absence of accidental submission. Confirm no dummy button action is added to production Home, fixture types/security/templates are absent from the normal JAR, and fixture assembly preserves its digest; document button/action scope and fixture reproduction.
- [x] 2.4 Complete only consumed shared EN/ES/FR labels/accessible names and add exact locale-rendered assertions plus whole-catalogue key/placeholder/escaping checks; verify positive/negative synthetic missing-key/placeholder cases as well as real catalogues, with no unresolved key, English label leakage or duplicate browser catalogue. Retain the current header resolver/fallback and production security policy, without a selector, preference cookie or F04 endpoint.

## 3. F03-UH02-T03 — Prove R01 / AC01 across locales

- [x] 3.1 Run the complete MVC/rendered-label matrix for EN/ES/FR and unsupported-language fallback; verify exact navigation, skip-link, image/control accessible names, document language, metadata and footer copy plus key/placeholder parity. Record actual commands/results and canonical AC01 linkage in `harness/evidence/F03-UH02-shared-shell.md`, distinguishing deliberately identical brand copy from missing translation.
- [x] 3.2 Extend the existing pinned packaged-browser suite/runner to cover real Home and the isolated production-fragment fixture in all supported locales with JavaScript enabled/disabled; verify French AC01 and matching EN/ES cases, bounded process cleanup, fixture exclusion and no new network/storage/persistence behaviour. Run the documented local commands and retain the separate workflow's SHA pins/read-only credentials; record local results separately from unexecuted remote CI and independent human translation review.

## 4. F03-UH02-T04 — Prove R02 / AC02 and page quality

- [x] 4.1 Extend browser checks for every reachable Home/fixture control using forward/reverse keyboard traversal, skip activation, leaving controls, native button Space/Enter activation, unavailable/disabled exclusion and visible/unobscured focus; verify no trap at narrow/wide viewports, no horizontal content loss at reflow/enlargement, appropriate essential text/focus contrasts and reduced-motion states. Preserve existing F03-UH01 acceptance cases and record actual AC02/state coverage rather than treating outline-style checks alone as proof.
- [x] 4.2 Record the owner's reported passing Home review steps 1–3 (start/Home, browser zoom/keyboard and languages), retaining unreported browser/version/viewport details as unspecified. Record the explicitly approved decision to accept passing automated component coverage instead of repeating fixture review manually. Preserve B integrity, focus/reflow/contrast/motion and exact-locale evidence; do not equate CSS zoom with browser-UI zoom or claim omitted manual checks ran. This story-specific review decision leaves R01/R02 and AC01/AC02 unchanged.

## 5. F03-UH02-T05 — Integration review and evidence-backed handoff

- [x] 5.1 Run cross-slice clean Maven verification, original executable health smoke, packaged Home/component-browser suite, F02 manifest/startup and successive watch-build regressions and architecture checks; inspect the full diff/JAR for unrelated work, fixture leakage and preserved Home/privacy/security boundaries. Verify all actual failures/skips/manual reviews and limitations are recorded; create/record a coherent local commit and acceptance/integration references only when authorised, without push or invented owner effort.
- [x] 5.2 Update canonical task/story tracking and current handoff only to the evidence-supported state, regenerate both backlog/roadmap views and run planning integrity/rule checks, strict OpenSpec validation and whitespace checks; verify F03-UH01 ownership/behaviour and F04/unrelated features are preserved. Close F03-UH02/F03 only after explicit acceptance/integration, complete required reviews and feature gates; otherwise retain the appropriate open/review state.

## Workflow follow-up

- Make any incremental behavioural-ownership migration an explicit ADR 004 decision before syncing or archiving; the proposal does not migrate F03-UH02 automatically.
- Archive after acceptance and integration when authorised, then verify the archived result. No push, external publication or deployment is authorised here.

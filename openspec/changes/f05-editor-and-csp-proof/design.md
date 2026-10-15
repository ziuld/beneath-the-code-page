# Design

## Context

See `proposal.md` for motivation and the two deltas for behaviour. F04 is done in `plan.json` and archived. Architecture/feasibility review require CodeMirror 6, a real worker-response CSP, browser-local processing and three-engine critical proof.

Observed baseline:

- `entries/site.ts` imports shared CSS only; frontend dependencies include no CodeMirror. Browser tooling pins Playwright 1.64.0 but not axe.
- Vite has one site entry. `AssetManifest` validates lazy graph entries, but returns only the site's eager script/styles/preloads; `LocalAssetWebConfiguration` makes only those exact non-local paths immutable.
- `SecurityResponseHeaders` exposes request `cspNonce` and applies the accepted restrictive CSP to filtered responses, including asset responses. Existing response policy already denies worker connections/eval; this must be proven on the actual emitted worker, not assumed from document headers.
- Existing test-only shell application/controller/security and copied-JAR runner prove SSR components without publishing fixture routes in the normal JAR. Production Home/locale/security contracts are accepted.
- ESLint separates pure tool algorithms from DOM/editor/network/storage adapters. Current CI runs packaged Chromium only; F05 adds scoped Firefox/WebKit checks rather than silently narrowing existing acceptance.

## Goals / Non-Goals

**Goals:** small reusable editor and worker-lifecycle modules, existing design system/message source, real nonce/resource-policy compatibility, deterministic lifecycle tests and minimal real-engine proof.

**Non-Goals:** no formatter/parser, production proof/tool route, generic job framework, app router, backend payload model/port, data persistence, external monitoring, blanket CSP exemption or fabricated accessibility acceptance. Depth 128 remains a future concrete-parser responsibility, not a meaningless character-based check on arbitrary editor text.

## Decisions

### 1. Reusable enhancement; isolated proof surface

Put the editor wrapper in `design-system/components` and worker lifecycle in frontend `platform`, preserving existing import direction. The wrapper receives a target, escaped SSR messages, document nonce and callbacks; exposes only needed content/focus/dispose operations. Do not construct an application-wide service hierarchy.

Use semantic proof markup in a test-only SSR controller/template with exact fixture GET/HEAD access. Reuse shared shell/assets and attach a marker for selective dynamic enhancement. Ordinary Home does not import/preload CodeMirror/worker resources. A JavaScript-disabled proof page has explanatory text and translated notice, never an input-submitting tool form. Concrete algorithms and synthetic busy/error/network-probe worker sources remain test-only.

Alternative: public `/tools/editor-proof` would expand the publication boundary before F06 and misrepresent a proof as a shipped tool. A separate SPA/dev-server origin would not prove packaged SSR policies.

### 2. CodeMirror dependency and accessible behaviour

At apply, pin only needed CodeMirror 6 packages (state/view/commands/search and dependencies) in the existing frontend lockfile; inspect pinned escape/search/nonce APIs and licences. Avoid the all-features bundle, language parsers and duplicated editor libraries. Render nonce via escaped server-owned attribute on the editor host; pass it to `EditorView.cspNonce`, never reuse a nonce from another page or read it from user content.

Use EN/ES/FR server resources for editor labels, instructions, phrases and polite status announcements, serialized into escaped attributes/text nodes. Verify resource/placeholder parity and the actual search/tooltip phrase set, including library-generated text. Built-in Escape-then-Tab escape is the starting binding; document it near the editor and prove forward/reverse navigation. Search-panel Escape first closes the panel; instructions/tests distinguish returning to editor from leaving it. Preserve native toolbar controls and shared visible focus.

Owner decision, 2026-10-14: replace built-in content-excerpt announcements with resource-backed generic feedback before live-region rendering. Search can announce the selected line number, never the matching text/query; other editor actions use a generic message. Keep search navigation and selection intact. The later owner-approved scope revision removes manual speech review, not the no-payload announcement rule; retain automated message/privacy checks and do not patch library sources.

Selection, scroll, search, tooltip placement and resize are a compatibility gate under `style-src-attr 'none'`: a nonce authorises stylesheet tags, not attributes. Capture real violations in each engine. A failing gate pauses for an owner decision/ADR; no unsafe-inline, global CSP bypass or weakened assertions. Public behaviour/policy changes would require updating the affected existing spec explicitly.

Alternative: custom editor/keyboard framework would increase accessibility risk; a nonce alone is not assumed to prove every runtime style path.

### 3. Shared budgets without pretending to bound all allocation

Initial budgets remain 1 MiB UTF-8 input, 8 MiB output, two-second worker deadline and one active job. Enforce input before accepting expensive editor transactions/paste/programmatic replacement and again before posting to the worker. Count Unicode correctly; test exact bytes and one-byte over, multibyte input and insertion/replacement semantics. Prefer bounded iteration/early exit over materialising a huge encoded copy. Preserve accepted text/output on failure.

Validate output size before applying it to the output editor. Do not claim this prevents worker-internal allocation, structured-clone duplication or all renderer costs. Record representative insertion/output/cancellation measurements with browser/hardware metadata; do not invent benchmark pass thresholds or silently reforecast budgets. Parsing depth belongs to F06 and later algorithms.

### 4. One small worker lifecycle with explicit identity

Manager accepts a worker factory (a real boundary, also enabling a small fake in tests), deadline and localised status callbacks. Requests/responses carry monotonically unique job IDs and validated operation/status fields; payload stays in memory. Represent idle/running/terminal/disposed state explicitly without a general queue. Starting another job invalidates/terminates the current one first.

Before termination on cancel/timeout/dispose, invalidate identity and clear timer. Recreate a fresh worker on the next start; accept only well-formed responses matching the currently running ID. Ignore obsolete/duplicate terminal responses, handle a malformed current response/worker error as safe failure, never display raw exception/payload text. Disposal is idempotent and prevents callbacks touching detached UI. Main-thread deadline cannot interrupt a blocked main thread, so expensive synthetic work runs in the worker.

Unit tests use fake timers and small fake worker objects to prove exact lifecycle/deadline/race semantics. One real busy worker proves termination/UI responsiveness/recovery, without asserting completion at precisely 2000ms on loaded hardware. No huge stress-input generation or nested test framework.

### 5. Same-origin emission, private manifest and real response policy

Bundle workers as same-origin hashed files using Vite's static `new URL(..., import.meta.url)` worker pattern; no blob/data worker, external origin or source-string eval. Keep synthetic worker emission in the isolated fixture build/JAR, not normal application content. Apply-time focused build inspection must verify how pinned Vite records worker/chunk URLs and make those paths startup-validated through the private manifest/build metadata; do not hardcode generated hashes, scrape public filenames at runtime or assume workers appear in the main manifest automatically.

Extend validated immutable asset references to newly emitted dynamic/worker resources as needed without adding them to Home preloads. Keep normal/local-watch cache semantics and manifest non-public. Reuse the existing asset-response CSP if it proves effective for real workers; only add a narrowly targeted worker-policy writer if required, with explicit deny-outbound/no-eval policy and exact trusted resource identification. Do not override the HTML nonce policy or introduce a broad resource bypass. Test response headers/cache/MIME/bytes on real packaged assets, including missing resources, and normal-JAR fixture exclusion.

Inspect cold-start document/worker traffic and storage, then operations after required assets load. Network probes in isolated workers should be blocked by their response policy; install violation/request listeners before use and distinguish deliberate negative probes from normal-operation violations. A lack of observed requests alone is not proof of worker header configuration. Record sentinels absent from network URLs/bodies, storage/cookies and captured server logs without making browser automation transmit them.

### 6. Evidence and browser workflow

Extend the existing packaged runner only for the isolated editor proof and browser-project selection needed by F05. Pin axe in test tooling; use Chromium for the full PR suite and Firefox/WebKit for focused critical editor/worker smoke, with failure artifacts and honest OS/dependency limitations. User Google Chrome checks are manual supplementary evidence, not a replacement for specified engines.

Run automated keyboard/axe/contrast/reflow first, then actual keyboard/200% browser zoom and copy review. Record browser/OS versions, observations and omissions; missing retained manual checks or unavailable engines block acceptance, not silently become exemptions. Screen-reader operation/manual speech testing are excluded by the owner's explicit scope decision, not recorded as passed. Use genuine CSRF preference flow/regressions from F04; errors/live regions omit payloads. Proof fixture excluded from normal distributable and original JAR digest unchanged.

Owner-approved ordering refinement, 2026-10-15: complete worker implementation and automated integration after the editor implementation and three-engine CSP proof pass. Manual screen-reader/zoom/copy review may run at final integrated review rather than blocking worker development. It remains required before F05 acceptance; do not mark it passed or install Orca merely to unblock coding. Batch existing checks and reuse the existing proof harness; no new infrastructure or acceptance exemptions.

Subsequent owner-approved scope revision, 2026-10-15: remove screen-reader compatibility and manual speech testing from F05 acceptance rather than defer them. This supersedes the screen-reader portion of the earlier ordering decision only. Retain keyboard commands/navigation, labels, visible focus, contrast, actual 200% zoom, EN/ES/FR copy and automated axe/privacy checks. The attempted Orca review did not establish audible output or compatibility and is not a pass. Do not remove existing semantic markup, announce a full WCAG AA conformance result or change application code. The separate `clarify-keyboard-accessibility-scope` proposal will reconcile project-wide quality/brand guidance; it does not automatically migrate behavioural ownership.

## Risks / Trade-offs

- [CodeMirror runtime positioning conflicts with style-attribute CSP] → early three-engine selection/search/tooltip/resize proof; stop for ADR before relaxation.
- [Dynamic/worker files missing from private metadata or eager Home assets] → focused pinned Vite build-output check, startup/resource validation and cold Home network assertions.
- [Main-thread timer scheduling varies] → deterministic unit deadline tests plus eventual real recovery/responsiveness, not precision timing assertions.
- [Output cap cannot bound intermediate allocations] → disclose limitation, terminate stuck worker, measure representative workloads rather than advertise a hard memory guarantee.
- [Required engine or retained visual/keyboard check unavailable locally] → use supported CI/owner review environment; record blocked checks until actual evidence exists. Screen-reader testing is outside the revised acceptance scope, with no compatibility claim.
- [Fourteen-hour baseline may be optimistic] → retain accepted estimates; actual owner effort/reforecast only from measured/reported information.

## Migration Plan

This proposal writes no application code. On explicit apply, implement UH01/prove CSP first, then UH02/prove lifecycle/privacy, then clean combined checks, outstanding manual accessibility review and owner acceptance. Worker development requires completed editor implementation/automated proof, not prior full UH01 acceptance. Keep F05 plan-owned, all tasks unchecked until executed, and F06 untouched. Reuse local Chromium correction `750e959` in F05's own PR when later authorised; no push implied now.

No data/server-state migration. A requested rollback removes the enhancement/worker adapters, proof fixtures and new pinned dependencies coherently while retaining F04's security and locale flow. Close only with actual evidence, accepted manual/engine checks, real authorised commit references and regenerated planning validation. Main-spec sync/archive/behavioural adoption remain separately requested workflows.

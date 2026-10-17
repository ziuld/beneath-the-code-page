# Design

## Context

See `proposal.md` for motivation and `specs/json-formatter/spec.md` for the proposed contract. F06 remains planned, with F05 accepted; this document is not implementation evidence.

Observed integration points:

- `src/main/frontend/design-system/components/editor.ts` exposes content/replace/focus/dispose but no accepted-change callback, read-only output mode or history reset. The input policy uses a 1 MiB budget.
- `platform/worker-manager.ts` owns one worker per active job, request ID/operation checks, two-second deadlines, termination and input/output byte checks. Errors currently collapse to a generic status; production structured syntax/depth diagnostics are missing.
- `entries/site.ts` lazily enhances an editor workspace. `vite.config.ts` packages hashed chunks; its URL correction removes only the classpath `static/` prefix. Existing production dependencies do not include `jsonc-parser`.
- `PublicPageSecurity.java` currently publishes Home/assets/health only; `HomeNavigation.java` keeps Tools and Learn unpublished. `LanguagePreferenceController.java` currently returns only Home. The existing locale specification already permits exact allowlisted published return paths.
- `SecurityResponseHeaders.java` provides document/asset CSP and bounded HTTP event routes. Existing fixtures and `tests/e2e/editor*.spec.mjs` cover editor/worker behaviour, but test workers are not production tool implementations.
- F05's accepted scope excludes screen-reader compatibility/manual speech testing. The separate `clarify-keyboard-accessibility-scope` change reconciled project-wide quality/brand guidance on 2026-10-17. F06 follows that explicit keyboard/visual scope without claiming compliance with the superseded speech requirement or implementing the clarification again.

## Goals / Non-Goals

**Goals:** Reuse the proven security/editor/worker boundaries; keep algorithms pure and payload handling local; make current-result ownership explicit; verify the real packaged production tool rather than just a fixture.

**Non-Goals:** A generic tool framework/catalogue service, backend formatter, JSON object serialisation, editor-language package, global router, new persistence/telemetry or silently changed quality policy. No domain/application ports are needed for two static SSR pages.

## Decisions

### 1. Publish the smallest complete SSR journey

Add a tools web controller under `tools.adapter.in.web` and resource-backed templates for `/tools` and `/tools/json-formatter`, reusing existing fragments, buttons and visual tokens. The index initially contains one formatter link. Implement and test the route journey in the UH01 slice, but enable the Home Tools publication flag only at integrated F06 acceptance after diagnostics and Copy/Clear also pass. Keep Learn and other tool routes denied. Permit exact GET/HEAD paths, not `/tools/**`; preserve other method denials. Add bounded route labels to safe HTTP events.

Pass a trusted page path to the shared language form and accept only exact `/`, `/tools` and `/tools/json-formatter` return targets; invalid/repeated targets fall back to Home. Preserve masked CSRF, cookie policy and no-JSESSIONID. This instantiates the existing locale contract, not an arbitrary redirect facility. Language submission performs ordinary navigation and does not preserve editor content; never smuggle it into return targets.

Alternative: leave Home Tools disabled or point it straight to the formatter. A minimal index preserves the accepted `/tools` route and existing navigation shape without implementing F12's full suite/catalogue.

### 2. Validate and format original text, not JavaScript values

Add `jsonc-parser` as an exact pinned runtime dependency during apply after checking available version, licence and advisories; record integrity/licence metadata. Use its strict complete-input validation/visitor facilities with comments and trailing commas forbidden and empty content rejected. Never use a parsed object or numeric callback value to generate output.

Before recursive library traversal, run a linear token scan with a non-recursive container-depth counter. Root container depth is 1; primitive roots are depth 0. Strings/comments cannot spoof container depth. Stop at depth 129 before recursive parsing. Retain only the first bounded syntax diagnostic, not a payload-sized error array. Complete validation must succeed before formatting.

Use the strict library parser/visitor and token scanner, but generate whitespace-only gap replacements around original token slices locally. Owner approved this refinement on 2026-10-17 after the dependency formatter emitted undefined edits at supported indentation-cache boundaries. Do not patch package sources or downgrade speculatively. Default to two spaces; allow four. Generate LF gaps with bounded indentation, leave empty containers compact and omit boundary whitespace/final newline. Never rewrite token contents or decoded values. Before joining original slices and inserted whitespace, measure projected UTF-8 output and reject overflow. Bound segment accumulation by input size and the output budget; avoid an object graph or repeated whole-document concatenation. Keep a final manager output-size check as defence in depth.

Alternative: `JSON.parse`/`JSON.stringify` is simpler but corrupts large numbers, duplicate keys, escapes and notation. A custom complete JSON parser adds unnecessary correctness risk. Library parsing is acceptable only after depth preflight, with golden lexical invariants and early output accounting.

### 3. Extend, do not replace, the worker manager

Create a bundled same-origin production formatter worker separate from proof fixtures. Keep pure JSON functions under frontend tools code and worker integration at its boundary; DOM, clipboard, network and storage remain absent from algorithms. Production assets follow existing Vite worker metadata/immutable-path/CSP handling, without production inclusion of proof routes or workers.

Add a small discriminated diagnostic variant to the existing worker response protocol: matching ID/operation, allowlisted error code, and bounded integer source position where applicable. The manager validates it and exposes an optional typed diagnostic callback, while retaining existing generic error handling for worker failures and malformed messages. Do not forward exception messages, token excerpts or arbitrary worker strings into live statuses. Missing/negative/out-of-range positions or unknown codes become generic safe failures. Preserve F05 caller behaviour and regression tests.

Keep manager ownership of deadlines, cancellation, replacement and disposal. Input edits cancel active jobs immediately; setting changes do likewise. A diagnostic and a successful result are mutually exclusive for a job. Page CSP and the actual worker response policy continue to deny outbound connections and unsafe evaluation; do not filter violations to obtain a pass.

### 4. Own freshness in a small formatter workspace controller

Create a page-local formatter controller loaded only on the formatter route, using the existing lazy site entry rather than a global router. Model empty/ready/running/success/error/cancelled states and a monotonically increasing workspace revision for accepted input or indentation changes. Bind each job and clipboard action to that revision. Only the matching successful revision enables Copy. Accepted changes, retry/start, error, cancellation and Clear immediately remove current-result eligibility; visible older output, if retained for inspection, must be explicitly labelled non-current.

Extend the shared input editor with a notification for accepted document changes (not rejected oversized transactions). Clear resets its document and undo history using a fresh state with the same nonce, phrases and keyboard policy; it is not an undoable replace. Keep editor escape/search/privacy behaviour intact. Use a shared-styled labelled read-only text result, not a second editable CodeMirror instance governed by the 1 MiB input budget: valid output may reach 8 MiB. Insert result through text-only APIs and expose no global payload variables.

Clear cancels first, advances revision, removes input/output/diagnostics/history, disables Copy and retains button focus. Dispose releases editors/workers/listeners on page exit; avoid restoring a live payload-bearing page from back-forward cache by clearing/disabling or reinitialising safely on restoration. This is removal from active state, not a claim of secure heap erasure.

Alternative: let successful worker callbacks directly update the result. This fails when an edit or Clear races completion, or when output belongs to a different indentation setting.

### 5. Translate codes and positions, not payloads

Use the existing EN/ES/FR resources and escaped SSR message dictionary for headings, descriptions, indentation options, commands, result freshness, diagnostics and clipboard feedback. Convert validated source offsets into one-based positions in bounded local processing: CRLF is one line break, Unicode columns count code points and EOF is the insertion point. Do not display parser text or document excerpts in statuses.

Call `navigator.clipboard.writeText` only within explicit user activation and only for a current result. Handle unavailable/denied APIs without automatic reads or deprecated copy-form fallbacks. If the workspace revision changes before the promise resolves, suppress obsolete completion feedback; a clipboard write already authorised by the user cannot necessarily be retracted.

Use the accepted shared focus/labels/keyboard/reflow/contrast/axe checks and actual owner 200% zoom plus EN/ES/FR copy review. SSR/no-JS content remains meaningful and processing controls remain disabled until enhancement is ready. Failed lazy loading leaves an honest processing-unavailable state, never a fake result.

### 6. Verify behaviour at each real boundary

Vitest golden fixtures compare exact data-bearing token sequences before/after formatting, expected indentation and idempotence. Include primitive roots, numeric extremes, duplicates, escapes, invalid/trailing input, Unicode positions, exact/over input/depth/output budgets and projected expansion. Test manager malformed-diagnostic responses and workspace/clipboard revision races separately.

Extend existing Java MVC/security/packaged tests for exact routes, Home publication, no-JS resources, safe language return targets, actual worker MIME/cache/CSP and normal-JAR proof exclusion. Extend `scripts/verify-home-browser.py` and the existing Playwright projects to exercise the production formatter with full Chromium and critical Firefox/WebKit cases; retain all existing Home/editor/worker regression gates and the matched browser pin.

Observe cold document/worker/lazy traffic, then reject every operation-triggered request except body-free GETs without query/fragment to exact build-known hashed worker scripts. The self-contained worker bundle has no runtime imports. Never allow arbitrary asset-prefix traffic or infer absence of requests from browser caching. UH01 establishes formatting-only privacy evidence; the feature-level all-action privacy scenario runs after UH02/UH03 add their controls, before F06 publication. Do not require unimplemented Copy/Clear to close the canonical formatting-only acceptance pair, or claim their integrated scenario passed early. Inspect URLs/bodies, storage/cookies and captured server logs with synthetic sentinels. Do not attach payload-bearing traces or dumps as evidence. Measure 10 KiB, 100 KiB and 1 MiB wide/deep shapes, repeated runs, cancellation and responsiveness with actual browser/hardware metadata; fixture-controlled timeout/error paths remain useful but do not substitute for real-tool checks.

### Resolved lifecycle constraint — ADR 006

Review on 2026-10-17 confirmed that the existing manager terminates the worker after every terminal response and constructs another worker for the next job. Retaining an idle worker after success alone cannot establish the strict request-free recovery contract: cancellation, deadline termination and worker failure still require a fresh worker script load. Browser caching is not evidence that no browser request occurred. Existing worker CSP allows same-origin worker scripts, not blob/data workers; persistent storage/service workers and a CSP relaxation remain out of scope.

The owner subsequently approved the narrow static-script exception on 2026-10-17. ADR 006 retains F05's lifecycle and unchanged CSP; exact hashed script GETs without body/query/fragment are permitted for worker startup/recovery. Payloads never enter traffic or storage. Canonical F06 acceptance and this delta are revised together with stable IDs. No cached-load assumption, blob/data execution source, persistence or pooled-worker framework is required. This supersedes the original literal zero-request promise, not the no-payload-network requirement.

## Risks / Trade-offs

- Library scanning/validation can still allocate internal values → depth/input preflight, local gap formatting with early projected byte accounting, bounded segment accumulation, worker termination and pathological benchmarks; no claim that an 8 MiB result cap bounds every transient allocation.
- Existing insertion policy must not cap valid result display at 1 MiB → separate read-only result and test expansion over 1 MiB.
- Structured diagnostics touch shared lifecycle code → additive allowlisted protocol, generic-error fallback and all F05 regressions.
- Large read-only output can still cost main-thread rendering time → measure real rendering and responsive controls at the cap; do not silently reduce budgets or waive checks. A material budget change requires explicit agreement and artifact updates.
- Browser clipboard/worker support varies → explicit translated failure/retry and real Chromium/Firefox/WebKit checks; no security relaxation.
- Excluded speech review could be mistaken for verified non-visual usability → retain the explicit limitation from the reconciled quality plan; never fabricate speech evidence or full-conformance claims.

## Migration Plan

No data/schema migration or deployment is involved. Apply only after a new explicit request; create the project task record and evidence then, keeping canonical story tracking plan-owned. Implement the valid-formatting slice, then error/budget state, then clipboard/Clear, preserving story dependencies and final integrated acceptance. Record existing IDs and actual verification before closure; do not infer done from a commit alone.

Publish the Home Tools link only after the complete three-story formatter and its integrated automated/manual acceptance pass; route existence alone is insufficient. If the implementation must be withdrawn, disable publication and remove its exact public routes together through a reviewed change; do not reset unrelated work. No automatic push, merge, spec sync, ownership migration, archive or release is authorised by this proposal.

# Proposal

## Why

F04 is accepted and archived, but the browser currently has no editor or worker runtime. Prove the shared accessible editor and bounded browser-local lifecycle under the accepted CSP before F06 publishes the first functional tool.

## What Changes

- Deliver both F05 stories, preserving their four requirement IDs, four acceptance IDs and ten canonical task IDs.
- Add a reusable labelled editor with EN/ES/FR resources, documented keyboard escape, visible focus, selection/search/scroll/tooltip/resize behaviour and per-document nonce integration.
- Add one-active-job worker management with IDs, initial two-second deadline, cancellation/termination, stale-result rejection and clean recovery; enforce shared input/output budgets before expensive work.
- Prove real document and same-origin worker response policies, privacy and accessibility using an isolated packaged proof page; do not publish tool routes or processing APIs.
- Run primary Chromium coverage, Firefox/WebKit critical smoke, axe and actual manual keyboard/screen-reader checks. Record limitations instead of treating automated checks as manual acceptance.

## Capabilities

### New Capabilities

- `accessible-editor`: reusable localised keyboard-accessible editor usable under restrictive document CSP.
- `bounded-worker-processing`: bounded, cancellable browser-local jobs with recovery, stale-result isolation and restrictive worker policy.

### Modified Capabilities

None. Preserve existing Home/shared-interface/asset/locale/secure-response contracts. An incompatibility requiring document-CSP relaxation or different publication boundaries must be surfaced for an explicit decision and ADR, not silently included.

## Impact

Apply will affect frontend design-system/platform modules, pinned CodeMirror dependencies and lockfile, EN/ES/FR resources/escaped message dictionaries, asset packaging/worker headers where necessary, fixture-only SSR markup and browser/Java/frontend verification. Existing Vite/manifest and isolated JAR runner are reused rather than replaced. No SPA, account, database, telemetry, persistent tool storage, payload HTTP endpoint, concrete formatter algorithm or F06 implementation.

This change is planning only. F05 remains plan-owned/planned until authorised apply and actual evidence. Branch `feature/F05-editor-and-csp-proof` includes the deferred local Chromium workflow correction `750e959`; eventual F05 delivery uses its own PR, not the exceptional F02–F04 combined PR. No push/commit/archive/spec synchronisation or ownership migration is authorised by proposal creation.

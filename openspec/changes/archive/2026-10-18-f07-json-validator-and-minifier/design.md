# Design

## Context

See `proposal.md` for motivation and scope. F06 is accepted and archived, with
actual Chromium/Firefox/WebKit results. Relevant observed seams:

| Existing implementation | Observation and bounded change |
|---|---|
| `tools/json/algorithms/formatter.ts` | Input/depth preflight and strict `visit` validation precede token-gap formatting; extract that validation for real reuse |
| `tools/json/worker-protocol.ts` | Accepts only `json-format-2` and `json-format-4`; add explicit validate/minify operations |
| `platform/worker-manager.ts` | Owns one-job/2s lifecycle and requires a string on success; retain this contract |
| `formatter-session.ts` | Owns revision/clipboard races and clearing; generalise only the operation seam |
| `formatter-workspace.ts` | Owns editor/control wiring, text-only output and pagehide/pageshow disposal; reuse rather than clone |
| `entries/site.ts` | Lazily loads Formatter only; extend to the two explicit F07 page modes |
| `ToolsController`, security/locale/logging mappings | Exact Formatter routes only; add two explicit page identities, not `/tools/**` |
| Tools template and tests | Catalogue and assertions expressly exclude Validator; update them alongside the publication delta |
| Vite worker metadata | One self-contained hashed worker under `__json-formatter-worker`; reuse it without a rename-only migration |

The pinned `jsonc-parser` is 3.3.1. Its library formatting routine has a demonstrated
indentation-cache defect; retain F06's local token-gap formatter. The existing
browser configuration includes only `editor*.spec.mjs` in Firefox/WebKit critical
projects, so new F07 browser coverage must match that pattern.

## Goals / Non-Goals

**Goals:** one strict validation path, two small new operations, safe reuse of
current workspace behaviour and exact SSR route integration. Preserve F06's public
behaviour and use meaningful changed-code regression evidence.

**Non-Goals:** no worker-manager rewrite, dependency installation, object-based
parse/stringify round trip, schema validation, generic action/plugin registry,
new runtime, payload persistence/transfer or framework-wide editor redesign.

## Decisions

### 1. Extract strict validation; compact original token slices

Extract the existing UTF-8 input/depth preflight and complete strict parser checks
into a small pure helper under `tools/json/algorithms/`. Formatter continues through
that same helper before its unchanged whitespace writer. Validator returns a
success/failure verdict, not a formatted document. Minifier scans validated input
and concatenates the original non-trivia token slices with no gaps.

Reject comments/trailing commas/empty content with the existing parser options.
Keep bounded error codes and offsets, `position.ts`'s CRLF/Unicode/EOF conversion,
depth 128 and current byte limits. Do not call `formatJson` just to validate: it
can expand valid input past the formatter output limit although validation and
minification should succeed. A regression fixture must prove this distinction.

Alternatives rejected: regex whitespace deletion corrupts strings; parse/stringify
changes numbers/duplicates/escapes; separate validators drift; using formatted
output for validation/minification wastes memory and inherits irrelevant failures.

### 2. Reuse one worker and its existing success envelope

Add only `json-validate` and `json-minify` to the protocol's explicit operation
dispatch. Keep positive job IDs, operation echoing, safe diagnostics and generic
unsupported-operation rejection. For a successful validation, return `output: ""`
as a protocol-only acknowledgement; the validator view shows a resource-backed
valid status and never displays/copies that transport field. A syntax verdict is
invalid only after an actual syntax failure; timeouts/budgets/load errors are not
presented as proof that the input is invalid JSON.

The existing manager can already deliver an empty success string. Keep its timer,
hard termination, matching-operation checks and output budget. Minifier responses
contain only the compact text; neither operation returns parsed values, raw
exceptions or excerpts. Keep the existing worker entry/manifest key and exact
asset GET exception in ADR 006; do not introduce another worker, pool, dynamic
imports, blob/data URLs or broader asset allowlist.

Alternative: a discriminated validation-only manager protocol would change a
shared boundary unnecessarily. Document/test the small empty acknowledgement
instead. Its transport success must never make validator Copy available.

### 3. Share the demonstrated workspace, not a generic tool platform

Generalise the existing session's operation selection for Formatter/Validator/
Minifier, keeping a thin Formatter-compatible entry if useful to avoid unrelated
selector/API churn. Reuse its revision ownership, cancellation, copy-attempt guards,
Clear and disposal. The validator supplies no output/Copy UI; successful validation
updates only the verdict. An accepted edit resets or marks a verdict non-current;
rejected oversize edits retain the accepted revision and matching result/verdict.

Minifier retains F06's visibly previous non-current output after edits/failures,
with Copy disabled until a matching success. Clear resets editor history as well
as session state and retains focus. Keep the text-only `<pre>`/`textContent` result:
the earlier `<textarea>` allowed WebKit history restoration. Retain pagehide and
persisted-pageshow clearing; no payload transfer between pages.

Extract shared SSR workspace markup into an existing-style fragment when it is
actually reused; use explicit page-specific messages/controls. Validator exposes
Validate/Cancel/Clear; Minifier exposes Minify/Cancel/Copy/Clear; only Formatter
has indentation. Adapt the lazy entry using these three explicit modes and keep
Home/Tools free of editor/worker loading. Reuse styles/tokens; no redesign.

Alternative: copying the full Formatter controller/template/session for each page
would duplicate the privacy/history fixes. A small local shared seam is sufficient;
there is no need for a new backend domain service or configurable tool framework.

### 4. Extend exact SSR, locale and safe route mappings

Use thin `ToolsController` methods for `/tools/json-validator` and
`/tools/json-minifier`, static view models and EN/ES/FR message resources. Extend
the exact GET/HEAD allowlists in `PublicPageSecurity`, the exact language-return
set in `LanguagePreferenceController` and bounded route codes in
`SecurityResponseHeaders`. No backend payload endpoint or processing service.
Preserve CSRF/no-session behaviour, HTML no-store, asset headers and both CSPs.

Each story supplies its route, tests and owner review before its catalogue link is
published. Test development-branch routes directly while verifying the slice;
do not deploy unfinished pages. Update stale negative publication assertions to
require the accepted JSON links while continuing to exclude unimplemented/V2
tools and Learn. No runtime feature-flag platform or broad route matcher is needed.
F12 later verifies the integrated catalogue/runtime; it is not a prerequisite to
making completed F07 pages discoverable.

### 5. Keep verification proportional and actually exercise shared changes

- Pure tests: all six root categories; empty/comments/trailing commas/multiple
  roots; lexical token equality; strings/escapes; idempotence; Unicode byte limits;
  depth 128/129; validation/minification of input whose pretty output exceeds 8 MiB.
- Protocol/session tests: both operation IDs, unknown/malformed responses, empty
  validation acknowledgement without Copy, non-current verdicts, late callbacks,
  cancelled/replaced jobs, clipboard denial/unavailability/races and Clear/history.
- MVC tests: EN/ES/FR SSR/HEAD, exact GET/method boundaries, safe preference return,
  no session/no-store/CSP and accepted catalogue links with deferred links absent.
- Packaged `editor-json-validator-minifier.spec.mjs`: real worker operations,
  positioned diagnostics, exact compact output, input preservation, Clear/Back,
  cancellation/retry, no-JS/lazy failures, axe and actual traffic/storage/log privacy.
  Inspect worker response CSP and exact asset bytes/metadata using existing harnesses.
- Retain all F06 and foundation regressions. Exercise output-limit enforcement
  through controlled protocol/manager responses: minification cannot naturally
  grow a ≤1 MiB input beyond 8 MiB. Do not fabricate a production minifier case
  that cannot reach that limit or relax any assertion to obtain a pass.
- Use the existing clean Maven/health/browser commands. Full Chromium plus critical
  Firefox/WebKit remain required; ADR 008 now allows explicitly documented,
  owner-authorised WebKit fault-injection test debt after the bounded fixture
  correction. Keep normal important checks active and report deferred cases
  separately; a configured CI job or skipped test is not a passing result.
  Local WebKit library limitations remain explicit; use the existing supported
  Ubuntu CI path only when delivery is authorised, never install system libraries
  or waive the engine gate implicitly.
- Record owner keyboard/focus, narrow layout, actual 200% browser zoom and EN/ES/FR
  observations for new pages. Screen-reader compatibility/manual speech testing
  remains excluded, not newly passed or deferred.

## Risks / Trade-offs

- [Extracting validation changes Formatter] → retain its entry/behaviour and rerun
  all fidelity, budget, worker, clipboard and history regressions on changed code.
- [A valid transport acknowledgement appears as copyable output] → no validator
  Copy/output controls; explicit tests for empty acknowledgement and verdict reset.
- [Stale statuses or Back navigation revive content] → preserve session/editor
  disposal, text-only output and three-engine history/late-callback checks.
- [Staged catalogue assertions hide missing routes] → positive exact-link/GET/HEAD
  tests for accepted pages and retained negative tests for unimplemented scope.
- [10h forecast is exceeded by shared changes or browser/content review] → it is a
  provisional budget, not a completion guarantee; record actual effort and specific
  blockers without cutting quality gates or expanding V2 scope.

## Migration Plan

No data/storage migration, deployment or dependency update is needed. Implement
Validator/UH01 first with F06 regression checks; close it only with real evidence
and owner acceptance, then implement Minifier/UH02 using the same seams. Add each
catalogue link only after its relevant acceptance, verify the published state and
complete integrated F07 review. Keep `plan.json`'s stable IDs/10h forecast and
plan-owned behaviour; record evidence and regenerate views during apply. Proposed
deltas do not become main specs until separately requested sync/archive.

If a delivered slice needs rollback, remove its exact route/locale/catalogue
publication together and restore the reviewed Formatter snapshot; do not discard
unrelated working-tree replanning work. Commit/push/merge/release remain subject
to explicit authorisation. This proposal performs none of those actions.

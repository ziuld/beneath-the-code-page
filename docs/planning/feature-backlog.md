# Feature backlog and acceptance

This is the feature-level scope summary. Canonical tracking and unmigrated behaviour live in `plan.json`; stories with
`behaviour_spec` use their linked main OpenSpec specification for requirements/scenarios; start with the [detailed hierarchy](hierarchy.md). All UI features inherit EN/ES/FR, responsive layout, keyboard access, safe errors, approved design-system use and privacy checks. The detailed stories refine these commitments rather than replacing them.

Scope revised 2026-10-18 in [ADR 007](../architecture/adr-007-focused-mvp.md): that checkpoint accepted F00–F06 and queued F07/F12/F13/F14/F16. All retained V1
features are now locally accepted (2026-10-20), with final F16 evidence linked
from the tracker. **F08–F11 and F15 are frozen for V2**, retained below only for traceability. No implementation or preparatory framework work for deferred scope.

Retained V1 acceptance uses the explicit keyboard/visual criteria in the [quality plan](../quality/quality-plan.md): labels/semantics, focus, contrast, zoom/reflow, reduced motion and existing axe/browser checks remain required. Screen-reader compatibility and manual speech testing are excluded by owner decision, not deferred to release; neither full WCAG AA conformance nor verified non-visual usability is claimed.

| ID | Outcome | Acceptance evidence |
|---|---|---|
| F00 | Manual Initializr import | POM at root; Java 25/Boot 4.1.1/package correct; five dependencies; planning files preserved |
| F01 | Reproducible Java baseline | Wrapper/checksum and pinned JDK; context and packaged smoke; package-boundary tests; inspect Git remote and define initial CI |
| F02 | Frontend build integration | Pinned Node/npm/packages; clean Maven verify includes assets; private manifest; hashed JS/CSS; successive watch builds served; algorithms/DOM import rules |
| F03 | Home and localised shared shell | Correct B composition; token roles/contrast; navbar/footer/cards/buttons; no hard-coded UI copy; EN/ES/FR keys/placeholder parity; responsive and keyboard checks |
| F04 | Secure locale and SSR baseline | Explicit allowlist/security chain; cookie CSRF and no JSESSIONID; locale precedence; safe redirects/errors; headers; request limits and logging controls |
| F05 | Editor and worker proof | Shared editor labels/focus; CSP nonce; worker response policy; no unexpected network; scrolling/selection/search/resize/cancellation across three browser engines |
| F06 | JSON Formatter | Strict complete JSON; whitespace-only edits preserve numbers/escapes/order/duplicates; indentation; clear/copy; no stale result; input/depth/output/deadline limits; full vertical tests |
| F07 | JSON Validator and Minifier | Distinct pages/actions; validation has stable error keys/locations; minification preserves tokens; shared engine tests; valid primitive roots; invalid input and resource limits |
| F08 | V2 frozen — Base64 Encoder/Decoder | Historical requirements retained; no V1 gate |
| F09 | V2 frozen — UUID Generator | Historical requirements retained; no V1 gate |
| F10 | V2 frozen — JWT Decoder | Historical requirements retained; no V1 gate |
| F11 | V2 frozen — JSON/YAML converters | Historical requirements retained; no V1 gate |
| F12 | MVP JSON navigation/local runtime | Credit accepted three-tool catalogue and local JAR evidence without repeated tests/review; retain safe localised 403 for unknown tools; supply missing security blocking-gate evidence; one shared closure; no Docker prerequisite |
| F13 | Learn pages and navigation | Learn landing, course overview and unit templates with breadcrumbs/return navigation; safe localised content resources; unknown/unpublished 404; synthetic single/multi-unit fixtures; production navigation waits for F14; no CMS/progress storage |
| F14 | First complete learning unit | Short accepted unit brief; source→bytecode→JVM explanation, worked example, exercise and explanatory answer in EN/ES/FR; verified code, technical/language review and references/rights; no full-course syllabus gate |
| F15 | V2 frozen — Additional Java Fundamentals units | Original seven remaining units retained as provisional backlog, not an approved complete syllabus or V1 gate |
| F16 | Polished focused MVP candidate | Every V1 feature accepted; coherent Home/Tools/Learn/course/unit/answer/error journeys; responsive shared styling, keyboard/zoom/locales/no-JS/privacy/security checks; actual evidence and local JAR handoff |

## Frozen V2 course ideas — not an approved syllabus

Eight lessons: source→bytecode→JVM; values/types and numeric limits; control flow/tracing; methods and stack frames; objects/references/heap; encapsulation/interfaces; exceptions and resource lifetimes; collections/generics/equality. Threading, framework programming and deep GC tuning are follow-on course material unless the outline decision changes scope.

V1 publishes one complete source-to-JVM unit. The remaining seven ideas belong to F15/V2; no bulk-content production or full syllabus approval is required for V1. Revisit course size and forecasts when V2 is explicitly resumed.

## Original BTC backlog traceability

BTC-001→F01; BTC-002→F01; BTC-003→F02; BTC-004→F03; BTC-005→F04; BTC-006→F04; BTC-007→F05; BTC-008→F01/F12; BTC-009/010/011→F06; BTC-012→F07; BTC-013→F08/F09/F10 (V2); BTC-014→F11 (V2); BTC-015→F13/F14. F16 accepts the explicitly reduced MVP; a complete course remains outside V1.

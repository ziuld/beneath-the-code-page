# Feature backlog and acceptance

Current delivery,2026-10-21: selected V2 work is complete: F17 maintenance,
F15-UH01/UH02 lessons, F18 design, F08–F10 tools, F19 review and F20 Docker.
F11 is removed; five further lessons remain deferred. F20 is owner-accepted on
local Linux evidence; Windows/other machines/ARM64 and real Safari are unverified.
Future VPS deployment is outside this delivery. Earlier scope/forecast statements
below are historical where superseded. See plan.json and the current handoff.

This is the feature-level scope summary. Canonical tracking and unmigrated behaviour live in `plan.json`; stories with
`behaviour_spec` use their linked main OpenSpec specification for requirements/scenarios; start with the [detailed hierarchy](hierarchy.md). All UI features inherit EN/ES/FR, responsive layout, keyboard access, safe errors, approved design-system use and privacy checks. The detailed stories refine these commitments rather than replacing them.

The retained V1 features are accepted with F16 evidence. ADR010 selects F08–F10,
F15-UH01/UH02 and F17–F20 for the next delivery sequence; F15-UH03–UH07 remain
reference backlog. These follow-ups are not retroactive V1 acceptance gates.

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
| F08 | V2 selected — Base64 Encoder/Decoder | Delivered and accepted in EN/ES/FR; see canonical plan/evidence; no V1 gate |
| F09 | V2 selected — UUID Generator | Delivered and accepted in EN/ES/FR; see canonical plan/evidence; no V1 gate |
| F10 | V2 selected — JWT Decoder | Delivered and accepted in EN/ES/FR; see canonical plan/evidence; no V1 gate |
| F11 | Removed by owner, 2026-10-21 | JSON/YAML conversion excluded from project scope; historical record only in history/F11-removed-2026-10-21.json |
| F12 | MVP JSON navigation/local runtime | Credit accepted three-tool catalogue and local JAR evidence without repeated tests/review; retain safe localised 403 for unknown tools; supply missing security blocking-gate evidence; one shared closure; no Docker prerequisite |
| F13 | Learn pages and navigation | Learn landing, course overview and unit templates with breadcrumbs/return navigation; safe localised content resources; unknown/unpublished 404; synthetic single/multi-unit fixtures; production navigation waits for F14; no CMS/progress storage |
| F14 | First complete learning unit | Short accepted unit brief; source→bytecode→JVM explanation, worked example, exercise and explanatory answer in EN/ES/FR; verified code, technical/language review and references/rights; no full-course syllabus gate |
| F15 | V2 selected — Additional Java Fundamentals units | Select values/types and control flow; other five units remain provisional and deferred; no complete-course gate |
| F16 | Polished focused MVP candidate | Every V1 feature accepted; coherent Home/Tools/Learn/course/unit/answer/error journeys; responsive shared styling, keyboard/zoom/locales/no-JS/privacy/security checks; actual evidence and local JAR handoff |
| F17 | Security maintenance/current docs | Actual fresh scan with bounded fixes, unchanged blocking policy and accurate handoff; no silent exception renewal |
| F18 | Page-by-page design | Prompts and owner concepts/agreement before implementation; preserve core functionality and quality gates |
| F19 | Final compatibility review | Actual Chromium/Firefox/WebKit evidence and separate real Safari review or explicit pending limitation |
| F20 | Portable Docker Desktop handoff | Docker development/runtime accepted on local evidence; other machines unverified; no automatic publication/deployment |

## Additional course scope — two selected lessons

Eight lessons: source→bytecode→JVM; values/types and numeric limits; control flow/tracing; methods and stack frames; objects/references/heap; encapsulation/interfaces; exceptions and resource lifetimes; collections/generics/equality. Threading, framework programming and deep GC tuning are follow-on course material unless the outline decision changes scope.

V1 published one complete source-to-JVM unit. F15/V2 now selects only values/types/numeric limits and control flow/tracing. Both are published in EN/ES/FR with verified examples and owner review. The other five ideas remain deferred; no bulk course production or full-syllabus gate.

## Original BTC backlog traceability

BTC-001→F01; BTC-002→F01; BTC-003→F02; BTC-004→F03; BTC-005→F04; BTC-006→F04; BTC-007→F05; BTC-008→F01/F12; BTC-009/010/011→F06; BTC-012→F07; BTC-013→F08/F09/F10 (V2); BTC-014→F11 (removed, historical mapping only); BTC-015→F13/F14. F16 accepts the explicitly reduced MVP; a complete course remains outside V1.

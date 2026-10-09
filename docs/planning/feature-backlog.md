# Feature backlog and acceptance

This is the feature-level scope summary. Canonical descriptions, EARS requirements, Gherkin scenarios, tasks, statuses and estimates now live in `plan.json`; start with the [detailed hierarchy](hierarchy.md). All UI features inherit EN/ES/FR, responsive layout, keyboard access, safe errors, approved design-system use and privacy checks. The detailed stories refine these commitments rather than replacing them.

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
| F08 | Base64 Encoder/Decoder | Explicit UTF-8 text mode; encode/decode round trip including Unicode; invalid alphabet/padding errors; bounded output; no automatic clipboard reads |
| F09 | UUID Generator | UUID v4 via browser cryptographic API; valid version/variant; bounded batch (initial 1–100); no Math.random; copy only by explicit action |
| F10 | JWT Decoder | Decode supported three-part compact JWS locally; strict bounded base64url/UTF-8/JSON handling; signature-not-verified notice; five-part JWE reported unsupported; do not fetch keys or label expired tokens as verified |
| F11 | JSON→YAML and YAML→JSON | Separate direction tests; single YAML document; bounded aliases/nesting; no custom tags; string mapping keys; duplicate/non-finite/unsafe-number policy; reject unsupported/lossy cases; malicious fixtures stay isolated |
| F12 | Integrated tools/local runtime | All eight tools navigable in all languages; non-root container with available health probe; packaged privacy/a11y/regression; dependency/secret/SAST/container evidence; contributor/run instructions |
| F13 | Learn pages and navigation | Course/lesson catalogue, breadcrumbs/previous/next; classpath content adapter; raw HTML disabled/sanitised; 404; no progress persistence or CMS; accessible semantic content |
| F14 | Java Fundamentals outline and pilot | Owner accepts proposed course outline and completion rubric; one lesson with mental model, worked example, exercise/answer in EN/ES/FR; code examples verified; review establishes content pace |
| F15 | Complete Java Fundamentals | All lessons in accepted outline written and verified; exercises/answers; technical and language review in EN/ES/FR; consistent terminology; no placeholder lessons; references/rights recorded |
| F16 | Full Phase 1 release candidate | Every prior feature accepted; complete local regression, accessibility and privacy checks; known defects triaged; dependency evidence; local release notes/runbook; no hosting implied |

## Suggested course scope for estimation — not an approved syllabus

Eight lessons: source→bytecode→JVM; values/types and numeric limits; control flow/tracing; methods and stack frames; objects/references/heap; encapsulation/interfaces; exceptions and resource lifetimes; collections/generics/equality. Threading, framework programming and deep GC tuning are follow-on course material unless the outline decision changes scope.

F14 must validate this outline against beginner prerequisites and brand goals before bulk content production. F15 assumes seven remaining lessons after the pilot, including all three languages. If the owner chooses a different course size, update F15's forecast and preserve its baseline.

## Original BTC backlog traceability

BTC-001→F01; BTC-002→F01; BTC-003→F02; BTC-004→F03; BTC-005→F04; BTC-006→F04; BTC-007→F05; BTC-008→F01/F12; BTC-009/010/011→F06; BTC-012→F07; BTC-013→F08/F09/F10; BTC-014→F11; BTC-015→F13/F14. F15/F16 explicitly plan full course completion and integrated release rather than mistaking the first lesson for the full MVP.

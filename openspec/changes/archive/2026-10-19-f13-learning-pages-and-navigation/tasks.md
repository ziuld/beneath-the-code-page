# Tasks

Only implementation work is queued below; planning discovery is already complete.
Keep stable canonical F13 IDs and the 16h baseline/10h forecast. Tests/documentation
belong to their slice, not a second acceptance programme.

Owner-approved execution order: completed 1.1 → renderer core from 2.1 → 1.2 SSR
→ remaining 2.1 SSR assertions → 2.2 → 3.1 → 3.2. Keep partially implemented tasks
unchecked. UH02/T01 now depend on completed UH01-T01 plus delivered task 1.1, not
the whole SSR implementation. This avoids temporary rendering and preserves scope.

Owner-approved browser-policy revision,2026-10-19 (ADR009): Chromium only for all
remaining MVP work, including F14/F16 and final acceptance. Retain Firefox/WebKit
definitions/results for optional evaluation after the MVP, not required project-end
checks. Other gates remain unchanged; this policy alone completes no open task.

## 1. Publication-aware data and navigation

- [x] 1.1 (F13-UH01-T01/T02) Record prerequisites and implement the immutable course/unit catalogue, one application-owned classpath content boundary and UTF-8 metadata/resource loader with an empty production published list. Verify single/two-unit ordering, unpublished/draft exclusion, duplicate/invalid slugs, complete EN/ES/FR resources and safe missing-resource failures in focused Java tests; document the resource layout and publication rule. Refine UH02 and its T01 prerequisite to UH01-T02 as specified in design.md, preserving IDs/effort and validating planning dependencies before using the revised order.
- [x] 1.2 (F13-UH01-T02/T04) Add the three shared-shell SSR page types, localised navigation labels/scoped prose styles, exact publication-derived preference return paths and fixed log categories. Introduce only the specified learning GET/HEAD lookup shapes and safe404 responses, not a learning-prefix allowance. Verify MVC route/locale/CSRF-return behaviour, query-selected language continuity, unknown/draft/traversal rejection, normal empty-catalogue404, unrelated403/method denial, no-session/no-store/CSP and log non-disclosure; document the narrow route-status exception. Mark the shared implementation prerequisite complete only after its relevant tests pass, without prematurely closing UH01.

## 2. Safe localised reading and packaged fixtures

- [x] 2.1 (F13-UH02-T01/T02/T03/T04) Add pinned CommonMark0.30.1 with required licence notices and the explicitly safe server-side renderer; connect only its HTML output to the lesson-body insertion point. Keep other values escaped, reject image nodes and avoid an editor/second sanitizer. Verify EN/ES/FR title/prose/exercise fixtures, supported Markdown/code structure, raw inline/block HTML and handlers, unsafe/encoded link schemes, image rejection and inert template-looking text with renderer/SSR tests; document the accepted content subset and error behaviour.
- [x] 2.2 (F13-UH01-T03/T04 and F13-UH02-T03/T04) Extend the existing copied shell-JAR fixture with test-only learning resources and the actual production learning stack; use Chromium as the sole required browser under ADR009 and remove automatic Firefox/WebKit steps from the existing browser CI workflow, retaining their definitions/results for optional post-MVP evaluation. Use the normal clean Maven build and packaged Chromium runner to verify single-unit EN/ES/FR journeys, keyboard/native locale flow, no-JS reading, hostile-markup/CSP/network behaviour, normal-JAR fixture absence/empty catalogue/digest preservation and retained regressions. Reuse the recorded two-unit Java boundary tests rather than publishing extra units. Record one owner review of the new pages at narrow width and actual200% zoom with locale/keyboard observations; do not repeat accepted JSON-tool manual reviews or invent unobserved results.

## 3. Changed-scope security and combined acceptance

- [x] 3.1 (shared F13 quality gate) Reassess each existing bounded CVE disposition against the actual new server/resource/Markdown path and newly resolved dependency inventory, retaining Boot4.1.1 and the current2026-11-01 expiry. Record the specific evidence and obtain owner approval before replacing the reviewed configuration fingerprint; never renew it automatically or hide a new finding. Run the existing security gate and focused policy tests against the built candidate, verifying actual learning-source/parser coverage and applicable scan results. Leave acceptance blocked with a precise reason if an approval, scanner or required result is unavailable; no independent managed-version overrides.
- [x] 3.2 (F13-UH01-T05 and F13-UH02-T05) Record one combined evidence/acceptance result with verified commands, fixtures, owner observations, known limitations and real integration commit references when authorised; update both stories only after their complete criteria and quality gates pass. Preserve production Learn promotion as off and leave real unit review to F14. Reuse the completed build/browser/security results if their inputs have not changed; regenerate both planning views and run planning integrity/rule tests, strict OpenSpec validation and whitespace checks. Do not claim remote CI, commits or publication not actually performed.

## Workflow follow-up

- Proposal completion does not start apply. Commits/pushes, spec sync and archival
  follow their own applicable authorisation; do not create empty commits.
- F14 supplies one reviewed real EN/ES/FR unit; F16 enables production Learn
  promotion. Extra units, CMS, progress storage and containers remain outside F13.

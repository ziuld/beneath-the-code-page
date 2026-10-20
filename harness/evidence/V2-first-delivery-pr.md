# First selected V2 delivery — local integration and PR handoff

Date:2026-10-20. Owner:Ziuld. Authorisation: scoped local commits, push and PR after
security maintenance and two reviewed lessons, explicitly requested in this chat.
Both lesson review requests are now approved. This is local verification evidence;
current publication/check state is reported by the attached GitHub PR, not inferred
from this document or frozen into a passing remote-CI claim.

## Scope and acceptance

F17 complete, implementation e38cb17. F15-UH01 accepted, implementation b2e2407;
F15-UH02 accepted, implementation2f3abf3. All selected stories/tasks complete with
actual owner review. F15 remains planned/open for its five deferred stories and
consumes no active WIP. Original V1 acceptance, IDs and baseline estimates retained.
ADR010 orders remaining design/tool/browser/Docker work; ADR011 records the
bounded security patch overrides. No unrequested runtime features or redesign.

Three localised units now use existing native ordered links and safe Markdown.
The final acceptance-only catalogue comment was updated and the package rebuilt;
lesson source, Java/TypeScript algorithms, templates and CSS were unchanged from
the passing137-test Chromium candidate. Reuse that browser result for those
unchanged inputs; the current PR checks independently exercise the pushed revision.

## Actual final local checks

- Full Maven verify refreshed after the catalogue comment:260 Java/unit/architecture
  tests,17 packaged integration tests,185 frontend tests and type/lint/i18n/bundle
  checks PASS. Logs:target/v2-first-pr-maven.log.
- Actual security scan of the rebuilt JAR/candidate PASS:0 findings/0 blockers,
  no active exceptions;45 main sources, POM70/JAR60/npm166+5 inventories.
  Databases `2026-10-20T13:14:22.737606427Z` and
  `2026-10-20T00:59:02.286523053Z` meet the unchanged24h policy. Historical F16
  approval JSON retained, not loaded; no expiry/fingerprint renewal.
- Security policy20/planning rules23 PASS. Planning integrity, generated views,
  local links, EARS/scenario/task closure and main OpenSpec strict15/15 PASS.
- Full Chromium137/137 PASS for the unchanged lesson/runtime sources, including
  both selected lessons, all3 languages, JS on/off and retained privacy/CSP checks.
  Details:harness/evidence/F15-control-flow-review.md. No skipped/flaky tests.
- Both owner review requests explicitly approved; no detailed human observations
  invented. Automated CSS zoom remains distinguished from the owner review.
- Scoped integration/diff/whitespace review PASS. Actual effort unreported.

Final JAR SHA256:`3eac8e3444ec154babdd9e49bc824e89cc179ff5cc791f12481d761434c977f7`.
Branch:planning/v2-delivery-sequence, based on origin/main790b578. The PR body lists
local evidence and leaves remote CI to the actual GitHub checks. No merging,
release tag, deployment, registry publication or new OpenSpec archival authorised.

## Next handoff

F18 begins with a Learn-page prompt for owner-generated Nano Banana concepts,
followed by course/unit, Tools/workspace and Home/shared shell page by page.
Concept agreement precedes implementation; tools follow final design agreement.
F19 final Firefox/WebKit/separate real Safari review and F20 Docker Desktop/
second-PC portability remain planned, not verified. Reviewed preview stopped.

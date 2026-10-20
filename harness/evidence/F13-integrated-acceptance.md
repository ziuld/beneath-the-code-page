# F13 — integrated acceptance evidence

Started:2026-10-18. Accepted:2026-10-19 under the Chromium-only MVP policy (ADR009).

## Combined acceptance and local implementation commit

Implementation commit:`0742b43815243f9539eef74fa934cfa2722795ee`
(`feat(learning): add safe localised learning pages`).71 F13 files committed,
including reviewed server/resources/tests, bounded security approval and Chromium
CI policy. Archived F07/F12 paths, their main-spec changes and task/evidence edits
excluded; only the F13 handoff prefix staged, preserving unrelated working edits.
Staged runtime/security/workflow inputs were compared with passing scan hashes
before committing:PASS. No new runtime/build/browser result is claimed by a commit.

Both F13 stories/all10 canonical tasks complete; OpenSpec6/6. Acceptance combines
the recorded243 Surefire+17 Failsafe/185 frontend passes, Chromium119/119, owner
preview checklist approval,18 policy tests and passing security gate. Eight CVEs
remain visible under owner-approved exact configuration-bound decisions expiring
2026-11-01; no zero-vulnerability or deployment claim. Remaining Firefox/WebKit
evaluation is optional post-MVP work, not a gate. Production catalogue stays empty
and Learn promotion off; real reviewed content belongs to F14. Owner effort remains
unreported, not inferred from elapsed time. Earlier incomplete/declined notes below
are historical and superseded by explicit approval and verified acceptance.

Closure bookkeeping records this real implementation hash; no push, remote CI,
merge, release, main-spec sync or archive is authorised/claimed.

Final closure validation: both planning renderers, planning integrity,22 planning-
rule tests, strict F13 OpenSpec validation and whitespace checks PASS. Apply reports
6/6 and `all_done`. No repeated build/browser/scanner run for documentation-only
closure. Archive edits remain separate and uncommitted.

## Local commit authorisation (2026-10-19)

Owner answered "yes" to a local F13 commit excluding unrelated F07/F12 archive
changes, with no push. Implementation/evidence commit will precede closure
bookkeeping so the final story references identify actual code, not a fabricated
hash or an old feature commit. Separate archival edits remain uncommitted.

## Approved bounded F13 dispositions

Date:2026-10-19. Owner answered "yes" to the explicit clarification asking whether
approval also covered the reassessed F13 security configuration, the same eight
exact dispositions and unchanged2026-11-01 expiry. This explicitly supersedes the
earlier refusal; page-review approval alone was not used as security authorisation.

Recomputed configuration SHA-256 matches the reassessed candidate exactly:
`36d5e839f2dae13614162f61cd4182a960ad853c3fde0ed31753973bfc43a333`.
Updated only approval date/reference and fingerprint in security/applicability.json;
owner, eight CVE/package/version/reason entries and exclusive UTC expiry unchanged.
Boot4.1.1 unchanged. No blanket waiver, deployment approval or automatic renewal.
Gate/policy checks must pass before acceptance; results recorded below when run.

Executed after this approved policy update:

- `python3 scripts/test-security.py`:18/18 PASS.
- `python3 scripts/verify-security.py`:exit0/status pass; log
  `target/f13-approved-security.log`, redacted report `target/security/summary.json`.
  POM70/JAR60/frontend166/e2e5 inventories,44/44 source coverage, no SAST/secrets,
  fresh databases. Eight CVEs remain16 annotated POM/JAR observations; two medium
  CVEs remain4 observations. Remaining blockers0. No finding hidden/deleted.
- Reviewed the three-field approval delta and Chromium-only CI delta; scope,
  reasons, expiry, pinned actions and normal runtime are unchanged.

Reuse the recorded Maven243+17/185 frontend and Chromium119/119 results: no runtime
or browser source changed since those passing runs. Owner page approval retained;
no repeat review, browser run or build needed. Task3.1 complete, OpenSpec5/6.

Final closure is in review, not done: `scripts/planning_rules.py` requires a real
commit reference for each completed story. No F13 commit is authorised yet, and
old F07/F12 hashes cannot represent new F13 code. Prepare only a coherent local
F13 commit when authorised, excluding separate F07/F12 archival edits; never push
or publish implicitly. No fabricated commit/owner effort or feature completion.

Final review bookkeeping: both planning views regenerated; planning integrity,
22 planning-rule tests, strict F13 OpenSpec validation and whitespace checks PASS.

## Owner page review approved (2026-10-19)

Owner replied "approved" directly to the local-preview review request covering
Learn→course→unit, EN/ES/FR, native language controls/keyboard, narrow width and
actual200% browser zoom. Recorded as owner approval of that requested checklist;
no separate defect notes, screenshots or detailed per-check observations were
supplied, and none are invented. Existing automated evidence remains distinct.

Task2.2 and its four canonical verification tasks are complete under ADR009;
OpenSpec4/6. Verified preview process identity and sent SIGTERM to PID92157 after
review. No test/scanner rerun, commit, push or production promotion. This review
approval does NOT reverse the explicit refusal of the security fingerprint update.
Tasks3.1/3.2 and feature/story closure remain blocked by that unchanged decision.

## Chromium-only CI aligned; owner preview ready (2026-10-19)

Removed only the two automatic Firefox/WebKit steps from
`.github/workflows/home-browser.yml`. Existing build/Chromium steps, pinned
actions, permissions and optional Playwright engine definitions are unchanged.
An exact baseline-minus-four-lines check PASS confirms this limited edit; an
optional YAML-parser check was unavailable because PyYAML is not installed.
No parser installation, remote CI, Maven/browser/scanner rerun or security-policy
change. Reuse the previously passing runtime/Chromium results for unchanged inputs.

Recreated the existing copied-JAR fixture for owner review; normal-JAR SHA-256
unchanged:`5fdc52793564f5de432f783f846e33cfa6e722df930add58e681e5413f04d1f1`.
Started loopback-only local-profile preview at `http://127.0.0.1:36773/learn?lang=en`,
PID92157, background shell `sh_152d16a48001aeFah2NYFyKMDg`, log
`target/f13-owner-review-server.log`. Three page GET readiness checks return200,
no-store and English HTML. This is synthetic test content, not production Learn
promotion; visible HTML-like text is an intentional inert safety fixture.

Owner review remains unobserved: follow Learn→course→unit in EN/ES/FR, use native
language controls/keyboard, inspect narrow reflow and actual200% browser zoom.
Stop the review preview after owner review. Task2.2 remains unchecked until that
review; OpenSpec stays3/6. Security approval was declined and the gate/final
acceptance remain blocked; do not repeat the unchanged approval request.

## Project-wide browser policy revision (2026-10-19)

Owner explicitly changes acceptance for ALL remaining MVP work(F13/F14/F16):
Chromium is the sole required browser, including final acceptance. Firefox/WebKit
are optional post-MVP evaluation, not mandatory pending checks. ADR009 records
the reduced coverage and compatibility limitations. Existing tests/results and
known issues remain; historical deferral wording below is superseded, not a pass.

Updated quality/architecture/delivery planning, F13 proposal/design/tasks and all
six remaining story scope notes, including the F16 final verification task.
Stable IDs, estimates and existing completed-task statuses preserved. No runtime,
test implementation or workflow edit in this planning update; task2.2 explicitly
queues removing automatic Firefox/WebKit CI steps during apply. No browser,
Maven or scanner rerun. Declined security approval/manual review remain blockers.

Validation: both planning views regenerated; planning integrity,22 planning-rule
tests, strict F13 OpenSpec validation and whitespace checks PASS. Verified the
Chromium-only scope appears in all6 remaining MVP story notes.

## Security reassessment — owner approval declined (2026-10-19)

Owner answered "no" to updating the reviewed security fingerprint while retaining
the eight bounded dispositions, expiry and Boot version. The proposal below is
not approved. `security/applicability.json` remains unchanged; no gate bypass,
waiver or version change is authorised. Security/final acceptance remain blocked.
Do not treat later unrelated continuation as approval or repeat this unchanged
request without an owner prompt. Earlier pending-approval wording is historical.

Owner scheduling decision: use Chromium for interim work; defer Firefox/WebKit
execution to final project verification. Existing Firefox passes remain evidence;
WebKit remains pending, not waived or marked complete. No further browser run was
needed for this read-only reassessment. New-page owner review remains pending.

Executed:

- `python3 scripts/install-security-tools.py`:PASS, existing checksum-pinned
  Trivy0.76.0 and Semgrep1.181.0 installed project-locally after clean removed
  target. Log:`target/f13-security-install.log`; no system installation.
- `python3 scripts/test-security.py`:18/18 PASS.
- `python3 scripts/verify-security.py`:exit1, status `incomplete`, exact reason
  `invalid-applicability-scope`. Scans and database freshness checks finish, then
  the unchanged F12 approval fingerprint correctly rejects the new F13 server.
  Log:`target/f13-security-verification.log`; redacted report:
  `target/security/summary.json`. This is NOT a passing security gate.

Actual inventory:POM70/JAR60/frontend166/e2e5 packages. Semgrep covers44/44 selected
Java/TypeScript production files, including all6 learning classes, with no findings;
secret scan has no findings. Databases updated2026-10-19T00:45:30.553047111Z
(vulnerability) and2026-10-19T01:00:16.492703225Z(Java), freshness passed at scan.
All eight prior high/critical CVEs remain16 POM/JAR observations; the prior two
medium CVEs remain4 additional observations. No new identifier/package finding.
A separate cached Trivy packaged-inventory check explicitly confirms
`org.commonmark:commonmark`0.30.1 with0 matched advisories, not just a total count.
Scanner results do not prove absence of all vulnerabilities.

Re-read each published CNA record at `https://cveawg.mitre.org/api/cve/<CVE-ID>`
and checked current production sources/configuration against its prerequisite:

| Exact CVE / package / installed version | F13 applicability reassessment |
|---|---|
| CVE-2026-65182 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No ordered overlapping servlet-container security constraints or web.xml. New engine valve sets response headers only; it adds no authentication, constraints or path rewriting. Access policy remains the Spring Security allowlist. |
| CVE-2026-65905 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No container DIGEST authenticator configured; learning GET/HEAD and header valve introduce none. |
| CVE-2026-68525 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No container FORM login or method-specific container constraints. Spring formLogin/basic/logout remain disabled; preference POST is not container authentication. |
| CVE-2026-89407 / tools.jackson.core:jackson-core /3.1.5 | No typed JSON input endpoints or untrusted string-to-number binding. Learning uses UTF-8 Properties/text and CommonMark, not Jackson. Existing AssetManifest reads trusted InputStream/readTree. |
| CVE-2026-89425 / tools.jackson.core:jackson-core /3.1.5 | No DataInput JSON parser. Learning classpath reader is InputStreamReader; existing Jackson manifest input remains InputStream. |
| CVE-2026-68497 / tools.jackson.core:jackson-databind /3.1.5 | No untrusted JSON bound to XML Duration/XMLGregorianCalendar. Course metadata/units are constructed from properties/text, not JSON binding. |
| CVE-2026-91776 / tools.jackson.core:jackson-databind /3.1.5 | No name-based JSON polymorphism/defaultImpl fallback or incoming type identifiers. New immutable learning records have no Jackson bindings. |
| CVE-2026-91777 / tools.jackson.core:jackson-databind /3.1.5 | No identity-enabled JSON collection/map deserialisation or JsonIdentityInfo. Learning collections are assembled locally, not deserialised from user JSON. |

Inspected `PublicPageSecurity`, `ContainerRejectionHeaders`,
`HttpBoundaryConfiguration`, `AssetManifest`, `ClasspathCourseContentSource`,
`LearningCatalogue`, `LearningPages`, `LearningController` and `LessonHtmlRenderer`.
Repository search confirms no RequestBody, DataInput parser, container login/
SecurityConstraint, JsonTypeInfo/defaultImpl or JsonIdentityInfo addition. Markdown
is trusted repository content with explicit HTML escaping, built-in URL scheme
allowlist and image-node rejection; no remote content import or request-selected
resource path. Only renderer output enters the lesson-body insertion point.

### Proposed bounded F13 approval

Retain only the eight exact CVE/package/version decisions above, for this reviewed
F13 source/configuration and packaged server, with owner Ziuld and unchanged
exclusive UTC expiry2026-11-01. Keep all findings/severities visible, unrelated
findings blocking, Boot4.1.1 unchanged and final-project reassessment mandatory.
This is a conditional applicability assessment, not universal non-exploitability,
an indefinite waiver or public-deployment approval.

Candidate configuration SHA-256 (computed with existing verifier, not installed):
`36d5e839f2dae13614162f61cd4182a960ad853c3fde0ed31753973bfc43a333`.
Existing approved F12 fingerprint remains
`7e6eea0facef77419d223a2804849abd03858ebb05b9a3a07adc87155f2f6c3e`.
`security/applicability.json` is unchanged; no approval date/reference, fingerprint
or expiry renewal applied. Recompute/compare candidate before any approved write;
rerun the gate after approval. OpenSpec3/6; task3.1 not complete until that gate
passes. Manual owner page review and combined closure also remain pending.

After reassessment tracking updates, both planning renderers, planning integrity,
22 planning-rule tests, strict F13 OpenSpec validation and whitespace checks PASS.

## Latest result — SSR/renderer verified; browser pause (2026-10-19)

### Latest follow-up — container fix verified; WebKit host blocker

Owner approved runtime correction. Added `ContainerRejectionHeaders`, registered
as a Tomcat engine valve through the Boot factory customizer. It applies the same
header policy as the existing filter only when decoding has already failed,
the response is uncommitted and no servlet context is mapped; then delegates to
Tomcat's existing error handling. Shared `SecurityResponseHeaders.applyPolicy`
avoids duplicate policy text. No path rewriting, slash admission, route relaxation,
version upgrade, error-body interpolation or new logging. Documented coverage is
limited to the observed container pipeline rejection, not pre-pipeline transport
failures. This completes existing response-policy coverage, not a new architecture.

Upstream evidence: Tomcat11.0.24 `CoyoteAdapter.postParseRequest` catches URI-decoding
errors, sets400, clears invalid decodedURI before mapping and returns true when
no context is mapped, allowing the container pipeline/error valve to respond.
Source: https://github.com/apache/tomcat/blob/11.0.24/java/org/apache/catalina/connector/CoyoteAdapter.java

Executed on the changed runtime:

- Maven `verify` with existing local repository/tmp settings:PASS;243 Surefire,
  17 Failsafe and185 frontend tests, no failures/errors/skips. Log:
  `target/f13-container-verify.log`. This is verification after the earlier clean
  build, not a second clean build.
- `python3 scripts/verify-home-browser.py`:PASS,119/119 Chromium cases.
  Log:`target/f13-container-chromium.log`.
- `python3 scripts/verify-home-browser.py --engine firefox --install`:PASS,
  73/73 Firefox cases. Log:`target/f13-container-firefox.log`.
- `python3 scripts/verify-home-browser.py --engine webkit --install`:FAIL,
  3 API-only cases PASS,70 browser cases cannot launch. Log:
  `target/f13-container-webkit.log`. Pinned fallback browser downloads, but host
  lacks libicu74/libxml2/libflite1. This is the previously documented local WebKit
  limitation, not a demonstrated browser/application regression. No sudo/system
  installation, mixed browser build or coverage waiver.

Original encoded-slash fixture remains;400 now retains no-store/CSP/nosniff.
Chromium/Firefox pass all EN/ES/FR native/no-JS journeys and retained regressions;
normal-JAR digest checks pass. OpenSpec1.2 complete; overall3/6. Browser/manual
task2.2 remains unchecked pending WebKit on a supported runner and actual owner
narrow/200%-zoom review. Security reassessment/explicit fingerprint approval and
closure remain pending. No remote CI, commit/push, approval renewal or production
Learn promotion claimed. Earlier container/tooling failures below are historical.

After tracking updates, both planning views regenerated; planning integrity,
22 planning-rule tests, strict F13 OpenSpec validation and whitespace checks PASS.

### Follow-up — tooling corrected; container rejection policy gap

Owner authorised tooling/test corrections and continued verification. HTML error
requests now explicitly accept text/html. The Markdown-document walker excludes
only `src/test/resources/learning-fixture`, preserving adjacent test documentation
and identically named documentation directories. Hostile content remains intact;
one new negative boundary test verifies this narrow exclusion.

Executed `python3 scripts/test-planning-rules.py`:22/22 PASS. Executed
`python3 scripts/check-planning.py`:PASS (before subsequent tracking updates).
Executed `python3 scripts/verify-home-browser.py --install`:pinned project-local
Chromium restored without sudo; browser run FAIL,116/119 PASS. Log:
`target/f13-chromium-restored-browser.log`. All six EN/ES/FR learning journeys
(JavaScript enabled/disabled) pass, including native keyboard/locale POST flows,
hostile-content/network/CSP assertions, narrow reflow and automated CSS200% zoom.
All existing110 regression cases pass. No owner visual review is implied.

The three remaining failures occur in the per-language malformed-path cases:
`/learn/java-fundamentals/%2e%2e%2fapplication.yaml` returns400 from Tomcat before
application filters, with no Cache-Control header. Trace inspection confirms
ordinary missing/draft/sentinel404 and double-encoded-dot400 responses retain
no-store; only the container's encoded-slash rejection bypasses that header path.
No arbitrary content read or attacker-value disclosure observed. Normal-JAR digest
check passed. Retain the failing assertion rather than weaken the policy.

This is a newly established runtime boundary gap, beyond the approved test/tooling
corrections. Pause before changing container handling. Proposed direction: apply
safe non-cacheable error handling at the container rejection boundary, retaining
encoded-slash denial, Boot4.1.1 and the original failing fixture. No routing
allowance/decoding relaxation or security fingerprint renewal. Firefox/WebKit,
manual review and security reassessment remain pending; OpenSpec stays2/6.

Owner approved the built-in explicit http/https/mailto URL allowlist. The failing
data-link test is retained and now passes. Subsequent focused tests: 51 Java cases,
zero failures/errors/skips, covering catalogue, renderer, three SSR page types,
EN/ES/FR labels/content, locale-continuous links, exact CSRF preference returns,
fixed learning log categories, unknown-content 404 and retained route denials.
The later clean build supersedes these focused logs (clean removed target).

Executed `./mvnw --batch-mode --no-transfer-progress
-Dmaven.repo.local=.mvn/local-repository -Djava.io.tmpdir=/tmp/opencode clean verify`:
PASS. Log: `target/f13-clean-verify.log` (copied from
`/tmp/opencode/f13-clean-verify.log`). Surefire 243 tests and Failsafe 17 tests,
all pass with zero failures/errors/skips; frontend 13 files/185 cases pass.
Architecture checks included real learning code. Verified the normal JAR has no
fixture classes/resources and retains CommonMark's original META-INF/LICENSE.txt
inside its unmodified nested dependency JAR. Content subset/error/route policy
documented in `docs/delivery/learning-content.md`. OpenSpec task 2.1 complete.

Extended the copied-JAR runner with test-only EN/ES/FR resources, a single published
fixture unit, unlisted draft, hostile HTML/links and escaped metadata. Normal
catalogue emptiness is checked before overlay; existing digest check remains.
The existing local-HTTP preference instance now uses that same copied fixture to
exercise native learning POST/cookie flows; no extra server or security bypass.
New learning suite selected for all three browser engines.

Executed `python3 scripts/verify-home-browser.py`: FAIL, log
`target/f13-chromium-browser.log`. No browser acceptance claimed. Of 119 scheduled
cases, 116 cannot launch Chromium because clean removed target/browser-cache;
three API-only learning cases run but fail because their HTML assertion omitted
Accept: text/html and correctly receives safe JSON 404 instead. Fixture servers
started and normal-JAR digest check completed without error. No runtime HTML
defect established by this result. Proposed minimal follow-up: restore pinned
project-local browser with existing --install (no sudo), request HTML explicitly
in the HTML error tests and rerun. Pause under apply error rule before correction.

OpenSpec 2/6 complete (1.1 and 2.1). Task 1.2 remains unchecked pending full route
rejection evidence; 2.2 browser/manual review incomplete. Firefox/WebKit, owner
narrow/actual-200%-zoom review and security reassessment/approval not run here.
Boot stays 4.1.1; no fingerprint refresh, commit, push, publication or archive edits.
Actual owner effort not reported. Earlier renderer/sequencing pauses superseded.

Bookkeeping checks: both planning renderers ran; 21 planning-rule tests, strict
F13 OpenSpec validation and `git diff --check` PASS. Planning integrity FAILS on
nine intentional javascript/data/encoded unsafe Markdown fixture links: the
generic authored-document walker also scans test content. Do not remove hostile
cases or classify them as safe links. A narrowly scoped fixture/document distinction
is needed before this check can pass. No unrelated planning defects reported.

## Latest result — renderer URL policy pause

The owner selected the simpler catalogue → renderer → SSR sequence. Canonical
UH02/T01 now depend on completed UH01-T01, with delivered OpenSpec1.1 as the
documented additional foundation. The renderer core can precede final SSR;
partially implemented tasks remain unchecked. No scope/estimate/version change.

Added pinned CommonMark0.30.1 and `LessonHtmlRenderer`, using explicit HTML escaping,
URL sanitisation and AST image rejection; no second sanitiser/editor. Upstream
licence is retained in the dependency JAR's `META-INF/LICENSE.txt`.

Focused Maven test run:26 Java cases,25 pass/1 fail (loader11/11;renderer14/15).
Log: `target/f13-renderer-tests.log`. Compilation/frontend checks passed. The
failing data:text/html fixture proves the default CommonMark URL sanitizer still
emits a data URL. No weakening/skipping of the test or public lesson publication.

Read-only `javap` confirms the installed `DefaultUrlSanitizer` accepts an explicit
Collection of schemes. Proposed minimal correction: configure that built-in
sanitizer with http/https/mailto only, retaining URL sanitisation and all hostile
fixtures. Pause under the apply error rule before correcting implementation.
No SSR/browser/manual acceptance or passing renderer slice claimed. OpenSpec1/6;
UH02-T02 blocked pending correction, previous sequencing-only pause superseded.

F07 prerequisite is accepted. Read all F13 requirements/scenarios/tasks and current
architecture, handoff and security constraints. Existing F07/F12 archival changes
are unrelated and preserved. Boot remains 4.1.1; Learn promotion remains off.

Task 1.1 introduces only catalogue/application/resource code, an empty production
published list and focused synthetic tests. No real unit, SSR journey, browser/
manual review, security reapproval or feature completion claimed.

Task1.1 executed: focused Maven `test -Dtest=LearningContentTests` succeeds with
11 Java cases, zero failures/errors/skips. Log: `target/f13-catalogue-tests.log`.
The normal frontend checks also pass as part of Maven. Tests cover real empty
classpath catalogue, single/two-unit ordering, draft/traversal rejection, strict
pre-lookup identity validation, locale completeness/UTF-8, safe failures and
immutable snapshots. No packaged/full-suite claim from this focused command.

Refined UH02/T01 prerequisite to UH01-T02 exactly as planned; IDs, baseline and
forecast unchanged. Both renderers, planning integrity,21 planning-rule tests and
whitespace pass. OpenSpec progress1/6. Canonical UH01-T02 stays in progress until
the SSR slice is implemented/tested; UH02 has not started before its prerequisite.

Implementation sequencing issue: canonical UH01-T02 covers the whole SSR slice,
while UH02's renderer is required for the final unit body and depends on that same
task being complete. The planned dependency refinement is still too coarse to
avoid a temporary renderer or premature task completion. Pause before SSR changes
for approval to implement the safe renderer after the completed catalogue slice,
then finish SSR, adjusting the prerequisite/checklist order coherently. No scope,
requirement, baseline or version change is proposed. No SSR/renderer task marked
done; OpenSpec remains1/6. No commit/push or security-disposition refresh.

# F16 integrated acceptance evidence

Date: 2026-10-20. Owner: Ziuld with AI assistance. Status: locally accepted; runtime and clean-checkout handoff verified.
Authorised: apply plus explicit owner review, bounded F16 security approval and
scoped local commits. No push, deployment or main-spec sync/archive authorised.

## Prerequisites and acceptance matrix

F12 is accepted at 71aeefc9ff02ef611fefc38df192b072fc9e298b; F14 at
7ccc77338b7f88c2ae546822e1198ed6542a8d38, with separate accepted archives.
Read current handoff, architecture/feasibility, F16 EARS/Gherkin/ordered tasks,
OpenSpec artifacts, quality/security policies and relevant existing implementation.
All11 canonical F16 tasks and all four acceptance scenarios are complete.
Earlier progress notes below are historical; final results supersede pending notes.

| Criteria | Verification/evidence | Current result |
|---|---|---|
| F16-UH01-R01 / AC01 | Complete EN/ES/FR Home/Tools/F06/F07/Learn/course/unit-answer/error journeys; normal/copy JAR, Chromium, owner review | PASS; details and provenance below |
| F16-UH01-R02 / AC02 | Planning negative fixtures plus real defect triage; failure keeps epic open | PASS; details and provenance below |
| F16-UH02-R01 / AC01 | Accepted local candidate revision, clean-checkout build, packaged asset/health/route smoke/shutdown, digest/version identity | PASS; details and provenance below |
| F16-UH02-R02 / AC02 | Reviewed runbook/limitations, local scope without accounts/cloud/publication | PASS; details and provenance below |
| F00–F05 foundation | Accepted evidence remains historical baseline; rerun integrated build/architecture/CSP/locale/keyboard regressions for F16 | PASS; details and provenance below |
| F06/F07 correctness/privacy | Existing token-preserving JSON, diagnostics, worker/copy/clear and traffic/storage/log tests | PASS; details and provenance below |
| F12 local runtime/supply chain | Final build/smoke/security review with actual candidate scope | PASS; details and provenance below |
| F13/F14 learning | One real reviewed unit; safe empty/draft/synthetic/error cases, no-JS/native locale, no editor | PASS; details and provenance below |
| Shared manual quality | Owner EN/ES/FR, keyboard/focus/dialogs, narrow/wide, actual browser 200% zoom | PASS; details and provenance below |
| Final V1 security | Actual dependency/secret/SAST gate and reassessment of eight bounded decisions | PASS; details and provenance below |

All V2 features remain frozen; Chromium is the sole required browser. No speech
review/full-WCAG or optional Firefox/WebKit compatibility claim. Actual owner
effort unreported. CSS zoom/screenshots cannot establish actual browser zoom.

## Historical implementation progress (superseded by final results below)

Task 1.1: HomeNavigation is composed from LearningPages' published catalogue in
bootstrap rather than an unconditional enabled flag or a site-to-outbound import.
Empty catalogue Home rejection and real publication assertions updated. Focused
checks pending. Task checkboxes remain open until their checks pass.

Task 1.1 verified: focused Maven run PASS, 74 Java tests plus 17 packaged
integration tests and 185 frontend tests; target/f16-focused-navigation.log.
Initial focused run exposed empty Tools/learning shell sections; the shared advice
now supplies the descriptors and the rerun passes. Architecture boundaries pass.
Task 1.1 checked; shared locale/integrated browser verification still pending.

First full candidate run exposed error rendering outside an MVC web context:
SafeHttpErrors deliberately uses a plain Thymeleaf Context, so its Home link must
use an escaped attribute composed from the resolved supported language rather
than a context-relative URL expression. Fixed within F16 error integration;
original early-error tests and packaged expectations retained/updated. Full rerun
pending; the failed run is not acceptance evidence.

## Verified F16 integration candidate

Full Maven verification PASS: 257 Java tests, 17 packaged integration tests and
185 frontend tests; target/f16-verify.log. Chromium PASS: 125/125, no skipped,
flaky or unexpected cases, Playwright 1.63.0; target/f16-chromium.log. Existing
JSON/CSP/privacy/worker/locale/no-JS and hostile learning checks remain active.
The real Home-to-unit journey retains explicit EN/ES/FR over a saved English
preference and verifies native preference POST to the clean unit path.
Agent inspected French Home and Spanish unit narrow captures: no additional
styling defect. Actual browser zoom and owner review remain pending.

Planning integrity PASS, 22 planning-rule tests PASS after sandbox write permission
for temporary project fixtures, strict OpenSpec PASS. Controlled status fixtures
remain synthetic; real defects were fixed (empty shared navigation, non-web error
link context), and pending acceptance gates keep the epic open.

OpenJDK 25.0.4.1, Maven Wrapper 3.3.4/Maven 3.10.0, Boot 4.1.1; Linux x86_64.
Candidate JAR SHA-256:
`d5a13164d6cc3ec91bf5a650ba76b4f98515917565873cac29cb8277dbed42db`.
OpenSpec 1.1/1.2/1.3/2.1 complete; owner effort unreported.

## Proposed bounded F16 security approval

Security policy tests PASS 18/18. Actual scan first rejected stale Java DB.
Preserved old ignored metadata as metadata-before-f16.json, downloaded a current
index and reran; no freshness rule/timestamp was edited. Fresh vulnerability DB:
2026-10-20T13:14:22.737606427Z; Java DB: 2026-10-20T00:59:02.286523053Z.
Actual gate still exits nonzero/incomplete, invalid-applicability-scope: previous
F14 approval does not cover changed server composition. Logs:
target/f16-security-policy-tests.log, target/f16-security-reassessment.log.
POM70/JAR60/frontend166/e2e5 inventories; all45 production source files analysed;
no secret or SAST finding. Same8 high/critical CVEs as16 POM/JAR observations and
same2 medium CVEs as4 nonblocking observations; no new scanner finding.

Reassessed current sources: F16 adds no server payload processing, Tomcat container
security/authentication or JSON bindings. Trusted manifest InputStream/readTree
remains the only Jackson use. The eight exact proposed decisions below retain
Boot4.1.1, owner Ziuld and exclusive UTC expiry2026-11-01. No renewal or policy edit
is authorised yet. Candidate configuration SHA-256:
`86448545c37a015e416636702e4957651c7526742493106d3c7fbffdd2319250`.

- CVE-2026-65182 / org.apache.tomcat.embed:tomcat-embed-core / 11.0.24: Reviewed application has no servlet-container security constraints; access control uses the Spring Security allowlist.
- CVE-2026-65905 / org.apache.tomcat.embed:tomcat-embed-core / 11.0.24: Reviewed application does not configure Tomcat DIGEST authentication.
- CVE-2026-68525 / org.apache.tomcat.embed:tomcat-embed-core / 11.0.24: Reviewed application does not configure Tomcat FORM authentication or container method-specific security constraints.
- CVE-2026-89407 / tools.jackson.core:jackson-core / 3.1.5: Reviewed application accepts no typed JSON request bodies; its Jackson usage reads trusted manifest data into a tree without string-to-number coercion.
- CVE-2026-89425 / tools.jackson.core:jackson-core / 3.1.5: Reviewed application does not create a JSON parser from DataInput; trusted manifest parsing uses InputStream.
- CVE-2026-68497 / tools.jackson.core:jackson-databind / 3.1.5: Reviewed application does not deserialize untrusted JSON into XML Duration or XMLGregorianCalendar values.
- CVE-2026-91776 / tools.jackson.core:jackson-databind / 3.1.5: Reviewed application has no name-based polymorphic JSON binding or defaultImpl fallback accepting untrusted type identifiers.
- CVE-2026-91777 / tools.jackson.core:jackson-databind / 3.1.5: Reviewed application has no identity-enabled JSON collection/map deserialization or JsonIdentityInfo bindings.

Primary sources inspected on2026-10-20: [Tomcat vendor advisories](https://tomcat.apache.org/security-11.html),
[Jackson numeric coercion](https://github.com/FasterXML/jackson-core/issues/1649),
[DataInput parser](https://github.com/FasterXML/jackson-core/pull/1698),
[XML datatype advisory](https://github.com/FasterXML/jackson-databind/security/advisories/GHSA-q4xh-88c3-wmh7),
[type-ID cache](https://github.com/FasterXML/jackson-databind/pull/6203) and
[identity collection/map resolution](https://github.com/FasterXML/jackson-databind/pull/6204).
Application applicability is a code/config assessment. New vendor Tomcat entries
published today concern optional AJP/HTTP2/JNDI/TLS/Jasper paths not enabled in
this local HTTP configuration; no additional blanket disposition is proposed.
All findings stay visible; unmatched/new findings, secrets and SAST still block.

## Owner review and next gates

Preview http://127.0.0.1:34365, PID76706, exec session50621; log
 target/f16-owner-review-server.log. Home EN/Tools ES/real unit FR readiness200.
Local-profile filesystem assets serve native HTTP preference/manual review;
this is not clean-checkout packaged-asset evidence. Stop after owner review.
Owner must review full EN/ES/FR Home/Tools/JSON/Learn/course/unit-answer/error,
keyboard/focus/editor Escape/Tab/dialogs, narrow/wide, actual browser200% zoom and
no-JS states. No owner observations/acceptance supplied yet. Await explicit bounded
security-scope and local-commit approval; then rerun gate and finish UH01 before
UH02 clean-checkout handoff. No commit/push/deployment/sync/archive occurred.

## Owner sign-off and bounded scope approval

2026-10-20: owner explicitly answered "Reviewed and approved" to the complete
F16 preview checklist, "Approve the bounded F16 scope" to the eight exact
CVE/package/version decisions retaining Boot4.1.1 and2026-11-01 expiry, and
"Allow scoped local commits" after required passing checks (no push/publication/
deployment/archive). Record checklist approval only; no detailed manual
observations, browser/version or viewport details were supplied or invented.
Preview PID76706 verified against its Java/JAR/local-profile command and sent
SIGTERM after review; process exit confirmation follows.

### Approved bounded F16 dispositions

The owner approved the proposed fingerprint86448545c37a015e416636702e4957651c7526742493106d3c7fbffdd2319250,
with the eight exact existing decisions/reasons and exclusive UTC expiry2026-11-01.
Only approval date/reference/fingerprint change in security/applicability.json;
findings, reasons, expiry and Boot version remain unchanged. Final actual gate
must pass before candidate commit/UH01 closure.

## Accepted candidate before local integration

Preview process stopped (exit0 from wrapper; Java SIGTERM was intentional).
After the explicit owner approval, security/applicability.json updated only date,
reference and reviewed fingerprint; exact8 findings/reasons/expiry unchanged.
18 policy tests and actual security gate PASS; target/f16-approved-security.log.
All45 production sources covered;16 approved bounded observations plus4 medium,
zero blockers/secrets/SAST. Fresh database metadata unchanged. Runtime/browser/
security inputs match their passing evidence; no repeat build/browser run needed.
Owner checklist accepted, detailed observations not supplied. UH01 automated/manual/
security and controlled status criteria pass; actual local commit reference is
pending. UH02 and the epic remain open until local reproduction/handoff completes.

## UH01 local integration and UH02 handoff preparation

Authorised coherent implementation commit: 3bfc8c59c0bf5e9f9ca01901b9847b7f8d60c608 (49 scoped files).
Staged runtime/test/browser inputs matched passing scan hashes before commit;
no unrelated archives staged. UH01 all6 canonical tasks and all acceptance gates
complete; OpenSpec2.4 checked after actual commit identity exists. UH02 now starts
from that real accepted implementation, with existing runbook/limitations reviewed.
Feature/epic stay open until clean-checkout reproduction and final handoff pass.

UH02 runbook authored and reviewed against existing commands/configuration:
docs/delivery/local-release.md, README/CONTRIBUTING links and affected existing
asset/shared/locale/repository guidance. Stale health-only/Home-only/no-selector
claims corrected. Build pins match actual wrapper/POM; normal empty-directory
packaged startup and native local-profile preview separated. Wrapper/JVM temp
paths are project-local; only ignored dependency-cache reuse is permitted. No
account/cloud/Docker/publication step. OpenSpec3.1 complete; actual clean-checkout
build/run is next, not claimed as passed by documentation review.

## Clean-checkout reproduction and final local acceptance

Implementation:3bfc8c59c0bf5e9f9ca01901b9847b7f8d60c608.
Tested runbook/handoff checkout:a6ed966ec2a03548bca8100b5054b0f0c93de127.
Created a separate detached checkout at target/f16-clean-checkout, initially clean
with no target/node_modules/generated artifacts. Reused only the original ignored
Maven dependency archive cache through a task-created link, then removed that link
without deleting the cache. Source checkout remained clean. Wrapper downloads and
JVM temporary directories were project-local; no global install/sudo/container.

Executed documented build with MAVEN_USER_HOME pointing at the project dependency
cache: PASS257 Java+17 packaged integration+185 frontend cases. Log:
target/f16-clean-checkout-build.log. Fresh compiled/package entries all match the
reviewed artifact exactly, including the whole JAR SHA-256:
`d5a13164d6cc3ec91bf5a650ba76b4f98515917565873cac29cb8277dbed42db`.
Approved server fingerprint also matches exactly. Prior Chromium125/owner/security
results apply to the identical runtime; no repeat browser install/run was needed.

Executed the clean checkout's documented scripts/smoke-java-baseline.py: PASS
manifest/start/health200-UP/child shutdown (exit143 after intentional SIGTERM).
Then ran the documented normal-profile Java command from target/local-release-run
on127.0.0.1:8080 with project-local JVM tmp; no generated frontend tree in that
working directory. All four documented curl commands PASS. Extended route smoke:
24 pages (eight routes times EN/ES/FR), six safe404/403 responses, three linked
packaged CSS/JS/B assets with exact JAR bytes, no-store/CSP/localised HTML and
language-preserving recovery all PASS. Health is UP with only its existing probe
group names, no component details. The first ad hoc exact-health-object assertion
was over-specific; corrected to the documented UP/no-details contract and rerun,
without runtime or required test changes. Final server shut down cleanly (exit143).
Logs:target/f16-clean-checkout-smoke.log,target/f16-clean-packaged-server.log,
target/f16-runbook-curl-smoke.log; structured identity/route outcomes:
target/f16-clean-checkout-identity.json. No preview/reproduction process remains.

Runbook/limitations reviewed against executed commands: one unit, Chromium-only
required coverage, visible bounded security findings/expiry, no full-WCAG/speech
claim, no licence grant or implied cloud/account/Docker/publication step. Accepted
owner checklist provenance above is unchanged. F16-UH02 AC01/AC02 and all retained
V1 criteria pass; no unresolved release-blocking defect remains. Two planning
negative fixtures now explicitly open copied V1 feature/story states rather than
relying on the real baseline remaining unfinished. The validator and acceptance
policy are unchanged; no fake fixture status/evidence enters the canonical plan.

Local F16/epic completion references the actual implementation/handoff commits
above. A later closure commit records these results and generated status views;
it does not pretend to be the clean-checkout revision. V2 stays frozen, owner
actual effort remains unreported, and no push/public release/deployment or OpenSpec
main-spec sync/archive occurs. Final closure checks PASS: planning integrity,22 negative/positive rule tests,
strict OpenSpec across14 items and whitespace. The actual final security gate
PASS again after runbook/planning-fixture changes (target/f16-final-security.log),
with45 production sources, unchanged exact bounded decisions and zero blockers.
No application/browser input changed after its passing build/Chromium review.

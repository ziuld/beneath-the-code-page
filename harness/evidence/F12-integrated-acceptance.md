# F12 — integrated acceptance evidence

Date: 2026-10-18. Status: F12 accepted with bounded applicability dispositions;
implementation committed locally as `71aeefc9ff02ef611fefc38df192b072fc9e298b`.

## Inherited accepted results

Catalogue, EN/ES/FR journeys, keyboard/manual acceptance and the loopback JAR
workflow are credited by [F12 simplification](F12-simplification.md) and
[final F07 acceptance](F07-UH02-json-minification.md). No repeat build, browser
or manual-review result is claimed. Existing limitations remain unchanged.

## Unknown-tool response reconciliation — UH01-T04

The owner accepted retaining safe localised 403. F12-UH01-R02/AC02 now align with
the accepted `secure-http-responses` specification and unchanged
`PublicPageSecurity` deny-by-default handling. `SafeHttpErrorsTests` covers denied
unlisted paths in EN/ES/FR without disclosure, sessions or unsafe headers;
[F04 security evidence](F04-UH02-secure-http-responses.md) and retained F07
regressions establish accepted verification. A distinct tool-route controller or
duplicate assertion would exercise the same unconditional denied-route branch.

No application/security code changed and no application tests were rerun for this
documentation reconciliation. Both planning renderers, planning integrity,
21/21 planning-rule tests and `git diff --check` pass for task 1.1.

## Security gate — UH02-T04

The owner approved the simple Python hashlib correction. Checksum-pinned Trivy
0.76.0, Semgrep OSS 1.181.0 and uv 0.13.1 are installed under
`target/security-tools`; Semgrep's transitive Python dependencies are hash-locked
in `security/requirements.lock`. No global installation or system change.

Implemented `scripts/install-security-tools.py`, `scripts/verify-security.py` and
10 focused policy tests in `scripts/test-security.py`. The gate is integrated
after the existing Maven build in `.github/workflows/java.yml`; the existing
delivery runbook and `security/README.md` document commands, scope and limitations.
No scan pass or security exception is claimed.

Read-only distribution discovery found Trivy v0.76.0, Semgrep 1.181.0 and uv 0.13.1;
none installed. The current Semgrep wheel supports Python 3.10–3.14. Upstream
rules revision inspected: `17e31e11ebac99fb7dfe1cd288f7a32151b6f3f9`.
Its Semgrep Rules License permits internal use but not redistribution; any future
installation must keep downloaded rules under ignored project-local tooling,
preserve notices and never vendor/upload them as project source or shared artifacts.

The earlier Code Mode checksum-helper failure is resolved using Python hashlib.

Executed results:
- Scanner installation succeeds on host Python 3.14.7; Trivy and Semgrep report
  the pinned versions. All seven rule files and the licence notice match hashes.
- `python3 scripts/test-security.py`: 10/10 pass (clean/blocking findings,
  malformed/missing coverage, scanner errors, data freshness and output redaction).
- Actual Trivy detects a synthetic GitHub-token-shaped fixture; its projected
  finding blocks and contains no secret value. No real credential was used.
- Actual Semgrep detects synthetic Java XXE and TypeScript dynamic-innerHTML
  fixtures, returns a findings exit, and reports complete fixture coverage.
- An actual invalid Semgrep configuration propagates to incomplete verification.
- CI configuration checks confirm the security command follows the existing build,
  uses read-only permissions, no privileged PR event/secrets and no continue-on-error.
- Whitespace check passes. No new Maven/browser/manual acceptance run.

Candidate invocation `python3 scripts/verify-security.py` exits 1 with status
`incomplete`, error `incomplete-java-inventory`. The npm direct/dev inventory
checks completed before the Java assertion, but Java/JAR inventory and full
application source coverage are not established. Later scans are not claimed run.
Redacted result: `target/security/summary.json`, source revision
`363591257ffa70b70c3913648dc6a6e1a237d95b` with explicitly dirty working-tree hashes.
No raw scanner output or secret excerpts are published.

Pause under the apply error rule. Inspect the returned Java inventory next to
distinguish a scanner-input gap from an assertion mismatch; do not remove the
inventory requirement or classify this as clean. Task 2.1 remains unchecked until
actual input/source coverage is proved. Task 2.2 is complete with the integration,
documentation and negative checks above. Overall OpenSpec progress: 2/5 complete;
2.1, 3.1 and 3.2 remain open. No remote CI result is claimed.

## Inventory correction and actual candidate results

The owner authorised diagnosis/correction of the Java inventory integration.
Trivy's documented coverage table confirms filesystem mode analyses POM/lockfiles,
not JAR binaries. Local `rootfs` mode analyses the staged packaged JAR; it is not
a container, OS deployment or new runtime. The initial diagnostic reused a
filesystem-only `--include-dev-deps` flag and produced non-JSON help; the corrected
mode-specific command omits that unsupported flag while preserving npm dev checks.
Reference: https://trivy.dev/latest/docs/coverage/language/.

The gate now combines filesystem POM/npm results with local rootfs JAR results;
both Java inventories remain mandatory. No weakened inventory assertion. Added
regressions cover mode selection, missing packaged inventory and valid identified
clean Trivy reports that omit Results. `python3 scripts/test-security.py`:13/13 pass.

The actual candidate invocation now completes all configured scans and exits1
with status `blocked`, not `incomplete`. Actual inventories:

| Input | Unique package names |
|---|---:|
| pom.xml | 69 |
| src/main/frontend/package-lock.json (including dev) | 166 |
| tests/e2e/package-lock.json (including dev) | 5 |
| Packaged Java JAR | 59 |

Semgrep scanned all35 expected main Java/TypeScript files with no errors or
findings under the selected rules. The candidate secret scan reported no findings.
Database update times: vulnerability DB2026-10-18T13:11:41.355239553Z;
Java DB2026-10-18T00:58:00.305003613Z; both passed the24h freshness check.
Redacted report retains dirty-state/revision/input hashes; diagnostic and candidate
runs reuse the existing JAR, with no application rebuild or browser/manual rerun.

### Unresolved findings reported by Trivy

These are scanner classifications, not confirmed exploitability assessments.
Each appears in both POM and packaged-JAR results:8 unique blocking CVEs,
16 blocking observations. No suppression, waiver or upgrade has been applied.

| Dependency | Version | Reported CVE | Severity |
|---|---|---|---|
| org.apache.tomcat.embed:tomcat-embed-core | 11.0.24 | CVE-2026-65182 | CRITICAL |
| org.apache.tomcat.embed:tomcat-embed-core | 11.0.24 | CVE-2026-65905 | CRITICAL |
| org.apache.tomcat.embed:tomcat-embed-core | 11.0.24 | CVE-2026-68525 | CRITICAL |
| tools.jackson.core:jackson-core | 3.1.5 | CVE-2026-89407 | HIGH |
| tools.jackson.core:jackson-core | 3.1.5 | CVE-2026-89425 | HIGH |
| tools.jackson.core:jackson-databind | 3.1.5 | CVE-2026-68497 | HIGH |
| tools.jackson.core:jackson-databind | 3.1.5 | CVE-2026-91776 | HIGH |
| tools.jackson.core:jackson-databind | 3.1.5 | CVE-2026-91777 | HIGH |

Two additional medium Jackson-databind CVEs, CVE-2026-19032 and CVE-2026-83557,
remain recorded (four observations across POM/JAR); they are not silently dropped.

Pause for guidance on advisory applicability/remediation. The gate is working;
an unsafe candidate is not acceptable merely because it was detected correctly.
Prefer an authoritative-advisory-led, Spring-Boot-managed patch upgrade if needed,
not independent Tomcat/Jackson overrides, but no fixed version is assumed or
change authorised here. OpenSpec task2.1 now complete; progress3/5. Tasks3.1/3.2
remain open for triage and integrated acceptance. F12 and UH02/T04 stay blocked.
The historical inventory-only pause above is superseded, not a current limitation.

## Authorised managed-upgrade investigation

The owner requested the recommended advisory-led, minimal Spring-Boot-managed
upgrade approach. Read-only checks on2026-10-18 establish:

- CNA-published CVE records confirm all eight blocking affected-version ranges;
  these are not merely unverified scanner identifiers.
- Tomcat fixes these three reports in11.0.25; the installed11.0.24 is affected.
- Jackson Core3.1.5 is affected by89407/89425 through3.1.6, so the3.1 line needs
  a version newer than3.1.6 for both. Databind68497 is fixed in3.1.6, but91776/
  91777 affect through3.1.6 and require a newer patch. No fixed Boot version is
  inferred from these component ranges.
- Maven Central starter-parent metadata lists4.1.1 as the newest stable4.1 patch;
  the4.1.2 BOM URL returns404. Published4.2 entries are milestones, not an
  equivalent stable patch. Boot4.1.1's BOM manages Tomcat11.0.24 and Jackson3.1.5.
  The4.0.8 BOM manages those same versions; a downgrade would not remediate them.

### Applicability review (no exception approved)

| Reports | Advisory prerequisite | Inspected application evidence |
|---|---|---|
| Tomcat65182 | Ordered overlapping servlet-container security constraints | No web.xml, SecurityConstraint or addSecurityConstraint configuration found; access policy is Spring Security's explicit allowlist |
| Tomcat65905 | Tomcat DIGEST authentication | No DIGEST configuration; the application has no account/authentication flow |
| Tomcat68525 | Tomcat FORM authentication with method-specific constraints | No container FORM/login configuration; Spring formLogin/basic/logout are disabled |
| Jackson Core89407 | Untrusted JSON string-to-number coercion | No RequestBody/typed JSON input endpoint; browser tool processing is local |
| Jackson Core89425 | JsonFactory parser from untrusted DataInput | No createParser/DataInput JSON use found; asset manifest uses an InputStream |
| Jackson Databind68497 | Untrusted JSON bound to XML Duration/XMLGregorianCalendar | No such bindings or typed JSON input endpoints found |
| Jackson Databind91776 | Name-based polymorphism with fallback for attacker-controlled IDs | No JsonTypeInfo/defaultImpl configuration found |
| Jackson Databind91777 | Untrusted JSON bound to identity-enabled collections/maps | No JsonIdentityInfo configuration found |

`AssetManifest.java` reads trusted build-manifest content into a JSON tree; this
is not a user JSON processing endpoint. `PreferenceRequestBoundary` accepts only
bounded URL-encoded preference forms, not JSON. These observations support a
narrow applicability assessment, not a blanket claim that transitive framework
behaviour can never reach vulnerable code. No exploit proof, suppression, VEX
disposition, owner exception or expiry has been invented.

The requested stable managed upgrade cannot currently be applied. No POM,
Tomcat/Jackson override, runtime code or version-dependent assertion changed.
No build or scan rerun was needed for this read-only investigation. F12 remains
blocked pending a published suitable stable Boot patch or a separately approved,
finding-specific temporary applicability disposition. Do not adopt a milestone
or override independently without a new explicit decision.

Sources inspected (CVE records include CNA descriptions, affected ranges and
vendor-advisory/patch links):
- https://cveawg.mitre.org/api/cve/CVE-2026-65182
- https://cveawg.mitre.org/api/cve/CVE-2026-65905
- https://cveawg.mitre.org/api/cve/CVE-2026-68525
- https://cveawg.mitre.org/api/cve/CVE-2026-89407
- https://cveawg.mitre.org/api/cve/CVE-2026-89425
- https://cveawg.mitre.org/api/cve/CVE-2026-68497
- https://cveawg.mitre.org/api/cve/CVE-2026-91776
- https://cveawg.mitre.org/api/cve/CVE-2026-91777
- https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-starter-parent/maven-metadata.xml
- https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/4.1.1/spring-boot-dependencies-4.1.1.pom
- https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/4.1.2/spring-boot-dependencies-4.1.2.pom (not published)
- https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/4.0.8/spring-boot-dependencies-4.0.8.pom

## Version constraint and proposed applicability disposition

The owner instructed keeping initial Spring Boot4.1.1 through application
completion unless it genuinely prevents progress. POM and managed dependencies
remain unchanged. Scanner execution and advisory/source triage are complete;
the remaining issue is acceptance of these findings for this configuration.

Proposed for explicit owner approval only:

- Scope: the eight CVEs in the table above, individually matched to
  `org.apache.tomcat.embed:tomcat-embed-core`11.0.24,
  `tools.jackson.core:jackson-core`3.1.5 or
  `tools.jackson.core:jackson-databind`3.1.5, as applicable. Cover both POM/JAR
  observations, never the dependency or severity globally.
- Reason: each advisory's prerequisites are not configured in the inspected V1
  source, as documented individually above. Jackson reads trusted manifest data
  through InputStream/readTree; the only preference POST parses bounded encoded
  string parameters, not typed JSON.
- Proposed expiry:2026-11-01, or an earlier relevant security/routes/JSON parsing
  or dependency change. No automatic renewal. Reassess for final V1 acceptance.
- Invalidate on new container authentication/constraints, JSON input endpoints,
  DataInput parsing, typed XML values, polymorphism or identity bindings.
- Owner: Ziuld, approval pending. This is a conditional applicability assessment,
  not proof of universal non-exploitability or permission for public deployment.

No exception is enabled. The command/CI still block all eight findings. Unrelated
findings, expired dispositions, changed prerequisites and scanner failures must
remain blocking. Keeping the initial version is not interpreted as blanket risk
acceptance. Any enforcement change requires approval of this exact bounded scope.

Task3.1's actual scan, traceable result, negative-gate proof and explicit advisory
triage are complete. The result is BLOCKED, not a passing release candidate.
OpenSpec progress4/5; task3.2 and F12 acceptance remain open. No new scan, build,
manual review, remote CI pass, code change or security exception is claimed.

## Approved bounded dispositions

Following the direct question proposing eight exact, configuration-bound
dispositions until1 November2026, the owner's instruction "then can you continue?"
is taken as approval to proceed with that stated bounded scope. It does not
authorise a blanket ignore, indefinite waiver, dependency override or deployment.
Spring Boot remains4.1.1. Earlier approval-pending statements above are historical.

Implemented `security/applicability.json` with each CVE/package/version, individual
reason, owner Ziuld, approval reference and expiry2026-11-01 (exclusive, UTC).
The fingerprint binds source server code/configuration and packaged server
classes/configuration; server additions or changes invalidate approval, while ZIP
timestamps and ordinary translated UI prose do not. No automatic fingerprint or
expiry refresh. Final V1 acceptance must reassess the decisions.

`verify-security.py` retains every finding, its original severity and default
blocking state, adding the exact applicability decision only for matching POM/JAR
vulnerability observations. Unmatched CVEs/packages/versions/targets, secrets,
SAST findings, invalid/expired approvals, changed scope and scanner failures remain
blocking. This is a bounded conditional assessment, not a claim of universally
non-vulnerable component versions.

Executed after the policy change:

- `python3 scripts/test-security.py`:18/18 pass. New checks retain default findings,
  reject other CVEs/packages/versions/targets, never dispose secrets/SAST, reject
  missing approval/reasons/duplicates, expiry/future approval and changed source/
  packaged configuration. Existing scanner-error checks remain passing.
- `python3 scripts/verify-security.py`:exit0, status `pass` under the approved
  policy, not a claim of zero vulnerable component versions. Actual POM69/JAR59/
  frontend166/e2e5 package-name inventories and35/35 source coverage retained.
- All8 approved CVEs remain as16 POM/JAR observations with severity, default
  blocking state, owner/reason/expiry and decision reference. Remaining blockers0;
  the two medium CVEs remain visible as4 additional observations.
- Both database freshness checks pass; input/dirty-state hashes and the reviewed
  configuration fingerprint remain in `target/security/summary.json`.
- POM, Boot4.1.1, runtime source, browser code, CSP and the accepted JAR remain
  unchanged. No unnecessary Maven/browser/manual review repeated. No remote CI
  pass inferred from local execution or configured workflow steps.
- Final tracking checks: both planning renderers, planning integrity,21/21
  planning-rule tests, strict change validation and whitespace pass. Empty diff
  for POM/main Java/frontend confirms no runtime or dependency edits. Subsequent
  evidence/status updates are bookkeeping, not a new scanner result.

## Shared closure — UH01-T05 / UH02-T05

UH01 closes against inherited accepted publication commit
`770aa98ea3ceafe7e7678c3e35109ec844d1d925`, the approved403 reconciliation and
evidence above; no empty new commit or repeat catalogue review is needed.

UH02 security verification T04 is complete with actual passing evidence under the
approved dispositions. The owner instructed continuing after the coherent local
commit was identified as the only outstanding item. Implementation commit
`71aeefc9ff02ef611fefc38df192b072fc9e298b` now contains the scanner/CI/policy,
tests, runbook and evidence. The committed scanner, policy, lockfiles and workflow
inputs match their SHA-256 hashes in the passing candidate report. Evidence/status
bookkeeping after that scan does not change the verified security implementation
or runtime; no duplicate scan or application test run is inferred.

Both stories/all canonical F12 tasks are accepted; OpenSpec5/5 and F12 done.
Historical14h baseline and IDs remain; actual effort is unreported. No second
manual review or empty commit was required. The eight applicability decisions
expire2026-11-01 and invalidate on changed reviewed configuration; final V1
acceptance must reassess them. This is not a zero-vulnerability or public-deployment
claim. Local checks establish acceptance; the configured new remote CI steps have
not run without publication, and no remote pass is claimed. No push, merge,
release, spec sync or archive performed. Separate F07 archival edits remain intact.

Final closure tracking checks executed: both planning renderers succeed;
planning integrity and all21 planning-rule tests pass; strict OpenSpec validation
and whitespace pass. CLI apply state is `all_done`,5/5. Final bookkeeping changes
are documentation-only and follow the verified implementation commit.

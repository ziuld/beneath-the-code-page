# F14 — integrated acceptance evidence

Started/accepted:2026-10-19 under the Chromium-only MVP policy(ADR009).

## Combined acceptance and implementation commit

Local implementation:`7ccc77338b7f88c2ae546822e1198ed6542a8d38`
(`feat(learning): publish the first source-to-JVM unit`).43 scoped F14 files,
including real EN/ES/FR resources, metadata/template/harness changes, tests and
approved security policy. Separate F07/F12/F13 archival/main-spec/task/evidence
edits excluded; only F14 handoff paragraphs staged. Before commit, staged
runtime/security/browser inputs compared with passing scan hashes:PASS.

Both stories/all11 canonical tasks complete; OpenSpec8/8. Acceptance combines
baseline-JDK example/locale parity,254 Surefire+17 Failsafe/185 frontend passes,
Chromium125/125, owner checklist approval,18 policy tests and actual passing
security gate. Eight CVEs remain visible under exact owner-approved decisions
expiring2026-11-01; final V1 reassessment remains required. No zero-vulnerability,
independent translation certification or Firefox/Safari compatibility claim.

Exactly one complete unit is available through the existing learning routes.
Home/shared Learn promotion remains off for F16; no external deployment. Preview
stopped. Owner effort remains unreported, not inferred from elapsed time.
Existing successful evidence reused for unchanged inputs; earlier pending and
failed-test notes below are historical, not unresolved acceptance results.

Closure bookkeeping records the actual implementation hash separately. No push,
remote CI, release, merge, main-spec sync, archive or F16 implementation claimed.

## Owner review and local commit approval

Date:2026-10-19. Owner replied "aprroved" to the explicit three-part sign-off:
real EN/ES/FR page/content review including answer, keyboard, narrow layout and
actual200% zoom; the same8 reassessed F14 security decisions with expiry2026-11-01;
scoped local F14 commits after a passing gate, no push and archive edits excluded.
Record owner checklist approval; no detailed per-check observations or defects
were supplied, and none are invented. Task3.2 complete. Verified the live preview
process identity and sent SIGTERM to PID140430; exit143 confirms termination.

## Approved bounded F14 dispositions

The explicit security sign-off covers only the8 exact CVE/package/version/reason
entries reassessed below, this candidate and unchanged exclusive UTC2026-11-01
expiry. Recomputed fingerprint matches the proposed
`f0114f9e9efe649914b03e4de226c53d81b2d673db8944c44b32fdc551c1550a`.
Updated policy reference/fingerprint only; owner, approval date2026-10-19, findings,
reasons, expiry and Boot4.1.1 unchanged. No automatic renewal or blanket waiver.
Gate rerun required; results recorded when executed.

Executed after approval:18/18 policy tests PASS and actual security gate exit0/
status pass, log`target/f14-approved-security.log`, report`target/security/summary.json`.
44/44 production sources;POM70/JAR60/frontend166/e2e5;16 annotated vulnerability
observations retained plus4 medium observations;0 remaining blockers. Freshness
checks pass. Task4.1 complete; OpenSpec7/8. Existing Maven/Chromium results remain
valid for unchanged source/browser inputs; no repeat build or review needed.
Authorised local implementation commit and real-hash closure bookkeeping follow;
no push, unrelated archive inclusion, F16 promotion or deployment.

## Approved brief and prerequisite refinement

Owner answered "yes" directly to the task1.1 brief: one `source-to-jvm` unit in
EN/ES/FR; no prerequisites for reading, JDK25/basic terminal use for reproducing;
distinguish source/bytecode/JVM and javac/java; change source without recompiling,
explain the unchanged output, then recompile; visible same-page reasoned answer.

F13 is accepted at0742b43/a64b7d2. Read current F14 requirements/scenarios/tasks
and inspected the existing implementation. Refine UH02/T01 dependency to completed
UH01-T02 as designed, retaining all11 IDs/18h baseline/10h forecast. Brief approval
does not close UH01-T03's real-overview comparison or the final educational review.
No application tests, publication, security renewal or commit claimed at this step.
Both planning views regenerated; `python3 scripts/check-planning.py` PASS validates
the refined dependencies, traceability and estimates. OpenSpec task1.1 complete.

## Metadata and overview slice

Added required escaped prerequisite/outcome fields, localised overview headings
and honest one-unit/incomplete-course labels; updated loader/domain/fixture tests
and resource documentation. Empty catalogue remains valid; missing/blank new
fields in all3 locales fail with the bounded diagnostic. MVC asserts escaping.
Focused Maven test run35/35 Java cases PASS,0 failures/errors/skips:
`target/f14-metadata-tests.log`. No full verify/browser/publication claim yet.
Task1.2 complete; UH01 final overview/manual acceptance remains open.

## English example verified

Authored the English draft/metadata, source→bytecode→JVM text diagram and explicit
compile/run explanation. Retrieved the official Java25 javac/java/javap manuals
(HTTP200) and checked compiler output, class launch and bytecode inspection roles;
kept compatibility and interpretation/JIT distinctions. No renderer changes.

Extracted the first Java code block into target/f14-example/Main.java and executed
on OpenJDK/javac25.0.4.1: compile exit0/no stdout; run Hello,JVM; edit source only,
run still Hello,JVM with unchanged class digest; recompile exit0 and run
Hello,bytecode with changed class digest. javap corroborates the edited constant.
An intentional missing-semicolon compilation exits1 and preserves the last valid
class/output, verifying the documented caveat. Actual command arguments, exact
stdout/stderr/exit codes, versions and source/class hashes are in
`target/f14-example-evidence.json`. Source/expected output use the actual spaced
greetings `Hello, JVM!` and `Hello, bytecode!`.
Task2.1 complete. Draft remains unpublished; no owner educational review claimed.

## Complete draft translations and exercise

Authored ES/FR explanation/metadata, text diagrams, exercise and visible answer.
Author/reviewer provenance: this assistant drafted and compared technical/language
consistency; no independent human translation review is claimed. One ordinary
page per locale, no new route/widget/execution feature. Localised reasoning
explains identical stale/recompiled outcomes and failed-compile caveat.

Read all3 UTF-8 resource sets; verified5 required metadata keys, exercise/answer
headings, one Java block and3 shell blocks per locale. Java/command blocks are
byte-identical across EN/ES/FR and match the SHA-256/commands of the actually
executed baseline-JDK example, so its observed outputs apply to all3 translations.
Task2.2 complete; final owner educational/keyboard/zoom review remains task3.2.

## Integrated local candidate

Set exactly `published-units=source-to-jvm` for the local review candidate, not
external deployment or final owner acceptance. Home/shared Learn promotion remains
off. Updated normal-JAR/MVC publication assertions; explicit empty-source/MVC
fixtures retain empty-catalogue404. Copied-JAR builder replaces overlapping locale
resources and checks unique ZIP names, real production locales, fixture absence
and normal-JAR digest. Existing hostile fixture/native locale suite remains active.

First Maven verify found one retained F13 locale test still treating `/learn` as
unpublished:251 cases,250 pass/1 fail, log target/f14-verify.log. Changed only this
planned publication assumption to an unpublished draft path and added3 positive
exact learning-return cases; no redirect/security policy was relaxed.

Executed Maven verify after that correction:254 Surefire+17 Failsafe and185
frontend cases PASS,0 failures/errors/skips, log `target/f14-verified-candidate.log`.
Executed `python3 scripts/verify-home-browser.py`:125/125 Chromium PASS, log
`target/f14-chromium.log`; all6 real EN/ES/FR JS/no-JS reading/answer/native preference
journeys and119 retained cases pass. Narrow/automated actual CSS200%-zoom screenshots
in target/f14-*.png; no device-scale-factor substitute or owner review claimed.
No Firefox/WebKit run. Task3.1 complete; OpenSpec5/8. Existing owner review remains
unobserved and security approval unchanged pending reassessment of this candidate.

## Candidate security reassessment — approval pending

Executed `python3 scripts/test-security.py`:18/18 PASS. Executed the unchanged
security gate against the built F14 candidate:exit1/status incomplete with exact
reason `invalid-applicability-scope`, log `target/f14-security-reassessment.log`,
redacted report `target/security/summary.json`. All scans completed before the
unchanged F13 fingerprint correctly rejected changed server/configuration inputs.

Actual inventories remain POM70/JAR60/frontend166/e2e5;44/44 production sources
analysed, no Semgrep/secret finding. Same8 high/critical CVEs remain16 POM/JAR
observations, plus the same2 medium CVEs as4 observations; no new finding or
dependency. Freshness passed for vulnerability DB2026-10-19T00:45:30.553047111Z and
Java DB2026-10-19T01:00:16.492703225Z. This is NOT a passing approved security gate.

Reused the same-day authoritative CNA prerequisites reviewed for F13, then checked
the actual F14 delta: only required escaped course text fields/loader and local
catalogue/Markdown resources; existing renderer/security/route code and Jackson
manifest parsing are unchanged. Search of current production sources confirms:

| Exact CVE / package / version | Reassessed F14 prerequisite |
|---|---|
| CVE-2026-65182 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No overlapping servlet-container security constraints; ordinary Spring allowlist unchanged. |
| CVE-2026-65905 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No container DIGEST authenticator. |
| CVE-2026-68525 / org.apache.tomcat.embed:tomcat-embed-core /11.0.24 | No container FORM login or method-specific container constraints. |
| CVE-2026-89407 / tools.jackson.core:jackson-core /3.1.5 | No typed JSON input or untrusted string-to-number coercion; new metadata remains Properties/strings. |
| CVE-2026-89425 / tools.jackson.core:jackson-core /3.1.5 | No DataInput JSON parser; existing trusted manifest InputStream/readTree unchanged. |
| CVE-2026-68497 / tools.jackson.core:jackson-databind /3.1.5 | No JSON binding to XML Duration/XMLGregorianCalendar. |
| CVE-2026-91776 / tools.jackson.core:jackson-databind /3.1.5 | No name-based polymorphism/defaultImpl or incoming JSON type IDs. |
| CVE-2026-91777 / tools.jackson.core:jackson-databind /3.1.5 | No identity-enabled JSON collection/map bindings or JsonIdentityInfo. |

The existing CommonMark0.30.1/escaping/scheme-allowlist/image-rejection path remains
unchanged, and the real diagram uses inert text. No compile/execute endpoint was
introduced; example execution was author verification only. Published return paths
remain catalogue-derived, as proven by positive and negative Java/Chromium tests.

### Proposed bounded F14 approval

Propose retaining only these8 exact CVE/package/version/reason decisions for the
reviewed F14 source/configuration and packaged server, owner Ziuld, unchanged
exclusive UTC expiry2026-11-01 and Boot4.1.1. Keep findings visible, unmatched
findings blocking and final V1 reassessment required. No blanket waiver or
deployment approval; scanner results do not prove universal non-exploitability.

Candidate fingerprint, computed with the existing verifier:
`f0114f9e9efe649914b03e4de226c53d81b2d673db8944c44b32fdc551c1550a`.
F13 policy/fingerprint remain unchanged until explicit owner approval; recompute
and compare before any approved write, then rerun the gate.

## Owner review preview — pending

Normal built JAR running loopback-only at
`http://127.0.0.1:35291/learn?lang=en`, local profile, PID140430,
shell`sh_152fae786001sMqLyX6OEFpN5I`, log`target/f14-owner-review-server.log`.
Nine page/locale readiness GETs PASS(200/no-store/correct language). JAR SHA-256:
`9c2a7c864cc7482478ebb49f4047f1a2dd41a3f2e2c3c7f13e4b9a14d0c19f88`.

Owner must review real overview/unit/answer EN/ES/FR against the agreed brief,
including reasoning/translations, keyboard/native language, narrow/actual200%-zoom
and honest one-unit scope. No observation or approval invented. Stop preview after
review. OpenSpec5/8: owner review, approved security gate and authorised local
commit/closure remain pending. No push, site promotion or archive changes.

Final handoff checks: both planning views regenerated; planning integrity,
22 planning-rule tests, strict F14 OpenSpec validation and whitespace PASS.

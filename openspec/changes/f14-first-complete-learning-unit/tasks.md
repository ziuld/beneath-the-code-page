# Tasks

Discovery is complete; queue only the concrete work below. Keep the11 canonical
F14 IDs and18h baseline/10h forecast. Tests/documentation belong to their slice.
No checkbox is complete merely because the proposal or another feature is done.

## 1. Agreed brief and minimal overview data

- [x] 1.1 (F14-UH01-T01/T02, F14-UH02-T01) Present the short source-to-JVM brief from design.md, record owner agreement on prerequisites/outcomes and the proposed source-to-jvm identity, and refine UH02/T01 prerequisites to completed UH01-T02 without changing IDs/effort. Verify canonical dependency integrity; keep UH01-T03 and story closure open until the real overview is reviewed. Record the agreement in the combined F14 evidence, not as a completed full-course syllabus.
- [x] 1.2 (F14-UH01-T02/T03/T04) Add the two required localised course metadata fields, escaped overview sections and EN/ES/FR one-unit/incomplete-course labels. Update the existing loader/domain/MVC fixtures and focused tests together: missing/blank new fields fail safely for published data, empty catalogues remain valid, labels/metadata agree with the brief and unavailable units are not linked. Document the resource additions without compatibility constructors or a new content abstraction.

## 2. Complete localised unit and verified reasoning

- [x] 2.1 (F14-UH02-T02/T04) Draft the English explanation, text diagram/prose equivalent and conventional Java example under the existing resource layout. Verify explicit javac/java commands on the baseline JDK in a project-local temporary directory; record tool versions, source identity, commands, stdout/exit codes and compatibility/JVM terminology checks against the cited Java25 references. Keep the draft unpublished and use only the accepted inert Markdown subset.
- [x] 2.2 (F14-UH02-T03/T04/T05) Add the exercise, same-page visible explanatory answer and complete ES/FR translations, including metadata, diagram explanation and instructions. Execute the no-recompile/recompile exercise states and compare output/reasoning across languages; review translation consistency and technical claims, record actual reviewer provenance and fix discrepancies. Keep code identity/commands consistent and all locale resources complete; do not claim independent human language review before the owner review in3.2.

## 3. One-unit publication and integrated Chromium review

- [x] 3.1 (F14-UH01-T03/T04, F14-UH02-T04/T05) After the technical/content checks, populate the normal catalogue with exactly source-to-jvm and adapt the existing Java/copied-JAR/learning.spec.mjs checks for the real candidate. Replace overlapping ZIP entries rather than duplicate them; verify unique names, normal-JAR fixture absence/digest preservation and copied-catalogue isolation. Normal Learn/course/real-unit requests succeed; draft/synthetic paths and malformed requests stay safely rejected; retain explicit empty-catalogue tests. Run the normal Maven build and packaged Chromium suite against the candidate, including real EN/ES/FR explanation/exercise/answer, native locale/keyboard/no-JS, CSP/privacy/no-editor and retained regressions. Keep Home/shared Learn promotion off and document the changed test assumptions; do not run Firefox/WebKit or repeat accepted tool manual reviews.
- [x] 3.2 (F14-UH01-T03/T04, F14-UH02-T05) Record one owner review of the complete real overview/unit in EN/ES/FR against the agreed brief: technical explanation and translations, explanatory answer, honest single-unit scope, keyboard/native language flow, narrow layout and actual200% zoom. Record supplied observations and any defects, fix only authorised issues and rerun affected checks; no invented review. This accepts the reviewed local candidate, not external deployment, site promotion or course completion.

## 4. Changed-scope security and combined closure

- [x] 4.1 (shared F14 quality gate) Reassess the actual new metadata/loader/content path and resolved inventory against all existing bounded CVE decisions. Keep Boot4.1.1 and the2026-11-01 expiry; compare the candidate fingerprint and obtain explicit owner approval before replacing the reviewed F13 scope. Run the existing security gate and focused policy tests with actual content-source coverage. Record all findings and exact results; keep acceptance blocked if approval, freshness or required checks are missing, without silent renewal or independent managed overrides.
- [ ] 4.2 (F14-UH01-T05, F14-UH02-T06) Consolidate evidence for both stories, review the scoped diff and record a real coherent local implementation commit when authorised before marking stories done. Reuse unchanged build/browser/security/owner evidence; retain stable estimates/IDs and unreported effort honestly. Update canonical status/handoff, regenerate both planning views and run planning integrity/rule tests, strict OpenSpec validation and whitespace checks. Close only after all criteria pass; do not include unrelated archive edits, imply a push or enable F16 promotion.

## Workflow follow-up

- Planning authorises no implementation. Start apply only after a new user request.
- Commit/push, main-spec sync and archive retain their applicable authorisation;
  no empty/fabricated commit, unapproved publication or automatic archive.
- F16 integrates/promotes the reviewed unit. Additional units/full syllabus remain
  frozen V2; Firefox/WebKit evaluation is optional after the MVP (ADR009).

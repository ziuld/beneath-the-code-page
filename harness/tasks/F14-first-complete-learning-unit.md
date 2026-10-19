# Task — F14 first complete learning unit

Status / owner / date: owner-approved candidate and security gate pass; local closure in review / Ziuld with AI assistance / 2026-10-19.

User outcome and authorised scope: implement the approved F14 change; one complete
EN/ES/FR source-to-JVM unit, not F16 promotion or extra V2 units.

Prerequisites and files read: accepted F13; current handoff/architecture/feasibility,
F14 EARS/scenarios/canonical tasks and OpenSpec proposal/specs/design/checklist;
existing learning model/loader/templates, fixtures and publication tests.

Acceptance criteria: `openspec/changes/f14-first-complete-learning-unit/specs/`;
canonical ownership remains unchanged.

Implementation steps: approved brief → metadata/overview → verified localised
content → normal publication/harness transition → Chromium/owner review → scoped
security reassessment and authorised commit/closure.

Security, privacy, accessibility and locale implications: preserve safe Markdown,
no remote/executable content, all3 locales, native reading/navigation, no promotion.
Keep Boot4.1.1; security fingerprint changes require reassessment and explicit
approval. Chromium only under ADR009; preserve separate archive edits.

Verification: focused Java/metadata/render tests; baseline-JDK example commands;
normal Maven build and packaged Chromium; owner content/keyboard/narrow/200%-zoom
review; existing security/planning/OpenSpec checks. No duplicate tool review.

Results / effort: `harness/evidence/F14-integrated-acceptance.md`; effort unreported.

Open issues: final content review, security approval and local commit remain later
requirements; do not interpret brief approval as approval of these future results.

Current result: OpenSpec5/8; Maven254+17 Java/185 frontend,Chromium125/125 pass;
JDK example and locale parity verified. Live normal-JAR preview at
http://127.0.0.1:35291/learn?lang=en (PID140430); stop after review. Security
reassessment shows unchanged8 CVEs and18 policy tests pass, but old fingerprint
correctly rejected. Evidence records exact proposed bounded approval; no policy
renewal or owner content review claimed yet. No commit/push/extra-engine run.

Latest sign-off supersedes pending notes: owner approved page review, bounded F14
security scope and local commits(no push/archives). Preview stopped;18 policy tests
and actual gate PASS,OpenSpec7/8. Authorised implementation commit and actual-hash
closure pending; no source change or duplicate suite run after accepted results.

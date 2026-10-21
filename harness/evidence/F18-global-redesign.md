# F18 — Global redesign implementation evidence

## I01 shared foundations — 2026-10-21

Owner continuation authorises implementation of the saved global redesign plan.
Canonical F18-UH01-T04 is in progress; this evidence covers I01 only. Remaining
page layouts and final owner acceptance are pending. Existing exploration edits
were retained. No commit, push, PR, publication or archival was performed.

Implemented: explicit token/base/component/layout cascade order; global heading
foundations scoped independently of Home; central font, reading-width, control,
radius, action and editor-highlight tokens; one shared button baseline with a
filled primary variant used by the actual three tool actions; shared native form
styling; page layout files use shared tokens. Contract: docs/design/component-contract.md.
All hand-authored CSS hex colours now occur only in tokens.css. Editor styles
remain deliberately unlayered and host-scoped to coexist with CodeMirror's
nonce-generated defaults. No CSP/asset allowlist/privacy assertion was relaxed.

New browser proof changes the owning radius token through loaded CSSOM and checks
that controls inherit it across Home, Learn and all three tool pages. It also
compares computed control styles across families. Source files are not mutated by
the check; one owning token definition is required in each document.

The first Chromium run found six failures (132 passed) in existing formatter/
validator axe checks: wider monospace text exposed horizontal scrolling while
Escape temporarily removes the editable content's tab stop. Made CodeMirror's
public scrollDOM keyboard focusable. The parent precedes editable content in tab
order, retaining Escape then Tab to the next workspace action. The existing unit
view double now exposes scrollDOM; the subsequent build passes. No test assertion
was removed. The full Chromium rerun passes all138 checks, including the original failing axe
checks and existing Escape-then-Tab assertions.

Executed verification:

- Full Maven verify PASS: 260 Java tests, 17 packaged integration tests and 185
  frontend tests; typecheck/lint/format and asset packaging included.
  Log: target/f18-foundations-maven.log.
- Full packaged Chromium rerun: 138/138 PASS, including shared-token propagation,
  EN/ES/FR, no-JS/lazy failures, keyboard/axe, fidelity, privacy and CSP.
  Log: target/f18-foundations-chromium.log. Test servers stopped automatically.
  Existing CSS zoom/reflow checks do not substitute for final actual browser zoom
  and owner visual review.
- Security-policy regression: 20 tests PASS. This is not a fresh vulnerability scan.
- Planning integrity and 23 rule tests PASS; generated views refreshed.
- git diff --check PASS.

Limits: I02–I07 page-family migration, full final security/spec gates, cross-page
owner visual/keyboard/actual browser zoom review and T05/T06 remain pending.
The screenshot concepts are design approval, not acceptance of the new runtime.
F19 Firefox/WebKit/Safari and F20 Docker remain separate. Actual owner effort is
unreported; baseline/forecast unchanged by this slice.

## I02–I07 integrated candidate — 2026-10-21

Implemented the agreed shell, Home, Learn, course, all three readers, Tools
catalogue and shared JSON workspace. Original B composition stays unchanged and
now appears in the wordmark; Home has an original inline layered SVG and original
decorative destination previews. Shared warm dark palette, native language form,
filled actions, panels, responsive layouts and safe error header/footer use the
same design system. No external fonts/assets/framework added. Tool metadata and
locale/CSRF return semantics are retained.

The shared tool fragment preserves operation-specific controls and all hooks,
messages, disabled/busy/stale/error/copy/no-JS states. Controls follow the input in
native DOM/tab order, retaining Escape then Tab to the workspace action; this is
a deliberate functional adaptation of the mockup's toolbar placement. Input/output
are paired on wide screens and stack on mobile. Keyboard help sits below input.
Validator has no output/Copy/indentation; Minifier has no indentation selector.
Workspace structure/styles are eager so no-JS/failed enhancement stays readable;
CodeMirror and processing remain lazy.

Lesson bodies/content files are unchanged. The web renderer adds positional unique
IDs to h2 headings and returns escaped section labels for native section links,
including duplicate/Unicode headings; existing HTML escaping, URL sanitisation
and image rejection remain. Code blocks receive native keyboard focus for scrolling.
One real course and dynamic unit counts remain honest; no progress/persistence.

Structural tests were updated for explicit new hero links, wrappers, shared tool
fragments and decorative SVG. The original brand image is allowlisted by its exact
existing path on pages now displaying the shared wordmark; no wildcard expansion
or payload/CSP assertions removed. Focus contrast now measures a positive-offset
outline against the parent surface on which it is drawn, while text still measures
against its own background. Existing 3:1 focus, visibility, unobscured-target and
keyboard assertions remain.

Integration corrections: fixed a missing Minifier output message reference and
empty conditional attributes removed by Thymeleaf; restored full tool-page meta
descriptions through a shared head fragment. The first integrated browser run was
invalidated by rebuilding before it ended; its results do not count as final
acceptance. Subsequent run had136 passes and six outline measurement failures,
now corrected as described above.

Security gate initially rejected a Java database older than24h. Both databases
were freshly downloaded using the pinned scanner, preserving old cache under
target/security-tools/f18-db-backup-*. The next scan passed with0 findings and0
active exceptions; applicability policy was not changed or renewed. Final checks
for the refined candidate are recorded below only after their completion.

Final integrated verification: pending. Owner runtime visual/keyboard/actual200%
browser zoom and EN/ES/FR review, and the reviewed revision/handoff remain pending.
No detailed owner observations or whole-feature acceptance are inferred from
concept approvals. F19/F20 remain separate.

### Final candidate checks

All final runtime checks use the packaged candidate with SHA256
`cb33e7ea6dece747c7ae6857544ad558b9c37dd2e68e08b52e9733c2cfde7586`.
The final security report's JAR input digest matches this artifact.

- Full Maven verify PASS:261 Java +17 packaged integration +185 frontend tests,
  including type/lint/format/architecture/packaging. Log:target/f18-integrated-maven.log.
- Full Chromium142/142 PASS on the fixed artifact, including same-variant computed
  styles and token propagation across Home/Learn/all3 tools, all10 routes in
  EN/ES/FR at320/1440, native section links, no-JS390px, real tool states, privacy,
  CSP, contrast and forward/reverse keyboard focus. Log:target/f18-integrated-chromium.log.
- Additional standalone Playwright768px check of all10 routes:200 responses, oneh1,
  no viewport overflow and screenshots PASS; log:target/f18-intermediate-layouts.log.
- Fresh actual security gate PASS:45 production sources,0 findings,0 exceptions;
  current unchanged mode=none policy. Vulnerability DB2026-10-21T07:13:45Z, Java DB
  2026-10-21T01:09:45Z. Log:target/f18-integrated-security.log; report:target/security/summary.json.
- Security policy20 and strict main OpenSpec15 PASS; logs:target/f18-security-policy.log
  and target/f18-openspec.log. No spec migration/archival performed.
- Planning integrity/23 rule tests, generated views and whitespace checks PASS.

Final focus corrections were verified without relaxing focus/visibility gates:
card heading links are inline-block so wrapped translations have continuous hit
areas; shared focus scroll-margin keeps outlines visible on reverse navigation.
The preceding candidate had139 passes/3 genuine mobile focus failures; it is
superseded by the final142-pass run. Lesson content files remain unchanged.

Screenshots:target/f18-*-320.png and target/f18-*-1440.png for all10 EN routes;
target/f18-intermediate-*-768.png; readable390px viewport captures at
target/f18-review-{home,learn,course,lesson,tools,formatter}-390.png. The latter
include a real synthetic Ada JSON formatting operation. Inspected Home/Learn/tools/
workspace wide shots and mobile lesson/workspace captures; no owner observations
or pixel-exact mockup equivalence inferred.

Preview RUNNING http://127.0.0.1:44509/?lang=en, local profile, loopback only,
PID46463 / exec session16756; log:target/f18-owner-preview.log. Test-only servers
stopped automatically. Review guide:docs/design/f18-owner-review.md.
T04 complete; T05 owner review/actual browser200% zoom pending; T06 reviewed local
revision/closure pending. No commit/push/PR/deployment/archival or feature closure
claimed. Actual owner effort remains unreported.

### Owner acceptance — 2026-10-21

The owner answered “Reviewed and approved” to the integrated F18 review request
covering Home → Tools → each JSON operation and Home → Learn → course → all3
lessons, EN/ES/FR, narrow/wide layouts, keyboard/focus and actual200% browser zoom.
Record checklist approval only; no detailed observations were supplied or invented.
T05 complete. Rechecked175 runtime/test/JAR inputs against the passing security
snapshot: all unchanged. Packaged SHA256 still matches the reviewed artifact above.
Reused existing passing runtime checks; no redundant build/browser/security rerun
for approval bookkeeping. T06 records the actual scoped local revision next.

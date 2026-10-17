# Evidence — F06 integrated acceptance

Archive executed2026-10-18 after owner-selected sync and successful final checks:
`openspec/changes/archive/2026-10-18-f06-json-formatter/`, including metadata.
CLI confirmed exactly22/22 tasks complete before move. Planning integrity,15 rule
tests, strict change validation and whitespace checks passed after regeneration.
New main spec exact comparison and strict specs8/8 passed before archive.
Post-archive checks and coherent bookkeeping delivery follow; no runtime change.

Post-archive executed checks pass: planning integrity and all links/generated views,
15 planning-rule tests, strict main-spec validation8/8 and whitespace. OpenSpec lists
no active changes. Closure/spec/archive bookkeeping is delivered separately from
tested runtime headed0e502; no new-code browser claim inferred for documentation.

## Final accepted result — 2026-10-18

Final publication head `ed0e502d10a22aada2a918d0753c9cf37851803e` passes Ubuntu
Java run39074613656 and browser run39074613616. Actual browser log
`/tmp/opencode/f06-publication-ci-browser.log` confirms Chromium84/84,Firefox38/38,
WebKit38/38, including EN/ES/FR Home → Tools → Formatter journeys. CI clean Maven
passes140 frontend tests,199 Java cases (three explicit architecture skips),17
packaged cases. Local real health smoke passes as recorded below. No required
engine skipped, limits/CSP/privacy relaxed or placeholder coverage introduced.

Reviewed all three accepted stories/all15 canonical tasks, prerequisite F05,
manual owner report and integrated regressions; no blocking findings. Task4.3/F06
done,22/22, at the tested published head with owner acceptance and evidence. Actual
owner effort remains unreported (zero tracking value is not an assertion of no work).

Owner authorised sync then archive. New main JSON Formatter spec contains all seven
accepted requirements and scenarios, with exact Purpose preserved; verified against
the delta and strict main-spec validation8/8. No automatic story behaviour-ownership
migration. Final closure/regeneration checks and archive location recorded in handoff.
No merge, release, new external publication or fabricated manual observations.

## Owner manual review — 2026-10-18

Owner ran the packaged application using the supplied local command and reported
that it works. Browser identified as Google Chrome; version, OS, viewport dimensions
and exact build identity of the launched process were not supplied. Asked whether
actual200% browser zoom, narrow-window, EN/ES/FR, keyboard and Copy/Clear checks all
passed or were untested, the owner replied yes and requested closure/archive.
Record this as owner-reported acceptance, not agent-observed measurements or a
version-specific compatibility claim. No issues reported. Format/Cancel and editor
Escape/focus were included in the preceding walkthrough; automated Axe/contrast
and browser regression evidence is recorded in UH01–UH03, not invented as manual
measurements. Screen-reader compatibility/manual speech testing is excluded.

All three stories had already been explicitly accepted. No secure heap/clipboard
erasure claim; pending user-authorised clipboard writes cannot be retracted.

## Final publication verification — planned

Enable Home Tools (Learn and other tools remain unpublished) and verify the real
Home → Tools → Formatter journey in EN/ES/FR with exact token preservation.
Run clean Maven, health smoke and full Chromium/critical Firefox/WebKit gates on
the published state. Previous05a688a passes are not a new-publication-state pass.
Task4.2 complete on actual owner report;4.3 pending executed final checks. No merge
or release authorised. Owner effort remains unreported.

## Final publication — local results

Home Tools is now code-published; Learn and other tools remain unpublished/denied.
Added real EN/ES/FR Home → Tools → Formatter journeys with exact large-integer output.
Updated existing tests to retain their assertions with the two new actionable links
(navigation and card): no-JS counts, complete keyboard tab/shift-tab sequence and
shared control counts. Journey contexts now use actual browser locale rather than
a header override that Chromium overwrote. No locale/runtime policy change.

Clean Maven passes140 frontend/199 Java cases (three explicit architecture skips)/
17 packaged. Chromium84/84,Firefox38/38 and real health smoke pass. Logs:
`/tmp/opencode/f06-publication-clean-maven.log`,
`/tmp/opencode/f06-publication-chromium-final.log`,
`/tmp/opencode/f06-publication-firefox.log`,
`/tmp/opencode/f06-publication-health.log`. First browser run lacked the cache after
clean, so installed the pinned browser with the existing unprivileged --install path.
Initial fixture failures exposed the old link counts and locale setup above;
corrected fixtures passed without removed coverage, retries or relaxed budgets.

Required updated Ubuntu WebKit and final coherent publication commit reference
remain pending before4.3/feature closure. No archive or main-spec sync yet.

Delivered final publication as `ed0e502d10a22aada2a918d0753c9cf37851803e` on
existing draft PR #6. Java run39074613656 and browser run39074613616 are running
against that head; no changed-state WebKit pass claimed yet. Planning integrity,
15 planning-rule tests, strict OpenSpec8/8 and whitespace checks pass. Owner chose
“Sync then archive” once final CI passes: create new main json-formatter spec from
the added requirements, verify it and archive the completed change. No existing
main spec will be overwritten, no plan-owned behaviour migration is implied.

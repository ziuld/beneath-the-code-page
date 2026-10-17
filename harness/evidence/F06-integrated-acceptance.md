# Evidence — F06 integrated acceptance

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

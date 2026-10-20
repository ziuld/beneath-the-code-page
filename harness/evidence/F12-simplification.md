# F12 — accepted evidence reuse and remaining work

Date: 2026-10-18. Planning simplification, not F12 feature acceptance.

## Completed work credited, not repeated

The owner instructed that completed work already includes testing and review.
F12 must not rebuild or revalidate unchanged F06/F07 deliverables. Historical task
IDs and baseline estimates remain; credited tasks leave the outstanding queue.

- UH01-T01: feature/requirements/scenarios/prerequisites read during this review.
- UH01-T02/T03: the three-tool catalogue, working EN/ES/FR journeys and retained
  keyboard/manual acceptance are already covered by
  [final F07 acceptance](F07-UH02-json-minification.md), including publication head
  `770aa98ea3ceafe7e7678c3e35109ec844d1d925`, actual Java/browser CI and owner review.
  `templates/tools.html`, `ToolsRenderingTests` and existing formatter/validator/
  minifier browser journeys corroborate that this is implemented, not future work.
- UH02-T01: runtime requirements and existing workflow inspected in this review.
- UH02-T02/T03: README documents the packaged JAR and existing smoke script;
  `scripts/smoke-java-baseline.py` starts it on `127.0.0.1`, verifies health and stops
  its child. Existing CI runs the same script. Final F07 evidence records actual
  health and packaged verification; no separate management server is configured.
  No new launcher, runtime, documentation duplicate or repeat smoke run is needed.

Credit recorded on this date is not a claim that application tests were rerun.
The original evidence's limitations, including three WebKit TODOs and unreported
manual environment details, remain unchanged. Actual effort is unreported.

## Only unresolved work remains

1. UH01-T04: reconcile F12's unknown-tool 404 with the accepted deny-by-default
   security policy's safe localised 403. This change does not choose a new policy,
   weaken the allowlist or mark that criterion passed. Test only a resulting
   behaviour change or a genuinely missing assertion, reusing existing safe-error
   and sentinel evidence otherwise.
2. UH02-T04: establish missing dependency/secret/static-analysis blocking-gate
   evidence. Existing delivery documentation says scan integration remains planned;
   normal Maven/browser success is not proof of this criterion. Do not repeat
   previously accepted scans or build a new release platform.
3. UH01-T05/UH02-T05: tracking updates in one combined closure record after the
   respective gaps are resolved. They are not separate reviews, test cycles,
   manual-acceptance requests or mandatory commits.

UH02 now depends on F07 directly: runtime/security evidence does not technically
depend on resolving the catalogue's error-status requirement. Serial execution
and the single-active-task convention remain.

F12 forecast is reduced from 4h to 2h; baseline 14h is unchanged. Credited task
forecasts are provisional bookkeeping allocations, not measured actual effort.
F12 and both stories remain open. No application, security policy or OpenSpec
behaviour changed; existing F07 archival work is outside this edit.

## Validation

- Both planning renderers executed successfully; generated backlog, roadmap,
  execution queue, scenarios and traceability reflect the simplified F12.
- `python3 scripts/check-planning.py`: pass, including all 17 features, hierarchy,
  dependencies, baseline/forecast rollups, acceptance links and closure evidence.
- `python3 scripts/test-planning-rules.py`: 21/21 pass after isolating the original
  replan fixture's 4h F12 forecast from the revised live 2h forecast. The first run
  failed that stale fixture assumption; its 42h assertion remains unchanged.
- `git diff --check`: pass.
- Diff inspected: canonical plan changes are confined to F12; existing F07 archive
  edits are preserved. No application tests, scan execution, new manual acceptance,
  commit, push or release performed for this planning-only change.

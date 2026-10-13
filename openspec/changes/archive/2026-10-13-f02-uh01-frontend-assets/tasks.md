# Tasks

Scope: EPIC-MVP → F02 → **F02-UH01** only. Acceptance is [the delta specification](specs/packaged-browser-assets/spec.md), translated from `docs/planning/plan.json`; implementation follows [design.md](design.md). The canonical tracker remains authoritative pending explicit adoption.

Checkboxes record evidenced progress. Numbered checklist items subdivide the five existing tasks; they are not new canonical IDs or additional effort. Baseline/forecast remains 8h: T01 0.5h, T02 2.5h, T03 2.25h, T04 2.25h, T05 0.5h. Actual owner effort is unreported, not inferred.

## 1. F02-UH01-T01 — Analysis and prerequisite confirmation

- [x] 1.1 **F02-UH01-T01**: Reconfirm F01 acceptance against `plan.json` and `harness/evidence/F01-closure.md`, read the story's EARS/Gherkin and reviewed proposal/design, inspect current Git changes and record the bounded execution plan with `harness/templates/task.md`; verify the record identifies R01/R02, AC01/AC02, packaging paths, test-only fixtures and known version checks without claiming new test passes.

## 2. F02-UH01-T02 — Toolchain, build and resolver implementation

- [x] 2.1 **F02-UH01-T02**: Verify published compatible Node 24/npm, frontend Maven plugin and TypeScript/Vite/Vitest/ESLint/Prettier versions; pin exact project-local tooling and direct dependencies, create the lockfile and minimal entry importing CSS; verify local `npm ci`, strict typecheck, lint, formatting, meaningful frontend tests and Vite build succeed using the pinned binaries, and document actual versions/commands alongside this work.
- [x] 2.2 **F02-UH01-T02**: Bind installation/checks/bundling before Maven resource processing and configure public hashed assets plus the private classpath manifest; verify `./mvnw clean package` includes the prescribed JAR resource paths without committed bundles or tooling, and an isolated frontend check failure makes Maven return non-zero before packaging; remove the failing fixture and document the restored result.
- [x] 2.3 **F02-UH01-T02**: Implement startup manifest loading, required-entry validation and immutable view references in `platform.web.assets`, with unit tests for transitive CSS/static imports, stable ordering, deduplication, cycles, missing/malformed references, safe paths and safe diagnostic causes; verify focused tests, the existing context test and ArchUnit pass through Maven and document the resolver contract without adding a core port, product route or validation bypass.
- [x] 2.4 **F02-UH01-T02**: Configure Failsafe packaged integration execution and document the Maven-first local/CI workflow, adjusting the existing CI only where necessary; verify effective lifecycle ordering runs integration tests after the executable JAR exists, existing Java smoke remains usable, and least-privilege/SHA-pinned workflow settings are retained.

## 3. F02-UH01-T03 — Packaged assets and rendering evidence

- [x] 3.1 **F02-UH01-T03 / F02-UH01-AC01 / F02-UH01-R01**: Add a packaged-resource integration test inspecting actual JAR bytes and private manifest placement, including all referenced assets; verify the distributable excludes frontend tooling/source, test fixture classes/templates and any public manifest copy, and record assertion results and artifact identity in evidence.
- [x] 3.2 **F02-UH01-T03 / F02-UH01-AC01 / F02-UH01-R01**: Assemble an isolated test-only packaged rendering fixture, launch it on loopback, render the site entry and compare every referenced JS/CSS HTTP response with matching built resource bytes; verify status, content type, hashes and imported stylesheets with bounded process timeouts and synthetic credentials, without adding a production page or security relaxation, and document fixture assembly/reproduction.
- [x] 3.3 **F02-UH01-T03 / F02-UH01-AC01**: Start the unmodified executable distributable and verify actual static resource bytes, health and authenticated requests proving the private manifest is not served; run `./mvnw clean verify` and the existing packaged health smoke, then record versions, exit codes and limitations in `harness/evidence/` without claiming browser/privacy/CSP acceptance for future features.

## 4. F02-UH01-T04 — Incomplete-build rejection evidence

- [x] 4.1 **F02-UH01-T04 / F02-UH01-AC02 / F02-UH01-R02**: Derive an isolated incomplete JAR with the required site entry omitted from the private manifest; verify the actual application exits non-zero before readiness and emits the expected safe missing-entry diagnostic, including assertions that complete captured logs omit synthetic sentinel contents, and document the mutation fixture and actual results.
- [x] 4.2 **F02-UH01-T04 / F02-UH01-AC02**: Verify supplemental missing/malformed/reference-path diagnostic fixtures and rerun `./mvnw clean verify` plus the unmodified JAR smoke after mutation cleanup; record genuine pass/failure counts, prove the normal distributable is unmodified, and retain explicit limitations rather than turning failed checks into completed boxes.

## 5. F02-UH01-T05 — Integration review and story closure

- [x] 5.1 **F02-UH01-T05**: Review the complete implementation diff and evidence against both acceptance scenarios and the feature quality requirements; verify no F02-UH02/F03/F04 scope, test-only runtime hooks, payload logging, architecture violations or unresolved failing checks have slipped in, and record integration/owner acceptance status. Create or record a coherent commit only when authorised; publication needs separate approval.
- [x] 5.2 **F02-UH01-T05**: Update canonical child-task/story status only to the extent actual evidence and integration acceptance justify it, retaining actual effort as unreported unless supplied; run `python3 scripts/render-backlog.py`, `python3 scripts/render-roadmap.py`, `python3 scripts/check-planning.py`, `python3 scripts/test-planning-rules.py` and whitespace checks, then update the handoff and verify F02 stays open while F02-UH02 remains unfinished.

## Workflow follow-up

- Before behavioural adoption, explicitly migrate F02-UH01 requirement/scenario ownership to stable OpenSpec links and adapt the tracker/renderers/validator coherently; do not maintain two independently editable acceptance catalogues. This proposal does not perform that migration.
- Sync/archive only after evidence, acceptance and integration review are complete and ownership is resolved; verify archived specifications preserve R01/R02 and AC01/AC02.
- F02-UH02 requires its own bounded change after F02-UH01 is accepted. Neither proposal completion nor story closure alone completes F02.

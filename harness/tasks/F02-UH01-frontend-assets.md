# Task — F02-UH01 frontend assets

Status / owner / date: Locally implemented and verified; integration review pending; Ziuld with AI assistance; 2026-10-13. Authorised by the explicit apply request for `f02-uh01-frontend-assets` and approval of both corrections.

User outcome and authorised scope: Build hashed JS/CSS into the executable application, provide private-manifest references to SSR views and fail safely on a missing required entry. Implement this story only; no product page, security/locale redesign, build-watch, commit, publication or behavioural-ownership migration.

Prerequisites and files read: F01 is done in the canonical plan and supported by existing integration evidence. Read current handoff, technical architecture/feasibility, hierarchy, F02 dossier, canonical F01/F02 entries, EARS/Gherkin, all CLI-returned OpenSpec context files, POM, root entry point, architecture tests, build/smoke scripts and task template. Existing uncommitted setup/proposal work is preserved.

Acceptance criteria (link, do not drift): [F02-UH01-R01/R02 and AC01/AC02](../../openspec/changes/f02-uh01-frontend-assets/specs/packaged-browser-assets/spec.md); canonical authority remains `docs/planning/plan.json`.

Implementation steps:
1. Confirm tool publication/compatibility and exact pins; build a minimal CSS-importing site entry with local frontend checks.
2. Connect Maven lifecycle/resources; resolve the private manifest at startup and add focused tests/documentation.
3. Inspect the executable JAR; test actual SSR and HTTP bytes through isolated test-only fixture packaging.
4. Test isolated missing-entry startup failure and safe logs; rerun normal verification/smoke.
5. Review actual evidence, update only justified status and regenerate both planning views; retain integration acceptance limitations.

Packaging paths: `target/frontend/static/assets/` → `classpath:/static/assets/`; `target/frontend/asset-manifest.json` → `classpath:/asset-manifest.json`. Fixtures remain under tests/ignored output, never the normal executable JAR.

Security, privacy, accessibility and locale implications: No payload processing/network/storage or user-facing prose; preserve existing security filters. Use synthetic credentials/sentinels only, escaped asset attributes, safe bounded diagnostics and no public manifest. Future browser/CSP/a11y/i18n acceptance is not claimed.

Verification commands and manual checks to run: Project-local npm checks through Maven; `./mvnw clean package`, `./mvnw clean verify`, controlled frontend-failure mutation, focused resolver tests, packaged Failsafe tests and existing health smoke. Record real versions/results; run OpenSpec/planning/whitespace checks and both renderers.

Results / evidence links / actual effort: [Execution evidence](../evidence/F02-UH01-frontend-assets.md) records resolved failures, successful repeated clean verification (1 frontend, 51 Java with 7 explicit skips, 7 packaged tests), original health smoke, controlled failing frontend check, real SSR/HTTP-byte and safe startup-rejection evidence. Actual owner effort remains unreported. No integrated acceptance, commit or publication is claimed.

Open issues and next action: Both authorised corrections are implemented and regression-tested. Planning regeneration/checks and all 12 OpenSpec checklist items are complete. Present the verified local slice for integration/owner review; no automatic commit or external publication. Canonical T05/story remain in_review, and F02-UH02/behavioural ownership migration remain outside this implementation.

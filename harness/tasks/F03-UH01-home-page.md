# Task — F03-UH01 Home page

Status / owner / date: done / Ziuld with AI assistance / 2026-10-13.

User outcome and authorised scope: implement `f03-uh01-home-page`; semantic SSR Home, approved B composition, EN/ES/FR copy and publication-aware navigation. Exclude F03-UH02, F04, product destinations and remote publication. No commit or behavioural ownership migration authorised.

Prerequisites and files read: F02 done, locally integrated (`b1fb149`, `29e5806`), evidenced by `harness/evidence/F02-UH02-local-assets.md`. Read current handoff, architecture/feasibility, F03 dossier, canonical plan requirements/scenarios/tasks, proposal/spec/design/tasks, asset resolver and packaged regressions, POM and frontend tooling.

Acceptance criteria (link, do not drift): `docs/planning/features/F03.md#f03-uh01`; R01/AC01 require semantic Home readable without JavaScript, verified by T03; R02/AC02 require no broken actionable unpublished links and fixture-proven publication transition, verified by T04. T01–T05 retain their canonical IDs and 8h total baseline.

Implementation steps:
1. T01: record prerequisites, scope and evidence plan.
2. T02: site web adapter/template/fragments, immutable publication descriptors, translated copy, shared minimum styling and unchanged logo; adjacent MVC/resource/security tests and ADR.
3. T03: pinned browser tooling and packaged Home checks, locale/keyboard/reflow/contrast checks, separate browser CI job and documented local commands.
4. T04: isolated mapped/public navigation fixtures and full clean F02/Home regression.
5. T05: review diff/evidence; update tracking and handoff without claiming owner acceptance or integration; regenerate planning views and run gates.

Security, privacy, accessibility and locale implications: bounded anonymous read routes, security filters/CSRF retained, no processing/form/persistence endpoints; same-origin static page, escaped message resources, semantic landmarks/focus/reflow/contrast. Full F04 policy and shared-shell/language-switching acceptance remain excluded.

Verification commands and manual checks to run: focused Maven rendered MVC tests; `python3 scripts/verify-java-baseline.py clean`; original health smoke; project-local Playwright packaged suite; both planning renderers, planning validator/rule tests, strict OpenSpec validation and whitespace checks. Inspect responsive composition and record human translation/visual review limitations.

Results / evidence links / actual effort: T01–T04 complete with actual evidence. Authorised test correction resolved the initial compilation failure. Full clean verification passed 15 frontend tests, 90 Java cases (four explicit skips), 15 packaged cases; original health smoke and six Chromium cases passed. Effort unreported. Actual evidence: `harness/evidence/F03-UH01-home-page.md`.

Open issues and next action: owner accepted the Home result and authorised local integration/closure. Implementation committed on main in `f2a3e3c`; post-commit clean/health/browser checks passed. No wider F03-UH02/F04 acceptance or individual unreported manual-test result is claimed. No push or archive; behaviour remains plan-owned. Await the next authorised story or separate archive/ownership decision.

# Task — F02-UH02 local build-watch assets

Status / owner / date: implementation authorised; Ziuld with AI assistance; 2026-10-13.

User outcome and authorised scope: serve each completed local rebuild on the next
page load, reject filesystem assets outside the local profile, and enforce pure
frontend import boundaries. No HMR, product route, security relaxation or publication.

Prerequisites and files read: F02-UH01 done; current handoff, accepted architecture,
feasibility review, F02 dossier, canonical plan, resolver/build/test configuration.

Acceptance criteria: F02-UH02-R01/R02 and AC01/AC02 in
[F02](../../docs/planning/features/F02.md#f02-uh02). Behaviour remains plan-owned.

Implementation steps:
1. Confirm requirements/prerequisite; introduce local-only generated asset source
   and uncached same-origin serving with per-render manifest reload.
2. Add project-local Vite watch command and frontend boundary lint/tests.
3. Verify real watcher rebuilds through packaged SSR and matching HTTP bytes;
   verify production/mixed-profile rejection with safe diagnostics.
4. Run clean Maven verification, health smoke, planning gates and local review;
   record evidence and justified status, leaving integration/acceptance open until authorised.

Security/privacy/accessibility/locale: no payload handling or product UI; no new
Security filter or external browser origin. Manifest remains private in all profiles.

Verification: Maven clean verify, executable smoke, both planning renderers,
planning integrity/rule tests, whitespace checks. Tests must stop watcher/server.

Results / actual effort: clean verification passed 15 frontend tests, 65 Java cases
(7 explicit skips), 15 packaged cases; original health smoke passed. Actual failures
and corrections, including the IDE race and early safe-config validation, are recorded
in [evidence](../evidence/F02-UH02-local-assets.md). Owner effort unreported.

Next action: owner accepted the slice and authorised local commits, post-commit
verification and F02 closure. Record actual integration/commit evidence, regenerate
planning views and commit closure metadata. No push or new OpenSpec migration.

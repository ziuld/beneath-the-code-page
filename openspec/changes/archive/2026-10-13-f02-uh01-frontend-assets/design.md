# Design

## Context

See [proposal.md](proposal.md) for motivation and [the delta specification](specs/packaged-browser-assets/spec.md) for the behaviour contract.

Inspection found a Java 25 / Spring Boot 4.1.1 single-module application, a root entry point, minimal YAML, the generated context test and non-empty ArchUnit boundary fixtures. `pom.xml` currently declares only the Boot build plugin; there is no frontend directory, lockfile, template or asset resolver. The existing Java CI calls `scripts/verify-java-baseline.py` and the executable health smoke. F01 is `done` in the canonical tracker, backed by `harness/evidence/F01-closure.md`; no new Java verification was run during proposal creation.

The accepted architecture already chooses Maven-owned builds, Vite/strict TypeScript/plain CSS, private manifest packaging and `platform.web.assets`. This design implements those choices without changing inward dependencies or adding domain/application abstractions. A design document is warranted by the new build dependencies, Java/browser boundary and startup-failure integration.

## Goals / Non-Goals

**Goals:**
- Make clean Maven verification generate, check and package source-built assets using pinned project-local tooling.
- Expose a small immutable asset-view model usable by future Thymeleaf pages, with deterministic script/style/import ordering and startup validation.
- Prove both existing acceptance scenarios using actual built bytes and failing startup, not placeholder tests.

**Non-Goals:**
- No production page or fixture route, security permit-list change, locale catalogue, design-system component, runtime Node server or Vite HTML routing.
- No build-watch/HMR or restricted-import enforcement; those remain F02-UH02.
- No browser/editor stack or empty processing modules installed before their feature needs them.

## Decisions

### 1. Maven owns project-local frontend installation and lifecycle

Use a pinned `frontend-maven-plugin` to install exact Node 24 LTS and npm versions under an ignored project-local `target/` tooling directory. Keep package metadata, the committed npm lockfile, strict TypeScript/Vite configuration and source under `src/main/frontend/`. Pin direct dependency versions rather than ranges. T02 verifies exact published versions and compatibility before recording them; this proposal makes no claim that particular patches have already been tested.

Bind tool installation, `npm ci`, typecheck, ESLint, formatting check, meaningful Vitest tests and the Vite build to ordered executions before resource processing. Unit tests exercise a real entry/module or build configuration, not invented tool algorithms. Configure the small initial tooling set only; CodeMirror and Playwright wait for their bounded proofs. Ensure failed checks return a non-zero Maven result and are not silently skipped.

Alternative: require a global Node/npm installation or a separate manual frontend build. Rejected because a clean `./mvnw verify` must own the distributable and CI must use the same source pipeline. Downloads during a cold build are allowed; offline reproducibility is not promised.

### 2. Separate public assets from the private manifest

Use a minimal `entries/site.ts` importing a minimal stylesheet; do not add user-facing prose, visual product decisions or network/storage processing. Configure hashed JS/CSS in `target/frontend/static/assets/`, with public URLs rooted at `/assets/`. Generate `target/frontend/asset-manifest.json` outside the public tree. Configure Maven resources explicitly so the JAR contains `BOOT-INF/classes/static/assets/…` and `BOOT-INF/classes/asset-manifest.json`, preserving existing authored resources and excluding tooling, frontend sources and the lockfile.

Vite may clear its own output directory only. Integration checks inspect the resulting paths to catch accidental `static/static`, duplicated `assets/` prefixes and public manifest exposure. `./mvnw clean verify` must rebuild after deleting generated output; `./mvnw package` must also run the frontend phases.

Approved implementation correction (2026-10-13): Vite 8 rejects parent-relative emitted manifest filenames. Use `target/frontend/` as its owned output root, `static/assets` as the asset directory and `asset-manifest.json` as the root manifest filename. Manifest paths retain `static/assets/` for classpath lookup; public URLs strip only `static/`. The owner authorised this correction and regression-tested exclusion of generated/dependency documentation from the planning link scan.

Alternative: commit bundles or place the manifest under `resources/static`. Rejected because it creates stale-source risk or exposes internal build metadata. Node/npm remain build-only dependencies.

### 3. Resolve and validate assets at startup in the technical web layer

Implement classpath manifest loading and resolution in `dev.beneaththecode.platform.web.assets`, registered through existing root scanning or focused bootstrap wiring. No core port or application use case is needed for this technical concern. Load once at startup, require the site entry, walk its static import graph, collect transitive CSS/module references in a documented stable order and deduplicate shared imports. Use a visited set to terminate cycles; dynamic-import chunks remain lazy and are not eagerly rendered as entry scripts.

Represent script, stylesheet and optional module-preload URLs as immutable values for escaped Thymeleaf attributes. Validate referenced manifest nodes and resources; permit only relative built paths underneath the public asset root, not URLs, traversal or arbitrary filesystem locations. Missing manifest, malformed data, absent required entry or broken referenced resources fail startup. These are defensive implementation checks supporting the existing requirements, not newly renumbered acceptance scope.

Use bounded event codes and trusted configured entry identifiers in diagnostics. Do not echo raw manifest text, untrusted path fields or synthetic sentinels. Wrap parser exceptions where their messages could disclose content; verify captured startup logs rather than only the top-level exception.

Alternative: parse the manifest on each request or return source filenames on failure. Rejected because packaged metadata is immutable and broken deployment artifacts should fail before requests. Reloading development assets is deliberately deferred to F02-UH02.

### 4. Verify SSR integration without introducing a product page

Use JUnit/AssertJ for resolver behaviour and Failsafe `*IT` integration tests after packaging. Preserve the generated context test and ArchUnit suite; ensure frontend generation happens before either can trigger required-manifest startup loading.

For AC01, use a test-only controller/template assembled into a separate fixture artifact derived from the packaged application, so actual Thymeleaf rendering and classpath manifest lookup occur in a packaged process. Launch on loopback with bounded readiness/timeouts, parse the rendered references and compare fetched JS/CSS bytes with the built JAR resources. Also launch the unmodified distributable to check static resource delivery and health. Supply synthetic test-only credentials through process configuration where the existing default Security baseline requires authentication; do not relax production filters or print credentials. Assert fixture classes/templates are absent from the normal distributable. Test direct and transitive imports and deduplication with purpose-built synthetic manifests; do not force otherwise-unused production modules merely to create test coverage.

For AC02, produce an isolated copy of the built artifact whose private manifest omits the required entry. Run the actual application process, assert non-zero exit before readiness and capture a safe missing-entry diagnostic. Include synthetic sentinel content to check logs for disclosure. Keep the normal JAR untouched and verify it still starts afterwards. Add focused missing/malformed/reference-path fixtures under tests, never production switches that bypass validation.

Alternative: add a public diagnostic page, introduce F03 home early, or rely only on MockMvc. Rejected because it either expands feature/security scope or does not prove packaged resource correctness. Fixture packaging introduces test complexity but gives real evidence at the authorised boundary.

### 5. Keep planning authority and adoption explicit

At proposal time, `plan.json` remains the behavioural/status/effort authority. OpenSpec captures a proposed delta with exactly R01/R02 and AC01/AC02, and tasks retain T01–T05. It must not be independently edited to diverge from the canonical story. On a separately reviewed adoption, replace this story's copied behavioural prose in the tracker with stable OpenSpec links and update renderer/validator support atomically; retain IDs, dependencies, estimates and evidence in the tracker. Do not migrate the entire unimplemented MVP or seed current-state `openspec/specs/` now.

Alternative: immediately delete canonical acceptance or maintain two editable catalogues. Rejected because existing renderers/validation depend on the tracker and the handoff forbids ambiguous ownership. Implementation can follow this validated translation and the canonical story without claiming adoption is complete; syncing/archiving waits for evidence and resolved ownership.

## Risks / Trade-offs

- [Frontend dependency/version compatibility is not yet verified] → T02 checks published versions and records exact pins and the lockfile; failing compatibility is a real blocker, not a fabricated pass.
- [Startup validation makes ordinary context tests depend on generated assets] → Bind frontend generation before resource processing and retain a documented Maven-first test workflow; no blanket test-profile bypass.
- [Existing authentication can mask asset/manifest HTTP assertions] → Use synthetic credentials and assert the resource result, not a login redirect; test missing manifest exposure with authenticated requests so security denial cannot hide a public file.
- [Boot nested-JAR fixture assembly can diverge from production] → Derive fixtures from the normal packaged output, inspect both artifacts and separately smoke the unchanged executable JAR.
- [Maven `package` precedes Failsafe verification] → Document `clean verify` as the acceptance gate; `package` produces assets but is not evidence of all integration checks.
- [Manifest exceptions can disclose fixture data through causes] → Sanitise exposed diagnostics and assert full captured logs omit sentinels.
- [F02-UH01 acceptance does not complete F02] → Keep F02-UH02 and feature status open until its own evidence exists.

## Migration Plan

No application migration or deployment occurs during this planning workflow. After an explicit apply request, execute T01–T05 in order, record actual evidence under `harness/evidence/`, update authorised tracker progress and regenerate both planning views. Extend the existing CI's Maven-owned verification only as needed for these checks, retaining SHA pins and least privilege; do not change repository settings or publish without approval.

New startup validation and its build wiring must land together. If the implementation is rejected, revise this proposal; if an authorised later rollback is necessary, revert only the coherent frontend/resolver integration in a reviewed change, not unrelated user work. No data migration is involved.

Sync/archive only after both acceptance scenarios, quality checks and integration review are evidenced, and behavioural ownership has been explicitly reconciled. Proposal generation itself does not close T01, the story or the feature.

## Open Questions

- Exact Node 24/npm and frontend/plugin patch pins are deferred to T02's bounded publication/compatibility check; the Node family, local-install strategy and Maven ownership are already fixed.

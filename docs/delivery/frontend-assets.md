# Frontend assets — F02-UH01

Maven owns the build; no global Node/npm installation is required. Exact pins:
Node 24.21.0, npm 11.21.0, frontend-maven-plugin 2.0.2, TypeScript 6.0.3,
Vite 8.3.4, Vitest 5.0.4, ESLint 10.12.0, @eslint/js 10.0.1,
typescript-eslint 8.71.2, Prettier 3.9.10 and @types/node 24.19.2.
TypeScript 6.0.3 is within the ESLint adapter's published `<6.1.0` range;
TypeScript 7 is deliberately not selected.

Run `./mvnw clean verify` for acceptance. The `generate-resources` phase installs
tooling under `target/frontend-tooling`, runs `npm ci` from the committed lockfile,
checks types/lint/format/tests, then bundles. `./mvnw package` produces assets but
does not replace the integration-verification gate. Dependency installation may
download build tooling; Node/npm are not application runtime dependencies.

The site entry imports plain CSS only. No page, browser processing or visual
product design is implemented. Output is `target/frontend/static/assets/` plus
the private `target/frontend/asset-manifest.json`; Maven includes only these
generated resources, alongside existing authored resources. Compiled output,
tooling, npm cache and `node_modules` are not committed or packaged.

After Maven has installed the pinned tooling, run individual scripts through
`./mvnw frontend:npm -Dfrontend.npm.arguments="run typecheck"` (substitute `lint`,
`format:check`, `test` or `build`). The default lifecycle remains the reproducible
workflow; do not rely on global npm, skip required checks or supply stale bundles.

Build-watch, HMR and browser import-boundary enforcement remain F02-UH02.
`AssetManifest.site()` provides immutable `script`, `stylesheets` and
`modulePreloads` references for escaped Thymeleaf attributes. Rendered roles
require JavaScript `.js` scripts/preloads and `.css` stylesheets;
wrong types fail safely with `BTC_ASSETS_TYPE_INVALID`.
At startup, the
resolver requires `entries/site.ts`, validates all referenced classpath resources
and walks static imports dependency-first with deterministic deduplication and
cycle termination. Dynamic imports are validated but remain lazy. Missing,
malformed or unsafe metadata fails startup with bounded `BTC_ASSETS_*` codes,
without parser causes or raw manifest content. No test-profile bypass exists.

Vite 8 emits from `target/frontend/` with `assetsDir: static/assets` and a root
`asset-manifest.json`. Manifest filenames therefore start with `static/assets/`:
classpath lookup uses that complete relative path and public URLs remove only
the `static/` prefix. The manifest is outside the publicly served `static/` tree.

## Packaged verification

Boot-managed Failsafe runs `PackagedAssetsIT` after JAR creation/repackaging and
fails `verify` if integration assertions fail. The existing CI already invokes
Maven verification and packaged health smoke; no new action, global Node setup
or permission expansion is needed.

Tests inspect the normal JAR, compare generated/packaged/HTTP JS and CSS bytes,
and prove the private manifest and fixture route return authenticated 404s.
A separate fixture JAR copies only two test classes and one test template,
changes its Start-Class to the test entry point and renders actual Thymeleaf
asset attributes. Test classes live outside production component scanning;
they and the template are absent from the normal distributable.

Isolated mutation JARs test absent entry, absent manifest, malformed JSON and
unsafe paths. They must exit non-zero before readiness, emit the expected bounded
code and omit a synthetic sentinel from full captured logs. Tests verify the
normal JAR's SHA-256 remains unchanged and delete their fixture copies afterwards.
Process logs remain under ignored `target/asset-it/` for inspection. Synthetic
credentials are generated per process, supplied through its environment and never
printed; production Security configuration is unchanged. All processes bind to
loopback, have bounded readiness/HTTP/shutdown timeouts and are stopped by tests.

Run `python3 scripts/verify-java-baseline.py` for redacted Maven output and
`python3 scripts/smoke-java-baseline.py` for the original packaged health check.
For a clean acceptance run, use `python3 scripts/verify-java-baseline.py clean`;
it invokes Maven `clean verify` and redacts generated development passwords.

## Local build-watch — F02-UH02

Run these commands from the repository root. First build and package once:

```bash
./mvnw clean package
```

Then use two terminals, with project-local tooling (no Vite dev server or HMR):

```bash
# Terminal 1: keep the Vite build watcher running.
./mvnw frontend:npm -Dfrontend.npm.arguments="run watch"
```

```bash
# Terminal 2: Spring serves the single browser origin on loopback.
java -jar target/beneath-the-code-0.1.0-SNAPSHOT.jar --spring.profiles.active=local
```

Wait for each watcher build to finish, then reload the page. The `local` profile
reads `target/frontend/asset-manifest.json` per render and serves `/assets/**`
directly from `target/frontend/static/assets/` with `no-store` and no resource-chain
cache. It does not fall back to packaged assets for missing local URLs or invalid
local manifests. The manifest stays outside the public handler's root. Changes to
Java/templates still require the usual application rebuild/restart; this watcher
only rebuilds browser assets. The current executable includes Home, three JSON tools, UTF-8 Base64 and the three
reviewed learning units using the shared design system. Use the [local release runbook](local-release.md) for normal classpath-
packaged verification; the watcher/local profile is a filesystem-asset preview.

The frontend plugin has an `m2e ignore` lifecycle instruction: Eclipse/VS Code
Java auto-builds must not reinstall Node dependencies or clear watcher output.
Explicit Maven CLI/CI still executes every frontend check and build. If an IDE
already imported the old POM, refresh its Maven project configuration before
starting watch. The instruction is documented in
[m2e lifecycle mapping](https://eclipse.dev/m2e/documentation/release-notes-17.html).
The owner-approved workspace setting `java.autobuild.enabled=false` also keeps
VS Code Java compilation from racing Maven in `target/classes`. Use explicit
Maven verification/builds; refresh or manually rebuild IDE diagnostics when needed.
Outside VS Code, ensure other build processes are not writing the same target tree.

`btc.assets.directory` can select a different generated output root **only** with
the sole active profile `local` and `server.address=127.0.0.1`. Additional active
profiles are rejected deliberately to prevent local configuration leaking into
production. Non-local configurations reject any `btc.assets.directory` setting;
standard `spring.web.resources.static-locations` must be classpath locations,
including indexed YAML lists. Failures use bounded `BTC_ASSETS_*` codes.
No security policy is relaxed; native locale preferences remain CSRF-protected
and the application remains stateless without login.

The pure layers are `tools/<tool>/algorithms/` and `tools/<tool>/domain/`. Their
lint rules reject relative imports/re-exports outside that capability's pure
layers, editor/Node imports, DOM/network/storage globals and dynamic imports.
Pure third-party libraries remain possible but require normal dependency review;
lint is a boundary check, not a transitive dependency/security audit. No empty
algorithm package was added merely to make a check pass: virtual lint fixtures
exercise both allowed and forbidden dependencies.

Verification starts the pinned Vite watcher with the real build configuration and
an isolated source/output root, serves FIRST, SECOND and THIRD JS/CSS versions
through one unchanged packaged server, and compares rendered URLs, HTTP bytes,
media types and no-store headers. It verifies private-manifest 404s and stops both
processes. Production/mixed-profile startup tests reject developer paths before
readiness and omit synthetic path sentinels from captured logs.

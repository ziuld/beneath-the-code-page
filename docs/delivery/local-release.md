# Local MVP release runbook

Use this runbook for local packaged-JAR builds and startup; no hosting, account
setup, upload or publication is required. The historical accepted F16 implementation
is `3bfc8c59c0bf5e9f9ca01901b9847b7f8d60c608`; its exact reproduction revision and
artifact identity remain in [F16 evidence](../../harness/evidence/F16-integrated-acceptance.md).
For the current F17 candidate, use its own
[maintenance evidence](../../harness/evidence/F17-security-maintenance.md) and
record `git rev-parse HEAD` plus dirty state. F16's JAR hash/results do not certify
new dependency patches. Do not combine current documentation with an old checkout
and assume identical results.

## Prerequisites and clean source

Use JDK/java/javac 25.0.4.1 (Java25 without preview), Git, Python3 and a shell.
The tested host is Linux x86_64. The Maven Wrapper pins Maven3.10.0, Wrapper3.3.4
and the distribution checksum; no global Maven or Node installation is required.
Maven installs Node24.21.0/npm11.21.0 project-locally and uses locked npm packages.
Spring Boot4.1.1 manages runtime dependencies with the bounded Tomcat11.0.27 and
Jackson BOM3.1.8 overrides recorded in ADR011. For historical F16 reproduction,
use its original dependency versions and policy instead. Network access is needed for missing
wrapper/Maven/npm artifacts and fresh security databases. Security tooling
supports Python3.10–3.14 on Linux x86_64.

Start from a separate checkout of the tested revision, with a clean tracked tree.
Do not copy target, node_modules, generated browser assets or uncommitted runtime
sources into it. Existing dependency caches may be reused; they are not application
build output. The verification script uses .mvn/local-repository and target for
its Maven/JVM tooling. In the recorded local reproduction only that dependency
cache is reused; all source compilation, npm installation and packaging are fresh.
The MAVEN_USER_HOME setting below keeps wrapper downloads project-local too.
No system package installation, sudo or Docker is required.

## Build and health smoke

From that checkout:

```sh
git status --short
git rev-parse HEAD
java -version
javac -version
export MAVEN_USER_HOME="$PWD/.mvn/local-repository"
python3 scripts/verify-java-baseline.py
python3 scripts/smoke-java-baseline.py
sha256sum target/beneath-the-code-0.1.0-SNAPSHOT.jar
```

A successful build runs frontend checks/bundle, Java/architecture tests and
packaged integration tests. The existing smoke script checks the executable
manifest, binds an ephemeral loopback port, verifies health200/UP and stops its
child. A successful build is not a substitute for browser/privacy/security or
owner acceptance. Record exit codes and versions; do not hide failed commands.

## Normal packaged runtime and route smoke

Run from a directory without the generated frontend tree to verify classpath
assets. From the checkout root:

```sh
mkdir -p target/local-release-run
cd target/local-release-run
java -Djava.io.tmpdir=. -jar ../beneath-the-code-0.1.0-SNAPSHOT.jar --server.address=127.0.0.1 --server.port=8080
```

In another terminal, verify health and open the retained pages:

```sh
curl --fail http://127.0.0.1:8080/actuator/health
curl --fail 'http://127.0.0.1:8080/?lang=en'
curl --fail 'http://127.0.0.1:8080/tools?lang=es'
curl --fail 'http://127.0.0.1:8080/learn/java-fundamentals/source-to-jvm?lang=fr'
```

Health must be UP. Check Home, /tools, /tools/json-formatter,
/tools/json-validator, /tools/json-minifier, /learn, /learn/java-fundamentals and
/learn/java-fundamentals/source-to-jvm in EN/ES/FR. HTML must be localised and
no-store; linked hashed CSS/JS and the original B image must load from the JAR.
The reviewed unit includes its exercise and visible explanatory answer. Missing
learning units return safe localised404; unknown tools remain denied403. HTML
errors have a language-preserving Home link. Actuator details/unlisted routes
remain unavailable; only health is public. Stop with Ctrl+C and confirm the
process exits. Use another available loopback port if8080 is occupied.

## Native HTTP preview and browser/security verification

The non-local configuration retains Secure cookies. For interactive native locale
preference review over local HTTP, start the existing local profile from the
checkout root, after building:

```sh
java -Djava.io.tmpdir=target -jar target/beneath-the-code-0.1.0-SNAPSHOT.jar --spring.profiles.active=local --server.port=8080
```

This profile is loopback-only and serves target/frontend filesystem assets; it is
not proof of normal packaged-asset loading. Do not combine it with another active
profile. Stop this process after review. No tool data is sent to the server or
persisted by the application. Without JavaScript, reading/navigation still work
and tool processing shows its translated unavailable explanation.

The accepted candidate's Chromium/owner/security results are linked in F16 evidence.
To verify changed inputs using the existing harnesses after building:

```sh
python3 scripts/verify-home-browser.py --engine chromium --install
python3 scripts/install-security-tools.py
python3 scripts/test-security.py
python3 scripts/verify-security.py
```

The browser install is project-local; do not add --with-deps or install system
packages. Scanners analyse locally; source is not uploaded. Missing scanners/data,
incomplete coverage, stale databases, secrets and unresolved blocking findings
fail visibly. The active policy applies no exceptions. The historical eight F16
decisions remain under security/history/ with their original expiry/fingerprint;
they are not used for the current candidate. Actual passing security results
require matching source and packaged inventories and fresh databases.

## Release notes and limitations

- Home/shared navigation now exposes the reviewed Learn journey and retains
  explicit EN/ES/FR reading language across Home, tools, breadcrumbs and errors.
- JSON Formatter/Validator/Minifier process input in browser memory under the
  existing syntax, precision, size/depth/output and worker lifecycle controls.
- Exactly one source-to-JVM learning unit is available; Java Fundamentals is not
  a complete course. Two more lessons, agreed design, remaining tools and Docker Desktop portability
  are selected V2 follow-ups, not delivered capabilities.
- Chromium is the sole required browser. Firefox/WebKit compatibility is not
  guaranteed; F19 schedules final Firefox/WebKit and separate actual Safari review.
  Historical issues remain explicit in the pending browser register.
- Keyboard/visual criteria, narrow reflow and actual200% zoom were owner-approved;
  no full-WCAG or screen-reader compatibility claim is made. No measured code
  coverage percentage is asserted.
- Security uses no active exceptions; the actual F17 scan records current findings. Local acceptance
  is not a public-deployment security guarantee. Fresh databases are required.
- No licence has been selected; public repository visibility does not grant rights
  to redistribute code, course content, logo or fonts.
- There are no accounts, persisted progress, database, analytics or cloud runtime.
  Scoped pushes and a PR are authorised after maintenance and two lessons. Tags,
  public releases, deployment, image publication and OpenSpec archival remain
  separate actions.

# Manual Spring Initializr handoff

Status: user action pending. No ZIP has been generated or extracted by the agent.

## Exact settings

Use [Spring Initializr](https://start.spring.io/):

| Field | Value |
|---|---|
| Project | Maven |
| Language | Java |
| Spring Boot | **4.1.1**, stable (not SNAPSHOT or milestone) |
| Group | `dev.beneaththecode` |
| Artifact | `beneath-the-code` |
| Name | `beneath-the-code` |
| Description | `Browser-local developer tools and software engineering education` |
| Package name | **`dev.beneaththecode`** |
| Packaging | Jar |
| Java | **25** |

If a configuration-format choice is shown, choose YAML; otherwise leave the generated properties file and convert it during Sprint 0.

Select these five dependencies:

1. Spring Web (MVC/servlet, not Spring Reactive Web).
2. Thymeleaf.
3. Spring Security.
4. Validation.
5. Spring Boot Actuator.

Do not select Lombok, JPA, JDBC, database drivers, OAuth, Spring Session, Spring Cloud, Docker Compose Support or native-image support. TypeScript, CodeMirror, ArchUnit and browser tooling are added during Sprint 0, not through Initializr.

Initializr live metadata was read on 2026-10-09: it offered Java 25 and Boot 4.1.1. Its internal Boot identifier was `4.1.1.RELEASE`; select the UI label **4.1.1**, and inspect the generated POM rather than manually adding that metadata suffix. The exact build must still pass the bootstrap smoke check. See [sources](../architecture/sources.md).

## Safe extraction

1. Generate and download the ZIP yourself.
2. Extract it into a temporary directory first, then inspect its top-level contents.
3. Copy its generated files into `/home/ziuld/AI/beneath-the-code` so `pom.xml` is directly at that root, alongside `AGENTS.md`, `docs/` and `harness/`.
4. Avoid a nested `beneath-the-code/beneath-the-code/` directory.
5. Preserve planning files. Compare collisions (especially `.gitignore`, README and existing wrapper files); do not choose “replace all”.
6. Keep the generated application class in `dev.beneaththecode` initially. This scans child packages automatically. Moving it into `bootstrap` is a later refactor requiring an explicit root scan and a test.
7. Tell the agent the import is complete. The next work item is F01, starting with inspection of the generated POM and tree.

The first generated app may display Spring Security's default login behaviour. That is expected before the explicit Phase 1 security chain is implemented; do not disable security to hide it.

## After import — Sprint 0 actions, not actions already performed

- Confirm Boot version, Java release, package and the five selected starters.
- Check the wrapper and checksum, generated test dependencies and clean application context.
- Inventory local JDK/container tooling without altering system installations.
- Use a project-local runtime/container if needed; global packages require permission.
- Confirm the public remote still matches the intended repository before Git setup.
- Initialise/connect local Git only during the requested bootstrap; no remote push is implicit in this documentation delivery.
- Establish feature branches, checks, frontend build and lockfile.

The JDK vendor build recommended by the specification is Temurin `25.0.4.1+1`, verified from the vendor release page. Initializr's Java field is the language level **25**, not that vendor build string.

# Beneath the Code

Developer tools and software education: understanding over memorisation.

**Stage: V1 accepted. Selected V2 delivery includes security maintenance, three reviewed Java units, the shared redesign and all six browser-local tools. Bounded simplification and F19 browser review are complete; real Safari remains unverified. Docker development and portability are in progress under F20; Windows/second-PC acceptance remains pending.**

Repository: https://github.com/ziuld/beneath-the-code-page (public). The local directory name is `beneath-the-code`; the GitHub repository name intentionally differs.

## Start here

1. [Preparation and manual Spring Initializr checklist](docs/bootstrap/manual-initializr.md).
2. [Epic → Feature → UH → Task reading index](docs/planning/hierarchy.md), or [expandable story reader](docs/planning/backlog.html).
3. [Architecture specification v1](docs/architecture/technical-architecture-v1.md).
4. [Feasibility review and implementation clarifications](docs/architecture/feasibility-review.md).
5. [Feature roadmap and PM operating plan](docs/planning/project-plan.md).
6. [Gantt and progress dashboard](docs/planning/roadmap.html) — open the file locally in a browser; GitHub displays its source.
7. [Feature acceptance criteria](docs/planning/feature-backlog.md).
8. [Current handoff](harness/current-state.md).

The canonical tracker is [plan.json](docs/planning/plan.json). It holds the hierarchy, status, tasks and unmigrated behaviour. Stories with `behaviour_spec` use their linked main OpenSpec specification as the sole editable requirements/scenario source. The dashboard and story documents are generated, read-only views. Update the data and regenerate them; they do not automatically observe GitHub or implementation progress.

## Scope

One Spring Boot / MVC / Thymeleaf application; browser-local TypeScript; English, Spanish and French; no accounts or database. V1 includes F06 JSON Formatter, F07 Validator and Minifier, the complete retained website structure and one complete Java Fundamentals unit. The selected V2 sequence is security/docs → two additional lessons → first push/PR → page-by-page agreed design → remaining tools → bounded simplification → final browser review → Docker Desktop/second-PC handoff. The other five proposed course units remain deferred. See [ADR010](docs/architecture/adr-010-v2-delivery-and-portable-handoff.md) and the [current plan](docs/planning/project-plan.md).

Current tools: JSON Formatter, JSON Validator, JSON Minifier, [UTF-8 Base64 Encoder/Decoder](docs/delivery/base64.md), [UUID Generator](docs/delivery/uuid.md) and [JWT Decoder](docs/delivery/jwt.md), all using the shared design system. JWT inspection never verifies signatures or claims.

The approved B logo has a standalone variant and a composition with its supplied background. See [brand rules](docs/brand/brand-application.md).

## Planning checks

Run with Python 3, without installing dependencies:

```sh
python3 scripts/render-roadmap.py
python3 scripts/render-backlog.py
python3 scripts/check-planning.py
```

These commands validate documentation and planning data only.

## Local release

Use the [local release runbook](docs/delivery/local-release.md) for the reviewed
revision, pinned prerequisites, packaged startup/smoke/shutdown and limitations.
Local acceptance does not authorise publication or deployment.

## Java baseline

Contributor and initial CI conventions: [CONTRIBUTING.md](CONTRIBUTING.md).

Verified local toolchain: Arch Linux OpenJDK/java/javac `25.0.4.1`, Maven `3.10.0` via Wrapper `3.3.4`, Spring Boot `4.1.1`. The wrapper's actual Maven version supersedes the architecture document's provisional `3.9.16`; Boot manages starter/test versions; [ADR011](docs/architecture/adr-011-bounded-security-dependency-patches.md) records the bounded Tomcat11.0.27 and Jackson BOM3.1.8 security overrides. ArchUnit is explicitly pinned to `1.4.1` in test scope.

```sh
./mvnw verify
./mvnw package
python3 scripts/smoke-java-baseline.py
```

The executable is `target/beneath-the-code-0.1.0-SNAPSHOT.jar`. The smoke script checks its manifest, starts it on an ephemeral loopback port, verifies health and stops its child process. Current implementation/acceptance evidence is recorded in the handoff; the F01 records below describe the historical baseline.

Architecture tests import only production output. Absent capability packages produce explicit skipped checks, while compiled test-only fixtures verify the same strict rules against forbidden and permitted dependencies and cycles. New production packages activate their corresponding rules automatically. No production placeholders are required.

See [final F01 acceptance](harness/evidence/F01-closure.md) and [baseline evidence](harness/evidence/F00-F01-java-baseline.md) for historical checks and limitations; see the [current handoff](harness/current-state.md) for current acceptance and the next step. [Unfinished follow-ups](docs/planning/risks-and-decisions.md) remain explicit. No licence has been selected; public visibility is not an open-source licence grant. Review source, course, logo and font rights before redistribution. See [repository conventions](docs/delivery/repository-and-ci.md).

Docker development and local execution: [Windows/Linux handoff](docs/delivery/docker-handoff.md).

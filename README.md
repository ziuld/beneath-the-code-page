# Beneath the Code

Developer tools and software education: understanding over memorisation.

**Stage: Spring Initializr imported; Java baseline established; product features have not started.**

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

The canonical tracking and story specification data is [plan.json](docs/planning/plan.json). It contains the epic, features, EARS requirements, Gherkin scenarios and ordered tasks. The dashboard and story documents are generated, read-only views. Update the data and regenerate them; they do not automatically observe GitHub or implementation progress.

## Scope

One Spring Boot / MVC / Thymeleaf application; browser-local TypeScript tools; English, Spanish and French; no accounts or database in Phase 1. JSON Formatter is the first complete vertical slice. Full MVP includes all eight tools and Java Fundamentals.

The approved B logo has a standalone variant and a composition with its supplied background. See [brand rules](docs/brand/brand-application.md).

## Planning checks

Run with Python 3, without installing dependencies:

```sh
python3 scripts/render-roadmap.py
python3 scripts/render-backlog.py
python3 scripts/check-planning.py
```

These commands validate documentation and planning data only.

## Java baseline

Contributor and initial CI conventions: [CONTRIBUTING.md](CONTRIBUTING.md).

Verified local toolchain: Arch Linux OpenJDK/java/javac `25.0.4.1`, Maven `3.10.0` via Wrapper `3.3.4`, Spring Boot `4.1.1`. The wrapper's actual Maven version supersedes the architecture document's provisional `3.9.16`; Boot manages the generated starter/test versions. ArchUnit is explicitly pinned to `1.4.1` in test scope.

```sh
./mvnw verify
./mvnw package
python3 scripts/smoke-java-baseline.py
```

The executable is `target/beneath-the-code-0.1.0-SNAPSHOT.jar`. The smoke script checks its manifest, starts it on an ephemeral loopback port, verifies health and stops its child process. Generated security login/password behavior and the missing-template warning are expected at this baseline.

Architecture tests import only production output. Absent capability packages produce explicit skipped checks, while compiled test-only fixtures verify the same strict rules against forbidden and permitted dependencies and cycles. New production packages activate their corresponding rules automatically. No production placeholders are required.

See [baseline evidence](harness/evidence/F00-F01-java-baseline.md) for actual results and acceptance limitations. CI and product features remain pending. No licence has been selected; public visibility is not an open-source licence grant. Review source, course, logo and font rights before redistribution. See [repository conventions](docs/delivery/repository-and-ci.md).

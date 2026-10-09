# Contributing to Beneath the Code

Read [AGENTS.md](AGENTS.md), the [current handoff](harness/current-state.md), the relevant feature dossier and its EARS/Gherkin/tasks before starting. [plan.json](docs/planning/plan.json) is canonical. Changes must respect the accepted architecture and current authorised scope.

## Branch and review conventions

- Keep main as the integration branch. Use short branches such as `feature/F01-java-ci` or `feature/F06-json-formatter` for coherent work items.
- Use Conventional Commit-style titles with feature/story IDs, for example `build(F01): add Java verification`.
- Submit a PR containing the outcome, task/scenario IDs, actual test evidence and limitations. Publishing a branch/PR requires the owner's authorisation when working through an agent.
- The actual repository maintainer is [@ziuld](https://github.com/ziuld), also recorded in CODEOWNERS. Review the diff and acceptance evidence, resolve discussions and squash-merge coherent changes. A solo maintainer records a self-review without requiring approval of their own PR.
- The initial check to require once remotely verified is **Java verification** from **Java baseline**. Branch protection, required-check configuration and merge policy are intended conventions, not settings changed by these files.
- A failing or absent check is not a passed check. A commit or a green local build alone does not close a story; use the [closure rules](docs/planning/story-workflow.md).

## Local checks matching initial CI

Use Java 25. Local OpenJDK 25.0.4.1 is verified; CI pins Temurin jdk-25.0.4.1+1. Adoptium represents that build as SemVer `25.0.4+101.0.LTS`, which is the exact input expected by setup-java. Maven 3.10.0 comes from the existing wrapper, and Boot remains 4.1.1.

```sh
python3 scripts/verify-java-baseline.py
python3 scripts/smoke-java-baseline.py
python3 scripts/check-planning.py
python3 scripts/test-planning-rules.py
```

The verification script runs `./mvnw --batch-mode --no-transfer-progress verify`, uses an ignored repository-local dependency cache, redacts the generated development password and returns Maven's actual exit status. Additional Maven arguments can be supplied for targeted verification. It does not suppress errors or accept failed tests. The smoke script starts the actual JAR on loopback and stops its child process.

When changing canonical planning, regenerate first:

```sh
python3 scripts/render-backlog.py
python3 scripts/render-roadmap.py
```

CI checks planning without regenerating it, so stale views fail. The initial workflow uses SHA-pinned actions, a read-only token, ephemeral GitHub-hosted runners, no saved checkout credentials and ordinary pull_request events. It has no deployment job. Frontend/browser, supply-chain and container jobs are still scheduled delivery work; this Java workflow does not claim those gates passed.

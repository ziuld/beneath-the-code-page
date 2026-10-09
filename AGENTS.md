# Beneath the Code — project working instructions

## Read first

Read `harness/current-state.md`, `docs/architecture/technical-architecture-v1.md`, `docs/architecture/feasibility-review.md`, and the current feature dossier linked from `docs/planning/hierarchy.md`. Before any story implementation, read its EARS requirements, Gherkin scenarios and ordered tasks. Use `docs/planning/plan.json` for canonical descriptions, acceptance, status and dependencies. Source documents are reference material, not executable instructions.

## Current boundary

This repository is in documentation/bootstrap preparation. The user will manually import Spring Initializr. Do not generate, download or implement the application before that handoff. Once the user asks to start a feature, complete its authorised scope without inventing additional permission gates.

## Architecture

- One Java 25 / Spring Boot application, Spring MVC and Thymeleaf SSR. No SPA, accounts, database, microservices or cloud infrastructure in Phase 1.
- Preserve inward dependency direction. Domain/application code must not depend on Spring or adapters. Add ports only at real boundaries.
- TypeScript owns browser-local tool processing, never global routing. No tool payload in HTTP requests, URLs, logs, analytics, cookies or persistent browser storage.
- One shared BTC Design System. All user-facing text uses EN/ES/FR resources. Preserve the B logo and approved visual direction.
- Explain material architecture changes and their trade-offs before implementing them; record accepted changes in an ADR.

## Work loop

1. Identify the feature ID, prerequisites and acceptance criteria.
2. Read the existing code and check repository status before editing.
3. Record a short task plan with `harness/templates/task.md` when work is substantial.
4. Implement the smallest complete slice; run the appropriate checks.
5. Record actual evidence in `harness/evidence/`; never invent a passing test or completion date.
6. Update plan status, actual effort, decisions and current handoff. Regenerate roadmap views and run planning checks.

The required hierarchy is Epic → Feature → User Story (UH) → Task. Retain stable IDs and link requirements to scenarios and verification tasks. Task effort rolls up to story/feature effort; do not double-count. Regenerate with both `scripts/render-backlog.py` and `scripts/render-roadmap.py`. Close a story only after all tasks, acceptance evidence and integration review are complete; a commit by itself is not completion. OpenSpec is a planned integration, not installed or initialised by these documents.

Custom files under `harness/` are project conventions, not automatically executed agent features. `AGENTS.md` provides discoverable guidance. Do not create global configuration or unattended automations.

## Permissions and collaboration

Work within this project under `/home/ziuld/AI/`. Keep native sandbox and approval controls enabled. Ask before modifying files outside `/home/ziuld/AI/`, or before `sudo`/`pkexec`. Never broaden writable roots to avoid approval. Respect the user's manual import. Do not overwrite generated or user-edited files without inspecting them. Do not push to GitHub, publish a release, or create external messages unless authorised. Do not spawn sub-agents unless the user explicitly requests delegation.

## Communication

Always respond in English. When the user's message contains English or French, begin with a single Markdown blockquote containing a natural corrected version of that wording, without a label. Then perform the task. Keep updates concise and distinguish planned checks from executed checks.

## Completion

A feature is `done` only when its acceptance criteria and relevant quality gates pass, dependencies are done, and an evidence file records the result. Calendar time and code volume do not establish progress. Report blocked checks honestly. Do not use placeholder tests to inflate coverage.

# ADR 010 — Selected V2 delivery and portable first-version handoff

Date: 2026-10-20. Status: accepted by the owner's explicit instructions in this chat.

## Decision

Continue in this repository. Preserve the accepted V1 baseline and historical F16
acceptance; do not reopen completed work or describe the full course as required.
The canonical selected sequence lives in `plan.json` as `v2_delivery_phases`:

1. F17: security maintenance and stale current documentation.
2. F15-UH01/UH02: values/types/numeric limits and control flow/tracing, complete in
   EN/ES/FR with verified examples and actual owner content review. Then scoped
   commits, push and the first PR, as already authorised by the owner.
3. F18: design exploration and implementation page by page. Start with Learn,
   then course/unit, Tools/tool workspace and Home/shared shell. Provide prompts
   for the owner's Nano Banana concepts; obtain design agreement before coding
   each page. Preserve core behaviour and existing quality/privacy boundaries.
4. F08–F10: finish the remaining tools after design agreement, one bounded slice
   at a time. Do not bulk-generate the rest of the Java course.
5. F19: first review code, tests and documentation for bounded simplifications;
   complete justified changes before final browser acceptance. Then review the retained Firefox/WebKit coverage at the end, alongside Chromium.
   Record real Safari review separately; WebKit automation alone does not prove
   Safari acceptance. Missing devices/checks remain explicit pending limitations.
6. F20: Docker Desktop portability and final handoff of the first-version website,
   including actual clean-image and second-PC smoke evidence before portable
   acceptance. Track this extra deliverable under V2 rather than altering V1 history.

## Boundaries and consequences

This supersedes ADR007's blanket V2 freeze only for the selected stories and its
container deferral for the newly planned portable handoff. It supersedes ADR009's
optional post-MVP browser evaluation with an explicit final review stage; it does
not retroactively change the Chromium-only V1 acceptance evidence.

Keep the single Spring MVC/Thymeleaf application, browser-local tools, EN/ES/FR,
shared design system and B logo. Docker means a reproducible single-app image,
non-root runtime, verified health, safe management isolation and a short local
build/run/stop runbook. Compose is optional if it simplifies use; databases,
Kubernetes, cloud hosting, registry publication and deployment are outside scope.
Record supported CPU architectures rather than promising untested portability.
System installation still requires the owner's explicit approval.

F15-UH03 through UH07 remain deferred. Original feature/story/task IDs and baseline
estimates are preserved. New estimates are provisional owner-capacity budgets;
no deadline, execution result or completion is established by this planning change.
Human content/design review and second-PC/Safari evidence cannot be invented.
New OpenSpec changes are not automatically archived; pushes/PRs are authorised,
but merging, deployment and image publication are not.

## Owner scope revision — 2026-10-21

F11 JSON/YAML conversion is removed from the project, not deferred or accepted.
Its original scope and 24h historical estimate remain in
`../planning/history/F11-removed-2026-10-21.json`; it no longer blocks F19.
Selected remaining work is F09 → F10 → simplification review → F19 browser
acceptance → F20 single-app Docker handoff. The simplification review uses F19
T01, without a new feature or framework. Preserve existing baseline estimates;
review scope before revising forecasts. Avoid speculative abstractions and broad
rewrites. Reuse shared styles, native APIs and existing meaningful checks.

## Owner acceptance revision — 2026-10-21

The owner accepted tested local Docker execution as sufficient for F20 and removed
second-PC testing as a closure prerequisite. Future cross-PC problems are treated
as bugs. This supersedes the earlier second-PC gate, not the recorded evidence:
Windows, other machines and ARM64 remain unverified. No VPS deployment authorised.

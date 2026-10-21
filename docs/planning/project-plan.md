# Feature delivery and PM plan

Current scope:2026-10-21, [ADR010](../architecture/adr-010-v2-delivery-and-portable-handoff.md).
V1 is accepted; F16 was merged via PR9. The original M0–M4 exits and accepted
feature evidence remain unchanged. Remaining V1 baseline work is zero.

## Selected V2 order (completed)

The canonical `plan.json` field `v2_delivery_phases` selects stories rather than
implicitly scheduling entire features. See the generated
[phase table](roadmap.md#v2-delivery-sequence) and [execution queue](execution-order.md).

1. F17: current security maintenance and stale documentation.
2. F15-UH01/UH02: values/types/numeric limits and control flow/tracing, including
   verified examples, EN/ES/FR content and actual owner review. Then scoped push/PR.
3. F18: page-by-page prompts for owner-generated Nano Banana concepts, explicit
   design agreement, then implementation. Start with Learn and retain core behaviour.
4. F08–F10: remaining tools, after final design agreement. F11 JSON/YAML is removed.
5. F19: bounded code/test/documentation simplification before browser acceptance; final Chromium/Firefox/WebKit review and separate actual Safari evidence.
6. F20: single-app Docker development/runtime and handoff, accepted on local evidence.

F15-UH03–UH07 remain deferred. A complete course is not a release gate. Unavailable
Safari hardware and other PC platforms remain unverified, not invented passing
checks. Owner removed the second-PC closure gate on2026-10-21; selected V2 is complete.
Docker portability is an additional V2-tracked first-version handoff deliverable;
it does not rewrite the historical JAR-only V1 acceptance.

## Capacity and tracking

One owner with AI assistance,10 focused owner hours/week, one feature and one task
in progress at a time. Estimates include implementation, translation, integration,
verification and review. They are provisional judgements, not measured velocity
or calendar commitments. Selected remaining effort and20% contingency are computed
from tasks in the generated phase table. Preserve original IDs and baseline hours;
change forecasts only with a stated reason. Zero actual hours means unreported.
Historical remaining-V1 forecasts are superseded by accepted feature evidence.

`plan.json` owns tracking and unmigrated EARS/scenarios. Stories with `behaviour_spec`
use the linked main OpenSpec specification as sole editable behavioural source.
Generated dossiers, roadmap and queue are read-only; regenerate both renderers and
validate after updates. They do not automatically observe GitHub. Accepted V1 and
selected V2 progress remain distinct; do not count deferred work as completed.

## Ready, done and ownership

Read the feature/story, requirements, scenarios and ordered tasks; confirm actual
prerequisites. Routine engineering choices within authorised scope need no extra
approval. Material scope changes belong in an ADR. A story is done only after its
tasks, applicable checks, integration and evidence are complete, with a real scoped
commit reference. New findings or unresolved acceptance criteria keep it open.

Ziuld owns content/design acceptance and final review. The assistant implements,
verifies and records actual results. Human translation/content/visual acceptance
cannot be inferred from generated copy or earlier F16 approval. Review blockers
and reforecast each completed slice rather than adding a separate process programme.

The owner authorised scoped commits, push and a PR after maintenance/two lessons.
Merging, deployment, release tags, registry publication and new OpenSpec archival
are separate actions. No accounts, database, CMS, SPA, microservices or cloud setup.
Use the [local runbook](../delivery/local-release.md),
[repository/security conventions](../delivery/repository-and-ci.md) and
[risks register](risks-and-decisions.md) for concrete limitations.

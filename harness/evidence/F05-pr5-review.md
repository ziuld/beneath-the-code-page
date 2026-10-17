# Evidence — F05 pull request review

Date / reviewer: 2026-10-17; OpenCode, at the owner's request. Read-only GitHub inspection; no review comment, approval, ready-for-review transition, push or merge published.

Subsequent owner-authorised delivery, 2026-10-17: after the review, the owner explicitly approved marking PR #5 ready and merging. Rechecked the unchanged head and successful checks, marked ready, then squash-merged with an exact head-commit guard. GitHub confirms merged commit `8033ef0127b8c6e0da22f1e396e28f0eb88c4485`, merged at 19:25:05Z. This supersedes the earlier draft/no-merge state below. Local documentation follow-ups were preserved and were not silently included in that remote merge.

## Reviewed identity and scope

- PR: https://github.com/ziuld/beneath-the-code-page/pull/5
- Head and local HEAD: `e83be62d5f7c1b7d400bc250d4e915bfbcd758fe`.
- Base: `ac46dfd6c330f50b940622df67a63d81193cdb49`, branch `main`.
- Remote state: OPEN, draft, MERGEABLE, CLEAN; no recorded review decision.
- Inspected the actual PR diff and relevant production editor/policy/workspace, UTF-8 budgets, worker protocol/lifecycle, asset validation/caching, resource fragments, isolated fixture/build/runner, tests and browser workflow. Local F05 archive/spec synchronisation, accessibility clarification and F06 proposal are uncommitted follow-ups and are not part of the reviewed PR head.

## Findings

No blocking implementation findings discovered in the reviewed F05 changes. Existing scope limitations remain: matched older browser pin, four documented Java skips, no screen-reader compatibility/full-conformance claim and worker-internal/transient allocations not bounded solely by returned-output checks. This review does not certify every dependency or prove absence of defects.

The absence of a merge is a workflow state, not evidence of a failed CI gate: the PR remains a draft, and prior delivery did not authorise merging. OpenSpec archival does not change GitHub PR state. No external merge or review action was inferred from the request to inspect it.

## Executed remote checks

- `gh pr view 5` JSON fields confirmed the identity/state/mergeability and successful Java/browser jobs.
- `gh pr diff 5` retrieved the actual diff for review.
- `gh run view 38810257537` confirmed the current head and successful normal executable build, full Chromium, critical Firefox and critical WebKit steps. Java verification is successful in run `38810257596`.
- `git rev-parse HEAD` matched the PR head. `git status` confirmed pending local documentation/archive/spec follow-ups, not additional runtime changes.

No new local Maven or browser test run was performed for this read-only review. CI observations refer to the actual remote runs, not a fresh execution today. A first attempted file-filtered `gh pr diff` syntax was unsupported; the unfiltered diff command above succeeded and supplied the review input.

## Separate F06 planning constraint

F06's strict zero-request-after-loading promise is stronger than F05's expected-static-asset allowlist. F05's manager terminates workers on terminal results and reconstructs them for subsequent jobs. Even successful-worker reuse would still need a script load after hard termination/failure. This is an unresolved F06 contract/design decision, not a reason to retroactively label accepted F05 behaviour defective or weaken F06 acceptance without permission.

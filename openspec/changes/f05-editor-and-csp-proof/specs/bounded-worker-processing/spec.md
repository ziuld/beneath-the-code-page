# Spec Delta

## Purpose

Keep expensive browser-local processing bounded and recoverable through cancellable jobs, deadline enforcement, stale-result isolation and restrictive same-origin worker execution.

## ADDED Requirements

### Requirement: F05-UH02-R01 — Recover from a worker deadline or failure

If a worker exceeds the configured execution deadline, the workspace SHALL terminate that job and present a localised timeout status. The initial deadline SHALL be two seconds with one active job. Cancellation or worker failure SHALL leave the workspace responsive and able to start another job without reloading or transmitting content.

#### Scenario: F05-UH02-AC01 — Recover from an overlong job

- **GIVEN** a synthetic worker job runs longer than the initial two-second deadline
- **WHEN** the deadline expires
- **THEN** the job is terminated and another job can be started
- **AND** EN/ES/FR timeout status is announced without echoing content or raw exception messages

#### Scenario: Cancel and recreate a clean worker

- **GIVEN** a job is active and a prior accepted output exists
- **WHEN** the visitor cancels or a worker fails
- **THEN** the active job is terminated, its resources/timer are cleared, prior accepted output remains and a localised cancellation/error status is presented
- **AND** another job can succeed using a clean worker while keyboard interaction remains responsive

#### Scenario: Bound input and output before accepting results

- **WHEN** input exceeds the initial 1 MiB UTF-8 budget or returned output exceeds 8 MiB
- **THEN** the workspace rejects the operation/result with a localised limit status and does not replace prior accepted output
- **AND** valid boundary-sized text is not rejected for size alone
- **AND** these limits are initial budgets, not claims that all transient allocations or hardware timings are bounded

#### Scenario: Enforce worker response policy and cold-start privacy

- **GIVEN** a fresh browser context with an editor workspace and a same-origin worker script
- **WHEN** a job executes or a controlled worker attempts network access or unsafe evaluation
- **THEN** the worker response policy denies outbound connections and unsafe evaluation, independently of the document policy
- **AND** only expected same-origin static resource GETs occur; payload sentinels never enter network bodies, URLs, server logs, cookies or persistent browser storage

### Requirement: F05-UH02-R02 — Ignore stale or invalid worker responses

If a cancelled job produces a late result, the workspace SHALL ignore that result. Only a valid response for the active job SHALL update its output or status; superseded, duplicate and malformed responses SHALL NOT corrupt another job's state. Disposing the workspace SHALL release its worker and timer.

#### Scenario: F05-UH02-AC02 — Ignore stale output

- **GIVEN** job A is cancelled and job B has become current
- **WHEN** a late response for job A arrives
- **THEN** job B's state and output remain unchanged

#### Scenario: Reject ambiguous protocol updates

- **GIVEN** a current job with a unique identifier
- **WHEN** an unknown identifier, duplicate terminal response or malformed response arrives
- **THEN** no stale/invalid output is accepted and any current-job protocol failure yields a safe localised failure status rather than raw data

#### Scenario: Preserve one active job and release resources

- **GIVEN** a running job
- **WHEN** a new job starts or the workspace is disposed
- **THEN** the previous job is invalidated and its worker/timer released before replacement
- **AND** callbacks after disposal cannot update controls, output or status

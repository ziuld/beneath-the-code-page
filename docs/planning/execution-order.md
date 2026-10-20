# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**No unblocked V1 task is ready; inspect recorded prerequisites and blockers.**

Only unfinished V1 tasks are scheduled. Accepted work and frozen V2 tasks remain in the feature dossiers.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F16-UH01-T06](features/F16.md#f16-uh01) | closure | 0.5 | in_review | F16-UH01-T05 |
| 2 | [F16-UH02-T01](features/F16.md#f16-uh02) | analysis | 0.5 | planned | F16-UH01 |
| 3 | [F16-UH02-T02](features/F16.md#f16-uh02) | implementation | 1 | planned | F16-UH02-T01 |
| 4 | [F16-UH02-T03](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T02 |
| 5 | [F16-UH02-T04](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T03 |
| 6 | [F16-UH02-T05](features/F16.md#f16-uh02) | closure | 0.5 | planned | F16-UH02-T04 |

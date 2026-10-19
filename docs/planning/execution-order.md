# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**No unblocked V1 task is ready; inspect recorded prerequisites and blockers.**

Only unfinished V1 tasks are scheduled. Accepted work and frozen V2 tasks remain in the feature dossiers.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F13-UH01-T05](features/F13.md#f13-uh01) | closure | 0.5 | in_review | F13-UH01-T04 |
| 2 | [F13-UH02-T05](features/F13.md#f13-uh02) | closure | 0.5 | in_review | F13-UH02-T04 |
| 3 | [F14-UH01-T01](features/F14.md#f14-uh01) | analysis | 0.5 | planned | F13 |
| 4 | [F14-UH01-T02](features/F14.md#f14-uh01) | implementation | 0.5 | planned | F14-UH01-T01 |
| 5 | [F14-UH01-T03](features/F14.md#f14-uh01) | verification | 0.5 | planned | F14-UH01-T02 |
| 6 | [F14-UH01-T04](features/F14.md#f14-uh01) | verification | 0.25 | planned | F14-UH01-T03 |
| 7 | [F14-UH01-T05](features/F14.md#f14-uh01) | closure | 0.25 | planned | F14-UH01-T04 |
| 8 | [F14-UH02-T01](features/F14.md#f14-uh02) | analysis | 0.5 | planned | F14-UH01 |
| 9 | [F14-UH02-T02](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T01 |
| 10 | [F14-UH02-T03](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T02 |
| 11 | [F14-UH02-T04](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T03 |
| 12 | [F14-UH02-T05](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T04 |
| 13 | [F14-UH02-T06](features/F14.md#f14-uh02) | closure | 0.5 | planned | F14-UH02-T05 |
| 14 | [F16-UH01-T01](features/F16.md#f16-uh01) | analysis | 0.5 | planned | F12, F14 |
| 15 | [F16-UH01-T02](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T01 |
| 16 | [F16-UH01-T03](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T02 |
| 17 | [F16-UH01-T04](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T03 |
| 18 | [F16-UH01-T05](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T04 |
| 19 | [F16-UH01-T06](features/F16.md#f16-uh01) | closure | 0.5 | planned | F16-UH01-T05 |
| 20 | [F16-UH02-T01](features/F16.md#f16-uh02) | analysis | 0.5 | planned | F16-UH01 |
| 21 | [F16-UH02-T02](features/F16.md#f16-uh02) | implementation | 1 | planned | F16-UH02-T01 |
| 22 | [F16-UH02-T03](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T02 |
| 23 | [F16-UH02-T04](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T03 |
| 24 | [F16-UH02-T05](features/F16.md#f16-uh02) | closure | 0.5 | planned | F16-UH02-T04 |

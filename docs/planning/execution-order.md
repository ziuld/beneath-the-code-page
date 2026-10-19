# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**Current next action: F14-UH01-T01 — Read the feature, this story, EARS requirements and Gherkin scenarios; confirm prerequisites and the expected evidence.**

Only unfinished V1 tasks are scheduled. Accepted work and frozen V2 tasks remain in the feature dossiers.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F14-UH01-T01](features/F14.md#f14-uh01) | analysis | 0.5 | planned | F13 |
| 2 | [F14-UH01-T02](features/F14.md#f14-uh01) | implementation | 0.5 | planned | F14-UH01-T01 |
| 3 | [F14-UH01-T03](features/F14.md#f14-uh01) | verification | 0.5 | planned | F14-UH01-T02 |
| 4 | [F14-UH01-T04](features/F14.md#f14-uh01) | verification | 0.25 | planned | F14-UH01-T03 |
| 5 | [F14-UH01-T05](features/F14.md#f14-uh01) | closure | 0.25 | planned | F14-UH01-T04 |
| 6 | [F14-UH02-T01](features/F14.md#f14-uh02) | analysis | 0.5 | planned | F14-UH01 |
| 7 | [F14-UH02-T02](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T01 |
| 8 | [F14-UH02-T03](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T02 |
| 9 | [F14-UH02-T04](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T03 |
| 10 | [F14-UH02-T05](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T04 |
| 11 | [F14-UH02-T06](features/F14.md#f14-uh02) | closure | 0.5 | planned | F14-UH02-T05 |
| 12 | [F16-UH01-T01](features/F16.md#f16-uh01) | analysis | 0.5 | planned | F12, F14 |
| 13 | [F16-UH01-T02](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T01 |
| 14 | [F16-UH01-T03](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T02 |
| 15 | [F16-UH01-T04](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T03 |
| 16 | [F16-UH01-T05](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T04 |
| 17 | [F16-UH01-T06](features/F16.md#f16-uh01) | closure | 0.5 | planned | F16-UH01-T05 |
| 18 | [F16-UH02-T01](features/F16.md#f16-uh02) | analysis | 0.5 | planned | F16-UH01 |
| 19 | [F16-UH02-T02](features/F16.md#f16-uh02) | implementation | 1 | planned | F16-UH02-T01 |
| 20 | [F16-UH02-T03](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T02 |
| 21 | [F16-UH02-T04](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T03 |
| 22 | [F16-UH02-T05](features/F16.md#f16-uh02) | closure | 0.5 | planned | F16-UH02-T04 |

# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**Current next action: F16-UH01-T01 — Read the feature, this story, EARS requirements and Gherkin scenarios; confirm prerequisites and the expected evidence.**

Only unfinished V1 tasks are scheduled. Accepted work and frozen V2 tasks remain in the feature dossiers.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F16-UH01-T01](features/F16.md#f16-uh01) | analysis | 0.5 | planned | F12, F14 |
| 2 | [F16-UH01-T02](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T01 |
| 3 | [F16-UH01-T03](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T02 |
| 4 | [F16-UH01-T04](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T03 |
| 5 | [F16-UH01-T05](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T04 |
| 6 | [F16-UH01-T06](features/F16.md#f16-uh01) | closure | 0.5 | planned | F16-UH01-T05 |
| 7 | [F16-UH02-T01](features/F16.md#f16-uh02) | analysis | 0.5 | planned | F16-UH01 |
| 8 | [F16-UH02-T02](features/F16.md#f16-uh02) | implementation | 1 | planned | F16-UH02-T01 |
| 9 | [F16-UH02-T03](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T02 |
| 10 | [F16-UH02-T04](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T03 |
| 11 | [F16-UH02-T05](features/F16.md#f16-uh02) | closure | 0.5 | planned | F16-UH02-T04 |

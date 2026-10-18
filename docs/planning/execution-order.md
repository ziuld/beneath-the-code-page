# Ordered execution queue

One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.

**No unblocked V1 task is ready; inspect recorded prerequisites and blockers.**

Only unfinished V1 tasks are scheduled. Accepted work and frozen V2 tasks remain in the feature dossiers.

| Order | Task | Activity | Hours | Status | Depends on |
|---:|---|---|---:|---|---|
| 1 | [F07-UH02-T03](features/F07.md#f07-uh02) | verification | 1.25 | in_progress | F07-UH02-T02 |
| 2 | [F07-UH02-T04](features/F07.md#f07-uh02) | verification | 1.25 | planned | F07-UH02-T03 |
| 3 | [F07-UH02-T05](features/F07.md#f07-uh02) | closure | 0.5 | planned | F07-UH02-T04 |
| 4 | [F12-UH01-T01](features/F12.md#f12-uh01) | analysis | 0.5 | planned | F07 |
| 5 | [F12-UH01-T02](features/F12.md#f12-uh01) | implementation | 0.5 | planned | F12-UH01-T01 |
| 6 | [F12-UH01-T03](features/F12.md#f12-uh01) | verification | 0.5 | planned | F12-UH01-T02 |
| 7 | [F12-UH01-T04](features/F12.md#f12-uh01) | verification | 0.25 | planned | F12-UH01-T03 |
| 8 | [F12-UH01-T05](features/F12.md#f12-uh01) | closure | 0.25 | planned | F12-UH01-T04 |
| 9 | [F12-UH02-T01](features/F12.md#f12-uh02) | analysis | 0.5 | planned | F12-UH01 |
| 10 | [F12-UH02-T02](features/F12.md#f12-uh02) | implementation | 0.5 | planned | F12-UH02-T01 |
| 11 | [F12-UH02-T03](features/F12.md#f12-uh02) | verification | 0.5 | planned | F12-UH02-T02 |
| 12 | [F12-UH02-T04](features/F12.md#f12-uh02) | verification | 0.25 | planned | F12-UH02-T03 |
| 13 | [F12-UH02-T05](features/F12.md#f12-uh02) | closure | 0.25 | planned | F12-UH02-T04 |
| 14 | [F13-UH01-T01](features/F13.md#f13-uh01) | analysis | 0.5 | planned | F07 |
| 15 | [F13-UH01-T02](features/F13.md#f13-uh01) | implementation | 2 | planned | F13-UH01-T01 |
| 16 | [F13-UH01-T03](features/F13.md#f13-uh01) | verification | 1 | planned | F13-UH01-T02 |
| 17 | [F13-UH01-T04](features/F13.md#f13-uh01) | verification | 1 | planned | F13-UH01-T03 |
| 18 | [F13-UH01-T05](features/F13.md#f13-uh01) | closure | 0.5 | planned | F13-UH01-T04 |
| 19 | [F13-UH02-T01](features/F13.md#f13-uh02) | analysis | 0.5 | planned | F13-UH01 |
| 20 | [F13-UH02-T02](features/F13.md#f13-uh02) | implementation | 2 | planned | F13-UH02-T01 |
| 21 | [F13-UH02-T03](features/F13.md#f13-uh02) | verification | 1 | planned | F13-UH02-T02 |
| 22 | [F13-UH02-T04](features/F13.md#f13-uh02) | verification | 1 | planned | F13-UH02-T03 |
| 23 | [F13-UH02-T05](features/F13.md#f13-uh02) | closure | 0.5 | planned | F13-UH02-T04 |
| 24 | [F14-UH01-T01](features/F14.md#f14-uh01) | analysis | 0.5 | planned | F13 |
| 25 | [F14-UH01-T02](features/F14.md#f14-uh01) | implementation | 0.5 | planned | F14-UH01-T01 |
| 26 | [F14-UH01-T03](features/F14.md#f14-uh01) | verification | 0.5 | planned | F14-UH01-T02 |
| 27 | [F14-UH01-T04](features/F14.md#f14-uh01) | verification | 0.25 | planned | F14-UH01-T03 |
| 28 | [F14-UH01-T05](features/F14.md#f14-uh01) | closure | 0.25 | planned | F14-UH01-T04 |
| 29 | [F14-UH02-T01](features/F14.md#f14-uh02) | analysis | 0.5 | planned | F14-UH01 |
| 30 | [F14-UH02-T02](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T01 |
| 31 | [F14-UH02-T03](features/F14.md#f14-uh02) | implementation | 2 | planned | F14-UH02-T02 |
| 32 | [F14-UH02-T04](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T03 |
| 33 | [F14-UH02-T05](features/F14.md#f14-uh02) | verification | 1.5 | planned | F14-UH02-T04 |
| 34 | [F14-UH02-T06](features/F14.md#f14-uh02) | closure | 0.5 | planned | F14-UH02-T05 |
| 35 | [F16-UH01-T01](features/F16.md#f16-uh01) | analysis | 0.5 | planned | F12, F14 |
| 36 | [F16-UH01-T02](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T01 |
| 37 | [F16-UH01-T03](features/F16.md#f16-uh01) | implementation | 1.5 | planned | F16-UH01-T02 |
| 38 | [F16-UH01-T04](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T03 |
| 39 | [F16-UH01-T05](features/F16.md#f16-uh01) | verification | 0.5 | planned | F16-UH01-T04 |
| 40 | [F16-UH01-T06](features/F16.md#f16-uh01) | closure | 0.5 | planned | F16-UH01-T05 |
| 41 | [F16-UH02-T01](features/F16.md#f16-uh02) | analysis | 0.5 | planned | F16-UH01 |
| 42 | [F16-UH02-T02](features/F16.md#f16-uh02) | implementation | 1 | planned | F16-UH02-T01 |
| 43 | [F16-UH02-T03](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T02 |
| 44 | [F16-UH02-T04](features/F16.md#f16-uh02) | verification | 0.5 | planned | F16-UH02-T03 |
| 45 | [F16-UH02-T05](features/F16.md#f16-uh02) | closure | 0.5 | planned | F16-UH02-T04 |

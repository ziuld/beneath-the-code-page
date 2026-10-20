# Task — V2 delivery plan

Status / owner / date: planning update prepared / Ziuld with AI / 2026-10-20.

User outcome and authorised scope: update the V2 sequence before implementation;
include final deferred-browser review and Docker Desktop portability for another PC.

Prerequisites and files read: AGENTS.md; current-state; technical architecture;
feasibility review; hierarchy; canonical plan; ADR007/009; planning renderers/rules.
Fetched origin/main at 790b578a00ff8e0744f18273b679ed7fd219c0cd; clean previous
checkout had an identical tree. Branch: planning/v2-delivery-sequence.

Acceptance criteria: ADR010 and canonical selected phases match the owner's order;
original IDs/baselines and accepted V1 status retained; generated roadmap/backlog/
queue show selected V2 work and deferred course scope consistently.

Implementation steps: record ADR010; add bounded F17–F20 stories/criteria/tasks;
select only F15-UH01/UH02; regenerate both views and validate planning integrity.

Security/privacy/accessibility/locales: plan only. Actual fixes, content, visual
changes, scanner/browser/container runs and human acceptance are future work.

Verification: both renderers; check-planning; planning-rule tests; diff whitespace;
inspect generated order and preservation of existing baselines and acceptance.

Results/evidence: see harness/evidence/V2-delivery-plan.md. Actual effort unreported.

Next action: F17 analysis, then maintenance and two lessons before the first PR.

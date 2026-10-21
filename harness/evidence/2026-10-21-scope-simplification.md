# Scope simplification — 2026-10-21

Owner authorised removal of F11 and agreed to proportionate implementation and a pre-acceptance simplification review. Planning/documentation only; no runtime changes.

F11 and its two stories removed from active plan/generated views and F19 dependencies. Original scope/24h baseline preserved in docs/planning/history/F11-removed-2026-10-21.json, not marked implemented or deferred. F19 T01 now includes bounded code/test/documentation review before final browser runs. Existing estimates preserved; no new framework or feature. AGENTS.md records focused reads/checks and concise handoffs. Previous 1,990-line handoff preserved verbatim in harness/history/current-state-through-2026-10-21.md; current handoff reduced to under 60 lines.

Verified: both planning generators, check-planning.py (20 features), test-planning-rules.py (23 passing tests), git diff --check. No application/browser/security rerun warranted for documentation-only edits. Changes remain uncommitted; nothing pushed. F09 remains planned and awaits owner instruction.

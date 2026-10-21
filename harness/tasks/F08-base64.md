# Task — F08 UTF-8 Base64

Status / owner / date: in progress / Ziuld with AI / 2026-10-21.
User requested the next selected feature after accepted F18. Prerequisites F06/F18
complete; read AGENTS, current handoff, architecture/feasibility and F08 dossier /
canonical EARS, scenarios and ordered tasks. Behaviour stays in plan.json.

Scope: explicit encode/decode, canonical standard padded Base64 (empty valid),
strict alphabet/length/padding/unused-bit validation, fatal UTF-8 decoding with BOM
preserved, reject unpaired UTF-16 surrogates before encoding. No files/Base64URL/
whitespace normalization, server processing or persistence. Use current1MiB input,
8MiB output and2s worker limits. Show localised errors, retained stale output,
current-only explicit Copy, Clear and Cancel in the accepted F18 workspace.

Implementation: pure bounded codec + tests; reuse the existing one production
worker entry and lifecycle (historical JSON worker asset identity retained), extract
result ownership into a shared function at its second real consumer, add thin
Base64 UI adapter/SSR route/locale return allowlist and catalogue card. No new
framework/dependency/registry. Same tokens/components/keyboard/no-JS/CSP rules.

Verification: Unicode/empty/BOM/line endings/invalid surrogate and strict malformed
Base64/non-UTF-8 fixtures, exact resource boundaries/output preflight; worker
protocol/result ownership and actual Chromium EN/ES/FR journeys/privacy/CSP/
keyboard/no-JS/stale/Copy/Clear/cancel/recovery. Full Maven, fresh security, policy,
main specs and planning checks. Record actual results in F08-base64.md evidence.
Only complete tasks with evidence; review candidate before closure. Actual owner
effort unreported. No push/PR/deploy/archival. Next: implementation T02.

Implementation/verification complete: Maven265+17/224, Chromium153, fresh security0,
policy20/spec15 and visual/reflow review PASS. T05 recording local reviewed revision.
See harness/evidence/F08-base64.md. Preview45915 is running; no push/PR.

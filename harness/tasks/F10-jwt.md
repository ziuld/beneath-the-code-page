# Task — F10 JWT Decoder

Status: implementation and acceptance verified; recording closure. Owner: Ziuld with AI assistance. Date: 2026-10-21.
Scope: bounded local compact-JWS inspection; permanent signature-not-verified
notice, escaped header/claims, no key fetching, verification, editor or worker.
Read: AGENTS/current-state, F10 dossier/EARS/Gherkin/tasks, architecture/feasibility,
ADR010 and retained story/quality guidance. Prerequisites F06/F18 complete.
Acceptance: docs/planning/features/F10.md#f10-uh01 (AC01/AC02).
Steps: stop verified UUID preview; implement bounded decoder/native textarea;
focused tests; full Maven/Chromium/security/spec/planning gates; review and handoff.
Limits: 16 KiB ASCII compact input, JSON depth 32; reject five-part JWE, malformed
base64url/UTF-8/JSON and unencoded/detached payloads. Original JSON text retained.
Privacy/accessibility: memory only, textContent, labelled native controls, EN/ES/FR,
no network/storage/automatic clipboard. exp remains untrusted data, no time verdict.
Evidence: harness/evidence/F10-jwt.md. Actual owner effort unreported.

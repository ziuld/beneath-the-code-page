# Selected V2 publication readiness — 2026-10-21

Owner authorised documentation updates, push and PR in this chat. Merge,
deployment, registry publication and new OpenSpec archival are not authorised.
Base origin/main dce47f8791ecca13da1770da99adb22b19fa315f; no upstream divergence.
Branch delivery/F20-docker includes accepted F18, F08/F09/F10, F19 and F20 commits.
Previously uncommitted owner scope/planning changes are preserved in this delivery,
including F11 removal/history and local Docker acceptance revision.

Current guidance reconciled across AGENTS, architecture, planning, contributor,
quality, runbooks and security docs. Historical scope/evidence retained rather
than presented as current results. Actual owner effort remains unreported.

Docker CI added for ordinary PR/main events, read-only token/SHA-pinned checkout,
no persisted credentials. Existing browser job renamed to reflect full website.
No branch-protection settings modified; main is currently unprotected. No remote
CI pass claimed before execution. No image publication or deployment job added.

Local affected checks: runtime verifier PASS39 route/locale journeys plus non-root,
health, packaged assets, CSRF/locale, management isolation and graceful shutdown.
Image security gate PASS with OS/expected Java inventory and nonempty CycloneDX
SBOM:24 MEDIUM/4 LOW,0 HIGH/CRITICAL, no waivers. Six new gate regression tests
cover missing/malformed inventory, wrong Java versions and blocking severities.
Application source/runtime unchanged; retained F20 full274 frontend/277 Java/17 IT,
73 tool-browser checks and F19 engine evidence remain applicable. New scanner
and workflow/harness changes receive focused checks plus fresh repository security.
Final planning/security results and PR/check URLs recorded in the handoff.

Final local publication checks: application dependency/secret/SAST scan PASS,
0 findings; policy20, image policy6, strict specs15, planning23/integrity/links,
workflow YAML parsing and whitespace PASS. Image gate PASS28 nonblocking findings,
SBOM nonempty. No runtime/application source changed in this publication slice.
Preview btc-f20-preview was identity-verified and stopped before runtime checks;
restart after publication if needed. Remote CI still awaits the new PR.

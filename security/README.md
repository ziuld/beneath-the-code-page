# Application security verification

F12 tooling is project-local (`target/security-tools`), supports Linux x86-64 and
uses Trivy 0.76.0 plus Semgrep OSS 1.181.0. Scanner archives/wheel and Python
dependencies are checksum-pinned. uv 0.13.1 installs the isolated Python environment
using the host's Python 3.10–3.14; no system packages or hosted account are required.

Semgrep rules are downloaded at revision
`17e31e11ebac99fb7dfe1cd288f7a32151b6f3f9`, individually SHA-256 checked and kept
under ignored tooling with the upstream licence notice. The Semgrep Rules License
v1.0 permits internal scanning but not redistribution; do not commit the downloaded
rules or upload them as CI artifacts. The scanner engine and rules have distinct
licences. See https://semgrep.dev/legal/rules-license.

Selected upstream rules cover Java command injection, unsafe deserialisation, XXE
and disabled Spring CSRF, plus browser eval, dynamic innerHTML and DOM XSS in
JavaScript/TypeScript. This is a bounded reviewed ruleset, not comprehensive SAST.
All Java/TypeScript application source must be scanned; parse errors, missing
coverage or scanner/database failures cannot be counted as clean results.

The dependency scope is Maven compile/runtime/import resolution, the shipped
JAR and both npm lockfiles including development dependencies. Maven test-only
and build-plugin dependencies are not claimed as covered. Secrets are checked in
the current tracked repository tree, not all historical revisions. Generated
files, caches, downloaded tools and reports are not application inputs.

Trivy filesystem mode checks the POM and npm lockfiles. Packaged JARs require a
separate local `rootfs` analysis of the staged JAR directory; this is a scanner
mode, not a container or application runtime. Both Java inventories are required.

The candidate secret scope also includes untracked, non-ignored source files so
new work cannot escape verification before its first commit. SAST excludes
colocated `*.test.ts` fixtures, not application source; all configured application
files must appear in the actual scanned-file list. Semgrep ERROR rules and HIGH/
CRITICAL impact findings block, including ERROR rules with conservative impact
metadata. Lower-priority results are retained, not silently dropped.

Install/run instructions and failure policy are in
[`docs/delivery/repository-and-ci.md`](../docs/delivery/repository-and-ci.md).

## Bounded applicability decisions

The active `applicability.json` uses the exact no-exception policy
`{"mode":"none","findings":[]}`. It does not suppress or reclassify any finding;
all default dependency/secret/SAST blockers remain blocking. Unknown extra fields
or waiver entries cannot be attached to this mode. No approval date, expiry or
configuration fingerprint is renewed by selecting zero exceptions.

The original eight owner-approved decisions for the F16 Boot4.1.1 configuration
are preserved byte-for-byte in `history/F16-applicability.json` as historical
approval evidence, retaining their original expiry at2026-11-01 UTC. The gate
loads only the active policy. Legacy bounded-policy checks still require an exact
POM/server-source/packaged-code fingerprint, owner reference and unexpired exact
CVE/package/version match; tests retain those failure cases.

F17 retains Boot4.1.1 with Tomcat11.0.27 and Jackson BOM3.1.8 security patches;
see [ADR011](../docs/architecture/adr-011-bounded-security-dependency-patches.md).
Both POM and shipped-JAR inventories must contain the Boot/Tomcat/Jackson versions
selected by the POM. Actual scan results belong in the
[F17 evidence](../harness/evidence/F17-security-maintenance.md), not in this policy.

Scanner source/download metadata: GitHub release APIs for Trivy/uv, PyPI for the
Semgrep wheel, and immutable semgrep-rules source. Downloaded scanner resources
remain local; do not upload repository source or use browser tool payloads.

## Container image gate

Docker PR/main CI reuses the pinned Trivy installation. Run
`python3 scripts/test-container-security.py` and
`python3 scripts/verify-container-security.py` against the built local image.
The gate requires OS and expected Java inventory, fresh databases and scanner
success; HIGH/CRITICAL findings block. All lower findings remain visible. It
generates a CycloneDX SBOM and fails on empty components. It neither publishes
the image nor grants deployment approval. Output: target/container-security/.

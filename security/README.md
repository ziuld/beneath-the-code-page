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

`applicability.json` records the eight owner-approved CVE/package/version decisions
for the current Boot4.1.1 configuration, expiring at the start of2026-11-01 UTC.
Findings remain in reports with their original severity, default blocking status,
reason, owner and expiry. Only the exact POM/JAR observations become non-blocking;
new CVEs, versions, targets, secrets and SAST findings are unaffected.

The approval fingerprint covers the POM, server Java source, non-i18n server
configuration/webapp files and packaged server classes/configuration. A new or
changed server class/configuration invalidates it, including before rebuilding;
changed packaged classes invalidate it too. JAR timestamps and translated UI prose
do not. Do not refresh the fingerprint automatically: reassess affected advisory
prerequisites and obtain approval. Expired, invalid or changed-scope decisions fail
closed. Final V1 acceptance must reassess these decisions; they are not permanent
guarantees or permission for public deployment.

Scanner source/download metadata: GitHub release APIs for Trivy/uv, PyPI for the
Semgrep wheel, and immutable semgrep-rules source. Downloaded scanner resources
remain local; do not upload repository source or use browser tool payloads.

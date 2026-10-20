# F17 — Security maintenance and current documentation

Date:2026-10-20. Owner:Ziuld with AI assistance. Candidate based on merged
origin/main790b578a00ff8e0744f18273b679ed7fd219c0cd. Existing authorised V2
planning edits are included; no application routing, tool algorithms, lesson
content, templates or CSS changed. Commit identity is recorded on closure.

## Remediation and decisions

Official Maven Central stable4.1 metadata lists only Boot4.1.0/4.1.1. Retain
Boot4.1.1 and Java25. Use parent properties for Tomcat11.0.27 and Jackson BOM3.1.8
under ADR011; no individually versioned Jackson modules or unrelated upgrades.
The POM and shipped-JAR inventories now must both match the POM-selected Boot,
Tomcat core, Jackson core and databind versions. Stale/missing versions fail.

Baseline scanner:20 observations,16 HIGH/CRITICAL observations representing the
eight exact CVEs across POM/JAR plus4 medium observations. Gate passed only with
the historical bounded owner decisions. Baseline configuration fingerprint:
`86448545c37a015e416636702e4957651c7526742493106d3c7fbffdd2319250`.

Patched scanner:PASS,0 findings,0 blocking findings,0 exceptions. Inventories:
POM70, shipped Java60, frontend npm166 and browser npm5;45 main Java/TypeScript
files scanned. No secrets/SAST findings. Databases were within the mandatory24h
window: vulnerability `2026-10-20T13:14:22.737606427Z`;
Java `2026-10-20T00:59:02.286523053Z`. Freshness rules were not relaxed.
Current server configuration fingerprint:
`f7e8d272957e647b0b5a7ed610d9240ac5e620415f7ef212d8df7b1674363b61`.

The active no-exception policy leaves every finding's default blocking status
unchanged. No owner disposition, expiry or fingerprint was renewed. Original
F16 approval JSON is preserved byte-for-byte under security/history/ with its
original2026-11-01 expiry; gate loads only the active file. Regression tests cover
new CVEs/packages/versions/targets/secrets/SAST, expiry/scope failures, strict
no-exception shape and stale/missing source/packaged inventories. Synthetic
negative tests are policy checks, not actual scanner execution evidence.

## Actual verification

- Full `verify-java-baseline.py`:PASS;257 Java/architecture/unit tests and17
  packaged integration tests, no failures/errors/skips;185 frontend tests plus
  type/lint/i18n and production bundle checks. Maven3.10.0/JDK25.0.4.1, Boot4.1.1.
- `smoke-java-baseline.py`:PASS, executable manifest, packaged startup and health
  HTTP200/UP; child process stopped. Packaged dependencies include all3 Tomcat
  embed modules11.0.27 and Jackson core/databind3.1.8.
- Chromium:125/125 PASS,0 skipped/flaky/unexpected; browser153.0.8010.12. Includes
  existing locale/learning/editor/worker/CSP/privacy/no-JS/keyboard assertions.
- `test-security.py`:20 PASS, including retained bounded-policy negative checks.
- Actual `verify-security.py`:PASS with the no-exception policy as detailed above.
- Planning rule suite:23 PASS; generated views and hierarchy/link checks PASS
  after evidence file creation. Both renderers used; original baselines retained.
- Main OpenSpec strict validation:15/15 PASS. Existing supply-chain requirements
  already permit a clean scan with no dispositions; no behaviour ownership
  migration or new OpenSpec archive is needed for this maintenance slice.
- `git diff --check`:PASS.

JAR SHA256: `e6ceda5a0fd08de03f0396010fdf6c4fe2977f5bca88445864f9f97ba932b469`.
Local detailed reports/logs:target/f17-maven.log, target/f17-chromium.log,
target/browser-results.json, target/security/f17-before.json and
 target/security/summary.json. These ignored files are local diagnostic evidence;
no downloaded scanner rules or raw source/secret excerpts are published.

## Documentation and limits

README, contributor versions, security docs, local runbook, repository/CI guide,
current delivery plan/backlog and handoff distinguish current selected V2 work
from accepted V1 history. Obsolete remaining-V1 budgets and blanket V2 freeze
instructions are replaced or explicitly historical. ADR010 records the owner's
sequence; ADR011 records patch responsibility and return-to-managed-version intent.
Original V1 evidence and approval records remain unchanged.

No new human content/visual acceptance is claimed or required for unchanged pages.
Firefox/WebKit/Safari and Docker/second-PC checks remain planned under F19/F20.
No system install, public deployment, registry publication or remote CI pass is
claimed. Build-plugin/test-only Maven dependencies, full Git history and full
security/a11y conformance remain outside the scanner's stated coverage. Zero
findings is a result of this bounded scan, not a vulnerability-free guarantee.
Actual owner effort unreported. First push/PR remains after the two lessons.

## Closure

Implementation/planning commit: `e38cb17b48348d749b428b0d066dc893cf073d87`. All four canonical tasks and the
F17 story/feature are complete after the scoped diff/integration review and actual
checks above. Closure tracking/documentation is a separate local commit; application,
POM and security-policy inputs remain those tested. No push or PR yet. Next selected
work is F15-UH01 followed by F15-UH02; first push/PR follows those reviewed lessons.

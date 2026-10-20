# ADR 011 — Bounded Tomcat and Jackson security patches

Date: 2026-10-20. Status: implementation decision within the owner's authorised F17 maintenance scope.

## Context and decision

Official Maven Central metadata offers Boot4.1.0/4.1.1 only on the stable4.1 line.
Boot4.1.1 manages Tomcat11.0.24 and Jackson3.1.5; newer same-line patch artifacts
are published: Tomcat11.0.27 and Jackson3.1.8. Retain Boot4.1.1 and use its parent
property mechanism to override only `tomcat.version` and `jackson-bom.version`.
Use the Jackson BOM for family alignment, not independently versioned modules.
This is a narrow security exception to architecture section3's managed-version
policy, not an architectural change or general dependency-upgrade campaign.

The trade-off is responsibility for compatibility outside Boot4.1.1's tested
managed set. Require full Maven verification, packaged smoke, retained Chromium
journeys and actual fresh scanner inventories for both POM and shipped JAR.
Return to default management when a compatible Boot release provides these fixes;
review these properties at the next Boot update rather than carrying them blindly.

## Applicability policy

Remove active configuration-bound exceptions rather than extending expiry or
reapproving a fingerprint. Preserve the original F16 JSON byte-for-byte under
`security/history/F16-applicability.json`; the scanner loads only the active file.
The exact active policy `{ "mode": "none", "findings": [] }` applies no waiver:
all default blockers remain blocking, including new CVEs, secrets and SAST findings.
Old bounded-policy expiry/fingerprint/exact-match checks remain supported/tested.
Current closure requires actual passing scans; patch selection alone is not proof.

## Primary references checked

- [Boot parent metadata](https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-starter-parent/maven-metadata.xml).
- [Boot4.1.1 dependency BOM](https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/4.1.1/spring-boot-dependencies-4.1.1.pom).
- [Tomcat security advisories](https://tomcat.apache.org/security-11.html).
- [Jackson3.1.7 security fixes](https://github.com/FasterXML/jackson/wiki/Jackson-Release-3.1.7).
- [Jackson3.1.8 release notes](https://github.com/FasterXML/jackson/wiki/Jackson-Release-3.1.8).

Actual results belong in harness/evidence/F17-security-maintenance.md.

# Current handoff

As of 2026-10-09: owner's manual Initializr import inspected; Java baseline locally verified. Product features have not been implemented.

- F00 and F00-UH01 accepted by current import/preservation review; all four tasks done. Historical pre-import hashes and the original archive were not supplied; see evidence limitations.
- Actual Java/javac: Arch Linux OpenJDK 25.0.4.1. Maven: 3.10.0 through Wrapper 3.3.4. Spring Boot: 4.1.1. POM version: 0.1.0-SNAPSHOT, JAR packaging, prescribed generated starters/tests preserved.
- F01 is in_progress. F01-UH01-T01–T04 done; story in_review and T05 ready pending real initial-commit reference and integration closure. F01-UH02 blocked: local ArchUnit portion verified, CI implementation/remote acceptance pending. F01 is not complete.
- Local clean verification, ./mvnw verify and ./mvnw package pass. Executable target/beneath-the-code-0.1.0-SNAPSHOT.jar starts on loopback and returns health UP. Controlled test correctly returned Maven exit 1, then was removed.
- ArchUnit 1.4.1 checks inward dependencies, framework-free core, adapter separation, cross-capability adapters, bootstrap/root wiring and cycles. 24 fixture tests pass; eight future production checks explicitly skip absent packages. No production placeholders added; entry point remains dev.beneaththecode.
- Expected warnings: missing Thymeleaf templates, generated development Security password (redacted), Mockito/Byte Buddy dynamic agent and JVM class sharing. A clean attempt with its Maven cache inside target failed; the ignored .mvn/local-repository cache corrected this and final checks pass.
- Git initialised locally on main, origin https://github.com/ziuld/beneath-the-code-page.git. Commit hash will be reported in the final handoff to avoid a recursive metadata commit. No push authorised or performed.
- Planning retains EPIC-MVP → F00–F16 → 36 UH stories → 190 tasks, with 72 EARS requirements and 72 linked Gherkin scenarios. Capacity remains 10 owner hours/week; no committed start date. Actual owner time is unreported, not inferred from estimates.
- Architecture and approved B identity preserved. F02/frontend, pages, controllers, templates, product behavior, OpenSpec and Cucumber have not been started.

Evidence: `harness/evidence/F00-F01-java-baseline.md`; task record: `harness/tasks/F00-F01-java-baseline.md`. Generated views must follow plan.json.

Exact next ready task: **F01-UH01-T05** — review the coherent initial commit and acceptance/integration evidence, record its real hash during the next substantive planning update, and close the story only when the canonical closure rule is satisfied. Do not start F02; F01-UH02 still needs CI acceptance.

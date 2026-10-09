package dev.beneaththecode.architecture;

import com.tngtech.archunit.core.importer.ClassFileImporter;
import dev.beneaththecode.tools.domain.CIFrameworkLeak;
import org.junit.jupiter.api.Test;

/** Intentionally failing acceptance probe for F01-UH02-AC02, not a permanent regression test. */
class CIArchitectureFailureTest {

	@Test
	void forbiddenDomainDependencyMustFailMavenVerification() {
		ArchitectureRules.BOUNDARIES.get(0).rule()
				.check(new ClassFileImporter().importClasses(CIFrameworkLeak.class));
	}
}

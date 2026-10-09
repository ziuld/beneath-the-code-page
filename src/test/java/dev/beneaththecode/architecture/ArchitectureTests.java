package dev.beneaththecode.architecture;

import java.nio.file.Path;
import java.util.stream.Stream;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

class ArchitectureTests {

	private static final JavaClasses PRODUCTION = new ClassFileImporter().importPath(Path.of("target/classes"));

	@Test
	void generatedEntryPointRemainsAtRootAndProductionImportIsNonempty() {
		assertThat(PRODUCTION).isNotEmpty();
		assertThat(PRODUCTION.get("dev.beneaththecode.BeneathTheCodeApplication").getPackageName())
				.isEqualTo(ArchitectureRules.ROOT);
	}

	static Stream<ArchitectureRules.Boundary> boundaries() {
		return ArchitectureRules.BOUNDARIES.stream();
	}

	@ParameterizedTest(name = "{0}")
	@MethodSource("boundaries")
	void productionBoundary(ArchitectureRules.Boundary boundary) {
		// Absent packages are reported as skipped, never as successful boundary validation.
		// Once introduced, selection is automatic and empty selections remain an error in the rule itself.
		assumeTrue(PRODUCTION.stream().anyMatch(c -> boundary.source().test(c.getPackageName())),
				"Deferred until production introduces " + boundary.name() + "; exercised by BoundaryFixtureTests");
		boundary.rule().check(PRODUCTION);
	}

	@Test
	void productionPackagesAreAcyclic() {
		assumeTrue(PRODUCTION.stream().map(c -> c.getPackageName()).distinct().count() > 1,
				"Package cycle detection deferred until multiple production packages exist; fixture tested");
		ArchitectureRules.PACKAGE_CYCLES.check(PRODUCTION);
	}

	@Test
	void productionCapabilitiesAreAcyclic() {
		assumeTrue(PRODUCTION.stream().filter(c -> ArchitectureRules.capability(c.getPackageName()))
				.map(c -> c.getPackageName().substring(ArchitectureRules.ROOT.length() + 1).split("\\.")[0])
				.distinct().count() > 1, "Capability cycle detection deferred until multiple capabilities exist; fixture tested");
		ArchitectureRules.CAPABILITY_CYCLES.check(PRODUCTION);
	}
}

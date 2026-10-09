package dev.beneaththecode.architecture;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import javax.tools.ToolProvider;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Real Java 25 bytecode fixtures live only in temporary test output, never in production. */
class BoundaryFixtureTests {

	@TempDir
	Path directory;

	static Stream<Arguments> forbiddenEdges() {
		var cases = new ArrayList<Arguments>();
		for (String layer : List.of("domain", "application")) {
			for (String target : List.of("org.springframework.context.ApplicationContext", "jakarta.servlet.Servlet",
					"org.thymeleaf.TemplateEngine", "dev.beneaththecode.tools.adapter.in.web.Target",
					"dev.beneaththecode.tools.adapter.out.content.Target", "dev.beneaththecode.bootstrap.Target",
					"dev.beneaththecode.platform.configuration.Target")) {
				cases.add(Arguments.of(layer.equals("domain") ? 0 : 1, "tools." + layer, target));
			}
		}
		cases.add(Arguments.of(0, "tools.domain", "dev.beneaththecode.tools.application.Target"));
		cases.add(Arguments.of(2, "tools.adapter.in.web", "dev.beneaththecode.tools.adapter.out.content.Target"));
		cases.add(Arguments.of(3, "tools.adapter.out.content", "dev.beneaththecode.tools.adapter.in.web.Target"));
		cases.add(Arguments.of(4, "tools.application", "dev.beneaththecode.learning.adapter.in.web.Target"));
		cases.add(Arguments.of(4, "learning.adapter.out.content", "dev.beneaththecode.tools.adapter.out.content.Target"));
		cases.add(Arguments.of(5, "tools.adapter.in.web", "dev.beneaththecode.bootstrap.Target"));
		cases.add(Arguments.of(5, "learning.domain", "dev.beneaththecode.BeneathTheCodeApplication"));
		return cases.stream();
	}

	@ParameterizedTest(name = "rule {0}: {1} -> {2}")
	@MethodSource("forbiddenEdges")
	void rejectsForbiddenDependency(int ruleIndex, String sourcePackage, String target) throws IOException {
		String source = ArchitectureRules.ROOT + "." + sourcePackage + ".Violation";
		var sources = new java.util.HashMap<String, String>();
		sources.put(source, "public class Violation { public " + target + " dependency; }");
		if (target.startsWith(ArchitectureRules.ROOT) && !target.endsWith("BeneathTheCodeApplication")) {
			sources.put(target, "public class Target {}");
		}
		JavaClasses fixture = compile(sources);
		var boundary = ArchitectureRules.BOUNDARIES.get(ruleIndex);
		assertThat(fixture.stream().filter(c -> boundary.source().test(c.getPackageName())).count()).isPositive();
		assertThatThrownBy(() -> boundary.rule().check(fixture)).isInstanceOf(AssertionError.class)
				.hasMessageContaining(source).hasMessageContaining(target);
	}

	@Test
	void acceptsInwardDependenciesAndApplicationOwnedPorts() throws IOException {
		JavaClasses fixture = compile(Map.of(
				"dev.beneaththecode.tools.domain.Identity", "public class Identity {}",
				"dev.beneaththecode.tools.application.Query", "public class Query { public dev.beneaththecode.tools.domain.Identity identity; }",
				"dev.beneaththecode.tools.adapter.in.web.Page", "public class Page { public dev.beneaththecode.tools.application.Query query; }",
				"dev.beneaththecode.learning.application.port.out.Content", "public interface Content {}",
				"dev.beneaththecode.learning.adapter.out.content.Loader", "public class Loader implements dev.beneaththecode.learning.application.port.out.Content {}",
				"dev.beneaththecode.bootstrap.Wiring", "public class Wiring { public dev.beneaththecode.learning.adapter.out.content.Loader loader; }"));
		for (var boundary : ArchitectureRules.BOUNDARIES) {
			boundary.rule().check(fixture);
		}
		ArchitectureRules.PACKAGE_CYCLES.check(fixture);
		ArchitectureRules.CAPABILITY_CYCLES.check(fixture);
	}

	@Test
	void rejectsCyclesWithinAndBetweenCapabilities() throws IOException {
		JavaClasses fixture = compile(Map.of(
				"dev.beneaththecode.tools.domain.First", "public class First { public dev.beneaththecode.tools.application.Second second; }",
				"dev.beneaththecode.tools.application.Second", "public class Second { public dev.beneaththecode.tools.domain.First first; public dev.beneaththecode.learning.domain.Third third; }",
				"dev.beneaththecode.learning.domain.Third", "public class Third { public dev.beneaththecode.tools.application.Second second; }"));
		assertThatThrownBy(() -> ArchitectureRules.PACKAGE_CYCLES.check(fixture))
				.isInstanceOf(AssertionError.class).hasMessageContaining("Cycle detected");
		assertThatThrownBy(() -> ArchitectureRules.CAPABILITY_CYCLES.check(fixture))
				.isInstanceOf(AssertionError.class).hasMessageContaining("Cycle detected");
	}

	@Test
	void strictRulesRejectEmptySelections() throws IOException {
		JavaClasses fixture = compile(Map.of("dev.beneaththecode.bootstrap.Wiring", "public class Wiring {}"));
		for (var boundary : ArchitectureRules.BOUNDARIES) {
			assertThatThrownBy(() -> boundary.rule().check(fixture)).isInstanceOf(AssertionError.class)
					.hasMessageContaining("failed to check any classes");
		}
	}

	private JavaClasses compile(Map<String, String> sources) throws IOException {
		Path output = Files.createDirectory(directory.resolve("classes"));
		var arguments = new ArrayList<>(List.of("--release", "25", "-classpath", System.getProperty("java.class.path"),
				"-d", output.toString()));
		for (var source : sources.entrySet()) {
			int separator = source.getKey().lastIndexOf('.');
			Path file = directory.resolve(source.getKey().substring(separator + 1) + ".java");
			Files.writeString(file, "package " + source.getKey().substring(0, separator) + "; " + source.getValue());
			arguments.add(file.toString());
		}
		assertThat(ToolProvider.getSystemJavaCompiler().run(null, null, null, arguments.toArray(String[]::new)))
				.as("fixture compilation must succeed before evaluating architecture").isZero();
		return new ClassFileImporter().importPath(output);
	}
}

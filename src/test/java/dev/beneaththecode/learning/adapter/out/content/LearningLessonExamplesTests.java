package dev.beneaththecode.learning.adapter.out.content;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;
import javax.tools.ToolProvider;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.jupiter.api.io.TempDir;

import static org.assertj.core.api.Assertions.assertThat;

/** Execute the actual published examples, rather than a separately maintained copy. */
class LearningLessonExamplesTests {
	@TempDir Path directory;

	@ParameterizedTest
	@ValueSource(strings = { "values-types-numeric-limits", "control-flow-tracing" })
	void translatedExamplesAndPublishedAnswersAgreeWithBaselineJdkExecution(String slug) throws Exception {
		List<String> expectedCode = null;
		List<String> expectedOutput = null;
		for (String language : List.of("en", "es", "fr")) {
			String resource = "content/java-fundamentals/" + language + "/" + slug + ".md";
			String markdown;
			try (var stream = getClass().getClassLoader().getResourceAsStream(resource)) {
				assertThat(stream).isNotNull();
				markdown = new String(stream.readAllBytes(), StandardCharsets.UTF_8);
			}
			var code = blocks(markdown, "java");
			var output = blocks(markdown, "text").stream()
					.filter(block -> block.matches("[-0-9. \n]+")).toList();
			assertThat(code).hasSize(2);
			assertThat(output).hasSize(2);
			if (expectedCode == null) { expectedCode = code; expectedOutput = output; }
			assertThat(code).isEqualTo(expectedCode);
			assertThat(output).isEqualTo(expectedOutput);
			for (int index = 0; index < code.size(); index++) {
				assertThat(compileAndRun(code.get(index))).isEqualTo(output.get(index));
			}
		}
	}

	@Test
	void controlFlowBoundaryVariantsMatchTheReasonedAnswers() throws Exception {
		String markdown;
		try (var stream = getClass().getClassLoader().getResourceAsStream(
				"content/java-fundamentals/en/control-flow-tracing.md")) {
			markdown = new String(stream.readAllBytes(), StandardCharsets.UTF_8);
		}
		var examples = blocks(markdown, "java");
		assertThat(compileAndRun(examples.getFirst().replace("n <= 4", "n < 4")))
				.isEqualTo("1 1\n2 3\n3 4\n4\n");
		assertThat(compileAndRun(examples.get(1).replace("n < 4", "n <= 4")))
				.isEqualTo("5\n18\n");
		assertThat(compileAndRun(examples.get(1).replace("int n = 1;", "int n = 4;")))
				.isEqualTo("4\n0\n");
		assertThat(compileAndRun(examples.get(1).replace("int n = 1;", "int n = 3;")))
				.isEqualTo("4\n3\n");
	}

	private String compileAndRun(String code) throws Exception {
		var declaration = Pattern.compile("public class (\\w+)").matcher(code);
		assertThat(declaration.find()).isTrue();
		String name = declaration.group(1);
		Path work = Files.createTempDirectory(directory, "example-");
		Path source = work.resolve(name + ".java");
		Files.writeString(source, code, StandardCharsets.UTF_8);
		int compiled = ToolProvider.getSystemJavaCompiler().run(null, null, null,
				"--release", "25", "-d", work.toString(), source.toString());
		assertThat(compiled).isZero();
		Path captured = work.resolve("output.txt");
		var process = new ProcessBuilder(Path.of(System.getProperty("java.home"), "bin", "java").toString(),
				"-cp", work.toString(), name).redirectErrorStream(true).redirectOutput(captured.toFile()).start();
		try {
			assertThat(process.waitFor(10, TimeUnit.SECONDS)).isTrue();
			assertThat(process.exitValue()).isZero();
			return Files.readString(captured).replace("\r\n", "\n");
		} finally { process.destroyForcibly(); }
	}

	private static List<String> blocks(String markdown, String language) {
		return Pattern.compile("```" + language + "\n(.*?)```", Pattern.DOTALL).matcher(markdown)
				.results().map(match -> match.group(1)).toList();
	}
}

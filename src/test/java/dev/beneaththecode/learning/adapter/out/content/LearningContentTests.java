package dev.beneaththecode.learning.adapter.out.content;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import dev.beneaththecode.learning.application.LearningPages;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LearningContentTests {

	@Test
	void productionCatalogueContainsTheReviewedUnitAndValuesCandidate() {
		var catalogue = new ClasspathCourseContentSource(getClass().getClassLoader()).load();
		assertThat(catalogue.units()).extracting(LearningCatalogue.Unit::slug).containsExactly("source-to-jvm", "values-types-numeric-limits");
		assertThat(catalogue.translations()).containsOnlyKeys("en", "es", "fr");
		String expectedCode = null;
		for (String language : LearningCatalogue.LANGUAGES) {
			var text = catalogue.units().getFirst().translations().get(language);
			assertThat(text.markdown()).contains("javac -d out Main.java", "java -cp out Main", "Hello, JVM!", "Hello, bytecode!")
					.doesNotContain("F13_PRIVATE_", "window.fixtureExecuted", "synthetic fixture");
			var code = java.util.regex.Pattern.compile("```java\\n(.*?)```", java.util.regex.Pattern.DOTALL).matcher(text.markdown());
			assertThat(code.find()).isTrue();
			if (expectedCode == null) expectedCode = code.group(1);
			assertThat(code.group(1)).isEqualTo(expectedCode);
		}
	}

	@Test
	void emptyCatalogueNeedsNoMetadataAndPublishesNothing() {
		assertThat(source(Map.of("catalogue.properties", "published-units=")).load().units()).isEmpty();
	}

	@Test
	void everyPublishedLocaleRequiresNonblankPrerequisitesAndOutcomes() {
		for (String language : LearningCatalogue.LANGUAGES) {
			for (String field : List.of("course.prerequisites", "course.outcomes")) {
				var resources = fixture("first");
				String path = language + "/metadata.properties";
				String incomplete = resources.get(path).replaceAll("(?m)^" + java.util.regex.Pattern.quote(field) + "=.*\\n", "");
				resources.put(path, incomplete);
				assertInvalid(resources);
				resources.put(path, incomplete + field + "= \n");
				assertInvalid(resources);
			}
		}
	}

	@Test
	void singlePublishedUnitHasCompleteUtf8ContentAndNoNeighbours() {
		var pages = new LearningPages(source(fixture("first")));
		var page = pages.unit("first").orElseThrow();
		assertThat(page.previous()).isEmpty();
		assertThat(page.next()).isEmpty();
		assertThat(page.unit().translations()).containsOnlyKeys("en", "es", "fr");
		assertThat(page.unit().translations().get("es").title()).isEqualTo("Introducción first");
		assertThat(page.unit().translations().get("fr").markdown()).isEqualTo("## fr\nExercice first\n");
	}

	@Test
	void onlyPublishedOrderDefinesNavigationEvenWhenDraftFilesExist() {
		var resources = fixture("second,first");
		resources.put("en/draft.md", "Synthetic draft");
		var pages = new LearningPages(source(resources));
		assertThat(pages.unit("draft")).isEmpty();
		assertThat(pages.unit("../first")).isEmpty();
		assertThat(pages.unit("%2e%2e")).isEmpty();
		assertThat(pages.unit("second").orElseThrow().next().orElseThrow().slug()).isEqualTo("first");
		assertThat(pages.unit("second").orElseThrow().previous()).isEmpty();
		assertThat(pages.unit("first").orElseThrow().previous().orElseThrow().slug()).isEqualTo("second");
		assertThat(pages.unit("first").orElseThrow().next()).isEmpty();
	}

	@ParameterizedTest
	@ValueSource(strings = { "first,first", "../private", "%2e%2e", "Uppercase", "first,", "two--hyphens" })
	void invalidPublicationCannotSelectResourcePaths(String published) {
		var paths = new ArrayList<String>();
		var loader = source(Map.of("catalogue.properties", "published-units=" + published), paths);
		assertThatThrownBy(loader::load).isInstanceOf(IllegalStateException.class)
				.hasMessage("BTC_LEARNING_CONTENT_INVALID").hasNoCause();
		assertThat(paths).containsExactly("content/java-fundamentals/catalogue.properties");
	}

	@Test
	void missingOrBlankRequiredValuesFailWithoutPathsOrCauses() {
		for (String key : List.of("es/first.md", "fr/metadata.properties", "catalogue.properties")) {
			var resources = fixture("first"); resources.remove(key);
			assertInvalid(resources);
		}
		var resources = fixture("first"); resources.put("es/first.md", " ");
		assertInvalid(resources);
		resources = fixture("first"); resources.put("es/metadata.properties", "course.title=Curso\ncourse.summary=Resumen");
		assertInvalid(resources);
		assertInvalid(Map.of("catalogue.properties", "unrelated=value"));
	}

	@Test
	void snapshotAndNestedCollectionsCannotBeMutated() {
		var resources = fixture("first");
		var pages = new LearningPages(source(resources));
		resources.put("en/first.md", "Changed");
		assertThat(pages.unit("first").orElseThrow().unit().translations().get("en").markdown()).startsWith("## en");
		assertThatThrownBy(() -> pages.catalogue().units().clear()).isInstanceOf(UnsupportedOperationException.class);
		assertThatThrownBy(() -> pages.catalogue().translations().clear()).isInstanceOf(UnsupportedOperationException.class);
		assertThatThrownBy(() -> pages.catalogue().units().getFirst().translations().clear()).isInstanceOf(UnsupportedOperationException.class);
		assertThatThrownBy(() -> new LearningCatalogue(Map.of(), pages.catalogue().units()))
				.isInstanceOf(IllegalArgumentException.class).hasMessage("BTC_LEARNING_INVALID_CATALOGUE");
	}

	private static void assertInvalid(Map<String, String> resources) {
		assertThatThrownBy(() -> source(resources).load()).isInstanceOf(IllegalStateException.class)
				.hasMessage("BTC_LEARNING_CONTENT_INVALID").hasNoCause();
	}

	private static Map<String, String> fixture(String slugs) {
		var values = new HashMap<String, String>();
		values.put("catalogue.properties", "published-units=" + slugs);
		for (String locale : LearningCatalogue.LANGUAGES) {
			String metadata = "course.title=Course " + locale + "\ncourse.summary=Summary " + locale + "\n"
					+ "course.prerequisites=Prerequisites " + locale + "\ncourse.outcomes=Outcomes " + locale + "\n";
			for (String slug : slugs.split(",")) {
				metadata += "unit." + slug + ".title=Introducción " + slug + "\n";
				values.put(locale + "/" + slug + ".md", "## " + locale + "\nExercice " + slug + "\n");
			}
			values.put(locale + "/metadata.properties", metadata);
		}
		return values;
	}

	private static ClasspathCourseContentSource source(Map<String, String> resources) {
		return source(resources, new ArrayList<>());
	}

	private static ClasspathCourseContentSource source(Map<String, String> resources, List<String> accessed) {
		return new ClasspathCourseContentSource(new ClassLoader(null) {
			@Override public InputStream getResourceAsStream(String path) {
				accessed.add(path);
				String text = resources.get(path.substring("content/java-fundamentals/".length()));
				return text == null ? null : new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8));
			}
		});
	}
}

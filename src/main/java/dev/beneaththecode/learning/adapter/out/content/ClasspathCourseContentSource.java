package dev.beneaththecode.learning.adapter.out.content;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;

import dev.beneaththecode.learning.application.port.out.CourseContentSource;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import dev.beneaththecode.learning.domain.LearningCatalogue.CourseText;
import dev.beneaththecode.learning.domain.LearningCatalogue.Unit;
import dev.beneaththecode.learning.domain.LearningCatalogue.UnitText;

/** Loads only explicit catalogue identities; request strings never select resources. */
public final class ClasspathCourseContentSource implements CourseContentSource {
	private static final String ROOT = "content/java-fundamentals/";
	private final ClassLoader resources;

	public ClasspathCourseContentSource(ClassLoader resources) { this.resources = resources; }

	@Override
	public LearningCatalogue load() {
		try {
			String published = properties("catalogue.properties").getProperty("published-units");
			if (published == null) throw new IllegalArgumentException();
			if (published.isBlank()) return new LearningCatalogue(Map.of(), java.util.List.of());
			var slugs = published.split(",", -1);
			var unique = new HashSet<String>();
			for (String slug : slugs) {
				if (!LearningCatalogue.validSlug(slug.strip()) || !unique.add(slug.strip())) throw new IllegalArgumentException();
			}
			var metadata = new HashMap<String, Properties>();
			var courses = new HashMap<String, CourseText>();
			for (String language : LearningCatalogue.LANGUAGES) {
				Properties values = properties(language + "/metadata.properties");
				metadata.put(language, values);
				courses.put(language, new CourseText(values.getProperty("course.title"), values.getProperty("course.summary")));
			}
			var units = new ArrayList<Unit>();
			for (String candidate : slugs) {
				String slug = candidate.strip();
				var translations = new HashMap<String, UnitText>();
				for (String language : LearningCatalogue.LANGUAGES) {
					translations.put(language, new UnitText(metadata.get(language).getProperty("unit." + slug + ".title"),
							text(language + "/" + slug + ".md")));
				}
				units.add(new Unit(slug, translations));
			}
			return new LearningCatalogue(courses, units);
		}
		catch (IOException | IllegalArgumentException exception) {
			// No resource path, parser message, content or underlying cause escapes.
			throw new IllegalStateException("BTC_LEARNING_CONTENT_INVALID");
		}
	}

	private Properties properties(String path) throws IOException {
		var properties = new Properties();
		properties.load(new java.io.StringReader(text(path)));
		return properties;
	}

	private String text(String path) throws IOException {
		var stream = resources.getResourceAsStream(ROOT + path);
		if (stream == null) throw new IOException();
		try (var reader = new InputStreamReader(stream, StandardCharsets.UTF_8.newDecoder()
				.onMalformedInput(CodingErrorAction.REPORT).onUnmappableCharacter(CodingErrorAction.REPORT))) {
			var result = new StringBuilder();
			char[] buffer = new char[4096];
			int count;
			while ((count = reader.read(buffer)) != -1) result.append(buffer, 0, count);
			return result.toString();
		}
	}
}

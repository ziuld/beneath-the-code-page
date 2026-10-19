package dev.beneaththecode.learning.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Immutable publication snapshot; resource presence alone never publishes a unit. */
public record LearningCatalogue(Map<String, CourseText> translations, List<Unit> units) {

	public static final Set<String> LANGUAGES = Set.of("en", "es", "fr");

	public LearningCatalogue {
		translations = Map.copyOf(translations);
		units = List.copyOf(units);
		if (!units.isEmpty() && !translations.keySet().equals(LANGUAGES)) throw invalid();
		var slugs = new HashSet<String>();
		for (Unit unit : units) if (!slugs.add(unit.slug())) throw invalid();
	}

	public static boolean validSlug(String slug) {
		return slug != null && slug.matches("[a-z0-9]+(?:-[a-z0-9]+)*");
	}

	private static IllegalArgumentException invalid() {
		return new IllegalArgumentException("BTC_LEARNING_INVALID_CATALOGUE");
	}

	public record CourseText(String title, String summary, String prerequisites, String outcomes) {
		public CourseText {
			if (title == null || title.isBlank() || summary == null || summary.isBlank()
					|| prerequisites == null || prerequisites.isBlank() || outcomes == null || outcomes.isBlank()) throw invalid();
		}
	}

	public record Unit(String slug, Map<String, UnitText> translations) {
		public Unit {
			if (!validSlug(slug)) throw invalid();
			translations = Map.copyOf(translations);
			if (!translations.keySet().equals(LANGUAGES)) throw invalid();
		}
	}

	public record UnitText(String title, String markdown) {
		public UnitText {
			if (title == null || title.isBlank() || markdown == null || markdown.isBlank()) throw invalid();
		}
	}
}

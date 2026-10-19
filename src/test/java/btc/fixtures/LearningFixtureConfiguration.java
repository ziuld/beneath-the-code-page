package btc.fixtures;

import java.util.HashMap;
import java.util.List;

import dev.beneaththecode.learning.application.port.out.CourseContentSource;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

/** Synthetic publication for MVC tests only; not copied into the normal JAR. */
@TestConfiguration(proxyBeanMethods = false)
public class LearningFixtureConfiguration {
	@Bean @Primary CourseContentSource fixtureCourseContentSource() {
		return () -> {
			var courses = new HashMap<String, LearningCatalogue.CourseText>();
			var units = new HashMap<String, LearningCatalogue.UnitText>();
			for (String language : LearningCatalogue.LANGUAGES) {
				courses.put(language, new LearningCatalogue.CourseText("Course " + language, "Summary " + language));
				units.put(language, new LearningCatalogue.UnitText("Unit " + language,
						"## " + language + "\n\nExercise " + language + "\n\n<script>window.fixtureExecuted=true</script>\n\n${7 * 7}\n"));
			}
			return new LearningCatalogue(courses, List.of(new LearningCatalogue.Unit("fixture-unit", units)));
		};
	}
}

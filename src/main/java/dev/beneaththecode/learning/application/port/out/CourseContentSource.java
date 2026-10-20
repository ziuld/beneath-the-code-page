package dev.beneaththecode.learning.application.port.out;

import dev.beneaththecode.learning.domain.LearningCatalogue;

/** The actual external resource boundary; no framework types cross it. */
@FunctionalInterface
public interface CourseContentSource {
	LearningCatalogue load();
}

package dev.beneaththecode.bootstrap;

import java.util.HashSet;
import java.util.Set;

import dev.beneaththecode.learning.adapter.out.content.ClasspathCourseContentSource;
import dev.beneaththecode.learning.application.LearningPages;
import dev.beneaththecode.learning.application.port.out.CourseContentSource;
import dev.beneaththecode.learning.adapter.in.web.LessonHtmlRenderer;
import dev.beneaththecode.platform.web.i18n.PreferenceReturnPaths;
import dev.beneaththecode.site.adapter.in.web.HomeNavigation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class LearningConfiguration {
	@Bean CourseContentSource courseContentSource() {
		return new ClasspathCourseContentSource(LearningConfiguration.class.getClassLoader());
	}

	@Bean LearningPages learningPages(CourseContentSource source) { return new LearningPages(source); }
	@Bean LessonHtmlRenderer lessonHtmlRenderer() { return new LessonHtmlRenderer(); }

	@Bean HomeNavigation homeNavigation(LearningPages pages) {
		return new HomeNavigation(true, !pages.catalogue().units().isEmpty());
	}

	@Bean PreferenceReturnPaths preferenceReturnPaths(LearningPages pages) {
		var paths = new HashSet<>(Set.of("/", "/tools", "/tools/json-formatter", "/tools/json-validator", "/tools/json-minifier", "/tools/base64", "/tools/uuid"));
		if (!pages.catalogue().units().isEmpty()) {
			paths.add("/learn"); paths.add("/learn/java-fundamentals");
			pages.catalogue().units().forEach(unit -> paths.add("/learn/java-fundamentals/" + unit.slug()));
		}
		return new PreferenceReturnPaths(paths);
	}
}

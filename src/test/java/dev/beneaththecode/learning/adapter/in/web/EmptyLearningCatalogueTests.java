package dev.beneaththecode.learning.adapter.in.web;

import java.util.List;
import java.util.Map;

import dev.beneaththecode.learning.application.port.out.CourseContentSource;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Import(EmptyLearningCatalogueTests.EmptySource.class)
class EmptyLearningCatalogueTests {
	@Autowired MockMvc mvc;

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void emptyCatalogueStillReturnsLocalisedMissingPages(String language) throws Exception {
		for (String path : List.of("/learn", "/learn/java-fundamentals", "/learn/java-fundamentals/source-to-jvm")) {
			mvc.perform(get(path).queryParam("lang", language).accept("text/html"))
					.andExpect(status().isNotFound()).andExpect(header().string("Cache-Control", "no-store"))
					.andExpect(content().string(org.hamcrest.Matchers.containsString("lang=\"" + language + "\"")));
			mvc.perform(head(path)).andExpect(status().isNotFound());
		}
	}

	@TestConfiguration(proxyBeanMethods = false)
	static class EmptySource {
		@Bean @Primary CourseContentSource emptyCourseSource() {
			return () -> new LearningCatalogue(Map.of(), List.of());
		}
	}
}

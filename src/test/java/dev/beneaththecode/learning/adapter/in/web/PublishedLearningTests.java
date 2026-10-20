package dev.beneaththecode.learning.adapter.in.web;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;

import dev.beneaththecode.learning.application.LearningPages;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.MessageSource;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PublishedLearningTests {
	@Autowired MockMvc mvc;
	@Autowired LearningPages pages;
	@Autowired MessageSource messages;

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void realOverviewAndReasonedAnswerAreCompleteWithoutToolEnhancement(String language) throws Exception {
		var locale = Locale.forLanguageTag(language);
		var course = pages.catalogue().translations().get(language);
		var overview = mvc.perform(get("/learn/java-fundamentals").queryParam("lang", language))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(overview).contains(course.prerequisites(), course.outcomes(), messages.getMessage("learning.scope", null, locale),
				"href=\"/learn/java-fundamentals/source-to-jvm?lang=" + language + "\"")
				.doesNotContain("fixture-unit", "th:", "??");
		var response = mvc.perform(get("/learn/java-fundamentals/source-to-jvm").queryParam("lang", language))
				.andExpect(status().isOk()).andExpect(header().string("Cache-Control", "no-store")).andReturn().getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		String answer = Map.of("en", "Answer and reasoning", "es", "Respuesta y razonamiento", "fr", "Réponse et raisonnement").get(language);
		assertThat(html).contains("lang=\"" + language + "\"", "<h2>" + answer + "</h2>", "public class Main",
				"javac -d out Main.java", "java -cp out Main", "Hello, JVM!", "Hello, bytecode!")
				.doesNotContain("fixture-unit", "window.fixtureExecuted", "rel=\"prev\"", "data-editor-workspace", "data-json-");
		assertThat(html).contains("rel=\"next\"", "href=\"/learn/java-fundamentals/values-types-numeric-limits?lang=" + language + "\"");
		String numeric = mvc.perform(get("/learn/java-fundamentals/values-types-numeric-limits").queryParam("lang", language))
				.andExpect(status().isOk()).andExpect(header().string("Cache-Control", "no-store"))
				.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(numeric).contains("lang=\"" + language + "\"", "<h2>" + answer + "</h2>",
				"public class NumericValues", "public class NumericExercise", "-294967296", "4000000000",
				"rel=\"prev\"", "href=\"/learn/java-fundamentals/source-to-jvm?lang=" + language + "\"")
				.doesNotContain("data-editor-workspace", "data-json-", "??");
		assertThat(numeric).contains("rel=\"next\"", "href=\"/learn/java-fundamentals/control-flow-tracing?lang=" + language + "\"");
		String flow = mvc.perform(get("/learn/java-fundamentals/control-flow-tracing").queryParam("lang", language))
				.andExpect(status().isOk()).andExpect(header().string("Cache-Control", "no-store"))
				.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(flow).contains("lang=\"" + language + "\"", "<h2>" + answer + "</h2>",
				"public class ControlFlowTrace", "public class ControlFlowExercise", "rel=\"prev\"",
				"href=\"/learn/java-fundamentals/values-types-numeric-limits?lang=" + language + "\"")
				.doesNotContain("rel=\"next\"", "data-editor-workspace", "data-json-", "??");
		mvc.perform(head("/learn/java-fundamentals/control-flow-tracing")).andExpect(status().isOk());
		mvc.perform(head("/learn/java-fundamentals/values-types-numeric-limits")).andExpect(status().isOk());
		mvc.perform(head("/learn/java-fundamentals/source-to-jvm")).andExpect(status().isOk());
		String home = mvc.perform(get("/")).andReturn().getResponse().getContentAsString();
		assertThat(home).contains("href=\"/learn?lang=en\"");
	}
}

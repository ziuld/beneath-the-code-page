package dev.beneaththecode.learning.adapter.in.web;

import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import btc.fixtures.LearningFixtureConfiguration;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(LearningFixtureConfiguration.class)
class LearningRenderingTests {
	@Autowired MockMvc mvc;

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void publishedFixtureJourneysAreLocalisedSafeAndNative(String language) throws Exception {
		for (String path : new String[] { "/learn", "/learn/java-fundamentals", "/learn/java-fundamentals/fixture-unit" }) {
			var result = mvc.perform(get(path).queryParam("lang", language)).andExpect(status().isOk()).andReturn();
			var response = result.getResponse();
			String html = response.getContentAsString(StandardCharsets.UTF_8);
			assertThat(html).contains("lang=\"" + language + "\"", "Course " + language,
					"?lang=" + language, "name=\"returnTo\" value=\"" + path + "\"")
					.doesNotContain("??", "th:", "data-json-", "rel=\"prev\"", "rel=\"next\"");
			assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
			assertThat(response.getHeader("Content-Security-Policy")).contains("connect-src 'none'").doesNotContain("unsafe-inline");
			assertThat(result.getRequest().getSession(false)).isNull();
			if (path.equals("/learn/java-fundamentals")) {
				assertThat(html).contains("Prerequisites " + language + " &lt;script&gt;", "Outcomes " + language)
						.doesNotContain("<script>");
			}
			assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID") || cookie.getName().equals("BTC_LANGUAGE"));
			mvc.perform(head(path)).andExpect(status().isOk());
		}
		String unit = mvc.perform(get("/learn/java-fundamentals/fixture-unit").queryParam("lang", language))
				.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(unit).contains("Unit " + language, "<h2>" + language + "</h2>", "Exercise " + language,
				"&lt;script&gt;", "${7 * 7}").doesNotContain("<script>window.fixtureExecuted");
	}

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void unknownContentReturns404WithoutRequestDataInBodyOrLogs(String language) throws Exception {
		var logger = (Logger) LoggerFactory.getLogger("btc.http.events");
		var captured = new ListAppender<ILoggingEvent>(); captured.start(); logger.addAppender(captured);
		try {
			var response = mvc.perform(get("/learn/java-fundamentals/SYNTHETIC_PRIVATE_SENTINEL")
					.header("Accept-Language", language).accept("text/html"))
					.andExpect(status().isNotFound()).andReturn().getResponse();
			assertThat(response.getContentAsString(StandardCharsets.UTF_8)).contains("lang=\"" + language + "\"")
					.doesNotContain("SYNTHETIC_PRIVATE_SENTINEL", "Exception", "fixture-unit");
			assertThat(captured.list).isNotEmpty().allSatisfy(event -> assertThat(event.getFormattedMessage())
					.contains("route=learning-unit").doesNotContain("SYNTHETIC_PRIVATE_SENTINEL"));
		}
		finally { logger.detachAppender(captured); captured.stop(); }
	}

	@Test
	void exactPublishedPreferenceReturnIsAllowedButQueriesAndDraftsAreNot() throws Exception {
		String path = "/learn/java-fundamentals/fixture-unit";
		var form = mvc.perform(get(path)).andReturn().getResponse();
		var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"").matcher(form.getContentAsString());
		assertThat(token.find()).isTrue();
		for (String target : new String[] { path, path + "?lang=en", "/learn/java-fundamentals/draft", "//example.invalid" }) {
			var response = mvc.perform(post("/preferences/language").cookie(form.getCookie("XSRF-TOKEN"))
					.contentType("application/x-www-form-urlencoded")
					.content("language=es&_csrf=" + java.net.URLEncoder.encode(token.group(1), StandardCharsets.UTF_8)
							+ "&returnTo=" + java.net.URLEncoder.encode(target, StandardCharsets.UTF_8)))
					.andExpect(status().isSeeOther()).andReturn().getResponse();
			assertThat(response.getHeader("Location")).isEqualTo(target.equals(path) ? path : "/");
		}
		mvc.perform(post(path).cookie(form.getCookie("XSRF-TOKEN")).param("_csrf", token.group(1))).andExpect(status().isForbidden());
		for (String target : new String[] { "/learn/other-course", path + "/nested", "/tools/missing" }) {
			mvc.perform(get(target)).andExpect(status().isForbidden());
		}
	}
}

package dev.beneaththecode.platform.web.i18n;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LocaleRenderingTests {

	@Autowired MockMvc mvc;

	@Test
	void explicitGetOverridesCookieWithoutPersisting() throws Exception {
		var result = mvc.perform(get("/").queryParam("lang", "es")
				.cookie(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, "fr")).header("Accept-Language", "en"))
				.andExpect(status().isOk()).andReturn();
		assertThat(result.getResponse().getContentAsString()).contains("lang=\"es\"");
		assertThat(result.getResponse().getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME)
				|| cookie.getName().equals("JSESSIONID"));
		assertThat(result.getRequest().getSession(false)).isNull();
	}
	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void integratedLinksKeepTheReadingLanguageWithoutChangingPreference(String language) throws Exception {
		for (String path : List.of("/", "/tools", "/tools/json-formatter", "/tools/json-validator", "/tools/json-minifier", "/tools/base64", "/tools/uuid",
				"/learn", "/learn/java-fundamentals", "/learn/java-fundamentals/source-to-jvm")) {
			var response = mvc.perform(get(path).queryParam("lang", language)
					.cookie(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, language.equals("fr") ? "es" : "fr")))
					.andExpect(status().isOk()).andReturn().getResponse();
			String html = response.getContentAsString();
			assertThat(html).contains("lang=\"" + language + "\"", "href=\"/?lang=" + language + "\"",
					"href=\"/tools?lang=" + language + "\"", "href=\"/learn?lang=" + language + "\"",
					"name=\"returnTo\" value=\"" + path + "\"");
			var links = Pattern.compile("href=\"(/(?:tools|learn)[^\"]*)\"").matcher(html);
			while (links.find()) assertThat(links.group(1)).endsWith("?lang=" + language);
			assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME)
					|| cookie.getName().equals("JSESSIONID"));
		}
		var error = mvc.perform(get("/learn/java-fundamentals/missing").queryParam("lang", language).accept("text/html"))
				.andExpect(status().isNotFound()).andReturn().getResponse();
		assertThat(error.getContentAsString()).contains("href=\"/?lang=" + language + "\"");
	}
}

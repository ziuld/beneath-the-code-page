package dev.beneaththecode.platform.web.i18n;

import java.nio.charset.StandardCharsets;
import java.net.URLEncoder;
import java.util.regex.Pattern;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LanguagePreferenceTests {

	@Autowired MockMvc mvc;

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void realRenderedMaskedTokenPersistsSupportedPreference(String language) throws Exception {
		var form = form();
		var result = mvc.perform(post("/preferences/language").cookie(form.cookie())
				.contentType("application/x-www-form-urlencoded").content("_csrf=" + encoded(form.token())
						+ "&language=" + language + "&returnTo=%2F"))
				.andExpect(status().isSeeOther()).andReturn();
		var response = result.getResponse();
		assertThat(response.getHeader("Location")).isEqualTo("/");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(response.getHeaders("Set-Cookie")).anySatisfy(value -> assertThat(value)
				.contains("BTC_LANGUAGE=" + language, "HttpOnly", "Secure", "SameSite=Lax", "Path=/", "Max-Age=31536000")
				.doesNotContain("Domain=", "JSESSIONID"));
		assertThat(result.getRequest().getSession(false)).isNull();
		var subsequent = mvc.perform(get("/").cookie(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, language))
				.header("Accept-Language", "en")).andExpect(status().isOk()).andReturn().getResponse();
		assertThat(subsequent.getContentAsString()).contains("lang=\"" + language + "\"");
		assertThat(subsequent.getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME)
				|| cookie.getName().equals("JSESSIONID"));
	}

	@ParameterizedTest
	@ValueSource(strings = { "https://example.invalid/", "//example.invalid/", "/tools?lang=en", "/tools/json-formatter#main", "/learn", "/?lang=en",
		"/#main", "%2f%2fexample.invalid", "/%2e%2e", "javascript:alert(1)", "", "/" })
	void neverReflectsNonAllowlistedRedirects(String target) throws Exception {
		var form = form();
		var response = mvc.perform(post("/preferences/language").cookie(form.cookie())
				.contentType("application/x-www-form-urlencoded").content("_csrf=" + encoded(form.token())
						+ "&language=es&returnTo=" + encoded(target)))
				.andExpect(status().isSeeOther()).andReturn().getResponse();
		assertThat(response.getHeader("Location")).isEqualTo("/");
	}

	@ParameterizedTest
	@ValueSource(strings = { "missing", "empty", "unsupported", "repeated" })
	void invalidLanguageLeavesPreferenceUnchanged(String mode) throws Exception {
		var form = form();
		String body = "_csrf=" + encoded(form.token()) + switch (mode) {
			case "empty" -> "&language=";
			case "unsupported" -> "&language=SYNTHETIC_INVALID_LANGUAGE";
			case "repeated" -> "&language=es&language=fr";
			default -> "";
		};
		var request = post("/preferences/language").cookie(form.cookie(), new Cookie(PreferenceLocaleResolver.COOKIE_NAME, "fr"))
				.contentType("application/x-www-form-urlencoded").content(body);
		var response = mvc.perform(request).andExpect(status().isBadRequest()).andReturn().getResponse();
		assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME));
		assertThat(response.getContentAsString()).doesNotContain("SYNTHETIC_INVALID_LANGUAGE");
	}

	@ParameterizedTest
	@ValueSource(strings = { "missing-token", "missing-cookie", "mismatch", "raw" })
	void rejectsForgedChangeWithoutSessionOrRedirect(String mode) throws Exception {
		var form = form();
		var request = post("/preferences/language").contentType("application/x-www-form-urlencoded")
				.cookie(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, "fr"));
		if (!mode.equals("missing-cookie")) request.cookie(form.cookie());
		String body = "language=es";
		if (!mode.equals("missing-token")) body += "&_csrf=" + encoded(switch (mode) {
			case "mismatch" -> "SYNTHETIC_WRONG_TOKEN";
			case "raw" -> form.cookie().getValue();
			default -> form.token();
		});
		request.content(body);
		var result = mvc.perform(request).andExpect(status().isForbidden()).andReturn();
		assertThat(result.getResponse().getHeader("Location")).isNull();
		assertThat(result.getRequest().getSession(false)).isNull();
		assertThat(result.getResponse().getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME)
				|| cookie.getName().equals("JSESSIONID"));
		assertThat(result.getResponse().getContentAsString()).doesNotContain(form.token(), form.cookie().getValue(), "SYNTHETIC_WRONG_TOKEN");
	}

	@Test
	void csrfCookieIsHttpOnlySecureAndMaskedInForm() throws Exception {
		var form = form();
		assertThat(form.cookie().isHttpOnly()).isTrue();
		assertThat(form.cookie().getSecure()).isTrue();
		assertThat(form.cookie().getPath()).isEqualTo("/");
		assertThat(form.cookie().getDomain()).isNull();
		assertThat(form.cookie().getAttribute("SameSite")).isEqualTo("Lax");
		assertThat(form.token()).isNotEqualTo(form.cookie().getValue());
	}

	private Form form() throws Exception {

		var response = mvc.perform(get("/")).andExpect(status().isOk()).andReturn().getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		var matcher = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"").matcher(html);
		assertThat(matcher.find()).as("actual Thymeleaf masked form token").isTrue();
		Cookie cookie = response.getCookie("XSRF-TOKEN");
		assertThat(cookie).isNotNull();
		return new Form(cookie, matcher.group(1));
	}

	private record Form(Cookie cookie, String token) { }

	@Test
	void boundaryRejectionsPrecedeCsrfWithoutPreferenceMutation() throws Exception {
		for (int expected : new int[] { 400, 413, 415 }) {
			var result = mvc.perform(post("/preferences/language")
					.contentType(expected == 415 ? "application/json" : "application/x-www-form-urlencoded")
					.content(expected == 413 ? "x=" + "a".repeat(4095) : "x=%GG"))
					.andExpect(status().is(expected)).andReturn();
			assertThat(result.getResponse().getCookies()).isEmpty();
			assertThat(result.getResponse().getHeader("Cache-Control")).isEqualTo("no-store");
			assertThat(result.getRequest().getSession(false)).isNull();
		}
	}

	@Test
	void exactLimitAcceptsRealCsrfAndQueryBodyDuplicatesStayAmbiguous() throws Exception {
		var form = form();
		String body = "_csrf=" + encoded(form.token()) + "&language=es&padding=";
		body += "a".repeat(4096 - body.getBytes(StandardCharsets.UTF_8).length);
		mvc.perform(post("/preferences/language").cookie(form.cookie())
				.contentType("application/x-www-form-urlencoded").content(body))
				.andExpect(status().isSeeOther());
		var duplicate = mvc.perform(post("/preferences/language?language=fr").cookie(form.cookie())
				.contentType("application/x-www-form-urlencoded").content(body))
				.andExpect(status().isBadRequest()).andReturn().getResponse();
		assertThat(duplicate.getCookies()).noneMatch(cookie -> cookie.getName().equals(PreferenceLocaleResolver.COOKIE_NAME));
	}

	private static String encoded(String value) { return URLEncoder.encode(value, StandardCharsets.UTF_8); }
}

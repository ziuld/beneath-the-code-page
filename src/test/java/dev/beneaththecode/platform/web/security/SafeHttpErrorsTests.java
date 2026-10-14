package dev.beneaththecode.platform.web.security;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
@Import(SafeHttpErrorsTests.FailureFixture.class)
class SafeHttpErrorsTests {

	@Autowired MockMvc mvc;

	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr" })
	void earlyMvcAndInternalErrorsAreLocalisedAndNonDisclosing(String language) throws Exception {
		for (int status : new int[] { 400, 403, 404, 413, 415, 500 }) {
			var request = switch (status) {
				case 400 -> post("/preferences/language").contentType("application/x-www-form-urlencoded").content("x=%GG");
				case 413 -> post("/preferences/language").contentType("application/x-www-form-urlencoded").content("a".repeat(4097));
				case 415 -> post("/preferences/language").contentType("application/json").content("SYNTHETIC_PRIVATE_SENTINEL");
				case 404 -> get("/assets/missing-SYNTHETIC_PRIVATE_SENTINEL.css");
				case 500 -> get("/assets/__test-failure");
				default -> get("/SYNTHETIC_PRIVATE_SENTINEL");
			};
			var result = mvc.perform(request.accept("text/html").header("Accept-Language", language))
					.andReturn();
			var response = result.getResponse();
			assertThat(response.getStatus()).isEqualTo(status);
			assertThat(response.getContentAsString()).contains("lang=\"" + language + "\"", "<h1", "href=\"/\"")
					.doesNotContain("SYNTHETIC_PRIVATE_SENTINEL", "Exception", "_csrf", "<form", "${", "#{");
			assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
			assertThat(response.getHeader("Content-Security-Policy")).contains("default-src 'none'");
			assertThat(response.getCookies()).isEmpty();
			assertThat(result.getRequest().getSession(false)).isNull();
		}
	}

	@ParameterizedTest
	@ValueSource(strings = { "application/json", "text/plain" })
	void nonHtmlHasOnlySafeCodeAndStatus(String accept) throws Exception {
		var response = mvc.perform(get("/assets/__test-failure").accept(accept)).andReturn().getResponse();
		assertThat(response.getStatus()).isEqualTo(500);
		assertThat(response.getContentAsString()).isEqualTo("{\"status\":500,\"code\":\"BTC_HTTP_500\"}");
	}

	@TestConfiguration(proxyBeanMethods = false)
	static class FailureFixture {
		@Bean FailureController failureController() { return new FailureController(); }
	}

	@Controller
	static class FailureController {
		@GetMapping("/assets/__test-failure")
		void fail() { throw new IllegalStateException("SYNTHETIC_PRIVATE_SENTINEL"); }
	}
}

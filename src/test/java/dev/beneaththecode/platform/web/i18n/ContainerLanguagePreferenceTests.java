package dev.beneaththecode.platform.web.i18n;

import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("container")
class ContainerLanguagePreferenceTests {

	@Autowired MockMvc mvc;
	@Autowired dev.beneaththecode.platform.web.assets.AssetManifest assets;

	@Test
	void containerHttpFormRoundTripAndHttpsRetainsSecure() throws Exception {
		for (boolean secure : new boolean[] { false, true }) {
			var form = mvc.perform(get("/").secure(secure)).andExpect(status().isOk()).andReturn().getResponse();
			var csrfCookie = form.getCookie("XSRF-TOKEN");
			assertThat(csrfCookie).isNotNull();
			assertThat(csrfCookie.getSecure()).isEqualTo(secure);
			assertThat(csrfCookie.isHttpOnly()).isTrue();
			assertThat(csrfCookie.getAttribute("SameSite")).isEqualTo("Lax");
			assertThat(form.getHeader("Strict-Transport-Security")).isNull();
			var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"")
					.matcher(form.getContentAsString(StandardCharsets.UTF_8));
			assertThat(token.find()).isTrue();
			assertThat(token.group(1)).isNotEqualTo(csrfCookie.getValue());
			var result = mvc.perform(post("/preferences/language").secure(secure).cookie(csrfCookie)
					.contentType("application/x-www-form-urlencoded")
					.content("_csrf=" + java.net.URLEncoder.encode(token.group(1), StandardCharsets.UTF_8) + "&language=es"))
					.andExpect(status().isSeeOther()).andReturn();
			var response = result.getResponse();
			assertThat(response.getCookie(PreferenceLocaleResolver.COOKIE_NAME).getSecure()).isEqualTo(secure);
			assertThat(response.getCookie(PreferenceLocaleResolver.COOKIE_NAME).isHttpOnly()).isTrue();
			assertThat(result.getRequest().getSession(false)).isNull();
			assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID"));
		}
	}

	@Test
	void containerAssetsRemainPackagedAndImmutable() throws Exception {
		for (String path : new String[] { assets.site().script(), assets.site().stylesheets().getFirst() }) {
			var response = mvc.perform(get(path)).andExpect(status().isOk()).andReturn().getResponse();
			assertThat(response.getHeader("Cache-Control")).contains("immutable");
		}
	}
}

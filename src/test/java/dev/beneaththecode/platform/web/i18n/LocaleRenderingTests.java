package dev.beneaththecode.platform.web.i18n;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
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
}

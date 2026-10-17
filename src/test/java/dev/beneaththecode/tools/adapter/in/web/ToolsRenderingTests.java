package dev.beneaththecode.tools.adapter.in.web;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ToolsRenderingTests {

	@Autowired MockMvc mvc;

	@ParameterizedTest
	@CsvSource({ "en,JSON Formatter,Format JSON", "es,Formateador JSON,Formatear JSON", "fr,Formateur JSON,Formater le JSON" })
	void rendersEscapedLocalisedWorkspaceWithNoSubmittingToolForm(String language, String title, String action) throws Exception {
		var result = mvc.perform(get("/tools/json-formatter?lang=" + language)).andExpect(status().isOk()).andReturn();
		var response = result.getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains("lang=\"" + language + "\"", title, action, "data-format-run disabled", "role=\"region\" aria-labelledby=\"formatter-output-label\" tabindex=\"0\"", "<noscript>", "data-format-message=\"ready\"")
				.doesNotContain("??", "th:", "onclick");
		String workspace = html.substring(html.indexOf("<section data-json-formatter"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=\"", "<textarea");
		String nonce = html.split("data-nonce=\"")[1].split("\"")[0];
		assertThat(response.getHeader("Content-Security-Policy")).contains("'nonce-" + nonce + "'", "connect-src 'none'", "style-src-attr 'none'").doesNotContain("unsafe-inline", "unsafe-eval");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(result.getRequest().getSession(false)).isNull();
	}

	@ParameterizedTest
	@ValueSource(strings = { "/tools", "/tools/json-formatter" })
	void exactPagesSupportHeadAndSafePreferenceReturn(String path) throws Exception {
		mvc.perform(head(path)).andExpect(status().isOk());
		var form = mvc.perform(get(path)).andExpect(status().isOk()).andReturn().getResponse();
		var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"").matcher(form.getContentAsString());
		assertThat(token.find()).isTrue();
		String body = "language=es&_csrf=" + URLEncoder.encode(token.group(1), StandardCharsets.UTF_8);
		var response = mvc.perform(post("/preferences/language").cookie(form.getCookie("XSRF-TOKEN"))
				.contentType("application/x-www-form-urlencoded").content(body + "&returnTo=" + URLEncoder.encode(path, StandardCharsets.UTF_8)))
				.andExpect(status().isSeeOther()).andReturn().getResponse();
		assertThat(response.getHeader("Location")).isEqualTo(path);
		var repeated = mvc.perform(post("/preferences/language").cookie(form.getCookie("XSRF-TOKEN"))
				.contentType("application/x-www-form-urlencoded").content(body + "&returnTo=%2Ftools&returnTo=%2Ftools%2Fjson-formatter"))
				.andExpect(status().isSeeOther()).andReturn().getResponse();
		assertThat(repeated.getHeader("Location")).isEqualTo("/");
		mvc.perform(post(path)).andExpect(status().isForbidden());
	}

	@Test
	void indexListsOnlyFormatterAndHomePublishesToolsAfterAcceptance() throws Exception {
		String index = mvc.perform(get("/tools")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assertThat(index).contains("href=\"/tools/json-formatter\"").doesNotContain("/tools/json-validator", "/tools/base64");
		String home = mvc.perform(get("/")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assertThat(home).contains("href=\"/tools\"").doesNotContain("href=\"/learn\"");
	}
}

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
		String workspace = html.substring(workspaceStart(html, "formatter"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=\"", "<textarea");
		String nonce = html.split("data-nonce=\"")[1].split("\"")[0];
		assertThat(response.getHeader("Content-Security-Policy")).contains("'nonce-" + nonce + "'", "connect-src 'none'", "style-src-attr 'none'").doesNotContain("unsafe-inline", "unsafe-eval");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(result.getRequest().getSession(false)).isNull();
	}

	@ParameterizedTest
	@ValueSource(strings = { "/tools", "/tools/json-formatter", "/tools/json-validator", "/tools/json-minifier", "/tools/base64", "/tools/uuid" })
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

	@ParameterizedTest
	@CsvSource({ "en,Base64 Encoder/Decoder,Encode,Decode", "es,Codificador/Decodificador Base64,Codificar,Decodificar", "fr,Encodeur/Décodeur Base64,Encoder,Décoder" })
	void base64IsLocalisedInertAndSupportsOnlyTheNativePreferenceForm(String language, String title, String encode, String decode) throws Exception {
		var result = mvc.perform(get("/tools/base64").queryParam("lang", language)).andExpect(status().isOk()).andReturn();
		var response = result.getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains(title, encode, decode, "lang=\"" + language + "\"", "data-base64-run disabled", "data-base64-mode disabled", "data-base64-copy disabled", "<noscript>", "returnTo\" value=\"/tools/base64\"")
				.doesNotContain("??", "th:", "onclick");
		String workspace = html.substring(html.indexOf("<section class=\"tool-workspace\" data-base64"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=", "<textarea", "type=\"file\"");
		assertThat(response.getHeader("Content-Security-Policy")).contains("connect-src 'none'", "worker-src 'self'", "style-src-attr 'none'").doesNotContain("unsafe-inline", "unsafe-eval");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(result.getRequest().getSession(false)).isNull();
		assertBodyMethodsDenied("/tools/base64");
	}

	@ParameterizedTest
	@CsvSource({ "en,UUID Generator,Generate", "es,Generador de UUID,Generar", "fr,Générateur d’UUID,Générer" })
	void uuidIsLocalisedInertAndHasNoSubmittingToolForm(String language, String title, String action) throws Exception {
		var result = mvc.perform(get("/tools/uuid").queryParam("lang", language)).andExpect(status().isOk()).andReturn();
		String html = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains(title, action, "data-uuid-run disabled", "data-uuid-copy disabled", "min=\"1\" max=\"100\" step=\"1\"", "returnTo\" value=\"/tools/uuid\"")
				.doesNotContain("??", "th:", "onclick");
		String workspace = html.substring(html.indexOf("<section class=\"tool-workspace\" data-uuid"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=", "data-editor-workspace");
		assertBodyMethodsDenied("/tools/uuid");
	}

	private static int workspaceStart(String html, String kind) {
		var matcher = Pattern.compile("<section\\b[^>]*\\bdata-json-" + kind + "(?:=|\\s|>)[^>]*>").matcher(html);
		assertThat(matcher.find()).as("native tool workspace exists").isTrue();
		return matcher.start();
	}

	@Test
	void indexListsAcceptedJsonToolsAndHomePublishesToolsAfterAcceptance() throws Exception {
		String index = mvc.perform(get("/tools")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assertThat(index).contains("href=\"/tools/json-formatter?lang=en\"", "href=\"/tools/json-validator?lang=en\"", "href=\"/tools/json-minifier?lang=en\"")
				.contains("href=\"/learn?lang=en\"").contains("href=\"/tools/base64?lang=en\"").contains("href=\"/tools/uuid?lang=en\"");
		String home = mvc.perform(get("/")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assertThat(home).contains("href=\"/tools?lang=en\"").contains("href=\"/learn?lang=en\"");
	}

	@ParameterizedTest
	@CsvSource({ "en,JSON Validator,Validate JSON,Valid JSON.", "es,Validador JSON,Validar JSON,JSON válido.", "fr,Validateur JSON,Valider le JSON,JSON valide." })
	void validatorRendersLocalisedVerdictWithoutAnOutputDocument(String language, String title, String action, String valid) throws Exception {
		var result = mvc.perform(get("/tools/json-validator?lang=" + language)).andExpect(status().isOk()).andReturn();
		var response = result.getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains("lang=\"" + language + "\"", title, action, valid,
				"data-format-run disabled", "data-format-cancel disabled", "data-format-clear disabled", "<noscript>", "data-editor-feedback")
				.doesNotContain("??", "th:", "onclick");
		String workspace = html.substring(workspaceStart(html, "validator"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=\"", "<textarea", "<pre", "data-format-copy", "data-format-indent", "data-format-output=");
		assertThat(response.getHeader("Content-Security-Policy")).contains("'nonce-", "connect-src 'none'", "style-src-attr 'none'")
				.doesNotContain("unsafe-inline", "unsafe-eval");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(result.getRequest().getSession(false)).isNull();
		assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID"));
	}

	@Test
	void validatorBodyMethodsRemainDeniedWithValidCsrf() throws Exception {
		assertBodyMethodsDenied("/tools/json-validator");
	}

	@ParameterizedTest
	@CsvSource({ "en,JSON Minifier,Minify JSON", "es,Minificador JSON,Minificar JSON", "fr,Minificateur JSON,Minifier le JSON" })
	void minifierRendersLocalisedCopyWorkspaceWithoutIndentation(String language, String title, String action) throws Exception {
		var result = mvc.perform(get("/tools/json-minifier?lang=" + language)).andExpect(status().isOk()).andReturn();
		var response = result.getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains("lang=\"" + language + "\"", title, action, "data-format-copy disabled", "data-format-clear disabled",
				"role=\"region\" aria-labelledby=\"minifier-output-label\" tabindex=\"0\"", "<noscript>").doesNotContain("??", "th:", "onclick");
		String workspace = html.substring(workspaceStart(html, "minifier"), html.indexOf("</section>"));
		assertThat(workspace).doesNotContain("<form", "name=\"", "<textarea", "data-format-indent");
		assertThat(response.getHeader("Cache-Control")).isEqualTo("no-store");
		assertThat(response.getHeader("Content-Security-Policy")).contains("'nonce-", "connect-src 'none'", "style-src-attr 'none'")
				.doesNotContain("unsafe-inline", "unsafe-eval");
		assertThat(result.getRequest().getSession(false)).isNull();
		assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID"));
		assertBodyMethodsDenied("/tools/json-minifier");
	}

	private void assertBodyMethodsDenied(String path) throws Exception {
		var form = mvc.perform(get(path)).andExpect(status().isOk()).andReturn().getResponse();
		var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"").matcher(form.getContentAsString());
		assertThat(token.find()).isTrue();
		for (var method : new org.springframework.http.HttpMethod[] { org.springframework.http.HttpMethod.POST, org.springframework.http.HttpMethod.PUT,
				org.springframework.http.HttpMethod.PATCH, org.springframework.http.HttpMethod.DELETE, org.springframework.http.HttpMethod.OPTIONS }) {
			mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request(method, path)
					.cookie(form.getCookie("XSRF-TOKEN")).param("_csrf", token.group(1))).andExpect(status().isForbidden());
		}
	}
}

package dev.beneaththecode.site.adapter.in.web;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import btc.fixtures.EditorFixtureController;
import btc.fixtures.ShellFixtureSecurity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.StaticMessageSource;
import org.springframework.test.web.servlet.MockMvc;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import({ EditorFixtureController.class, ShellFixtureSecurity.class })
class EditorComponentTests {

	@Autowired MockMvc mvc;
	@Autowired SpringTemplateEngine templateEngine;

	@ParameterizedTest
	@CsvSource({ "en,Content editor,Find", "es,Editor de contenido,Buscar", "fr,Éditeur de contenu,Rechercher" })
	void rendersEscapedDictionaryInstructionsAndCurrentNonce(String locale, String label, String find) throws Exception {
		var response = mvc.perform(get("/__editor-fixture?lang=" + locale))
				.andExpect(status().isOk()).andReturn().getResponse();
		String html = response.getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains("lang=\"" + locale + "\"", "data-editor-message=\"label\">" + label,
				"data-editor-phrase=\"Find\">" + find, "aria-live=\"polite\"", "data-description-id=\"editor-instructions\"",
				"<noscript>", "class=\"button\" type=\"button\"")
				.doesNotContain("??", "th:", "onclick", "textarea", "<form action=\"/__editor-fixture");
		String nonce = html.split("data-nonce=\"")[1].split("\"")[0];
		assertThat(response.getHeader("Content-Security-Policy")).contains("'nonce-" + nonce + "'", "style-src-attr 'none'")
				.doesNotContain("unsafe-inline", "unsafe-eval");
	}

	@Test
	void escapesEditorMessagesAndNonceRatherThanInjectingMarkup() {
		var source = new StaticMessageSource();
		source.addMessage("editor.label", Locale.ENGLISH, "<img src=x onerror=alert(1)>");
		var engine = new SpringTemplateEngine();
		engine.setTemplateResolvers(templateEngine.getTemplateResolvers());
		engine.setTemplateEngineMessageSource(source);
		String html = engine.process("fragments/editor", Set.of("workspace"),
				new Context(Locale.ENGLISH, Map.of("cspNonce", "\" onmouseover=\"sentinel")));
		assertThat(html).contains("&lt;img src=x onerror=alert(1)&gt;", "data-nonce=\"&quot; onmouseover=&quot;sentinel\"")
				.doesNotContain("<img", " onmouseover=\"sentinel");
	}
}

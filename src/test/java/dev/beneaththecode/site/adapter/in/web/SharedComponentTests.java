package dev.beneaththecode.site.adapter.in.web;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import btc.fixtures.ShellFixtureController;
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

/** Render production fragments in test-only MVC wiring, without publishing fixture routes. */
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Import(ShellFixtureController.class)
class SharedComponentTests {

	@Autowired MockMvc mvc;
	@Autowired SpringTemplateEngine templateEngine;

	@ParameterizedTest
	@CsvSource({ "en,Continue", "es,Continuar", "fr,Continuer" })
	void rendersNativeButtonsAndCorrectCurrentRoute(String locale, String label) throws Exception {
		String html = mvc.perform(get("/__shell-fixture").header("Accept-Language", locale))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		assertThat(html).contains("lang=\"" + locale + "\"", "href=\"/tools\" aria-current=\"page\"",
				"class=\"button\" type=\"button\">" + label + "</button>",
				"type=\"button\" disabled=\"disabled\">" + label + "</button>")
				.doesNotContain("href=\"/\" aria-current", "href=\"/learn\"", "th:", "??", "onclick");
	}

	@Test
	void buttonFragmentEscapesMessageContentRatherThanRenderingMarkup() {
		var source = new StaticMessageSource();
		source.addMessage("test.label", Locale.ENGLISH, "<img src=x onerror=alert(1)> & \"quoted\"");
		var engine = new SpringTemplateEngine();
		engine.setTemplateResolvers(templateEngine.getTemplateResolvers());
		engine.setTemplateEngineMessageSource(source);
		var context = new Context(Locale.ENGLISH, Map.of("labelKey", "test.label", "disabled", false));
		String html = engine.process("fragments/components", Set.of("button"), context);
		assertThat(html).contains("&lt;img src=x onerror=alert(1)&gt; &amp; &quot;quoted&quot;")
				.doesNotContain("<img", "onclick=");
	}
}

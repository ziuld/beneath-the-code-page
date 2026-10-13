package dev.beneaththecode.site.adapter.in.web;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.regex.Pattern;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.MessageSource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** F03-UH01-R01/AC01: actual Thymeleaf output, with filters covered separately. */
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class HomeRenderingTests {

	@Autowired MockMvc mvc;
	@Autowired AssetManifest manifest;
	@Autowired MessageSource messages;
	@MockitoBean HomeNavigation navigation;

	@Test
	void rendersSemanticHomeAndManifestReferences() throws Exception {
		when(navigation.sections()).thenReturn(new HomeNavigation().sections());
		String html = home("en");
		assertThat(html).contains("<main", "<header", "<footer", "<nav", "Beneath the Code",
				"id=\"home-heading\"", "Tools", "Learn", "Java fundamentals", "locally in your browser",
				"src=\"/brand/b-composition.png\"", "type=\"module\"", manifest.site().script())
				.doesNotContain("th:", "onclick", "asset-manifest.json", "href=\"/tools\"", "href=\"/learn\"");
		assertThat(Pattern.compile("<h1\\b").matcher(html).results().count()).isEqualTo(1);
		for (String path : manifest.site().stylesheets()) {
			assertThat(html).contains("href=\"" + path + "\"");
			mvc.perform(get(path)).andExpect(status().isOk());
		}
		mvc.perform(get(manifest.site().script())).andExpect(status().isOk());
	}

	@ParameterizedTest
	@CsvSource({ "en,Tools,Learn", "es,Herramientas,Aprender", "fr,Outils,Apprendre", "de,Tools,Learn" })
	void rendersSupportedRequestLocalesWithEnglishFallback(String language, String tools, String learn) throws Exception {
		when(navigation.sections()).thenReturn(new HomeNavigation().sections());
		String html = home(language);
		String resolved = language.equals("de") ? "en" : language;
		assertThat(html).contains("lang=\"" + resolved + "\"", tools, learn)
				.doesNotContain("??", "home.tools", "navigation.label", "th:");
		assertThat(html).contains(messages.getMessage("home.heading", null, Locale.forLanguageTag(resolved)));
	}

	@ParameterizedTest
	@CsvSource({ "false,false", "true,false", "false,true", "true,true" })
	void onlyPublishedSectionsHaveActionableLinks(boolean tools, boolean learn) throws Exception {
		var descriptors = new HomeNavigation(tools, learn).sections();
		when(navigation.sections()).thenReturn(descriptors);
		String html = home("en");
		for (var section : descriptors) {
			assertThat(html.contains("href=\"" + section.path() + "\"")).isEqualTo(section.published());
		}
		assertThat(html).doesNotContain("href=\"#\"", "onclick", "aria-disabled", "<form");
		assertThat(Pattern.compile(">Not yet available<").matcher(html).results().count())
				.isEqualTo((tools ? 0 : 1) + (learn ? 0 : 1));
		assertThat(descriptors).hasSize(2);
		org.junit.jupiter.api.Assertions.assertThrows(UnsupportedOperationException.class, () -> descriptors.clear());
	}

	@Test
	void messageCataloguesHaveMatchingKeysAndPlaceholders() throws Exception {
		Properties english = catalogue("");
		for (String suffix : List.of("_es", "_fr")) {
			Properties translated = catalogue(suffix);
			assertCatalogueParity(english, translated);
		}
		assertThat(messages.getMessage("home.tools.title", null, Locale.GERMAN)).isEqualTo("Tools");
	}

	/** F03-UH02-R01/AC01: exact shared visible and accessibility labels, including fallback. */
	@ParameterizedTest
	@ValueSource(strings = { "en", "es", "fr", "de" })
	void rendersExactSharedLabelsFromResolvedResources(String requested) throws Exception {
		when(navigation.sections()).thenReturn(new HomeNavigation().sections());
		String html = home(requested);
		Locale locale = Locale.forLanguageTag(requested.equals("de") ? "en" : requested);
		for (String key : List.of("navigation.skip", "navigation.home", "brand.name", "footer.statement",
				"home.tools.title", "home.learn.title", "home.tools.description", "home.learn.description")) {
			assertThat(html).as(key).contains(">" + escapedMessage(key, locale) + "<");
		}
		assertThat(html).contains("lang=\"" + locale.getLanguage() + "\"",
				"aria-label=\"" + escapedMessage("navigation.label", locale) + "\"",
				"aria-label=\"" + escapedMessage("home.sections", locale) + "\"",
				"alt=\"" + escapedMessage("brand.logo.alt", locale) + "\"",
				"<title>" + escapedMessage("home.title", locale) + "</title>",
				"content=\"" + escapedMessage("home.description", locale) + "\"")
				.doesNotContain("??", "th:", "action.continue", "navigation.label", "brand.logo.alt");
	}

	@Test
	void catalogueGuardDetectsMissingBlankAndMismatchedPlaceholders() {
		var english = new Properties();
		english.setProperty("sample", "{0}: {1,number} / {0}");
		var translated = new Properties();
		translated.setProperty("sample", "{1,number}: {0} / {0}");
		assertCatalogueParity(english, translated);
		assertThatThrownBy(() -> assertCatalogueParity(english, new Properties())).isInstanceOf(AssertionError.class);
		translated.setProperty("sample", "{0}: {1,number}");
		assertThatThrownBy(() -> assertCatalogueParity(english, translated)).isInstanceOf(AssertionError.class);
		translated.setProperty("sample", "{0}: {1,date} / {0}");
		assertThatThrownBy(() -> assertCatalogueParity(english, translated)).isInstanceOf(AssertionError.class);
		translated.setProperty("sample", " ");
		assertThatThrownBy(() -> assertCatalogueParity(english, translated)).isInstanceOf(AssertionError.class);
	}

	private void assertCatalogueParity(Properties english, Properties translated) {
		assertThat(translated.stringPropertyNames()).isEqualTo(english.stringPropertyNames());
		for (String key : english.stringPropertyNames()) {
			assertThat(translated.getProperty(key)).as(key).isNotBlank();
			assertThat(placeholders(translated.getProperty(key))).as(key)
					.isEqualTo(placeholders(english.getProperty(key)));
		}
	}

	private String escapedMessage(String key, Locale locale) {
		return org.springframework.web.util.HtmlUtils.htmlEscape(messages.getMessage(key, null, locale), "UTF-8");
	}

	@Test
	void sharedFragmentsRetainLandmarksCurrentPageAndSemanticCards() throws Exception {
		when(navigation.sections()).thenReturn(new HomeNavigation(true, true).sections());
		String html = home("fr");
		assertThat(Pattern.compile("<header\\b").matcher(html).results().count()).isEqualTo(1);
		assertThat(Pattern.compile("<footer\\b").matcher(html).results().count()).isEqualTo(1);
		assertThat(Pattern.compile("<nav\\b").matcher(html).results().count()).isEqualTo(1);
		assertThat(Pattern.compile("aria-current=\"page\"").matcher(html).results().count()).isEqualTo(2);
		assertThat(html).contains("href=\"/\" aria-current=\"page\"", "Navigation principale",
				"aria-labelledby=\"tools-heading\"", "aria-labelledby=\"learn-heading\"",
				"id=\"tools-heading\"", "id=\"learn-heading\"", "Outils", "Apprendre")
				.doesNotContain("th:", "<button", "<form", "Not yet available");
		assertThat(Pattern.compile("<article\\b").matcher(html).results().count()).isEqualTo(2);
		assertThat(Pattern.compile("<a\\b[^>]*>[^<]*<a\\b").matcher(html).find()).isFalse();
	}

	private String home(String language) throws Exception {
		return mvc.perform(get("/").header("Accept-Language", language)).andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
	}

	private Properties catalogue(String suffix) throws Exception {
		var result = new Properties();
		try (var stream = getClass().getResourceAsStream("/i18n/messages" + suffix + ".properties")) {
			assertThat(stream).isNotNull();
			result.load(new java.io.InputStreamReader(stream, StandardCharsets.UTF_8));
		}
		return result;
	}

	private List<String> placeholders(String text) {
		return Pattern.compile("\\{\\d+(?:,[^}]+)?}").matcher(text).results().map(match -> match.group()).sorted().toList();
	}
}

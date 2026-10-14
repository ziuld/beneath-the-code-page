package dev.beneaththecode.platform.web.assets;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AssetManifestTests {

	private static final String SITE = "\"entries/site.ts\":{\"isEntry\":true,\"file\":\"static/assets/site-hash.js\"";

	@Test
	void resolvesDependencyStylesBeforeEntryAndDeduplicatesSharedImports() {
		var result = resolve("{" + SITE + ",\"imports\":[\"left\",\"right\"],\"css\":[\"static/assets/site-hash.css\"]},"
				+ "\"left\":{\"file\":\"static/assets/left-hash.js\",\"imports\":[\"shared\"]},"
				+ "\"right\":{\"file\":\"static/assets/right-hash.js\",\"imports\":[\"shared\"]},"
				+ "\"shared\":{\"file\":\"static/assets/shared-hash.js\",\"css\":[\"static/assets/shared-hash.css\"]}}");
		assertThat(result.script()).isEqualTo("/assets/site-hash.js");
		assertThat(result.stylesheets()).containsExactly("/assets/shared-hash.css", "/assets/site-hash.css");
		assertThat(result.modulePreloads()).containsExactly("/assets/shared-hash.js", "/assets/left-hash.js", "/assets/right-hash.js");
		assertThatThrownBy(() -> result.stylesheets().add("bad")).isInstanceOf(UnsupportedOperationException.class);
	}

	@Test
	void terminatesCyclesAndKeepsDynamicImportsLazy() {
		var result = resolve("{" + SITE + ",\"imports\":[\"shared\"],\"dynamicImports\":[\"lazy\"]},"
				+ "\"shared\":{\"file\":\"static/assets/shared-hash.js\",\"imports\":[\"entries/site.ts\"]},"
				+ "\"lazy\":{\"file\":\"static/assets/lazy-hash.js\",\"css\":[\"static/assets/lazy-hash.css\"]}}");
		assertThat(result.modulePreloads()).containsExactly("/assets/shared-hash.js");
		assertThat(result.stylesheets()).isEmpty();
	}

	@ParameterizedTest
	@ValueSource(strings = {"../sentinel.js", "static/assets/../sentinel.js", "https://sentinel/x.js", "/static/assets/a.js",
			"static/assets/a.js?sentinel", "static/assets/%2e%2e.js", "static/assets/a\\\\sentinel.js"})
	void rejectsUnsafePathsWithoutEchoingValues(String path) {
		var input = "{" + SITE.substring(0, SITE.indexOf("static/assets/site-hash.js")) + path + "\"}}";
		assertThatThrownBy(() -> resolve(input)).isInstanceOf(IllegalStateException.class)
				.hasMessage("BTC_ASSETS_PATH_INVALID").hasNoCause();
	}

	@ParameterizedTest
	@ValueSource(strings = {"{sentinel", "[]", "null", "{\"entries/site.ts\":null}"})
	void rejectsMalformedStructuresWithSafeDiagnostics(String json) {
		assertThatThrownBy(() -> resolve(json)).isInstanceOf(IllegalStateException.class)
				.hasMessageStartingWith("BTC_ASSETS_").hasNoCause();
	}

	@Test
	void rejectsMissingRequiredEntry() {
		assertThatThrownBy(() -> resolve("{\"sentinel\":{}}"))
				.hasMessage("BTC_ASSETS_REQUIRED_ENTRY_MISSING").hasNoCause();
	}

	@ParameterizedTest
	@ValueSource(strings = {
			"{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"static/assets/site-hash.css\"}}",
			"{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"static/assets/site-hash.js\",\"css\":[\"static/assets/site-hash.js\"]}}",
			"{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"static/assets/site-hash.js\",\"imports\":[\"shared\"]},\"shared\":{\"file\":\"static/assets/shared-hash.css\"}}"
	})
	void rejectsWrongAssetTypesForRenderedRoles(String json) {
		assertThatThrownBy(() -> resolve(json)).hasMessage("BTC_ASSETS_TYPE_INVALID").hasNoCause();
	}

	@Test
	void rejectsMissingReferencedEntry() {
		assertThatThrownBy(() -> resolve("{" + SITE + ",\"imports\":[\"sentinel\"]}}"))
				.hasMessage("BTC_ASSETS_REFERENCE_MISSING").hasNoCause();
	}

	@Test
	void rejectsMissingResources() {
		assertThatThrownBy(() -> AssetManifest.resolve(stream("{" + SITE + "}}"), path -> false))
				.hasMessage("BTC_ASSETS_RESOURCE_MISSING").hasNoCause();
	}

	@Test
	void referenceListsDefensivelyCopyTheirInput() {
		var styles = new java.util.ArrayList<>(List.of("/assets/a.css"));
		var references = new AssetManifest.AssetReferences("/assets/a.js", styles, List.of());
		styles.clear();
		assertThat(references.stylesheets()).containsExactly("/assets/a.css");
	}

	private static AssetManifest.AssetReferences resolve(String json) {
		return AssetManifest.resolve(stream(json), path -> true);
	}

	private static ByteArrayInputStream stream(String json) {
		return new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8));
	}
}

package dev.beneaththecode.platform.web.assets;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.mock.env.MockEnvironment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AssetSourceTests {

	@Test
	void defaultAndProductionUseClasspathOnly() {
		for (String profile : new String[] { "default", "prod" }) {
			var environment = new MockEnvironment();
			environment.setActiveProfiles(profile);
			var source = new AssetSource(environment);
			assertThat(source.local()).isFalse();
			assertThat(source.resource("asset-manifest.json")).isInstanceOf(org.springframework.core.io.ClassPathResource.class);
		}
	}

	@Test
	void localUsesGeneratedSourceAndCannotCombineWithProduction() {
		var environment = new MockEnvironment().withProperty("server.address", "127.0.0.1");
		environment.setActiveProfiles("local");
		var source = new AssetSource(environment);
		assertThat(source.local()).isTrue();
		assertThat(source.resource("asset-manifest.json")).isInstanceOf(org.springframework.core.io.FileSystemResource.class);
		assertThat(source.publicLocation()).endsWith("/target/frontend/static/assets/");
		environment.setActiveProfiles("local", "prod");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_LOCAL_PROFILE_INVALID").hasNoCause();
	}

	@Test
	void localCannotBindBeyondLoopback() {
		var environment = new MockEnvironment().withProperty("server.address", "0.0.0.0");
		environment.setActiveProfiles("local");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_LOCAL_PROFILE_INVALID");
	}

	@Test
	void defaultProfileCannotSneakInFilesystemDirectory() {
		assertThatThrownBy(() -> new AssetSource(new MockEnvironment().withProperty("btc.assets.directory", "SYNTHETIC_PATH")))
				.hasMessage("BTC_ASSETS_FILESYSTEM_FORBIDDEN").hasNoCause();
	}

	@ParameterizedTest
	@ValueSource(strings = { "file:/SYNTHETIC_PATH/", "/SYNTHETIC_PATH/", "https://example.invalid/", "classpath:/static/,file:/SYNTHETIC_PATH/" })
	void rejectsFilesystemAndExternalStandardResourceLocations(String location) {
		var environment = new MockEnvironment().withProperty("spring.web.resources.static-locations", location);
		environment.setActiveProfiles("prod");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_RESOURCE_LOCATION_FORBIDDEN").hasNoCause();
	}

	@Test
	void rejectsIndexedFilesystemLocations() {
		var environment = new MockEnvironment().withProperty("spring.web.resources.static-locations[0]", "file:/SYNTHETIC_PATH/");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_RESOURCE_LOCATION_FORBIDDEN").hasNoCause();
	}

	@Test
	void acceptsClasspathOverridesInScalarAndIndexedForms() {
		for (String key : new String[] { "spring.web.resources.static-locations", "spring.web.resources.static-locations[0]" }) {
			var environment = new MockEnvironment().withProperty(key, "classpath:/static/");
			environment.setActiveProfiles("prod");
			assertThat(new AssetSource(environment).local()).isFalse();
		}
	}

	@Test
	void malformedIndexedLocationsDoNotExposeBinderCauses() {
		var environment = new MockEnvironment().withProperty("spring.web.resources.static-locations[1]", "file:/SYNTHETIC_PATH/");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_RESOURCE_LOCATION_FORBIDDEN").hasNoCause();
	}
}

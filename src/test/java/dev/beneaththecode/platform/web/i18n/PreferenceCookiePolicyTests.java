package dev.beneaththecode.platform.web.i18n;

import org.junit.jupiter.api.Test;
import org.springframework.mock.env.MockEnvironment;
import org.springframework.mock.web.MockHttpServletRequest;
import dev.beneaththecode.platform.web.assets.AssetSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PreferenceCookiePolicyTests {

	@Test
	void containerHttpSupportsPreferencesButHttpsAndProductionKeepSecure() {
		var environment = new MockEnvironment().withProperty("server.address", "0.0.0.0");
		environment.setActiveProfiles("container");
		var policy = new PreferenceCookiePolicy(environment);
		var request = new MockHttpServletRequest();
		assertThat(policy.localHttpAllowed()).isTrue();
		assertThat(policy.secure(request)).isFalse();
		request.setSecure(true);
		assertThat(policy.secure(request)).isTrue();
		assertThat(new PreferenceCookiePolicy(new MockEnvironment()).secure(new MockHttpServletRequest())).isTrue();
		var assets = new AssetSource(environment);
		assertThat(assets.local()).isFalse();
		environment.setProperty("btc.assets.directory", "/tmp/untrusted");
		assertThatThrownBy(() -> new AssetSource(environment)).hasMessage("BTC_ASSETS_FILESYSTEM_FORBIDDEN");
	}

	@Test
	void containerProfileRejectsMixedProfilesOrChangedAddress() {
		var environment = new MockEnvironment().withProperty("server.address", "0.0.0.0");
		environment.setActiveProfiles("container", "production");
		assertThatThrownBy(() -> new PreferenceCookiePolicy(environment)).hasMessage("BTC_CONTAINER_PROFILE_INVALID");
		environment.setActiveProfiles("container");
		environment.setProperty("server.address", "127.0.0.1");
		assertThatThrownBy(() -> new PreferenceCookiePolicy(environment)).hasMessage("BTC_CONTAINER_PROFILE_INVALID");
	}
}

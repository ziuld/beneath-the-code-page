package dev.beneaththecode.platform.web.i18n;

import java.util.Arrays;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/** Only the single loopback-local profile permits cookies without Secure on HTTP. */
@Component
public final class PreferenceCookiePolicy {

	private final boolean local;

	public PreferenceCookiePolicy(Environment environment) {
		String[] profiles = environment.getActiveProfiles();
		local = profiles.length == 1 && Arrays.asList(profiles).contains("local")
				&& "127.0.0.1".equals(environment.getProperty("server.address"));
	}

	public boolean localHttpAllowed() {
		return local;
	}

	public boolean secure(HttpServletRequest request) {
		return !local || request.isSecure();
	}
}

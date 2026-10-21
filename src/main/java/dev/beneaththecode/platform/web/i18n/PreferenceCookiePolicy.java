package dev.beneaththecode.platform.web.i18n;

import java.util.Arrays;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/** Explicit local HTTP profiles only; container publication must remain host-loopback. */
@Component
public final class PreferenceCookiePolicy {

	private final boolean local;

	public PreferenceCookiePolicy(Environment environment) {
		String[] profiles = environment.getActiveProfiles();
		boolean container = Arrays.asList(profiles).contains("container");
		if (container && (profiles.length != 1 || !"0.0.0.0".equals(environment.getProperty("server.address")))) {
			throw new IllegalStateException("BTC_CONTAINER_PROFILE_INVALID");
		}
		local = container || profiles.length == 1 && Arrays.asList(profiles).contains("local")
				&& "127.0.0.1".equals(environment.getProperty("server.address"));
	}

	public boolean localHttpAllowed() {
		return local;
	}

	public boolean secure(HttpServletRequest request) {
		return !local || request.isSecure();
	}
}

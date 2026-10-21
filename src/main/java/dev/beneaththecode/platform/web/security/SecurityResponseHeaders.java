package dev.beneaththecode.platform.web.security;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;
import dev.beneaththecode.platform.web.i18n.PreferenceCookiePolicy;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Runs before security so early rejections and internal error dispatch retain the policy. */
public final class SecurityResponseHeaders extends GenericFilterBean {
	private static final Logger EVENTS = LoggerFactory.getLogger("btc.http.events");

	public static final String NONCE_ATTRIBUTE = "cspNonce";
	private final SecureRandom random = new SecureRandom();
	private final PreferenceCookiePolicy cookies;

	public SecurityResponseHeaders(PreferenceCookiePolicy cookies) {
		this.cookies = cookies;
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		var request = (HttpServletRequest) servletRequest;
		var response = (HttpServletResponse) servletResponse;
		applyPolicy(request, response);
		long started = System.nanoTime();
		boolean completed = false;
		try {
			chain.doFilter(request, response);
			completed = true;
		}
		finally {
			String route = switch (request.getRequestURI()) {
				case "/" -> "home";
				case "/tools" -> "tools-index";
				case "/tools/json-formatter" -> "json-formatter";
				case "/tools/json-validator" -> "json-validator";
				case "/tools/json-minifier" -> "json-minifier";
				case "/tools/base64" -> "base64";
				case "/tools/uuid" -> "uuid";
				case "/tools/jwt" -> "jwt";
				case "/learn" -> "learning-index";
				case "/learn/java-fundamentals" -> "learning-course";
				case "/preferences/language" -> "language-preference";
				case "/actuator/health" -> "health";
				default -> request.getRequestURI().matches("/learn/java-fundamentals/[^/]+") ? "learning-unit" : "unmatched";
			};
			EVENTS.info("BTC_HTTP_RESPONSE id={} route={} status={} elapsedMs={}", UUID.randomUUID(), route,
					completed ? response.getStatus() : 500, (System.nanoTime() - started) / 1_000_000);
		}
	}

	/** Also used for container rejections which cannot reach the servlet filters. */
	void applyPolicy(HttpServletRequest request, HttpServletResponse response) {
		if (request.getAttribute(NONCE_ATTRIBUTE) == null) {
			byte[] bytes = new byte[16];
			random.nextBytes(bytes);
			request.setAttribute(NONCE_ATTRIBUTE, Base64.getEncoder().encodeToString(bytes));
		}
		response.setHeader("Content-Security-Policy", policy((String) request.getAttribute(NONCE_ATTRIBUTE)));
		response.setHeader("X-Content-Type-Options", "nosniff");
		response.setHeader("X-Frame-Options", "DENY");
		response.setHeader("Referrer-Policy", "no-referrer");
		response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
		response.setHeader("Cache-Control", "no-store");
		if (!cookies.localHttpAllowed() && request.isSecure()) {
			response.setHeader("Strict-Transport-Security", "max-age=31536000");
		}
	}

	static String policy(String nonce) {
		return "default-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'nonce-" + nonce
				+ "'; style-src-attr 'none'; img-src 'self'; font-src 'self'; connect-src 'none'; worker-src 'self'; "
				+ "object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";
	}
}

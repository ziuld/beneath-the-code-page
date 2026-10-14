package dev.beneaththecode.platform.web.i18n;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Locale;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.LocaleResolver;

/** Resolves without servlet parameter access, response mutation or server-session state. */
public final class PreferenceLocaleResolver implements LocaleResolver {

	public static final String COOKIE_NAME = "BTC_LANGUAGE";
	private static final String RESOLVED = PreferenceLocaleResolver.class.getName() + ".resolved";
	private final Locale countryDefault;

	public PreferenceLocaleResolver(String country) {
		countryDefault = switch (country.toUpperCase(Locale.ROOT)) {
			case "ES" -> Locale.forLanguageTag("es");
			case "FR" -> Locale.FRENCH;
			default -> Locale.ENGLISH;
		};
	}

	@Override
	public Locale resolveLocale(HttpServletRequest request) {
		if (request.getAttribute(RESOLVED) instanceof Locale resolved) {
			return resolved;
		}
		Locale locale = supported(queryLanguage(request.getQueryString()));
		if (locale == null && request.getCookies() != null) {
			var values = Arrays.stream(request.getCookies()).filter(cookie -> COOKIE_NAME.equals(cookie.getName()))
					.map(cookie -> cookie.getValue()).toList();
			locale = values.size() == 1 ? supported(values.getFirst()) : null;
		}
		if (locale == null) {
			locale = headerLanguage(request.getHeader("Accept-Language"));
		}
		if (locale == null) {
			locale = countryDefault;
		}
		request.setAttribute(RESOLVED, locale);
		return locale;
	}

	public static Locale supported(String language) {
		return switch (language == null ? "" : language) {
			case "en" -> Locale.ENGLISH;
			case "es" -> Locale.forLanguageTag("es");
			case "fr" -> Locale.FRENCH;
			default -> null;
		};
	}

	private static String queryLanguage(String query) {
		if (query == null || query.length() > 16384) {
			return null;
		}
		String language = null;
		int count = 0;
		try {
			for (String pair : query.split("&")) {
				String[] parts = pair.split("=", 2);
				if ("lang".equals(URLDecoder.decode(parts[0], StandardCharsets.UTF_8))) {
					count++;
					language = parts.length == 2 ? URLDecoder.decode(parts[1], StandardCharsets.UTF_8) : "";
				}
			}
		}
		catch (IllegalArgumentException exception) {
			return null;
		}
		return count == 1 ? language : null;
	}

	private static Locale headerLanguage(String header) {
		if (header == null || header.length() > 16384) {
			return null;
		}
		try {
			// LanguageRange.parse preserves input order within equal weights.
			for (var range : Locale.LanguageRange.parse(header)) {
				if (range.getWeight() > 0) {
					Locale locale = supported(range.getRange().split("-", 2)[0]);
					if (locale != null) {
						return locale;
					}
				}
			}
		}
		catch (IllegalArgumentException exception) {
			// Invalid client preferences are ignored, never echoed or logged.
		}
		return null;
	}

	@Override
	public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
		throw new UnsupportedOperationException("BTC_LOCALE_READ_ONLY");
	}
}

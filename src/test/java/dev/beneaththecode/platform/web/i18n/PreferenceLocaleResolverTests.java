package dev.beneaththecode.platform.web.i18n;

import java.util.Locale;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PreferenceLocaleResolverTests {

	@ParameterizedTest
	@CsvSource(value = {
		"lang=fr|es|en|ES|fr", "lang=es|fr|en|FR|es", "lang=en|es|fr|FR|en",
		"lang=de|fr|es|ES|fr", "lang=|es|fr|FR|es", "lang=FR|es|fr|FR|es",
		"lang=fr&lang=en|es|fr|FR|es", "lang=%|es|fr|FR|es", "lang=%66%72|es|en|ES|fr",
		"other=fr|es|fr|FR|es", "lang=es|de|fr|FR|es", "|fr|es|ES|fr",
		"|de|fr-CA,es;q=0.5|ES|fr", "||es-MX,fr;q=0.5|FR|es",
		"||en-GB|FR|en", "||de;q=1,fr;q=0.8,es;q=0.9|FR|es",
		"||fr;q=0.8,es;q=0.8|ES|fr", "||es;q=0.8,fr;q=0.8|FR|es",
		"||fr;q=0,es;q=0.5|FR|es", "||fr;q=0|ES|es", "||*|FR|fr",
		"||de|ES|es", "||de|FR|fr", "||de|CA|en", "||||en",
		"||fr;q=invalid|ES|es", "||fr;q=2|FR|fr", "lang=fr&lang=fr|en|es|ES|en"
	}, delimiter = '|')
	void resolvesDeclaredPrecedence(String query, String cookie, String header, String country, String expected) {
		var request = new MockHttpServletRequest();
		request.setQueryString(query);
		if (cookie != null) request.setCookies(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, cookie));
		if (header != null) request.addHeader("Accept-Language", header);
		request.addHeader("X-Country", "FR");
		request.addHeader("CF-IPCountry", "ES");
		assertThat(new PreferenceLocaleResolver(country == null ? "" : country).resolveLocale(request).getLanguage())
				.isEqualTo(expected);
	}

	@Test
	void duplicateCookiesAreIgnoredAndResolutionIsRequestScoped() {
		var request = new MockHttpServletRequest();
		request.setCookies(new Cookie(PreferenceLocaleResolver.COOKIE_NAME, "fr"),
				new Cookie(PreferenceLocaleResolver.COOKIE_NAME, "fr"));
		request.addHeader("Accept-Language", "es");
		var resolver = new PreferenceLocaleResolver("");
		assertThat(resolver.resolveLocale(request).getLanguage()).isEqualTo("es");
		request.setQueryString("lang=en");
		assertThat(resolver.resolveLocale(request).getLanguage()).isEqualTo("es");
		assertThat(request.getSession(false)).isNull();
	}

	@Test
	void postResolutionDoesNotAccessServletParametersOrBody() {
		var request = new MockHttpServletRequest() {
			@Override public String getParameter(String name) { throw new AssertionError("Parameter parsing forbidden"); }
			@Override public jakarta.servlet.ServletInputStream getInputStream() { throw new AssertionError("Body read forbidden"); }
		};
		request.setMethod("POST");
		request.setQueryString("lang=fr");
		assertThat(new PreferenceLocaleResolver("ES").resolveLocale(request)).isEqualTo(Locale.FRENCH);
	}

	@Test
	void refusesResponseMutation() {
		var response = new MockHttpServletResponse();
		assertThatThrownBy(() -> new PreferenceLocaleResolver("").setLocale(new MockHttpServletRequest(), response, Locale.FRENCH))
				.isInstanceOf(UnsupportedOperationException.class).hasMessage("BTC_LOCALE_READ_ONLY");
		assertThat(response.getCookies()).isEmpty();
	}
}

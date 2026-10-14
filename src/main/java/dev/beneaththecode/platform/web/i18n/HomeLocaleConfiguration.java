package dev.beneaththecode.platform.web.i18n;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** One stateless locale policy for MVC and early error rendering. */
@Configuration(proxyBeanMethods = false)
public class HomeLocaleConfiguration {

	@Bean
	PreferenceLocaleResolver localeResolver(@Value("${btc.locale.country:}") String country) {
		return new PreferenceLocaleResolver(country);
	}
}

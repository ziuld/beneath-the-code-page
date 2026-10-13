package dev.beneaththecode.platform.web.i18n;

import java.util.List;
import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

/** Request-header localisation only; preference selection/persistence belongs to F04. */
@Configuration(proxyBeanMethods = false)
public class HomeLocaleConfiguration {

	@Bean
	LocaleResolver localeResolver() {
		var resolver = new AcceptHeaderLocaleResolver();
		resolver.setSupportedLocales(List.of(Locale.ENGLISH, Locale.forLanguageTag("es"), Locale.FRENCH));
		resolver.setDefaultLocale(Locale.ENGLISH);
		return resolver;
	}
}

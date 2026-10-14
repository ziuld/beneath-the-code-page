package dev.beneaththecode.platform.web.security;

import jakarta.servlet.DispatcherType;
import dev.beneaththecode.platform.web.i18n.PreferenceCookiePolicy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

/** Stateless, deny-by-default public routes and cookie-backed masked CSRF. */
@Configuration(proxyBeanMethods = false)
public class PublicPageSecurity {

	@Bean
	CookieCsrfTokenRepository csrfRepository(PreferenceCookiePolicy cookies) {
		var csrfRepository = new CookieCsrfTokenRepository();
		csrfRepository.setCookieCustomizer(cookie -> {
			cookie.httpOnly(true).path("/").sameSite("Lax");
			if (!cookies.localHttpAllowed()) cookie.secure(true);
		});
		return csrfRepository;
	}

	@Bean
	SecurityFilterChain publicPages(HttpSecurity http, CookieCsrfTokenRepository csrfRepository, SafeHttpErrors errors) throws Exception {
		return http.authorizeHttpRequests(authorize -> authorize
				.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
				.requestMatchers(HttpMethod.GET, "/", "/assets/**", "/brand/b-composition.png", "/actuator/health").permitAll()
				.requestMatchers(HttpMethod.HEAD, "/", "/assets/**", "/brand/b-composition.png", "/actuator/health").permitAll()
				.requestMatchers(HttpMethod.POST, "/preferences/language").permitAll()
				.anyRequest().denyAll())
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.logout(AbstractHttpConfigurer::disable)
				.requestCache(AbstractHttpConfigurer::disable)
				.headers(headers -> headers.httpStrictTransportSecurity(hsts -> hsts.disable()))
				.exceptionHandling(handling -> handling
						.authenticationEntryPoint((request, response, exception) -> errors.render(request, response, 403))
						.accessDeniedHandler((request, response, exception) -> errors.render(request, response, 403)))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.csrf(csrf -> csrf.csrfTokenRepository(csrfRepository)
						.csrfTokenRequestHandler(new XorCsrfTokenRequestAttributeHandler()))
				.build();
	}
}

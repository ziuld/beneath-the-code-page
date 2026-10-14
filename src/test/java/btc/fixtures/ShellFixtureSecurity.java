package btc.fixtures;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;
import org.springframework.security.config.http.SessionCreationPolicy;

/** Fixture-only exact GET boundary; all production security chains remain unchanged. */
@Configuration(proxyBeanMethods = false)
public class ShellFixtureSecurity {

	@Bean
	@Order(0)
	SecurityFilterChain shellFixtureFilterChain(HttpSecurity http, CookieCsrfTokenRepository csrfRepository) throws Exception {
		return http.securityMatcher("/__shell-fixture")
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(org.springframework.http.HttpMethod.GET, "/__shell-fixture").permitAll()
						.anyRequest().denyAll())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.csrf(csrf -> csrf.csrfTokenRepository(csrfRepository)
						.csrfTokenRequestHandler(new XorCsrfTokenRequestAttributeHandler())).build();
	}
}

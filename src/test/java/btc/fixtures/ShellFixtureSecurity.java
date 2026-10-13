package btc.fixtures;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/** Fixture-only exact GET boundary; all production security chains remain unchanged. */
@Configuration(proxyBeanMethods = false)
public class ShellFixtureSecurity {

	@Bean
	@Order(0)
	SecurityFilterChain shellFixtureFilterChain(HttpSecurity http) throws Exception {
		return http.securityMatcher("/__shell-fixture")
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(org.springframework.http.HttpMethod.GET, "/__shell-fixture").permitAll()
						.anyRequest().denyAll()).build();
	}
}

package btc.fixtures;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/** Copied only into the rendering fixture JAR, preserving its authenticated 404 checks. */
@Configuration(proxyBeanMethods = false)
public class AssetFixtureSecurity {

	@Bean
	@Order(0)
	SecurityFilterChain fixtureSecurity(HttpSecurity http) throws Exception {
		return http.securityMatcher("/__asset-fixture", "/asset-manifest.json")
				.authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
				.httpBasic(Customizer.withDefaults()).build();
	}
}

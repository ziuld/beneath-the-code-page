package dev.beneaththecode.platform.web.security;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/** Minimum public-page policy; F04 supplies preference and wider security acceptance. */
@Configuration(proxyBeanMethods = false)
public class PublicPageSecurity {

	@Bean
	SecurityFilterChain publicPages(HttpSecurity http) throws Exception {
		return http.authorizeHttpRequests(authorize -> authorize
				.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
				.requestMatchers(HttpMethod.GET, "/", "/assets/**", "/brand/b-composition.png", "/actuator/health").permitAll()
				.requestMatchers(HttpMethod.HEAD, "/", "/assets/**", "/brand/b-composition.png", "/actuator/health").permitAll()
				.anyRequest().denyAll())
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.logout(AbstractHttpConfigurer::disable)
				.requestCache(AbstractHttpConfigurer::disable)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.build();
	}
}

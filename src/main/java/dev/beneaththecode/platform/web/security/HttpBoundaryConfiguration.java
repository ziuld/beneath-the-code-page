package dev.beneaththecode.platform.web.security;

import dev.beneaththecode.platform.web.i18n.PreferenceCookiePolicy;
import jakarta.servlet.DispatcherType;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class HttpBoundaryConfiguration {

	@Bean
	FilterRegistrationBean<PreferenceRequestBoundary> preferenceRequestBoundary(SafeHttpErrors errors) {
		var registration = new FilterRegistrationBean<>(new PreferenceRequestBoundary(errors));
		registration.setOrder(-101);
		registration.setDispatcherTypes(DispatcherType.REQUEST);
		return registration;
	}

	@Bean
	FilterRegistrationBean<SecurityResponseHeaders> securityResponseHeaders(PreferenceCookiePolicy cookies) {
		var registration = new FilterRegistrationBean<>(new SecurityResponseHeaders(cookies));
		registration.setOrder(-102); // Before Boot's security chain (-100) and the preference boundary (-101).
		registration.setDispatcherTypes(DispatcherType.REQUEST, DispatcherType.ERROR);
		return registration;
	}
}

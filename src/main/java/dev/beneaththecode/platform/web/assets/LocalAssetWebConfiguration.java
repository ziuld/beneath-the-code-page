package dev.beneaththecode.platform.web.assets;

import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration(proxyBeanMethods = false)
public class LocalAssetWebConfiguration implements WebMvcConfigurer {

	@Bean
	static BeanFactoryPostProcessor verifyAssetConfigurationBeforeAutoBinding(Environment environment) {
		// Validate before Boot binds WebProperties, whose failure report can echo paths.
		return factory -> new AssetSource(environment);
	}

	private final AssetSource source;

	public LocalAssetWebConfiguration(AssetSource source) {
		this.source = source;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if (source.local()) {
			registry.addResourceHandler("/assets/**").addResourceLocations(source.publicLocation())
					.setCacheControl(CacheControl.noStore()).resourceChain(false);
		}
	}
}

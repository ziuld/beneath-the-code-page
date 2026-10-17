package dev.beneaththecode.platform.web.assets;

import java.util.concurrent.TimeUnit;

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
	private final AssetManifest manifest;

	public LocalAssetWebConfiguration(AssetSource source, AssetManifest manifest) {
		this.source = source;
		this.manifest = manifest;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if (source.local()) {
			registry.addResourceHandler("/assets/**").addResourceLocations(source.publicLocation())
					.setCacheControl(CacheControl.noStore()).resourceChain(false);
		}
		else {
			var paths = manifest.site().resources();
			registry.addResourceHandler(paths.toArray(String[]::new)).addResourceLocations("classpath:/static/")
					.setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic().immutable());
		}
	}
}

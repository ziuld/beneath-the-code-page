package dev.beneaththecode.platform.web.assets;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

/** One source for both manifest validation and local HTTP resource serving. */
@Component
public final class AssetSource {

	private final Path directory;

	public AssetSource(Environment environment) {
		String[] active = environment.getActiveProfiles();
		boolean local = Arrays.asList(active).contains("local");
		// Fail closed: adding another profile must never make a local override production-safe.
		if (local && (active.length != 1 || !"127.0.0.1".equals(environment.getProperty("server.address")))) {
			throw failure("LOCAL_PROFILE_INVALID");
		}
		String configured = environment.getProperty("btc.assets.directory");
		if (!local && configured != null) {
			throw failure("FILESYSTEM_FORBIDDEN");
		}
		for (String location : environment.getProperty("spring.web.resources.static-locations", "").split(",")) {
			if (!location.isBlank() && !location.strip().startsWith("classpath:/")) {
				throw failure("RESOURCE_LOCATION_FORBIDDEN");
			}
		}
		// Bind indexed lists too, so a YAML list cannot bypass the scalar check.
		try {
			List<String> locations = Binder.get(environment)
					.bind("spring.web.resources.static-locations", Bindable.listOf(String.class)).orElse(List.of());
			if (locations.stream().anyMatch(location -> !location.startsWith("classpath:/"))) {
				throw failure("RESOURCE_LOCATION_FORBIDDEN");
			}
		}
		catch (RuntimeException exception) {
			// Binder causes may echo raw configured paths; expose only the bounded code.
			throw failure("RESOURCE_LOCATION_FORBIDDEN");
		}
		try {
			directory = local ? Path.of(configured == null ? "target/frontend" : configured).toAbsolutePath().normalize() : null;
		}
		catch (RuntimeException exception) {
			throw failure("DIRECTORY_INVALID");
		}
	}

	public boolean local() {
		return directory != null;
	}

	public Resource resource(String relativePath) {
		return local() ? new FileSystemResource(directory.resolve(relativePath)) : new ClassPathResource(relativePath);
	}

	public String publicLocation() {
		String location = directory.resolve("static/assets").toUri().toString();
		return location.endsWith("/") ? location : location + "/";
	}

	private static IllegalStateException failure(String code) {
		return new IllegalStateException("BTC_ASSETS_" + code);
	}
}

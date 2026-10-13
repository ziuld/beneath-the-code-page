package dev.beneaththecode.platform.web.assets;

import java.io.InputStream;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

/** Immutable, startup-validated references for escaped server-rendered attributes. */
@Component
public final class AssetManifest {

	static final String SITE_ENTRY = "entries/site.ts";
	private final AssetReferences site;

	public AssetManifest() {
		this.site = loadManifest();
	}

	public AssetReferences site() {
		return site;
	}

	private static AssetReferences loadManifest() {
		var manifest = new ClassPathResource("asset-manifest.json");
		if (!manifest.exists()) {
			throw failure("MANIFEST_MISSING");
		}
		try (var input = manifest.getInputStream()) {
			return resolve(input, path -> new ClassPathResource(path).exists());
		}
		catch (IllegalStateException exception) {
			throw exception;
		}
		catch (Exception exception) {
			// Parser/resource causes can contain raw file content or paths; never expose them.
			throw failure("MANIFEST_INVALID");
		}
	}

	static AssetReferences resolve(InputStream input, Predicate<String> resourceExists) {
		JsonNode manifest;
		try {
			manifest = JsonMapper.builder().build().readTree(input);
		}
		catch (Exception exception) {
			throw failure("MANIFEST_INVALID");
		}
		if (manifest == null || !manifest.isObject()) {
			throw failure("MANIFEST_INVALID");
		}
		if (!manifest.has(SITE_ENTRY)) {
			throw failure("REQUIRED_ENTRY_MISSING");
		}
		var entry = manifest.get(SITE_ENTRY);
		if (!entry.path("isEntry").asBoolean(false)) {
			throw failure("ENTRY_INVALID");
		}
		// Validate lazy entries too, but do not preload their scripts or stylesheets.
		for (var node : manifest) {
			asset(node.path("file"), resourceExists);
			for (var css : list(node, "css")) {
				asset(css, resourceExists, ".css");
			}
			for (var field : List.of("imports", "dynamicImports")) {
				for (var imported : list(node, field)) {
					if (!imported.isString() || !manifest.has(imported.asString())) {
						throw failure("REFERENCE_MISSING");
					}
				}
			}
		}
		var styles = new LinkedHashSet<String>();
		var preloads = new LinkedHashSet<String>();
		var visited = new HashSet<String>();
		var pending = new ArrayDeque<Visit>();
		pending.push(new Visit(SITE_ENTRY, false));
		while (!pending.isEmpty()) {
			var visit = pending.pop();
			var node = manifest.get(visit.key());
			if (visit.expanded()) {
				for (var css : list(node, "css")) {
					styles.add(asset(css, resourceExists, ".css"));
				}
				if (!visit.key().equals(SITE_ENTRY)) {
					preloads.add(asset(node.path("file"), resourceExists, ".js"));
				}
			}
			else if (visited.add(visit.key())) {
				pending.push(new Visit(visit.key(), true));
				var imports = list(node, "imports");
				for (int i = imports.size() - 1; i >= 0; i--) {
					pending.push(new Visit(imports.get(i).asString(), false));
				}
			}
		}
		return new AssetReferences(asset(entry.path("file"), resourceExists, ".js"),
				List.copyOf(styles), List.copyOf(preloads));
	}

	private static List<JsonNode> list(JsonNode node, String field) {
		if (!node.has(field)) {
			return List.of();
		}
		if (!node.get(field).isArray()) {
			throw failure("MANIFEST_INVALID");
		}
		var values = new ArrayList<JsonNode>();
		node.get(field).forEach(values::add);
		return values;
	}

	private static String asset(JsonNode node, Predicate<String> resourceExists) {
		if (!node.isString() || !node.asString().matches("static/assets/[A-Za-z0-9_-]+\\.(js|css|woff2?|png|svg|webp|ico)")) {
			throw failure("PATH_INVALID");
		}
		if (!resourceExists.test(node.asString())) {
			throw failure("RESOURCE_MISSING");
		}
		return "/" + node.asString().substring("static/".length());
	}

	private static String asset(JsonNode node, Predicate<String> resourceExists, String extension) {
		String url = asset(node, resourceExists);
		if (!url.endsWith(extension)) {
			throw failure("TYPE_INVALID");
		}
		return url;
	}

	private static IllegalStateException failure(String code) {
		return new IllegalStateException("BTC_ASSETS_" + code);
	}

	private record Visit(String key, boolean expanded) {
	}

	public record AssetReferences(String script, List<String> stylesheets, List<String> modulePreloads) {
		public AssetReferences {
			stylesheets = List.copyOf(stylesheets);
			modulePreloads = List.copyOf(modulePreloads);
		}
	}
}

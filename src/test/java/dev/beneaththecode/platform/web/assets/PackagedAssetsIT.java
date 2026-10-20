package dev.beneaththecode.platform.web.assets;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;
import java.util.zip.CRC32;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import tools.jackson.databind.json.JsonMapper;

import static org.assertj.core.api.Assertions.assertThat;

/** F02-UH01-AC01/AC02: real packaged processes, resource bytes and startup logs. */
class PackagedAssetsIT {

	private static final Path JAR = Path.of(System.getProperty("asset.test.jar"));
	private static final Path CLASSES = Path.of(System.getProperty("asset.test.classes"));
	private static final Path OUTPUT = Path.of(System.getProperty("asset.test.output"));
	private static final String MANIFEST = "BOOT-INF/classes/asset-manifest.json";
	private static final String SENTINEL = "SYNTHETIC_BTC_MANIFEST_SENTINEL";

	@Test
	void distributableContainsExactlyTheBuiltAssetsAndNoFixturesOrTooling() throws Exception {
		var references = builtAssets();
		assertThat(references).hasSize(2);
		try (var archive = new ZipFile(JAR.toFile())) {
			var names = archive.stream().map(ZipEntry::getName).toList();
			assertThat(names).contains(MANIFEST);
			assertThat(names).noneMatch(name -> name.contains("node_modules") || name.contains("btc/fixtures")
					|| name.endsWith(".ts") || name.contains("asset-fixture")
					|| name.contains("proof-worker") || name.contains("worker-proof")
					|| name.startsWith("BOOT-INF/classes/static/") && name.endsWith("asset-manifest.json"));
			for (var asset : references.entrySet()) {
				var generated = Path.of("target/frontend/static" + asset.getKey());
				assertThat(asset.getValue()).isEqualTo(Files.readAllBytes(generated));
				assertThat(asset.getKey()).matches("/assets/site-[A-Za-z0-9_-]+\\.(js|css)");
			}
		}
	}

	@Test
	void packagedFixtureRendersAndServesTheMatchingScriptAndStylesheet() throws Exception {
		byte[] before = digest(JAR);
		var fixture = renderingFixture();
		try (var running = new RunningJar(fixture)) {
			running.awaitReady();
			var response = running.get("/__asset-fixture");
			assertThat(response.statusCode()).isEqualTo(200);
			var html = new String(response.body(), StandardCharsets.UTF_8);
			assertThat(html).contains("type=\"module\"", "rel=\"stylesheet\"").doesNotContain("th:", "asset-manifest.json");
			var matcher = Pattern.compile("(?:src|href)=\"(/assets/[^\"]+)\"").matcher(html);
			var rendered = new java.util.LinkedHashSet<String>();
			while (matcher.find()) {
				rendered.add(matcher.group(1));
			}
			assertThat(rendered).containsExactlyInAnyOrderElementsOf(builtAssets().keySet());
			assertHttpAssets(running);
		}
		assertThat(digest(JAR)).isEqualTo(before);
		Files.delete(fixture);
	}

	private static Path renderingFixture() throws Exception {
		var extras = new LinkedHashMap<String, byte[]>();
		for (var type : new String[] { "AssetFixtureApplication", "AssetFixtureController", "AssetFixtureSecurity" }) {
			var name = "btc/fixtures/" + type + ".class";
			extras.put("BOOT-INF/classes/" + name, Files.readAllBytes(CLASSES.resolve(name)));
		}
		extras.put("BOOT-INF/classes/templates/asset-fixture.html", Files.readAllBytes(CLASSES.resolve("asset-fixture/page.html")));
		String executableManifest;
		try (var archive = new ZipFile(JAR.toFile())) {
			executableManifest = new String(bytes(archive, "META-INF/MANIFEST.MF"), StandardCharsets.UTF_8)
					.replace("Start-Class: dev.beneaththecode.BeneathTheCodeApplication", "Start-Class: btc.fixtures.AssetFixtureApplication");
		}
		extras.put("META-INF/MANIFEST.MF", executableManifest.getBytes(StandardCharsets.UTF_8));
		return fixture("render", extras, false);
	}

	@Test
	void packagedErrorsAreSafeAndFailureFixtureNeverChangesOriginalJar() throws Exception {
		byte[] before = digest(JAR);
		var extras = new LinkedHashMap<String, byte[]>();
		for (String type : new String[] { "HttpFailureApplication", "HttpFailureController" }) {
			String name = "btc/fixtures/" + type + ".class";
			extras.put("BOOT-INF/classes/" + name, Files.readAllBytes(CLASSES.resolve(name)));
		}
		try (var archive = new ZipFile(JAR.toFile())) {
			extras.put("META-INF/MANIFEST.MF", new String(bytes(archive, "META-INF/MANIFEST.MF"), StandardCharsets.UTF_8)
					.replace("Start-Class: dev.beneaththecode.BeneathTheCodeApplication", "Start-Class: btc.fixtures.HttpFailureApplication")
					.getBytes(StandardCharsets.UTF_8));
			assertThat(archive.stream().map(ZipEntry::getName).toList()).noneMatch(name -> name.contains("btc/fixtures"));
		}
		Path isolated = fixture("http-failure", extras, false);
		try (var running = new RunningJar(isolated)) {
			running.awaitReady();
			for (String language : new String[] { "en", "es", "fr" }) {
				var response = running.client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + running.port
						+ "/assets/__http-failure?lang=" + language)).header("Accept", "text/html").GET().build(),
						HttpResponse.BodyHandlers.ofString());
				assertThat(response.statusCode()).isEqualTo(500);
				assertThat(response.body()).contains("lang=\"" + language + "\"", "<h1", "href=\"/?lang=" + language + "\"")
						.doesNotContain("SYNTHETIC_HTTP_PRIVATE_SENTINEL", "Exception", "<form", "_csrf");
				assertThat(response.headers().firstValue("cache-control")).hasValue("no-store");
				assertThat(response.headers().firstValue("content-security-policy")).isPresent();
			}
			assertThat(Files.readString(running.log)).doesNotContain("SYNTHETIC_HTTP_PRIVATE_SENTINEL", "IllegalStateException");
		}
		finally { Files.deleteIfExists(isolated); }
		assertThat(digest(JAR)).isEqualTo(before);
		try (var running = new RunningJar(JAR)) {
			running.awaitReady();
			assertThat(running.get("/assets/__http-failure").statusCode()).isEqualTo(404);
		}
	}

	@Test
	void packagedPreferenceBoundaryRejectsStreamsWithoutPrivateResponseOrLogData() throws Exception {
		String sentinel = "SYNTHETIC_HTTP_PRIVATE_SENTINEL";
		try (var running = new RunningJar(JAR, "--spring.profiles.active=local")) {
			running.awaitReady();
			for (boolean chunked : new boolean[] { false, true }) {
				String body = "x=" + sentinel + "a".repeat(5000) + sentinel;
				var publisher = chunked ? HttpRequest.BodyPublishers.ofInputStream(() ->
						new java.io.ByteArrayInputStream(body.getBytes(StandardCharsets.UTF_8))) : HttpRequest.BodyPublishers.ofString(body);
				var response = running.client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + running.port
						+ "/preferences/language?private=" + sentinel)).timeout(Duration.ofSeconds(5))
						.header("Content-Type", "application/x-www-form-urlencoded").POST(publisher).build(), HttpResponse.BodyHandlers.ofString());
				assertThat(response.statusCode()).isEqualTo(413);
				assertThat(response.body()).doesNotContain(sentinel);
				assertThat(response.headers().allValues("set-cookie")).isEmpty();
			}
			var home = running.get("/");
			var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"").matcher(new String(home.body(), StandardCharsets.UTF_8));
			assertThat(token.find()).isTrue();
			String cookie = home.headers().allValues("set-cookie").stream().filter(value -> value.startsWith("XSRF-TOKEN="))
					.findFirst().orElseThrow().split(";", 2)[0];
			String body = "language=es&_csrf=" + java.net.URLEncoder.encode(token.group(1), StandardCharsets.UTF_8) + "&padding=";
			body += "a".repeat(4096 - body.getBytes(StandardCharsets.UTF_8).length);
			var success = running.client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + running.port + "/preferences/language"))
					.header("Content-Type", "application/x-www-form-urlencoded").header("Cookie", cookie)
					.POST(HttpRequest.BodyPublishers.ofString(body)).build(), HttpResponse.BodyHandlers.ofString());
			assertThat(success.statusCode()).isEqualTo(303);
			assertThat(success.headers().allValues("set-cookie")).anyMatch(value -> value.startsWith("BTC_LANGUAGE=es;"));
			var unsupported = running.client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + running.port + "/preferences/language"))
					.header("Content-Type", "application/json").POST(HttpRequest.BodyPublishers.ofString(sentinel)).build(), HttpResponse.BodyHandlers.ofString());
			assertThat(unsupported.statusCode()).isEqualTo(415);
			assertThat(unsupported.body()).doesNotContain(sentinel);
			assertThat(unsupported.headers().allValues("set-cookie")).isEmpty();
			// No terminal chunk: a response proves rejection without draining the entire stream.
			String chunk = "x=" + "a".repeat(4095);
			String partial = "POST /preferences/language HTTP/1.1\r\nHost: localhost\r\nContent-Type: application/x-www-form-urlencoded\r\n"
					+ "Transfer-Encoding: chunked\r\n\r\n" + Integer.toHexString(chunk.length()) + "\r\n" + chunk + "\r\n";
			assertThat(rawStatus(running.port, partial)).startsWith("HTTP/1.1 413");
			String headers = "GET / HTTP/1.1\r\nHost: localhost\r\nX-Private: " + sentinel + "a".repeat(17000) + "\r\n\r\n";
			assertThat(rawStatus(running.port, headers)).startsWith("HTTP/1.1 400");
			assertThat(Files.readString(running.log)).doesNotContain(sentinel, token.group(1), cookie);
		}
	}

	private static String rawStatus(int port, String request) throws IOException {
		try (var socket = new java.net.Socket("127.0.0.1", port)) {
			socket.setSoTimeout(5000);
			socket.getOutputStream().write(request.getBytes(StandardCharsets.UTF_8));
			socket.getOutputStream().flush();
			return new java.io.BufferedReader(new java.io.InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8)).readLine();
		}
	}

	/** F02-UH02-AC01: a real watcher, one running server, and successive page loads. */
	@Test
	void localPageServesTwoSuccessiveWatcherRebuildsWithoutRestart() throws Exception {
		Files.createDirectories(OUTPUT);
		var workspace = Files.createTempDirectory(OUTPUT, "watch-").toAbsolutePath();
		var entries = Files.createDirectories(workspace.resolve("entries"));
		var output = workspace.resolve("built");
		writeWatchInputs(entries, "FIRST");
		var mapper = JsonMapper.builder().build();
		var config = workspace.resolve("vite.config.mjs");
		Files.writeString(config, "import config from " + mapper.writeValueAsString(Path.of("src/main/frontend/vite.config.ts").toAbsolutePath().toUri().toString())
				+ "; export default {...config, root: " + mapper.writeValueAsString(workspace.toString())
				+ ", build: {...config.build, outDir: " + mapper.writeValueAsString(output.toString())
				+ ", rollupOptions: {input: {site: " + mapper.writeValueAsString(entries.resolve("site.ts").toString()) + "}}}};");
		var watcher = new ProcessBuilder(Path.of("target/frontend-tooling/node/node").toAbsolutePath().toString(),
				Path.of("src/main/frontend/node_modules/vite/bin/vite.js").toAbsolutePath().toString(),
				"build", "--watch", "--config", config.toString()).redirectErrorStream(true)
				.redirectOutput(workspace.resolve("watch.log").toFile()).start();
		Path fixture = null;
		byte[] before = digest(JAR);
		try {
			var first = awaitWatchAssets(output, watcher, "FIRST");
			fixture = renderingFixture();
			try (var running = new RunningJar(fixture, "--spring.profiles.active=local", "--btc.assets.directory=" + output)) {
				running.awaitReady();
				assertLocalPage(running, output, first, "FIRST");
				for (String version : new String[] { "SECOND", "THIRD" }) {
					writeWatchInputs(entries, version);
					var rebuilt = awaitWatchAssets(output, watcher, version);
					assertThat(rebuilt.script()).isNotEqualTo(first.script());
					assertThat(rebuilt.stylesheets()).isNotEqualTo(first.stylesheets());
					assertLocalPage(running, output, rebuilt, version);
					first = rebuilt;
				}
				assertThat(running.get("/asset-manifest.json").statusCode()).isEqualTo(404);
				assertThat(running.get("/assets/asset-manifest.json").statusCode()).isEqualTo(404);
			}
		}
		finally {
			watcher.destroy();
			if (!watcher.waitFor(5, TimeUnit.SECONDS)) {
				watcher.destroyForcibly();
				assertThat(watcher.waitFor(5, TimeUnit.SECONDS)).isTrue();
			}
			if (fixture != null) {
				Files.deleteIfExists(fixture);
			}
		}
		assertThat(digest(JAR)).isEqualTo(before);
	}

	private static void writeWatchInputs(Path entries, String version) throws IOException {
		Files.writeString(entries.resolve("site.ts"), "import './site.css'; document.body.dataset.assetFixture = '" + version + "_JS';");
		Files.writeString(entries.resolve("site.css"), "body { --asset-fixture: " + version + "_CSS; }");
	}

	private static AssetManifest.AssetReferences awaitWatchAssets(Path output, Process watcher, String version) throws Exception {
		long deadline = System.nanoTime() + Duration.ofSeconds(30).toNanos();
		while (System.nanoTime() < deadline) {
			assertThat(watcher.isAlive()).as("Vite watcher remains alive").isTrue();
			try (var input = Files.newInputStream(output.resolve("asset-manifest.json"))) {
				var references = AssetManifest.resolve(input, path -> Files.isRegularFile(output.resolve(path)));
				if (Files.readString(output.resolve("static" + references.script())).contains(version + "_JS")
						&& Files.readString(output.resolve("static" + references.stylesheets().getFirst())).contains(version + "_CSS")) {
					return references;
				}
			}
			catch (IOException | IllegalStateException exception) {
				// Watch output may be between writes; wait for the completed expected build.
			}
			Thread.sleep(100);
		}
		throw new AssertionError("Watcher did not emit expected assets; inspect " + output.getParent().resolve("watch.log"));
	}

	private static void assertLocalPage(RunningJar running, Path output, AssetManifest.AssetReferences references, String version) throws Exception {
		var page = running.get("/__asset-fixture");
		assertThat(page.statusCode()).isEqualTo(200);
		assertThat(new String(page.body(), StandardCharsets.UTF_8)).contains(references.script(), references.stylesheets().getFirst());
		for (String url : new String[] { references.script(), references.stylesheets().getFirst() }) {
			var response = running.get(url);
			assertThat(response.statusCode()).isEqualTo(200);
			assertThat(response.body()).isEqualTo(Files.readAllBytes(output.resolve("static" + url)));
			assertThat(new String(response.body(), StandardCharsets.UTF_8)).contains(version);
			assertThat(response.headers().firstValue("cache-control")).hasValueSatisfying(value -> assertThat(value).contains("no-store"));
			assertThat(response.headers().firstValue("content-type")).hasValueSatisfying(value ->
					assertThat(value).contains(url.endsWith(".css") ? "text/css" : "javascript"));
		}
	}

	/** F02-UH02-AC02: reject actual executable startup configuration, not just properties in isolation. */
	@ParameterizedTest
	@ValueSource(strings = { "directory", "static-location", "indexed-location", "malformed-index", "mixed-profile" })
	void productionRejectsDeveloperFilesystemAssetsBeforeReadiness(String configuration) throws Exception {
		String[] arguments = switch (configuration) {
			case "directory" -> new String[] { "--spring.profiles.active=prod", "--btc.assets.directory=" + SENTINEL };
			case "static-location" -> new String[] { "--spring.profiles.active=prod", "--spring.web.resources.static-locations=file:/" + SENTINEL + "/" };
			case "indexed-location" -> new String[] { "--spring.profiles.active=prod", "--spring.web.resources.static-locations[0]=file:/" + SENTINEL + "/" };
			case "malformed-index" -> new String[] { "--spring.profiles.active=prod", "--spring.web.resources.static-locations[1]=file:/" + SENTINEL + "/" };
			default -> new String[] { "--spring.profiles.active=local,prod" };
		};
		String code = switch (configuration) {
			case "directory" -> "FILESYSTEM_FORBIDDEN";
			case "mixed-profile" -> "LOCAL_PROFILE_INVALID";
			default -> "RESOURCE_LOCATION_FORBIDDEN";
		};
		try (var running = new RunningJar(JAR, arguments)) {
			assertThat(running.process.waitFor(30, TimeUnit.SECONDS)).isTrue();
			assertThat(running.process.exitValue()).isNotZero();
			assertThat(Files.readString(running.log)).contains("BTC_ASSETS_" + code)
					.doesNotContain(SENTINEL, "Tomcat started on port", "Started BeneathTheCodeApplication in");
		}
	}

	@Test
	void unmodifiedDistributableServesAssetsAndHealthButNotPrivateManifestOrFixture() throws Exception {
		try (var running = new RunningJar(JAR)) {
			running.awaitReady();
			assertHttpAssets(running);
			var health = running.get("/actuator/health");
			assertThat(health.statusCode()).isEqualTo(200);
			assertThat(new String(health.body(), StandardCharsets.UTF_8)).contains("\"status\":\"UP\"");
			for (var path : new String[] { "/asset-manifest.json", "/__asset-fixture" }) {
				assertThat(running.get(path).statusCode()).as("unpublished route %s is denied", path).isEqualTo(403);
			}
			assertThat(running.get("/assets/asset-manifest.json").statusCode()).isEqualTo(404);
		}
	}

	@ParameterizedTest
	@ValueSource(strings = { "missing-entry", "missing-manifest", "malformed", "unsafe-path", "css-script", "js-stylesheet" })
	void incompleteArtifactsFailBeforeReadinessWithoutDisclosingManifestContent(String mutation) throws Exception {
		byte[] before = digest(JAR);
		var assets = builtAssets().keySet();
		String script = "static" + assets.stream().filter(path -> path.endsWith(".js")).findFirst().orElseThrow();
		String stylesheet = "static" + assets.stream().filter(path -> path.endsWith(".css")).findFirst().orElseThrow();
		String manifest = switch (mutation) {
			case "css-script" -> "{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"" + stylesheet + "\"}}";
			case "js-stylesheet" -> "{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"" + script + "\",\"css\":[\"" + script + "\"]}}";
			case "missing-entry" -> "{\"" + SENTINEL + "\":{}}";
			case "malformed" -> "{" + SENTINEL;
			case "unsafe-path" -> "{\"entries/site.ts\":{\"isEntry\":true,\"file\":\"../" + SENTINEL + ".js\"}}";
			default -> "{}";
		};
		String code = switch (mutation) {
			case "css-script", "js-stylesheet" -> "TYPE_INVALID";
			case "missing-entry" -> "REQUIRED_ENTRY_MISSING";
			case "missing-manifest" -> "MANIFEST_MISSING";
			case "malformed" -> "MANIFEST_INVALID";
			default -> "PATH_INVALID";
		};
		var fixture = fixture(mutation, Map.of(MANIFEST, manifest.getBytes(StandardCharsets.UTF_8)), mutation.equals("missing-manifest"));
		try (var running = new RunningJar(fixture)) {
			assertThat(running.process.waitFor(30, TimeUnit.SECONDS)).isTrue();
			assertThat(running.process.exitValue()).isNotZero();
			assertThat(Files.readString(running.log)).contains("BTC_ASSETS_" + code)
					.doesNotContain(SENTINEL, "Tomcat started on port", "Started BeneathTheCodeApplication in");
		}
		assertThat(digest(JAR)).isEqualTo(before);
		Files.delete(fixture);
	}

	private static void assertHttpAssets(RunningJar running) throws Exception {
		for (var asset : builtAssets().entrySet()) {
			var response = running.get(asset.getKey());
			assertThat(response.statusCode()).isEqualTo(200);
			assertThat(response.body()).isEqualTo(asset.getValue());
			assertThat(MessageDigest.getInstance("SHA-256").digest(response.body()))
					.isEqualTo(MessageDigest.getInstance("SHA-256").digest(asset.getValue()));
			assertThat(response.headers().firstValue("content-type")).hasValueSatisfying(type ->
					assertThat(type).contains(asset.getKey().endsWith(".css") ? "text/css" : "javascript"));
		}
	}

	private static Map<String, byte[]> builtAssets() throws Exception {
		try (var archive = new ZipFile(JAR.toFile())) {
			var manifest = JsonMapper.builder().build().readTree(bytes(archive, MANIFEST));
			var references = AssetManifest.resolve(new java.io.ByteArrayInputStream(bytes(archive, MANIFEST)),
					path -> archive.getEntry("BOOT-INF/classes/" + path) != null);
			assertThat(manifest.has("entries/site.ts")).isTrue();
			var result = new LinkedHashMap<String, byte[]>();
			for (var path : java.util.stream.Stream.concat(java.util.stream.Stream.of(references.script()),
					references.stylesheets().stream()).toList()) {
				result.put(path, bytes(archive, "BOOT-INF/classes/static" + path));
			}
			return result;
		}
	}

	private static Path fixture(String name, Map<String, byte[]> replacements, boolean omitManifest) throws IOException {
		Files.createDirectories(OUTPUT);
		var target = OUTPUT.resolve(name + "-" + UUID.randomUUID() + ".jar");
		try (var archive = new ZipFile(JAR.toFile()); var output = new ZipOutputStream(Files.newOutputStream(target))) {
			var entries = archive.entries();
			while (entries.hasMoreElements()) {
				var entry = entries.nextElement();
				if (replacements.containsKey(entry.getName()) || omitManifest && entry.getName().equals(MANIFEST)) {
					continue;
				}
				write(output, entry.getName(), bytes(archive, entry.getName()), entry.getMethod());
			}
			for (var entry : replacements.entrySet()) {
				if (!omitManifest || !entry.getKey().equals(MANIFEST)) {
					write(output, entry.getKey(), entry.getValue(), ZipEntry.DEFLATED);
				}
			}
		}
		return target;
	}

	private static void write(ZipOutputStream output, String name, byte[] content, int method) throws IOException {
		var entry = new ZipEntry(name);
		entry.setMethod(method);
		if (method == ZipEntry.STORED) {
			var crc = new CRC32();
			crc.update(content);
			entry.setCrc(crc.getValue());
			entry.setSize(content.length);
		}
		output.putNextEntry(entry);
		output.write(content);
		output.closeEntry();
	}

	private static byte[] bytes(ZipFile archive, String name) throws IOException {
		var entry = archive.getEntry(name);
		if (entry == null) {
			throw new IOException("Missing expected fixture resource");
		}
		try (var stream = archive.getInputStream(entry)) {
			return stream.readAllBytes();
		}
	}

	private static byte[] digest(Path path) throws Exception {
		return MessageDigest.getInstance("SHA-256").digest(Files.readAllBytes(path));
	}

	private static final class RunningJar implements AutoCloseable {
		private final Process process;
		private final Path log;
		private final String authentication;
		private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5))
				.followRedirects(HttpClient.Redirect.NEVER).build();
		private int port;

		RunningJar(Path jar, String... arguments) throws IOException {
			Files.createDirectories(OUTPUT);
			log = OUTPUT.resolve("process-" + UUID.randomUUID() + ".log");
			String password = UUID.randomUUID().toString();
			authentication = "Basic " + Base64.getEncoder().encodeToString(("asset-fixture:" + password).getBytes(StandardCharsets.UTF_8));
			var command = new java.util.ArrayList<>(java.util.List.of(Path.of(System.getProperty("java.home"), "bin", "java").toString(),
					"-jar", jar.toAbsolutePath().toString(), "--server.address=127.0.0.1", "--server.port=0"));
			command.addAll(java.util.List.of(arguments));
			var builder = new ProcessBuilder(command);
			builder.environment().put("SPRING_SECURITY_USER_NAME", "asset-fixture");
			builder.environment().put("SPRING_SECURITY_USER_PASSWORD", password);
			process = builder.redirectErrorStream(true).redirectOutput(log.toFile()).start();
		}

		void awaitReady() throws Exception {
			long deadline = System.nanoTime() + Duration.ofSeconds(30).toNanos();
			while (System.nanoTime() < deadline) {
				assertThat(process.isAlive()).as("packaged process remains alive; log: %s", log).isTrue();
				String text = Files.readString(log);
				var matcher = Pattern.compile("Tomcat started on port (\\d+)").matcher(text);
				if (matcher.find() && text.contains("Started ")) {
					port = Integer.parseInt(matcher.group(1));
					return;
				}
				Thread.sleep(100);
			}
			throw new AssertionError("Packaged application readiness timed out; inspect " + log);
		}

		HttpResponse<byte[]> get(String path) throws Exception {
			return client.send(HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + path))
					.timeout(Duration.ofSeconds(5)).header("Authorization", authentication).GET().build(), HttpResponse.BodyHandlers.ofByteArray());
		}

		@Override
		public void close() throws Exception {
			process.destroy();
			if (!process.waitFor(5, TimeUnit.SECONDS)) {
				process.destroyForcibly();
				assertThat(process.waitFor(5, TimeUnit.SECONDS)).isTrue();
			}
		}
	}
}

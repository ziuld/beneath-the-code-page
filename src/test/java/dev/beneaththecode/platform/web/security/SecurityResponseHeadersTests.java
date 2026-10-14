package dev.beneaththecode.platform.web.security;

import java.util.Base64;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import jakarta.servlet.DispatcherType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityResponseHeadersTests {

	@Autowired MockMvc mvc;
	@Autowired AssetManifest assets;

	@Test
	void normalErrorAndDeniedResponsesHaveExactPolicyAndNoSession() throws Exception {
		for (String path : new String[] { "/", "/missing", "/error", "/__shell-fixture", "/assets/missing.css" }) {
			var result = mvc.perform(get(path)).andReturn();
			assertThat(result.getResponse().getStatus()).isEqualTo(path.equals("/") ? 200 : path.startsWith("/assets/") ? 404 : 403);
			String nonce = (String) result.getRequest().getAttribute(SecurityResponseHeaders.NONCE_ATTRIBUTE);
			assertThat(Base64.getDecoder().decode(nonce)).hasSize(16);
			assertThat(result.getResponse().getHeader("Content-Security-Policy")).isEqualTo(SecurityResponseHeaders.policy(nonce));
			assertThat(result.getResponse().getHeader("Referrer-Policy")).isEqualTo("no-referrer");
			assertThat(result.getResponse().getHeader("Permissions-Policy")).isEqualTo("camera=(), microphone=(), geolocation=()");
			assertThat(result.getResponse().getHeader("X-Content-Type-Options")).isEqualTo("nosniff");
			assertThat(result.getResponse().getHeader("X-Frame-Options")).isEqualTo("DENY");
			assertThat(result.getResponse().getHeader("Cache-Control")).isEqualTo("no-store");
			assertThat(result.getResponse().getHeader("Location")).isNull();
			assertThat(result.getRequest().getSession(false)).isNull();
			assertThat(result.getResponse().getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID"));
		}
	}

	@Test
	void separateHtmlResponsesHaveFreshNoncesAndInternalErrorDispatchRetainsHeaders() throws Exception {
		var first = mvc.perform(get("/")).andReturn();
		var second = mvc.perform(get("/")).andReturn();
		assertThat(first.getRequest().getAttribute("cspNonce")).isNotEqualTo(second.getRequest().getAttribute("cspNonce"));
		var error = mvc.perform(get("/error").with(request -> {
			request.setDispatcherType(DispatcherType.ERROR);
			return request;
		}).requestAttr("jakarta.servlet.error.status_code", 500).accept("application/json")).andReturn();
		assertThat(error.getResponse().getStatus()).isEqualTo(500);
		assertThat(error.getResponse().getHeader("Content-Security-Policy"))
				.isEqualTo(SecurityResponseHeaders.policy((String) error.getRequest().getAttribute("cspNonce")));
	}

	@Test
	void onlyNonLocalSecureRequestsGetHstsAndForwardedHeadersAreUntrusted() throws Exception {
		var secure = mvc.perform(get("/").secure(true)).andReturn().getResponse();
		assertThat(secure.getHeader("Strict-Transport-Security")).isEqualTo("max-age=31536000");
		var spoofed = mvc.perform(get("/").header("Forwarded", "proto=https;host=example.invalid")
				.header("X-Forwarded-Proto", "https")).andReturn().getResponse();
		assertThat(spoofed.getHeader("Strict-Transport-Security")).isNull();
	}

	@Test
	void publishedResourcesRemainFilteredAndPreferenceRequiresPostAndCsrf() throws Exception {
		for (String path : new String[] { "/", assets.site().script(), assets.site().stylesheets().getFirst(),
				"/brand/b-composition.png", "/actuator/health" }) {
			var response = mvc.perform(head(path)).andReturn().getResponse();
			assertThat(response.getStatus()).isEqualTo(200);
			assertThat(response.getHeader("Content-Security-Policy")).contains("default-src 'none'");
		}
		assertThat(mvc.perform(get("/preferences/language")).andReturn().getResponse().getStatus()).isEqualTo(403);
		assertThat(mvc.perform(post("/preferences/language").contentType("application/x-www-form-urlencoded"))
				.andReturn().getResponse().getStatus()).isEqualTo(403);
	}

	@Test
	void onlySuccessfulManifestAssetsAreImmutable() throws Exception {
		for (String path : new String[] { assets.site().script(), assets.site().stylesheets().getFirst() }) {
			var response = mvc.perform(get(path)).andReturn().getResponse();
			assertThat(response.getStatus()).isEqualTo(200);
			assertThat(response.getHeader("Cache-Control").split(", "))
					.containsExactlyInAnyOrder("public", "max-age=31536000", "immutable");
		}
		for (String path : new String[] { "/", "/assets/missing.css", "/brand/b-composition.png", "/missing" }) {
			assertThat(mvc.perform(get(path)).andReturn().getResponse().getHeader("Cache-Control")).isEqualTo("no-store");
		}
	}
}

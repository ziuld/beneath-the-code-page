package dev.beneaththecode.site.adapter.in.web;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import jakarta.servlet.DispatcherType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class HomeSecurityTests {

	@Autowired MockMvc mvc;
	@Autowired AssetManifest manifest;
	@Autowired @Qualifier("requestMappingHandlerMapping") RequestMappingHandlerMapping mappings;

	@Test
	void productionMapsRealToolsButNoPlaceholderDestinations() {
		assertThat(mappings.getHandlerMethods().keySet().stream()
				.flatMap(mapping -> mapping.getPatternValues().stream()).toList())
				.contains("/", "/tools", "/tools/json-formatter")
				.doesNotContain("/tools/json-validator", "/tools/base64", "/learn", "/__asset-fixture", "/__editor-fixture");
	}

	@Test
	void anonymousHomeAndRequiredResourcesArePublicAndFiltered() throws Exception {
		for (String path : new String[] { "/", manifest.site().script(), manifest.site().stylesheets().getFirst(),
				"/brand/b-composition.png", "/actuator/health" }) {
			var response = mvc.perform(get(path)).andExpect(status().isOk())
					.andExpect(header().string("X-Content-Type-Options", "nosniff"))
					.andExpect(header().doesNotExist("Location")).andReturn().getResponse();
			assertThat(response.getCookies()).noneMatch(cookie -> cookie.getName().equals("JSESSIONID"));
			mvc.perform(head(path)).andExpect(status().isOk());
		}
		byte[] logo = mvc.perform(get("/brand/b-composition.png")).andReturn().getResponse().getContentAsByteArray();
		assertThat(logo).isEqualTo(Files.readAllBytes(Path.of("docs/reference/logo-composition-original.png")));
		mvc.perform(get("/assets/asset-manifest.json")).andExpect(status().isNotFound());
	}

	@ParameterizedTest
	@ValueSource(strings = { "/tools/json-validator", "/tools/missing", "/learn", "/__asset-fixture", "/asset-manifest.json", "/actuator", "/login", "/missing" })
	void unpublishedAndUnlistedRoutesAreDenied(String path) throws Exception {
		mvc.perform(get(path)).andExpect(status().isForbidden()).andExpect(header().doesNotExist("Location"));
		mvc.perform(head(path)).andExpect(status().isForbidden());
	}

	@Test
	void bodyBearingMethodsStayDeniedEvenWithCsrfToken() throws Exception {
		var form = mvc.perform(get("/")).andExpect(status().isOk()).andReturn().getResponse();
		var csrfCookie = form.getCookie("XSRF-TOKEN");
		assertThat(csrfCookie).isNotNull();
		var token = Pattern.compile("name=\"_csrf\"[^>]*value=\"([^\"]+)\"")
				.matcher(form.getContentAsString(StandardCharsets.UTF_8));
		assertThat(token.find()).isTrue();
		for (String path : new String[] { "/", manifest.site().script(), "/brand/b-composition.png", "/actuator/health" }) {
			mvc.perform(post(path).cookie(csrfCookie).param("_csrf", token.group(1))).andExpect(status().isForbidden());
			mvc.perform(put(path).cookie(csrfCookie).param("_csrf", token.group(1))).andExpect(status().isForbidden());
			mvc.perform(delete(path).cookie(csrfCookie).param("_csrf", token.group(1))).andExpect(status().isForbidden());
			mvc.perform(patch(path).cookie(csrfCookie).param("_csrf", token.group(1))).andExpect(status().isForbidden());
			mvc.perform(options(path)).andExpect(status().isForbidden());
		}
		mvc.perform(post("/")).andExpect(status().isForbidden());
	}

	@Test
	void errorDispatchCanRenderWithoutDisclosingDetails() throws Exception {
		mvc.perform(get("/error").with(request -> {
			request.setDispatcherType(DispatcherType.ERROR);
			return request;
		})
				.requestAttr("jakarta.servlet.error.status_code", 403).accept("application/json"))
				.andExpect(status().isForbidden()).andExpect(content().string(org.hamcrest.Matchers.not(
						org.hamcrest.Matchers.containsString("stackTrace"))));
	}
}

package dev.beneaththecode.site.adapter.in.web;

import java.util.regex.Pattern;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** F03-UH01-R02/AC02: mapped/public fixtures, using production Home rendering and filters. */
@SpringBootTest
@AutoConfigureMockMvc
@Import({ HomePublicationTests.Destinations.class, HomePublicationTests.PublicationSecurity.class })
class HomePublicationTests {

	@Autowired MockMvc mvc;
	@MockitoBean HomeNavigation navigation;

	@ParameterizedTest
	@CsvSource({ "false,false", "true,false", "false,true", "true,true" })
	void publicationReplacesUnavailableStateWithWorkingPublicLink(boolean tools, boolean learning) throws Exception {
		var descriptors = new HomeNavigation(tools, learning).sections();
		when(navigation.sections()).thenReturn(descriptors);
		String html = mvc.perform(get("/")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		for (var section : descriptors) {
			assertThat(html.contains("href=\"" + section.path() + "\"")).isEqualTo(section.published());
			mvc.perform(get(section.path())).andExpect(section.published() ? status().isOk() : status().isForbidden());
		}
		assertThat(html).contains("designed to process your input locally", "beginning with Java fundamentals");
		assertThat(Pattern.compile(">Not yet available<").matcher(html).results().count())
				.isEqualTo((tools ? 0 : 1) + (learning ? 0 : 1));
		var links = Pattern.compile("href=\"(/tools|/learn)\"").matcher(html);
		while (links.find()) {
			mvc.perform(get(links.group(1))).andExpect(status().isOk());
		}
	}

	@RestController
	static class Destinations {
		@GetMapping({ "/tools", "/learn" })
		String fixture() {
			return "Mapped publication fixture only";
		}
	}

	@TestConfiguration(proxyBeanMethods = false)
	static class PublicationSecurity {
		@Bean
		@Order(0)
		SecurityFilterChain fixturePublishedRoutes(HttpSecurity http, HomeNavigation navigation) throws Exception {
			return http.securityMatcher(request ->
					(request.getMethod().equals("GET") || request.getMethod().equals("HEAD"))
					&& navigation.sections().stream().anyMatch(section -> section.published()
							&& section.path().equals(request.getRequestURI())))
					.authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll()).build();
		}
	}
}

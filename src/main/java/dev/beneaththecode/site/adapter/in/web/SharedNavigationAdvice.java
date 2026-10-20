package dev.beneaththecode.site.adapter.in.web;

import java.util.List;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

/** One publication model for all pages using the shared shell. */
@ControllerAdvice(basePackages = {
		"dev.beneaththecode.site.adapter.in.web",
		"dev.beneaththecode.tools.adapter.in.web",
		"dev.beneaththecode.learning.adapter.in.web"
})
public final class SharedNavigationAdvice {
	private final HomeNavigation navigation;

	public SharedNavigationAdvice(HomeNavigation navigation) {
		this.navigation = navigation;
	}

	@ModelAttribute("sections")
	public List<HomeNavigation.Section> sections() {
		return navigation.sections();
	}
}

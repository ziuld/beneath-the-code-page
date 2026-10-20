package dev.beneaththecode.learning.adapter.in.web;

import java.util.Locale;

import dev.beneaththecode.learning.application.LearningPages;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

@Controller
public final class LearningController {
	private final LearningPages pages;
	private final LessonHtmlRenderer renderer;
	private final AssetManifest assets;

	public LearningController(LearningPages pages, LessonHtmlRenderer renderer, AssetManifest assets) {
		this.pages = pages; this.renderer = renderer; this.assets = assets;
	}

	@GetMapping("/learn")
	public String index(Model model, Locale locale) {
		shared(model, locale, "/learn");
		return "learning-index";
	}

	@GetMapping("/learn/java-fundamentals")
	public String course(Model model, Locale locale) {
		shared(model, locale, "/learn/java-fundamentals");
		return "learning-course";
	}

	@GetMapping("/learn/java-fundamentals/{lessonSlug}")
	public String unit(@PathVariable String lessonSlug, Model model, Locale locale) {
		var page = pages.unit(lessonSlug).orElseThrow(LearningController::missing);
		shared(model, locale, "/learn/java-fundamentals/" + page.unit().slug());
		var content = page.unit().translations().get(locale.getLanguage());
		model.addAttribute("unitTitle", content.title());
		model.addAttribute("bodyHtml", renderer.render(content.markdown()));
		model.addAttribute("previous", page.previous().map(unit -> link(unit, locale)).orElse(null));
		model.addAttribute("next", page.next().map(unit -> link(unit, locale)).orElse(null));
		return "learning-unit";
	}

	private void shared(Model model, Locale locale, String currentPath) {
		if (pages.catalogue().units().isEmpty()) throw missing();
		model.addAttribute("assets", assets.site());
		model.addAttribute("language", locale.getLanguage());
		model.addAttribute("currentPath", currentPath);
		model.addAttribute("course", pages.catalogue().translations().get(locale.getLanguage()));
		model.addAttribute("units", pages.catalogue().units().stream().map(unit -> link(unit, locale)).toList());
	}

	private static UnitLink link(LearningCatalogue.Unit unit, Locale locale) {
		return new UnitLink(unit.translations().get(locale.getLanguage()).title(),
				"/learn/java-fundamentals/" + unit.slug() + "?lang=" + locale.getLanguage());
	}

	private static ResponseStatusException missing() { return new ResponseStatusException(HttpStatus.NOT_FOUND); }
	public record UnitLink(String title, String href) { }
}

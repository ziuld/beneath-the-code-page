package dev.beneaththecode.site.adapter.in.web;

import java.util.Locale;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class HomeController {

	private final AssetManifest manifest;
	private final HomeNavigation navigation;

	public HomeController(AssetManifest manifest, HomeNavigation navigation) {
		this.manifest = manifest;
		this.navigation = navigation;
	}

	@GetMapping("/")
	public String home(Model model, Locale locale) {
		model.addAttribute("assets", manifest.site());
		model.addAttribute("sections", navigation.sections());
		model.addAttribute("language", locale.getLanguage());
		return "home";
	}
}

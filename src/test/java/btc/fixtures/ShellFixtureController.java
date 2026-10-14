package btc.fixtures;

import java.util.Locale;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import dev.beneaththecode.site.adapter.in.web.HomeNavigation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class ShellFixtureController {

	private final AssetManifest manifest;

	public ShellFixtureController(AssetManifest manifest) {
		this.manifest = manifest;
	}

	@GetMapping("/__shell-fixture")
	public String page(Model model, Locale locale) {
		model.addAttribute("assets", manifest.site());
		model.addAttribute("language", locale.getLanguage());
		model.addAttribute("sections", new HomeNavigation(true, false).sections());
		return "shell-fixture";
	}
}

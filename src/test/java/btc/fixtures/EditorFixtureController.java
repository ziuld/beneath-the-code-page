package btc.fixtures;

import java.util.Locale;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/** Packaged proof only; never part of the production component scan or JAR. */
@Controller
public final class EditorFixtureController {

	private final AssetManifest manifest;

	public EditorFixtureController(AssetManifest manifest) {
		this.manifest = manifest;
	}

	@GetMapping("/__editor-fixture")
	public String page(Model model, Locale locale) {
		model.addAttribute("assets", manifest.site());
		model.addAttribute("language", locale.getLanguage());
		return "editor-fixture";
	}
}

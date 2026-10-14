package btc.fixtures;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class AssetFixtureController {

	private final AssetManifest manifest;

	public AssetFixtureController(AssetManifest manifest) {
		this.manifest = manifest;
	}

	@GetMapping("/__asset-fixture")
	public String page(Model model) {
		model.addAttribute("assets", manifest.site());
		return "asset-fixture";
	}
}

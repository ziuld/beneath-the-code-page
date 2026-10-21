package dev.beneaththecode.tools.adapter.in.web;

import java.util.Locale;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/** Static SSR pages only: tool content never enters the server. */
@Controller
public final class ToolsController {

	private final AssetManifest manifest;
	public ToolsController(AssetManifest manifest) {
		this.manifest = manifest;
	}

	@GetMapping("/tools")
	public String index(Model model, Locale locale) {
		shared(model, locale);
		return "tools";
	}

	@GetMapping("/tools/json-formatter")
	public String formatter(Model model, Locale locale) {
		shared(model, locale);
		return "json-formatter";
	}

	@GetMapping("/tools/base64")
	public String base64(Model model, Locale locale) {
		shared(model, locale);
		return "base64";
	}

	private void shared(Model model, Locale locale) {
		model.addAttribute("assets", manifest.site());
		model.addAttribute("language", locale.getLanguage());
	}

	@GetMapping("/tools/json-validator")
	public String validator(Model model, Locale locale) {
		shared(model, locale);
		return "json-validator";
	}

	@GetMapping("/tools/json-minifier")
	public String minifier(Model model, Locale locale) {
		shared(model, locale);
		return "json-minifier";
	}
}

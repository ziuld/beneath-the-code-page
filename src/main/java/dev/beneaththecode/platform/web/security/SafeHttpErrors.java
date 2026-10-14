package dev.beneaththecode.platform.web.security;

import java.io.IOException;

import dev.beneaththecode.platform.web.assets.AssetManifest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/** Fixed error content, shared by early filters, security and MVC. */
@Component
public final class SafeHttpErrors {

	private final LocaleResolver locales;
	private final AssetManifest assets;
	private final TemplateEngine templates;

	public SafeHttpErrors(LocaleResolver locales, AssetManifest assets, TemplateEngine templates) {
		this.locales = locales;
		this.assets = assets;
		this.templates = templates;
	}

	public void render(HttpServletRequest request, HttpServletResponse response, int status) throws IOException {
		if (response.isCommitted()) return;
		response.setStatus(status);
		response.setHeader("Cache-Control", "no-store");
		response.setCharacterEncoding("UTF-8");
		if (request.getMethod().equals("HEAD")) return;
		String accept = request.getHeader("Accept");
		if (accept != null && accept.contains("text/html")) {
			var locale = locales.resolveLocale(request);
			var context = new Context(locale);
			context.setVariable("language", locale.getLanguage());
			context.setVariable("assets", assets.site());
			context.setVariable("status", status);
			response.setContentType("text/html");
			templates.process("safe-error", context, response.getWriter());
		}
		else {
			response.setContentType("application/json");
			response.getWriter().write("{\"status\":" + status + ",\"code\":\"BTC_HTTP_" + status + "\"}");
		}
		response.flushBuffer();
	}
}

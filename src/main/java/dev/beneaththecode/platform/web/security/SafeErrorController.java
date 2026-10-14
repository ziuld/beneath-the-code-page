package dev.beneaththecode.platform.web.security;

import java.io.IOException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.webmvc.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public final class SafeErrorController implements ErrorController {

	private final SafeHttpErrors errors;

	public SafeErrorController(SafeHttpErrors errors) { this.errors = errors; }

	@RequestMapping("/error")
	public void error(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Object value = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		int status = value instanceof Integer code && code >= 400 && code <= 599 ? code : 500;
		errors.render(request, response, status);
	}
}

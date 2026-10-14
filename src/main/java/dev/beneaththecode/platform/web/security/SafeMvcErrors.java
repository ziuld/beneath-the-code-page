package dev.beneaththecode.platform.web.security;

import java.io.IOException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class SafeMvcErrors {

	private final SafeHttpErrors errors;

	public SafeMvcErrors(SafeHttpErrors errors) { this.errors = errors; }

	@ExceptionHandler(Exception.class)
	public void error(Exception exception, HttpServletRequest request, HttpServletResponse response) throws IOException {
		int status = exception instanceof ErrorResponse error ? error.getStatusCode().value() : 500;
		errors.render(request, response, status);
	}
}

package dev.beneaththecode.platform.web.security;

import java.io.IOException;

import dev.beneaththecode.platform.web.i18n.PreferenceCookiePolicy;
import jakarta.servlet.ServletException;
import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;
import org.apache.catalina.valves.ValveBase;

/** Covers rejected URI decoding before Tomcat can map a servlet context. */
final class ContainerRejectionHeaders extends ValveBase {
	private final SecurityResponseHeaders headers;

	ContainerRejectionHeaders(PreferenceCookiePolicy cookies) {
		super(true);
		headers = new SecurityResponseHeaders(cookies);
	}

	@Override
	public void invoke(Request request, Response response) throws IOException, ServletException {
		if (request.getContext() == null && response.isError() && !response.isCommitted()) {
			headers.applyPolicy(request, response);
		}
		getNext().invoke(request, response);
	}
}

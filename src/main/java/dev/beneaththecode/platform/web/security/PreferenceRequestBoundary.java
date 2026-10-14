package dev.beneaththecode.platform.web.security;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.ByteBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.filter.GenericFilterBean;

/** Bounds actual preference bytes before servlet/CSRF parameter parsing. */
public final class PreferenceRequestBoundary extends GenericFilterBean {

	static final int MAX_BYTES = 4096;
	private final SafeHttpErrors errors;

	public PreferenceRequestBoundary(SafeHttpErrors errors) { this.errors = errors; }

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		var request = (HttpServletRequest) servletRequest;
		var response = (HttpServletResponse) servletResponse;
		if (!request.getMethod().equals("POST") || !request.getRequestURI().equals("/preferences/language")) {
			chain.doFilter(request, response);
			return;
		}
		if (!supportedContentType(request.getContentType())) {
			errors.render(request, response, 415);
			return;
		}
		if (request.getContentLengthLong() > MAX_BYTES) {
			errors.render(request, response, 413);
			return;
		}
		byte[] buffer = new byte[MAX_BYTES + 1];
		int size = request.getInputStream().readNBytes(buffer, 0, buffer.length);
		if (size > MAX_BYTES) {
			errors.render(request, response, 413);
			return;
		}
		byte[] body = java.util.Arrays.copyOf(buffer, size);
		Map<String, String[]> parameters;
		try {
			var values = new LinkedHashMap<String, List<String>>();
			String query = request.getQueryString();
			if (query != null) {
				if (query.length() > 16384) throw new IllegalArgumentException();
				parse(query, values);
			}
			parse(utf8(body), values);
			parameters = new LinkedHashMap<>();
			values.forEach((name, entries) -> parameters.put(name, entries.toArray(String[]::new)));
		}
		catch (IllegalArgumentException | CharacterCodingException exception) {
			// Never expose decoder messages, which may contain client-controlled data.
			errors.render(request, response, 400);
			return;
		}
		chain.doFilter(new BoundedFormRequest(request, body, parameters), response);
	}

	private static boolean supportedContentType(String value) {
		try {
			var type = MediaType.parseMediaType(value == null ? "" : value);
			return type.getType().equals("application") && type.getSubtype().equals("x-www-form-urlencoded")
					&& (type.getCharset() == null || type.getCharset().equals(StandardCharsets.UTF_8));
		}
		catch (IllegalArgumentException exception) {
			return false;
		}
	}

	private static void parse(String encoded, Map<String, List<String>> values) throws CharacterCodingException {
		for (String pair : encoded.split("&")) {
			if (pair.isEmpty()) continue;
			String[] parts = pair.split("=", 2);
			String name = decode(parts[0]);
			String value = parts.length == 2 ? decode(parts[1]) : "";
			values.computeIfAbsent(name, ignored -> new ArrayList<>()).add(value);
		}
	}

	private static String decode(String encoded) throws CharacterCodingException {
		byte[] input = encoded.getBytes(StandardCharsets.UTF_8);
		var output = new ByteArrayOutputStream(input.length);
		for (int index = 0; index < input.length; index++) {
			int value = input[index] & 255;
			if (value == '%') {
				if (index + 2 >= input.length) throw new IllegalArgumentException();
				int high = Character.digit((char) input[++index], 16);
				int low = Character.digit((char) input[++index], 16);
				if (high < 0 || low < 0) throw new IllegalArgumentException();
				output.write(high * 16 + low);
			}
			else output.write(value == '+' ? ' ' : value);
		}
		return utf8(output.toByteArray());
	}

	private static String utf8(byte[] bytes) throws CharacterCodingException {
		return StandardCharsets.UTF_8.newDecoder().decode(ByteBuffer.wrap(bytes)).toString();
	}

	private static final class BoundedFormRequest extends HttpServletRequestWrapper {

		private final byte[] body;
		private final Map<String, String[]> parameters;

		BoundedFormRequest(HttpServletRequest request, byte[] body, Map<String, String[]> parameters) {
			super(request);
			this.body = body;
			this.parameters = Collections.unmodifiableMap(parameters);
		}

		@Override public String getParameter(String name) {
			String[] values = parameters.get(name);
			return values == null ? null : values[0];
		}
		@Override public String[] getParameterValues(String name) { return parameters.get(name); }
		@Override public Map<String, String[]> getParameterMap() { return parameters; }
		@Override public Enumeration<String> getParameterNames() { return Collections.enumeration(parameters.keySet()); }
		@Override public String getCharacterEncoding() { return StandardCharsets.UTF_8.name(); }
		@Override public int getContentLength() { return body.length; }
		@Override public long getContentLengthLong() { return body.length; }
		@Override public BufferedReader getReader() {
			return new BufferedReader(new InputStreamReader(new ByteArrayInputStream(body), StandardCharsets.UTF_8));
		}
		@Override public ServletInputStream getInputStream() {
			var input = new ByteArrayInputStream(body);
			return new ServletInputStream() {
				@Override public int read() { return input.read(); }
				@Override public boolean isFinished() { return input.available() == 0; }
				@Override public boolean isReady() { return true; }
				@Override public void setReadListener(ReadListener listener) {
					throw new IllegalStateException("BTC_FORM_SYNCHRONOUS_ONLY");
				}
			};
		}
	}
}

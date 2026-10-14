package dev.beneaththecode.platform.web.security;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.atomic.AtomicBoolean;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;

class PreferenceRequestBoundaryTests {

	private static PreferenceRequestBoundary boundary() {
		var errors = org.mockito.Mockito.mock(SafeHttpErrors.class);
		try {
			org.mockito.Mockito.doAnswer(invocation -> {
				((jakarta.servlet.http.HttpServletResponse) invocation.getArgument(1)).setStatus(invocation.getArgument(2));
				return null;
			}).when(errors).render(org.mockito.ArgumentMatchers.any(), org.mockito.ArgumentMatchers.any(), org.mockito.ArgumentMatchers.anyInt());
		}
		catch (java.io.IOException exception) { throw new AssertionError(exception); }
		return new PreferenceRequestBoundary(errors);
	}

	@ParameterizedTest
	@ValueSource(ints = { 0, 4095, 4096, 4097, 10000 })
	void boundsActualBytesIncludingUnknownLength(int size) throws Exception {
		var request = form("x=" + "a".repeat(Math.max(0, size - 2)));
		request.setContent(new byte[size]);
		// No declared length, as with a chunked transfer. The bounded stream is authoritative.
		var unknownLength = new jakarta.servlet.http.HttpServletRequestWrapper(request) {
			@Override public long getContentLengthLong() { return -1; }
		};
		var response = new MockHttpServletResponse();
		var called = new AtomicBoolean();
		boundary().doFilter(unknownLength, response, (bounded, output) -> called.set(true));
		assertThat(response.getStatus()).isEqualTo(size > 4096 ? 413 : 200);
		assertThat(called.get()).isEqualTo(size <= 4096);
		if (size > 4096) assertThat(request.getInputStream().available()).isEqualTo(size - 4097);
	}

	@ParameterizedTest
	@ValueSource(strings = { "application/json", "multipart/form-data;boundary=test", "text/plain",
			"application/x-www-form-urlencoded;charset=ISO-8859-1", "invalid" })
	void rejectsUnsupportedContentBeforeParsing(String contentType) throws Exception {
		var request = form("SYNTHETIC_BOUNDARY_SENTINEL");
		request.setContentType(contentType);
		var response = new MockHttpServletResponse();
		boundary().doFilter(request, response, (bounded, output) -> { throw new AssertionError(); });
		assertThat(response.getStatus()).isEqualTo(415);
		assertThat(request.getInputStream().available()).isEqualTo(request.getContentLength());
		assertThat(response.getContentAsString()).doesNotContain("SYNTHETIC_BOUNDARY_SENTINEL");
	}

	@ParameterizedTest
	@ValueSource(strings = { "x=%", "x=%GG", "x=%C3%28", "x=%FF" })
	void malformedPercentEncodingAndUtf8AreSafe400(String body) throws Exception {
		var response = new MockHttpServletResponse();
		boundary().doFilter(form(body), response, (bounded, output) -> { throw new AssertionError(); });
		assertThat(response.getStatus()).isEqualTo(400);
		assertThat(response.getErrorMessage()).isNull();
	}

	@Test
	void preservesDuplicatesAndReplaysBodyWithoutOriginalParameterParsing() throws Exception {
		var request = new MockHttpServletRequest() {
			@Override public String getParameter(String name) { throw new AssertionError("Original parameter parsing forbidden"); }
		};
		request.setMethod("POST");
		request.setRequestURI("/preferences/language");
		request.setContentType("application/x-www-form-urlencoded;charset=UTF-8");
		request.setQueryString("language=fr");
		String body = "language=es&label=Fran%C3%A7ais+%26+English";
		request.setContent(body.getBytes(StandardCharsets.UTF_8));
		boundary().doFilter(request, new MockHttpServletResponse(), (bounded, response) -> {
			var form = (HttpServletRequest) bounded;
			assertThat(form.getParameterValues("language")).containsExactly("fr", "es");
			assertThat(form.getParameter("label")).isEqualTo("Français & English");
			assertThat(form.getParameterMap()).containsKey("label");
			assertThat(java.util.Collections.list(form.getParameterNames())).containsExactly("language", "label");
			assertThat(form.getInputStream().readAllBytes()).isEqualTo(body.getBytes(StandardCharsets.UTF_8));
		});
	}

	@Test
	void fullProbeStopsWithoutAnExtraRead() throws Exception {
		var source = new java.io.ByteArrayInputStream(new byte[4097]);
		var input = new jakarta.servlet.ServletInputStream() {
			@Override public int read() { throw new AssertionError("Unexpected single-byte read"); }
			@Override public int read(byte[] bytes, int offset, int length) {
				assertThat(length).isPositive();
				assertThat(source.available()).isPositive();
				return source.read(bytes, offset, length);
			}
			@Override public boolean isFinished() { return false; }
			@Override public boolean isReady() { return true; }
			@Override public void setReadListener(jakarta.servlet.ReadListener listener) { throw new AssertionError(); }
		};
		var request = new jakarta.servlet.http.HttpServletRequestWrapper(form("")) {
			@Override public long getContentLengthLong() { return -1; }
			@Override public jakarta.servlet.ServletInputStream getInputStream() { return input; }
		};
		var response = new MockHttpServletResponse();
		boundary().doFilter(request, response, (bounded, output) -> { throw new AssertionError(); });
		assertThat(response.getStatus()).isEqualTo(413);
		assertThat(source.available()).isZero();
	}

	@Test
	void declaredOversizeIsRejectedBeforeReadingAndMultibyteSizeUsesBytes() throws Exception {
		var request = form("x=" + "é".repeat(2500));
		var response = new MockHttpServletResponse();
		boundary().doFilter(request, response, (bounded, output) -> { throw new AssertionError(); });
		assertThat(response.getStatus()).isEqualTo(413);
		assertThat(request.getInputStream().available()).isEqualTo(request.getContentLength());
	}

	private static MockHttpServletRequest form(String body) {
		var request = new MockHttpServletRequest("POST", "/preferences/language");
		request.setContentType("application/x-www-form-urlencoded");
		request.setContent(body.getBytes(StandardCharsets.UTF_8));
		return request;
	}
}

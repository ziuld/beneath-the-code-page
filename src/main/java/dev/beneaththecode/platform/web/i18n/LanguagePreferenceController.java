package dev.beneaththecode.platform.web.i18n;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

@Controller
public final class LanguagePreferenceController {

	private final PreferenceCookiePolicy cookies;

	public LanguagePreferenceController(PreferenceCookiePolicy cookies) {
		this.cookies = cookies;
	}

	@PostMapping("/preferences/language")
	public ResponseEntity<Void> save(HttpServletRequest request) {
		String[] languages = request.getParameterValues("language");
		if (languages == null || languages.length != 1 || PreferenceLocaleResolver.supported(languages[0]) == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}
		var cookie = ResponseCookie.from(PreferenceLocaleResolver.COOKIE_NAME, languages[0])
				.httpOnly(true).secure(cookies.secure(request)).sameSite("Lax").path("/").maxAge(31536000).build();
		// Home is currently the only published page; never reflect client-controlled targets.
		return ResponseEntity.status(HttpStatus.SEE_OTHER).header(HttpHeaders.SET_COOKIE, cookie.toString())
				.header(HttpHeaders.LOCATION, "/").header(HttpHeaders.CACHE_CONTROL, "no-store").build();
	}
}

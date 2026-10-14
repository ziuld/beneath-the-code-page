package btc.fixtures;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public final class HttpFailureController {
	@GetMapping("/assets/__http-failure")
	void fail() { throw new IllegalStateException("SYNTHETIC_HTTP_PRIVATE_SENTINEL"); }
}

package btc.fixtures;

import dev.beneaththecode.BeneathTheCodeApplication;
import org.springframework.boot.SpringApplication;

/** Failure fixture added only to an isolated copy of the executable JAR. */
public final class HttpFailureApplication {
	public static void main(String[] args) {
		SpringApplication.run(new Class<?>[] { BeneathTheCodeApplication.class, HttpFailureController.class }, args);
	}
}

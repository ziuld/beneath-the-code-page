package btc.fixtures;

import dev.beneaththecode.BeneathTheCodeApplication;
import org.springframework.boot.SpringApplication;

/** Isolated packaged component fixture entry point, never in the distributable. */
public final class ShellFixtureApplication {

	public static void main(String[] args) {
		SpringApplication.run(new Class<?>[] { BeneathTheCodeApplication.class, ShellFixtureController.class, EditorFixtureController.class,
				ShellFixtureSecurity.class }, args);
	}
}

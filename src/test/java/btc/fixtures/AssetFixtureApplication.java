package btc.fixtures;

import dev.beneaththecode.BeneathTheCodeApplication;
import org.springframework.boot.SpringApplication;

/** Entry point copied only into an isolated integration fixture, never the distributable. */
public final class AssetFixtureApplication {

	public static void main(String[] args) {
		SpringApplication.run(new Class<?>[] { BeneathTheCodeApplication.class, AssetFixtureController.class }, args);
	}
}

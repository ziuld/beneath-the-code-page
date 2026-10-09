package dev.beneaththecode.architecture;

import java.util.List;
import java.util.function.BiPredicate;
import java.util.function.Predicate;

import com.tngtech.archunit.base.DescribedPredicate;
import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.lang.ArchCondition;
import com.tngtech.archunit.lang.ArchRule;
import com.tngtech.archunit.lang.ConditionEvents;
import com.tngtech.archunit.lang.SimpleConditionEvent;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;
import static com.tngtech.archunit.library.dependencies.SlicesRuleDefinition.slices;

/** The same strict rules are used for production and for non-empty boundary fixtures. */
final class ArchitectureRules {

	static final String ROOT = "dev.beneaththecode";

	record Boundary(String name, Predicate<String> source, BiPredicate<String, String> forbidden) {
		ArchRule rule() {
			return classes().that(new DescribedPredicate<JavaClass>(name + " source packages") {
				@Override
				public boolean test(JavaClass type) {
					return source.test(type.getPackageName());
				}
			}).should(new ArchCondition<JavaClass>(name) {
				@Override
				public void check(JavaClass type, ConditionEvents events) {
					for (var dependency : type.getDirectDependenciesFromSelf()) {
						if (forbidden.test(type.getPackageName(), dependency.getTargetClass().getPackageName())) {
							events.add(SimpleConditionEvent.violated(dependency, dependency.getDescription()));
						}
					}
				}
			}).allowEmptyShould(false);
		}
	}

	static final List<Boundary> BOUNDARIES = List.of(
			new Boundary("domain stays inward", p -> layer(p, "domain"), (s, t) ->
					framework(t) || layer(t, "application") || layer(t, "adapter") || technical(t)),
			new Boundary("application stays inward", p -> layer(p, "application"), (s, t) ->
					framework(t) || layer(t, "adapter") || technical(t)),
			new Boundary("inbound avoids outbound adapters", p -> layer(p, "adapter.in"), (s, t) ->
					layer(t, "adapter.out")),
			new Boundary("outbound avoids inbound adapters", p -> layer(p, "adapter.out"), (s, t) ->
					layer(t, "adapter.in")),
			new Boundary("capabilities avoid other capabilities' adapters", ArchitectureRules::capability, (s, t) ->
					capability(t) && !capabilityName(s).equals(capabilityName(t)) && layer(t, "adapter")),
			new Boundary("capabilities avoid bootstrap and root composition", ArchitectureRules::capability, (s, t) ->
					under(t, ROOT + ".bootstrap") || t.equals(ROOT)));

	static final ArchRule PACKAGE_CYCLES = slices().matching(ROOT + ".(**)")
			.should().beFreeOfCycles().allowEmptyShould(false);
	static final ArchRule CAPABILITY_CYCLES = slices().matching(ROOT + ".(*)..")
			.should().beFreeOfCycles().allowEmptyShould(false);

	static boolean under(String candidate, String prefix) {
		return candidate.equals(prefix) || candidate.startsWith(prefix + ".");
	}

	static boolean layer(String p, String layer) {
		return p.startsWith(ROOT + ".") && p.substring(ROOT.length() + 1).matches(
				"[^.]+\\." + java.util.regex.Pattern.quote(layer) + "(?:\\..*)?");
	}

	private static boolean technical(String p) {
		return under(p, ROOT + ".platform") || under(p, ROOT + ".bootstrap") || p.equals(ROOT);
	}

	private static boolean framework(String p) {
		return List.of("org.springframework", "jakarta.servlet", "javax.servlet", "org.thymeleaf",
				"jakarta.persistence", "javax.persistence").stream().anyMatch(prefix -> under(p, prefix));
	}

	static boolean capability(String p) {
		return p.startsWith(ROOT + ".") && !technical(p);
	}

	private static String capabilityName(String p) {
		return p.substring(ROOT.length() + 1).split("\\.")[0];
	}

	private ArchitectureRules() {
	}
}

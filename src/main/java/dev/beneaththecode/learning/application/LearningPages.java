package dev.beneaththecode.learning.application;

import java.util.Optional;

import dev.beneaththecode.learning.application.port.out.CourseContentSource;
import dev.beneaththecode.learning.domain.LearningCatalogue;
import dev.beneaththecode.learning.domain.LearningCatalogue.Unit;

/** Publication lookup and navigation share one immutable snapshot. */
public final class LearningPages {
	private final LearningCatalogue catalogue;

	public LearningPages(CourseContentSource source) {
		this.catalogue = source.load();
	}

	public LearningCatalogue catalogue() { return catalogue; }

	public Optional<UnitPage> unit(String slug) {
		for (int index = 0; index < catalogue.units().size(); index++) {
			Unit current = catalogue.units().get(index);
			if (current.slug().equals(slug)) {
				return Optional.of(new UnitPage(current,
						index == 0 ? Optional.empty() : Optional.of(catalogue.units().get(index - 1)),
						index + 1 == catalogue.units().size() ? Optional.empty() : Optional.of(catalogue.units().get(index + 1))));
			}
		}
		return Optional.empty();
	}

	public record UnitPage(Unit unit, Optional<Unit> previous, Optional<Unit> next) { }
}

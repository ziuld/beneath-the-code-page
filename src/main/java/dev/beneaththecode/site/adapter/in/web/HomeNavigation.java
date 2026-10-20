package dev.beneaththecode.site.adapter.in.web;

import java.util.List;


/** Publication is code-owned; publishing requires a real public GET route and its tests. */
public final class HomeNavigation {

	private final List<Section> sections;

	public HomeNavigation(boolean toolsPublished, boolean learningPublished) {
		sections = List.of(new Section("tools", "/tools", toolsPublished),
				new Section("learn", "/learn", learningPublished));
	}

	public List<Section> sections() {
		return sections;
	}

	public record Section(String id, String path, boolean published) {
		public String titleKey() {
			return "home." + id + ".title";
		}

		public String descriptionKey() {
			return "home." + id + ".description";
		}
	}
}

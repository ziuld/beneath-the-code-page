package dev.beneaththecode.platform.web.i18n;

import java.util.Set;

/** Exact trusted page identities, composed at bootstrap rather than inferred from requests. */
public record PreferenceReturnPaths(Set<String> paths) {
	public PreferenceReturnPaths { paths = Set.copyOf(paths); }
}

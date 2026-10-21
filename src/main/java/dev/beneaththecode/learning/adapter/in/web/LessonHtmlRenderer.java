package dev.beneaththecode.learning.adapter.in.web;

import java.util.List;
import java.util.ArrayList;
import java.util.IdentityHashMap;
import org.commonmark.node.Heading;
import org.commonmark.node.Text;
import org.commonmark.node.Code;

import org.commonmark.node.AbstractVisitor;
import org.commonmark.node.Image;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.commonmark.renderer.html.DefaultUrlSanitizer;

/** The sole lesson-body HTML producer; metadata must remain normally escaped. */
public final class LessonHtmlRenderer {
	private final Parser parser = Parser.builder().build();
	private final HtmlRenderer renderer = HtmlRenderer.builder()
			.escapeHtml(true).sanitizeUrls(true)
			.urlSanitizer(new DefaultUrlSanitizer(List.of("http", "https", "mailto"))).build();

	public String render(String markdown) {
		if (markdown == null || markdown.isBlank()) throw invalid();
		var document = parser.parse(markdown);
		document.accept(new AbstractVisitor() {
			@Override public void visit(Image image) { throw invalid(); }
		});
		return renderer.render(document);
	}

	/** Section IDs are positional, unique and independent of authored markup/Unicode. */
	public LessonPage renderPage(String markdown) {
		if (markdown == null || markdown.isBlank()) throw invalid();
		var document = parser.parse(markdown);
		var sections = new ArrayList<Section>();
		var identities = new IdentityHashMap<org.commonmark.node.Node, String>();
		document.accept(new AbstractVisitor() {
			@Override public void visit(Image image) { throw invalid(); }
			@Override public void visit(Heading heading) {
				if (heading.getLevel() != 2) return;
				var title = new StringBuilder();
				heading.accept(new AbstractVisitor() {
					@Override public void visit(Text text) { title.append(text.getLiteral()); }
					@Override public void visit(Code code) { title.append(code.getLiteral()); }
				});
				String id = "lesson-section-" + (sections.size() + 1);
				identities.put(heading, id);
				sections.add(new Section(id, title.toString()));
			}
		});
		var sectionRenderer = HtmlRenderer.builder().escapeHtml(true).sanitizeUrls(true)
				.urlSanitizer(new DefaultUrlSanitizer(List.of("http", "https", "mailto")))
				.attributeProviderFactory(context -> (node, tag, attributes) -> {
					if (tag.equals("pre")) attributes.put("tabindex", "0");
					if (identities.containsKey(node)) attributes.put("id", identities.get(node));
				}).build();
		return new LessonPage(sectionRenderer.render(document), List.copyOf(sections));
	}

	public record Section(String id, String title) { }
	public record LessonPage(String html, List<Section> sections) { }

	private static IllegalArgumentException invalid() {
		return new IllegalArgumentException("BTC_LEARNING_MARKDOWN_INVALID");
	}
}

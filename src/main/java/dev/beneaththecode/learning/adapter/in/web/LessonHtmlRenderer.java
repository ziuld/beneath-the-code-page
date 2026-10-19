package dev.beneaththecode.learning.adapter.in.web;

import java.util.List;

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

	private static IllegalArgumentException invalid() {
		return new IllegalArgumentException("BTC_LEARNING_MARKDOWN_INVALID");
	}
}

package dev.beneaththecode.learning.adapter.in.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LessonHtmlRendererTests {
	private final LessonHtmlRenderer renderer = new LessonHtmlRenderer();

	@Test
	void usefulStructureAndCodeRemainReadableAndInert() {
		String html = renderer.render("## Title\n\nParagraph **bold** and *emphasis*.\n\n- Item\n\n"
				+ "[Safe](https://example.org)\n\n```java\nSystem.out.println(\"<script>\");\n```\n");
		assertThat(html).contains("<h2>Title</h2>", "<strong>bold</strong>", "<em>emphasis</em>",
				"<li>Item</li>", "href=\"https://example.org\"", "<pre><code class=\"language-java\">",
				"&lt;script&gt;").doesNotContain("<script>");
	}

	@ParameterizedTest
	@ValueSource(strings = { "<script>alert(1)</script>", "text <img src=x onerror=alert(1)> end",
			"<iframe src=\"https://example.org\"></iframe>", "<style>body{display:none}</style>" })
	void rawInlineAndBlockHtmlIsEscaped(String markdown) {
		String html = renderer.render(markdown);
		assertThat(html).contains("&lt;").doesNotContain("<script", "<img", "<iframe", "<style");
	}

	@ParameterizedTest
	@ValueSource(strings = { "[bad](javascript:alert%281%29)", "[bad](JaVaScRiPt:alert%281%29)",
			"[bad](jav&#x61;script:alert%281%29)", "[bad](data:text/html,test)", "[bad](vbscript:test)" })
	void executableLinkTargetsAreRemoved(String markdown) {
		assertThat(renderer.render(markdown)).contains("href=\"\"")
				.doesNotContain("href=\"javascript:", "href=\"JaVaScRiPt:", "href=\"data:", "href=\"vbscript:");
	}

	@ParameterizedTest
	@ValueSource(strings = { "![alt](https://example.org/image.png)", "![alt](/brand/b-composition.png)",
			"[![alt](data:image/png,test)](https://example.org)" })
	void imageNodesRejectContentWithoutLeakingTheirUrl(String markdown) {
		assertThatThrownBy(() -> renderer.render(markdown)).isInstanceOf(IllegalArgumentException.class)
				.hasMessage("BTC_LEARNING_MARKDOWN_INVALID").hasNoCause();
	}

	@Test
	void templateLookingTextIsNeverInterpretedAndUnicodeIsPreserved() {
		assertThat(renderer.render("Explicación — ${7 * 7} #{message} th:text=\"unsafe\""))
				.contains("Explicación", "${7 * 7}", "#{message}");
	}

	@Test
	void sectionNavigationHasUniqueSafeTargetsAndEscapedContent() {
		var page = renderer.renderPage("## Same `int`\n\nText.\n\n## Same `int`\n\n<script>unsafe</script>");
		assertThat(page.sections()).containsExactly(
				new LessonHtmlRenderer.Section("lesson-section-1", "Same int"),
				new LessonHtmlRenderer.Section("lesson-section-2", "Same int"));
		assertThat(page.html()).contains("id=\"lesson-section-1\"", "id=\"lesson-section-2\"", "&lt;script&gt;")
				.doesNotContain("<script>");
		assertThat(renderer.renderPage("[bad](javascript:alert%281%29)").html()).contains("href=\"\"");
		assertThatThrownBy(() -> renderer.renderPage("![x](/private.png)")).hasMessage("BTC_LEARNING_MARKDOWN_INVALID");
	}

	@Test
	void blankContentIsNotPublishedAsSuccessfulHtml() {
		assertThatThrownBy(() -> renderer.render(" \n")).hasMessage("BTC_LEARNING_MARKDOWN_INVALID");
	}
}

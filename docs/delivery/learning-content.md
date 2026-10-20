# Local learning content

The ordered `published-units` list in
`src/main/resources/content/java-fundamentals/catalogue.properties` is the sole
publication list. F13 verified an empty list; the F14 local review candidate lists
only `source-to-jvm`. File presence never publishes a draft. Slugs contain lowercase
letters/digits separated by single hyphens. Final owner content review is recorded
in F14 evidence; Home/shared promotion remains F16 and no deployment is implied.

For each published slug, all `en`, `es`, `fr` directories require:

- UTF-8 `metadata.properties` with nonblank `course.title`, `course.summary`,
  `course.prerequisites`, `course.outcomes` and
  `unit.<slug>.title` entries.
- Nonblank `<slug>.md` body resources, preserved as authored text for rendering.

Catalogue load creates an immutable snapshot; publication changes require restart.
Duplicates, invalid identities and missing/blank locale resources fail with
`BTC_LEARNING_CONTENT_INVALID`, never content excerpts or resource paths. An empty
published list needs no unit/metadata files. Do not use JSON binding, filesystem
paths, a CMS or per-request resource lookup. Synthetic resources belong only to
tests; real unit authoring/review is F14 and Learn promotion is F16. The copied-JAR
harness replaces overlapping fixture content entries once, verifies unique ZIP
names and preserves the normal executable's digest. Empty-catalogue behaviour
remains covered by explicit loader/MVC fixtures rather than production assumptions.

## Rendering and route policy

The three learning GET/HEAD shapes (`/learn`, `/learn/java-fundamentals` and one
unit segment) reach publication lookup and return safe localised 404 when absent.
Other courses, nested paths, unknown tools and body-bearing learning methods retain
403 denial. Only exact published page identities are preference-return targets;
queries, fragments, duplicates and unpublished paths fall back to `/`.

Tomcat still rejects encoded slashes during URI decoding. When that rejection
prevents servlet-context mapping, a narrow engine valve applies the same response
headers as the application filters before the container emits its generic error.
It does not decode/rewrite paths, admit requests or change normal response handling.
This covers the observed malformed-URI rejection, not every transport-level failure
that can occur before the container pipeline is entered.

CommonMark 0.30.1 supports headings, paragraphs, lists, emphasis, safe links and
fenced code. Raw HTML is escaped, not executed; template-looking text is inert.
Links use the built-in explicit http/https/mailto scheme allowlist (relative links
are also permitted). JavaScript, data and other schemes are removed. Markdown
image nodes and blank bodies fail with `BTC_LEARNING_MARKDOWN_INVALID`, without
content excerpts or underlying causes. Invalid content never renders as a successful
lesson. The sole raw HTML insertion receives only configured renderer output;
all metadata remains Thymeleaf-escaped. No highlighting service/editor is loaded.

The dependency's original BSD licence is retained at `META-INF/LICENSE.txt` inside
the unmodified nested `BOOT-INF/lib/commonmark-0.30.1.jar`. Its notices apply to
that dependency, not to this project's code, branding or lesson content. Dependency
advisory reassessment and packaged/browser acceptance are separate recorded gates.

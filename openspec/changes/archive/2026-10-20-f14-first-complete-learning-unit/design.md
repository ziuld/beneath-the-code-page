# Design

## Context

See `proposal.md` for motivation. F13 is accepted at `0742b43`/`a64b7d2` and
archived. Its production catalogue is empty; immutable course metadata currently
contains title/summary only. The overview already lists published units, and the
unit template has one safe Markdown-body insertion point. The renderer rejects
images and escapes raw HTML. No answer route or client reading dependency exists.

Current tests deliberately expect empty production learning routes. The copied-JAR
builder requires an empty production catalogue and appends synthetic locale
metadata. Once production metadata exists, blindly appending the same ZIP entries
would create duplicates. F14 must update these assumptions, not disable the tests.

## Goals / Non-Goals

**Goals:** one technically verified and owner-reviewed unit in three languages;
honest course scope; reuse the existing renderer, routes, loader, shell and tests.

**Non-Goals:** second unit, full syllabus, answer-route framework, online compiler,
new parser/dependency, image/highlighting support, progress tracking, Home Learn
promotion, redesign or automatic security-approval renewal. ADR009 requires only
Chromium; Firefox/WebKit remain optional post-MVP evaluation.

## Decisions

### 1. A short owner-reviewed brief, not a course design programme

Proposed identity: `source-to-jvm`, served by the existing one-segment unit route.
Agree this brief through the existing UH01 brief-review work before final content
publication; proposal completion is not educational approval.

- Audience: beginners who can read a small example; no prior Java course assumed.
- Practical prerequisites: for reproducing commands locally, the baseline JDK25
  and basic file/terminal use. Reading the page requires neither installation nor
  an account. Do not turn the unit into an OS installation guide.
- Outcomes: distinguish source and bytecode; explain `javac` versus `java`; trace
  which compiled artifact is executed; distinguish the JDK tools from the JVM;
  explain why changing source alone does not change an already compiled class.
- Worked example: one conventional `Main.java` with an explicit main method and
  deterministic greeting. Show explicit `javac` compilation and `java` class
  execution, not source-file launch, preview features, an IDE or a build tool.
- Exercise: compile the greeting, change its source text and run the existing
  class without recompiling; explain the old output, then recompile and explain
  the new output. Verify both states rather than assume the answer.
- Explain that bytecode needs a compatible JVM; interpretation/JIT are execution
  techniques, not a promise that every JVM or every execution follows one path.

Wording may improve during translation/review without changing these outcomes.
Material changes to the educational scope require owner agreement, not extra units.

### 2. Minimal metadata extension and honest overview

Extend `LearningCatalogue.CourseText` and `ClasspathCourseContentSource` with two
nonblank localised text values: `course.prerequisites` and `course.outcomes`.
Keep title/summary and require all fields for nonempty publication in EN/ES/FR.
Use ordinary escaped overview text with resource-backed headings and a localised
one-unit/course-incomplete notice. Do not build a syllabus tree, list parser,
Markdown metadata renderer or separate content port. Empty catalogues stay valid.

Update existing Java constructors/fixture metadata alongside the model; there is
no persisted schema requiring compatibility constructors. Tests reject missing or
blank new fields for published data. Metadata and UI labels stay in their existing
resource locations, not duplicated browser dictionaries.

### 3. One Markdown lesson with a visible answer and text diagram

Author `en`, `es`, `fr` metadata and `source-to-jvm.md` under the existing course
root. Use ordinary headings, paragraphs/lists and fenced code. Render the pipeline
as a short text diagram in a code block, accompanied by localised prose explaining
each arrow. This fits the accepted image prohibition without SVG, raw HTML,
Mermaid, remote resources or renderer extensions.

Place a clearly labelled exercise followed by a clearly labelled answer on the
same page, visible without interaction. This satisfies the answer-reading journey
without a new route, automatic heading-ID generator, disclosure widget or state.
The trade-off is that the answer is not hidden; avoiding accidental spoilers is
not an existing acceptance requirement. Preserve inert/escaped examples and the
sole renderer-owned HTML insertion boundary.

Verify authored commands using the installed baseline JDK in a project-local
temporary directory. Capture `java`/`javac` version, exact commands, stdout and
exit codes for the worked example and both exercise states. Optional `javap`
inspection may corroborate bytecode; do not snapshot unstable compiler output.
No example execution is exposed as an application endpoint or browser feature.
Use the Java25 `javac`, `java` and `javap` manuals as technical references.

### 4. Review first; publish exactly one resource identity

Draft resources may exist outside the published list. After technical and EN/ES/FR
educational/language review, set `published-units=source-to-jvm`. Verify exactly
one normal-JAR unit, complete translations and no previous/next links. The three
existing learning route shapes and preference-return composition need no new
route policy; preserve missing/draft rejection and all response protections.

Keep Home/shared Learn promotion disabled for F16. Direct learning routes become
readable in F14; this is content publication, not deployment or course completion.

### 5. Adapt the accepted harness instead of adding another acceptance suite

- Replace the loader test's empty-production assertion with exact real-unit and
  locale-completeness assertions. Keep an explicit empty-source test.
- Replace default MVC empty-production expectations with real landing/course/unit
  responses and unpublished/synthetic404 assertions. Exercise empty-catalogue404
  using a test-only source override, not a second application/runtime.
- Change `component_fixture` to accept the expected real production catalogue,
  still checking synthetic resource/class absence and normal-JAR digest.
  Overlay matching content resources while copying the original entries, then
  append only absent overlay paths; assert unique ZIP entry names. This avoids
  duplicate metadata/catalogue entries once the production locales exist.
- Retain the copied synthetic hostile-content/ordering suite and update its
  metadata. The overlay catalogue exposes only its fixture identity, even though
  inert original resources may remain in the copied JAR.
- Extend `learning.spec.mjs` with the real EN/ES/FR overview/unit/exercise/answer
  journey. Normal `/learn` and course are now200; synthetic/draft paths remain404.
  Keep CSP/network/no-editor/no-JS/native locale checks and retained regressions.

Run the normal Maven build and packaged Chromium suite once against the final
candidate; reuse unchanged accepted tool/manual evidence. Do not install or run
Firefox/WebKit. Record one combined new-content/overview owner review rather than
duplicate technical/language/keyboard/zoom acceptance programmes.

### 6. Task sequencing and security remain explicit

During apply refine `F14-UH02.depends_on` and its T01 dependency from whole UH01 to
`F14-UH01-T02`, the agreed brief. Record owner agreement before using that task as
the prerequisite. UH01-T03 includes the final published-overview comparison and
stays incomplete until publication; do not close the story early to unblock
authoring. Finish both stories through one integrated acceptance. Retain all11
canonical task IDs and18h baseline/10h forecast; this changes scheduling only.

Model/loader/publication metadata changes invalidate the F13 security fingerprint.
Reassess the actual F14 candidate and each existing bounded finding. Keep Boot4.1.1
and the2026-11-01 expiry; obtain explicit owner approval before replacing a
fingerprint, then run the existing gate/policy tests. No automatic waiver or
independent managed-version override. Final V1 security review remains required.

## Risks / Trade-offs

- Inaccurate JVM simplification → baseline-JDK command evidence, technical sources
  and explicit interpretation/JIT/version caveats.
- Translation drift → same code identity/outcomes in EN/ES/FR and owner review;
  do not call machine-generated text independently language-reviewed.
- Test fixture assumptions hide real publication failures → normal-JAR assertions,
  unique overlay entries and preserved empty/draft/synthetic coverage.
- Metadata extension grows into a CMS → two escaped text fields only.
- Security approval expires or candidate changes → fail closed, reassess and report
  the exact blocker rather than renew silently.

## Migration Plan

No database, service migration or deployment. During apply agree the brief, extend
metadata/fixtures, author and verify draft translations, complete owner review,
publish one identity and run integrated checks. Roll back publication by clearing
the published list while retaining safe empty-catalogue behaviour; remove no user
data. F16 later enables site promotion. Preserve separate archival edits and do
not commit, push, sync or archive without applicable authorisation.

## References

- https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html
- https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html
- https://docs.oracle.com/en/java/javase/25/docs/specs/man/javap.html

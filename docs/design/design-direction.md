# Shared design direction — F18

Owner decision,2026-10-20: “yes” approves the refined Learn direction, including
consistent filled primary CTA, more comfortable mobile spacing/readability and
a quieter B motif behind the mobile heading. The owner explicitly includes the
lesson reader, requests tools styled like the supplied workspace image, and asks
for a final consolidation of all pages into one standard design system.

## References and meaning

- [Approved Learn direction](references/learn-approved-direction.png): editorial
  serif hero, dark warm-white palette, generous separation, course panel beside
  three-unit preview; stacked mobile layout. Preserve the real B asset, not a
  generated approximation. Implement accurate content and accessible controls.
- [Tools style reference](references/tools-workspace-style-reference.png): dark
  professional workspace, clear pane boundaries, restrained toolbar, readable
  code, subtle borders and purposeful spacing. This approves visual inspiration,
  not a final Tools design. The pictured node logo, file explorer, analytics,
  flow visualiser, system graphs, accounts and project persistence are not product
  requirements or authorised new features. Use existing actual tool operations.

## Course/reader approval and Home steering,2026-10-20

The owner explicitly said “i approved those styles, i like”, accepting the course
and refined lesson-reader visual directions. [Course reference](references/course-approved-direction.png)
and [reader reference](references/lesson-reader-approved-direction.png) are preserved.
Implementation must retain the entire approved lesson, populated exercises and
reasoned answers, naturally scrolling article, readable mobile code with panel
scrolling, section anchors and grouped bottom previous/next/back navigation.
The mockup's abbreviated prose and empty exercise are not replacement content.

The owner requests Home exploration now using the
[layered illustration reference](references/home-layered-illustration-reference.png).
Replace the large Home hero B decoration with a restrained exploded-layer graphic;
retain the actual header B identity and established typography/palette. This is a
specific exception for Home's hero artwork, not a logo redesign or adoption of the
reference's platform/Enterprise/analytics/installer features. The first Home prompt is retained as history; the refined direction is now
provisionally accepted below. Original prompt: [Home concept](home-concept-prompt.md). Tools reference/concept remains
pending. Owner has steered the exploration order to Home before finishing Tools.

## Provisional Home approval and Tools structure,2026-10-20

The owner replied “yes for now yes”, provisionally accepting the
[refined Home composition](references/home-provisionally-approved-direction.png).
Retain its light technical illustration and Tools/Learn destinations; implementation
must give the mobile headline enough width, keep artwork clear of text, use the
accurate current supporting copy and consistent “Explore tools” / “Start learning”
actions. One course is available; do not imply a course catalogue with many courses.
Final consistency review may refine this provisional direction.

Owner now requests Tools-page structure. Actual template inspection confirms a
three-tool catalogue; Formatter has input, indentation2/4, Format/Cancel/Copy/Clear
and read-only output; Minifier has input, Minify/Cancel/Copy/Clear and output;
Validator has input, Validate/Cancel/Clear and status/diagnostics, no output pane.
Prompts prepared: [catalogue](tools-catalogue-concept-prompt.md) and
[workspace](tools-workspace-concept-prompt.md). Adapt the earlier pane/toolbar
reference to actual functionality; preserve errors/busy/stale/no-JS states and
browser-local payload privacy. Tools concept/agreement remains pending.

## Tools agreement and global implementation plan,2026-10-20

Owner explicitly approved both [Tools catalogue](references/tools-catalogue-approved-direction.png)
and [workspace](references/tools-workspace-approved-direction.png) with the recorded
refinements: consistent filled catalogue actions including mobile Minifier, tighter
card composition, normal tool navigation instead of rotated labels, taller mobile
input, accurate action labels, real disabled/stale behaviour, existing keyboard
help and actual per-tool panes/controls. All requested page directions are now
agreed, with Home still provisional for the final integrated review.

Owner requests a plan for global redesign/homogenisation: central styles with
single-point propagation, consistent components, semantic mobile-first layouts
and robust maintainable code. [Implementation plan](global-redesign-plan.md)
records file ownership, bounded execution slices, full-page/state coverage,
behaviour/security preservation and final owner acceptance. T03 complete; T04
ready, not started. No application implementation in this planning response.

## Page-by-page sequence

1. Learn landing: direction agreed; implementation still waits for the page family.
2. Course overview: visual direction agreed; retain summary, prerequisites/outcomes and three ordered units.
3. Lesson reader: visual direction agreed; retain readable explanation, examples/output, exercise and visible
   reasoned answer; useful breadcrumbs and previous/next/back links.
4. Home and shared shell: refined composition provisionally accepted with recorded
   mobile/copy/action refinements; final consistency review remains.
5. Tools catalogue and individual tool workspace: translate the reference's pane/
   toolbar grammar into actual input/output, action, error and status controls.
6. Final consolidation and verification across Home, Learn, course, lesson, Tools,
   tool workspaces and safe errors: one palette, type scale, spacing scale, borders,
   surfaces, buttons, cards, header/footer, language controls, focus and state styles.
   Reading and editing get appropriate layouts using those same shared tokens.

No page concept is final until explicitly agreed. Preserve routes, locale flow,
EN/ES/FR, browser-local payload privacy, no-JS reading and existing tool behaviour.
Use real content; no fake progress, ratings, students, completed-course claims or
new backend services. Existing lesson answers remain visible without JavaScript.
Final visual implementation must be checked at narrow/wide widths, actual200%
browser zoom, keyboard focus and supported locales; images alone prove none of these.
No independent page-specific design systems or speculative component framework.

## Implementation continuation,2026-10-21

The owner requested continuation. T04 is active; I01 implements central tokens,
ordered CSS ownership, shared control variants and scoped editor integration.
See [component contract](component-contract.md) and implementation evidence at
`harness/evidence/F18-global-redesign.md`. Page-family migration and final runtime
visual acceptance remain pending; earlier “not started” statements record the
planning checkpoint.

## Integrated candidate,2026-10-21

I01–I07 now implemented and verified across all pages. T04 complete; T05 owner
runtime review pending, including Home's provisional direction in the integrated
site. Guide:f18-owner-review.md; actual evidence:harness/evidence/F18-global-redesign.md.
No new owner runtime approval inferred from the concept decisions above.

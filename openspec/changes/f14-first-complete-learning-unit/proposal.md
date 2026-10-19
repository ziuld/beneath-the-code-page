# Proposal

## Why

F13 provides accepted learning infrastructure but deliberately publishes no lessons.
F14 supplies the MVP's one complete, reviewed EN/ES/FR unit so learners can follow
the source-to-bytecode-to-JVM mental model without implying a finished course.

## What Changes

- Publish exactly one Java Fundamentals unit with prerequisites, learning outcomes,
  an explanation, text diagram, verified Java example, exercise and reasoned answer.
- Show the first unit's prerequisites/outcomes on the course overview, explicitly
  stating that one unit is available and the wider course is not complete.
- Use the existing localised resources, safe renderer and native navigation.
  Present the answer as a clearly labelled section on the same unit page, usable
  without JavaScript; no new answer route, executable playground or progress state.
- Replace F13-only empty-production assumptions in tests with a real one-unit
  journey while preserving empty-catalogue and hostile synthetic fixture coverage.
- Obtain the existing required brief and educational/translation owner reviews;
  verify the example with the baseline JDK before publishing the unit.
- Keep Chromium as the sole required browser (ADR009), Boot4.1.1 and the shared
  design/CSP. Reassess invalidated bounded security approvals explicitly.

## Capabilities

### New Capabilities

None; extend the two accepted learning capabilities rather than create a parallel
course or content framework.

### Modified Capabilities

- `learning-navigation`: first-unit prerequisites/outcomes, honest one-unit course
  scope and no links to unavailable units.
- `localised-learning-content`: reviewed source-to-JVM explanation/example and an
  accessible explanatory exercise answer in EN/ES/FR.

## Impact

During apply, extend the existing course metadata/loader and overview template,
author one localised resource set and adjust the existing Java/copied-JAR/Chromium
checks for production publication. No new dependency, parser, content port, route
family, browser entry point, accounts, storage, containers or external services.

Keep all11 canonical F14 task IDs and18h baseline/10h forecast. Refine the UH02
prerequisite to the agreed brief task rather than closing UH01 before its final
published overview can be verified; use one combined acceptance record. Real
content publication is F14; Home/shared Learn promotion and overall polish remain
F16. Extra units/full syllabus remain frozen F15/V2. This proposal authorises no
implementation, security fingerprint renewal, commit, push or deployment.

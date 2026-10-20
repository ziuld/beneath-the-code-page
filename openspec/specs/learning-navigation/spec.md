# learning-navigation Specification

## Purpose

Let learners find published Java Fundamentals units and retain their course and
language context through a small server-rendered learning journey.

## Requirements

### Requirement: F13-UH01-R01 — Navigate published units in course context

Published learning pages SHALL provide Learn, Java Fundamentals course and unit
destinations with localised headings, breadcrumbs and return links. Unit pages
SHALL link only to available previous/next published units in catalogue order;
unavailable destinations SHALL NOT appear as working links.

#### Scenario: F13-UH01-AC01 — Navigate the single published unit

- **GIVEN** a synthetic catalogue contains exactly one publishable unit
- **WHEN** the learner follows Learn to the course overview and unit page
- **THEN** course context, breadcrumbs and a return link are available
- **AND** neither a nonexistent previous nor next link appears

#### Scenario: Respect ordering and publication boundaries

- **GIVEN** synthetic data contains two published units and an unpublished unit
- **WHEN** the learner opens the first and last published unit
- **THEN** their next/previous links agree with published catalogue order
- **AND** no link crosses an end boundary or points to the unpublished unit

### Requirement: F13-UH01-R02 — Return safe missing-learning responses

Unknown or unpublished units under `/learn/java-fundamentals/{lessonSlug}` SHALL
return a safe localised 404 in EN/ES/FR, without placeholder lessons or disclosure
of raw paths, content, exceptions or stack traces. Unknown values SHALL NOT be
interpreted as filesystem paths or resource locations.

#### Scenario: F13-UH01-AC02 — Do not expose an unpublished lesson

- **GIVEN** the requested lesson is absent from the published catalogue, even if a draft resource exists
- **WHEN** the learner requests its route
- **THEN** a localised 404 appears without placeholder course content or a draft title

#### Scenario: Reject resource-path manipulation

- **WHEN** an unknown slug or encoded traversal-like value is requested
- **THEN** it cannot read arbitrary classpath or filesystem content
- **AND** recognised missing learning-route requests receive safe 404 while malformed requests retain safe rejection without request-data disclosure

### Requirement: Keep learning publication separate from infrastructure fixtures

Only complete published catalogue entries SHALL be discoverable through learning
pages. An empty published catalogue SHALL yield safe localised 404 responses for
the learning landing/course pages rather than an empty public course. Synthetic
content SHALL NOT be packaged as production lessons or enable production Learn
promotion before the reviewed first unit is ready.

#### Scenario: Keep F13 infrastructure out of production promotion

- **GIVEN** only synthetic test content exists and the production catalogue is empty
- **WHEN** the normal packaged application is inspected
- **THEN** Home/shared navigation does not promote Learn and learning requests cannot expose synthetic units
- **AND** the existing Home and Tools journeys remain usable

### Requirement: Preserve locale and native learning navigation

Learning pages SHALL reuse the shared EN/ES/FR interface, native language selector
and keyboard-visible navigation without requiring JavaScript or loading tool
editors/workers. Valid preference submissions SHALL return only to the exact
published learning page; unsafe, ambiguous or unpublished return targets SHALL
retain the existing safe fallback.

#### Scenario: Change language without losing the unit

- **GIVEN** a complete synthetic published unit and a valid preference form
- **WHEN** the learner selects Spanish or French and submits
- **THEN** the cookie records that language and the 303 returns to the same exact published unit path
- **AND** no lang query, arbitrary slug or unsafe return target overrides the saved preference

#### Scenario: Read and navigate without enhancement

- **WHEN** a published fixture journey is traversed by keyboard with JavaScript disabled
- **THEN** headings, content, breadcrumbs, links and native language controls remain usable in EN/ES/FR
- **AND** focus, narrow reflow and actual 200% zoom meet the retained quality criteria without a speech-review or full-conformance claim

#### Scenario: Preserve an explicit GET language without a cookie write

- **GIVEN** the learner opens a learning page with supported lang=fr while the saved preference is English
- **WHEN** the learner follows its course, breadcrumb or unit navigation
- **THEN** the explicit French reading context is retained without changing the preference cookie
- **AND** an explicit language-preference POST still returns to a clean allowlisted path and uses the newly saved preference

### Requirement: F14-UH01-R01 — Explain the first unit scope

When the first reviewed unit is published, the Java Fundamentals overview SHALL
state that unit's prerequisites and learning outcomes in the selected EN/ES/FR
language and identify exactly one available unit.

#### Scenario: F14-UH01-AC01 — Understand the course scope

- **GIVEN** the owner has accepted the short source-to-JVM brief and the complete first unit is published
- **WHEN** the learner opens the course overview in English, Spanish or French
- **THEN** the prerequisites and outcomes agree with that brief in the selected language
- **AND** exactly one available unit links to the reviewed lesson

#### Scenario: Read scope without enhancement

- **WHEN** the learner opens the published overview with JavaScript disabled
- **THEN** the prerequisites, outcomes and unit link remain readable and usable
- **AND** native language selection preserves the published course identity

### Requirement: F14-UH01-R02 — Do not advertise an unfinished course as complete

While additional Java Fundamentals units are not reviewed and published, the
learning pages SHALL describe the course as containing one available unit rather
than a complete course, and SHALL NOT offer working links to unavailable units.

#### Scenario: F14-UH01-AC02 — Keep additional units outside the MVP

- **GIVEN** only the first unit is reviewed and published and further units remain outside the MVP
- **WHEN** the learner inspects Learn, the overview and unit navigation
- **THEN** no unavailable unit appears as a working lesson link
- **AND** the course is not advertised as complete and the single unit has no previous/next links

#### Scenario: Keep content publication separate from site promotion

- **GIVEN** the reviewed first unit is published before final website integration
- **WHEN** the normal application serves its learning routes
- **THEN** the real overview and unit are readable directly without exposing synthetic test lessons
- **AND** Home/shared Learn promotion remains unchanged until its separate integration work

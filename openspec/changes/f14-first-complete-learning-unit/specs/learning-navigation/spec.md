# Spec Delta

## ADDED Requirements

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

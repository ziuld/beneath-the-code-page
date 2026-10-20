# Spec Delta

## ADDED Requirements

### Requirement: Integrate reviewed learning into site navigation

When final website integration enables the reviewed first unit, Home and the
shared navigation SHALL provide actionable Learn links to its published landing
page in EN/ES/FR. Following Home, Tools and learning links SHALL preserve the
active supported reading language without persisting a new preference on GET.

#### Scenario: Discover the reviewed unit from Home

- **GIVEN** the reviewed source-to-JVM unit is published and final website integration is enabled
- **WHEN** a visitor follows Home to Learn, Java Fundamentals and the unit in English, Spanish or French
- **THEN** every destination succeeds and the same-page exercise and explanatory answer are readable
- **AND** Home and shared Learn links are usable without JavaScript
- **AND** the course still identifies exactly one available unit without claiming a complete course

#### Scenario: Preserve an explicit language across the integrated site

- **GIVEN** an explicit supported reading language differs from the saved preference
- **WHEN** the visitor follows shared Home, Tools or Learn links and then course/unit links
- **THEN** destinations retain the explicit reading language without writing a language preference cookie
- **AND** the native preference POST still returns to the clean allowlisted current page and applies the newly saved language

#### Scenario: Keep unpublished content outside integration

- **GIVEN** a learning catalogue is empty or a requested unit is unpublished
- **WHEN** the application is reviewed with that catalogue
- **THEN** no actionable learning link points to an unavailable destination and missing learning requests retain safe localised rejection
- **AND** synthetic fixtures cannot become production units through site promotion

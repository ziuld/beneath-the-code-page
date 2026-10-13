# Design

## Context

See [proposal.md](proposal.md) for motivation and [the delta](specs/shared-interface/spec.md) for the contract. F03-UH01 is accepted/integrated (`f2a3e3c`, closure `baf975c`), archived and incrementally migrated to the main `home-page` spec. Its archival/migration metadata is still uncommitted and must be preserved. F03-UH02 is planned, 10h, with canonical T01–T05 in `plan.json`.

Inspection found:
- `base.css` contains one cascade layer with colour, focus, spacing and width variables, but typography stacks, sizes, gutters, spacing and component rules still largely use direct values. Home-specific hero rules and shared navbar/footer/card rules coexist; no button foundation exists.
- `fragments/shell.html` renders header/footer using EN/ES/FR messages. Home cards are inline markup. The header's Home current-page state is hard-coded; the only published production page remains Home. No production button action, selector, preference endpoint or menu toggle exists.
- Three UTF-8 catalogues have 17 matching keys. `HomeLocaleConfiguration` matches supported request-header locales and defaults to English; system-locale message fallback is disabled. The controller supplies the resolved language to the document.
- Existing MVC tests cover broad locale content and key/placeholder parity. They do not assert every navigation/accessible-name message independently; all current messages have no numbered placeholders.
- Six packaged Chromium tests cover JavaScript-disabled content and the three current links, outline style, narrow reflow, selected text contrasts, CSS zoom and reduced motion. They do not prove reusable button states, focus contrast/obscuration or actual browser-UI zoom. These are baseline evidence, not new story completion.
- Pinned browser tooling/runner and a separate SHA-pinned, read-only CI workflow already exist. The B image is the complete supplied composition, not a standalone/vector master. Exact font licences remain open; preserve system stacks.

## Goals / Non-Goals

**Goals:** finish the bounded shared navbar/footer/card/button foundation, reuse it in Home without visual redesign, and provide R01/AC01 and R02/AC02 evidence for labels and reachable controls. Keep static SSR usable without JavaScript and retain inward dependencies.

**Non-Goals:** no domain service, new component framework, client router, preferences/language selector, dropdown/menu interaction, payload processing, product destination, public component gallery or security-policy change. No speculative dialog/editor/select library. No custom font purchase/download or logo manipulation.

## Decisions

### 1. Extend the existing shared CSS, not a second design system

Consolidate colour roles, serif/sans/monospace stacks, type sizes/line heights, spacing, gutters, widths, borders/radii, focus and motion states under the existing design-system styles. Keep a small entry that imports shared token/base/component styles and the actual Home layout, with deterministic cascade ordering. Only introduce tokens with real uses; CSS media-query thresholds may remain documented literals because custom properties cannot substitute directly into ordinary media queries.

Preserve the current visual hierarchy and image bytes. Build no ornamental motion; shared interactive states must stay usable with reduced-motion enabled. Essential text/status/focus must use role-checked contrasts, not the decorative muted value. Reuse the current `.section-card` integration hook where practical so accepted tests remain meaningful.

Alternative: leaving all values page-local makes reuse drift; a new framework or comprehensive design-system package is disproportionate. File separation is a bounded consequence of T02, not permission for unrelated frontend refactoring.

### 2. Semantic fragments and native controls

Keep shared header/footer fragments and extract the real section-card markup into a small fragment. Pass the current page/path deliberately to shared navigation rather than globally marking every shell instance as Home. Publication descriptors stay code-owned; unpublished destinations remain non-actionable and unfocusable. Do not make an entire card clickable or nest interactive elements.

Add a minimal reusable native button fragment/style with resource-key label, explicit `type="button"`, enabled/disabled states and visible focus. Native links remain links; native buttons remain actions. Use bounded arguments, not arbitrary raw HTML/attribute maps. Do not add a dummy action to production Home merely to demonstrate the button; render enabled/disabled button cases through a test-only component fixture. Document that actual action/submit semantics belong to their future feature.

Use MVC tests and an isolated copied fixture JAR, following existing F02 fixture assembly, to render production fragments with real manifest assets and message resources. Fixture-only route/security wiring must never enter the normal JAR or production security configuration. Browser checks on production Home remain separate from component-fixture assertions. No new browser processing code is required for CSS/native semantics.

Alternative: a public gallery or pretend Home action would expand product scope; a hand-written test replica would not test the production component.

### 3. Verify the active locale, do not implement preference selection

Reuse the current resolver/message source without changing F04's future precedence boundary. Keep all shared visible labels, metadata and accessibility names in the existing EN/ES/FR catalogues; no independent browser catalogue, hard-coded fallback label or raw message insertion. Add only keys consumed by actual fragments/tests.

Extend MVC coverage to inspect exact Home/header/footer/skip-link/nav/image/control names under each locale, document language, unresolved keys and escaping. Keep whole-catalogue key/placeholder parity and add positive/negative synthetic placeholder cases so a zero-placeholder catalogue does not create vacuous confidence. Distinguish a missing translation key from deliberately identical brand text; human translation review is a separate result.

Alternative: accepting English fallback on a missing French key can mask drift; adding `?lang`, a selector or cookie now would silently implement F04-UH01-T02.

### 4. Prove keyboard behaviour and role-level visual checks

Extend the existing pinned packaged-browser suite rather than replacing its F03-UH01 cases. R01/AC01 includes exact French navigation/accessibility names; repeat EN/ES/FR with JavaScript enabled and disabled. R02/AC02 traverses all production Home controls in forward/reverse order, verifies skip-link activation and ability to leave each control, no focus on unavailable sections, visible/unobscured focus and no trap. Test real production fragments' enabled/disabled buttons in the isolated fixture, including Space/Enter native activation without a network submission; fixture-only observable actions are not product capabilities.

At narrow and wide sizes, measure expected normal-text/large-text/focus contrasts on actual backgrounds, reflow and target geometry, including hover/focus/disabled states where applicable. Disabled-control contrast is recorded as a usability check, not falsely described as a mandatory WCAG text threshold. Check all essential text roles, not only card paragraphs. Verify no unexpected page request, cookie/storage or external asset dependency is introduced by the shell.

Automated CSS layout zoom/text enlargement remain supplemental, not proof of browser-UI zoom. The owner reported that Home review steps 1–3 (start/Home, browser zoom/keyboard and languages) passed and confirmed accepting the automated component checks instead of repeating the fixture review manually. Record that owner report without inventing browser/version/viewport details or claiming the omitted fixture review ran. This explicitly approved, story-specific acceptance decision removes the redundant manual-component review gate; R01/R02 and automated checks remain unchanged. These checks target this shell, not WCAG certification, full screen-reader/editor acceptance or F04/CSP compliance.

Alternative: repeating existing outline-style checks alone misses focus visibility/obscuration and component states; CSS zoom is not an honest replacement for the canonical zoom review.

## Risks / Trade-offs

- [Accepted Home appearance drifts during extraction] → Preserve source B bytes and compare before/after same-viewport EN/ES/FR screenshots; request a decision before a material redesign.
- [Button foundation exists only in a fixture] → Exercise the production fragment/styles with native semantics and document coverage explicitly; do not claim a Home action exists.
- [Fixture becomes a production bypass] → Copy fixture types/templates/security into isolated JARs only, inspect normal JAR exclusions and preserve its digest.
- [Locale parity passes while accessible names stay English] → Assert exact rendered label/name values under each resolved locale and perform human translation review.
- [Automated accessibility checks overstate acceptance] → Record actual manual reviews/limitations separately; no synthetic passing result, certification claim or implied browser-UI zoom equivalence.
- [More tests duplicate old evidence] → Reuse existing assertions where appropriate, retain canonical story-specific R/AC links and add tests for identified coverage gaps.
- [Uncommitted prior migration is mistaken for new work] → Inspect status before apply, preserve those files, and scope any authorised commit deliberately.

## Migration Plan

After a separate apply request, implement the small token/component/resource slice with adjacent tests, extend story acceptance checks and reuse the existing runner/CI. Run clean Maven verification, original health smoke, packaged Home/component browser cases, F02 watcher/startup regressions and planning gates. Record actual checks and owner effort only when supplied.

F03-UH02 stays plan-owned until an explicit ADR 004 ownership decision; this delta is a planning proposal, not a second main editable source. Integration/acceptance closes T05/story; F03 can close only if both required stories and feature gates pass. Keep F04 planned. No deployment or data migration exists; rollback is an authorised revert of this bounded slice, preserving accepted Home and F02 assets.

# Shared interface foundations

F03-UH02 extends the accepted Home, not its product or locale-selection scope.

## Styles

`design-system/styles/base.css` preserves the single `btc-base` cascade layer and imports tokens, shared components and Home layout in that order. Tokens cover used canvas/surface/text/secondary/border/focus roles, system body/display font stacks, type/line heights, spacing and border/focus geometry. Borders are decorative; essential labels use text/secondary roles. There is no supplied/licensed custom font or monospace component to tokenise yet.

The literal `48rem` breakpoint is shared by component/Home rules: ordinary media queries cannot interpolate custom properties. Home-specific composition dimensions and text measure stay local. Cards have square corners; no unused radius token is introduced. Hover thickens link underlines, keyboard focus has a bright two-pixel outline with four-pixel offset, and the skip link is revealed on focus. No animated transition is introduced, so these states are immediate under reduced motion as well.

The skip link has a 0.75rem top inset when revealed, keeping its offset outline inside the viewport; its hidden default state does not change the normal Home layout.

## Fragments

`fragments/shell :: header(currentPath)` takes a code-owned current path and the existing `sections` model. It marks only matching published destinations current, never an unavailable descriptor. `footer` needs only message resources. `fragments/components :: sectionCard(section)` takes the immutable publication descriptor, uses its unique ID for the heading association and its resource keys for escaped text. Cards remain articles, with only the published heading rendered as a link; no nested controls or clickable-card wrapper.

`button(labelKey, disabled)` is an escaped, resource-backed native `type="button"` action foundation. Its enabled/hover/pressed/disabled/focus states use shared roles and immediate rendering without motion. Real action/submit semantics belong to the consuming feature. Home has no invented button action. The enabled/disabled cases are rendered inside a form only in `src/test/resources/templates/shell-fixture.html` to detect accidental submission. Test-only listeners observe native activation; they are not a product feature.

After Maven verification, `python3 scripts/verify-home-browser.py` runs both the normal Home executable and an isolated copied component-fixture executable. The normal JAR is checked for fixture exclusion and unchanged digest; copied fixture classes/security/template are cleaned up with bounded process termination. Production routing/security are unchanged, and fixture-only published descriptors do not publish `/tools` in the application.

## Visual regression capture

Build the normal executable JAR, then run:

```sh
python3 scripts/verify-home-browser.py --snapshot target/shared-shell-before
# Rebuild after the change.
python3 scripts/verify-home-browser.py --snapshot target/shared-shell-after
```

The helper uses the locked project-local Chromium, EN/ES/FR locales and 320/1280 CSS-pixel widths with a 900-pixel viewport height. It starts only the normal executable on a dynamic loopback port and cleans it up. These captures are visual regression evidence, not human translation, browser-UI zoom or accessibility acceptance.

Preserve captures outside `target` before a Maven clean. For a reference-style comparison against an unchanged template, `--snapshot-reference-css <file>` substitutes the specified stylesheet only in the browser; report that as a reconstruction, not an original-JAR capture.

## Required human review (checklist 4.2)

**Accepted review decision, 2026-10-13:** the owner reported steps 1–3 of the supplied Home walkthrough passed and explicitly accepted the passing automated component coverage instead of repeating fixture testing manually. Browser/version/viewport details were not supplied. The walkthrough below remains available for reproduction, not a remaining gate for this story. See `harness/evidence/F03-UH02-shared-shell.md`; no omitted manual test is claimed as executed.

Start the normal executable on loopback:

```sh
java -jar target/beneath-the-code-0.1.0-SNAPSHOT.jar --server.address=127.0.0.1 --server.port=8080
```

Review `http://127.0.0.1:8080/` at actual **200% browser-menu zoom**, not CSS zoom or display scaling. Repeat narrow/wide layouts and Tab/Shift+Tab/skip-link activation; check complete focus outlines, no trap, clipped text or lost controls, original B legibility and no colour-only information. Resolve EN/ES/FR by changing browser preferred languages (the application has no language selector yet); verify the document language and review shared copy/accessible names against `src/main/resources/i18n/messages*.properties`.

For the real shared button and alternate current-page fixture, create a separate test-only executable after Maven verification:

```sh
python3 -c 'import runpy; from pathlib import Path; module = runpy.run_path("scripts/verify-home-browser.py"); print(module.get("component_fixture")(Path("target/beneath-the-code-0.1.0-SNAPSHOT.jar")))'
java -jar target/shell-browser-fixture.jar --server.address=127.0.0.1 --server.port=8081
```

Review `http://127.0.0.1:8081/__shell-fixture` in the same locale/zoom/keyboard matrix. The fixture-only Tools link has no destination page and must not be mistaken for a published product route; test its focus/current state, not a fictitious Tools page. Check the enabled/disabled translated buttons and card states. Stop both servers with Ctrl+C. The normal browser runner cleans up its fixture copy on the next automated run.

Record reviewer, date, browser/version, locale, viewport size, browser-UI zoom level, actions and observed results separately. Report any issue, and do not treat owner acceptance alone as proof that these reviews ran. Final clean Maven/health/integration checks and accepted closure follow this review.

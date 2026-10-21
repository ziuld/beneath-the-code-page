# Shared visual contract

F18 foundations, 2026-10-21. This is the ownership contract for the existing CSS
and Thymeleaf system; page-family migration remains in progress.

- `tokens.css` owns palette, font stacks, type scale, spacing, widths, control
  dimensions, radii and editor highlight colours. Preserve semantic names.
- `base.css` declares layers (`btc-tokens`, `btc-base`, `btc-components`,
  `btc-layouts`) before imports/lazy styles, and owns document/type defaults.
  Home may compose its hero; it must not set headings on unrelated pages.
- `components.css` owns shared shell, panels, form controls and buttons. Use
  `.button` for secondary actions and `.button.button--primary` for the main
  action, on native buttons or links as appropriate. Disabled state uses native
  `disabled`; do not make navigation look disabled without semantic behaviour.
- Layout files own composition and breakpoints. They use shared tokens and do
  not redefine button colours, control geometry or independent palettes.
- Editor CSS loads lazily and deliberately remains unlayered, inside
  `[data-editor-host]`, because CodeMirror injects unlayered nonce-bearing default
  styles. Layering overrides beneath those defaults would lose panel/selection
  styling. This integration exception uses shared tokens, never global selectors;
  preserve the nonce and check the actual Chromium cascade.
- No remote fonts, new framework, inline event handlers or CSP relaxation.

The browser propagation check changes the owning radius token in the loaded
stylesheet through CSSOM and verifies the same controls inherit it across Home,
Learn and all three tool pages. It does not mutate repository files or inject
per-page patches. Full page design, locale/keyboard/zoom/owner acceptance and the
remaining F18 verification matrix are separate from this foundation check.

F18 integrated migration: `tools.css` owns eager catalogue/workspace composition,
including disabled/no-JS presentation; processing/editor modules still load lazily.
Shared `tool-cards` and `json-workspace` fragments own repeated native markup and
operation-specific controls. `artwork` holds decorative SVG geometry; its colour
comes from shared CSS. Safe errors reuse visual rules with restricted-context-safe
static structure. Native lesson section IDs are produced by the existing web
renderer, not by client-side routing or an extra service.

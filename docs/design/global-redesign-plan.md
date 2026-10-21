# F18 — Global redesign and shared design system implementation plan

Date:2026-10-20; implementation started2026-10-21 on owner continuation.
Status: F18 complete2026-10-21. I01–I07 implemented and verified; owner runtime
review approved; reviewed local revision527fe52 and closure recorded in evidence.
Owner approved the Tools catalogue/workspace directions and requested this plan.
Learn/course/reader directions were accepted; Home was provisional until the
owner approved the integrated runtime review on2026-10-21.

## Outcome and boundaries

Implement the agreed visual family across the whole website, with central styles,
semantic mobile-first layouts and preserved functionality. References guide
composition; the real content, behaviour and shared design rules govern the code.
Minor alignment/spacing details may be reconciled for coherence as explicitly
requested. A change to a shared button variant, type role or palette must have one
owning definition and propagate to its uses without per-page patches.

Use the existing Spring MVC/Thymeleaf, plain CSS/custom properties, selective
TypeScript and CodeMirror stack. No Tailwind migration, SPA, new CSS framework,
generic component platform, route rewrite or tool-algorithm rewrite is needed.
Keep changes local to presentation unless a small supporting view-model/renderer
change is necessary for honest unit metadata or native section anchors. No CMS,
accounts, file explorer, saved progress, analytics or new tools in this feature.

Approved references and qualifications: [design direction](design-direction.md).
Source mockup text/code is not application content. Preserve every published
lesson/exercise/answer, precision-sensitive JSON handling and existing translations.

## 1. Establish a single visual contract — canonical task T04

Audit before editing: all stylesheets/imports, fragments, routes, current tests,
approved images and browser states. Capture the current routes/states as the
functional baseline. Pilot shared controls in the existing shell fixture and
representative reader/workspace before migrating the remaining markup.

| Owner | What it defines | What it must not define |
|---|---|---|
| `design-system/styles/tokens.css` | Semantic palette/surfaces/borders/focus, font roles/type scale/line heights, spacing scale, radii, shadows, reading/page widths | Page-specific ad hoc values |
| `design-system/styles/base.css` | Import/cascade order, box sizing, document defaults, common reading/heading foundations | Home hero or individual tool appearance |
| `design-system/styles/components.css` | Shared buttons/variants, links, form controls, cards/panels, shell, breadcrumbs, badges/status/navigation | Duplicated per-page button definitions |
| `home.css`, `learning.css`, a small tools layout stylesheet if needed | Hero/grid/article/sidebar/workspace composition and responsive arrangements | Alternate palettes/type systems or shared-control overrides |
| `design-system/styles/editor.css` | Actual editor-specific rules using shared tokens | Independent hard-coded palette |
| `templates/fragments/` | Repeated semantic structure and shared shell/control/panel patterns | Application processing or an overgeneralised template DSL |

Declare a predictable layer order once in the common entry before lazy styles:
tokens → base → components → page layouts. Reconcile the current mixed btc-base/
btc-components layers and unlayered editor overrides deliberately. Keep nonce-based
CodeMirror-generated styles/CSP intact and verify the real cascade in the browser.
Move global heading rules out of Home CSS. Define explicit typography roles such
as page title, section title and panel label centrally, with compact workspace
variants and readable article variants. Scope layout selectors to their page root.

Start with the existing font stacks and original brand assets. Do not assume an
unknown generated-image font licence or a clean standalone B master. Use the
supplied original composition only where legible; retain the wordmark and verify
small-size brand treatment. Build the new decorative Home graphic as a small
original static SVG with no external assets or diagram library. It replaces the
Home hero artwork; the actual B identity is preserved.

Use reusable layout patterns only where repeated: container, stack/cluster,
responsive grid and panel. Share button baseline and primary/secondary/disabled/
focus states; do not scatter their colours, spacing or typography through page CSS.
Use global tokens for editor selection/search and consistent alert/state colours.
Adopt a short component contract in the existing design docs, not a new registry,
UI package or production component-gallery route.

## 2. Unify the shared shell and safe recovery

Consolidate header, footer, wordmark/logo, active navigation, native language form,
CTA variants and breadcrumbs. Every page gets one clear h1, meaningful landmarks
and a visible skip/focus path where applicable. Preserve CSRF, allowlisted return
paths, explicit lang links, cookie/security semantics and no-JS navigation.

Support wrapping labels, 320px narrow screens and actual200% browser zoom. Keep
language controls usable without a JS-only menu; no duplicated mobile/desktop
navigation logic. Avoid rotated tool labels and unlabeled icon-only actions.

Safe error rendering uses a restricted template context: reuse visual tokens and
safe static structure, without forcing the normal shell's web-context/model
requirements into the error renderer. Preserve 403/404/500 status, safe text, locale
and return link; never leak internal data to achieve visual similarity.

## 3. Migrate page families in bounded slices

| Slice | Approx. owner budget | Deliverable |
|---|---:|---|
| I01 | 2h | Tokens, cascade/typography ownership and shared control contract |
| I02 | 2h | Shell, breadcrumbs, shared panels/navigation and safe-error styling |
| I03 | 2h | Learn landing and course overview with the actual ordered three-unit catalogue |
| I04 | 2h | All three lesson readers, native section links, full content and grouped bottom navigation |
| I05 | 2h | Home composition, original layered SVG, accurate Tools/Learn destinations |
| I06 | 2h | Three-card Tools catalogue and coherent responsive card actions |
| I07 | 2h | Formatter/Minifier/Validator layouts and final cross-page consolidation |

These are execution slices inside canonical T04, not new separately counted tasks.
Reforecast after I01/I02 and the representative reader/workspace: discovered
integration/translation issues may exceed the provisional budgets. Do not rush a
complex slice just because its initial allowance is small.

Learn/course: shared hero/title hierarchy and generous panels; only one course,
three real units. Native links retain language. No progress/ratings or fictional
course completion. Lesson reader: retain all prose/code/outputs/exercise/reasoning;
use a readable65–72ch article column, native in-page section links, mobile wrapping
links and internal code scrolling. Keep answers visible without JavaScript.
Generate stable safe section anchors from trusted authored headings if needed,
handling duplicate headings; do not weaken escaping or safe Markdown rendering.
Keep source/output association explicit; pair panes only when genuinely readable.
Never remove content to match a cropped mockup.

Home: preserve the B identity, replace only the large hero decoration with static
layer artwork; moderate title sizing, accurate copy, consistent Explore tools /
Start learning actions, both destinations visible on mobile. Decorative previews
must not imply functional graphs or unreadable essential information.

Tools catalogue: three balanced cards, consistent filled actions, visible mobile
Minifier action, less empty space above titles and aligned text/action structure.
Workspace: readable tool links/sidebar, wrapping action bar, comfortable input and
read-only result panels on desktop, vertical flow on mobile. Preserve actual
operation-specific controls and states:

- Formatter: indentation2/4, Format, Cancel, Copy result, Clear workspace, output.
- Minifier: Minify, Cancel, Copy result, Clear workspace, output; no indentation.
- Validator: Validate, Cancel, Clear workspace, verdict/location diagnostics;
  no generated output, Copy action or JSON Schema feature.
- Keep busy/idle/disabled/error/stale/copy-failure/no-JS/lazy-failure feedback;
  retain previous results honestly and prevent copying stale results as current.
- Preserve IDs, data hooks, labels/live regions and editor Escape then Tab timing.
  Keep tool input out of requests, URLs, logs and persistent browser storage.

## 4. Final consolidation and proof — canonical T05

The page matrix is10 normal routes: Home; Tools; Formatter/Validator/Minifier;
Learn; course overview; and all3 units. Include safe403/404/500 recovery and current
empty/synthetic fixtures. Review each page in EN/ES/FR at narrow/intermediate/wide
widths, with relevant JS-on/off and error states. Target320,390,768 and1440px
representative viewports; use the existing harness for automated cases and focused
manual review rather than multiplying every test into a huge Cartesian matrix.

Acceptance is observable, not a literal100% pixel-equivalence claim:

1. Same shared control variant has consistent computed typography, spacing,
   border/radius/colour and focus treatment across page families. Review source
   ownership and verify a shared style change propagates without page patches.
2. No accidental page-wide horizontal overflow; only code/editor panes scroll
   horizontally. Headings/translated labels/actions reflow without clipping.
3. Header/footer/breadcrumb/CTA/card/state language is coherent across all routes.
   Page-specific layouts support reading versus editing using the same tokens.
4. All content and functional invariants remain intact, including locale returns,
   safe errors, native section/lesson links, strict JSON fidelity and worker limits.
5. Applicable text/non-text contrast, focus, keyboard navigation, reduced-motion
   behaviour, actual200% browser zoom and owner visual review are recorded.
   Do not infer full accessibility conformance from mockups or automated checks.
6. Existing tests retain meaningful behaviour assertions. Update structural tests
   intentionally affected by replacing the hero image or new wrappers/links;
   narrow network allowlists only for exact new same-origin assets, never weaken
   privacy/CSP checks or delete hard assertions to get a pass.

Verification: full Maven/frontend/Java/architecture/packaged checks; retained full
Chromium suite with affected cross-page/state cases; actual security scan with the
existing no-exception policy; policy/planning/strict main-spec validation; final
screenshots/computed-style comparison and owner review. Firefox/WebKit/separate
Safari remain F19; Docker/second-PC portability remains F20. Do not introduce
those extra gates into this presentation slice. No relaxed CSP, hosted fonts,
external scripts, analytics or processing requests.

## 5. Handoff and forecast — canonical T06

Record actual results, failed checks/fixes, screenshots, approved deviations,
known limits, owner review and scoped commit identities. Close only after all
canonical tasks and evidence are complete. UI concept approval does not preapprove
untested runtime behaviour. The initial planning request produced no application edits. The owner subsequently
authorised continuation on2026-10-21; T04 implementation is now active. No commit,
push, PR, deployment or archival is part of this foundation slice.

Preserve original F18 baseline12h. Revise forecast to28h total: T01/T02/T03 remain
2h each, T04 becomes14h, T05 becomes6h, T06 remains2h. This reflects the now agreed
whole-site implementation, responsive/localisation/state review and centralisation;
it is an owner-capacity budget with AI assistance, not measured effort or a deadline.
14h implementation +6h verification +2h closure remain after design agreement.
Shared20% contingency is computed by the existing roadmap, not counted twice.
Actual owner effort is unreported; preserve that distinction in the tracker.

Completed: owner approved T05 and the reviewed revision is recorded under T06.
Next selected work is F08–F11. No push, PR, deployment or archival performed.

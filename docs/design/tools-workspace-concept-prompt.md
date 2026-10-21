# Tools workspace — Nano Banana prompt

Status: visual direction approved by owner on2026-10-20 with recorded refinements; original prompt retained. Representative page:`/tools/json-formatter`;
show Minifier/Validator adaptations as small companion details, not new features.
Attach the owner's tools-workspace style reference and the approved Learn/Home
family. The original B logo remains mandatory; do not adopt the image's node logo.

## Copy into Nano Banana

Create a high-fidelity JSON Formatter workbench for Beneath the Code. Take the
attached technical workspace image's pane boundaries, restrained toolbar and
readable editor structure, and combine them with our approved website identity.
Show a complete desktop1440px layout and a complete mobile390px layout side by
side, without browser/device frames. Prioritise real controls and useful workspace
space over decorative dashboard detail.

Shared style: near-black #050505, dark #0B0B0B/#111111 panels, warm-white #EDEAE4,
readable secondary text, fine borders, consistent spacing and filled warm-white
primary actions. Preserve the actual B logo, Home / Tools / Learn navigation,
Tools active, English / Español / Français selector with Apply, and shared footer.
Use a moderately sized serif tool title and sans-serif labels; code is crisp
monospace. The workspace may be denser than a reading page while using the same
shared tokens and controls. No giant hero heading or decorative hero artwork.

Desktop structure:
- Quiet tool navigation rail with exactly JSON Formatter, JSON Validator and JSON
  Minifier. Make the current tool visibly selected and support keyboard focus.
- Main heading “JSON Formatter”, short local-processing description and a visible
  “Back to tools” link.
- Clear action bar: labelled Indentation select (Two spaces / Four spaces), filled
  “Format JSON”, secondary “Cancel”, “Copy result” and “Clear workspace”. Give
  groups breathing room; avoid a crowded strip of unlabeled icons. Cancel is
  unavailable when idle; Copy is unavailable without a current successful result.
- Two large side-by-side panels: editable “JSON input” and read-only “Formatted
  output”. Place line numbers/syntax colour in the input as restrained editor
  aids; output stays read-only, selectable and scrollable. Align pane labels and
  borders. Use comfortable padding and readable14–16px code, not miniature code.
- A clearly separated status/diagnostic area near the action bar, visible without
  overlapping code or other controls. Truthful privacy note: “Processing stays in
  your browser.” Preserve editor keyboard-exit guidance as accessible help text.

Show this exact synthetic JSON input:
{"name":"Ada","active":true,"roles":["reader","author"]}
Show the matching two-space formatted output, preserving every value and order.
Use the same content on desktop/mobile. This is sample content for the mockup,
not a new Example/Load/File button or real saved document.

Mobile structure: compact shared header, wrapping row/list of the three tool links,
modest title, wrapping action groups, then input, status and output in a vertical
flow. Both input and output remain reachable without a JavaScript-only tab system.
Provide20–24px outer gutters, comfortable tap targets and no whole-page horizontal
overflow. Code may scroll horizontally inside its pane. Do not shrink the UI or
code to imitate desktop, and do not let a fixed footer cover editor controls.

Include small state details beside the main layouts:
1. Busy: visible processing status, Cancel available, incompatible actions disabled.
2. Invalid input: retain input and show text identifying the syntax error with
   line/column; for {"name":} the missing value is at line1,column9. Show an icon
   plus text; colour alone must not carry the message.
3. Stale result: retain the previous successful output but label it as no longer
   current after input changes; do not imply it matches the new input.
4. JavaScript unavailable: explanatory content and navigation remain readable;
   processing controls unavailable with a clear translated notice.

Companion adaptations:
- JSON Minifier uses “Minify JSON”, Cancel, Copy result, Clear workspace, input
  and read-only minified output. It has no indentation selector.
- JSON Validator uses “Validate JSON”, Cancel and Clear workspace; input plus
  clear verdict/line-column diagnostics. It has no generated-output editor,
  indentation control, Copy result or JSON Schema validation.

The style reference does not authorise its file explorer, system-flow graph,
analytics, account avatar, project tabs, storage, collaboration, AI tools or
backend processing. Do not draw these. Preserve only our real tool functions.
Accommodate long EN/ES/FR labels, keyboard focus and enlarged text. Use the same
component/border/button language across all variants. The resulting workspace
should feel precise, spacious and practical within the approved site family.

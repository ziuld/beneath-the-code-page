# Lesson reader — Nano Banana prompt

Status: visual direction approved by the owner on2026-10-20; original prompt retained. Representative page:
`/learn/java-fundamentals/values-types-numeric-limits` (middle unit with both neighbours).
Attach the approved Learn reference and original B asset. This is a reading page;
the separate tools workspace image belongs to the later Tools concept.

## Copy into Nano Banana

Create a high-fidelity lesson-reader concept for Beneath the Code, matching the
attached approved Learn visual identity. Deliver desktop1440px and mobile390px
layouts side by side, with readable actual UI text, no device frames and no code
implementation. Near-black #050505, subtle dark surfaces #0B0B0B/#111111, warm
white #EDEAE4, fine borders, serif editorial headings, sans-serif body and crisp
monospace code. Use the real B identity. Keep reading surfaces quiet.

Use the shared Home / Tools / Learn header, with Learn active, English / Español /
Français selector and Apply. Add clearly spaced breadcrumbs:
“Learn / Java Fundamentals / Values, types and numeric limits”. Show a small
“UNIT02 /03” label and a moderately sized title “Values, types and numeric limits”.
The title should leave useful lesson content visible near the top of the page.

Make reading comfortable: approximately65–72 characters per line,18–20px desktop
body text, generous line-height, clear paragraph/section separation and20–24px
mobile gutters. On desktop a quiet side rail may link to this page's sections;
on mobile place a compact wrapping list of section links below the introduction.
These are native in-page anchors, with no saved reading progress or new application
features. Let long translated text and enlarged type reflow naturally.

Show the actual lesson hierarchy:
- What you will learn
- A type is part of the calculation
- Worked example: predict before running
- Primitive values and reference values
- Exercise: does the destination fix the calculation?
- Answer and reasoning
- Check your understanding

Give code examples generous padding, readable monospace text and horizontal
scroll affordance within the code panel when needed; the whole page should stay
within the viewport. Distinguish source code from program output with clear labels
and subtle surface differences. For the visible worked-example excerpt use:
int largest = 2_147_483_647;
System.out.println(largest + 1);
System.out.println((long) largest + 1);
Label the associated output excerpt:
-2147483648
2147483648
This illustrates the type difference; do not invent a different Java program.

Present the exercise as an inviting, well-separated reading section. Keep “Answer
and reasoning” visible on the same page, with room for the explanation and output;
no reveal button, quiz submission, editor, online compiler, video player or login.
Preserve the full existing lesson content in the eventual implementation.

Finish with clear “Previous unit” and “Next unit” links and a secondary “Back to
the course” link. Match filled/secondary action styling and the shared footer to
the approved Learn family. No busy B decoration behind the article, completion
status, invented controls or unreadably tiny code. Include visible keyboard focus,
strong text contrast and sensible wrapping for longer Spanish/French labels.
The result should feel like a beautifully typeset technical lesson, with space
between explanation, diagrams, source, output, exercise and reasoning.

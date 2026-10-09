# Requirements → scenarios → verification tasks

Generated from plan.json. Test methods below are planned, not implemented or passed. Scenario IDs should appear in future automated test names/tags or manual evidence.

| Requirement | Story | Scenario | Verification task | Planned verification |
|---|---|---|---|---|
| F00-UH01-R01 | [F00-UH01](features/F00.md#f00-uh01) | F00-UH01-AC01 | F00-UH01-T03 | Inspect the tree, package and five starters against the manual checklist |
| F00-UH01-R02 | [F00-UH01](features/F00.md#f00-uh01) | F00-UH01-AC02 | F00-UH01-T03 | Compare before/after document hashes; do not automate the owner import |
| F01-UH01-R01 | [F01-UH01](features/F01.md#f01-uh01) | F01-UH01-AC01 | F01-UH01-T03 | Maven verification and packaged process smoke; record actual tool versions |
| F01-UH01-R02 | [F01-UH01](features/F01.md#f01-uh01) | F01-UH01-AC02 | F01-UH01-T04 | Controlled failing-test check in an isolated working change, then restore it |
| F01-UH02-R01 | [F01-UH02](features/F01.md#f01-uh02) | F01-UH02-AC01 | F01-UH02-T03 | ArchUnit fixture or isolated mutation; confirm rules select real classes |
| F01-UH02-R02 | [F01-UH02](features/F01.md#f01-uh02) | F01-UH02-AC02 | F01-UH02-T04 | Inspect workflow permissions and execute the initial CI checks when a remote run is authorised |
| F02-UH01-R01 | [F02-UH01](features/F02.md#f02-uh01) | F02-UH01-AC01 | F02-UH01-T03 | Inspect JAR resources; integration-test manifest traversal and HTTP assets |
| F02-UH01-R02 | [F02-UH01](features/F02.md#f02-uh01) | F02-UH01-AC02 | F02-UH01-T04 | Integration fixture omitting an entry; verify diagnostic contains no payload |
| F02-UH02-R01 | [F02-UH02](features/F02.md#f02-uh02) | F02-UH02-AC01 | F02-UH02-T03 | Two successive rebuilds; inspect served bytes, not only build logs |
| F02-UH02-R02 | [F02-UH02](features/F02.md#f02-uh02) | F02-UH02-AC02 | F02-UH02-T04 | Configuration test and frontend restricted-import lint |
| F03-UH01-R01 | [F03-UH01](features/F03.md#f03-uh01) | F03-UH01-AC01 | F03-UH01-T03 | MockMvc rendered HTML and browser JavaScript-disabled check |
| F03-UH01-R02 | [F03-UH01](features/F03.md#f03-uh01) | F03-UH01-AC02 | F03-UH01-T04 | Route/catalogue fixture; after publication verify the real link replaces the unavailable state |
| F03-UH02-R01 | [F03-UH02](features/F03.md#f03-uh02) | F03-UH02-AC01 | F03-UH02-T03 | Run message key/placeholder parity and repeat rendered checks for EN/ES/FR |
| F03-UH02-R02 | [F03-UH02](features/F03.md#f03-uh02) | F03-UH02-AC02 | F03-UH02-T04 | Keyboard review, 200% zoom/reflow, contrast and reduced-motion checks |
| F04-UH01-R01 | [F04-UH01](features/F04.md#f04-uh01) | F04-UH01-AC01 | F04-UH01-T03 | MockMvc plus browser GET-to-POST flow; inspect HttpOnly/Secure/SameSite attributes |
| F04-UH01-R02 | [F04-UH01](features/F04.md#f04-uh01) | F04-UH01-AC02 | F04-UH01-T04 | Missing/mismatched token and external redirect fixtures; table-test full locale precedence |
| F04-UH02-R01 | [F04-UH02](features/F04.md#f04-uh02) | F04-UH02-AC01 | F04-UH02-T03 | Security header integration checks; no session/login redirects; production-only HSTS test |
| F04-UH02-R02 | [F04-UH02](features/F04.md#f04-uh02) | F04-UH02-AC02 | F04-UH02-T04 | Declared-length and chunked-body tests; safe 404/500 tests and ASVS control mapping |
| F05-UH01-R01 | [F05-UH01](features/F05.md#f05-uh01) | F05-UH01-AC01 | F05-UH01-T03 | Manual keyboard/screen-reader checks in addition to Playwright and axe |
| F05-UH01-R02 | [F05-UH01](features/F05.md#f05-uh01) | F05-UH01-AC02 | F05-UH01-T04 | Chromium/Firefox/WebKit proof; include tooltip and resize behaviour |
| F05-UH02-R01 | [F05-UH02](features/F05.md#f05-uh02) | F05-UH02-AC01 | F05-UH02-T03 | Controlled worker fixture and UI responsiveness checks; no precision timing assertion on busy hardware |
| F05-UH02-R02 | [F05-UH02](features/F05.md#f05-uh02) | F05-UH02-AC02 | F05-UH02-T04 | Worker protocol tests; inspect document and worker network traffic |
| F06-UH01-R01 | [F06-UH01](features/F06.md#f06-uh01) | F06-UH01-AC01 | F06-UH01-T03 | Golden token comparisons for numbers, escapes, duplicate keys, order and primitive roots |
| F06-UH01-R02 | [F06-UH01](features/F06.md#f06-uh01) | F06-UH01-AC02 | F06-UH01-T04 | Cold/warm Playwright traffic capture including workers and lazy paths; inspect storage/logs |
| F06-UH02-R01 | [F06-UH02](features/F06.md#f06-uh02) | F06-UH02-AC01 | F06-UH02-T03 | Malformed, empty, comments/trailing commas and Unicode position fixtures; EN/ES/FR rendering |
| F06-UH02-R02 | [F06-UH02](features/F06.md#f06-uh02) | F06-UH02-AC02 | F06-UH02-T04 | Pre-insertion check; depth 129, output limit and timeout paths; stale copy controls disabled |
| F06-UH03-R01 | [F06-UH03](features/F06.md#f06-uh03) | F06-UH03-AC01 | F06-UH03-T03 | Stub permitted and rejected clipboard writes; no automatic reads; keyboard activation |
| F06-UH03-R02 | [F06-UH03](features/F06.md#f06-uh03) | F06-UH03-AC02 | F06-UH03-T04 | State/worker tests; shared warning-dialog behaviour if a confirmation is used |
| F07-UH01-R01 | [F07-UH01](features/F07.md#f07-uh01) | F07-UH01-AC01 | F07-UH01-T03 | Valid object/array/string/number/boolean/null fixtures; SSR and language checks |
| F07-UH01-R02 | [F07-UH01](features/F07.md#f07-uh01) | F07-UH01-AC02 | F07-UH01-T04 | Comments/trailing commas/incomplete input and inherited worker/privacy limits |
| F07-UH02-R01 | [F07-UH02](features/F07.md#f07-uh02) | F07-UH02-AC01 | F07-UH02-T03 | Token-equivalence cases including large numbers and duplicate keys |
| F07-UH02-R02 | [F07-UH02](features/F07.md#f07-uh02) | F07-UH02-AC02 | F07-UH02-T04 | Error state, invalidated copy control and privacy tests |
| F08-UH01-R01 | [F08-UH01](features/F08.md#f08-uh01) | F08-UH01-AC01 | F08-UH01-T03 | Unicode/empty input fixtures and browser-local operation checks |
| F08-UH01-R02 | [F08-UH01](features/F08.md#f08-uh01) | F08-UH01-AC02 | F08-UH01-T04 | Invalid alphabet/padding, non-UTF-8 decoded bytes and bounded-output fixtures |
| F09-UH01-R01 | [F09-UH01](features/F09.md#f09-uh01) | F09-UH01-AC01 | F09-UH01-T03 | Inspect version/variant and API use; do not claim a finite test proves global uniqueness |
| F09-UH01-R02 | [F09-UH01](features/F09.md#f09-uh01) | F09-UH01-AC02 | F09-UH01-T04 | Boundary values 0/1/100/101 and unavailable cryptographic API; no Math.random fallback |
| F10-UH01-R01 | [F10-UH01](features/F10.md#f10-uh01) | F10-UH01-AC01 | F10-UH01-T03 | Synthetic tokens only; escaped HTML-like claims; no key fetching or server requests |
| F10-UH01-R02 | [F10-UH01](features/F10.md#f10-uh01) | F10-UH01-AC02 | F10-UH01-T04 | Malformed segments, invalid UTF-8/JSON, limits and untrusted exp claim cases |
| F11-UH01-R01 | [F11-UH01](features/F11.md#f11-uh01) | F11-UH01-AC01 | F11-UH01-T04 | Golden scalar/array/object cases; quote ambiguous strings; precision-aware comparisons |
| F11-UH01-R02 | [F11-UH01](features/F11.md#f11-uh01) | F11-UH01-AC02 | F11-UH01-T05 | Duplicate keys, unsupported numeric precision and output expansion tests; no JS-number round trip |
| F11-UH02-R01 | [F11-UH02](features/F11.md#f11-uh02) | F11-UH02-AC01 | F11-UH02-T04 | Schema-specific mapping/list fixtures and quoted date-like strings |
| F11-UH02-R02 | [F11-UH02](features/F11.md#f11-uh02) | F11-UH02-AC02 | F11-UH02-T05 | Aliases, custom tags, multiple documents, duplicate/non-string keys, non-finite and unsafe numbers |
| F12-UH01-R01 | [F12-UH01](features/F12.md#f12-uh01) | F12-UH01-AC01 | F12-UH01-T03 | Route traversal in EN/ES/FR and keyboard/accessible-name checks |
| F12-UH01-R02 | [F12-UH01](features/F12.md#f12-uh01) | F12-UH01-AC02 | F12-UH01-T04 | MockMvc status/error-body tests and captured-log sentinel checks |
| F12-UH02-R01 | [F12-UH02](features/F12.md#f12-uh02) | F12-UH02-AC01 | F12-UH02-T03 | Inspect UID/mounts/capabilities/limits; execute actual health command and graceful shutdown |
| F12-UH02-R02 | [F12-UH02](features/F12.md#f12-uh02) | F12-UH02-AC02 | F12-UH02-T04 | Container/dependency/secret/SAST/SBOM evidence; documented expiring exceptions only |
| F13-UH01-R01 | [F13-UH01](features/F13.md#f13-uh01) | F13-UH01-AC01 | F13-UH01-T03 | SSR/browser route tests, first/last boundaries and keyboard navigation |
| F13-UH01-R02 | [F13-UH01](features/F13.md#f13-uh01) | F13-UH01-AC02 | F13-UH01-T04 | Unknown/unpublished slugs in EN/ES/FR; no persistence dependency |
| F13-UH02-R01 | [F13-UH02](features/F13.md#f13-uh02) | F13-UH02-AC01 | F13-UH02-T03 | Content completeness and rendering checks for EN/ES/FR; immutable resource loading |
| F13-UH02-R02 | [F13-UH02](features/F13.md#f13-uh02) | F13-UH02-AC02 | F13-UH02-T04 | Raw HTML disabled plus sanitisation tests; CSP/browser assertion |
| F14-UH01-R01 | [F14-UH01](features/F14.md#f14-uh01) | F14-UH01-AC01 | F14-UH01-T03 | Owner content review recorded; compare overview to accepted outline |
| F14-UH01-R02 | [F14-UH01](features/F14.md#f14-uh01) | F14-UH01-AC02 | F14-UH01-T04 | Inspect decision/evidence record and keep provisional lesson records unready |
| F14-UH02-R01 | [F14-UH02](features/F14.md#f14-uh02) | F14-UH02-AC01 | F14-UH02-T04 | Compile/run the example with the baseline JDK and review diagram/content consistency |
| F14-UH02-R02 | [F14-UH02](features/F14.md#f14-uh02) | F14-UH02-AC02 | F14-UH02-T05 | Manual educational review in EN/ES/FR and accessible answer presentation |
| F15-UH01-R01 | [F15-UH01](features/F15.md#f15-uh01) | F15-UH01-AC01 | F15-UH01-T04 | Compile/run all lesson examples; technical review: Numeric boundaries, floating-point caveats and reference-versus-value terminology |
| F15-UH01-R02 | [F15-UH01](features/F15.md#f15-uh01) | F15-UH01-AC02 | F15-UH01-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH02-R01 | [F15-UH02](features/F15.md#f15-uh02) | F15-UH02-AC01 | F15-UH02-T04 | Compile/run all lesson examples; technical review: Branch boundaries, loop termination and off-by-one misconceptions |
| F15-UH02-R02 | [F15-UH02](features/F15.md#f15-uh02) | F15-UH02-AC02 | F15-UH02-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH03-R01 | [F15-UH03](features/F15.md#f15-uh03) | F15-UH03-AC01 | F15-UH03-T04 | Compile/run all lesson examples; technical review: Parameter passing, return values and stack-frame mental model |
| F15-UH03-R02 | [F15-UH03](features/F15.md#f15-uh03) | F15-UH03-AC02 | F15-UH03-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH04-R01 | [F15-UH04](features/F15.md#f15-uh04) | F15-UH04-AC01 | F15-UH04-T04 | Compile/run all lesson examples; technical review: Aliasing, null and conceptual heap diagrams without claiming physical layout guarantees |
| F15-UH04-R02 | [F15-UH04](features/F15.md#f15-uh04) | F15-UH04-AC02 | F15-UH04-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH05-R01 | [F15-UH05](features/F15.md#f15-uh05) | F15-UH05-AC01 | F15-UH05-T04 | Compile/run all lesson examples; technical review: Visibility, invariants and dynamic dispatch with beginner-appropriate language |
| F15-UH05-R02 | [F15-UH05](features/F15.md#f15-uh05) | F15-UH05-AC02 | F15-UH05-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH06-R01 | [F15-UH06](features/F15.md#f15-uh06) | F15-UH06-AC01 | F15-UH06-T04 | Compile/run all lesson examples; technical review: Exception flow, finally and resource closure without misleading recovery advice |
| F15-UH06-R02 | [F15-UH06](features/F15.md#f15-uh06) | F15-UH06-AC02 | F15-UH06-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F15-UH07-R01 | [F15-UH07](features/F15.md#f15-uh07) | F15-UH07-AC01 | F15-UH07-T04 | Compile/run all lesson examples; technical review: Type parameters, list/set/map basics and equals/hashCode contract |
| F15-UH07-R02 | [F15-UH07](features/F15.md#f15-uh07) | F15-UH07-AC02 | F15-UH07-T05 | Repeat completeness and human language review for EN/ES/FR; retain provisional syllabus gate |
| F16-UH01-R01 | [F16-UH01](features/F16.md#f16-uh01) | F16-UH01-AC01 | F16-UH01-T04 | Trace all requirement/scenario/task IDs to actual test/review evidence |
| F16-UH01-R02 | [F16-UH01](features/F16.md#f16-uh01) | F16-UH01-AC02 | F16-UH01-T05 | Controlled status-validator fixture plus real defect triage; no waived scope by calendar date |
| F16-UH02-R01 | [F16-UH02](features/F16.md#f16-uh02) | F16-UH02-AC01 | F16-UH02-T03 | Fresh checkout/container run and recorded version identity |
| F16-UH02-R02 | [F16-UH02](features/F16.md#f16-uh02) | F16-UH02-AC02 | F16-UH02-T04 | Review runbook, known limitations and publication authorisation boundaries |

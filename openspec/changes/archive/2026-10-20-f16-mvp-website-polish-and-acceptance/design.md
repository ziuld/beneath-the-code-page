# Design

## Context

See proposal.md for motivation. F12/F14 are accepted; the normal catalogue contains
one source-to-jvm unit with a visible same-page answer. HomeNavigation's default
constructor still selects (true, false); shared shell and section cards use those
publication flags. The shell currently uses bare section.path and root Home links,
whereas learning links explicitly carry the reading language. Home browser tests
assert no Learn links and one unavailable card: these assumptions must change.

The main learning spec separates publication from later integration; its historical
F13 empty-catalogue and F14 pre-integration scenarios remain valid in those states.
No existing requirement needs removal. Add the promotion contract to that capability
and place the four F16 requirements in two cohesive acceptance/handoff capabilities.
Canonical plan ownership does not migrate merely because a proposal exists.

## Goals / Non-Goals

**Goals:** minimal publication-aware integration, complete evidence for the retained
journeys, and a tested local handoff tied to an actual revision/artifact.

**Non-Goals:** new navigation architecture, answer route/widget, full course,
additional browser engines, coverage-number work, speech compatibility claims,
new release infrastructure or automatic security approval. Retain the architecture
and approved B logo/design system; an ADR is unnecessary for this bounded design.

## Decisions

### 1. Derive Learn availability from the accepted catalogue boundary

During apply connect HomeNavigation's learning publication state to the existing
learning application query/catalogue at composition time, using the same published
catalogue that serves the public routes. Retain the explicit boolean constructor
where useful for tests; an empty catalogue must not promote an unavailable page.
Inspect the existing LearningConfiguration/LearningPages composition and
wire the smallest change without a second catalogue, new port or feature framework.
Apply discovery: ToolsController and LearningController supplied empty sections;
SharedNavigationAdvice now supplies the existing descriptors to the three inbound
page packages, preserving fixture overrides without cross-capability adapter imports.
Simply changing false to true was considered, but would advertise missing routes
in the supported empty-catalogue state. No site adapter may import an outbound
content adapter; preserve the current inward dependency direction.

Use Thymeleaf URL composition for Home/shared section and card links with the
resolved supported language; preserve existing learning links. GET links do not
persist preferences. Preference POST returnTo remains the exact clean allowlisted
path, preserving its CSRF/redirect contract. Retain both Tools and Learn publication
rules and focused empty/unpublished fixtures. Avoid hardcoded locale dictionaries.

### 2. Review journeys through existing tests and styles

Update HomeNavigation/Home MVC tests and the existing home/shared-shell/shared-
keyboard/locale/learning Chromium checks for promoted Learn and language-carrying
URLs. Replace obsolete zero-Learn/unavailable-card and exact bare-URL assertions
without weakening publication or privacy checks. Audit existing request allowlists
for explicit page-language queries; immutable worker/asset allowances stay exact.

Add a bounded Home → Tools → each F06/F07 operation and Home → Learn → course →
real unit/exercise/answer/error journey across EN/ES/FR and JS/no-JS as appropriate.
Reuse tool correctness/privacy/CSP/cancel/copy/clear and hostile learning fixtures;
retain safe errors, no editor on reading pages and empty/draft/synthetic rejection.
Do not write a second parallel browser harness. Fix only observed integration,
focus, contrast or reflow defects in shared components/styles and localised text.

Run the existing Maven verification (Java, architecture, frontend checks) and
packaged Chromium runner on the final candidate. Retain original required cases;
Firefox/WebKit are optional post-MVP and must not be run/installed here. Existing
CSS-zoom and screenshot checks do not establish actual browser 200% zoom. Present
one integrated owner review: keyboard/visible focus, editor Escape/Tab and dialogs,
narrow/wide layout, actual zoom, EN/ES/FR content/navigation, error and no-JS states.
Record the owner's actual supplied observations; do not invent manual review.

### 3. Keep acceptance evidence and status rejection separate

Build one F16 acceptance matrix linking retained V1 criteria, stable R/AC IDs,
commands, revision/artifact identity and prior applicable evidence. The four F16
requirements map directly to their four canonical AC IDs. Additional promotion
scenarios refine R01 integration, without renumbering canonical requirements.

Reuse scripts/test-planning-rules.py fixtures for rejection of unfinished stories,
features and epic, and acceptance of evidenced V1 with frozen V2 open. Add only a
missing F16-specific negative case if existing fixtures do not cover it. Fixtures
operate on copied data and synthetic identifiers; never edit the real plan into
fake completion to exercise a validator. Record real defect triage separately;
the status validator alone cannot detect accessibility/privacy failures. A failed
required check keeps the affected task/story and epic open. Preserve the 11
canonical tasks and 20h baseline/8h forecast (UH01 5h, UH02 3h), with owner effort
unreported until supplied.

### 4. Reassess final V1 security on actual candidate inputs

Reuse scripts/verify-security.py, scripts/test-security.py and security/README.md.
Final V1 requires review of all eight existing bounded Boot4.1.1 decisions even
if an input fingerprint remains applicable. Record actual advisories, inventory,
scanner freshness/coverage and unresolved findings. HomeNavigation/server
composition changes invalidate the previous fingerprint; compute the new scope
only after final runtime changes and packaging. Keep the existing expiry at the
start of 2026-11-01 UTC; no automatic renewal, version overrides or dependency
upgrade is part of this proposal. Obtain explicit owner approval for any revised
bounded disposition/scope before editing policy; scanner failure, missing approval,
expiry or unresolved blocking findings keep acceptance open. Accepted F14 evidence
is historical, not a final F16 scan. Re-run only affected checks if inputs change.

### 5. Reproduce a real local revision before final closure

Extend README.md, CONTRIBUTING.md and the existing packaged-JAR guidance in
docs/delivery/frontend-assets.md and docs/delivery/shared-interface.md, with the
release procedure in docs/delivery/repository-and-ci.md; add concise local release notes beside the
existing delivery documentation as needed. Record the actual toolchain (including
wrapper identity, resolving stale provisional architecture versions), supported
configuration, build/start/health/route smoke/shutdown commands, artifact digest,
security references and known limitations. Preserve loopback-only local HTTP and
management isolation; scripts/smoke-java-baseline.py already owns safe ephemeral
startup/shutdown. The local profile uses generated filesystem assets: document
that preview separately and verify normal classpath-packaged startup without
those generated resource directories. If native HTTP preference review uses a
local-profile process, label that evidence separately; do not present it as proof
of packaged asset loading. No Docker, hosted account, release upload or CI deployment.

After UH01 acceptance, record its real coherent local commit when authorised;
that supplies UH02's clean-checkout candidate. Prepare a separate clean checkout
under the project, at that exact recorded revision, without copying target,
node_modules, generated assets or working-tree runtime sources. Use the documented
pinned dependency-resolution procedure; a clean checkout need not mean offline
or no dependency download. Run the documented build and smoke, capture versions,
revision/artifact identity and health/shutdown. Missing external access is a
blocked reproduction check, not a pass. Review final runbook instructions against
executed commands. If reproduction finds a runtime defect, reopen affected work,
create a new candidate and repeat affected checks. A later documentation/evidence
commit must identify the tested implementation revision clearly rather than
pretend an earlier checkout included itself.

Local commits, pushes and publication follow the repository's explicit authority
boundaries. Once both stories meet their criteria and actual integration evidence
exists, update plan/handoff, regenerate both planning views and validate. Main-spec
sync/archive is a separate authorised workflow, not automatic behavioural migration.

## Risks / Trade-offs

- Shared locale URL changes invalidate older assertions → revise explicit page
  expectations while preserving exact worker, cookie and redirect boundaries.
- Catalogue wiring creates a dependency cycle → compose through the existing
  application query, with no site-to-outbound import or speculative new port.
- Final approval is mistaken for prior acceptance → tie security/manual/build
  evidence to the actual F16 inputs and report missing checks honestly.
- Runbook drifts from the tested candidate → execute its commands in a clean
  checkout and record actual commit, versions, digest and limitations.
- Polish expands into redesign → fix demonstrated shared-journey defects only.

## Migration Plan

No database, service migration or deployment. Apply in order: catalogue-aware
promotion/locale links → focused polish/tests → integrated Chromium/owner/security
acceptance → authorised local candidate commit/UH01 closure → clean-checkout
handoff/UH02 acceptance → authorised evidence/closure bookkeeping. Roll back
promotion and its shared-link changes together if needed, preserving readable
accepted F14 routes/content and all existing tool protections. No user data moves.

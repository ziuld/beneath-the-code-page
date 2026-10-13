# Proposal

## Why

The accepted Home page provides a minimal translated shell, but its styling and verification do not yet establish the complete shared-interface foundation required by F03-UH02. Visitors need consistent resource-backed labels and keyboard-accessible controls as that shell is reused.

## What Changes

- Implement **F03-UH02 only**, retaining F03-UH02-R01/R02, AC01/AC02 and canonical T01–T05, with the unchanged 10h baseline.
- Extend the existing design-system tokens/typography and shared navbar/footer/cards; add the small native button foundation required by T02, without dead production controls or an entire component library.
- Preserve the owner-approved Home appearance, supplied B composition, system font stacks and publication-aware navigation. Reuse the accepted implementation rather than rewriting it.
- Complete shared EN/ES/FR message coverage, key/placeholder checks and exact rendered navigation/accessibility-label assertions in every supported locale.
- Extend keyboard, focus, responsive/reflow, contrast and reduced-motion verification using the existing MVC and packaged Playwright infrastructure; include an actual browser-UI 200% zoom review rather than claiming CSS zoom is equivalent.
- Exclude language selection/persistence, full locale precedence, preference cookies/CSRF flows and the wider security baseline (F04); also exclude editors, destination product pages, new public fixture routes, new font/logo masters and publication.

## Capabilities

### New Capabilities

- `shared-interface`: Resource-backed shared interface labels and visible, traversable keyboard focus in the supported locales.

### Modified Capabilities

None. `home-page` and `packaged-browser-assets` retain their existing contracts; this story adds the shared-interface contract without changing Home's content/publication behaviour.

## Impact

Expected implementation areas: `src/main/frontend/design-system/styles/`, `src/main/resources/templates/fragments/`, the existing Home template, `i18n/messages*.properties`, rendered Java tests and `tests/e2e`. Keep the current request-header locale resolver and bounded public-route security policy unchanged. Use test-only component fixtures where production Home has no meaningful button action.

Reuse pinned Playwright 1.64.0, the project-local runner and existing browser workflow; no new runtime dependency or framework is proposed. Component documentation and actual acceptance evidence accompany implementation. The owner reported that Home review steps 1–3 passed and explicitly accepted automated component coverage instead of repeating it manually. Unreported browser/version/viewport details remain unspecified; omitted manual fixture review is not claimed as performed. This bounded acceptance decision does not change R01/R02 or equate CSS zoom with browser-UI zoom.

This proposal creates planning artifacts only. F03-UH02 remains planned and plan-owned; ownership migration, commit, push and archive are separate decisions. Preserve the already-authorised but uncommitted F03-UH01 archival/migration work.

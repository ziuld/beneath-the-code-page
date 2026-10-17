# Design

## Context

See `proposal.md` for the approved scope. The quality plan currently targets WCAG 2.2 AA and explicitly requires screen-reader review; brand guidance repeats it. F05 is plan-owned and its editor delta is revised separately. The five main specs contain no screen-reader or blanket WCAG clause.

## Goals / Non-Goals

**Goals:** reconcile cross-cutting acceptance guidance without changing delivered behaviour or falsifying historical evidence.

**Non-Goals:** no Java/TypeScript, ARIA removal, dependency/CI reduction, Orca removal, desktop changes, F06 implementation, automatic spec migration or feature closure.

## Decisions

- Edit source quality/brand/planning guidance rather than generated views; regenerate only through the existing renderers. Preserve IDs and estimates. Alternative rejected: deleting every mention, which would erase historical evidence and damage auditability.
- Replace blanket conformance wording with explicit keyboard and visual criteria, retaining axe as a useful automated check without a full-conformance claim. Alternative rejected: retaining the broad WCAG AA target while disclaiming screen-reader support, which would misrepresent the accepted scope.
- Remove the mandatory speech-review gate rather than move it to F16. Keep existing labels, semantics and privacy-safe status behaviour because removing them is unnecessary and would harm keyboard/visual usability and existing contracts.
- Keep this follow-up documentation-only with specs deliberately skipped. No new product capability or changed main-spec behaviour is needed; no synthetic specification will be created merely for validation.

## Risks / Trade-offs

- [No verified non-visual usability] → state the limitation plainly; do not advertise screen-reader compatibility or full WCAG AA conformance.
- [Scope revision mistaken for a passing test] → record that the Orca attempt was inconclusive and the acceptance obligation was subsequently removed by the owner.
- [Remaining zoom/keyboard/locale obligations silently removed] → explicitly retain them and preserve outstanding observations until actually reported.

## Migration Plan

Apply the documentation changes only after a separate apply request. Inspect future acceptance references, update authoritative sources, regenerate affected views, run planning integrity/rule tests, strict OpenSpec validation and whitespace checks. Reuse existing application/CI evidence when no runtime source changes. Record the scope decision and remaining limitations in the handoff. Rollback is a reviewed documentation revision, never an invented test result or erased history.

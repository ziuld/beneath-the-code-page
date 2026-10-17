# ADR 006 — Distinguish worker startup assets from processing traffic

Date: 2026-10-17. Status: accepted by the owner during F06 apply.

## Context

F06's original literal zero-operation-request scenario conflicts with F05's accepted clean-worker lifecycle. Workers are terminated after jobs, cancellation, timeout and failure; creating a replacement can request its script even when browser caches are warm. Cached loads are not proof of absent browser requests. Retaining a successful worker alone does not solve recovery after hard termination.

## Decision

Retain one active job, hard two-second termination, fresh same-origin workers and restrictive CSP. During formatting/retry, allow only GETs without query/fragment or body to exact version-hashed worker script paths recorded by the trusted build. Do not allow arbitrary `/assets/**` requests. The worker bundle is self-contained and has no runtime imports or network APIs.

All processing, error, cancellation, Copy and Clear paths must keep tool input/results/diagnostics out of HTTP URLs, bodies, headers, cookies, server logs and persistent storage. After initial UI assets load, no operation-triggered request is permitted except those exact worker-startup GETs. Inspect cold and repeated-job traffic, independently of cache behaviour, including terminated-worker recovery. The existing worker response CSP continues to deny network connections and unsafe evaluation. No blob/data worker, service worker, persistence or CSP relaxation is introduced.

## Alternatives and consequences

An absolute no-browser-request promise would require a materially different execution/recovery design; it is not asserted. Allowlisting an entire asset prefix would conceal unwanted requests and is rejected. This small explicit exception preserves the privacy outcome and existing worker safety without speculative pooling or caching infrastructure. Update F06's plan-owned acceptance and proposed delta together, retaining stable IDs and evidence requirements; this is not an automatic behavioural ownership migration.

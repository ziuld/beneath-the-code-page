# UUID Generator

`/tools/uuid` uses the shared SSR shell and styles in EN/ES/FR. Generate creates
1–100 UUID v4 values with native `crypto.randomUUID()`; Copy writes the current
newline-separated batch only on explicit activation. A secure context (HTTPS or
localhost) and a browser providing that API are required. No fallback randomness.

Invalid, empty or fractional counts produce a localised error and no batch.
Editing the count or failing generation clears output and disables Copy. Missing
cryptographic or clipboard APIs and clipboard denial have translated feedback;
exceptions never appear in the UI. Without JavaScript or after a failed module
load, the controls stay disabled with an explanation. No editor or worker loads.

Generation stays in memory. There is no payload endpoint, persistence, automatic
clipboard write, dependency or generic tool framework. UUID version/variant and
native API calls are tested; finite tests do not establish global uniqueness.

Acceptance and executed checks: [F09 evidence](../../harness/evidence/F09-uuid.md).

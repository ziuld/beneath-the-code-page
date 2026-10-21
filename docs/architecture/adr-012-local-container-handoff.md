# ADR 012 — Local container handoff

Date: 2026-10-21. Status: selected implementation under owner-authorised F20/ADR010.

Use a single multi-stage Dockerfile: pinned official Temurin25 JDK builds and runs
Maven verification from source; pinned JRE runs only the executable JAR and a tiny
JDK-compiled health probe as numeric non-root UID/GID10001. Initial tested platform
is linux/amd64. No database, Compose, registry publication or cloud runtime.
Owner clarified development portability too: rebuild/recreate from edited source,
with an optional development target containing Java/Python/Git and a bind-mounted
checkout. Host needs Git/editor/Docker only. Linux UID/GID preserves ownership;
Windows PowerShell commands are documented but require actual host evidence.
No automatic watch/framework or privileged Docker-in-Docker setup.

The existing local profile requires127.0.0.1 and filesystem frontend assets; it
cannot serve Docker bridge port forwarding. A separate `container` profile binds
0.0.0.0:8080 inside the container and retains classpath-only assets. It permits
non-Secure cookies on local HTTP only when that sole profile and exact address
are selected; mixed profiles or changed address fail startup. HTTPS requests keep
Secure. Normal production cookie policy remains unchanged. Docker must publish
only127.0.0.1:8080:8080; container configuration cannot enforce host port mapping.
This explicit local-only exception is unsuitable for LAN/public deployment.

Keep CSRF, HttpOnly/SameSite cookies, CSP and statelessness. Run read-only with a
bounded /tmp tmpfs, all capabilities dropped and no-new-privileges. Java is PID1
for SIGTERM shutdown. A compiled Java HTTP probe avoids installing curl/shell
utilities just for health checks. Retain the native JAR workflow. Image scans and local runtime/development checks are required. Owner decision
2026-10-21 accepts this tested host as sufficient for F20; second-PC checks are
optional and untested platforms remain explicitly unverified. Pin base digests, rebuild/review scans when updating them.

References: [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/),
[Dockerfile reference](https://docs.docker.com/reference/dockerfile/).

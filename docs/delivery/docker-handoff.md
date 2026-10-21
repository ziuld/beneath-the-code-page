# Local Docker handoff

F20 runs the single application with packaged assets. No database, cloud account,
registry or host Java/Node/Maven is needed. The native [JAR runbook](local-release.md)
remains available. Actual results: [F20 evidence](../../harness/evidence/F20-docker.md).
Second-PC acceptance is pending until an actual separate machine runs these steps.

## Prerequisites and build

Use Docker Desktop in Linux-container mode, or a compatible local Linux engine.
Initial verification targets `linux/amd64` (Intel/AMD64). ARM64/Apple Silicon and
other platforms are unverified; do not claim native support from emulation.
The build needs network access to official base images, Ubuntu build packages,
Maven and npm downloads. First build downloads the toolchain and runs full Maven
verification (frontend, Java/architecture and packaged integration tests).

From a clean checkout of the recorded F20 implementation commit:

```sh
docker version
docker build --platform linux/amd64 --progress plain -t beneath-the-code:f20 .
```

Dockerfile pins Temurin25.0.4.1 build/runtime digests. Only the builder installs
unzip: Maven Wrapper otherwise switches to tar.gz while checking the ZIP hash.
No checksum is disabled. The final JRE image contains the application and a
compiled Java health probe, not source/toolchains/caches. The context allowlist
excludes Git, target, node_modules, credentials and owner planning documents.
Review scans and update pinned digests together when refreshing base images.

## Develop from Windows or Linux

Edit source with your host editor and rebuild/recreate the app after changes:

```sh
docker build --platform linux/amd64 -t beneath-the-code:dev-app .
docker run -d --name beneath-the-code --read-only --tmpfs /tmp:rw,noexec,nosuid,size=128m --cap-drop ALL --security-opt no-new-privileges=true --memory 512m --cpus 2 -p 127.0.0.1:8080:8080 beneath-the-code:dev-app
```

Before repeating, stop/remove that named container using the lifecycle commands
below. Rebuilding the image does not replace an already-running container. Docker
reuses unchanged layers; a fresh source build is tested inside the builder. No
host Python, Java or Node installation is needed. This uses packaged assets on
each iteration; automatic source watch/hot reload is not included.

For project scripts or an interactive development shell, build the optional
`development` target. It has Python3, Git, unzip and pinned Java; Maven Wrapper
and locked Node/npm install inside the mounted checkout, not globally:

```sh
docker build --platform linux/amd64 --target development -t beneath-the-code:tooling .
```

Linux/Omarchy/Arch, from the project directory:

```sh
docker run --rm --user "$(id -u):$(id -g)" --mount "type=bind,source=$PWD,target=/workspace" beneath-the-code:tooling
# Interactive alternative:
docker run --rm -it --user "$(id -u):$(id -g)" --mount "type=bind,source=$PWD,target=/workspace" beneath-the-code:tooling bash
```

Windows PowerShell, from the project directory, Docker Desktop Linux containers:

```powershell
docker run --rm --mount "type=bind,source=$($PWD.Path),target=/workspace" beneath-the-code:tooling
docker run --rm -it --mount "type=bind,source=$($PWD.Path),target=/workspace" beneath-the-code:tooling bash
```

The default command runs the project's Maven verifier. The shell can run Python
planning scripts and Maven checks from /workspace. The image's Python version is
shared by hosts; Java/Node/npm/Maven versions remain pinned by the project. Use a
Docker-only checkout so Linux binaries/caches in target/node_modules are not mixed
with Windows-native tooling. The mount is writable: generated checks update the
checkout and caches. Linux uses your UID/GID to preserve ownership. Do not mount
Docker's socket in the tooling container; image lifecycle/scan commands run from
the host. Windows behaviour is documented but remains unverified until tested.

## Run and inspect

```sh
docker run -d --name beneath-the-code --read-only --tmpfs /tmp:rw,noexec,nosuid,size=128m --cap-drop ALL --security-opt no-new-privileges=true --memory 512m --cpus 2 -p 127.0.0.1:8080:8080 beneath-the-code:f20
docker inspect --format '{{.State.Health.Status}}' beneath-the-code
docker logs beneath-the-code
```

Wait until health is `healthy`; startup may take30 seconds or more. Open
[the application](http://localhost:8080). Keep the exact loopback port mapping:
this local HTTP configuration is not suitable for LAN/public access. If8080 is
busy, replace only its host side with8081 and browse localhost:8081.

The sole `container` profile listens on0.0.0.0:8080 inside the container and uses
packaged assets. It permits local-HTTP language/CSRF cookies without Secure;
HttpOnly/SameSite and CSRF checks remain. Mixed profiles/changed bind address fail
startup. Normal production behaviour still requires Secure cookies. Do not use
the development `local` profile, mount frontend files, expose management ports,
mount Docker's socket or override the entrypoint. See [ADR012](../architecture/adr-012-local-container-handoff.md).

Check Home, Tools and all six tools, Learn and the three published Java lessons.
Use EN/ES/FR, submit the language selector and reload to check persistence. Try
JSON formatting/validation/minification, Base64 Unicode, UUID generation/Copy and
JWT Decode with synthetic demo content. JWT signatures are not verified. Processing
stays in the browser. Health is available at /actuator/health; other management
routes remain denied. Real Safari is unverified; F19 Linux WebKit is separate.

## Stop, restart and remove

```sh
docker stop --time 20 beneath-the-code
docker inspect --format '{{.State.ExitCode}}' beneath-the-code
docker start beneath-the-code
docker stop --time 20 beneath-the-code
docker rm beneath-the-code
```

Java runs as PID1, UID/GID10001, with graceful shutdown. No application data volume
is required. Removing this named container does not affect other containers or
images. Never use a global prune as part of these instructions.

## Transfer to a second PC without a registry

On the reviewed build PC:

```sh
docker image inspect --format '{{.Id}} {{.Os}}/{{.Architecture}}' beneath-the-code:f20
docker save -o beneath-the-code-f20.tar beneath-the-code:f20
```

Copy that archive to the second PC using your preferred file transfer. Compare
its SHA256 on both machines with the OS's checksum utility. On the second PC:

```sh
docker load -i beneath-the-code-f20.tar
docker image inspect --format '{{.Id}} {{.Os}}/{{.Architecture}}' beneath-the-code:f20
```

Image ID must match. Follow Run/inspect and Stop/restart above. Alternatively copy
a clean source checkout and build there. Record OS/CPU, Docker Client/Server
versions, image ID, health, assets/locales/tool results and shutdown outcome.
Send those results for review; missing evidence keeps F20 portable acceptance open.
No image upload, registry publication or deployment is implied.

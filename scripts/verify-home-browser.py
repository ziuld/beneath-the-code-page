#!/usr/bin/env python3
"""Run pinned browser tooling against an unmodified packaged app on a dynamic loopback port."""
import argparse
from contextlib import contextmanager, ExitStack
import hashlib
import os
from pathlib import Path
import re
import subprocess
import time
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
NODE = ROOT / "target/frontend-tooling/node/node"
NPM = ROOT / "target/frontend-tooling/node/node_modules/npm/bin/npm-cli.js"
TESTS = ROOT / "tests/e2e"
CLI = TESTS / "node_modules/@playwright/test/cli.js"


def component_fixture(jar):
    """Copy only the shell fixture into a separate executable; never change the normal JAR."""
    output = ROOT / "target/shell-browser-fixture.jar"
    classes = ROOT / "target/test-classes"
    with ZipFile(jar) as original, ZipFile(output, "w") as fixture:
        names = original.namelist()
        if any("btc/fixtures/" in name or "shell-fixture" in name for name in names):
            raise RuntimeError("Fixture leaked into normal executable")
        for info in original.infolist():
            data = original.read(info)
            if info.filename == "META-INF/MANIFEST.MF":
                data = data.replace(b"Start-Class: dev.beneaththecode.BeneathTheCodeApplication",
                                    b"Start-Class: btc.fixtures.ShellFixtureApplication")
            fixture.writestr(info, data)
        for name in ("ShellFixtureApplication", "ShellFixtureController", "ShellFixtureSecurity"):
            path = f"btc/fixtures/{name}.class"
            fixture.writestr("BOOT-INF/classes/" + path, (classes / path).read_bytes(), compress_type=ZIP_DEFLATED)
        fixture.writestr("BOOT-INF/classes/templates/shell-fixture.html",
                         (classes / "templates/shell-fixture.html").read_bytes(), compress_type=ZIP_DEFLATED)
    return output


@contextmanager
def running_jar(jar, log, environment, *arguments):
    with log.open("w") as output:
        process = subprocess.Popen(["java", "-jar", str(jar), "--server.address=127.0.0.1", "--server.port=0", *arguments],
                                   cwd=ROOT, env=environment, stdout=output, stderr=subprocess.STDOUT)
        try:
            deadline = time.monotonic() + 30
            while time.monotonic() < deadline:
                if process.poll() is not None:
                    raise RuntimeError(f"Packaged app exited before readiness; inspect {log}")
                text = log.read_text()
                port = re.search(r"Tomcat started on port (\d+)", text)
                if port and "Started " in text:
                    yield f"http://127.0.0.1:{port.group(1)}"
                    break
                time.sleep(0.1)
            else:
                raise RuntimeError(f"Readiness timed out; inspect {log}")
        finally:
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--install", action="store_true", help="install locked tooling and Chromium project-locally")
    parser.add_argument("--snapshot", type=Path, help="capture EN/ES/FR narrow/wide Home screenshots instead of running tests")
    parser.add_argument("--snapshot-reference-css", type=Path, help="snapshot only: substitute a reference stylesheet in the browser")
    parser.add_argument("--with-deps", action="store_true", help="CI only: install Chromium OS dependencies; may invoke sudo")
    args = parser.parse_args()
    if args.snapshot_reference_css and not args.snapshot:
        parser.error("--snapshot-reference-css requires --snapshot")
    if args.with_deps and os.environ.get("CI") != "true":
        parser.error("--with-deps is restricted to CI; obtain approval for local privileged installs")
    environment = os.environ.copy()
    environment["PATH"] = str(NODE.parent) + os.pathsep + environment["PATH"]
    environment["PLAYWRIGHT_BROWSERS_PATH"] = str(ROOT / "target/browser-cache")
    environment["npm_config_cache"] = str(ROOT / "target/npm-cache")
    if args.install:
        subprocess.run([str(NODE), str(NPM), "ci", "--no-audit", "--no-fund"], cwd=TESTS, env=environment, check=True, timeout=180)
        command = [str(NODE), str(CLI), "install"]
        if args.with_deps:
            command.append("--with-deps")
        subprocess.run([*command, "chromium"], cwd=TESTS, env=environment, check=True, timeout=300)
    jar = ROOT / "target/beneath-the-code-0.1.0-SNAPSHOT.jar"
    digest = hashlib.sha256(jar.read_bytes()).digest()
    fixture = None
    try:
        with ExitStack() as stack:
            environment["BTC_BASE_URL"] = stack.enter_context(running_jar(jar, ROOT / "target/home-browser-server.log", environment))
            if not args.snapshot:
                fixture = component_fixture(jar)
                environment["BTC_COMPONENT_URL"] = stack.enter_context(running_jar(fixture, ROOT / "target/shell-browser-server.log", environment))
                environment["BTC_PREFERENCES_URL"] = stack.enter_context(running_jar(
                    jar, ROOT / "target/preferences-browser-server.log", environment, "--spring.profiles.active=local"))
            subprocess.run([str(NODE), str(CLI), "--version"], cwd=TESTS, env=environment, check=True, timeout=10)
            command = ([str(NODE), str(TESTS / "capture-home.mjs"), str(args.snapshot.resolve())]
                       if args.snapshot else [str(NODE), str(CLI), "test"])
            if args.snapshot_reference_css:
                command.append(str(args.snapshot_reference_css.resolve()))
            subprocess.run(command, cwd=TESTS, env=environment, check=True, timeout=180)
    finally:
        if fixture:
            fixture.unlink(missing_ok=True)
        if hashlib.sha256(jar.read_bytes()).digest() != digest:
            raise RuntimeError("Normal executable changed during browser fixture verification")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Run pinned browser tooling against an unmodified packaged app on a dynamic loopback port."""
import argparse
import os
from pathlib import Path
import re
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]
NODE = ROOT / "target/frontend-tooling/node/node"
NPM = ROOT / "target/frontend-tooling/node/node_modules/npm/bin/npm-cli.js"
TESTS = ROOT / "tests/e2e"
CLI = TESTS / "node_modules/@playwright/test/cli.js"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--install", action="store_true", help="install locked tooling and Chromium project-locally")
    parser.add_argument("--with-deps", action="store_true", help="CI only: install Chromium OS dependencies; may invoke sudo")
    args = parser.parse_args()
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
    log = ROOT / "target/home-browser-server.log"
    with log.open("w") as output:
        process = subprocess.Popen(["java", "-jar", str(jar), "--server.address=127.0.0.1", "--server.port=0"], cwd=ROOT,
                                   env=environment, stdout=output, stderr=subprocess.STDOUT)
        try:
            deadline = time.monotonic() + 30
            while time.monotonic() < deadline:
                if process.poll() is not None:
                    raise RuntimeError(f"Packaged app exited before readiness; inspect {log}")
                text = log.read_text()
                port = re.search(r"Tomcat started on port (\d+)", text)
                if port and "Started BeneathTheCodeApplication" in text:
                    environment["BTC_BASE_URL"] = f"http://127.0.0.1:{port.group(1)}"
                    break
                time.sleep(0.1)
            else:
                raise RuntimeError(f"Readiness timed out; inspect {log}")
            subprocess.run([str(NODE), str(CLI), "--version"], cwd=TESTS, env=environment, check=True, timeout=10)
            subprocess.run([str(NODE), str(CLI), "test"], cwd=TESTS, env=environment, check=True, timeout=180)
        finally:
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)


if __name__ == "__main__":
    main()

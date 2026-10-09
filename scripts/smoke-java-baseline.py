#!/usr/bin/env python3
"""Start the actual executable JAR on loopback, check health, and stop our child process."""
import json
import os
from pathlib import Path
import queue
import re
import subprocess
import threading
import time
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]
JAR = ROOT / 'target/beneath-the-code-0.1.0-SNAPSHOT.jar'
assert JAR.is_file(), f'Missing executable JAR: {JAR}'
with zipfile.ZipFile(JAR) as archive:
    manifest = archive.read('META-INF/MANIFEST.MF').decode()
    assert 'Main-Class: org.springframework.boot.loader.launch.JarLauncher' in manifest
    assert 'Start-Class: dev.beneaththecode.BeneathTheCodeApplication' in manifest
    assert 'Spring-Boot-Version: 4.1.1' in manifest
    assert 'BOOT-INF/classes/dev/beneaththecode/BeneathTheCodeApplication.class' in archive.namelist()

command = ['java', f'-Djava.io.tmpdir={ROOT / "target"}', '-jar', str(JAR),
           '--server.address=127.0.0.1', '--server.port=0']
print('Command:', ' '.join(command))
process = subprocess.Popen(command, cwd=ROOT, stdout=subprocess.PIPE,
                           stderr=subprocess.STDOUT, text=True, env=os.environ.copy())
lines = queue.Queue()

def drain():
    for line in process.stdout:
        lines.put(re.sub(r'(Using generated security password:).*', r'\1 [REDACTED]', line))

reader = threading.Thread(target=drain, daemon=True)
reader.start()
started = False
port = None
try:
    deadline = time.monotonic() + 45
    while time.monotonic() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f'JAR exited before readiness: {process.returncode}')
        try:
            line = lines.get(timeout=0.25)
        except queue.Empty:
            continue
        print(line, end='')
        match = re.search(r'Tomcat started on port (\d+)', line)
        if match:
            port = int(match.group(1))
        if 'Started BeneathTheCodeApplication in' in line:
            started = True
        if started and port:
            break
    assert started and port, 'Packaged application did not start within 45 seconds'
    # Ignore proxy environment variables for this strictly local request.
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    with opener.open(f'http://127.0.0.1:{port}/actuator/health', timeout=5) as response:
        assert response.status == 200
        assert json.load(response)['status'] == 'UP'
    print('PASS: executable manifest, packaged application startup, HTTP 200 health UP')
finally:
    process.terminate()
    try:
        process.wait(timeout=10)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)
    reader.join(timeout=2)
    print(f'Child process stopped; exit status {process.returncode}')

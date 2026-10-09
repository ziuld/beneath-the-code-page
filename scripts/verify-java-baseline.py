#!/usr/bin/env python3
"""Run real Maven verification, redact its development password, and preserve failure status."""
import os
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
(ROOT / 'target').mkdir(exist_ok=True)
environment = os.environ.copy()
# Keep downloads and JVM temporary files project-local; the repository survives Maven clean.
environment['MAVEN_OPTS'] = (environment.get('MAVEN_OPTS', '')
                            + f' -Dmaven.repo.local={ROOT / ".mvn/local-repository"}'
                            + f' -Djava.io.tmpdir={ROOT / "target"}')
command = ['./mvnw', '--batch-mode', '--no-transfer-progress', 'verify', *sys.argv[1:]]
print('Command:', ' '.join(command), flush=True)
with subprocess.Popen(command, cwd=ROOT, env=environment, stdout=subprocess.PIPE,
                      stderr=subprocess.STDOUT, text=True) as process:
    for line in process.stdout:
        print(re.sub(r'(Using generated security password:).*', r'\1 [REDACTED]', line),
              end='', flush=True)
    result = process.wait()
print(f'Maven exit status: {result}', flush=True)
sys.exit(result if result >= 0 else 128 - result)

#!/usr/bin/env python3
"""Install checksum-pinned Linux x86-64 scanners inside target, never globally."""
import hashlib
import io
import os
from pathlib import Path
import platform
import subprocess
import sys
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / 'target/security-tools'
RULES_REVISION = '17e31e11ebac99fb7dfe1cd288f7a32151b6f3f9'
TRIVY_VERSION = '0.76.0'
SEMGREP_VERSION = '1.181.0'
UV_VERSION = '0.13.1'
RULES = {
    'java/spring/security/audit/spring-csrf-disabled.yaml': 'e71c22c4bd945aeed67d0096a54ce9c2367eaba28f187b923e286f716e8253df',
    'java/lang/security/audit/tainted-cmd-from-http-request.yaml': '68b112fafe0e85eda944e1dd2feafe223973693a312e19be6f0a8b8e88581881',
    'java/lang/security/audit/object-deserialization.yaml': 'cac2bdf142dba24319c1ef2a8c3406d937d909cd015a32c10851cecc97fa511c',
    'java/lang/security/audit/xxe/documentbuilderfactory-disallow-doctype-decl-missing.yaml': 'b5cb9252ae64f8c45cd58b320a252d8348ba56d5b80b6080541525b63640d2a8',
    'javascript/browser/security/eval-detected.yaml': '356589363d16cda8bd2ca1d296ce2b6953105ee4c751ddbbc9bcde5849341811',
    'javascript/browser/security/insecure-innerhtml.yaml': '3f2854f92c3c8a1ba3a107a140a5b31789650851be57586fd21a409e129193e4',
    'javascript/browser/security/dom-based-xss.yaml': 'd34055a348ee0d5e6f5587825bd14c9546997550e624e3966e5ef8438f86381d',
    'LICENSE': '1a6466ae5f1c68631bbd13e3f1aa8f380d84219853c08f0456b853fccfacee1d',
}


def environment():
    env = os.environ.copy()
    for key in tuple(env):
        if key.startswith(('SEMGREP_', 'TRIVY_')):
            env.pop(key)
    env.update(HOME=str(TOOLS / 'home'), XDG_CACHE_HOME=str(TOOLS / 'cache'),
               XDG_CONFIG_HOME=str(TOOLS / 'config'), UV_CACHE_DIR=str(TOOLS / 'uv-cache'),
               UV_NO_CONFIG='1', UV_PYTHON_DOWNLOADS='never',
               SEMGREP_SEND_METRICS='off', SEMGREP_ENABLE_VERSION_CHECK='0',
               SEMGREP_SETTINGS_FILE=str(TOOLS / 'semgrep-settings.yml'),
               TRIVY_CACHE_DIR=str(TOOLS / 'trivy-cache'),
               TMPDIR=str(TOOLS / 'tmp'))
    for name in ('home', 'cache', 'config', 'tmp'):
        (TOOLS / name).mkdir(parents=True, exist_ok=True)
    return env


def download(url, digest, destination):
    if destination.is_file() and hashlib.sha256(destination.read_bytes()).hexdigest() == digest:
        return
    data = urllib.request.urlopen(url, timeout=120).read()
    if hashlib.sha256(data).hexdigest() != digest:
        raise RuntimeError('Scanner distribution checksum mismatch')
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)


def binary(url, digest, member, name):
    archive = TOOLS / 'downloads' / url.rsplit('/', 1)[1]
    download(url, digest, archive)
    with tarfile.open(fileobj=io.BytesIO(archive.read_bytes())) as source:
        entry = source.getmember(member)
        if not entry.isfile():
            raise RuntimeError('Scanner binary is not a regular file')
        content = source.extractfile(entry).read()
    destination = TOOLS / 'bin' / name
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(content)
    destination.chmod(0o755)
    return destination


def main():
    if platform.system() != 'Linux' or platform.machine() != 'x86_64':
        raise RuntimeError('Security tooling currently supports Linux x86-64 only')
    env = environment()
    trivy = binary(
        'https://github.com/aquasecurity/trivy/releases/download/v0.76.0/trivy_0.76.0_Linux-64bit.tar.gz',
        'e24b1c51293c1b15e4ba8d45bbc7891ba053f90278ec2698f3562c993e145fe7', 'trivy', 'trivy')
    uv = binary(
        'https://github.com/astral-sh/uv/releases/download/0.13.1/uv-x86_64-unknown-linux-gnu.tar.gz',
        'eadd9d27c134ab5ac1ffd4473b97a741407f3ea238288f03121fc4deddf90220',
        'uv-x86_64-unknown-linux-gnu/uv', 'uv')
    venv = TOOLS / 'semgrep'
    if not (venv / 'bin/python').exists():
        subprocess.run([str(uv), 'venv', '--python', sys.executable, str(venv)], env=env, check=True)
    subprocess.run([str(uv), 'pip', 'sync', '--python', str(venv / 'bin/python'),
                    '--require-hashes', str(ROOT / 'security/requirements.lock')], env=env, check=True)
    for path, digest in RULES.items():
        download(f'https://raw.githubusercontent.com/semgrep/semgrep-rules/{RULES_REVISION}/{path}',
                 digest, TOOLS / 'rules' / path)
    subprocess.run([str(trivy), '--version'], env=env, check=True)
    subprocess.run([str(venv / 'bin/semgrep'), '--version'], env=env, check=True)


if __name__ == '__main__':
    main()

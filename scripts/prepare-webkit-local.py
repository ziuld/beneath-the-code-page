#!/usr/bin/env python3
"""Supply the three missing WebKit WPE libraries in target only; no OS installer."""
import hashlib
from pathlib import Path
import subprocess
from shlex import quote
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / 'target/f19-webkit-runtime'
BUNDLE = ROOT / 'target/browser-cache/webkit-2359/minibrowser-wpe'
# Official Ubuntu Noble package-index SHA256 values, checked 2026-10-21.
# Browser-test dependencies only; never added to the application JAR or image.
PACKAGES = (
    ('pool/main/i/icu/libicu74_74.2-1ubuntu3.1_amd64.deb',
     'c9a70989678660eed9a1e904c74fa043da8bec8e2036856fc16e31ced79b04f8'),
    ('pool/main/libx/libxml2/libxml2_2.9.14+dfsg-1.3ubuntu3.10_amd64.deb',
     'c5a065f85c1e6f605741e365e40cad71c3ceb0e85e2791400bd35b8896e12ad1'),
    ('pool/universe/f/flite/libflite1_2.2-6build3_amd64.deb',
     '367f1d0da5cd38759a0515eafc27aa133b2d7bf99308cac34831df0212e96b75'),
)


def main():
    if not (BUNDLE / 'bin/MiniBrowser').is_file():
        raise SystemExit('Install the pinned project-local Playwright WebKit2359 first.')
    RUNTIME.mkdir(parents=True, exist_ok=True)
    extracted = RUNTIME / 'root'
    extracted.mkdir(exist_ok=True)
    for filename, digest in PACKAGES:
        archive = RUNTIME / Path(filename).name
        if not archive.is_file() or hashlib.sha256(archive.read_bytes()).hexdigest() != digest:
            with urlopen('https://archive.ubuntu.com/ubuntu/' + filename, timeout=30) as response:
                data = response.read(32 * 1024 * 1024)
            if hashlib.sha256(data).hexdigest() != digest:
                raise RuntimeError('WebKit dependency checksum mismatch: ' + archive.name)
            archive.write_bytes(data)
        members = subprocess.check_output(['ar', 't', str(archive)], text=True).splitlines()
        member = next(name for name in members if name.startswith('data.tar.'))
        payload = subprocess.check_output(['ar', 'p', str(archive), member])
        # Extract shared libraries only. Never run package maintainer scripts.
        subprocess.run(['bsdtar', '-xf', '-', '-C', str(extracted), './usr/lib/x86_64-linux-gnu'],
                       input=payload, check=True)
    libraries = extracted / 'usr/lib/x86_64-linux-gnu'
    launcher = RUNTIME / 'webkit'
    launcher.write_text(f'''#!/bin/sh
export WEBKIT_EXEC_PATH={quote(str(BUNDLE / 'bin'))}
export WEBKIT_INJECTED_BUNDLE_PATH={quote(str(BUNDLE / 'lib'))}
export LD_LIBRARY_PATH={quote(str(libraries) + ":" + str(BUNDLE / 'lib') + ":" + str(BUNDLE / 'sys/lib'))}
exec {quote(str(BUNDLE / 'bin/MiniBrowser'))} "$@"
''')
    launcher.chmod(0o755)
    print('Project-local WebKit launcher:', launcher)
    print('Run with BTC_WEBKIT_EXECUTABLE set to that path. No system files changed.')


if __name__ == '__main__':
    main()

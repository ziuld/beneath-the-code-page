#!/usr/bin/env python3
"""Verify the Maven ZIP against published SHA-512 and test wrapper SHA-256 enforcement."""
import argparse
import hashlib
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--print-sha256', action='store_true',
                    help='verify upstream SHA-512 and print the derived pin without executing Maven')
args = parser.parse_args()
properties = (ROOT / '.mvn/wrapper/maven-wrapper.properties').read_text()
settings = dict(line.split('=', 1) for line in properties.splitlines()
                if '=' in line and not line.lstrip().startswith('#'))
url = settings['distributionUrl'].strip()
if not url.startswith('https://') or not url.endswith('-bin.zip'):
    raise SystemExit('Expected an HTTPS Maven distribution ZIP URL')

target = ROOT / 'target'
target.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='wrapper-checksum-', dir=target) as temporary:
    directory = Path(temporary)
    archive = directory / 'maven-bin.zip'
    with urllib.request.urlopen(url + '.sha512', timeout=60) as response:
        published = response.read().decode('ascii').split()[0].lower()
    if not re.fullmatch(r'[0-9a-f]{128}', published):
        raise SystemExit('Invalid published SHA-512 checksum')
    with urllib.request.urlopen(url, timeout=60) as response, archive.open('wb') as output:
        shutil.copyfileobj(response, output)
    with archive.open('rb') as stream:
        actual512 = hashlib.file_digest(stream, 'sha512').hexdigest()
    if actual512 != published:
        raise SystemExit('Downloaded Maven ZIP does not match the published SHA-512')
    with archive.open('rb') as stream:
        actual256 = hashlib.file_digest(stream, 'sha256').hexdigest()
    print('Distribution URL:', url)
    print('Published and verified SHA-512:', actual512)
    print('Derived SHA-256:', actual256)
    if args.print_sha256:
        raise SystemExit(0)

    pin = settings.get('distributionSha256Sum', '').strip().lower()
    if not re.fullmatch(r'[0-9a-f]{64}', pin) or pin != actual256:
        raise SystemExit('Configured SHA-256 pin is absent or differs from the verified archive')

    for label, checksum, expected_status in [('valid', pin, 0), ('invalid', '0' * 64, 1)]:
        workspace = directory / label
        wrapper_directory = workspace / '.mvn/wrapper'
        wrapper_directory.mkdir(parents=True)
        wrapper = workspace / 'mvnw'
        shutil.copy2(ROOT / 'mvnw', wrapper)
        changed_properties = re.sub(r'^distributionSha256Sum=.*$',
                                    'distributionSha256Sum=' + checksum, properties, flags=re.M)
        (wrapper_directory / 'maven-wrapper.properties').write_text(changed_properties)
        cache = workspace / 'cache'
        if cache.exists():
            raise SystemExit('Checksum verification requires a fresh wrapper cache')
        environment = os.environ.copy()
        # Do not inherit distribution overrides or credentials for this public-artifact check.
        for key in ('MVNW_REPOURL', 'MVNW_USERNAME', 'MVNW_PASSWORD', 'MVNW_VERBOSE'):
            environment.pop(key, None)
        environment['MAVEN_USER_HOME'] = str(cache)
        environment['HOME'] = str(workspace)
        environment['TMPDIR'] = str(directory)
        environment['MAVEN_OPTS'] = (f'-Dmaven.repo.local={ROOT / ".mvn/local-repository"}'
                                     f' -Djava.io.tmpdir={directory}')
        result = subprocess.run([str(wrapper), '--version'], cwd=workspace, env=environment,
                                stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                text=True, timeout=120)
        print(f'{label} pin: fresh-cache ./mvnw --version exit {result.returncode}')
        print(result.stdout, end='')
        if result.returncode != expected_status:
            raise SystemExit(f'Unexpected {label} checksum exit status')
        installed = list(cache.glob('wrapper/dists/**/bin/mvn'))
        if label == 'valid':
            if not installed or 'Apache Maven 3.10.0' not in result.stdout:
                raise SystemExit('Valid checksum did not install the prescribed Maven version')
        elif installed or 'Failed to validate Maven distribution SHA-256' not in result.stdout:
            raise SystemExit('Incorrect checksum was not rejected before Maven installation')

print('PASS: published archive identity, pinned SHA-256, fresh installation and mismatch rejection')

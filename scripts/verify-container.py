#!/usr/bin/env python3
"""Verify an existing F20 image; only create/remove our uniquely named container."""
import argparse
import hashlib
import http.cookiejar
import json
import os
from pathlib import Path
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
import zipfile

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / 'target'


def docker(*args):
    return subprocess.check_output(['docker', *args], text=True).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image', default='beneath-the-code:f20')
    parser.add_argument('--browser', action='store_true', help='run existing six-tool Chromium checks too')
    args = parser.parse_args()
    name = 'btc-f20-check-' + uuid.uuid4().hex[:10]
    report = {'image': args.image, 'status': 'incomplete'}
    TARGET.mkdir(exist_ok=True)
    try:
        docker('run', '-d', '--name', name, '--read-only', '--tmpfs', '/tmp:rw,noexec,nosuid,size=128m',
               '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges=true', '--memory', '512m', '--cpus', '2',
               '-p', '127.0.0.1::8080', args.image)
        state = json.loads(docker('inspect', name))[0]
        report['image_id'] = state['Image']
        assert state['Config']['User'] == '10001:10001'
        assert state['HostConfig']['ReadonlyRootfs'] and state['HostConfig']['CapDrop'] == ['ALL']
        mapping = state['NetworkSettings']['Ports']['8080/tcp'][0]
        assert mapping['HostIp'] == '127.0.0.1'
        base = 'http://127.0.0.1:' + mapping['HostPort']
        deadline = time.monotonic() + 90
        while time.monotonic() < deadline:
            state = json.loads(docker('inspect', name))[0]
            if state['State']['Health']['Status'] == 'healthy':
                break
            assert state['State']['Running'], 'container exited before health'
            time.sleep(1)
        else:
            raise RuntimeError('container did not become healthy')
        assert docker('exec', name, 'id', '-u') == '10001'
        assert docker('exec', name, 'sh', '-c', 'test ! -d /build && test ! -d /app/target && test ! -f /app/pom.xml; echo $?') == '0'
        docker('cp', name + ':/app/application.jar', str(TARGET / 'f20-image.jar'))
        with zipfile.ZipFile(TARGET / 'f20-image.jar') as jar:
            manifest = jar.read('BOOT-INF/classes/asset-manifest.json')
            entries = json.loads(manifest)
            for entry in entries.values():
                for asset in [entry['file'], *entry.get('css', [])]:
                    jar.getinfo('BOOT-INF/classes/' + asset)
            if args.browser:
                assert manifest == (TARGET / 'frontend/asset-manifest.json').read_bytes(), 'frontend differs: refresh verification assets from candidate'
        report['jar_sha256'] = hashlib.sha256((TARGET / 'f20-image.jar').read_bytes()).hexdigest()
        cookies = http.cookiejar.CookieJar()
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), urllib.request.HTTPCookieProcessor(cookies))
        def get(path):
            return opener.open(base + path, timeout=10)
        with get('/actuator/health') as response:
            health = json.load(response)
            assert health['status'] == 'UP' and 'components' not in health
        routes = ['/', '/tools', '/tools/json-formatter', '/tools/json-validator', '/tools/json-minifier',
                  '/tools/base64', '/tools/uuid', '/tools/jwt', '/learn', '/learn/java-fundamentals',
                  '/learn/java-fundamentals/source-to-jvm', '/learn/java-fundamentals/values-types-numeric-limits',
                  '/learn/java-fundamentals/control-flow-tracing']
        assets = set()
        for locale in ['en', 'es', 'fr']:
            for route in routes:
                with get(route + '?lang=' + locale) as response:
                    text = response.read().decode()
                    assert 'lang="' + locale + '"' in text
                    assert response.headers['Cache-Control'] == 'no-store'
                    assert "connect-src 'none'" in response.headers['Content-Security-Policy']
                    assets.update(re.findall(r'(?:src|href)="(/assets/[^\"]+)"', text))
            with get('/?lang=en') as response:
                text = response.read().decode()
                token = re.search(r'name="_csrf"[^>]*value="([^\"]+)"', text)[1]
            data = urllib.parse.urlencode({'_csrf': token, 'language': locale, 'returnTo': '/tools/uuid'}).encode()
            with opener.open(base + '/preferences/language', data=data, timeout=10) as response:
                assert response.url == base + '/tools/uuid'
                assert 'lang="' + locale + '"' in response.read().decode()
        for asset in assets:
            with get(asset) as response:
                assert 'immutable' in response.headers['Cache-Control']
                assert len(response.read()) > 0
        for path in ['/actuator/env', '/actuator', '/asset-manifest.json']:
            try:
                get(path)
                raise AssertionError('private route exposed: ' + path)
            except urllib.error.HTTPError as error:
                assert error.code == 403
        try:
            opener.open(base + '/preferences/language', data=b'language=es', timeout=10)
            raise AssertionError('CSRF missing-token rejection failed')
        except urllib.error.HTTPError as error:
            assert error.code == 403
        assert all(cookie.name in ['XSRF-TOKEN', 'BTC_LANGUAGE'] for cookie in cookies)
        if args.browser:
            # Existing tool assertions use exact build-known assets and synthetic sentinels.
            (TARGET / 'home-browser-server.log').write_text(docker('logs', name))
            env = os.environ.copy()
            env.update(BTC_BASE_URL=base, BTC_LOCAL_URL=base, BTC_PREFERENCES_URL=base,
                       PLAYWRIGHT_BROWSERS_PATH=str(TARGET / 'browser-cache'))
            command = [str(TARGET / 'frontend-tooling/node/node'), 'node_modules/@playwright/test/cli.js', 'test',
                       'editor-json-formatter.spec.mjs',
                       'editor-json-validator-minifier.spec.mjs', 'base64.spec.mjs', 'uuid.spec.mjs', 'jwt.spec.mjs', '--project=chromium']
            subprocess.run(command, cwd=ROOT / 'tests/e2e', env=env, check=True, timeout=300)
            (TARGET / 'f20-browser-results.json').write_bytes((TARGET / 'browser-results.json').read_bytes())
        logs = docker('logs', name)
        assert 'SYNTHETIC_' not in logs, 'synthetic tool content reached application logs'
        (TARGET / 'f20-container.log').write_text(logs)
        docker('stop', '--time', '20', name)
        state = json.loads(docker('inspect', name))[0]
        assert not state['State']['OOMKilled']
        assert state['State']['ExitCode'] in [0, 143], 'ungraceful shutdown'
        assert 'Graceful shutdown complete' in docker('logs', name)
        report.update(status='pass', routes_locales=39, immutable_assets=len(assets),
                      non_root=True, local_http_preferences=True, csrf_rejection=True,
                      management_isolated=True, shutdown_exit=state['State']['ExitCode'])
        print(json.dumps(report, indent=2))
    finally:
        subprocess.run(['docker', 'rm', '-f', name], capture_output=True)
        (TARGET / 'f20-container-results.json').write_text(json.dumps(report, indent=2) + '\n')


if __name__ == '__main__':
    main()

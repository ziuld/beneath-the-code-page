#!/usr/bin/env python3
"""Scan an existing local image with pinned tooling; fail closed on incomplete coverage."""
import argparse
from datetime import datetime, timezone
import importlib.util
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('application_security', ROOT / 'scripts/verify-security.py')
security = importlib.util.module_from_spec(spec)
spec.loader.exec_module(security)
OUTPUT = ROOT / 'target/container-security'


def validate_report(report):
    findings = security.trivy_findings(report)
    results = report.get('Results') or []
    if not any(item.get('Class') == 'os-pkgs' and item.get('Packages') for item in results):
        raise ValueError('missing-image-os-inventory')
    packages = {p['Name']: p['Version'] for item in results if item.get('Type') == 'jar'
                for p in item.get('Packages') or []}
    if not packages or any(packages.get(name) != version for name, version in security.expected_java_versions().items()):
        raise ValueError('missing-or-mismatched-image-java-inventory')
    return findings


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image', default='beneath-the-code:f20')
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    summary = {'status': 'incomplete', 'image': args.image}
    archive = OUTPUT / 'image.tar'
    try:
        env = security.install.environment()
        tool = str(security.TOOLS / 'bin/trivy')
        _, version = security.run_json([tool, 'version', '--format', 'json'], env)
        if version.get('Version') != security.install.TRIVY_VERSION:
            raise ValueError('trivy-version-mismatch')
        summary['image_id'] = subprocess.check_output(['docker', 'image', 'inspect', '--format', '{{.Id}}', args.image], text=True).strip()
        subprocess.run(['docker', 'save', '-o', str(archive), args.image], check=True, timeout=120)
        command = [tool, '--config', '', '--timeout', '8m', 'image', '--input', str(archive),
                   '--scanners', 'vuln', '--format', 'json', '--list-all-pkgs', '--ignorefile', '',
                   '--disable-telemetry', '--skip-version-check']
        code, report = security.run_json(command, env)
        if code:
            raise ValueError('image-scanner-process-failure')
        findings = validate_report(report)
        _, version = security.run_json([tool, 'version', '--format', 'json'], env)
        summary['databases'] = security.database_freshness(version, datetime.now(timezone.utc))
        summary['findings'] = findings
        (OUTPUT / 'report.json').write_text(json.dumps(report, indent=2) + '\n')
        sbom = [tool, '--config', '', '--timeout', '8m', 'image', '--input', str(archive),
                '--format', 'cyclonedx', '--output', str(OUTPUT / 'sbom.cdx.json'),
                '--disable-telemetry', '--skip-version-check']
        subprocess.run(sbom, env=env, check=True, timeout=600, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        if not json.loads((OUTPUT / 'sbom.cdx.json').read_text()).get('components'):
            raise ValueError('empty-image-sbom')
        summary['status'] = 'fail' if any(f['blocking'] for f in findings) else 'pass'
    finally:
        archive.unlink(missing_ok=True)
        (OUTPUT / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    print('Container security:', summary['status'], '; findings:', len(summary['findings']))
    return 0 if summary['status'] == 'pass' else 1


if __name__ == '__main__':
    raise SystemExit(main())

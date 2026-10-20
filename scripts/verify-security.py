#!/usr/bin/env python3
"""Fixed local/CI application security gate; never print scanner source excerpts."""
import hashlib
import importlib.util
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('security_install', ROOT / 'scripts/install-security-tools.py')
install = importlib.util.module_from_spec(spec)
spec.loader.exec_module(install)
TOOLS = install.TOOLS
OUTPUT = ROOT / 'target/security'
JAR = 'target/beneath-the-code-0.1.0-SNAPSHOT.jar'
LOCKS = ('src/main/frontend/package-lock.json', 'tests/e2e/package-lock.json')


def run_json(command, env):
    result = subprocess.run(command, cwd=ROOT, env=env, capture_output=True, text=True, timeout=600)
    if result.returncode not in (0, 1):
        raise ValueError('scanner-process-failure')
    try:
        report = json.loads(result.stdout)
    except (ValueError, TypeError):
        raise ValueError('invalid-scanner-report') from None
    if not isinstance(report, dict):
        raise ValueError('invalid-scanner-report')
    # Trivy can warn about an incomplete dependency graph without failing its process.
    if any(marker in result.stderr for marker in ('WARN', 'ERROR', 'FATAL')):
        raise ValueError('scanner-warning-or-error')
    return result.returncode, report


def trivy_findings(report):
    results = report.get('Results')
    # Trivy omits Results for a valid clean scan; retain the report identity check.
    if results is None and report.get('ArtifactName') and report.get('ArtifactType'):
        results = []
    if report.get('SchemaVersion') != 2 or not isinstance(results, list):
        raise ValueError('invalid-trivy-report')
    findings = []
    for item in results:
        for field in ('Vulnerabilities', 'Secrets'):
            for finding in item.get(field) or []:
                severity = finding.get('Severity')
                identifier = finding.get('VulnerabilityID' if field == 'Vulnerabilities' else 'RuleID')
                if severity not in ('UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL') or not identifier:
                    raise ValueError('invalid-trivy-finding')
                findings.append({'scanner': 'trivy', 'kind': field, 'id': identifier,
                                 'target': item.get('Target'), 'severity': severity,
                                 'package': finding.get('PkgName'),
                                 'version': finding.get('InstalledVersion'),
                                 'line': finding.get('StartLine'),
                                 'blocking': field == 'Secrets' or severity in ('HIGH', 'CRITICAL')})
    return findings


def dependency_inventory(report):
    inventory = {}
    for item in report.get('Results', []):
        packages = item.get('Packages') or []
        if packages:
            inventory[item['Target']] = {p['Name']: p['Version'] for p in packages}
    # Each npm input must be represented independently, including dev dependencies.
    for lock in LOCKS:
        expected = json.loads((ROOT / lock.replace('package-lock.json', 'package.json')).read_text())
        actual = inventory.get(lock, {})
        for name, version in {**expected.get('dependencies', {}), **expected.get('devDependencies', {})}.items():
            if actual.get(name) != version:
                raise ValueError('incomplete-npm-inventory')
    java = [item for item in report.get('Results', []) if item.get('Type') in ('pom', 'jar')]
    for kind in ('pom', 'jar'):
        packages = [p for item in java if item['Type'] == kind for p in item.get('Packages', [])]
        if not any(p['Name'] == 'org.springframework.boot:spring-boot' and p['Version'] == '4.1.1' for p in packages):
            raise ValueError('incomplete-java-inventory')
    return {target: len(packages) for target, packages in inventory.items()}


def semgrep_findings(report, expected):
    if report.get('errors') != [] or report.get('skipped_rules'):
        raise ValueError('incomplete-semgrep-analysis')
    scanned = {str(Path(path).resolve()) for path in report.get('paths', {}).get('scanned', [])}
    if scanned != {str(path.resolve()) for path in expected}:
        raise ValueError('incomplete-source-coverage')
    if not isinstance(report.get('results'), list):
        raise ValueError('invalid-semgrep-report')
    findings = []
    for item in report['results']:
        extra = item['extra']
        severity = extra.get('severity')
        if severity not in ('INFO', 'WARNING', 'ERROR'):
            raise ValueError('invalid-semgrep-finding')
        findings.append({'scanner': 'semgrep', 'id': item['check_id'],
                         'target': str(Path(item['path']).resolve().relative_to(ROOT)),
                         'line': item['start']['line'], 'severity': severity,
                         'blocking': severity == 'ERROR' or extra.get('metadata', {}).get('impact') in ('HIGH', 'CRITICAL')})
    return findings


def database_freshness(version, now):
    times = {}
    for key in ('VulnerabilityDB', 'JavaDB'):
        entry = version.get(key, {})
        timestamp = entry.get('UpdatedAt')
        if not timestamp:
            raise ValueError('missing-database-metadata')
        updated = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        if updated.tzinfo is None or not timedelta(minutes=-5) <= now - updated <= timedelta(hours=24):
            raise ValueError('stale-database')
        times[key] = timestamp
    return times


def configuration_digest(root=ROOT):
    """Bind applicability to reviewed server code/config, not JAR timestamps or UI prose."""
    paths = {root / 'pom.xml'}
    paths.update(p for p in (root / 'src/main/java').rglob('*') if p.is_file())
    paths.update(p for p in (root / 'src/main/resources').rglob('*')
                 if p.is_file() and p.suffix in ('.yaml', '.yml', '.xml', '.properties')
                 and 'i18n' not in p.relative_to(root / 'src/main/resources').parts)
    paths.update(p for p in (root / 'src/main/webapp').rglob('*') if p.is_file())
    hashes = {'source:' + str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in sorted(paths)}
    with zipfile.ZipFile(root / JAR) as jar:
        for name in sorted(jar.namelist()):
            if name.startswith('BOOT-INF/classes/') and (name.endswith('.class') or (
                    name.endswith(('.yaml', '.yml', '.xml', '.properties'))
                    and not name.startswith('BOOT-INF/classes/i18n/'))):
                hashes['packaged:' + name] = hashlib.sha256(jar.read(name)).hexdigest()
    if not any(name.endswith('.class') for name in hashes):
        raise ValueError('missing-packaged-server-code')
    return hashlib.sha256(json.dumps(hashes, sort_keys=True).encode()).hexdigest()


def apply_dispositions(findings, policy, digest, now):
    """Apply only explicit, current, exact package/version/CVE applicability decisions."""
    if (not isinstance(policy, dict) or policy.get('owner') != 'Ziuld' or not policy.get('approval_reference')
            or policy.get('configuration_sha256') != digest):
        raise ValueError('invalid-applicability-scope')
    approved = datetime.fromisoformat(policy['approved_on']).date()
    expires = datetime.fromisoformat(policy['expires']).date()
    if not approved <= now.date() < expires:
        raise ValueError('expired-or-future-disposition')
    decisions = {}
    for item in policy['findings']:
        key = (item['id'], item['package'], item['version'])
        if not all(key) or not item.get('reason') or key in decisions:
            raise ValueError('invalid-applicability-decision')
        decisions[key] = item
    for finding in findings:
        key = (finding['id'], finding.get('package'), finding.get('version'))
        if (finding['scanner'] == 'trivy' and finding.get('kind') == 'Vulnerabilities'
                and finding.get('target') in ('pom.xml', 'Java') and key in decisions):
            finding.update(default_blocking=finding['blocking'], blocking=False,
                           disposition='not_affected_for_reviewed_configuration',
                           reason=decisions[key]['reason'], owner=policy['owner'],
                           expires=policy['expires'], approval_reference=policy['approval_reference'])
    return findings


def source_files():
    return sorted([*ROOT.glob('src/main/java/**/*.java'),
                   *(p for p in ROOT.glob('src/main/frontend/**/*.ts')
                     if 'node_modules' not in p.parts and not p.name.endswith('.test.ts'))])


def trivy_command(scanner, directory, mode='fs'):
    command = [str(TOOLS / 'bin/trivy'), '--config', '', '--timeout', '8m', mode,
            '--scanners', scanner, '--format', 'json', '--list-all-pkgs',
            '--pkg-types', 'library', '--ignorefile', '', '--secret-config', '',
            '--disable-telemetry', '--skip-version-check']
    if mode == 'fs':
        command.append('--include-dev-deps')
    return [*command, str(directory)]


def semgrep_command(files):
    command = [str(TOOLS / 'semgrep/bin/semgrep'), 'scan', '--oss-only', '--json',
               '--strict', '--error', '--metrics', 'off', '--disable-version-check',
               '--disable-nosem', '--no-git-ignore']
    for rule in install.RULES:
        if rule != 'LICENSE':
            command.extend(['--config', str(TOOLS / 'rules' / rule)])
    return [*command, *(str(path) for path in files)]


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    summary = {'status': 'incomplete', 'findings': [], 'commands': []}
    try:
        env = install.environment()
        for path, digest in install.RULES.items():
            if hashlib.sha256((TOOLS / 'rules' / path).read_bytes()).hexdigest() != digest:
                raise ValueError('rules-checksum-mismatch')
        _, version = run_json([str(TOOLS / 'bin/trivy'), 'version', '--format', 'json'], env)
        if version.get('Version') != install.TRIVY_VERSION:
            raise ValueError('trivy-version-mismatch')
        semgrep_version = subprocess.run([str(TOOLS / 'semgrep/bin/semgrep'), '--version'],
                                        env=env, capture_output=True, text=True, timeout=30)
        if semgrep_version.returncode or semgrep_version.stdout.strip() != install.SEMGREP_VERSION:
            raise ValueError('semgrep-version-mismatch')
        summary.update(revision=subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
                       dirty=bool(subprocess.check_output(['git', 'status', '--porcelain'], cwd=ROOT)),
                       scanners={'trivy': install.TRIVY_VERSION, 'semgrep': install.SEMGREP_VERSION},
                       rules_revision=install.RULES_REVISION)
        candidates = subprocess.check_output(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=ROOT).decode().split('\0')
        inputs = {p: hashlib.sha256((ROOT / p).read_bytes()).hexdigest()
                  for p in sorted(set(candidates + [JAR])) if p and (ROOT / p).is_file() and not (ROOT / p).is_symlink()}
        if JAR not in inputs or not all(lock in inputs for lock in LOCKS):
            raise ValueError('missing-dependency-input')
        summary['inputs'] = inputs
        # Let Maven analysis reuse the existing local Maven cache, without global writes.
        maven = TOOLS / 'home/.m2/repository'
        maven.parent.mkdir(parents=True, exist_ok=True)
        if not maven.exists():
            maven.symlink_to(ROOT / '.mvn/local-repository', target_is_directory=True)
        with tempfile.TemporaryDirectory(dir=OUTPUT, prefix='inputs-') as temporary:
            stage = Path(temporary)
            for name in inputs:
                if name == JAR:
                    continue
                destination = stage / 'repository' / name
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, destination)
            for name in ('pom.xml', *LOCKS, JAR):
                folder = 'packaged' if name == JAR else 'dependencies'
                destination = stage / folder / name
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, destination)
            dependency_report = {'Results': []}
            for scanner, folder, mode in (('vuln', 'dependencies', 'fs'),
                                          ('vuln', 'packaged', 'rootfs'),
                                          ('secret', 'repository', 'fs')):
                command = trivy_command(scanner, stage / folder, mode)
                summary['commands'].append(command[:-1] + [f'<staged-{folder}>'])
                code, report = run_json(command, env)
                if code:
                    raise ValueError('trivy-process-failure')
                if scanner == 'vuln':
                    dependency_report['Results'].extend(report.get('Results') or [])
                    if folder == 'packaged':
                        summary['inventory'] = dependency_inventory(dependency_report)
                summary['findings'].extend(trivy_findings(report))
            files = source_files()
            if not files:
                raise ValueError('missing-application-source')
            command = semgrep_command(files)
            summary['commands'].append(command)
            code, report = run_json(command, env)
            findings = semgrep_findings(report, files)
            if code and not findings:
                raise ValueError('semgrep-process-failure')
            summary['findings'].extend(findings)
            summary['source_files_scanned'] = len(files)
        _, version = run_json([str(TOOLS / 'bin/trivy'), 'version', '--format', 'json'], env)
        summary['databases'] = database_freshness(version, datetime.now(timezone.utc))
        policy = json.loads((ROOT / 'security/applicability.json').read_text())
        digest = configuration_digest()
        summary['findings'] = apply_dispositions(summary['findings'], policy, digest, datetime.now(timezone.utc))
        summary['applicability'] = {'configuration_sha256': digest, 'owner': policy['owner'],
                                    'expires': policy['expires'], 'approval_reference': policy['approval_reference']}
        summary['status'] = 'blocked' if any(f['blocking'] for f in summary['findings']) else 'pass'
    except (OSError, ValueError, KeyError, TypeError, zipfile.BadZipFile, subprocess.SubprocessError) as error:
        # Scanner stdout/stderr and exception messages can contain secret/source values.
        summary['error'] = str(error) if isinstance(error, ValueError) and str(error) in {
            'scanner-process-failure', 'invalid-scanner-report', 'scanner-warning-or-error',
            'invalid-trivy-report', 'invalid-trivy-finding', 'incomplete-npm-inventory',
            'incomplete-java-inventory', 'incomplete-semgrep-analysis', 'incomplete-source-coverage',
            'invalid-semgrep-report', 'invalid-semgrep-finding', 'missing-database-metadata',
            'stale-database', 'rules-checksum-mismatch', 'trivy-version-mismatch',
            'semgrep-version-mismatch', 'missing-dependency-input', 'trivy-process-failure',
            'missing-application-source', 'semgrep-process-failure', 'missing-packaged-server-code',
            'invalid-applicability-scope', 'expired-or-future-disposition',
            'invalid-applicability-decision'} else type(error).__name__
    (OUTPUT / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    print(f'Security verification: {summary["status"]}; redacted result: target/security/summary.json')
    return 0 if summary['status'] == 'pass' else 1


if __name__ == '__main__':
    sys.exit(main())

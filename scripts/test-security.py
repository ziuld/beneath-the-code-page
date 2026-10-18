#!/usr/bin/env python3
"""Focused policy tests; scanner execution is verified separately, never mocked as evidence."""
import importlib.util
import copy
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
import subprocess
import tempfile
import unittest
import zipfile
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('security', Path(__file__).with_name('verify-security.py'))
security = importlib.util.module_from_spec(spec)
spec.loader.exec_module(security)


class SecurityTests(unittest.TestCase):
    def applicability_fixture(self):
        finding = {'scanner': 'trivy', 'kind': 'Vulnerabilities', 'id': 'CVE-SYNTHETIC',
                   'package': 'example:library', 'version': '1.0', 'target': 'pom.xml',
                   'severity': 'HIGH', 'blocking': True}
        policy = {'owner': 'Ziuld', 'approved_on': '2026-10-18', 'expires': '2026-11-01',
                  'approval_reference': 'synthetic-approval', 'configuration_sha256': 'reviewed',
                  'findings': [{'id': finding['id'], 'package': finding['package'],
                                'version': finding['version'], 'reason': 'Synthetic applicability proof'}]}
        return finding, policy, datetime(2026, 10, 18, tzinfo=timezone.utc)

    def test_exact_approved_finding_is_visible_but_non_blocking(self):
        finding, policy, now = self.applicability_fixture()
        for target in ('pom.xml', 'Java'):
            with self.subTest(target=target):
                result = security.apply_dispositions([{**finding, 'target': target}], policy, 'reviewed', now)[0]
                self.assertFalse(result['blocking'])
                self.assertTrue(result['default_blocking'])
                self.assertEqual('HIGH', result['severity'])
                self.assertEqual('Ziuld', result['owner'])
                self.assertEqual('2026-11-01', result['expires'])

    def test_other_cve_package_version_target_secret_or_sast_still_blocks(self):
        finding, policy, now = self.applicability_fixture()
        for change in ({'id': 'CVE-OTHER'}, {'package': 'other:library'}, {'version': '1.1'},
                       {'target': 'other/pom.xml'}, {'kind': 'Secrets'}, {'scanner': 'semgrep'}):
            with self.subTest(change=change):
                result = security.apply_dispositions([{**finding, **change}], policy, 'reviewed', now)
                self.assertTrue(result[0]['blocking'])

    def test_expired_future_or_changed_configuration_fails_closed(self):
        finding, policy, now = self.applicability_fixture()
        with self.assertRaisesRegex(ValueError, 'invalid-applicability-scope'):
            security.apply_dispositions([finding], policy, 'changed', now)
        for date in (datetime(2026, 11, 1, tzinfo=timezone.utc), datetime(2026, 10, 17, tzinfo=timezone.utc)):
            with self.subTest(date=date), self.assertRaisesRegex(ValueError, 'expired-or-future-disposition'):
                security.apply_dispositions([finding], policy, 'reviewed', date)

    def test_unapproved_duplicate_or_unreasoned_disposition_fails(self):
        finding, original, now = self.applicability_fixture()
        for field in ('owner', 'approval_reference'):
            policy = copy.deepcopy(original); policy[field] = ''
            with self.subTest(field=field), self.assertRaises(ValueError):
                security.apply_dispositions([finding], policy, 'reviewed', now)
        for duplicate in (False, True):
            policy = copy.deepcopy(original)
            if duplicate:
                policy['findings'].append(policy['findings'][0])
            else:
                policy['findings'][0]['reason'] = ''
            with self.assertRaises(ValueError):
                security.apply_dispositions([finding], policy, 'reviewed', now)

    def test_fingerprint_tracks_server_and_packaged_changes_not_ui_prose(self):
        with tempfile.TemporaryDirectory(dir=security.TOOLS / 'tmp') as tmp:
            root = Path(tmp); (root / 'pom.xml').write_text('synthetic-pom')
            java = root / 'src/main/java/App.java'; java.parent.mkdir(parents=True)
            java.write_text('class App {}')
            jar = root / security.JAR; jar.parent.mkdir(parents=True)
            with zipfile.ZipFile(jar, 'w') as package:
                package.writestr('BOOT-INF/classes/App.class', b'synthetic-bytecode')
            original = security.configuration_digest(root)
            prose = root / 'src/main/resources/i18n/messages.properties'; prose.parent.mkdir(parents=True)
            prose.write_text('synthetic=Text')
            self.assertEqual(original, security.configuration_digest(root))
            java.write_text('class App { int changed; }')
            self.assertNotEqual(original, security.configuration_digest(root))
            java.write_text('class App {}')
            with zipfile.ZipFile(jar, 'w') as package:
                package.writestr('BOOT-INF/classes/App.class', b'changed-bytecode')
            self.assertNotEqual(original, security.configuration_digest(root))

    def test_clean_trivy_result(self):
        self.assertEqual([], security.trivy_findings({'SchemaVersion': 2, 'Results': []}))

    def test_dependency_findings_block_without_a_production_vulnerable_dependency(self):
        report = {'SchemaVersion': 2, 'Results': [{'Target': 'pom.xml', 'Vulnerabilities': [
            {'VulnerabilityID': 'CVE-SYNTHETIC', 'Severity': severity} for severity in ('LOW', 'HIGH', 'CRITICAL')]}]}
        self.assertEqual([False, True, True], [f['blocking'] for f in security.trivy_findings(report)])

    def test_secret_always_blocks_and_raw_value_is_not_shared(self):
        secret = 'SYNTHETIC_PRIVATE_SECRET_VALUE'
        report = {'SchemaVersion': 2, 'Results': [{'Target': 'fixture.txt', 'Secrets': [
            {'RuleID': 'synthetic-secret', 'Severity': 'LOW', 'Match': secret, 'Code': {'Lines': secret}}]}]}
        findings = security.trivy_findings(report)
        self.assertTrue(findings[0]['blocking'])
        self.assertNotIn(secret, json.dumps(findings))

    def test_missing_or_malformed_report_fails(self):
        for report in ({}, {'SchemaVersion': 2}, {'SchemaVersion': 1, 'Results': []}):
            with self.assertRaises(ValueError):
                security.trivy_findings(report)

    def test_missing_dependency_inventory_fails(self):
        with self.assertRaisesRegex(ValueError, 'incomplete-npm-inventory'):
            security.dependency_inventory({'Results': []})

    def test_source_and_packaged_java_require_separate_scanner_modes(self):
        files = security.trivy_command('vuln', Path('dependencies'))
        packaged = security.trivy_command('vuln', Path('packaged'), 'rootfs')
        self.assertIn('fs', files)
        self.assertIn('--include-dev-deps', files)
        self.assertIn('rootfs', packaged)
        self.assertNotIn('--include-dev-deps', packaged)

    def test_missing_packaged_inventory_still_fails(self):
        results = []
        for lock in security.LOCKS:
            manifest = json.loads((security.ROOT / lock.replace('package-lock.json', 'package.json')).read_text())
            packages = {**manifest.get('dependencies', {}), **manifest.get('devDependencies', {})}
            results.append({'Target': lock, 'Type': 'npm',
                            'Packages': [{'Name': name, 'Version': version} for name, version in packages.items()]})
        boot = {'Name': 'org.springframework.boot:spring-boot', 'Version': '4.1.1'}
        results.append({'Target': 'pom.xml', 'Type': 'pom', 'Packages': [boot]})
        with self.assertRaisesRegex(ValueError, 'incomplete-java-inventory'):
            security.dependency_inventory({'Results': results})
        results.append({'Target': 'Java', 'Type': 'jar', 'Packages': [boot]})
        self.assertEqual(4, len(security.dependency_inventory({'Results': results})))

    def test_identified_clean_trivy_report_without_results(self):
        self.assertEqual([], security.trivy_findings({
            'SchemaVersion': 2, 'ArtifactName': 'candidate', 'ArtifactType': 'filesystem'}))

    def test_semgrep_requires_complete_source_coverage(self):
        source = security.ROOT / 'synthetic.ts'
        clean = {'errors': [], 'results': [], 'paths': {'scanned': [str(source)]}}
        self.assertEqual([], security.semgrep_findings(clean, [source]))
        with self.assertRaisesRegex(ValueError, 'incomplete-source-coverage'):
            security.semgrep_findings(clean, [source, security.ROOT / 'missing.java'])
        with self.assertRaisesRegex(ValueError, 'incomplete-semgrep-analysis'):
            security.semgrep_findings({**clean, 'errors': [{'message': 'parse failed'}]}, [source])

    def test_sast_rule_blocks_and_source_excerpt_is_not_shared(self):
        source = security.ROOT / 'synthetic.ts'
        report = {'errors': [], 'paths': {'scanned': [str(source)]}, 'results': [{
            'check_id': 'synthetic-rule', 'path': str(source), 'start': {'line': 1},
            'extra': {'severity': 'ERROR', 'lines': 'SYNTHETIC_PRIVATE_SOURCE'}}]}
        findings = security.semgrep_findings(report, [source])
        self.assertTrue(findings[0]['blocking'])
        self.assertNotIn('SYNTHETIC_PRIVATE_SOURCE', json.dumps(findings))

    def test_database_must_exist_and_be_recent(self):
        now = datetime.now(timezone.utc)
        version = {key: {'UpdatedAt': now.isoformat()} for key in ('VulnerabilityDB', 'JavaDB')}
        self.assertEqual(2, len(security.database_freshness(version, now)))
        with self.assertRaisesRegex(ValueError, 'missing-database-metadata'):
            security.database_freshness({}, now)
        with self.assertRaisesRegex(ValueError, 'stale-database'):
            security.database_freshness(version, now + timedelta(hours=25))

    def test_process_failure_invalid_json_and_warnings_do_not_pass(self):
        for code, output, error in ((2, '{}', ''), (0, 'invalid', ''), (0, '{}', 'WARN incomplete')):
            with self.subTest(code=code, output=output, error=error), patch.object(
                    security.subprocess, 'run', return_value=subprocess.CompletedProcess([], code, output, error)):
                with self.assertRaises(ValueError):
                    security.run_json(['synthetic'], {})

    def test_inherited_environment_cannot_disable_scans(self):
        with patch.dict(security.install.os.environ, {'TRIVY_SKIP_DB_UPDATE': 'true', 'SEMGREP_APP_TOKEN': 'synthetic'}):
            env = security.install.environment()
        self.assertNotIn('TRIVY_SKIP_DB_UPDATE', env)
        self.assertNotIn('SEMGREP_APP_TOKEN', env)
        self.assertEqual('off', env['SEMGREP_SEND_METRICS'])


if __name__ == '__main__':
    unittest.main()

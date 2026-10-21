#!/usr/bin/env python3
"""Regression checks for missing image coverage and blocking vulnerability policy."""
import copy
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('container_security', Path(__file__).with_name('verify-container-security.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def report():
    return {'SchemaVersion': 2, 'Results': [
        {'Class': 'os-pkgs', 'Type': 'ubuntu', 'Packages': [{'Name': 'libc6', 'Version': 'test'}]},
        {'Type': 'jar', 'Packages': [{'Name': name, 'Version': version}
                                    for name, version in module.security.expected_java_versions().items()]}
    ]}


class ImagePolicyTests(unittest.TestCase):
    def test_complete_clean_inventory(self):
        self.assertEqual(module.validate_report(report()), [])

    def test_empty_results_cannot_pass(self):
        with self.assertRaisesRegex(ValueError, 'missing-image-os-inventory'):
            module.validate_report({'SchemaVersion': 2, 'Results': []})

    def test_missing_java_inventory_cannot_pass(self):
        data = report()
        data['Results'].pop()
        with self.assertRaisesRegex(ValueError, 'image-java-inventory'):
            module.validate_report(data)

    def test_wrong_java_version_cannot_pass(self):
        data = report()
        data['Results'][1]['Packages'][0]['Version'] = 'unexpected'
        with self.assertRaisesRegex(ValueError, 'image-java-inventory'):
            module.validate_report(data)

    def test_findings_preserve_high_critical_blockers_and_medium_visibility(self):
        for severity, blocking in [('CRITICAL', True), ('HIGH', True), ('MEDIUM', False)]:
            data = copy.deepcopy(report())
            data['Results'][0]['Vulnerabilities'] = [{'VulnerabilityID': 'SYNTHETIC-CVE', 'Severity': severity}]
            findings = module.validate_report(data)
            self.assertEqual(len(findings), 1)
            self.assertEqual(findings[0]['blocking'], blocking)

    def test_invalid_scanner_schema_cannot_pass(self):
        data = report()
        data['SchemaVersion'] = 999
        with self.assertRaisesRegex(ValueError, 'invalid-trivy-report'):
            module.validate_report(data)


if __name__ == '__main__':
    unittest.main()

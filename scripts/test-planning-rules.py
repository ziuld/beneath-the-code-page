#!/usr/bin/env python3
"""Negative fixtures for controls that prevent false closure and broken traceability."""
import copy
import json
import sys
import unittest
import tempfile
from pathlib import Path
sys.dont_write_bytecode=True
from planning_rules import validate_hierarchy
from planning_documents import markdown_documents
from planning_specs import resolve_behaviour

ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'docs/planning/plan.json').read_text())

class PlanningRulesTest(unittest.TestCase):
    def test_migrated_story_reads_behaviour_without_mutating_tracking(self):
        data=copy.deepcopy(BASE)
        story=next(f for f in data['features'] if f['id']=='F02')['stories'][0]
        self.assertNotIn('text',story['requirements'][0])
        resolved=resolve_behaviour(data,ROOT)
        behaviour=next(f for f in resolved['features'] if f['id']=='F02')['stories'][0]
        self.assertIn('shall serve',behaviour['requirements'][0]['text'])
        self.assertEqual(['F02-UH01-R01'],behaviour['scenarios'][0]['requirement_ids'])
        self.assertEqual(BASE,data)

    def test_migrated_story_rejects_duplicate_behaviour(self):
        data=copy.deepcopy(BASE)
        story=next(f for f in data['features'] if f['id']=='F02')['stories'][0]
        story['requirements'][0]['text']='duplicate'
        self.assertTrue(any('duplicate editable' in e for e in validate_hierarchy(data,ROOT)))

    def test_migrated_story_rejects_missing_or_external_spec_and_id_drift(self):
        for source in ('openspec/specs/missing/spec.md','docs/planning/plan.json'):
            data=copy.deepcopy(BASE)
            story=next(f for f in data['features'] if f['id']=='F02')['stories'][0]
            story['behaviour_spec']=source
            self.assertTrue(any('invalid main' in e for e in validate_hierarchy(data,ROOT)))
        data=copy.deepcopy(BASE)
        story=next(f for f in data['features'] if f['id']=='F02')['stories'][0]
        story['requirements'][0]['id']='F02-UH01-R99'
        self.assertTrue(any('IDs differ' in e for e in validate_hierarchy(data,ROOT)))

    def test_main_spec_changes_flow_to_views_and_unsupported_steps_fail(self):
        with tempfile.TemporaryDirectory(dir=ROOT/'target') as directory:
            root=Path(directory)
            source='openspec/specs/packaged-browser-assets/spec.md'
            path=root/source
            path.parent.mkdir(parents=True)
            original=(ROOT/source).read_text()
            path.write_text(original.replace('matching built assets','updated built assets'))
            story=next(f for f in resolve_behaviour(BASE,root)['features'] if f['id']=='F02')['stories'][0]
            self.assertIn('updated built assets',story['scenarios'][0]['then'])
            path.write_text(original+'\n- **AND** an unsupported extra step\n')
            with self.assertRaisesRegex(ValueError,'unsupported scenario content'):
                resolve_behaviour(BASE,root)
    def test_markdown_scan_keeps_authored_docs_and_prunes_dependency_trees(self):
        (ROOT/'target').mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=ROOT/'target') as directory:
            root=Path(directory)
            names=['docs/authored.md','harness/evidence/result.md','.opencode/commands/apply.md',
                   'target/npm/readme.md','src/main/frontend/node_modules/pkg/README.md',
                   '.mvn/cache/readme.md','.git/internal.md','docs/reference/source.md']
            for name in names:
                path=root/name
                path.parent.mkdir(parents=True,exist_ok=True)
                path.write_text('[broken](absent.md)')
            self.assertEqual(set(names[:3]),{str(p.relative_to(root)) for p in markdown_documents(root)})
    def setUp(self):
        self.data=copy.deepcopy(BASE)
        self.feature=self.data['features'][6]
        self.story=self.feature['stories'][0]
    def expect_error(self,fragment):
        self.assertTrue(any(fragment in e for e in validate_hierarchy(self.data,ROOT)),fragment)
    def test_baseline_is_consistent(self):
        self.assertEqual([],validate_hierarchy(self.data,ROOT))
    def test_parent_is_not_just_a_label(self):
        self.story['parent_id']='F99'
        self.expect_error('invalid feature parent')
    def test_requirement_must_have_a_scenario(self):
        self.story['requirements'].append({'id':'orphan-R01','pattern':'ubiquitous','text':'The tool shall preserve input.'})
        self.expect_error('has no scenario')
    def test_scenario_must_have_verification_work(self):
        for t in self.story['tasks']:
            if t['kind']=='verification':t['scenario_ids']=[]
        self.expect_error('lacks a verification task')
    def test_task_hours_cannot_be_double_counted(self):
        self.story['tasks'][0]['forecast_hours']+=1
        self.expect_error('forecast_hours does not roll up')
    def test_commit_cannot_close_an_unfinished_story(self):
        self.story['status']='done';self.story['commits']=['synthetic-test-reference']
        self.expect_error('closed story has open tasks')
        self.expect_error('done without evidence')
    def test_feature_cannot_close_with_open_stories(self):
        self.feature['status']='done'
        self.expect_error('closed feature has open stories')
    def test_dependency_cycle_is_rejected(self):
        first,last=self.story['tasks'][0],self.story['tasks'][-1]
        first['depends_on']=[last['id']]
        self.expect_error('Dependency cycle')
    def test_epic_cannot_close_early(self):
        self.data['epic']['status']='done'
        self.expect_error('Epic cannot close')
    def test_ears_has_a_named_response(self):
        self.story['requirements'][0]['text']='Make it nice.'
        self.expect_error('invalid EARS structure')

if __name__=='__main__':unittest.main()

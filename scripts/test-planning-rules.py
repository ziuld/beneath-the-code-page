#!/usr/bin/env python3
"""Negative fixtures for controls that prevent false closure and broken traceability."""
import copy
import importlib.util
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
    def test_selected_v2_phases_reject_invalid_duplicate_and_reversed_stories(self):
        for sid in ('missing', 'F16-UH01', 'F17-UH01'):
            data=copy.deepcopy(BASE)
            data['v2_delivery_phases'][1]['story_ids'].append(sid)
            self.assertTrue(any('selected V2 story' in e for e in validate_hierarchy(data,ROOT)))
        data=copy.deepcopy(BASE)
        data['v2_delivery_phases'][0],data['v2_delivery_phases'][1]=data['v2_delivery_phases'][1],data['v2_delivery_phases'][0]
        self.assertTrue(any('scheduled later' in e for e in validate_hierarchy(data,ROOT)))

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
            for feature in BASE['features']:
                for migrated in feature['stories']:
                    if spec:=migrated.get('behaviour_spec'):
                        fixture=root/spec
                        fixture.parent.mkdir(parents=True,exist_ok=True)
                        fixture.write_text((ROOT/spec).read_text())
            source='openspec/specs/packaged-browser-assets/spec.md'
            path=root/source
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
                   '.mvn/cache/readme.md','.git/internal.md','docs/reference/source.md',
                   'src/test/resources/learning-fixture/en/fixture-unit.md']
            for name in names:
                path=root/name
                path.parent.mkdir(parents=True,exist_ok=True)
                path.write_text('[broken](absent.md)')
            self.assertEqual(set(names[:3]),{str(p.relative_to(root)) for p in markdown_documents(root)})
    def test_markdown_scan_keeps_docs_adjacent_to_learning_fixtures(self):
        with tempfile.TemporaryDirectory(dir=ROOT/'target') as directory:
            root=Path(directory)
            names=['src/test/resources/README.md', 'docs/learning-fixture/policy.md',
                   'src/test/resources/learning-fixture/en/fixture-unit.md']
            for name in names:
                path=root/name
                path.parent.mkdir(parents=True,exist_ok=True)
                path.write_text('[unsafe](javascript:test)')
            self.assertEqual(set(names[:2]),{str(p.relative_to(root)) for p in markdown_documents(root)})
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
        # The real baseline story may already be accepted; construct the negative fixture explicitly.
        self.story['tasks'][-1]['status']='planned'
        self.story['evidence']=[];self.story['actual_finish']=None
        self.story['status']='done';self.story['commits']=['synthetic-test-reference']
        self.expect_error('closed story has open tasks')
        self.expect_error('done without evidence')
    def test_feature_cannot_close_with_open_stories(self):
        # Construct an open child even when every baseline story has been accepted.
        self.story['status']='in_progress';self.story['actual_finish']=None
        self.feature['status']='done'
        self.expect_error('closed feature has open stories')
    def test_dependency_cycle_is_rejected(self):
        first,last=self.story['tasks'][0],self.story['tasks'][-1]
        first['depends_on']=[last['id']]
        self.expect_error('Dependency cycle')
    def test_epic_cannot_close_early(self):
        # Keep the negative fixture explicit after every real V1 feature is accepted.
        next(f for f in self.data['features'] if f['id']=='F16')['status']='in_progress'
        self.data['epic']['status']='done'
        self.expect_error('Epic cannot close')
    def test_ears_has_a_named_response(self):
        self.story['requirements'][0]['text']='Make it nice.'
        self.expect_error('invalid EARS structure')

    def test_release_must_be_explicitly_supported(self):
        self.feature['release']='later'
        self.expect_error('invalid release')

    def test_v1_cannot_depend_on_v2_at_any_hierarchy_level(self):
        for level in ('feature','story','task'):
            with self.subTest(level=level):
                data=copy.deepcopy(BASE)
                feature=next(f for f in data['features'] if f['id']=='F16')
                node={'feature':feature,'story':feature['stories'][0],
                      'task':feature['stories'][0]['tasks'][0]}[level]
                node['depends_on']=['F15']
                self.assertTrue(any('V1 depends on frozen V2' in e for e in validate_hierarchy(data,ROOT)))

    def test_v1_milestone_cannot_include_v2(self):
        self.data['milestones'][-1]['requires'].append('F15')
        self.expect_error('V1 milestone includes frozen V2')

    def test_epic_can_close_with_evidenced_v1_and_open_v2(self):
        evidence=['harness/evidence/F00-F01-java-baseline.md']
        for feature in self.data['features']:
            if feature.get('release','V1')=='V1':
                for node in [feature]+feature['stories']+[t for s in feature['stories'] for t in s['tasks']]:
                    node.update(status='done',evidence=evidence,actual_finish='2026-10-18',commits=['synthetic-fixture-only'])
        self.data['epic'].update(status='done',evidence=evidence)
        self.assertEqual([],validate_hierarchy(self.data,ROOT))
        self.assertTrue(any(f['status']!='done' for f in self.data['features'] if f.get('release')=='V2'))
        self.data['epic']['evidence']=[]
        self.expect_error('Epic cannot close')

    def test_v1_open_story_still_blocks_epic_closure(self):
        feature=next(f for f in self.data['features'] if f['id']=='F16')
        feature['status']='in_progress'
        feature['stories'][0]['status']='planned'
        self.data['epic'].update(status='done',evidence=['harness/evidence/F00-F01-java-baseline.md'])
        self.expect_error('Epic cannot close')

    def test_generated_views_schedule_only_remaining_v1(self):
        # This fixture describes the old V1-only replan before selected V2 phases.
        data=copy.deepcopy(BASE)
        data.pop('v2_delivery_phases',None)
        for feature in data['features']:
            if feature['id']=='F12':
                feature['forecast_hours']=4
                for story in feature['stories']:
                    story['forecast_hours']=2
                    for task,hours in zip(story['tasks'],(0.5,0.5,0.5,0.25,0.25),strict=True):
                        task['forecast_hours']=hours
            if feature['id'] in {'F07','F12','F13','F14','F16'}:
                for node in [feature]+feature['stories']+[t for s in feature['stories'] for t in s['tasks']]:
                    node.update(status='planned',blocker='',actual_start=None,actual_finish=None)
        def renderer(name):
            spec=importlib.util.spec_from_file_location(name,ROOT/'scripts'/f'{name}.py')
            module=importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            return module.render(data)
        backlog=renderer('render-backlog')
        queue=backlog['execution-order.md']
        self.assertIn('Current next action: F07-UH01-T01',queue)
        for fid in ('F00','F06','F08','F09','F10','F11','F15'):
            self.assertNotIn(f'[{fid}-UH',queue)
        self.assertIn('Other stories remain deferred',backlog['features/F15.md'])
        roadmap=renderer('render-roadmap')
        self.assertIn('Remaining V1 forecast 42 owner hours',roadmap['roadmap.md'])
        for fid in ('F00','F06','F08','F09','F10','F11','F15'):
            self.assertNotIn(f':{fid},',roadmap['gantt.mmd'])
        self.assertIn(':F07,',roadmap['gantt.mmd'])

if __name__=='__main__':unittest.main()

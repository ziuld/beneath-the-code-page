#!/usr/bin/env python3
"""Negative fixtures for controls that prevent false closure and broken traceability."""
import copy
import json
import sys
import unittest
from pathlib import Path
sys.dont_write_bytecode=True
from planning_rules import validate_hierarchy

ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'docs/planning/plan.json').read_text())

class PlanningRulesTest(unittest.TestCase):
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

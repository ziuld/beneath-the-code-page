#!/usr/bin/env python3
"""Read-only planning integrity checks; not an application test suite."""
import datetime
import importlib.util
import json
import re
import sys
from pathlib import Path

sys.dont_write_bytecode = True
from planning_rules import validate_hierarchy

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'docs/planning/plan.json').read_text())
errors = []
states = {'planned', 'ready', 'in_progress', 'blocked', 'in_review', 'done'}
features = data['features']
by_id = {f['id']: f for f in features}
if len(by_id) != len(features):
    errors.append('Duplicate feature IDs')
if data['capacity_hours_per_week'] <= 0 or not 0 <= data['contingency_fraction'] <= 1:
    errors.append('Invalid capacity or reserve')
seen = set()
for f in features:
    fid = f['id']
    if f['status'] not in states:
        errors.append(f'{fid}: invalid status')
    if not 0 < f['optimistic_hours'] <= f['baseline_hours'] <= f['pessimistic_hours']:
        errors.append(f'{fid}: invalid three-point estimate')
    if f['forecast_hours'] <= 0 or f['actual_hours'] < 0:
        errors.append(f'{fid}: invalid hours')
    if any(d not in seen for d in f['depends_on']):
        errors.append(f'{fid}: missing, cyclic or out-of-order dependency')
    if f['status'] in {'ready', 'in_progress', 'in_review', 'done'}:
        if any(by_id.get(d, {}).get('status') != 'done' for d in f['depends_on']):
            errors.append(f'{fid}: prerequisites not done')
    if f['status'] == 'blocked' and not f['blocker']:
        errors.append(f'{fid}: blocked without a reason')
    if f['status'] == 'done' and (not f['evidence'] or not f['actual_finish']):
        errors.append(f'{fid}: done without evidence/date')
    for field in ('actual_start', 'actual_finish'):
        if f[field]:
            try:
                datetime.date.fromisoformat(f[field])
            except ValueError:
                errors.append(f'{fid}: invalid {field}')
    if f['actual_finish'] and (not f['actual_start'] or f['actual_finish'] < f['actual_start']):
        errors.append(f'{fid}: finish precedes start or start missing')
    for path in f['evidence']:
        resolved = (ROOT / path).resolve()
        if not resolved.is_relative_to(ROOT) or not resolved.is_file():
            errors.append(f'{fid}: invalid evidence path {path}')
    seen.add(fid)
for m in data['milestones']:
    if not m['requires'] or any(x not in by_id for x in m['requires']):
        errors.append(f'{m["id"]}: invalid milestone prerequisites')
if sum(f['status'] == 'in_progress' for f in features) > 1:
    errors.append('More than one feature in progress exceeds baseline WIP limit')
for path in ROOT.rglob('*.md'):
    if 'reference' in path.parts:
        continue  # Supplied source text is preserved, not rewritten by link validation.
    for link in re.findall(r'\[[^\]]*\]\(([^)]+)\)', path.read_text()):
        if '://' in link or link.startswith(('#', 'mailto:')):
            continue
        target = link.split('#')[0]
        if target and not (path.parent / target).exists():
            errors.append(f'{path.relative_to(ROOT)}: broken link {target}')
spec = importlib.util.spec_from_file_location('roadmap_renderer', ROOT / 'scripts/render-roadmap.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
for name, expected in module.render(data).items():
    path = ROOT / 'docs/planning' / name
    if not path.exists() or path.read_text() != expected:
        errors.append(f'Stale generated view: {name}')
errors.extend(validate_hierarchy(data,ROOT))
backlog_spec=importlib.util.spec_from_file_location('backlog_renderer',ROOT/'scripts/render-backlog.py')
backlog_module=importlib.util.module_from_spec(backlog_spec)
backlog_spec.loader.exec_module(backlog_module)
for name,expected in backlog_module.render(data).items():
    path=ROOT/'docs/planning'/name
    if not path.exists() or path.read_text()!=expected:
        errors.append(f'Stale backlog view: {name}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(features)} features, dependencies, estimates, evidence paths, local links and generated views')
print('Planning integrity only; no application build or runtime validation has occurred.')
print('PASS: epic/story/task parents, EARS/scenario coverage, verification links, effort rollups and closure rules')

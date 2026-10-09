"""Integrity rules for the explicit four-level project hierarchy."""
from decimal import Decimal
from pathlib import Path
import re

def validate_hierarchy(data, root):
    errors=[]; nodes={}; stories=[]; tasks=[]; ids=set()
    def error(message): errors.append(message)
    def register(node):
        key=node['id']
        if key in ids: error(f'Duplicate hierarchy ID: {key}')
        ids.add(key);nodes[key]=node
    def total(children,field):
        return sum((Decimal(str(x[field])) for x in children),Decimal(0))
    epic=data.get('epic',{})
    if epic.get('id')!='EPIC-MVP' or data.get('hierarchy')!=['Epic','Feature','User Story','Task']:
        error('Missing required Epic > Feature > User Story > Task hierarchy')
    register(epic)
    for f in data['features']:
        register(f)
        if f.get('parent_id')!=epic['id']: error(f'{f["id"]}: invalid epic parent')
        children=f.get('stories',[])
        if not children: error(f'{f["id"]}: no user stories')
        for field in ('baseline_hours','forecast_hours','actual_hours'):
            if total(children,field)!=Decimal(str(f[field])): error(f'{f["id"]}: {field} does not roll up from stories')
        if f['status']=='done' and any(s['status']!='done' for s in children): error(f'{f["id"]}: closed feature has open stories')
        for s in children:
            register(s);stories.append(s)
            if s.get('parent_id')!=f['id']: error(f'{s["id"]}: invalid feature parent')
            if not re.match(r'^As a .+, I want to .+, so that .+\.$',s['description']): error(f'{s["id"]}: missing beneficiary/outcome/benefit')
            reqs={r['id'] for r in s['requirements']}
            acs={a['id'] for a in s['scenarios']}
            if not reqs or not acs: error(f'{s["id"]}: requires both EARS and Gherkin')
            covered=set()
            patterns={'ubiquitous':r'^The .+ shall .+\.$','event':r'^When .+, .+ shall .+\.$','state':r'^While .+, .+ shall .+\.$','unwanted':r'^If .+, then .+ shall .+\.$','optional':r'^Where .+, .+ shall .+\.$'}
            for r in s['requirements']:
                if r['id'] in ids:error(f'Duplicate requirement ID: {r["id"]}')
                ids.add(r['id'])
                if not re.match(patterns.get(r['pattern'],r'(?!)'),r['text']):error(f'{r["id"]}: invalid EARS structure')
            for a in s['scenarios']:
                if a['id'] in ids:error(f'Duplicate scenario ID: {a["id"]}')
                ids.add(a['id'])
                if not a['requirement_ids'] or not set(a['requirement_ids'])<=reqs:error(f'{a["id"]}: unknown or missing requirement link')
                covered.update(a['requirement_ids'])
                if not all(a.get(x) for x in ('given','when','then','verification')):error(f'{a["id"]}: incomplete acceptance scenario')
            if covered!=reqs:error(f'{s["id"]}: an EARS requirement has no scenario')
            for field in ('baseline_hours','forecast_hours','actual_hours'):
                if total(s['tasks'],field)!=Decimal(str(s[field])):error(f'{s["id"]}: {field} does not roll up from tasks')
            verification=set()
            if s['status']=='done' and any(t['status']!='done' for t in s['tasks']):error(f'{s["id"]}: closed story has open tasks')
            if s['status']=='done' and f['id']!='F00' and not s['commits']:error(f'{s["id"]}: completion requires a real commit reference')
            if not s['tasks'] or s['tasks'][0]['kind']!='analysis' or s['tasks'][-1]['kind']!='closure':error(f'{s["id"]}: missing read-first or closure task')
            for t in s['tasks']:
                register(t);tasks.append(t)
                if t['parent_id']!=s['id']:error(f'{t["id"]}: invalid story parent')
                if not set(t['scenario_ids'])<=acs:error(f'{t["id"]}: unknown scenario')
                if t['kind']=='verification':verification.update(t['scenario_ids'])
                if not 0 < t['baseline_hours'] <= 3:error(f'{t["id"]}: baseline task must fit a <=3-hour session')
            if verification!=acs:error(f'{s["id"]}: scenario lacks a verification task')
    for n in stories+tasks:
        if n['status'] not in {'planned','ready','in_progress','blocked','in_review','done'}:error(f'{n["id"]}: invalid status')
        if n['status']=='blocked' and not n.get('blocker'):error(f'{n["id"]}: missing blocker')
        if n['status']=='done' and (not n['evidence'] or not n['actual_finish']):error(f'{n["id"]}: done without evidence and actual finish')
        if n['actual_hours']<0 or n['forecast_hours']<=0:error(f'{n["id"]}: invalid effort')
        for evidence in n['evidence']:
            path=(root/evidence).resolve()
            if not path.is_relative_to(root.resolve()) or not path.is_file():error(f'{n["id"]}: invalid evidence file')
    for n in nodes.values():
        for dep in n.get('depends_on',[]):
            if dep not in nodes:error(f'{n["id"]}: unknown dependency {dep}')
            elif n.get('status') in {'ready','in_progress','in_review','done'} and nodes[dep]['status']!='done':error(f'{n["id"]}: dependency {dep} is not done')
    visiting=set();visited=set()
    def visit(key):
        if key in visiting:
            error(f'Dependency cycle at {key}');return
        if key in visited:return
        visiting.add(key)
        for dep in nodes[key].get('depends_on',[]):
            if dep in nodes:visit(dep)
        visiting.remove(key);visited.add(key)
    for key in nodes:visit(key)
    if sum(t['status']=='in_progress' for t in tasks)>1:error('More than one task is in progress')
    if epic['status']=='done' and (not epic['evidence'] or any(f['status']!='done' for f in data['features'])):error('Epic cannot close before feature acceptance and evidence')
    return errors

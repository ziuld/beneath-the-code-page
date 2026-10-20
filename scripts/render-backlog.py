#!/usr/bin/env python3
"""Generate readable Epic > Feature > UH > Task views from the canonical plan."""
import json
import html
from pathlib import Path
from planning_specs import resolve_behaviour
from planning_delivery import selected_stories, phase_markdown, phase_html

ROOT=Path(__file__).resolve().parents[1]
PLAN=ROOT/'docs/planning'

def gherkin(story, feature):
    lines=[f'@EPIC-MVP @{feature["id"]} @{story["id"]}',f'Feature: {story["id"]} — {story["title"]}',f'  {story["description"]}','']
    for a in story['scenarios']:
        lines += ['  '+' '.join('@'+r for r in [a['id']]+a['requirement_ids']),f'  Scenario: {a["name"]}',f'    Given {a["given"]}',f'    When {a["when"]}',f'    Then {a["then"]}','']
    return '\n'.join(lines)

def render(data):
    data = resolve_behaviour(data, ROOT)
    outputs={}
    v1=[f for f in data['features'] if f.get('release','V1')=='V1']
    deferred=[f for f in data['features'] if f.get('release','V1')=='V2']
    selected=selected_stories(data)
    scheduled=[s for f in v1 for s in f['stories']]+selected
    done_ids={n['id'] for f in data['features'] for n in [f]+f['stories']+[t for s in f['stories'] for t in s['tasks']] if n['status']=='done'}
    next_task=next((t for s in scheduled for t in s['tasks'] if t['status'] in {'planned','ready'} and set(t['depends_on'])<=done_ids),None)
    next_action=(f'**Current next action: {next_task["id"]} — {next_task["title"]}.**' if next_task else '**No unblocked selected task is ready; inspect recorded prerequisites and blockers.**')
    index=['# Epic → Feature → User Story → Task','',
           f'**{data["epic"]["id"]}: {data["epic"]["title"]}**','',data['epic']['description'],'',
           'This is the requested project hierarchy. UH means User Story. IDs are local planning identifiers, not created Jira issue keys. Product and enabling features both contain stories with explicit beneficiaries.','',
           'Read [the epic](epic-mvp.md), then a feature below. Every story contains EARS requirements, tagged Gherkin scenarios and ordered tasks. The [execution queue](execution-order.md) shows the next steps.','',
            'Selected V2 stories follow the delivery sequence below; other V2 stories remain deferred. V2 is excluded from historical V1 acceptance.','',
            '| Feature | Release | Kind | Stories | Tasks | Baseline hours |','|---|---|---|---:|---:|---:|']
    queue=['# Ordered execution queue','','One active task at a time. The order includes owner capacity, not only technical dependencies. Dates are not commitments. Read the linked feature/story before starting its first task.','',
           next_action,'',
           'Unfinished tasks follow the selected V2 phase order. The remaining course stories are deferred; accepted V1 tasks are excluded.','',
           '| Order | Task | Activity | Hours | Status | Depends on |','|---:|---|---|---:|---|---|']
    trace=['# Requirements → scenarios → verification tasks','','Generated from plan.json. Test methods below are planned, not implemented or passed. Scenario IDs should appear in future automated test names/tags or manual evidence.','',
           '| Requirement | Story | Scenario | Verification task | Planned verification |','|---|---|---|---|---|']
    queue_order=0
    for s in scheduled:
        for task in s['tasks']:
            if task['status']!='done':
                queue_order+=1
                deps=', '.join(task['depends_on']) or 'none'
                queue.append(f'| {queue_order} | [{task["id"]}](features/{s["parent_id"]}.md#{s["id"].lower()}) | {task["kind"]} | {task["forecast_hours"]:g} | {task["status"]} | {deps} |')
    for f in data['features']:
        fid=f['id']; count=sum(len(s['tasks']) for s in f['stories'])
        release=f.get('release','V1')
        index.append(f'| [{fid} — {f["name"]}](features/{fid}.md) | {release} | {f["kind"]} | {len(f["stories"])} | {count} | {f["baseline_hours"]} |')
        lines=[f'# {fid} — {f["name"]}','','Parent: **EPIC-MVP**. Status: **'+f['status']+'**. Kind: '+f['kind']+'.','',
               f'Baseline/forecast: {f["baseline_hours"]}/{f["forecast_hours"]} owner hours. Prerequisites: '+(', '.join(f['depends_on']) or 'none')+'.','',
               '## Feature purpose','',
               'This feature delivers the following outcomes: '+ '; '.join(s['title'] for s in f['stories'])+'.','',
               'Scope remains bounded by the [feature summary](../feature-backlog.md) and [accepted architecture](../../architecture/technical-architecture-v1.md). Account, database, cloud and SPA work is excluded.','',
               '## Read and execute','',
               'Read this feature, then the next story and both its EARS rules and Gherkin examples. Check prerequisites, work through its tasks, verify the result, review/commit when authorised, and close only with evidence. [Workflow and closure rules](../story-workflow.md).','']
        if release=='V2':
            lines += ['**V2 follow-up: execute only stories selected in the delivery sequence. Other stories remain deferred; V1 acceptance is unchanged.**','']
        for s in f['stories']:
            sid=s['id']; anchor=sid.lower()
            lines += [f'<a id="{anchor}"></a>',f'## {sid} — {s["title"]}','',s['description'],'',
                      f'Parent: {fid}. Priority: {s["priority"]}. Status: {s["status"]}. Owner: {s["owner"]}.',
                      f'Estimate: {s["baseline_hours"]}h baseline / {s["forecast_hours"]}h forecast. Dependencies: '+(', '.join(s['depends_on']) or 'none')+'.','',s['scope_note'],'',
                      '### EARS requirements','', '| ID | Pattern | Required behaviour |','|---|---|---|']
            for r in s['requirements']:
                lines.append(f'| {r["id"]} | {r["pattern"]} | {r["text"]} |')
            gh=gherkin(s,f)
            lines += ['', '### Gherkin acceptance scenarios','',f'[Standalone Gherkin file](../gherkin/{sid}.feature). Specifications only: no step definitions or Cucumber runtime have been installed.','', '```gherkin',gh.rstrip(),'```','',
                      '### Ordered tasks','', '| Task | Activity | Deliverable | Hours | Prerequisite |','|---|---|---|---:|---|']
            outputs[f'gherkin/{sid}.feature']=gh
            for t in s['tasks']:
                deps=', '.join(t['depends_on']) or 'none'
                lines.append(f'| {t["id"]} | {t["kind"]} | {t["title"]} | {t["forecast_hours"]:g} | {deps} |')
            lines += ['', '### Verification and closure','']
            for a in s['scenarios']:
                tests=[t['id'] for t in s['tasks'] if t['kind']=='verification' and a['id'] in t['scenario_ids']]
                lines.append(f'- **{a["id"]}**: {a["verification"]}. Task: '+', '.join(tests)+'.')
                for rid in a['requirement_ids']:
                    trace.append(f'| {rid} | [{sid}](features/{fid}.md#{anchor}) | {a["id"]} | {", ".join(tests)} | {a["verification"]} |')
            lines += ['', 'Record test versions, actual results, manual reviews, limitations and the related commit in evidence. All tasks must be done; failed criteria keep this story open. Feature-wide quality requirements also apply. No result is claimed by this document.','']
        outputs[f'features/{fid}.md']='\n'.join(lines)
    index += ['', *phase_markdown(data)]
    queue += ['', *phase_markdown(data)]
    index += ['', '## Ownership and progress','',
               'Edit plan.json for tracking and unmigrated behaviour. For stories with behaviour_spec, edit the referenced main OpenSpec specification for requirements/scenarios; plan.json holds IDs and verification links only. Run both renderers and the planning validator. Generated views are read-only. Never add parent and child hours together.','',
              '[EARS/Gherkin conventions and Jira mapping](story-workflow.md) · [OpenSpec handoff](openspec-handoff.md) · [Traceability](traceability.md)','']
    outputs.update({'hierarchy.md':'\n'.join(index),'execution-order.md':'\n'.join(queue).rstrip()+'\n','traceability.md':'\n'.join(trace)+'\n'})
    e=html.escape
    sections=[]
    for f in data['features']:
        content=[]
        for s in f['stories']:
            requirements=''.join(f'<li><strong>{e(r["id"])} · {e(r["pattern"])}</strong><br>{e(r["text"])}</li>' for r in s['requirements'])
            taskrows=''.join(f'<tr><th scope="row">{e(t["id"])}</th><td>{e(t["kind"])}</td><td>{e(t["title"])}</td><td>{t["forecast_hours"]:g}h</td><td>{e(t["status"])}</td></tr>' for t in s['tasks'])
            content.append(f'<details class="story" id="{s["id"]}"><summary>{e(s["id"])} · {e(s["title"])} <span>({s["forecast_hours"]}h · {s["status"]})</span></summary>'
                f'<p>{e(s["description"])}</p><p>Prerequisites: {e(", ".join(s["depends_on"]) or "none")}. {e(s["scope_note"])}</p>'
                f'<h3>EARS requirements</h3><ul>{requirements}</ul><h3>Gherkin acceptance</h3><pre><code>{e(gherkin(s,f))}</code></pre>'
                f'<h3>Tasks in execution order</h3><div class="scroll"><table><thead><tr><th>ID</th><th>Activity</th><th>Deliverable</th><th>Hours</th><th>Status</th></tr></thead><tbody>{taskrows}</tbody></table></div>'
                f'<p><a href="features/{f["id"]}.md#{s["id"].lower()}">Full verification details and closure criteria</a>. Tests are planned; no implementation results are claimed.</p></details>')
        release=f.get('release','V1')
        scope='V2 — selected/deferred per delivery sequence; excluded from historical MVP' if release=='V2' else 'V1 — MVP'
        sections.append(f'<section id="{f["id"]}"><h2>{e(f["id"])} · {e(f["name"])}</h2><p>{scope} · {f["kind"].capitalize()} feature · {f["forecast_hours"]}h · {f["status"]} · parent EPIC-MVP</p>'+''.join(content)+'</section>')
    nav=' · '.join(f'<a href="#{f["id"]}">{e(f["id"])}</a>' for f in data['features'])
    outputs['backlog.html']='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>Beneath the Code — story backlog</title><style>
*{box-sizing:border-box}body{margin:0;background:#050505;color:#edeae4;font:16px/1.65 system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:clamp(18px,4vw,48px)}h1{font:clamp(32px,5vw,48px)/1.2 Georgia,serif}h2{font-size:25px;margin-top:48px}h3{font-size:19px}a{color:#edeae4;text-underline-offset:4px}p{max-width:960px}.eyebrow,summary span{color:#b6b3ae}nav{line-height:2.3}.story{border-top:1px solid #45433f;padding:18px 0}summary{font-weight:600;cursor:pointer}summary span{font-weight:400}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#111;padding:20px;font:14px/1.7 ui-monospace,monospace}li{margin:14px 0}.scroll{overflow:auto}table{border-collapse:collapse;min-width:800px;width:100%;font-size:14px}td,th{text-align:left;vertical-align:top;padding:12px;border-bottom:1px solid #45433f}a:focus-visible,summary:focus-visible{outline:2px solid #edeae4;outline-offset:4px}footer{margin-top:40px;color:#b6b3ae}section:target{scroll-margin-top:20px}@media print{body{background:white;color:black}a{color:black}pre{background:#eee;color:black}}
</style></head><body><main><p class="eyebrow">BENEATH THE CODE / EPIC-MVP / PLANNING</p><h1>Read the story.<br>Know what done means.</h1><p><strong>Epic → Feature → User Story (UH) → Task.</strong> Expand a story to read its EARS requirements, Gherkin acceptance scenarios and ordered tasks.</p><p>36 stories · 190 tasks · 298 baseline owner hours. Ten hours/week with AI assistance; no start date or implementation progress claimed.</p><p><a href="roadmap.html">Gantt roadmap</a> · <a href="execution-order.md">Next-task queue</a> · <a href="story-workflow.md">Workflow and Jira mapping</a> · <a href="openspec-handoff.md">OpenSpec handoff</a></p><nav aria-label="Features">'''+nav+'</nav>'+''.join(sections)+'''<footer>Generated from plan.json. Update the source and regenerate rather than editing this view. EARS rules, Gherkin examples and task completion must stay consistent. No OpenSpec or Cucumber installation is implied.</footer></main></body></html>'''
    outputs['backlog.html']=outputs['backlog.html'].replace('36 stories · 190 tasks · 298 baseline owner hours',f'{sum(len(f["stories"]) for f in data["features"])} stories · {sum(len(s["tasks"]) for f in data["features"] for s in f["stories"])} tasks · {sum(f["baseline_hours"] for f in data["features"]):g} baseline owner hours')
    outputs['backlog.html']=outputs['backlog.html'].replace('Ten hours/week with AI assistance; no start date or implementation progress claimed.',f'{len(v1)} V1 features; {len(deferred)} V2 follow-up features. Ten hours/week with AI assistance; baseline hours include historical and deferred work, not remaining effort.')
    outputs['backlog.html']=outputs['backlog.html'].replace('<nav aria-label="Features">',phase_html(data)+'<nav aria-label="Features">')
    return outputs

if __name__=='__main__':
    data=json.loads((PLAN/'plan.json').read_text())
    for relative,body in render(data).items():
        path=PLAN/relative
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text(body)
    print('Generated feature dossiers, tagged Gherkin, hierarchy, execution queue and traceability.')

"""Project the explicitly selected V2 stories; do not schedule the full course."""
import html

def selected_stories(data):
    stories={s['id']:s for f in data['features'] for s in f['stories']}
    return [stories[sid] for phase in data.get('v2_delivery_phases',[]) for sid in phase['story_ids']]

def phase_markdown(data):
    if not data.get('v2_delivery_phases'): return []
    stories={s['id']:s for f in data['features'] for s in f['stories']}
    lines=['## V2 delivery sequence','',data['v2_scope_note'],'',
           '| Phase | Selected stories | Forecast hours | Exit / checkpoint |',
           '|---|---|---:|---|']
    for phase in data['v2_delivery_phases']:
        hours=sum(stories[sid]['forecast_hours'] for sid in phase['story_ids'])
        lines.append(f"| {phase['id']} — {phase['name']} | {', '.join(phase['story_ids'])} | {hours:g} | {phase['exit']} |")
    remaining=sum(t['forecast_hours'] for s in selected_stories(data) for t in s['tasks'] if t['status']!='done')
    reserve=remaining*data['contingency_fraction']
    lines += ['',f'Selected remaining V2 forecast: {remaining:g}h + {reserve:g}h contingency = {remaining+reserve:g} owner hours at {data["capacity_hours_per_week"]:g}h/week. Provisional capacity budget, not a delivery commitment. Zero actual hours means unreported effort.','']
    return lines

def phase_html(data):
    if not data.get('v2_delivery_phases'): return ''
    stories={s['id']:s for f in data['features'] for s in f['stories']}
    rows=[]
    for phase in data['v2_delivery_phases']:
        hours=sum(stories[sid]['forecast_hours'] for sid in phase['story_ids'])
        rows.append('<tr><th scope="row">'+html.escape(phase['id']+' — '+phase['name'])+'</th><td>'+html.escape(', '.join(phase['story_ids']))+f'</td><td>{hours:g}h</td><td>'+html.escape(phase['exit'])+'</td></tr>')
    summary=phase_markdown(data)[-2]
    return '<section id="v2-plan"><h2>V2 delivery sequence</h2><p>'+html.escape(data['v2_scope_note'])+'</p><div class="table-wrap scroll"><table><thead><tr><th>Phase</th><th>Selected stories</th><th>Forecast</th><th>Exit / checkpoint</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div><p>'+html.escape(summary)+'</p></section>'

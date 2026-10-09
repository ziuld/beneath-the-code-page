#!/usr/bin/env python3
"""Generate read-only PM views. Standard library only; no network or app code."""
import html
import json
import math
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLAN = ROOT / 'docs/planning'


def render(data):
    features = data['features']
    capacity = data['capacity_hours_per_week']
    total = sum(f['forecast_hours'] for f in features)
    baseline = sum(f['baseline_hours'] for f in features)
    accepted = sum(f['baseline_hours'] for f in features if f['status'] == 'done')
    done = sum(f['status'] == 'done' for f in features)
    optimistic = sum(f['optimistic_hours'] for f in features)
    pessimistic = sum(f['pessimistic_hours'] for f in features)
    reserve = total * data['contingency_fraction']
    horizon = math.ceil((total + reserve) / capacity)
    rows = []
    cursor = 0
    ends = {}
    for f in features:
        start = cursor / capacity
        cursor += f['forecast_hours']
        end = cursor / capacity
        ends[f['id']] = end
        rows.append((f, start, end))
    summary = (f'{done}/{len(features)} features accepted; '
               f'{accepted}/{baseline} baseline hours accepted ({accepted / baseline:.0%}). '
               f'Forecast {total:g} owner hours + {reserve:g}h contingency = '
               f'{total + reserve:g}h, approximately {math.ceil((total + reserve) / capacity)} weeks '
               f'at {capacity:g}h/week. No start date committed.')
    md = ['# Generated roadmap', '', f'Baseline date: {data["baseline_date"]}.', '', summary, '',
          f'Initial estimating envelope: {optimistic:g}–{pessimistic:g}h before contingency. '
          'These are judgement ranges, not confidence intervals. AI assistance is already assumed.', '',
          'Week 1 begins at project start. Fractional weeks show capacity, not exact appointments. '
          'Bars are total-feature forecasts in planned order, not actual-date tracking; '
          'completed bars retain their baseline slot and use their status label.', '',
          '| ID | Feature | Hours | Elapsed weeks from start | Status | Depends on |',
          '|---|---|---:|---|---|---|']
    for f, start, end in rows:
        md.append(f'| {f["id"]} | {f["name"]} | {f["forecast_hours"]} | '
                  f'{start:.1f}–{end:.1f} | {f["status"]} | '
                  f'{", ".join(f["depends_on"]) or "—"} |')
    md += ['', '## Milestones', '', '| ID | Exit | Elapsed weeks, before shared contingency |', '|---|---|---:|']
    for m in data['milestones']:
        md.append(f'| {m["id"]} | {m["name"]} | {max(ends[x] for x in m["requires"]):.1f} |')
    md += ['', 'Source: [plan.json](plan.json). Run `python3 scripts/render-roadmap.py` from the project root after updates.', '']

    # Relative SVG chart: week numbers, not fabricated calendar commitments.
    width, left, top, rowh = 1260, 365, 60, 34
    plotw = width - left - 30
    height = top + (len(rows) + 1) * rowh + 50
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
           '<title id="title">Beneath the Code feature Gantt</title>',
           f'<desc id="desc">Serial plan at {capacity:g} owner hours per week. All status and hours are also available in the adjacent feature table. No committed start date.</desc>',
           '<rect width="100%" height="100%" fill="#0b0b0b"/>',
           '<g font-family="system-ui,sans-serif" font-size="13" fill="#edeae4">',
           '<text x="20" y="25" font-size="17">Feature schedule · relative weeks · AI-assisted</text>']
    step = 2 if horizon < 45 else 4
    for week in range(0, horizon + 1, step):
        x = left + week / horizon * plotw
        svg += [f'<path d="M{x:.1f} 48 V{height - 35}" stroke="#292927"/>',
                f'<text x="{x:.1f}" y="43" text-anchor="middle">W{week + 1}</text>']
    for i, (f, start, end) in enumerate(rows):
        y = top + i * rowh
        x = left + start / horizon * plotw
        barw = max(3, (end - start) / horizon * plotw)
        label = f'{f["id"]} {f["name"]}'
        svg += [f'<text x="20" y="{y + 16}">{html.escape(label)}</text>',
                f'<rect x="{x:.2f}" y="{y}" width="{barw:.2f}" height="22" fill="{"#9bb7a1" if f["status"] == "done" else "#92908b"}"><title>{html.escape(label)}: {f["forecast_hours"]}h, {html.escape(f["status"])}</title></rect>']
    y = top + len(rows) * rowh
    svg += [f'<text x="20" y="{y + 16}">Shared contingency · {reserve:g}h</text>',
            f'<rect x="{left + total / capacity / horizon * plotw:.2f}" y="{y}" width="{reserve / capacity / horizon * plotw:.2f}" height="22" fill="#45433f"/>',
            f'<text x="20" y="{height - 10}">Gray = scheduled effort, not completion. Accepted: {done}/{len(features)} features. Milestone timing excludes shared contingency.</text>',
            '</g></svg>']
    svg = '\n'.join(svg)
    table = []
    for f, start, end in rows:
        evidence = ', '.join(html.escape(e) for e in f['evidence']) or 'No implementation evidence yet'
        table.append(f'<tr><th scope="row">{html.escape(f["id"])}</th><td><details><summary>{html.escape(f["name"])}</summary>'
                     f'<p><a href="backlog.html#{f["id"]}">Read feature, EARS, Gherkin and ordered tasks</a> · {len(f.get("stories",[]))} stories</p>'
                     f'<p>Owner: {html.escape(f["owner"])}. Dependencies: {html.escape(", ".join(f["depends_on"]) or "None")}.</p>'
                     f'<p>Estimate O / baseline / P: {f["optimistic_hours"]} / {f["baseline_hours"]} / {f["pessimistic_hours"]}h. '
                     f'Actual effort: {f["actual_hours"]}h.</p><p>{html.escape(f["blocker"] or "No recorded blocker")}</p>'
                     f'<p>Evidence: {evidence}</p></details></td><td>{html.escape(f["status"])}</td>'
                     f'<td>{f["forecast_hours"]}h</td><td>{start:.1f}–{end:.1f}</td></tr>')
    milestones = ''.join(f'<li><strong>{m["id"]}</strong> {html.escape(m["name"])} — '
                         f'{max(ends[x] for x in m["requires"]):.1f} elapsed weeks before contingency</li>' for m in data['milestones'])
    page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'">
<title>Beneath the Code — project roadmap</title>
<style>
*{{box-sizing:border-box}}body{{margin:0;background:#050505;color:#edeae4;font:16px/1.6 system-ui,sans-serif}}
main{{max-width:1400px;margin:auto;padding:clamp(18px,4vw,55px)}}h1{{font:clamp(32px,5vw,54px)/1.15 Georgia,serif;margin:16px 0}}
h2{{font-size:22px;margin-top:36px}}p{{max-width:1000px}}a{{color:#edeae4;text-underline-offset:4px}}a:focus-visible,summary:focus-visible{{outline:2px solid #edeae4;outline-offset:4px}}
.eyebrow{{font:13px ui-monospace,monospace;letter-spacing:1px;color:#b6b3ae}}.chart{{overflow:auto}}.chart svg{{min-width:1050px;width:100%;height:auto}}
.table-wrap{{overflow:auto}}table{{border-collapse:collapse;width:100%;min-width:690px}}th,td{{text-align:left;vertical-align:top;padding:12px;border-bottom:1px solid #45433f}}th{{font-weight:600}}
summary{{cursor:pointer}}details p{{font-size:14px;color:#c0bdb7}}footer{{margin-top:40px;color:#b6b3ae}}.summary{{font-size:18px}}
@media print{{body{{background:white;color:black}}a,footer{{color:black}}.chart svg{{min-width:0}}main{{padding:0}}}}
</style></head><body><main>
<p class="eyebrow">BENEATH THE CODE / PROJECT CONTROL / {data['baseline_date']}</p>
<h1>From foundations<br>to a complete first release.</h1>
<p class="summary">{html.escape(summary)}</p>
<p>Capacity: <strong>{capacity:g} owner hours/week with AI assistance</strong>. One owner, serial delivery.
No actual dates are committed. Initial estimate range: {optimistic:g}–{pessimistic:g} hours before contingency.</p>
<nav aria-label="Planning documents"><a href="backlog.html">Epic → Feature → UH → Task</a> · <a href="project-plan.md">PM plan</a> · <a href="feature-backlog.md">Acceptance criteria</a> · <a href="sprints.md">Sprints</a> · <a href="plan.json">Tracking data</a> · <a href="../bootstrap/manual-initializr.md">Manual import</a></nav>
<h2>Feature Gantt</h2><p>Week 1 starts when work begins. Bars show planned effort, not work completed. Scroll the chart on smaller screens.</p>
<div class="chart">{svg}</div><h2>Milestones</h2><ul>{milestones}</ul>
<h2>Feature status</h2><p>Expand a feature for dependencies, estimates and evidence. Elapsed weeks are measured from project start (0.0).</p>
<div class="table-wrap"><table><thead><tr><th>ID</th><th>Feature</th><th>Status</th><th>Forecast</th><th>Elapsed weeks</th></tr></thead><tbody>{''.join(table)}</tbody></table></div>
<footer>Read-only generated view. Update plan.json, regenerate, and validate. This dashboard neither tracks GitHub automatically nor changes feature status. No application implementation has started in the baseline.</footer>
</main></body></html>
'''
    # Mermaid requires dates; use an explicit synthetic anchor, never a real promised start.
    mm = ['gantt', '    title Relative plan — synthetic 2000-01-01 anchor, NOT delivery dates',
          '    dateFormat YYYY-MM-DDTHH:mm', '    axisFormat %j', '    section Serial features']
    anchor = datetime(2000, 1, 1)
    def synthetic_date(week):
        return (anchor + timedelta(weeks=week)).strftime('%Y-%m-%dT%H:%M')
    for f, start, end in rows:
        mm.append(f'    {f["id"]} {f["name"]} :{f["id"]}, {synthetic_date(start)}, {synthetic_date(end)}')
    mm += ['    section Contingency', f'    Shared reserve :reserve, {synthetic_date(total / capacity)}, {synthetic_date((total + reserve) / capacity)}', '']
    return {'roadmap.md': '\n'.join(md), 'roadmap.html': page, 'gantt.svg': svg,
            'gantt.mmd': '\n'.join(mm)}


if __name__ == '__main__':
    data = json.loads((PLAN / 'plan.json').read_text())
    for name, content in render(data).items():
        (PLAN / name).write_text(content)
    print('Generated roadmap.md, roadmap.html, gantt.svg and gantt.mmd from plan.json')

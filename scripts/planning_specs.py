"""Resolve opted-in story behaviour from authoritative main OpenSpec documents."""
import copy
import re


def resolve_behaviour(data, root):
    result = copy.deepcopy(data)
    for feature in result['features']:
        for story in feature['stories']:
            source = story.get('behaviour_spec')
            if not source:
                continue
            path = (root / source).resolve()
            specs = (root / 'openspec/specs').resolve()
            if not path.is_relative_to(specs) or not path.is_file():
                raise ValueError(f'{story["id"]}: invalid main behaviour specification')
            if any(set(r) != {'id'} for r in story['requirements']) or any(
                set(a) != {'id', 'verification'} for a in story['scenarios']
            ):
                raise ValueError(f'{story["id"]}: duplicate editable behaviour in plan.json')
            requirements, scenarios = [], []
            text = path.read_text()
            if '## Requirements\n' not in text or re.search(r'^## (ADDED|MODIFIED|REMOVED|RENAMED)', text, re.M):
                raise ValueError(f'{story["id"]}: expected main specification structure')
            blocks = re.split(r'^### Requirement: ', text, flags=re.M)[1:]
            for block in blocks:
                heading, body = block.split('\n', 1)
                rid = heading.split(' — ')[0]
                statement = body.split('#### Scenario:')[0].strip().replace('SHALL', 'shall')
                prefix = statement.split(' ', 1)[0]
                pattern = {'When': 'event', 'If': 'unwanted', 'While': 'state',
                           'Where': 'optional', 'The': 'ubiquitous'}.get(prefix)
                if not pattern:
                    raise ValueError(f'{rid}: unsupported EARS statement')
                requirements.append({'id': rid, 'pattern': pattern, 'text': statement})
                for section in re.split(r'^#### Scenario: ', body, flags=re.M)[1:]:
                    title, steps = section.split('\n', 1)
                    aid, name = title.split(' — ', 1)
                    if any(line.strip() and not re.fullmatch(r'- \*\*(GIVEN|WHEN|THEN)\*\* .+', line)
                           for line in steps.splitlines()):
                        raise ValueError(f'{aid}: unsupported scenario content')
                    values = {}
                    for keyword in ('GIVEN', 'WHEN', 'THEN'):
                        matches = re.findall(r'^- \*\*' + keyword + r'\*\* (.+)$', steps, re.M)
                        if len(matches) != 1:
                            raise ValueError(f'{aid}: expected one {keyword} step')
                        values[keyword.lower()] = matches[0]
                    scenarios.append({'id': aid, 'name': name, 'requirement_ids': [rid], **values})
            if [r['id'] for r in requirements] != [r['id'] for r in story['requirements']] or (
                [a['id'] for a in scenarios] != [a['id'] for a in story['scenarios']]
            ):
                raise ValueError(f'{story["id"]}: specification IDs differ from tracking references')
            for scenario, tracking in zip(scenarios, story['scenarios']):
                scenario['verification'] = tracking['verification']
            story['requirements'], story['scenarios'] = requirements, scenarios
    return result

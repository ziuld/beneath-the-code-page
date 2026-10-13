"""Select authored Markdown without traversing downloaded or generated trees."""
import os
from pathlib import Path


def markdown_documents(root):
    excluded = {'target', 'node_modules', '.git', '.mvn', 'reference'}
    for directory, children, files in os.walk(root, followlinks=False):
        children[:] = sorted(name for name in children if name not in excluded)
        for name in sorted(files):
            if name.endswith('.md'):
                yield Path(directory) / name

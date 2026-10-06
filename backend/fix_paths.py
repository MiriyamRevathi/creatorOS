import os

for name in ['calendar', 'project', 'task', 'collaboration']:
    path = f'controllers/{name}_controller.py'
    with open(path, 'r') as f:
        content = f.read()
    
    content = content.replace("os.path.join('..', 'data'", "os.path.join(os.path.dirname(__file__), '..', '..', 'data'")
    
    with open(path, 'w') as f:
        f.write(content)

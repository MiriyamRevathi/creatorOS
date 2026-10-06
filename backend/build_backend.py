import os
import json

base_dir = r"D:\creator OS"
backend_dir = os.path.join(base_dir, "backend")
data_dir = os.path.join(base_dir, "data")

# Create directories if they don't exist
os.makedirs(os.path.join(data_dir, "calendars"), exist_ok=True)
os.makedirs(os.path.join(data_dir, "projects"), exist_ok=True)
os.makedirs(os.path.join(data_dir, "tasks"), exist_ok=True)
os.makedirs(os.path.join(data_dir, "collaborations"), exist_ok=True)

# Helper function to write python file
def write_py(path, content):
    with open(path, "w") as f:
        f.write(content)

# models/repository.py - Generic JSON Repository
repository_code = """import json
import os
import uuid
from typing import List, Dict, Optional

class JsonRepository:
    def __init__(self, data_dir: str):
        self.data_dir = data_dir
        os.makedirs(self.data_dir, exist_ok=True)
    
    def _get_file_path(self, item_id: str) -> str:
        return os.path.join(self.data_dir, f"{item_id}.json")

    def get_all(self) -> List[Dict]:
        items = []
        for filename in os.listdir(self.data_dir):
            if filename.endswith(".json"):
                with open(os.path.join(self.data_dir, filename), 'r') as f:
                    items.append(json.load(f))
        return items

    def get_by_id(self, item_id: str) -> Optional[Dict]:
        file_path = self._get_file_path(item_id)
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return json.load(f)
        return None

    def create(self, item: Dict) -> Dict:
        if 'id' not in item:
            item['id'] = str(uuid.uuid4())
        
        file_path = self._get_file_path(item['id'])
        with open(file_path, 'w') as f:
            json.dump(item, f, indent=4)
        return item

    def update(self, item_id: str, item: Dict) -> Optional[Dict]:
        existing = self.get_by_id(item_id)
        if existing:
            item['id'] = item_id # Ensure ID doesn't change
            file_path = self._get_file_path(item_id)
            with open(file_path, 'w') as f:
                json.dump(item, f, indent=4)
            return item
        return None

    def delete(self, item_id: str) -> bool:
        file_path = self._get_file_path(item_id)
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
"""

write_py(os.path.join(backend_dir, "repositories", "repository.py"), repository_code)

# create controllers
def gen_controller(name):
    return f"""from flask import request, jsonify
from repositories.repository import JsonRepository
import os

repo = JsonRepository(os.path.join('..', 'data', '{name}s'))

def get_all():
    return jsonify(repo.get_all())

def get_by_id(item_id):
    item = repo.get_by_id(item_id)
    if item:
        return jsonify(item)
    return jsonify({{'error': 'Not found'}}), 404

def create():
    data = request.json
    item = repo.create(data)
    return jsonify(item), 201

def update(item_id):
    data = request.json
    item = repo.update(item_id, data)
    if item:
        return jsonify(item)
    return jsonify({{'error': 'Not found'}}), 404

def delete(item_id):
    if repo.delete(item_id):
        return jsonify({{'message': 'Deleted'}}), 200
    return jsonify({{'error': 'Not found'}}), 404
"""

for entity in ["calendar", "project", "task", "collaboration"]:
    write_py(os.path.join(backend_dir, "controllers", f"{entity}_controller.py"), gen_controller(entity))

# routes
def gen_routes(name, path_name):
    return f"""from flask import Blueprint
from controllers.{name}_controller import get_all, get_by_id, create, update, delete

{name}_bp = Blueprint('{name}_bp', __name__)

{name}_bp.route('/', methods=['GET'])(get_all)
{name}_bp.route('/<item_id>', methods=['GET'])(get_by_id)
{name}_bp.route('/', methods=['POST'])(create)
{name}_bp.route('/<item_id>', methods=['PUT'])(update)
{name}_bp.route('/<item_id>', methods=['DELETE'])(delete)
"""

write_py(os.path.join(backend_dir, "routes", "calendar_routes.py"), gen_routes("calendar", "calendar"))
write_py(os.path.join(backend_dir, "routes", "project_routes.py"), gen_routes("project", "projects"))
write_py(os.path.join(backend_dir, "routes", "task_routes.py"), gen_routes("task", "tasks"))
write_py(os.path.join(backend_dir, "routes", "collaboration_routes.py"), gen_routes("collaboration", "collaborations"))

# Generate sample data
sample_projects = [
    {"id": "p1", "title": "Summer Campaign", "status": "active", "description": "Summer marketing campaign", "team": ["user1", "user2"]}
]
sample_tasks = [
    {"id": "t1", "projectId": "p1", "title": "Design assets", "status": "todo", "assignee": "user1"}
]
sample_calendars = [
    {"id": "c1", "title": "Video release", "date": "2026-10-10", "type": "video", "status": "scheduled"}
]
sample_collaborations = [
    {"id": "col1", "partner": "TechBrand", "status": "negotiating", "details": "Sponsorship for 3 videos"}
]

with open(os.path.join(data_dir, "projects", "p1.json"), "w") as f: json.dump(sample_projects[0], f)
with open(os.path.join(data_dir, "tasks", "t1.json"), "w") as f: json.dump(sample_tasks[0], f)
with open(os.path.join(data_dir, "calendars", "c1.json"), "w") as f: json.dump(sample_calendars[0], f)
with open(os.path.join(data_dir, "collaborations", "col1.json"), "w") as f: json.dump(sample_collaborations[0], f)

print("Backend setup complete.")

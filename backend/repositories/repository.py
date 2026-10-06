import json
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

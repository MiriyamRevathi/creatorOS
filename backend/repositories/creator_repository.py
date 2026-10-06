import json
import os
from models.creator import Creator

class CreatorRepository:
    def __init__(self, data_dir=None):
        if data_dir is None:
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            data_dir = os.path.join(base_dir, "data", "creators")
        self.data_dir = data_dir
        self.file_path = os.path.join(self.data_dir, "creators.json")
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        os.makedirs(self.data_dir, exist_ok=True)
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump([], f, indent=2)

    def _load_all(self):
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return [Creator.from_dict(item) for item in data]
        except Exception:
            return []

    def _save_all(self, creators):
        data = [c.to_dict() for c in creators]
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def find_all(self):
        return self._load_all()

    def find_by_id(self, creator_id):
        creators = self._load_all()
        for c in creators:
            if c.id == creator_id:
                return c
        return None

    def find_by_user_id(self, user_id):
        creators = self._load_all()
        for c in creators:
            if c.user_id == user_id:
                return c
        return None

    def save(self, creator):
        creators = self._load_all()
        existing_index = None
        for idx, c in enumerate(creators):
            if c.id == creator.id or c.user_id == creator.user_id:
                existing_index = idx
                break
        if existing_index is not None:
            creators[existing_index] = creator
        else:
            creators.append(creator)
        self._save_all(creators)
        return creator

    def delete(self, creator_id):
        creators = self._load_all()
        creators = [c for c in creators if c.id != creator_id]
        self._save_all(creators)
        return True

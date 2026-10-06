import json
import os
from models.user import User

class UserRepository:
    def __init__(self, data_dir=None):
        if data_dir is None:
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            data_dir = os.path.join(base_dir, "data", "users")
        self.data_dir = data_dir
        self.file_path = os.path.join(self.data_dir, "users.json")
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
                return [User.from_dict(item) for item in data]
        except Exception:
            return []

    def _save_all(self, users):
        data = [u.to_dict(include_sensitive=True) for u in users]
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def find_all(self):
        return self._load_all()

    def find_by_id(self, user_id):
        users = self._load_all()
        for u in users:
            if u.id == user_id:
                return u
        return None

    def find_by_email(self, email):
        if not email:
            return None
        email_clean = email.lower().strip()
        users = self._load_all()
        for u in users:
            if u.email == email_clean:
                return u
        return None

    def save(self, user):
        users = self._load_all()
        existing_index = None
        for idx, u in enumerate(users):
            if u.id == user.id:
                existing_index = idx
                break
        if existing_index is not None:
            users[existing_index] = user
        else:
            users.append(user)
        self._save_all(users)
        return user

    def delete(self, user_id):
        users = self._load_all()
        users = [u for u in users if u.id != user_id]
        self._save_all(users)
        return True

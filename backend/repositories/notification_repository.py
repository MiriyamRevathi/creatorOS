import json
import os
from models.notification import Notification

class NotificationRepository:
    def __init__(self, data_dir=None):
        if data_dir is None:
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
            data_dir = os.path.join(base_dir, "data", "notifications")
        self.data_dir = data_dir
        self.file_path = os.path.join(self.data_dir, "notifications.json")
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
                return [Notification.from_dict(item) for item in data]
        except Exception:
            return []

    def _save_all(self, notifications):
        data = [n.to_dict() for n in notifications]
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def find_all(self):
        return self._load_all()

    def find_by_user_id(self, user_id):
        notifications = self._load_all()
        return [n for n in notifications if n.user_id == user_id]

    def find_by_id(self, notification_id):
        notifications = self._load_all()
        for n in notifications:
            if n.id == notification_id:
                return n
        return None

    def save(self, notification):
        notifications = self._load_all()
        existing_index = None
        for idx, n in enumerate(notifications):
            if n.id == notification.id:
                existing_index = idx
                break
        if existing_index is not None:
            notifications[existing_index] = notification
        else:
            notifications.insert(0, notification)
        self._save_all(notifications)
        return notification

    def mark_as_read(self, notification_id, user_id):
        notifications = self._load_all()
        updated = False
        for n in notifications:
            if n.id == notification_id and n.user_id == user_id:
                n.is_read = True
                updated = True
                break
        if updated:
            self._save_all(notifications)
        return updated

    def mark_all_as_read(self, user_id):
        notifications = self._load_all()
        for n in notifications:
            if n.user_id == user_id:
                n.is_read = True
        self._save_all(notifications)
        return True

    def delete(self, notification_id, user_id):
        notifications = self._load_all()
        notifications = [n for n in notifications if not (n.id == notification_id and n.user_id == user_id)]
        self._save_all(notifications)
        return True

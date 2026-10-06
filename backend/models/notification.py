import uuid
from datetime import datetime

class Notification:
    def __init__(self, user_id, title, message, category="info", is_read=False, link="", id=None, created_at=None):
        self.id = id or str(uuid.uuid4())
        self.user_id = user_id
        self.title = title
        self.message = message
        self.category = category
        self.is_read = is_read
        self.link = link
        self.created_at = created_at or datetime.utcnow().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "message": self.message,
            "category": self.category,
            "is_read": self.is_read,
            "link": self.link,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data.get("id"),
            user_id=data.get("user_id"),
            title=data.get("title", ""),
            message=data.get("message", ""),
            category=data.get("category", "info"),
            is_read=data.get("is_read", False),
            link=data.get("link", ""),
            created_at=data.get("created_at")
        )

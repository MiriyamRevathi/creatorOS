import uuid
from datetime import datetime, timezone

class Customer:
    def __init__(
        self,
        id=None,
        name="",
        email="",
        avatar="",
        total_orders=0,
        total_spent=0.0,
        last_order_date=None,
        tags=None,
        notes="",
        created_at=None
    ):
        self.id = id if id else f"cust_{uuid.uuid4().hex[:10]}"
        self.name = name
        self.email = email
        self.avatar = avatar
        self.total_orders = int(total_orders)
        self.total_spent = float(total_spent)
        self.last_order_date = last_order_date if last_order_date else datetime.now(timezone.utc).isoformat()
        self.tags = tags if isinstance(tags, list) else ["Customer"]
        self.notes = notes
        self.created_at = created_at if created_at else datetime.now(timezone.utc).isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar": self.avatar,
            "total_orders": self.total_orders,
            "total_spent": self.total_spent,
            "last_order_date": self.last_order_date,
            "tags": self.tags,
            "notes": self.notes,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        if not data:
            return None
        return cls(
            id=data.get("id"),
            name=data.get("name", ""),
            email=data.get("email", ""),
            avatar=data.get("avatar", ""),
            total_orders=data.get("total_orders", 0),
            total_spent=data.get("total_spent", 0.0),
            last_order_date=data.get("last_order_date"),
            tags=data.get("tags", ["Customer"]),
            notes=data.get("notes", ""),
            created_at=data.get("created_at")
        )

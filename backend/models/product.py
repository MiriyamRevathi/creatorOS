import uuid
from datetime import datetime, timezone

class Product:
    def __init__(
        self,
        id=None,
        title="",
        description="",
        category="templates",
        price=0.0,
        type="digital_download",
        file_url="",
        thumbnail="",
        sales_count=0,
        status="active",
        created_at=None,
        rating=5.0,
        tags=None
    ):
        self.id = id if id else f"prod_{uuid.uuid4().hex[:10]}"
        self.title = title
        self.description = description
        self.category = category  # e.g., templates, ebooks, courses, presets, audio
        self.price = float(price)
        self.type = type  # digital_download, course_access, template_link, preset_pack
        self.file_url = file_url
        self.thumbnail = thumbnail
        self.sales_count = int(sales_count)
        self.status = status  # active, draft, archived
        self.created_at = created_at if created_at else datetime.now(timezone.utc).isoformat()
        self.rating = float(rating)
        self.tags = tags if isinstance(tags, list) else []

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "price": self.price,
            "type": self.type,
            "file_url": self.file_url,
            "thumbnail": self.thumbnail,
            "sales_count": self.sales_count,
            "status": self.status,
            "created_at": self.created_at,
            "rating": self.rating,
            "tags": self.tags
        }

    @classmethod
    def from_dict(cls, data):
        if not data:
            return None
        return cls(
            id=data.get("id"),
            title=data.get("title", ""),
            description=data.get("description", ""),
            category=data.get("category", "templates"),
            price=data.get("price", 0.0),
            type=data.get("type", "digital_download"),
            file_url=data.get("file_url", ""),
            thumbnail=data.get("thumbnail", ""),
            sales_count=data.get("sales_count", 0),
            status=data.get("status", "active"),
            created_at=data.get("created_at"),
            rating=data.get("rating", 5.0),
            tags=data.get("tags", [])
        )

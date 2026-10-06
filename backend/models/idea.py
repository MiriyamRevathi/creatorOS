"""Idea domain model."""
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
import uuid

VALID_CONTENT_TYPES = [
    "Video",
    "Short",
    "Reel",
    "Post",
    "Blog",
    "Podcast",
    "Newsletter",
    "Other",
]

VALID_PRIORITIES = ["Low", "Medium", "High", "Urgent"]

VALID_IDEA_STATUSES = [
    "Backlog",
    "Planned",
    "In Progress",
    "Published",
    "Archived",
]


@dataclass
class Idea:
    title: str
    description: str = ""
    content_type: str = "Video"
    tags: List[str] = field(default_factory=list)
    priority: str = "Medium"
    status: str = "Backlog"
    target_date: Optional[str] = None
    converted_to_content_id: Optional[str] = None
    id: str = field(default_factory=lambda: f"idea-{uuid.uuid4().hex[:10]}")
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
    updated_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def to_dict(self) -> Dict[str, Any]:
        """Convert domain model to serializable dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Idea":
        """Reconstruct model from dictionary."""
        return cls(
            id=data.get("id", f"idea-{uuid.uuid4().hex[:10]}"),
            title=data.get("title", "").strip(),
            description=data.get("description", "").strip(),
            content_type=data.get("content_type", "Video"),
            tags=list(data.get("tags") or []),
            priority=data.get("priority", "Medium"),
            status=data.get("status", "Backlog"),
            target_date=data.get("target_date"),
            converted_to_content_id=data.get("converted_to_content_id"),
            created_at=data.get(
                "created_at", datetime.now(timezone.utc).isoformat()
            ),
            updated_at=data.get(
                "updated_at", datetime.now(timezone.utc).isoformat()
            ),
        )

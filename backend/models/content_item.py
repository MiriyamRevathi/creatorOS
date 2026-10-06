"""ContentItem domain model."""
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
import uuid

VALID_CONTENT_STATUSES = [
    "Draft",
    "In Review",
    "Scheduled",
    "Published",
    "Archived",
]

VALID_PLATFORMS = [
    "YouTube",
    "Instagram",
    "LinkedIn",
    "TikTok",
    "Twitter/X",
    "Substack",
    "Medium",
    "Other",
]


def calculate_content_metadata(body: str) -> Dict[str, Any]:
    """Calculate character count, word count, and reading/speaking duration."""
    text = (body or "").strip()
    char_count = len(text)
    words = [w for w in text.split() if w]
    word_count = len(words)

    # Average reading speed ~ 200 words per minute
    reading_time_minutes = max(1, round(word_count / 200)) if word_count > 0 else 0

    # Average speaking speed ~ 130 words per minute (approx 2.1 words per second)
    speaking_duration_seconds = round((word_count / 130) * 60) if word_count > 0 else 0

    return {
        "character_count": char_count,
        "word_count": word_count,
        "reading_time_minutes": reading_time_minutes,
        "estimated_duration_seconds": speaking_duration_seconds,
    }


@dataclass
class ContentItem:
    title: str
    content_type: str = "Video"
    platform: str = "YouTube"
    status: str = "Draft"
    description: str = ""
    body: str = ""
    tags: List[str] = field(default_factory=list)
    source_idea_id: Optional[str] = None
    thumbnail_url: Optional[str] = None
    target_date: Optional[str] = None
    published_date: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    id: str = field(default_factory=lambda: f"content-{uuid.uuid4().hex[:10]}")
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
    updated_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def __post_init__(self):
        if not self.metadata:
            self.metadata = calculate_content_metadata(self.body)

    def to_dict(self) -> Dict[str, Any]:
        """Convert domain model to dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ContentItem":
        """Construct domain model from dictionary."""
        body = data.get("body", "").strip() if data.get("body") else ""
        metadata = data.get("metadata") or calculate_content_metadata(body)

        return cls(
            id=data.get("id", f"content-{uuid.uuid4().hex[:10]}"),
            title=data.get("title", "").strip(),
            content_type=data.get("content_type", "Video"),
            platform=data.get("platform", "YouTube"),
            status=data.get("status", "Draft"),
            description=data.get("description", "").strip() if data.get("description") else "",
            body=body,
            tags=list(data.get("tags") or []),
            source_idea_id=data.get("source_idea_id"),
            thumbnail_url=data.get("thumbnail_url"),
            target_date=data.get("target_date"),
            published_date=data.get("published_date"),
            metadata=metadata,
            created_at=data.get("created_at", datetime.now(timezone.utc).isoformat()),
            updated_at=data.get("updated_at", datetime.now(timezone.utc).isoformat()),
        )

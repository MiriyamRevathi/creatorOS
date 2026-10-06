"""Data schemas defining expected serialization structure for Content items."""

CONTENT_SCHEMA = {
    "type": "object",
    "required": ["id", "title", "content_type", "platform", "status", "created_at", "updated_at"],
    "properties": {
        "id": {"type": "string"},
        "title": {"type": "string", "maxLength": 250},
        "content_type": {"type": "string"},
        "platform": {"type": "string"},
        "status": {"type": "string", "enum": ["Draft", "In Review", "Scheduled", "Published", "Archived"]},
        "description": {"type": "string"},
        "body": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "source_idea_id": {"type": ["string", "null"]},
        "thumbnail_url": {"type": ["string", "null"]},
        "target_date": {"type": ["string", "null"]},
        "published_date": {"type": ["string", "null"]},
        "metadata": {
            "type": "object",
            "properties": {
                "character_count": {"type": "integer"},
                "word_count": {"type": "integer"},
                "reading_time_minutes": {"type": "integer"},
                "estimated_duration_seconds": {"type": "integer"},
            },
        },
        "created_at": {"type": "string"},
        "updated_at": {"type": "string"},
    },
}

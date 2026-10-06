"""Data schemas defining expected serialization structure for Ideas."""

IDEA_SCHEMA = {
    "type": "object",
    "required": ["id", "title", "content_type", "status", "priority", "created_at", "updated_at"],
    "properties": {
        "id": {"type": "string"},
        "title": {"type": "string", "maxLength": 200},
        "description": {"type": "string"},
        "content_type": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "priority": {"type": "string", "enum": ["Low", "Medium", "High", "Urgent"]},
        "status": {"type": "string", "enum": ["Backlog", "Planned", "In Progress", "Published", "Archived"]},
        "target_date": {"type": ["string", "null"]},
        "converted_to_content_id": {"type": ["string", "null"]},
        "created_at": {"type": "string"},
        "updated_at": {"type": "string"},
    },
}

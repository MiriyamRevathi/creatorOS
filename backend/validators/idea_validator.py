"""Validation logic for Idea input data."""
from datetime import datetime
from typing import Dict, Any, List, Optional
from backend.models.idea import (
    VALID_CONTENT_TYPES,
    VALID_PRIORITIES,
    VALID_IDEA_STATUSES,
)


class ValidationError(Exception):
    """Domain validation error with specific field context."""

    def __init__(self, message: str, field: Optional[str] = None):
        super().__init__(message)
        self.message = message
        self.field = field


def validate_idea_data(data: Dict[str, Any], is_update: bool = False) -> Dict[str, Any]:
    """Validate and sanitize idea input data.

    Returns sanitized clean dictionary or raises ValidationError.
    """
    if not isinstance(data, dict):
        raise ValidationError("Request payload must be a JSON object")

    clean_data: Dict[str, Any] = {}

    # Validate Title
    if "title" in data or not is_update:
        raw_title = data.get("title")
        if not raw_title or not isinstance(raw_title, str) or not raw_title.strip():
            raise ValidationError("Idea title is required and cannot be empty", field="title")
        clean_title = raw_title.strip()
        if len(clean_title) > 200:
            raise ValidationError("Idea title cannot exceed 200 characters", field="title")
        clean_data["title"] = clean_title

    # Validate Description
    if "description" in data:
        raw_desc = data.get("description", "")
        if raw_desc is not None and not isinstance(raw_desc, str):
            raise ValidationError("Description must be a string", field="description")
        clean_data["description"] = (raw_desc or "").strip()

    # Validate Content Type
    if "content_type" in data:
        c_type = data.get("content_type")
        if c_type not in VALID_CONTENT_TYPES:
            raise ValidationError(
                f"Invalid content type '{c_type}'. Must be one of: {', '.join(VALID_CONTENT_TYPES)}",
                field="content_type",
            )
        clean_data["content_type"] = c_type

    # Validate Priority
    if "priority" in data:
        priority = data.get("priority")
        if priority not in VALID_PRIORITIES:
            raise ValidationError(
                f"Invalid priority '{priority}'. Must be one of: {', '.join(VALID_PRIORITIES)}",
                field="priority",
            )
        clean_data["priority"] = priority

    # Validate Status
    if "status" in data:
        status = data.get("status")
        if status not in VALID_IDEA_STATUSES:
            raise ValidationError(
                f"Invalid status '{status}'. Must be one of: {', '.join(VALID_IDEA_STATUSES)}",
                field="status",
            )
        clean_data["status"] = status

    # Validate Tags
    if "tags" in data:
        raw_tags = data.get("tags")
        if raw_tags is not None:
            if not isinstance(raw_tags, list):
                raise ValidationError("Tags must be a list of strings", field="tags")
            clean_tags: List[str] = []
            for t in raw_tags:
                if not isinstance(t, str):
                    raise ValidationError("Each tag must be a string", field="tags")
                tag_str = t.strip()
                if tag_str and tag_str not in clean_tags:
                    if len(tag_str) > 50:
                        raise ValidationError("Tag length cannot exceed 50 characters", field="tags")
                    clean_tags.append(tag_str)
            clean_data["tags"] = clean_tags

    # Validate Target Date
    if "target_date" in data:
        raw_date = data.get("target_date")
        if raw_date:
            if not isinstance(raw_date, str):
                raise ValidationError("Target date must be a valid date string (YYYY-MM-DD)", field="target_date")
            try:
                # Support standard YYYY-MM-DD
                datetime.strptime(raw_date.strip()[:10], "%Y-%m-%d")
                clean_data["target_date"] = raw_date.strip()[:10]
            except ValueError:
                raise ValidationError("Target date must be formatted as YYYY-MM-DD", field="target_date")
        else:
            clean_data["target_date"] = None

    if "converted_to_content_id" in data:
        clean_data["converted_to_content_id"] = data.get("converted_to_content_id")

    return clean_data

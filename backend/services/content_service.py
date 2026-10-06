"""Content business logic service for Content Studio & Content Library."""
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from backend.models.content_item import ContentItem, calculate_content_metadata
from backend.repositories.content_repository import ContentRepository
from backend.repositories.ideas_repository import IdeasRepository
from backend.services.ideas_service import NotFoundError
from backend.validators.content_validator import validate_content_data


class ContentService:
    """Service managing content items, idea conversion, and writing assistance."""

    def __init__(
        self,
        content_repo: Optional[ContentRepository] = None,
        ideas_repo: Optional[IdeasRepository] = None,
    ):
        self.content_repo = content_repo or ContentRepository()
        self.ideas_repo = ideas_repo or IdeasRepository()

    def get_content_list(
        self,
        search: Optional[str] = None,
        status: Optional[str] = None,
        content_type: Optional[str] = None,
        platform: Optional[str] = None,
        tags: Optional[List[str]] = None,
        sort_by: str = "updated_at",
        sort_order: str = "desc",
    ) -> List[Dict[str, Any]]:
        """Retrieve filtered and sorted content items."""
        return self.content_repo.filter_content(
            search=search,
            status=status,
            content_type=content_type,
            platform=platform,
            tags=tags,
            sort_by=sort_by,
            sort_order=sort_order,
        )

    def get_content_by_id(self, content_id: str) -> Dict[str, Any]:
        """Retrieve single content item by ID."""
        item = self.content_repo.get_by_id(content_id)
        if not item:
            raise NotFoundError(f"Content item with ID '{content_id}' was not found")
        return item

    def create_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and create a new content item."""
        clean_data = validate_content_data(data, is_update=False)
        item = ContentItem.from_dict(clean_data)
        return self.content_repo.insert(item.to_dict())

    def update_content(self, content_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and update existing content item."""
        existing = self.content_repo.get_by_id(content_id)
        if not existing:
            raise NotFoundError(f"Content item with ID '{content_id}' was not found")

        clean_data = validate_content_data(data, is_update=True)
        clean_data["updated_at"] = datetime.now(timezone.utc).isoformat()

        # If body is being updated, recalculate metadata
        if "body" in clean_data:
            clean_data["metadata"] = calculate_content_metadata(clean_data["body"])

        # If status changed to Published and published_date is not set, set it now
        if clean_data.get("status") == "Published" and not clean_data.get("published_date"):
            clean_data["published_date"] = datetime.now(timezone.utc).isoformat()

        updated = self.content_repo.update(content_id, clean_data)
        if not updated:
            raise NotFoundError(f"Failed to update content item with ID '{content_id}'")
        return updated

    def delete_content(self, content_id: str) -> bool:
        """Delete content item by ID."""
        existing = self.content_repo.get_by_id(content_id)
        if not existing:
            raise NotFoundError(f"Content item with ID '{content_id}' was not found")
        return self.content_repo.delete(content_id)

    def convert_idea_to_content(self, idea_id: str, extra_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Convert an existing Idea into a Content Studio item."""
        idea = self.ideas_repo.get_by_id(idea_id)
        if not idea:
            raise NotFoundError(f"Idea with ID '{idea_id}' was not found for conversion")

        # Map content_type to suggested default platform
        default_platform_map = {
            "Video": "YouTube",
            "Short": "YouTube",
            "Reel": "Instagram",
            "Post": "LinkedIn",
            "Blog": "Medium",
            "Podcast": "Other",
            "Newsletter": "Substack",
        }

        content_payload = {
            "title": idea.get("title", ""),
            "content_type": idea.get("content_type", "Video"),
            "platform": default_platform_map.get(idea.get("content_type"), "YouTube"),
            "status": "Draft",
            "description": idea.get("description", ""),
            "body": f"# {idea.get('title')}\n\n## Overview\n{idea.get('description', '')}\n\n## Script / Content Outline\n- Introduction:\n- Main Points:\n- Call to Action:\n",
            "tags": idea.get("tags", []),
            "source_idea_id": idea_id,
            "target_date": idea.get("target_date"),
        }

        if extra_data:
            content_payload.update(extra_data)

        created_content = self.create_content(content_payload)

        # Update the Idea to record the conversion and set status to In Progress
        self.ideas_repo.update(idea_id, {
            "converted_to_content_id": created_content["id"],
            "status": "In Progress",
            "updated_at": datetime.now(timezone.utc).isoformat(),
        })

        return created_content

    def get_stats(self) -> Dict[str, Any]:
        """Retrieve aggregated content stats."""
        return self.content_repo.get_stats()

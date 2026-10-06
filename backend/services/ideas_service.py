"""Ideas business logic service."""
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from backend.models.idea import Idea
from backend.repositories.ideas_repository import IdeasRepository
from backend.validators.idea_validator import validate_idea_data, ValidationError


class NotFoundError(Exception):
    """Resource not found error."""
    pass


class IdeasService:
    """Service encapsulating Ideas business logic and domain rules."""

    def __init__(self, repository: Optional[IdeasRepository] = None):
        self.repository = repository or IdeasRepository()

    def get_ideas(
        self,
        search: Optional[str] = None,
        status: Optional[str] = None,
        content_type: Optional[str] = None,
        priority: Optional[str] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> List[Dict[str, Any]]:
        """Retrieve filtered and sorted ideas."""
        return self.repository.filter_ideas(
            search=search,
            status=status,
            content_type=content_type,
            priority=priority,
            sort_by=sort_by,
            sort_order=sort_order,
        )

    def get_idea_by_id(self, idea_id: str) -> Dict[str, Any]:
        """Retrieve a specific idea by ID or raise NotFoundError."""
        idea = self.repository.get_by_id(idea_id)
        if not idea:
            raise NotFoundError(f"Idea with ID '{idea_id}' was not found")
        return idea

    def create_idea(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate, construct, and persist a new idea."""
        clean_data = validate_idea_data(data, is_update=False)
        idea = Idea.from_dict(clean_data)
        return self.repository.insert(idea.to_dict())

    def update_idea(self, idea_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and update an existing idea."""
        # Ensure exists first
        existing = self.repository.get_by_id(idea_id)
        if not existing:
            raise NotFoundError(f"Idea with ID '{idea_id}' was not found")

        clean_data = validate_idea_data(data, is_update=True)
        clean_data["updated_at"] = datetime.now(timezone.utc).isoformat()

        updated = self.repository.update(idea_id, clean_data)
        if not updated:
            raise NotFoundError(f"Idea with ID '{idea_id}' could not be updated")
        return updated

    def delete_idea(self, idea_id: str) -> bool:
        """Delete an idea by ID."""
        existing = self.repository.get_by_id(idea_id)
        if not existing:
            raise NotFoundError(f"Idea with ID '{idea_id}' was not found")
        return self.repository.delete(idea_id)

    def get_stats(self) -> Dict[str, Any]:
        """Retrieve aggregated ideas metrics."""
        return self.repository.get_stats()

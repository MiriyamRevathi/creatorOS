"""Tests for IdeasService."""
import tempfile
import pytest
from backend.repositories.ideas_repository import IdeasRepository
from backend.services.ideas_service import IdeasService, NotFoundError
from backend.validators.idea_validator import ValidationError


@pytest.fixture
def service():
    with tempfile.TemporaryDirectory() as tmp_dir:
        repo = IdeasRepository(file_path=f"{tmp_dir}/ideas.json")
        yield IdeasService(repository=repo)


def test_service_create_idea_validation(service):
    """Test idea creation with validation rules."""
    # Empty title should fail
    with pytest.raises(ValidationError) as exc_info:
        service.create_idea({"title": ""})
    assert "Idea title is required" in str(exc_info.value)

    # Invalid content type should fail
    with pytest.raises(ValidationError) as exc_info:
        service.create_idea({"title": "Valid Title", "content_type": "InvalidFormat"})
    assert "Invalid content type" in str(exc_info.value)

    # Invalid priority should fail
    with pytest.raises(ValidationError) as exc_info:
        service.create_idea({"title": "Valid Title", "priority": "SuperMega"})
    assert "Invalid priority" in str(exc_info.value)

    # Invalid status should fail
    with pytest.raises(ValidationError) as exc_info:
        service.create_idea({"title": "Valid Title", "status": "FinishedForever"})
    assert "Invalid status" in str(exc_info.value)

    # Valid idea creation succeeds
    valid_idea = service.create_idea({
        "title": "A Brand New Idea",
        "description": "Some context",
        "content_type": "Video",
        "priority": "High",
        "status": "Backlog",
        "tags": ["growth", "video"],
        "target_date": "2026-12-01",
    })
    assert valid_idea["id"].startswith("idea-")
    assert valid_idea["title"] == "A Brand New Idea"


def test_service_update_nonexistent_idea(service):
    """Updating a non-existent idea raises NotFoundError."""
    with pytest.raises(NotFoundError):
        service.update_idea("non-existent-id", {"title": "Update"})


def test_service_delete_idea(service):
    """Deleting an existing idea works, second attempt raises NotFoundError."""
    created = service.create_idea({"title": "To Be Deleted"})
    assert service.delete_idea(created["id"]) is True

    with pytest.raises(NotFoundError):
        service.delete_idea(created["id"])

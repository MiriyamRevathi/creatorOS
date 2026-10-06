"""Tests for ContentService and Idea Conversion."""
import tempfile
import pytest
from backend.repositories.content_repository import ContentRepository
from backend.repositories.ideas_repository import IdeasRepository
from backend.services.content_service import ContentService
from backend.services.ideas_service import NotFoundError
from backend.validators.idea_validator import ValidationError


@pytest.fixture
def service():
    with tempfile.TemporaryDirectory() as tmp_dir:
        content_repo = ContentRepository(file_path=f"{tmp_dir}/content.json")
        ideas_repo = IdeasRepository(file_path=f"{tmp_dir}/ideas.json")
        yield ContentService(content_repo=content_repo, ideas_repo=ideas_repo)


def test_create_content_validation(service):
    """Validate content creation with strict rules."""
    # Empty title raises ValidationError
    with pytest.raises(ValidationError) as exc:
        service.create_content({"title": ""})
    assert "Content title is required" in str(exc.value)

    # Invalid platform raises ValidationError
    with pytest.raises(ValidationError) as exc:
        service.create_content({"title": "Valid Title", "platform": "NonExistentPlatform"})
    assert "Invalid platform" in str(exc.value)

    # Successful creation
    created = service.create_content({
        "title": "A Brand New Reel",
        "content_type": "Reel",
        "platform": "Instagram",
        "status": "Draft",
        "body": "Hook line here! This is test content body.",
        "tags": ["growth", "instagram"],
    })
    assert created["id"].startswith("content-")
    assert created["metadata"]["word_count"] > 0
    assert created["metadata"]["character_count"] > 0


def test_convert_idea_to_content(service):
    """Test converting an Idea into a Content Item in Draft status."""
    # 'idea-101' is seeded in ideas_repo
    converted = service.convert_idea_to_content("idea-101")
    assert converted is not None
    assert converted["id"].startswith("content-")
    assert converted["source_idea_id"] == "idea-101"
    assert converted["status"] == "Draft"
    assert "10 Architecture Patterns" in converted["title"]

    # Verify that the Idea in ideas_repo was updated with converted_to_content_id and In Progress status
    updated_idea = service.ideas_repo.get_by_id("idea-101")
    assert updated_idea["converted_to_content_id"] == converted["id"]
    assert updated_idea["status"] == "In Progress"


def test_convert_nonexistent_idea(service):
    """Converting non-existent idea raises NotFoundError."""
    with pytest.raises(NotFoundError):
        service.convert_idea_to_content("idea-does-not-exist")


def test_update_content_metadata_recalculation(service):
    """Updating body recalculates metadata words and characters."""
    item = service.create_content({"title": "Metadata Test", "body": "Two words"})
    assert item["metadata"]["word_count"] == 2

    updated = service.update_content(item["id"], {"body": "One two three four five six words now."})
    assert updated["metadata"]["word_count"] == 8

"""Tests for IdeasRepository."""
import os
import tempfile
import pytest
from backend.repositories.ideas_repository import IdeasRepository


@pytest.fixture
def temp_ideas_repo():
    with tempfile.TemporaryDirectory() as tmp_dir:
        file_path = os.path.join(tmp_dir, "test_ideas.json")
        repo = IdeasRepository(file_path=file_path)
        yield repo


def test_repository_initialization_with_seed(temp_ideas_repo):
    """Test repository creates file with default seed data if absent."""
    items = temp_ideas_repo.get_all()
    assert len(items) > 0
    assert any(i["id"] == "idea-101" for i in items)


def test_repository_crud_operations(temp_ideas_repo):
    """Test insert, get_by_id, update, delete operations."""
    new_idea = {
        "id": "idea-999",
        "title": "Unit Test Idea",
        "description": "Testing CRUD",
        "content_type": "Video",
        "tags": ["testing", "qa"],
        "priority": "High",
        "status": "Backlog",
        "target_date": "2026-11-01",
        "converted_to_content_id": None,
        "created_at": "2026-10-06T12:00:00Z",
        "updated_at": "2026-10-06T12:00:00Z",
    }
    # Insert
    inserted = temp_ideas_repo.insert(new_idea)
    assert inserted["id"] == "idea-999"

    # Get by ID
    fetched = temp_ideas_repo.get_by_id("idea-999")
    assert fetched is not None
    assert fetched["title"] == "Unit Test Idea"

    # Update
    updated = temp_ideas_repo.update("idea-999", {"title": "Updated Test Idea", "status": "In Progress"})
    assert updated["title"] == "Updated Test Idea"
    assert updated["status"] == "In Progress"

    # Delete
    deleted = temp_ideas_repo.delete("idea-999")
    assert deleted is True
    assert temp_ideas_repo.get_by_id("idea-999") is None


def test_repository_filtering_and_search(temp_ideas_repo):
    """Test filtering by search query, status, content type, and priority."""
    # Search
    results = temp_ideas_repo.filter_ideas(search="architecture")
    assert len(results) >= 1
    assert "architecture" in results[0]["title"].lower() or "architecture" in str(results[0]["tags"])

    # Filter by status
    results = temp_ideas_repo.filter_ideas(status="Planned")
    assert all(r["status"] == "Planned" for r in results)

    # Filter by content_type
    results = temp_ideas_repo.filter_ideas(content_type="Reel")
    assert all(r["content_type"] == "Reel" for r in results)

    # Filter by priority
    results = temp_ideas_repo.filter_ideas(priority="High")
    assert all(r["priority"] == "High" for r in results)


def test_repository_stats(temp_ideas_repo):
    """Test aggregate statistics computation."""
    stats = temp_ideas_repo.get_stats()
    assert stats["total"] > 0
    assert "by_status" in stats
    assert "by_content_type" in stats
    assert "by_priority" in stats


def test_repository_corruption_recovery():
    """Test repository recovers safely from a corrupt JSON file."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        file_path = os.path.join(tmp_dir, "corrupt_ideas.json")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write("{ INVALID JSON CONTENT !!! ")

        repo = IdeasRepository(file_path=file_path)
        items = repo.get_all()
        # Should gracefully return seed data and create a .bak file
        assert len(items) > 0

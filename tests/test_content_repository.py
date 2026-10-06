"""Tests for ContentRepository."""
import os
import tempfile
import pytest
from backend.repositories.content_repository import ContentRepository


@pytest.fixture
def temp_content_repo():
    with tempfile.TemporaryDirectory() as tmp_dir:
        file_path = os.path.join(tmp_dir, "test_content.json")
        repo = ContentRepository(file_path=file_path)
        yield repo


def test_repository_initialization_with_seed(temp_content_repo):
    """Test repository populates seed content items if file absent."""
    items = temp_content_repo.get_all()
    assert len(items) > 0
    assert any(i["id"] == "content-201" for i in items)


def test_content_crud(temp_content_repo):
    """Test insert, get_by_id, update, delete for content items."""
    new_item = {
        "id": "content-test-1",
        "title": "CRUD Content Test",
        "content_type": "Video",
        "platform": "YouTube",
        "status": "Draft",
        "description": "Short overview",
        "body": "This is a test script body with exactly ten words in it.",
        "tags": ["test", "crud"],
        "metadata": {
            "character_count": 55,
            "word_count": 10,
            "reading_time_minutes": 1,
            "estimated_duration_seconds": 5,
        },
        "created_at": "2026-10-06T12:00:00Z",
        "updated_at": "2026-10-06T12:00:00Z",
    }
    inserted = temp_content_repo.insert(new_item)
    assert inserted["id"] == "content-test-1"

    fetched = temp_content_repo.get_by_id("content-test-1")
    assert fetched is not None
    assert fetched["title"] == "CRUD Content Test"

    updated = temp_content_repo.update("content-test-1", {"status": "Published"})
    assert updated["status"] == "Published"

    deleted = temp_content_repo.delete("content-test-1")
    assert deleted is True
    assert temp_content_repo.get_by_id("content-test-1") is None


def test_content_filtering(temp_content_repo):
    """Test filtering by platform, status, and search."""
    # Filter by platform
    yt_items = temp_content_repo.filter_content(platform="YouTube")
    assert all(i["platform"] == "YouTube" for i in yt_items)

    # Filter by status
    draft_items = temp_content_repo.filter_content(status="Draft")
    assert all(i["status"] == "Draft" for i in draft_items)

    # Search
    search_res = temp_content_repo.filter_content(search="Premiere")
    assert len(search_res) >= 1
    assert "premiere" in search_res[0]["body"].lower() or "premiere" in str(search_res[0]["tags"])


def test_content_stats(temp_content_repo):
    """Test stats aggregation for content items."""
    stats = temp_content_repo.get_stats()
    assert stats["total"] > 0
    assert "draft_count" in stats
    assert "published_count" in stats
    assert "total_words_written" in stats
    assert stats["total_words_written"] > 0

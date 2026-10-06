"""API Integration tests for Ideas endpoints."""
import os
import tempfile
import pytest
from backend.app import create_app
from backend.repositories.ideas_repository import IdeasRepository
from backend.services.ideas_service import IdeasService


@pytest.fixture
def client():
    with tempfile.TemporaryDirectory() as tmp_dir:
        repo = IdeasRepository(file_path=os.path.join(tmp_dir, "api_ideas.json"))
        service = IdeasService(repository=repo)
        app = create_app({"TESTING": True}, ideas_service=service)

        with app.test_client() as test_client:
            yield test_client


def test_api_list_ideas(client):
    """GET /api/ideas returns list."""
    response = client.get("/api/ideas")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    assert isinstance(json_data["data"], list)
    assert len(json_data["data"]) > 0


def test_api_create_and_get_idea(client):
    """POST /api/ideas and GET /api/ideas/<id>."""
    payload = {
        "title": "API Test Idea",
        "description": "Created via API test",
        "content_type": "Podcast",
        "priority": "Urgent",
        "status": "Planned",
        "tags": ["audio", "creator"],
        "target_date": "2026-11-15",
    }
    create_res = client.post("/api/ideas", json=payload)
    assert create_res.status_code == 201
    created_data = create_res.get_json()["data"]
    idea_id = created_data["id"]
    assert created_data["title"] == "API Test Idea"

    # Get by ID
    get_res = client.get(f"/api/ideas/{idea_id}")
    assert get_res.status_code == 200
    fetched_data = get_res.get_json()["data"]
    assert fetched_data["id"] == idea_id
    assert fetched_data["priority"] == "Urgent"


def test_api_validation_error_handling(client):
    """POST /api/ideas with invalid payload returns 400 with helpful error."""
    # Missing title
    res = client.post("/api/ideas", json={"description": "No title here"})
    assert res.status_code == 400
    data = res.get_json()
    assert data["success"] is False
    assert "field" in data["error"]
    assert data["error"]["field"] == "title"


def test_api_update_and_delete(client):
    """PUT and DELETE endpoints work correctly."""
    # Create
    create_res = client.post("/api/ideas", json={"title": "To Modify"})
    idea_id = create_res.get_json()["data"]["id"]

    # Update
    put_res = client.put(f"/api/ideas/{idea_id}", json={"title": "Modified Title", "status": "In Progress"})
    assert put_res.status_code == 200
    assert put_res.get_json()["data"]["title"] == "Modified Title"

    # Delete
    del_res = client.delete(f"/api/ideas/{idea_id}")
    assert del_res.status_code == 200

    # Verify not found
    get_res = client.get(f"/api/ideas/{idea_id}")
    assert get_res.status_code == 404

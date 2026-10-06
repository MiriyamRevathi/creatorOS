"""API tests for Content Studio & Content Library endpoints."""
import os
import tempfile
import pytest
from backend.app import create_app
from backend.repositories.content_repository import ContentRepository
from backend.repositories.ideas_repository import IdeasRepository
from backend.services.content_service import ContentService


@pytest.fixture
def client():
    with tempfile.TemporaryDirectory() as tmp_dir:
        content_repo = ContentRepository(file_path=os.path.join(tmp_dir, "api_content.json"))
        ideas_repo = IdeasRepository(file_path=os.path.join(tmp_dir, "api_ideas.json"))
        service = ContentService(content_repo=content_repo, ideas_repo=ideas_repo)
        app = create_app({"TESTING": True}, content_service=service)

        with app.test_client() as test_client:
            yield test_client


def test_api_list_content(client):
    """GET /api/content returns list of content."""
    res = client.get("/api/content")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert len(data["data"]) > 0


def test_api_create_and_get_content(client):
    """POST /api/content and GET /api/content/<id>."""
    payload = {
        "title": "API Content Item",
        "content_type": "Video",
        "platform": "YouTube",
        "status": "Draft",
        "body": "Intro hook: welcome to this lesson!\nMain concept.",
        "tags": ["testing", "api"],
    }
    create_res = client.post("/api/content", json=payload)
    assert create_res.status_code == 201
    item = create_res.get_json()["data"]
    item_id = item["id"]

    get_res = client.get(f"/api/content/{item_id}")
    assert get_res.status_code == 200
    assert get_res.get_json()["data"]["title"] == "API Content Item"


def test_api_convert_idea_endpoint(client):
    """POST /api/content/convert-idea/<idea_id> converts idea into draft."""
    convert_res = client.post("/api/content/convert-idea/idea-101")
    assert convert_res.status_code == 201
    data = convert_res.get_json()["data"]
    assert data["source_idea_id"] == "idea-101"
    assert data["status"] == "Draft"


def test_api_demo_assist_endpoint(client):
    """POST /api/content/demo-assist returns deterministic local suggestions."""
    payload = {
        "type": "hooks",
        "topic": "Solo Creator Business",
        "content_type": "Video",
    }
    res = client.post("/api/content/demo-assist", json=payload)
    assert res.status_code == 200
    data = res.get_json()["data"]
    assert data["type"] == "hooks"
    assert len(data["suggestions"]) == 3
    assert all("text" in s for s in data["suggestions"])


def test_api_update_and_delete_content(client):
    """PUT /api/content/<id> and DELETE /api/content/<id>."""
    create_res = client.post("/api/content", json={"title": "To Delete"})
    item_id = create_res.get_json()["data"]["id"]

    # Update
    put_res = client.put(f"/api/content/{item_id}", json={"title": "Updated Studio Item", "status": "Published"})
    assert put_res.status_code == 200
    assert put_res.get_json()["data"]["title"] == "Updated Studio Item"
    assert put_res.get_json()["data"]["status"] == "Published"

    # Delete
    del_res = client.delete(f"/api/content/{item_id}")
    assert del_res.status_code == 200

    # Verify not found
    get_res = client.get(f"/api/content/{item_id}")
    assert get_res.status_code == 404

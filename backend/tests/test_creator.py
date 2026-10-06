import pytest
import os
import shutil
import tempfile
from repositories.creator_repository import CreatorRepository
from services.creator.creator_service import CreatorService

@pytest.fixture
def temp_creator_service():
    temp_dir = tempfile.mkdtemp()
    creator_dir = os.path.join(temp_dir, "creators")
    creator_repo = CreatorRepository(data_dir=creator_dir)
    service = CreatorService(creator_repo=creator_repo)
    yield service, creator_repo
    shutil.rmtree(temp_dir)

def test_creator_profile_creation_and_update(temp_creator_service):
    service, _ = temp_creator_service
    user_id = "user_123"
    profile = service.get_profile_by_user_id(user_id)
    assert profile["user_id"] == user_id

    updated = service.update_profile(user_id, {
        "display_name": "Creative Director",
        "bio": "Building cool stuff",
        "niche": "Tech & Design"
    })
    assert updated["display_name"] == "Creative Director"
    assert updated["niche"] == "Tech & Design"

def test_portfolio_management(temp_creator_service):
    service, _ = temp_creator_service
    user_id = "user_456"
    item_res = service.add_portfolio_item(user_id, {
        "title": "My First Vlog",
        "description": "A day in the life",
        "url": "https://youtube.com/watch?v=demo"
    })
    assert len(item_res["portfolio_items"]) == 1
    assert item_res["portfolio_items"][0]["title"] == "My First Vlog"

    item_id = item_res["portfolio_items"][0]["id"]
    removed_res = service.remove_portfolio_item(user_id, item_id)
    assert len(removed_res["portfolio_items"]) == 0

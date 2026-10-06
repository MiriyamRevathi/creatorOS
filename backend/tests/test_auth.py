import pytest
import os
import shutil
import tempfile
from repositories.user_repository import UserRepository
from repositories.creator_repository import CreatorRepository
from repositories.notification_repository import NotificationRepository
from services.auth.auth_service import AuthService

@pytest.fixture
def temp_dirs():
    temp_dir = tempfile.mkdtemp()
    user_dir = os.path.join(temp_dir, "users")
    creator_dir = os.path.join(temp_dir, "creators")
    notif_dir = os.path.join(temp_dir, "notifications")

    user_repo = UserRepository(data_dir=user_dir)
    creator_repo = CreatorRepository(data_dir=creator_dir)
    notif_repo = NotificationRepository(data_dir=notif_dir)

    auth_service = AuthService(user_repo=user_repo, creator_repo=creator_repo, notif_repo=notif_repo)
    yield auth_service, user_repo, creator_repo, notif_repo
    shutil.rmtree(temp_dir)

def test_user_registration(temp_dirs):
    auth_service, user_repo, creator_repo, _ = temp_dirs
    res = auth_service.register("creator@example.com", "password123", "Jane Doe", "janedoe")
    assert res["user"]["email"] == "creator@example.com"
    assert res["user"]["full_name"] == "Jane Doe"
    assert res["token"] is not None
    assert res["creator"]["user_id"] == res["user"]["id"]

def test_duplicate_registration_fails(temp_dirs):
    auth_service, _, _, _ = temp_dirs
    auth_service.register("creator@example.com", "password123", "Jane Doe", "janedoe")
    with pytest.raises(ValueError, match="already exists"):
        auth_service.register("creator@example.com", "password123", "Jane Doe", "janedoe")

def test_user_login(temp_dirs):
    auth_service, _, _, _ = temp_dirs
    auth_service.register("creator@example.com", "password123", "Jane Doe", "janedoe")
    login_res = auth_service.login("creator@example.com", "password123")
    assert login_res["user"]["email"] == "creator@example.com"
    assert login_res["token"] is not None

def test_invalid_login(temp_dirs):
    auth_service, _, _, _ = temp_dirs
    auth_service.register("creator@example.com", "password123", "Jane Doe", "janedoe")
    with pytest.raises(ValueError, match="Invalid email or password"):
        auth_service.login("creator@example.com", "wrongpassword")

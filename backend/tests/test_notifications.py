import pytest
import os
import shutil
import tempfile
from repositories.notification_repository import NotificationRepository
from services.notifications.notification_service import NotificationService

@pytest.fixture
def temp_notif_service():
    temp_dir = tempfile.mkdtemp()
    notif_dir = os.path.join(temp_dir, "notifications")
    repo = NotificationRepository(data_dir=notif_dir)
    service = NotificationService(notification_repo=repo)
    yield service, repo
    shutil.rmtree(temp_dir)

def test_notification_flow(temp_notif_service):
    service, _ = temp_notif_service
    user_id = "user_789"
    notif = service.create_notification(user_id, "New Subscriber!", "You gained a new follower", "info")
    assert notif["user_id"] == user_id
    assert notif["is_read"] is False

    user_notifs = service.get_user_notifications(user_id)
    assert len(user_notifs) == 1

    service.mark_read(notif["id"], user_id)
    updated_notifs = service.get_user_notifications(user_id)
    assert updated_notifs[0]["is_read"] is True

    service.delete_notification(notif["id"], user_id)
    final_notifs = service.get_user_notifications(user_id)
    assert len(final_notifs) == 0

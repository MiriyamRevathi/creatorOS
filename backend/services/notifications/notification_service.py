from repositories.notification_repository import NotificationRepository
from models.notification import Notification

class NotificationService:
    def __init__(self, notification_repo=None):
        self.notification_repo = notification_repo or NotificationRepository()

    def get_user_notifications(self, user_id: str):
        notifications = self.notification_repo.find_by_user_id(user_id)
        return [n.to_dict() for n in notifications]

    def create_notification(self, user_id: str, title: str, message: str, category: str = "info", link: str = ""):
        notif = Notification(user_id=user_id, title=title, message=message, category=category, link=link)
        saved = self.notification_repo.save(notif)
        return saved.to_dict()

    def mark_read(self, notification_id: str, user_id: str):
        success = self.notification_repo.mark_as_read(notification_id, user_id)
        return {"success": success}

    def mark_all_read(self, user_id: str):
        success = self.notification_repo.mark_all_as_read(user_id)
        return {"success": success}

    def delete_notification(self, notification_id: str, user_id: str):
        success = self.notification_repo.delete(notification_id, user_id)
        return {"success": success}

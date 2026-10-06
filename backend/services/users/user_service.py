from repositories.user_repository import UserRepository
from models.user import User

class UserService:
    def __init__(self, user_repo=None):
        self.user_repo = user_repo or UserRepository()

    def get_user(self, user_id: str):
        user = self.user_repo.find_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        return user.to_dict()

    def update_account_settings(self, user_id: str, data: dict):
        user = self.user_repo.find_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        if "full_name" in data:
            user.full_name = data["full_name"]
        if "username" in data:
            user.username = data["username"]

        saved = self.user_repo.save(user)
        return saved.to_dict()

    def change_password(self, user_id: str, current_password: str, new_password: str):
        user = self.user_repo.find_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        if not user.check_password(current_password):
            raise ValueError("Current password is incorrect")

        if not new_password or len(new_password) < 6:
            raise ValueError("New password must be at least 6 characters long")

        user.password_hash = User.hash_password(new_password)
        self.user_repo.save(user)
        return {"message": "Password changed successfully"}

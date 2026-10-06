import re
import jwt
import datetime
from models.user import User
from models.creator import Creator
from repositories.user_repository import UserRepository
from repositories.creator_repository import CreatorRepository
from repositories.notification_repository import NotificationRepository
from models.notification import Notification

SECRET_KEY = "creatorOS_secret_key_demo_jwt_token_key"

class AuthService:
    def __init__(self, user_repo=None, creator_repo=None, notif_repo=None):
        self.user_repo = user_repo or UserRepository()
        self.creator_repo = creator_repo or CreatorRepository()
        self.notif_repo = notif_repo or NotificationRepository()

    def validate_email(self, email: str) -> bool:
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return bool(re.match(pattern, email))

    def register(self, email: str, password: str, full_name: str = "", username: str = ""):
        if not email or not self.validate_email(email):
            raise ValueError("Invalid email format")
        if not password or len(password) < 6:
            raise ValueError("Password must be at least 6 characters long")
        
        existing = self.user_repo.find_by_email(email)
        if existing:
            raise ValueError("User with this email already exists")

        pwd_hash = User.hash_password(password)
        user = User(
            email=email,
            password_hash=pwd_hash,
            full_name=full_name,
            username=username or email.split('@')[0],
            verified=False
        )
        saved_user = self.user_repo.save(user)

        creator = Creator(
            user_id=saved_user.id,
            display_name=saved_user.full_name or saved_user.username,
            bio="Welcome to CreatorOS! Update your bio here.",
            niche="General Content Creator"
        )
        self.creator_repo.save(creator)

        welcome_notif = Notification(
            user_id=saved_user.id,
            title="Welcome to CreatorOS! 🎉",
            message="Your creator workspace is ready. Complete your profile setup to unlock full potential.",
            category="info"
        )
        self.notif_repo.save(welcome_notif)

        token = self.generate_token(saved_user.id)
        return {
            "user": saved_user.to_dict(),
            "creator": creator.to_dict(),
            "token": token
        }

    def login(self, email: str, password: str):
        if not email or not password:
            raise ValueError("Email and password are required")
        
        user = self.user_repo.find_by_email(email)
        if not user or not user.check_password(password):
            raise ValueError("Invalid email or password")

        creator = self.creator_repo.find_by_user_id(user.id)
        token = self.generate_token(user.id)

        return {
            "user": user.to_dict(),
            "creator": creator.to_dict() if creator else None,
            "token": token
        }

    def generate_token(self, user_id: str) -> str:
        payload = {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            user = self.user_repo.find_by_id(user_id)
            return user
        except Exception:
            return None

    def request_password_reset(self, email: str):
        user = self.user_repo.find_by_email(email)
        if not user:
            return {"message": "If an account exists, a reset link has been sent."}
        reset_token = self.generate_token(user.id)
        return {
            "message": "Reset instructions generated.",
            "reset_token": reset_token
        }

    def reset_password(self, token: str, new_password: str):
        if not new_password or len(new_password) < 6:
            raise ValueError("New password must be at least 6 characters long")
        user = self.verify_token(token)
        if not user:
            raise ValueError("Invalid or expired reset token")
        
        user.password_hash = User.hash_password(new_password)
        self.user_repo.save(user)
        return {"message": "Password reset successfully"}

    def verify_account(self, token: str):
        user = self.verify_token(token)
        if not user:
            raise ValueError("Invalid verification token")
        user.verified = True
        self.user_repo.save(user)
        return {"message": "Account verified successfully", "user": user.to_dict()}

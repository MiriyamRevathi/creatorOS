import hashlib
import uuid
from datetime import datetime

class User:
    def __init__(self, email, password_hash, full_name="", username="", id=None, verified=False, created_at=None, roles=None):
        self.id = id or str(uuid.uuid4())
        self.email = email.lower().strip()
        self.password_hash = password_hash
        self.full_name = full_name
        self.username = username or email.split('@')[0]
        self.verified = verified
        self.created_at = created_at or datetime.utcnow().isoformat()
        self.roles = roles or ["creator"]

    @staticmethod
    def hash_password(password: str) -> str:
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    def check_password(self, password: str) -> bool:
        return self.password_hash == self.hash_password(password)

    def to_dict(self, include_sensitive=False):
        data = {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "username": self.username,
            "verified": self.verified,
            "created_at": self.created_at,
            "roles": self.roles
        }
        if include_sensitive:
            data["password_hash"] = self.password_hash
        return data

    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data.get("id"),
            email=data.get("email", ""),
            password_hash=data.get("password_hash", ""),
            full_name=data.get("full_name", ""),
            username=data.get("username", ""),
            verified=data.get("verified", False),
            created_at=data.get("created_at"),
            roles=data.get("roles", ["creator"])
        )

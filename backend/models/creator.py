import uuid
from datetime import datetime

class Creator:
    def __init__(self, user_id, display_name="", bio="", niche="General", avatar_url="", banner_url="", 
                 social_links=None, portfolio_items=None, preferences=None, stats=None, id=None, created_at=None):
        self.id = id or str(uuid.uuid4())
        self.user_id = user_id
        self.display_name = display_name
        self.bio = bio
        self.niche = niche
        self.avatar_url = avatar_url or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        self.banner_url = banner_url or "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
        self.social_links = social_links or {
            "youtube": "",
            "instagram": "",
            "twitter": "",
            "linkedin": "",
            "tiktok": "",
            "website": ""
        }
        self.portfolio_items = portfolio_items or []
        self.preferences = preferences or {
            "content_focus": ["Video", "Writing"],
            "target_audience": "Tech & Creative Enthusiasts",
            "monetization_goals": ["Brand Deals", "Digital Products"],
            "currency": "USD"
        }
        self.stats = stats or {
            "total_followers": 0,
            "monthly_reach": 0,
            "engagement_rate": "0.0%",
            "active_campaigns": 0
        }
        self.created_at = created_at or datetime.utcnow().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "display_name": self.display_name,
            "bio": self.bio,
            "niche": self.niche,
            "avatar_url": self.avatar_url,
            "banner_url": self.banner_url,
            "social_links": self.social_links,
            "portfolio_items": self.portfolio_items,
            "preferences": self.preferences,
            "stats": self.stats,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data.get("id"),
            user_id=data.get("user_id"),
            display_name=data.get("display_name", ""),
            bio=data.get("bio", ""),
            niche=data.get("niche", "General"),
            avatar_url=data.get("avatar_url"),
            banner_url=data.get("banner_url"),
            social_links=data.get("social_links"),
            portfolio_items=data.get("portfolio_items"),
            preferences=data.get("preferences"),
            stats=data.get("stats"),
            created_at=data.get("created_at")
        )

from repositories.creator_repository import CreatorRepository
from models.creator import Creator

class CreatorService:
    def __init__(self, creator_repo=None):
        self.creator_repo = creator_repo or CreatorRepository()

    def get_profile_by_user_id(self, user_id: str):
        creator = self.creator_repo.find_by_user_id(user_id)
        if not creator:
            # Create a default creator profile if one does not exist
            creator = Creator(user_id=user_id, display_name="Creator", niche="General")
            self.creator_repo.save(creator)
        return creator.to_dict()

    def update_profile(self, user_id: str, profile_data: dict):
        creator = self.creator_repo.find_by_user_id(user_id)
        if not creator:
            creator = Creator(user_id=user_id)

        if "display_name" in profile_data:
            creator.display_name = profile_data["display_name"]
        if "bio" in profile_data:
            creator.bio = profile_data["bio"]
        if "niche" in profile_data:
            creator.niche = profile_data["niche"]
        if "avatar_url" in profile_data:
            creator.avatar_url = profile_data["avatar_url"]
        if "banner_url" in profile_data:
            creator.banner_url = profile_data["banner_url"]
        if "social_links" in profile_data:
            creator.social_links.update(profile_data["social_links"])

        saved = self.creator_repo.save(creator)
        return saved.to_dict()

    def update_preferences(self, user_id: str, preferences: dict):
        creator = self.creator_repo.find_by_user_id(user_id)
        if not creator:
            creator = Creator(user_id=user_id)
        
        creator.preferences.update(preferences)
        saved = self.creator_repo.save(creator)
        return saved.to_dict()

    def add_portfolio_item(self, user_id: str, item: dict):
        creator = self.creator_repo.find_by_user_id(user_id)
        if not creator:
            creator = Creator(user_id=user_id)

        if not item.get("title"):
            raise ValueError("Portfolio item title is required")

        portfolio_item = {
            "id": item.get("id") or str(hash(item.get("title") + str(len(creator.portfolio_items)))),
            "title": item.get("title"),
            "description": item.get("description", ""),
            "url": item.get("url", ""),
            "thumbnail": item.get("thumbnail", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"),
            "category": item.get("category", "Video")
        }
        creator.portfolio_items.append(portfolio_item)
        saved = self.creator_repo.save(creator)
        return saved.to_dict()

    def remove_portfolio_item(self, user_id: str, item_id: str):
        creator = self.creator_repo.find_by_user_id(user_id)
        if not creator:
            raise ValueError("Creator profile not found")

        creator.portfolio_items = [item for item in creator.portfolio_items if str(item.get("id")) != str(item_id)]
        saved = self.creator_repo.save(creator)
        return saved.to_dict()

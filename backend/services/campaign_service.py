"""
Campaign Service for CreatorOS Brand Marketplace
"""
from typing import List, Optional, Dict, Any
import uuid
import time
from backend.repositories.campaign_repository import CampaignRepository
from backend.repositories.brand_repository import BrandRepository
from backend.models.campaign import Campaign

class CampaignService:
    def __init__(
        self,
        campaign_repo: Optional[CampaignRepository] = None,
        brand_repo: Optional[BrandRepository] = None
    ):
        self.campaign_repo = campaign_repo or CampaignRepository()
        self.brand_repo = brand_repo or BrandRepository()

    def list_campaigns(
        self,
        category: Optional[str] = None,
        platform: Optional[str] = None,
        compensation_type: Optional[str] = None,
        min_budget: Optional[float] = None,
        max_budget: Optional[float] = None,
        status: Optional[str] = None,
        brand_id: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        campaigns = self.campaign_repo.get_all(
            category=category,
            platform=platform,
            compensation_type=compensation_type,
            min_budget=min_budget,
            max_budget=max_budget,
            status=status,
            brand_id=brand_id,
            search=search
        )
        return [c.to_dict() for c in campaigns]

    def get_campaign(self, campaign_id: str) -> Optional[Dict[str, Any]]:
        camp = self.campaign_repo.get_by_id(campaign_id)
        return camp.to_dict() if camp else None

    def create_campaign(self, data: Dict[str, Any]) -> Dict[str, Any]:
        if not data.get("title"):
            raise ValueError("Campaign title is required.")
        if not data.get("brandId"):
            raise ValueError("Brand ID is required.")
        if data.get("budget", 0) <= 0:
            raise ValueError("Campaign budget must be greater than 0.")

        brand = self.brand_repo.get_by_id(data["brandId"])
        brand_name = brand.name if brand else data.get("brandName", "Partner Brand")

        campaign_id = data.get("id") or f"camp-{uuid.uuid4().hex[:8]}"

        deliverables = data.get("deliverables", [])
        if not deliverables:
            deliverables = [
                {
                    "id": f"deliv-{uuid.uuid4().hex[:6]}",
                    "title": "Sponsored Content Video",
                    "format": "Video (1080p+)",
                    "quantity": 1,
                    "requiredSpecs": "Integrate product demo with custom trackable link."
                }
            ]

        campaign = Campaign(
            id=campaign_id,
            brandId=data["brandId"],
            brandName=brand_name,
            title=data["title"].strip(),
            tagline=data.get("tagline", "").strip(),
            category=data.get("category", "Tech & Gear"),
            compensationType=data.get("compensationType", "Paid Fixed Fee"),
            budget=float(data["budget"]),
            currency=data.get("currency", "USD"),
            deadline=data.get("deadline", "2026-11-30"),
            status=data.get("status", "Active"),
            platforms=data.get("platforms", ["YouTube", "Instagram"]),
            deliverables=deliverables,
            requirements=data.get("requirements", {
                "minFollowers": 10000,
                "niches": ["Tech", "Lifestyle"],
                "creatorLocation": ["Global"],
                "exclusivityDays": 14
            }),
            description=data.get("description", ""),
            perks=data.get("perks", ["Direct brand partnership access", "Performance bonuses"]),
            applicantCount=0,
            selectedCount=0,
            featured=data.get("featured", False)
        )
        saved = self.campaign_repo.save(campaign)
        return saved.to_dict()

    def update_campaign(self, campaign_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        updated = self.campaign_repo.update_campaign(campaign_id, updates)
        return updated.to_dict() if updated else None

    def update_status(self, campaign_id: str, new_status: str) -> Optional[Dict[str, Any]]:
        valid_statuses = ["Active", "In Review", "Draft", "Completed", "Paused"]
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid status '{new_status}'. Allowed: {valid_statuses}")
        return self.update_campaign(campaign_id, {"status": new_status})

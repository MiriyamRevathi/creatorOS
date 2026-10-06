"""
Campaign Repository for CreatorOS Brand Marketplace
"""
import os
from typing import List, Optional, Dict, Any
from backend.repositories.base_repository import BaseJSONRepository
from backend.models.campaign import Campaign

DEFAULT_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "campaigns"))
DEFAULT_DATA_FILE = os.path.join(DEFAULT_DATA_DIR, "campaigns.json")

class CampaignRepository(BaseJSONRepository):
    def __init__(self, file_path: str = DEFAULT_DATA_FILE):
        super().__init__(file_path)

    def get_all(
        self,
        category: Optional[str] = None,
        platform: Optional[str] = None,
        compensation_type: Optional[str] = None,
        min_budget: Optional[float] = None,
        max_budget: Optional[float] = None,
        status: Optional[str] = None,
        brand_id: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[Campaign]:
        raw_items = self.find_all()
        results = [Campaign.from_dict(item) for item in raw_items]

        if brand_id:
            results = [c for c in results if c.brandId == brand_id]

        if status and status.lower() != "all":
            results = [c for c in results if c.status.lower() == status.lower()]

        if category and category.lower() != "all":
            results = [c for c in results if c.category.lower() == category.lower()]

        if platform and platform.lower() != "all":
            results = [c for c in results if any(platform.lower() in p.lower() for p in c.platforms)]

        if compensation_type and compensation_type.lower() != "all":
            results = [c for c in results if compensation_type.lower() in c.compensationType.lower()]

        if min_budget is not None:
            results = [c for c in results if c.budget >= min_budget]

        if max_budget is not None:
            results = [c for c in results if c.budget <= max_budget]

        if search:
            q = search.lower().strip()
            results = [
                c for c in results
                if q in c.title.lower() or q in c.tagline.lower() or q in c.brandName.lower() or q in c.description.lower()
            ]

        return results

    def get_by_id(self, campaign_id: str) -> Optional[Campaign]:
        data = self.find_by_id(campaign_id)
        return Campaign.from_dict(data) if data else None

    def save(self, campaign: Campaign) -> Campaign:
        saved_dict = self.create(campaign.to_dict())
        return Campaign.from_dict(saved_dict)

    def update_campaign(self, campaign_id: str, updates: Dict[str, Any]) -> Optional[Campaign]:
        data = self.update(campaign_id, updates)
        return Campaign.from_dict(data) if data else None

    def increment_applicant_count(self, campaign_id: str) -> Optional[Campaign]:
        camp = self.get_by_id(campaign_id)
        if camp:
            new_count = camp.applicantCount + 1
            return self.update_campaign(campaign_id, {"applicantCount": new_count})
        return None

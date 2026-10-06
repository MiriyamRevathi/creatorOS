"""
Application Repository for CreatorOS Brand Marketplace
"""
import os
from typing import List, Optional, Dict, Any
from backend.repositories.base_repository import BaseJSONRepository
from backend.models.application import Application

DEFAULT_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "applications"))
DEFAULT_DATA_FILE = os.path.join(DEFAULT_DATA_DIR, "applications.json")

class ApplicationRepository(BaseJSONRepository):
    def __init__(self, file_path: str = DEFAULT_DATA_FILE):
        super().__init__(file_path)

    def get_all(
        self,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Application]:
        raw_items = self.find_all()
        results = [Application.from_dict(item) for item in raw_items]

        if campaign_id:
            results = [a for a in results if a.campaignId == campaign_id]
        if creator_id:
            results = [a for a in results if a.creatorId == creator_id]
        if brand_id:
            results = [a for a in results if a.brandId == brand_id]
        if status and status.lower() != "all":
            results = [a for a in results if a.status.lower() == status.lower()]

        return results

    def get_by_id(self, application_id: str) -> Optional[Application]:
        data = self.find_by_id(application_id)
        return Application.from_dict(data) if data else None

    def save(self, application: Application) -> Application:
        saved_dict = self.create(application.to_dict())
        return Application.from_dict(saved_dict)

    def update_application(self, application_id: str, updates: Dict[str, Any]) -> Optional[Application]:
        data = self.update(application_id, updates)
        return Application.from_dict(data) if data else None

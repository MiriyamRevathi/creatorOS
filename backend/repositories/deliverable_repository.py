"""
Deliverable Repository for CreatorOS Brand Marketplace
"""
import os
from typing import List, Optional, Dict, Any
from backend.repositories.base_repository import BaseJSONRepository
from backend.models.deliverable import Deliverable

DEFAULT_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "deliverables"))
DEFAULT_DATA_FILE = os.path.join(DEFAULT_DATA_DIR, "deliverables.json")

class DeliverableRepository(BaseJSONRepository):
    def __init__(self, file_path: str = DEFAULT_DATA_FILE):
        super().__init__(file_path)

    def get_all(
        self,
        contract_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Deliverable]:
        raw_items = self.find_all()
        results = [Deliverable.from_dict(item) for item in raw_items]

        if contract_id:
            results = [d for d in results if d.contractId == contract_id]
        if campaign_id:
            results = [d for d in results if d.campaignId == campaign_id]
        if creator_id:
            results = [d for d in results if d.creatorId == creator_id]
        if brand_id:
            results = [d for d in results if d.brandId == brand_id]
        if status and status.lower() != "all":
            results = [d for d in results if d.status.lower() == status.lower()]

        return results

    def get_by_id(self, deliverable_id: str) -> Optional[Deliverable]:
        data = self.find_by_id(deliverable_id)
        return Deliverable.from_dict(data) if data else None

    def save(self, deliverable: Deliverable) -> Deliverable:
        saved_dict = self.create(deliverable.to_dict())
        return Deliverable.from_dict(saved_dict)

    def update_deliverable(self, deliverable_id: str, updates: Dict[str, Any]) -> Optional[Deliverable]:
        data = self.update(deliverable_id, updates)
        return Deliverable.from_dict(data) if data else None

"""
Contract Repository for CreatorOS Brand Marketplace
"""
import os
from typing import List, Optional, Dict, Any
from backend.repositories.base_repository import BaseJSONRepository
from backend.models.contract import Contract

DEFAULT_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "contracts"))
DEFAULT_DATA_FILE = os.path.join(DEFAULT_DATA_DIR, "contracts.json")

class ContractRepository(BaseJSONRepository):
    def __init__(self, file_path: str = DEFAULT_DATA_FILE):
        super().__init__(file_path)

    def get_all(
        self,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Contract]:
        raw_items = self.find_all()
        results = [Contract.from_dict(item) for item in raw_items]

        if creator_id:
            results = [c for c in results if c.creatorId == creator_id]
        if brand_id:
            results = [c for c in results if c.brandId == brand_id]
        if campaign_id:
            results = [c for c in results if c.campaignId == campaign_id]
        if status and status.lower() != "all":
            results = [c for c in results if c.status.lower() == status.lower()]

        return results

    def get_by_id(self, contract_id: str) -> Optional[Contract]:
        data = self.find_by_id(contract_id)
        return Contract.from_dict(data) if data else None

    def save(self, contract: Contract) -> Contract:
        saved_dict = self.create(contract.to_dict())
        return Contract.from_dict(saved_dict)

    def update_contract(self, contract_id: str, updates: Dict[str, Any]) -> Optional[Contract]:
        data = self.update(contract_id, updates)
        return Contract.from_dict(data) if data else None

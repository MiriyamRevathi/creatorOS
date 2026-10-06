"""
Contract Service for CreatorOS Brand Marketplace
"""
from typing import List, Optional, Dict, Any
import time
from backend.repositories.contract_repository import ContractRepository
from backend.models.contract import Contract

class ContractService:
    def __init__(self, contract_repo: Optional[ContractRepository] = None):
        self.contract_repo = contract_repo or ContractRepository()

    def list_contracts(
        self,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        contracts = self.contract_repo.get_all(
            creator_id=creator_id,
            brand_id=brand_id,
            campaign_id=campaign_id,
            status=status
        )
        return [c.to_dict() for c in contracts]

    def get_contract(self, contract_id: str) -> Optional[Dict[str, Any]]:
        contract = self.contract_repo.get_by_id(contract_id)
        return contract.to_dict() if contract else None

    def sign_contract(self, contract_id: str, signer_role: str = "creator") -> Dict[str, Any]:
        contract = self.contract_repo.get_by_id(contract_id)
        if not contract:
            raise ValueError(f"Contract {contract_id} not found.")

        now_str = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        updates = {}

        if signer_role.lower() == "creator":
            updates["creatorSigned"] = True
            updates["creatorSignedAt"] = now_str
        elif signer_role.lower() == "brand":
            updates["brandSigned"] = True
            updates["brandSignedAt"] = now_str

        # If both sides have signed, transition to Active / In Progress
        if (updates.get("creatorSigned", contract.creatorSigned) and 
            updates.get("brandSigned", contract.brandSigned)):
            updates["status"] = "Active"

        updated = self.contract_repo.update_contract(contract_id, updates)
        return updated.to_dict()

    def update_escrow_status(self, contract_id: str, new_status: str) -> Dict[str, Any]:
        valid_statuses = ["Unfunded", "Funded in Escrow", "Released", "Refunded"]
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid escrow status '{new_status}'.")
        updated = self.contract_repo.update_contract(contract_id, {"escrowStatus": new_status})
        return updated.to_dict()

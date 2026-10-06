"""
Contract Controller for CreatorOS Brand Marketplace
"""
from typing import Dict, Any, Optional
from backend.services.contract_service import ContractService

class ContractController:
    def __init__(self, service: Optional[ContractService] = None):
        self.service = service or ContractService()

    def get_contracts(
        self,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        try:
            contracts = self.service.list_contracts(
                creator_id=creator_id,
                brand_id=brand_id,
                campaign_id=campaign_id,
                status=status
            )
            return {"success": True, "data": contracts, "total": len(contracts)}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def get_contract_by_id(self, contract_id: str) -> Dict[str, Any]:
        try:
            contract = self.service.get_contract(contract_id)
            if not contract:
                return {"success": False, "error": "Contract not found", "code": 404}
            return {"success": True, "data": contract}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def sign_contract(self, contract_id: str, signer_role: str = "creator") -> Dict[str, Any]:
        try:
            contract = self.service.sign_contract(contract_id, signer_role)
            return {"success": True, "data": contract, "message": "Contract digitally signed successfully"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def update_escrow(self, contract_id: str, escrow_status: str) -> Dict[str, Any]:
        try:
            contract = self.service.update_escrow_status(contract_id, escrow_status)
            return {"success": True, "data": contract, "message": f"Escrow status updated to {escrow_status}"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

"""
Contract Routes for CreatorOS Brand Marketplace
"""
from typing import Optional, Dict, Any
from backend.controllers.contract_controller import ContractController

contract_controller = ContractController()

def setup_contract_routes(app):
    try:
        from fastapi import APIRouter, Query, Body, HTTPException
        router = APIRouter(prefix="/api/contracts", tags=["Contracts"])

        @router.get("")
        async def list_contracts(
            creator_id: Optional[str] = Query(None),
            brand_id: Optional[str] = Query(None),
            campaign_id: Optional[str] = Query(None),
            status: Optional[str] = Query(None)
        ):
            return contract_controller.get_contracts(
                creator_id=creator_id,
                brand_id=brand_id,
                campaign_id=campaign_id,
                status=status
            )

        @router.get("/{contract_id}")
        async def get_contract(contract_id: str):
            res = contract_controller.get_contract_by_id(contract_id)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 404), detail=res.get("error"))
            return res

        @router.post("/{contract_id}/sign")
        async def sign_contract(contract_id: str, payload: Dict[str, Any] = Body(default={})):
            signer_role = payload.get("role", "creator")
            res = contract_controller.sign_contract(contract_id, signer_role)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.patch("/{contract_id}/escrow")
        async def update_escrow(contract_id: str, payload: Dict[str, Any] = Body(...)):
            escrow_status = payload.get("escrowStatus")
            if not escrow_status:
                raise HTTPException(status_code=400, detail="Missing 'escrowStatus'")
            res = contract_controller.update_escrow(contract_id, escrow_status)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        app.include_router(router)
    except ImportError:
        pass

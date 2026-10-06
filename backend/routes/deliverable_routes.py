"""
Deliverable Routes for CreatorOS Brand Marketplace
"""
from typing import Optional, Dict, Any
from backend.controllers.deliverable_controller import DeliverableController

deliverable_controller = DeliverableController()

def setup_deliverable_routes(app):
    try:
        from fastapi import APIRouter, Query, Body, HTTPException
        router = APIRouter(prefix="/api/deliverables", tags=["Deliverables"])

        @router.get("")
        async def list_deliverables(
            contract_id: Optional[str] = Query(None),
            campaign_id: Optional[str] = Query(None),
            creator_id: Optional[str] = Query(None),
            brand_id: Optional[str] = Query(None),
            status: Optional[str] = Query(None)
        ):
            return deliverable_controller.get_deliverables(
                contract_id=contract_id,
                campaign_id=campaign_id,
                creator_id=creator_id,
                brand_id=brand_id,
                status=status
            )

        @router.get("/{deliverable_id}")
        async def get_deliverable(deliverable_id: str):
            res = deliverable_controller.get_deliverable_by_id(deliverable_id)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 404), detail=res.get("error"))
            return res

        @router.post("/{deliverable_id}/submit")
        async def submit_draft(deliverable_id: str, payload: Dict[str, Any] = Body(...)):
            res = deliverable_controller.submit_draft(deliverable_id, payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.post("/{deliverable_id}/review")
        async def review_deliverable(deliverable_id: str, payload: Dict[str, Any] = Body(...)):
            res = deliverable_controller.review_deliverable(deliverable_id, payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        app.include_router(router)
    except ImportError:
        pass

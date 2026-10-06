"""
Campaign Routes for CreatorOS Brand Marketplace
"""
from typing import Optional, Dict, Any
from backend.controllers.campaign_controller import CampaignController

campaign_controller = CampaignController()

def setup_campaign_routes(app):
    try:
        from fastapi import APIRouter, Query, Body, HTTPException
        router = APIRouter(prefix="/api/campaigns", tags=["Campaigns"])

        @router.get("")
        async def list_campaigns(
            category: Optional[str] = Query(None),
            platform: Optional[str] = Query(None),
            compensation_type: Optional[str] = Query(None),
            min_budget: Optional[float] = Query(None),
            max_budget: Optional[float] = Query(None),
            status: Optional[str] = Query(None),
            brand_id: Optional[str] = Query(None),
            search: Optional[str] = Query(None)
        ):
            res = campaign_controller.get_campaigns(
                category=category,
                platform=platform,
                compensation_type=compensation_type,
                min_budget=min_budget,
                max_budget=max_budget,
                status=status,
                brand_id=brand_id,
                search=search
            )
            return res

        @router.get("/{campaign_id}")
        async def get_campaign(campaign_id: str):
            res = campaign_controller.get_campaign_by_id(campaign_id)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 404), detail=res.get("error"))
            return res

        @router.post("")
        async def create_campaign(payload: Dict[str, Any] = Body(...)):
            res = campaign_controller.create_campaign(payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.put("/{campaign_id}")
        async def update_campaign(campaign_id: str, payload: Dict[str, Any] = Body(...)):
            res = campaign_controller.update_campaign(campaign_id, payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.patch("/{campaign_id}/status")
        async def update_status(campaign_id: str, payload: Dict[str, Any] = Body(...)):
            status = payload.get("status")
            if not status:
                raise HTTPException(status_code=400, detail="Missing 'status' in body")
            res = campaign_controller.update_campaign_status(campaign_id, status)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        app.include_router(router)
    except ImportError:
        pass

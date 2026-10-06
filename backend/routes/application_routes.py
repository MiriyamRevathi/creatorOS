"""
Application Routes for CreatorOS Brand Marketplace
"""
from typing import Optional, Dict, Any
from backend.controllers.application_controller import ApplicationController

application_controller = ApplicationController()

def setup_application_routes(app):
    try:
        from fastapi import APIRouter, Query, Body, HTTPException
        router = APIRouter(prefix="/api/applications", tags=["Applications"])

        @router.get("")
        async def list_applications(
            campaign_id: Optional[str] = Query(None),
            creator_id: Optional[str] = Query(None),
            brand_id: Optional[str] = Query(None),
            status: Optional[str] = Query(None)
        ):
            return application_controller.get_applications(
                campaign_id=campaign_id,
                creator_id=creator_id,
                brand_id=brand_id,
                status=status
            )

        @router.get("/{app_id}")
        async def get_application(app_id: str):
            res = application_controller.get_application_by_id(app_id)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 404), detail=res.get("error"))
            return res

        @router.post("")
        async def submit_application(payload: Dict[str, Any] = Body(...)):
            res = application_controller.submit_application(payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.patch("/{app_id}/review")
        async def review_application(app_id: str, payload: Dict[str, Any] = Body(...)):
            status = payload.get("status")
            notes = payload.get("brandNotes")
            if not status:
                raise HTTPException(status_code=400, detail="Missing 'status' in body")
            res = application_controller.review_application(app_id, status, notes)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        app.include_router(router)
    except ImportError:
        pass

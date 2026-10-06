"""
Brand Routes for CreatorOS Brand Marketplace (FastAPI / Standard Router)
"""
from typing import Optional, Dict, Any
from backend.controllers.brand_controller import BrandController

brand_controller = BrandController()

def setup_brand_routes(app):
    """
    Mounts brand endpoints to a FastAPI or Flask-compatible app.
    """
    try:
        from fastapi import APIRouter, Query, Body, HTTPException
        router = APIRouter(prefix="/api/brands", tags=["Brands"])

        @router.get("")
        async def list_brands(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
            res = brand_controller.get_brands(category=category, search=search)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 500), detail=res.get("error"))
            return res

        @router.get("/{brand_id}")
        async def get_brand(brand_id: str):
            res = brand_controller.get_brand_by_id(brand_id)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 404), detail=res.get("error"))
            return res

        @router.post("")
        async def create_brand(payload: Dict[str, Any] = Body(...)):
            res = brand_controller.create_brand(payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        @router.put("/{brand_id}")
        async def update_brand(brand_id: str, payload: Dict[str, Any] = Body(...)):
            res = brand_controller.update_brand(brand_id, payload)
            if not res.get("success"):
                raise HTTPException(status_code=res.get("code", 400), detail=res.get("error"))
            return res

        app.include_router(router)
    except ImportError:
        # Standalone router helper when FastAPI isn't installed
        pass

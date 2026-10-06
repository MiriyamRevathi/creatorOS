"""
Brand Controller for CreatorOS Brand Marketplace
"""
from typing import Dict, Any, Optional
from backend.services.brand_service import BrandService

class BrandController:
    def __init__(self, service: Optional[BrandService] = None):
        self.service = service or BrandService()

    def get_brands(self, category: Optional[str] = None, search: Optional[str] = None) -> Dict[str, Any]:
        try:
            brands = self.service.list_brands(category=category, search=search)
            return {"success": True, "data": brands, "total": len(brands)}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def get_brand_by_id(self, brand_id: str) -> Dict[str, Any]:
        try:
            brand = self.service.get_brand(brand_id)
            if not brand:
                return {"success": False, "error": "Brand not found", "code": 404}
            return {"success": True, "data": brand}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def create_brand(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            brand = self.service.register_brand(payload)
            return {"success": True, "data": brand, "message": "Brand registered successfully"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def update_brand(self, brand_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            updated = self.service.update_profile(brand_id, payload)
            if not updated:
                return {"success": False, "error": "Brand not found", "code": 404}
            return {"success": True, "data": updated, "message": "Brand profile updated"}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

"""
Brand Service for CreatorOS Brand Marketplace
"""
from typing import List, Optional, Dict, Any
import uuid
import time
from backend.repositories.brand_repository import BrandRepository
from backend.models.brand import Brand

class BrandService:
    def __init__(self, brand_repo: Optional[BrandRepository] = None):
        self.brand_repo = brand_repo or BrandRepository()

    def list_brands(self, category: Optional[str] = None, search: Optional[str] = None) -> List[Dict[str, Any]]:
        brands = self.brand_repo.get_all(category=category, search=search)
        return [b.to_dict() for b in brands]

    def get_brand(self, brand_id: str) -> Optional[Dict[str, Any]]:
        brand = self.brand_repo.get_by_id(brand_id)
        return brand.to_dict() if brand else None

    def register_brand(self, data: Dict[str, Any]) -> Dict[str, Any]:
        if not data.get("name"):
            raise ValueError("Brand name is required.")
        if not data.get("category"):
            raise ValueError("Brand category is required.")

        brand_id = data.get("id") or f"brand-{uuid.uuid4().hex[:8]}"
        brand = Brand(
            id=brand_id,
            name=data["name"].strip(),
            tagline=data.get("tagline", "").strip(),
            category=data["category"].strip(),
            logo=data.get("logo", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=80"),
            banner=data.get("banner", "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80"),
            website=data.get("website", ""),
            location=data.get("location", "Global"),
            verified=data.get("verified", True),
            rating=data.get("rating", 5.0),
            bio=data.get("bio", ""),
            guidelines=data.get("guidelines", ""),
            preferredPlatforms=data.get("preferredPlatforms", ["YouTube", "Instagram"]),
            contactEmail=data.get("contactEmail", ""),
            foundedYear=data.get("foundedYear", 2024),
            socialHandles=data.get("socialHandles", {})
        )
        saved = self.brand_repo.save(brand)
        return saved.to_dict()

    def update_profile(self, brand_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        updated = self.brand_repo.update_brand(brand_id, updates)
        return updated.to_dict() if updated else None

"""
Brand Repository for CreatorOS Brand Marketplace
"""
import os
from typing import List, Optional
from backend.repositories.base_repository import BaseJSONRepository
from backend.models.brand import Brand

DEFAULT_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "brands"))
DEFAULT_DATA_FILE = os.path.join(DEFAULT_DATA_DIR, "brands.json")

class BrandRepository(BaseJSONRepository):
    def __init__(self, file_path: str = DEFAULT_DATA_FILE):
        super().__init__(file_path)

    def get_all(self, category: Optional[str] = None, search: Optional[str] = None) -> List[Brand]:
        raw_items = self.find_all()
        results = [Brand.from_dict(item) for item in raw_items]
        
        if category and category.lower() != "all":
            results = [b for b in results if b.category.lower() == category.lower()]
            
        if search:
            q = search.lower().strip()
            results = [b for b in results if q in b.name.lower() or q in b.tagline.lower() or q in b.bio.lower()]
            
        return results

    def get_by_id(self, brand_id: str) -> Optional[Brand]:
        data = self.find_by_id(brand_id)
        return Brand.from_dict(data) if data else None

    def save(self, brand: Brand) -> Brand:
        saved_dict = self.create(brand.to_dict())
        return Brand.from_dict(saved_dict)

    def update_brand(self, brand_id: str, updates: dict) -> Optional[Brand]:
        data = self.update(brand_id, updates)
        return Brand.from_dict(data) if data else None

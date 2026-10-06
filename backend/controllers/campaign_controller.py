"""
Campaign Controller for CreatorOS Brand Marketplace
"""
from typing import Dict, Any, Optional
from backend.services.campaign_service import CampaignService

class CampaignController:
    def __init__(self, service: Optional[CampaignService] = None):
        self.service = service or CampaignService()

    def get_campaigns(
        self,
        category: Optional[str] = None,
        platform: Optional[str] = None,
        compensation_type: Optional[str] = None,
        min_budget: Optional[float] = None,
        max_budget: Optional[float] = None,
        status: Optional[str] = None,
        brand_id: Optional[str] = None,
        search: Optional[str] = None
    ) -> Dict[str, Any]:
        try:
            campaigns = self.service.list_campaigns(
                category=category,
                platform=platform,
                compensation_type=compensation_type,
                min_budget=min_budget,
                max_budget=max_budget,
                status=status,
                brand_id=brand_id,
                search=search
            )
            return {"success": True, "data": campaigns, "total": len(campaigns)}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def get_campaign_by_id(self, campaign_id: str) -> Dict[str, Any]:
        try:
            camp = self.service.get_campaign(campaign_id)
            if not camp:
                return {"success": False, "error": "Campaign not found", "code": 404}
            return {"success": True, "data": camp}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def create_campaign(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            camp = self.service.create_campaign(payload)
            return {"success": True, "data": camp, "message": "Campaign published successfully"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def update_campaign(self, campaign_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            updated = self.service.update_campaign(campaign_id, payload)
            if not updated:
                return {"success": False, "error": "Campaign not found", "code": 404}
            return {"success": True, "data": updated, "message": "Campaign updated"}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def update_campaign_status(self, campaign_id: str, status: str) -> Dict[str, Any]:
        try:
            updated = self.service.update_status(campaign_id, status)
            if not updated:
                return {"success": False, "error": "Campaign not found", "code": 404}
            return {"success": True, "data": updated, "message": f"Campaign status updated to {status}"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

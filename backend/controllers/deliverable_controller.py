"""
Deliverable Controller for CreatorOS Brand Marketplace
"""
from typing import Dict, Any, Optional
from backend.services.deliverable_service import DeliverableService

class DeliverableController:
    def __init__(self, service: Optional[DeliverableService] = None):
        self.service = service or DeliverableService()

    def get_deliverables(
        self,
        contract_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        try:
            items = self.service.list_deliverables(
                contract_id=contract_id,
                campaign_id=campaign_id,
                creator_id=creator_id,
                brand_id=brand_id,
                status=status
            )
            return {"success": True, "data": items, "total": len(items)}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def get_deliverable_by_id(self, deliverable_id: str) -> Dict[str, Any]:
        try:
            item = self.service.get_deliverable(deliverable_id)
            if not item:
                return {"success": False, "error": "Deliverable not found", "code": 404}
            return {"success": True, "data": item}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def submit_draft(self, deliverable_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            updated = self.service.submit_draft(deliverable_id, payload)
            return {"success": True, "data": updated, "message": "Deliverable draft submitted for brand review"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def review_deliverable(self, deliverable_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            action = payload.get("action", "approve")
            feedback = payload.get("feedback", "")
            reviewer = payload.get("reviewerName", "Brand Manager")
            updated = self.service.review_deliverable(deliverable_id, action, feedback, reviewer)
            return {"success": True, "data": updated, "message": f"Deliverable review completed: {action}"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

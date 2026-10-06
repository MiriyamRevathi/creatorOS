"""
Application Controller for CreatorOS Brand Marketplace
"""
from typing import Dict, Any, Optional
from backend.services.application_service import ApplicationService

class ApplicationController:
    def __init__(self, service: Optional[ApplicationService] = None):
        self.service = service or ApplicationService()

    def get_applications(
        self,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        try:
            apps = self.service.list_applications(
                campaign_id=campaign_id,
                creator_id=creator_id,
                brand_id=brand_id,
                status=status
            )
            return {"success": True, "data": apps, "total": len(apps)}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def get_application_by_id(self, app_id: str) -> Dict[str, Any]:
        try:
            app = self.service.get_application(app_id)
            if not app:
                return {"success": False, "error": "Application not found", "code": 404}
            return {"success": True, "data": app}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def submit_application(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            app = self.service.submit_application(payload)
            return {"success": True, "data": app, "message": "Proposal submitted successfully!"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

    def review_application(self, app_id: str, status: str, notes: Optional[str] = None) -> Dict[str, Any]:
        try:
            updated = self.service.update_application_status(app_id, status, notes)
            return {"success": True, "data": updated, "message": f"Application marked as {status}"}
        except ValueError as ve:
            return {"success": False, "error": str(ve), "code": 400}
        except Exception as e:
            return {"success": False, "error": str(e), "code": 500}

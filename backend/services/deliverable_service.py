"""
Deliverable Service for CreatorOS Brand Marketplace
"""
from typing import List, Optional, Dict, Any
import uuid
import time
from backend.repositories.deliverable_repository import DeliverableRepository
from backend.repositories.contract_repository import ContractRepository
from backend.models.deliverable import Deliverable

class DeliverableService:
    def __init__(
        self,
        deliverable_repo: Optional[DeliverableRepository] = None,
        contract_repo: Optional[ContractRepository] = None
    ):
        self.deliverable_repo = deliverable_repo or DeliverableRepository()
        self.contract_repo = contract_repo or ContractRepository()

    def list_deliverables(
        self,
        contract_id: Optional[str] = None,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        deliverables = self.deliverable_repo.get_all(
            contract_id=contract_id,
            campaign_id=campaign_id,
            creator_id=creator_id,
            brand_id=brand_id,
            status=status
        )
        return [d.to_dict() for d in deliverables]

    def get_deliverable(self, deliverable_id: str) -> Optional[Dict[str, Any]]:
        deliv = self.deliverable_repo.get_by_id(deliverable_id)
        return deliv.to_dict() if deliv else None

    def submit_draft(self, deliverable_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        deliv = self.deliverable_repo.get_by_id(deliverable_id)
        if not deliv:
            raise ValueError(f"Deliverable {deliverable_id} not found.")

        submission_url = data.get("submissionUrl", "").strip()
        if not submission_url:
            raise ValueError("Draft submission URL or media link is required.")

        now_str = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        updates = {
            "submissionUrl": submission_url,
            "previewThumbnail": data.get("previewThumbnail", deliv.previewThumbnail or "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80"),
            "notes": data.get("notes", "").strip(),
            "status": "In Review",
            "submittedAt": now_str
        }

        updated = self.deliverable_repo.update_deliverable(deliverable_id, updates)
        return updated.to_dict()

    def review_deliverable(self, deliverable_id: str, action: str, feedback_message: str, reviewer_name: str = "Brand Lead") -> Dict[str, Any]:
        deliv = self.deliverable_repo.get_by_id(deliverable_id)
        if not deliv:
            raise ValueError(f"Deliverable {deliverable_id} not found.")

        now_str = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        feedback_entry = {
            "id": f"fb-{uuid.uuid4().hex[:6]}",
            "author": reviewer_name,
            "timestamp": now_str,
            "message": feedback_message.strip()
        }

        current_feedback = list(deliv.feedback)
        if feedback_message:
            current_feedback.append(feedback_entry)

        updates = {"feedback": current_feedback}

        if action.lower() == "approve":
            updates["status"] = "Approved"
            # If all deliverables for this contract are approved, mark contract as Completed & release escrow
            self._check_contract_completion(deliv.contractId)
        elif action.lower() == "request_revision":
            updates["status"] = "Revision Requested"
            updates["revisionCount"] = deliv.revisionCount + 1
        elif action.lower() == "reject":
            updates["status"] = "Rejected"
        else:
            raise ValueError(f"Invalid review action '{action}'. Use approve, request_revision, or reject.")

        updated = self.deliverable_repo.update_deliverable(deliverable_id, updates)
        return updated.to_dict()

    def _check_contract_completion(self, contract_id: str):
        if not contract_id:
            return
        all_delivs = self.deliverable_repo.get_all(contract_id=contract_id)
        if all(d.status == "Approved" for d in all_delivs):
            self.contract_repo.update_contract(contract_id, {
                "status": "Completed",
                "escrowStatus": "Released"
            })

"""
Application Service for CreatorOS Brand Marketplace
"""
from typing import List, Optional, Dict, Any
import uuid
import time
from backend.repositories.application_repository import ApplicationRepository
from backend.repositories.campaign_repository import CampaignRepository
from backend.repositories.contract_repository import ContractRepository
from backend.repositories.deliverable_repository import DeliverableRepository
from backend.models.application import Application
from backend.models.contract import Contract
from backend.models.deliverable import Deliverable

class ApplicationService:
    def __init__(
        self,
        app_repo: Optional[ApplicationRepository] = None,
        campaign_repo: Optional[CampaignRepository] = None,
        contract_repo: Optional[ContractRepository] = None,
        deliverable_repo: Optional[DeliverableRepository] = None
    ):
        self.app_repo = app_repo or ApplicationRepository()
        self.campaign_repo = campaign_repo or CampaignRepository()
        self.contract_repo = contract_repo or ContractRepository()
        self.deliverable_repo = deliverable_repo or DeliverableRepository()

    def list_applications(
        self,
        campaign_id: Optional[str] = None,
        creator_id: Optional[str] = None,
        brand_id: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        apps = self.app_repo.get_all(
            campaign_id=campaign_id,
            creator_id=creator_id,
            brand_id=brand_id,
            status=status
        )
        return [a.to_dict() for a in apps]

    def get_application(self, app_id: str) -> Optional[Dict[str, Any]]:
        app = self.app_repo.get_by_id(app_id)
        return app.to_dict() if app else None

    def submit_application(self, data: Dict[str, Any]) -> Dict[str, Any]:
        if not data.get("campaignId"):
            raise ValueError("campaignId is required.")
        if not data.get("creatorName"):
            raise ValueError("creatorName is required.")
        if not data.get("pitchMessage"):
            raise ValueError("pitchMessage is required.")

        campaign = self.campaign_repo.get_by_id(data["campaignId"])
        if not campaign:
            raise ValueError(f"Campaign {data['campaignId']} not found.")

        # Check for existing application from same creator
        existing = self.app_repo.get_all(
            campaign_id=data["campaignId"],
            creator_id=data.get("creatorId")
        )
        if existing:
            raise ValueError("You have already submitted an application for this campaign.")

        app_id = f"app-{uuid.uuid4().hex[:8]}"
        proposed_rate = float(data.get("proposedRate", campaign.budget))

        app = Application(
            id=app_id,
            campaignId=campaign.id,
            campaignTitle=campaign.title,
            brandId=campaign.brandId,
            brandName=campaign.brandName,
            creatorId=data.get("creatorId", f"creator-{uuid.uuid4().hex[:6]}"),
            creatorName=data["creatorName"].strip(),
            creatorAvatar=data.get("creatorAvatar", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"),
            creatorNiche=data.get("creatorNiche", "Digital Content Creation"),
            creatorFollowers=int(data.get("creatorFollowers", 25000)),
            creatorPlatform=data.get("creatorPlatform", campaign.platforms[0] if campaign.platforms else "YouTube"),
            creatorChannelUrl=data.get("creatorChannelUrl", "https://youtube.com/@creator"),
            proposedRate=proposed_rate,
            pitchMessage=data["pitchMessage"].strip(),
            portfolioLinks=data.get("portfolioLinks", []),
            estimatedTurnaroundDays=int(data.get("estimatedTurnaroundDays", 10)),
            status="Pending",
            submittedAt=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        )
        saved = self.app_repo.save(app)
        # Update campaign applicant counter
        self.campaign_repo.increment_applicant_count(campaign.id)

        return saved.to_dict()

    def update_application_status(self, app_id: str, new_status: str, brand_notes: Optional[str] = None) -> Dict[str, Any]:
        valid_statuses = ["Pending", "Shortlisted", "Accepted", "Rejected", "Withdrawn"]
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid status '{new_status}'. Allowed: {valid_statuses}")

        app = self.app_repo.get_by_id(app_id)
        if not app:
            raise ValueError(f"Application {app_id} not found.")

        now_str = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        updates = {
            "status": new_status,
            "reviewedAt": now_str
        }
        if brand_notes:
            updates["brandNotes"] = brand_notes

        updated_app = self.app_repo.update_application(app_id, updates)

        # When status transitions to "Accepted", automatically issue a Contract and Deliverables!
        if new_status == "Accepted":
            self._handle_acceptance_workflow(updated_app)

        return updated_app.to_dict()

    def _handle_acceptance_workflow(self, app: Application):
        campaign = self.campaign_repo.get_by_id(app.campaignId)
        
        # 1. Create or check Contract
        existing_contract = self.contract_repo.get_all(campaign_id=app.campaignId, creator_id=app.creatorId)
        if not existing_contract:
            contract_id = f"ctr-{uuid.uuid4().hex[:8]}"
            contract = Contract(
                id=contract_id,
                applicationId=app.id,
                campaignId=app.campaignId,
                campaignTitle=app.campaignTitle,
                brandId=app.brandId,
                brandName=app.brandName,
                creatorId=app.creatorId,
                creatorName=app.creatorName,
                creatorEmail=f"{app.creatorId}@example.com",
                contractAmount=app.proposedRate,
                currency="USD",
                paymentTerms="100% Escrow protected; released upon brand sign-off",
                escrowStatus="Funded in Escrow",
                creatorSigned=False,
                brandSigned=True,
                brandSignedAt=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                status="Active",
                completionDeadline=campaign.deadline if campaign else "2026-11-30",
                terms={
                    "ipRights": "Creator retains original copyright; Brand receives digital commercial license.",
                    "exclusivity": f"Standard exclusivity for {campaign.requirements.get('exclusivityDays', 30) if campaign else 30} days.",
                    "revisionsPolicy": "Includes up to two rounds of minor brand feedback before final publish.",
                    "cancellationFee": "25% kill fee applies if cancelled after contract sign-off."
                }
            )
            self.contract_repo.save(contract)

            # 2. Instantiate Deliverable checklist
            if campaign and campaign.deliverables:
                for deliv_spec in campaign.deliverables:
                    deliv_id = f"del-rec-{uuid.uuid4().hex[:8]}"
                    deliverable = Deliverable(
                        id=deliv_id,
                        contractId=contract_id,
                        campaignId=campaign.id,
                        campaignTitle=campaign.title,
                        brandId=campaign.brandId,
                        brandName=campaign.brandName,
                        creatorId=app.creatorId,
                        creatorName=app.creatorName,
                        title=deliv_spec.get("title", "Campaign Deliverable"),
                        platform=campaign.platforms[0] if campaign.platforms else "YouTube",
                        format=deliv_spec.get("format", "Video Content"),
                        status="Pending Submission",
                        dueDate=campaign.deadline,
                        payoutAmount=app.proposedRate / max(len(campaign.deliverables), 1)
                    )
                    self.deliverable_repo.save(deliverable)

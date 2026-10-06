"""
Unit tests for Application Submission and Brand Review Flow
"""
import unittest
import os
import shutil
import tempfile
import json

from backend.repositories.campaign_repository import CampaignRepository
from backend.repositories.application_repository import ApplicationRepository
from backend.repositories.contract_repository import ContractRepository
from backend.repositories.deliverable_repository import DeliverableRepository
from backend.services.application_service import ApplicationService
from backend.models.campaign import Campaign

class TestApplications(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        self.app_file = os.path.join(self.test_dir, "applications.json")
        self.camp_file = os.path.join(self.test_dir, "campaigns.json")
        self.contract_file = os.path.join(self.test_dir, "contracts.json")
        self.deliv_file = os.path.join(self.test_dir, "deliverables.json")

        self.camp_repo = CampaignRepository(self.camp_file)
        self.app_repo = ApplicationRepository(self.app_file)
        self.contract_repo = ContractRepository(self.contract_file)
        self.deliv_repo = DeliverableRepository(self.deliv_file)

        # Seed sample campaign
        sample_camp = Campaign(
            id="camp-test-100",
            brandId="brand-apex",
            brandName="Apex Audio",
            title="Desk Mic Launch",
            tagline="Top tier acoustics",
            category="Audio",
            compensationType="Paid",
            budget=3000,
            deadline="2026-11-20",
            platforms=["YouTube"],
            deliverables=[{"id": "del-1", "title": "YouTube Video", "format": "Video"}]
        )
        self.camp_repo.save(sample_camp)

        self.service = ApplicationService(
            self.app_repo,
            self.camp_repo,
            self.contract_repo,
            self.deliv_repo
        )

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_submit_application_success(self):
        payload = {
            "campaignId": "camp-test-100",
            "creatorId": "creator-test-01",
            "creatorName": "Samantha Tech",
            "proposedRate": 3000,
            "pitchMessage": "I have 50k subscribers in audio tech. Would love to review the mic!",
            "portfolioLinks": ["https://youtube.com/test"]
        }
        res = self.service.submit_application(payload)
        self.assertEqual(res["status"], "Pending")
        self.assertEqual(res["campaignTitle"], "Desk Mic Launch")

        # Verify applicant counter incremented
        camp = self.camp_repo.get_by_id("camp-test-100")
        self.assertEqual(camp.applicantCount, 1)

    def test_duplicate_application_rejection(self):
        payload = {
            "campaignId": "camp-test-100",
            "creatorId": "creator-test-01",
            "creatorName": "Samantha Tech",
            "pitchMessage": "First pitch"
        }
        self.service.submit_application(payload)

        with self.assertRaises(ValueError):
            self.service.submit_application(payload)

    def test_accept_application_generates_contract_and_deliverable(self):
        payload = {
            "campaignId": "camp-test-100",
            "creatorId": "creator-test-02",
            "creatorName": "David Sound",
            "proposedRate": 2800,
            "pitchMessage": "Sound engineer with 8 years studio experience."
        }
        app = self.service.submit_application(payload)
        
        # Accept proposal
        reviewed = self.service.update_application_status(app["id"], "Accepted", "Great match!")
        self.assertEqual(reviewed["status"], "Accepted")

        # Verify auto-generated Contract
        contracts = self.contract_repo.get_all(campaign_id="camp-test-100", creator_id="creator-test-02")
        self.assertEqual(len(contracts), 1)
        self.assertEqual(contracts[0].contractAmount, 2800.0)
        self.assertEqual(contracts[0].escrowStatus, "Funded in Escrow")

        # Verify auto-generated Deliverable
        delivs = self.deliv_repo.get_all(campaign_id="camp-test-100", creator_id="creator-test-02")
        self.assertEqual(len(delivs), 1)
        self.assertEqual(delivs[0].title, "YouTube Video")

if __name__ == "__main__":
    unittest.main()

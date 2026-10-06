"""
Unit tests for Deliverable Submission, Feedback, and Approval Workflow
"""
import unittest
import os
import shutil
import tempfile

from backend.repositories.deliverable_repository import DeliverableRepository
from backend.repositories.contract_repository import ContractRepository
from backend.services.deliverable_service import DeliverableService
from backend.models.deliverable import Deliverable
from backend.models.contract import Contract

class TestDeliverables(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        self.deliv_file = os.path.join(self.test_dir, "deliverables.json")
        self.contract_file = os.path.join(self.test_dir, "contracts.json")
        
        self.deliv_repo = DeliverableRepository(self.deliv_file)
        self.contract_repo = ContractRepository(self.contract_file)
        self.service = DeliverableService(self.deliv_repo, self.contract_repo)

        # Seed contract
        contract = Contract(
            id="ctr-deliv-test",
            applicationId="app-1",
            campaignId="camp-1",
            campaignTitle="Camp Title",
            brandId="brand-1",
            brandName="Brand 1",
            creatorId="creator-1",
            creatorName="Creator 1",
            creatorEmail="c@test.com",
            contractAmount=3000,
            escrowStatus="Funded in Escrow",
            status="In Progress"
        )
        self.contract_repo.save(contract)

        # Seed deliverable
        deliv = Deliverable(
            id="deliv-unit-test-1",
            contractId="ctr-deliv-test",
            campaignId="camp-1",
            campaignTitle="Camp Title",
            brandId="brand-1",
            brandName="Brand 1",
            creatorId="creator-1",
            creatorName="Creator 1",
            title="4K Product Review",
            platform="YouTube",
            format="Video",
            status="Pending Submission"
        )
        self.deliv_repo.save(deliv)

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_submit_draft(self):
        payload = {
            "submissionUrl": "https://youtube.com/watch?v=draft123",
            "notes": "Draft version 1 ready for review."
        }
        res = self.service.submit_draft("deliv-unit-test-1", payload)
        self.assertEqual(res["status"], "In Review")
        self.assertEqual(res["submissionUrl"], "https://youtube.com/watch?v=draft123")
        self.assertIsNotNone(res["submittedAt"])

    def test_request_revision(self):
        self.service.submit_draft("deliv-unit-test-1", {"submissionUrl": "https://youtube.com/draft"})
        res = self.service.review_deliverable(
            "deliv-unit-test-1",
            action="request_revision",
            feedback_message="Please adjust lighting in intro.",
            reviewer_name="Brand Lead"
        )
        self.assertEqual(res["status"], "Revision Requested")
        self.assertEqual(res["revisionCount"], 1)
        self.assertEqual(len(res["feedback"]), 1)

    def test_approve_deliverable_completes_contract(self):
        self.service.submit_draft("deliv-unit-test-1", {"submissionUrl": "https://youtube.com/draft"})
        res = self.service.review_deliverable(
            "deliv-unit-test-1",
            action="approve",
            feedback_message="Approved! Looks amazing.",
            reviewer_name="Brand Lead"
        )
        self.assertEqual(res["status"], "Approved")

        # Verify parent contract is completed and escrow released!
        contract = self.contract_repo.get_by_id("ctr-deliv-test")
        self.assertEqual(contract.status, "Completed")
        self.assertEqual(contract.escrowStatus, "Released")

if __name__ == "__main__":
    unittest.main()

"""
Unit tests for Contract Digital Signatures and Escrow Handling
"""
import unittest
import os
import shutil
import tempfile

from backend.repositories.contract_repository import ContractRepository
from backend.services.contract_service import ContractService
from backend.models.contract import Contract

class TestContracts(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        self.contract_file = os.path.join(self.test_dir, "contracts.json")
        self.repo = ContractRepository(self.contract_file)
        self.service = ContractService(self.repo)

        # Seed sample contract
        contract = Contract(
            id="ctr-test-555",
            applicationId="app-test-1",
            campaignId="camp-1",
            campaignTitle="Test Campaign",
            brandId="brand-1",
            brandName="Brand 1",
            creatorId="creator-1",
            creatorName="Creator Name",
            creatorEmail="creator@test.com",
            contractAmount=2500,
            creatorSigned=False,
            brandSigned=True,
            status="Active"
        )
        self.repo.save(contract)

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_sign_contract_by_creator(self):
        updated = self.service.sign_contract("ctr-test-555", signer_role="creator")
        self.assertTrue(updated["creatorSigned"])
        self.assertIsNotNone(updated["creatorSignedAt"])
        self.assertEqual(updated["status"], "Active")

    def test_update_escrow_status(self):
        updated = self.service.update_escrow_status("ctr-test-555", "Released")
        self.assertEqual(updated["escrowStatus"], "Released")

    def test_invalid_escrow_status(self):
        with self.assertRaises(ValueError):
            self.service.update_escrow_status("ctr-test-555", "InvalidEscrowState")

if __name__ == "__main__":
    unittest.main()

"""
Unit tests for Campaign Creation, Filtering, and Lifecycle in CreatorOS
"""
import unittest
import os
import shutil
import tempfile
import json

from backend.repositories.campaign_repository import CampaignRepository
from backend.repositories.brand_repository import BrandRepository
from backend.services.campaign_service import CampaignService

class TestCampaigns(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        self.camp_file = os.path.join(self.test_dir, "campaigns.json")
        self.brand_file = os.path.join(self.test_dir, "brands.json")
        
        # Initial seed
        with open(self.brand_file, "w") as f:
            json.dump([{
                "id": "brand-test-1",
                "name": "Test Brand Co",
                "tagline": "Innovative Gear",
                "category": "Tech & Audio",
                "logo": "",
                "banner": "",
                "website": "https://test.com",
                "location": "NY"
            }], f)

        with open(self.camp_file, "w") as f:
            json.dump([], f)

        self.brand_repo = BrandRepository(self.brand_file)
        self.camp_repo = CampaignRepository(self.camp_file)
        self.service = CampaignService(self.camp_repo, self.brand_repo)

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_create_campaign_success(self):
        payload = {
            "brandId": "brand-test-1",
            "title": "Pro Wireless Headset Review",
            "tagline": "Experience pristine audio fidelity",
            "category": "Tech & Audio",
            "compensationType": "Paid Fixed Fee",
            "budget": 2500,
            "deadline": "2026-12-01",
            "platforms": ["YouTube", "Twitch"]
        }
        camp = self.service.create_campaign(payload)
        self.assertIsNotNone(camp["id"])
        self.assertEqual(camp["title"], "Pro Wireless Headset Review")
        self.assertEqual(camp["brandName"], "Test Brand Co")
        self.assertEqual(camp["budget"], 2500.0)
        self.assertEqual(camp["status"], "Active")

    def test_create_campaign_invalid_budget(self):
        payload = {
            "brandId": "brand-test-1",
            "title": "Invalid Campaign",
            "budget": 0
        }
        with self.assertRaises(ValueError):
            self.service.create_campaign(payload)

    def test_filter_campaigns_by_category_and_budget(self):
        self.service.create_campaign({
            "brandId": "brand-test-1",
            "title": "Low Budget Audio",
            "category": "Audio",
            "budget": 500
        })
        self.service.create_campaign({
            "brandId": "brand-test-1",
            "title": "High Budget Gaming",
            "category": "Gaming",
            "budget": 4000
        })

        audio_camps = self.service.list_campaigns(category="Audio")
        self.assertEqual(len(audio_camps), 1)
        self.assertEqual(audio_camps[0]["title"], "Low Budget Audio")

        budget_filtered = self.service.list_campaigns(min_budget=1000)
        self.assertEqual(len(budget_filtered), 1)
        self.assertEqual(budget_filtered[0]["title"], "High Budget Gaming")

if __name__ == "__main__":
    unittest.main()

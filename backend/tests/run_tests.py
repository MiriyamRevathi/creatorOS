"""
CreatorOS Marketplace Backend Test Suite Runner
Runs all unit tests in backend/tests/
"""
import unittest
import sys
import os

# Put root directory in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.tests.test_campaigns import TestCampaigns
from backend.tests.test_applications import TestApplications
from backend.tests.test_contracts import TestContracts
from backend.tests.test_deliverables import TestDeliverables

def run_all_tests():
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    suite.addTests(loader.loadTestsFromTestCase(TestCampaigns))
    suite.addTests(loader.loadTestsFromTestCase(TestApplications))
    suite.addTests(loader.loadTestsFromTestCase(TestContracts))
    suite.addTests(loader.loadTestsFromTestCase(TestDeliverables))

    runner = unittest.TextTestRunner(verbosity=2)
    print("================================================================")
    print("🚀 Running CreatorOS Creator-to-Brand Marketplace Test Suite...")
    print("================================================================")
    result = runner.run(suite)
    
    if result.wasSuccessful():
        print("\n✅ ALL TESTS PASSED SUCCESSFULLY!")
        return 0
    else:
        print(f"\n❌ {len(result.failures)} Failures, {len(result.errors)} Errors")
        return 1

if __name__ == "__main__":
    exit_code = run_all_tests()
    sys.exit(exit_code)

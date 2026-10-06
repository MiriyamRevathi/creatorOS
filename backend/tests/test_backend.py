import unittest
import json
import os
import sys

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app

class TestCreatorOSBackend(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_calendar_endpoint(self):
        response = self.app.get('/api/calendar')
        self.assertEqual(response.status_code, 200)

    def test_projects_endpoint(self):
        response = self.app.get('/api/projects')
        self.assertEqual(response.status_code, 200)

    def test_tasks_endpoint(self):
        response = self.app.get('/api/tasks')
        self.assertEqual(response.status_code, 200)

    def test_collaborations_endpoint(self):
        response = self.app.get('/api/collaborations/activity')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()

import json
import os

class AnalyticsRepository:
    def __init__(self, base_dir=None):
        if base_dir is None:
            # Resolve root directory relative to this repository file
            current_dir = os.path.dirname(os.path.abspath(__file__))
            self.root_dir = os.path.abspath(os.path.join(current_dir, "..", ".."))
        else:
            self.root_dir = base_dir

        self.datasets_dir = os.path.join(self.root_dir, "datasets")
        self.data_dir = os.path.join(self.root_dir, "data")

    def _read_json(self, path):
        if not os.path.exists(path):
            return {}
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_creators(self):
        path = os.path.join(self.datasets_dir, "creators", "creators.json")
        return self._read_json(path)

    def get_content_metrics(self):
        path = os.path.join(self.datasets_dir, "content", "content_metrics.json")
        return self._read_json(path)

    def get_engagement_history(self):
        path = os.path.join(self.datasets_dir, "engagement", "engagement_history.json")
        return self._read_json(path)

    def get_audience_demographics(self):
        path = os.path.join(self.datasets_dir, "audience", "audience_demographics.json")
        return self._read_json(path)

    def get_revenue_breakdown(self):
        path = os.path.join(self.datasets_dir, "revenue", "revenue_breakdown.json")
        return self._read_json(path)

    def get_runtime_analytics(self):
        path = os.path.join(self.data_dir, "analytics", "analytics_data.json")
        return self._read_json(path)

import json
import os

class TrendRepository:
    def __init__(self, base_dir=None):
        if base_dir is None:
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

    def get_trending_topics(self):
        path = os.path.join(self.datasets_dir, "trends", "trending_topics.json")
        return self._read_json(path)

    def get_trend_history(self):
        path = os.path.join(self.datasets_dir, "trends", "trend_history.json")
        return self._read_json(path)

    def get_runtime_trends(self):
        path = os.path.join(self.data_dir, "trends", "trends_data.json")
        return self._read_json(path)

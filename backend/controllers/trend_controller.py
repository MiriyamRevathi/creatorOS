from flask import jsonify, request
from backend.services.trends.trend_service import TrendService

class TrendController:
    def __init__(self, service=None):
        self.service = service or TrendService()

    def get_explorer(self):
        data = self.service.get_explorer_data()
        return jsonify({"success": True, "data": data})

    def get_trending_topics(self):
        category = request.args.get("category")
        data = self.service.get_trending_topics(category=category)
        return jsonify({"success": True, "data": data})

    def get_content_trends(self):
        data = self.service.get_content_trends()
        return jsonify({"success": True, "data": data})

    def get_trend_history(self):
        data = self.service.get_trend_history()
        return jsonify({"success": True, "data": data})

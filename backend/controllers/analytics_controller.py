from flask import jsonify
from backend.services.analytics.analytics_service import AnalyticsService

class AnalyticsController:
    def __init__(self, service=None):
        self.service = service or AnalyticsService()

    def get_overview(self):
        data = self.service.get_overview()
        return jsonify({"success": True, "data": data})

    def get_content_analytics(self):
        data = self.service.get_content_analytics()
        return jsonify({"success": True, "data": data})

    def get_audience_analytics(self):
        data = self.service.get_audience_analytics()
        return jsonify({"success": True, "data": data})

    def get_growth_analytics(self):
        data = self.service.get_growth_analytics()
        return jsonify({"success": True, "data": data})

    def get_engagement_analytics(self):
        data = self.service.get_engagement_analytics()
        return jsonify({"success": True, "data": data})

    def get_revenue_analytics(self):
        data = self.service.get_revenue_analytics()
        return jsonify({"success": True, "data": data})

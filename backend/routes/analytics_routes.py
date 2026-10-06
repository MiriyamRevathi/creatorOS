from flask import Blueprint
from backend.controllers.analytics_controller import AnalyticsController

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/analytics")
controller = AnalyticsController()

@analytics_bp.route("/overview", methods=["GET"])
def overview():
    return controller.get_overview()

@analytics_bp.route("/content", methods=["GET"])
def content_analytics():
    return controller.get_content_analytics()

@analytics_bp.route("/audience", methods=["GET"])
def audience_analytics():
    return controller.get_audience_analytics()

@analytics_bp.route("/growth", methods=["GET"])
def growth_analytics():
    return controller.get_growth_analytics()

@analytics_bp.route("/engagement", methods=["GET"])
def engagement_analytics():
    return controller.get_engagement_analytics()

@analytics_bp.route("/revenue", methods=["GET"])
def revenue_analytics():
    return controller.get_revenue_analytics()

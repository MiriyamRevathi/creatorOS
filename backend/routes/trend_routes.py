from flask import Blueprint
from backend.controllers.trend_controller import TrendController

trend_bp = Blueprint("trends", __name__, url_prefix="/api/trends")
controller = TrendController()

@trend_bp.route("/explorer", methods=["GET"])
def explorer():
    return controller.get_explorer()

@trend_bp.route("/topics", methods=["GET"])
def topics():
    return controller.get_trending_topics()

@trend_bp.route("/content", methods=["GET"])
def content_trends():
    return controller.get_content_trends()

@trend_bp.route("/history", methods=["GET"])
def history():
    return controller.get_trend_history()

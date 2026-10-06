import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.analytics.engagement import EngagementCalculator
from backend.analytics.growth import GrowthCalculator
from backend.analytics.content_performance import ContentPerformanceAnalyzer
from backend.analytics.revenue import RevenueCalculator
from backend.analytics.forecasting import MetricForecaster
from backend.analytics.insights import CreatorInsightGenerator
from backend.app import create_app

def test_engagement_rate_calculation():
    # 100 views, 10 likes, 5 comments, 5 shares => 20 total interactions => 20%
    rate = EngagementCalculator.calculate_engagement_rate(100, 10, 5, 5)
    assert rate == 20.0

def test_engagement_rate_zero_views():
    rate = EngagementCalculator.calculate_engagement_rate(0, 10, 5, 5)
    assert rate == 0.0

def test_growth_rate_calculation():
    # 500 followers now vs 400 previous => 25% growth
    growth_pct = GrowthCalculator.calculate_growth_rate(500, 400)
    assert growth_pct == 25.0

def test_linear_forecasting():
    # Linear sequence: 10, 20, 30, 40
    history = [10.0, 20.0, 30.0, 40.0]
    predictions = MetricForecaster.linear_forecast(history, periods_ahead=2)
    assert len(predictions) == 2
    assert abs(predictions[0] - 50.0) < 0.1
    assert abs(predictions[1] - 60.0) < 0.1

def test_insight_generation():
    content_analysis = {
        "top_performing": {"title": "AI Agent Guide", "views": 100000}
    }
    eng_analysis = {"average_engagement_rate": 12.5}
    growth_analysis = {"net_gain_30d": 1500}
    rev_analysis = {
        "top_revenue_stream": {"source": "Sponsorships", "amount_usd": 5000.0, "percentage": 50}
    }
    insights = CreatorInsightGenerator.generate_insights(
        content_analysis, eng_analysis, growth_analysis, rev_analysis, []
    )
    assert len(insights) >= 3
    categories = [i["category"] for i in insights]
    assert "Content Strategy" in categories

def test_flask_api_routes():
    app = create_app()
    client = app.test_client()

    health_res = client.get("/api/health")
    assert health_res.status_code == 200
    assert health_res.json["status"] == "online"

    overview_res = client.get("/api/analytics/overview")
    assert overview_res.status_code == 200
    assert overview_res.json["success"] is True
    assert "kpis" in overview_res.json["data"]

    trends_res = client.get("/api/trends/explorer")
    assert trends_res.status_code == 200
    assert trends_res.json["success"] is True

# Pytest Suite Version 1.0.0

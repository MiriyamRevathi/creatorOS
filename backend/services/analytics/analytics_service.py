from backend.repositories.analytics_repository import AnalyticsRepository
from backend.repositories.trend_repository import TrendRepository
from backend.analytics.engagement import EngagementCalculator
from backend.analytics.growth import GrowthCalculator
from backend.analytics.audience import AudienceAnalyzer
from backend.analytics.content_performance import ContentPerformanceAnalyzer
from backend.analytics.revenue import RevenueCalculator
from backend.analytics.forecasting import MetricForecaster
from backend.analytics.insights import CreatorInsightGenerator

class AnalyticsService:
    def __init__(self, analytics_repo=None, trend_repo=None):
        self.analytics_repo = analytics_repo or AnalyticsRepository()
        self.trend_repo = trend_repo or TrendRepository()

    def get_overview(self):
        kpis = self.analytics_repo.get_runtime_analytics().get("overview_kpis", {})
        growth_analysis = GrowthCalculator.analyze_growth_trajectory(
            kpis.get("total_followers", 0),
            kpis.get("followers_growth_net_30d", 0)
        )
        content_items = self.analytics_repo.get_content_metrics()
        content_analysis = ContentPerformanceAnalyzer.analyze_content_list(content_items)
        eng_history = self.analytics_repo.get_engagement_history()
        eng_summary = EngagementCalculator.summarize_engagement_history(eng_history)
        rev_data = self.analytics_repo.get_revenue_breakdown()
        rev_summary = RevenueCalculator.analyze_monetization(rev_data)
        trends_data = self.trend_repo.get_trending_topics()

        insights = CreatorInsightGenerator.generate_insights(
            content_analysis, eng_summary, growth_analysis, rev_summary, trends_data
        )

        return {
            "kpis": kpis,
            "growth": growth_analysis,
            "content": content_analysis,
            "engagement": eng_summary,
            "revenue": rev_summary,
            "insights": insights
        }

    def get_content_analytics(self):
        content_items = self.analytics_repo.get_content_metrics()
        return ContentPerformanceAnalyzer.analyze_content_list(content_items)

    def get_audience_analytics(self):
        demo_data = self.analytics_repo.get_audience_demographics()
        return AudienceAnalyzer.process_audience_demographics(demo_data)

    def get_growth_analytics(self):
        kpis = self.analytics_repo.get_runtime_analytics().get("overview_kpis", {})
        growth_analysis = GrowthCalculator.analyze_growth_trajectory(
            kpis.get("total_followers", 0),
            kpis.get("followers_growth_net_30d", 0)
        )
        eng_history = self.analytics_repo.get_engagement_history()
        views_history = [item.get("views", 0) for item in eng_history]
        forecasted_views = MetricForecaster.linear_forecast(views_history, periods_ahead=3)
        growth_analysis["views_forecast_next_3_periods"] = forecasted_views
        return growth_analysis

    def get_engagement_analytics(self):
        eng_history = self.analytics_repo.get_engagement_history()
        return EngagementCalculator.summarize_engagement_history(eng_history)

    def get_revenue_analytics(self):
        rev_data = self.analytics_repo.get_revenue_breakdown()
        return RevenueCalculator.analyze_monetization(rev_data)

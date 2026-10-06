from backend.repositories.trend_repository import TrendRepository

class TrendService:
    def __init__(self, trend_repo=None):
        self.trend_repo = trend_repo or TrendRepository()

    def get_explorer_data(self):
        topics = self.trend_repo.get_trending_topics()
        history = self.trend_repo.get_trend_history()
        runtime = self.trend_repo.get_runtime_trends()
        return {
            "runtime_status": runtime,
            "topics": topics,
            "history": history
        }

    def get_trending_topics(self, category=None):
        topics = self.trend_repo.get_trending_topics()
        if category:
            return [t for t in topics if t.get("category", "").lower() == category.lower()]
        return topics

    def get_content_trends(self):
        topics = self.trend_repo.get_trending_topics()
        content_trends = [
            {
                "topic": t.get("topic_name"),
                "recommended_format": t.get("recommended_format"),
                "opportunity_score": t.get("opportunity_score"),
                "growth_rate_percent": t.get("growth_rate_percent")
            }
            for t in topics
        ]
        return content_trends

    def get_trend_history(self):
        return self.trend_repo.get_trend_history()

class RevenueCalculator:
    @staticmethod
    def calculate_rpm(revenue_usd, views):
        if not views or views <= 0:
            return 0.0
        return round((revenue_usd / views) * 1000, 2)

    @staticmethod
    def analyze_monetization(revenue_data):
        if not revenue_data:
            return {}

        summary = revenue_data.get("summary", {})
        sources = revenue_data.get("sources", [])
        monthly_trend = revenue_data.get("monthly_trend", [])

        top_stream = None
        if sources:
            top_stream = max(sources, key=lambda x: x.get("amount_usd", 0))

        return {
            "summary": summary,
            "top_revenue_stream": top_stream,
            "sources": sources,
            "monthly_trend": monthly_trend
        }

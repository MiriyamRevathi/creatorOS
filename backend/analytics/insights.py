class CreatorInsightGenerator:
    @staticmethod
    def generate_insights(content_analysis, engagement_analysis, growth_analysis, revenue_analysis, trends_data):
        insights = []

        # Content performance insight
        top_content = content_analysis.get("top_performing")
        if top_content:
            title = top_content.get("title", "")
            views = top_content.get("views", 0)
            insights.append({
                "id": "ins_001",
                "category": "Content Strategy",
                "type": "positive",
                "title": "High Performing Topic Identified",
                "description": f"Your video '{title}' generated {views:,} views. Content in this topic niche outperforms average uploads by 38%.",
                "actionable_recommendation": "Double down on AI agent tutorials and follow up with a Part 2 deep dive."
            })

        # Engagement insight
        avg_eng = engagement_analysis.get("average_engagement_rate", 0)
        if avg_eng > 10.0:
            insights.append({
                "id": "ins_002",
                "category": "Audience Engagement",
                "type": "positive",
                "title": "Strong Audience Retention & Interaction",
                "description": f"Your current engagement rate is {avg_eng}%, which is significantly higher than industry benchmark (6.5%).",
                "actionable_recommendation": "Maintain interactive pinned comment Q&As to encourage ongoing community discussion."
            })

        # Growth insight
        net_gain = growth_analysis.get("net_gain_30d", 0)
        if net_gain > 0:
            insights.append({
                "id": "ins_003",
                "category": "Channel Velocity",
                "type": "info",
                "title": "Positive Subscriber Growth Trajectory",
                "description": f"You gained {net_gain:,} net followers over the past 30 days.",
                "actionable_recommendation": "Leverage short vertical formats (Reels/Shorts) to expand top-of-funnel reach."
            })

        # Monetization insight
        top_revenue = revenue_analysis.get("top_revenue_stream")
        if top_revenue:
            stream_name = top_revenue.get("source", "")
            amount = top_revenue.get("amount_usd", 0)
            insights.append({
                "id": "ins_004",
                "category": "Monetization Optimization",
                "type": "positive",
                "title": f"Top Revenue Driver: {stream_name}",
                "description": f"Generates ${amount:,.2f} accounting for {top_revenue.get('percentage')}% of total earnings.",
                "actionable_recommendation": "Expand your digital product storefront offerings to increase high-margin sales."
            })

        return insights

# Analytics Calculation Engine Version 1.0.0

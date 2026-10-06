class EngagementCalculator:
    @staticmethod
    def calculate_engagement_rate(views, likes, comments, shares):
        if not views or views <= 0:
            return 0.0
        total_interactions = (likes or 0) + (comments or 0) + (shares or 0)
        return round((total_interactions / views) * 100, 2)

    @staticmethod
    def summarize_engagement_history(history_list):
        if not history_list:
            return {"avg_rate": 0.0, "total_interactions": 0}
        
        total_views = sum(item.get("views", 0) for item in history_list)
        total_likes = sum(item.get("likes", 0) for item in history_list)
        total_comments = sum(item.get("comments", 0) for item in history_list)
        total_shares = sum(item.get("shares", 0) for item in history_list)
        
        overall_rate = EngagementCalculator.calculate_engagement_rate(
            total_views, total_likes, total_comments, total_shares
        )
        
        return {
            "total_views": total_views,
            "total_likes": total_likes,
            "total_comments": total_comments,
            "total_shares": total_shares,
            "total_interactions": total_likes + total_comments + total_shares,
            "average_engagement_rate": overall_rate,
            "history": history_list
        }

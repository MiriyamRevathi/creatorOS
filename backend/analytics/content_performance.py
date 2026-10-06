class ContentPerformanceAnalyzer:
    @staticmethod
    def analyze_content_list(content_items):
        if not content_items:
            return {"top_performing": None, "format_breakdown": {}}

        sorted_items = sorted(content_items, key=lambda x: x.get("views", 0), reverse=True)
        top_item = sorted_items[0] if sorted_items else None

        format_summary = {}
        for item in content_items:
            fmt = item.get("format", "Unknown")
            if fmt not in format_summary:
                format_summary[fmt] = {"count": 0, "total_views": 0, "total_likes": 0, "total_revenue": 0.0}
            format_summary[fmt]["count"] += 1
            format_summary[fmt]["total_views"] += item.get("views", 0)
            format_summary[fmt]["total_likes"] += item.get("likes", 0)
            format_summary[fmt]["total_revenue"] += item.get("revenue_usd", 0.0)

        for fmt, stats in format_summary.items():
            stats["avg_views"] = round(stats["total_views"] / stats["count"], 1)
            stats["avg_revenue"] = round(stats["total_revenue"] / stats["count"], 2)

        return {
            "top_performing": top_item,
            "total_content_pieces": len(content_items),
            "format_breakdown": format_summary,
            "all_content": sorted_items
        }

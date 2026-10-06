class AudienceAnalyzer:
    @staticmethod
    def process_audience_demographics(demo_data):
        if not demo_data:
            return {}

        top_country = None
        if demo_data.get("top_countries"):
            top_country = max(demo_data["top_countries"], key=lambda x: x.get("percentage", 0))

        primary_age_group = None
        if demo_data.get("age_groups"):
            primary_age_group = max(demo_data["age_groups"], key=lambda x: x.get("percentage", 0))

        peak_hour = None
        if demo_data.get("peak_active_hours"):
            peak_hour = max(demo_data["peak_active_hours"], key=lambda x: x.get("activity_index", 0))

        return {
            "top_country": top_country,
            "primary_age_group": primary_age_group,
            "peak_active_hour": peak_hour,
            "full_demographics": demo_data
        }

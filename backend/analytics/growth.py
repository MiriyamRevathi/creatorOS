class GrowthCalculator:
    @staticmethod
    def calculate_growth_rate(current, previous):
        if not previous or previous <= 0:
            return 0.0
        return round(((current - previous) / previous) * 100, 2)

    @staticmethod
    def analyze_growth_trajectory(total_followers, growth_30d):
        prev_followers = max(0, total_followers - growth_30d)
        growth_rate_pct = GrowthCalculator.calculate_growth_rate(total_followers, prev_followers)
        daily_avg_gain = round(growth_30d / 30.0, 1)
        projected_60d = total_followers + (growth_30d * 2)

        return {
            "current_followers": total_followers,
            "net_gain_30d": growth_30d,
            "previous_followers_30d_ago": prev_followers,
            "growth_rate_percent": growth_rate_pct,
            "daily_average_gain": daily_avg_gain,
            "projected_followers_60d": projected_60d
        }

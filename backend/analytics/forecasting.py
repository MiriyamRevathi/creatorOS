class MetricForecaster:
    @staticmethod
    def linear_forecast(historical_values, periods_ahead=3):
        if not historical_values or len(historical_values) < 2:
            return [historical_values[-1]] * periods_ahead if historical_values else [0] * periods_ahead

        n = len(historical_values)
        x_vals = list(range(n))
        y_vals = historical_values

        mean_x = sum(x_vals) / n
        mean_y = sum(y_vals) / n

        numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_vals, y_vals))
        denominator = sum((x - mean_x) ** 2 for x in x_vals)

        slope = numerator / denominator if denominator != 0 else 0
        intercept = mean_y - (slope * mean_x)

        future_predictions = []
        for i in range(1, periods_ahead + 1):
            next_x = n - 1 + i
            pred = round(slope * next_x + intercept, 2)
            future_predictions.append(max(0.0, pred))

        return future_predictions

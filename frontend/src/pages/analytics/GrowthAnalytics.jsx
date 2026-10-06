import React from 'react';
import LineChart from '../../components/charts/LineChart';
import AreaChart from '../../components/charts/AreaChart';

export function GrowthAnalytics({ data }) {
  if (!data) return null;

  const {
    current_followers = 0,
    net_gain_30d = 0,
    growth_rate_percent = 0,
    daily_average_gain = 0,
    projected_followers_60d = 0,
    views_forecast_next_3_periods = []
  } = data;

  const forecastChartData = [
    { label: 'Current', value: current_followers },
    { label: '+30d Est', value: current_followers + net_gain_30d },
    { label: '+60d Est', value: projected_followers_60d },
    { label: '+90d Est', value: projected_followers_60d + net_gain_30d }
  ];

  const viewsForecastData = views_forecast_next_3_periods.map((val, i) => ({
    label: `Period +${i + 1}`,
    value: val
  }));

  return (
    <div className="space-y-6">
      {/* Velocity Header */}
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h2 className="font-bold text-brand-purple text-xl">Subscriber Growth & Channel Velocity</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Current Follower Base</span>
            <div className="text-2xl font-bold text-brand-purple mt-1">{current_followers.toLocaleString()}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">30-Day Net Gain</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">+{net_gain_30d.toLocaleString()}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">30-Day Growth Rate</span>
            <div className="text-2xl font-bold text-brand-slate mt-1">{growth_rate_percent}%</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Daily Velocity Average</span>
            <div className="text-2xl font-bold text-brand-coral mt-1">+{daily_average_gain} / day</div>
          </div>
        </div>
      </div>

      {/* Projections & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-brand-purple text-lg">Follower Trajectory Projection</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-medium">Linear Model</span>
          </div>
          <AreaChart data={forecastChartData} xKey="label" yKey="value" color="#412653" label="Followers" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-brand-purple text-lg">Views Predictive Forecast</h3>
            <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-1 rounded font-medium">Regression Model</span>
          </div>
          <LineChart data={viewsForecastData} xKey="label" yKey="value" color="#E0563F" label="Predicted Views" />
        </div>
      </div>
    </div>
  );
}

export default GrowthAnalytics;

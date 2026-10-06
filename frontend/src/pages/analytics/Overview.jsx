import React from 'react';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

export function Overview({ data }) {
  if (!data) return null;

  const { kpis, growth, content, engagement, revenue, insights } = data;

  const kpiCards = [
    { label: "Total Subscribers & Followers", value: (kpis.total_followers || 0).toLocaleString(), change: `+${growth.net_gain_30d || 0} (30d)`, isPositive: true },
    { label: "Monthly Content Views", value: (kpis.total_views_30d || 0).toLocaleString(), change: `+${kpis.views_growth_percent || 0}%`, isPositive: true },
    { label: "Avg Engagement Rate", value: `${kpis.avg_engagement_rate || 0}%`, change: "Top 5% Niche Benchmark", isPositive: true },
    { label: "Total 30-Day Revenue", value: `$${(kpis.total_revenue_30d || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, change: `+${kpis.revenue_growth_percent || 0}% MoM`, isPositive: true }
  ];

  const engagementTrendData = (engagement.history || []).map(item => ({
    label: item.date.slice(5),
    value: item.views,
    rate: item.engagement_rate
  }));

  const formatData = Object.entries(content.format_breakdown || {}).map(([fmt, stats]) => ({
    label: fmt,
    value: stats.total_views
  }));

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-brand-border shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-brand-slate uppercase tracking-wider">{card.label}</span>
            <div className="text-2xl font-bold text-brand-purple mt-2 mb-1">{card.value}</div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span>↑</span>
              <span>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-brand-border shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-brand-purple text-lg">Cross-Platform View Trajectory</h3>
              <p className="text-xs text-gray-500">Historical views over the past 30 days</p>
            </div>
            <span className="text-xs px-3 py-1 bg-brand-muted text-brand-purple font-medium rounded-full">Updated Daily</span>
          </div>
          <LineChart data={engagementTrendData} xKey="label" yKey="value" color="#412653" label="Views" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-border shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-brand-purple text-lg">Format Distribution</h3>
            <p className="text-xs text-gray-500">View contribution by content format</p>
          </div>
          <PieChart data={formatData} nameKey="label" valueKey="value" size={190} />
        </div>
      </div>

      {/* Explainable Creator Insights Section */}
      <div className="bg-gradient-to-br from-brand-purple via-[#4e2f63] to-brand-slate text-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-bold text-lg text-white">Explainable Creator Insights</h3>
          </div>
          <span className="text-xs bg-brand-lavender/20 text-brand-lavender px-3 py-1 rounded-full border border-brand-lavender/30">AI Analytics Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {insights.map((ins) => (
            <div key={ins.id} className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-lavender text-brand-purple">{ins.category}</span>
                <span className="text-xs text-brand-lavender">{ins.type}</span>
              </div>
              <h4 className="font-semibold text-sm text-white">{ins.title}</h4>
              <p className="text-xs text-purple-100 leading-relaxed">{ins.description}</p>
              <div className="text-xs bg-black/20 p-2.5 rounded text-white font-medium flex items-start gap-2">
                <span className="text-brand-coral font-bold">💡 Tip:</span>
                <span>{ins.actionable_recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;

import React from 'react';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';

export function RevenueAnalytics({ data }) {
  if (!data) return null;

  const { summary = {}, sources = [], monthly_trend = [] } = data;

  const pieData = sources.map(s => ({
    label: s.source,
    value: s.amount_usd
  }));

  const barData = monthly_trend.map(m => ({
    label: m.month.split(' ')[0],
    value: m.revenue
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h2 className="font-bold text-brand-purple text-xl">Revenue & Monetization Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Total Lifetime Earnings</span>
            <div className="text-2xl font-bold text-brand-purple mt-1">${(summary.total_revenue_usd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Monthly Recurring Revenue</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">${(summary.monthly_recurring_revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Average RPM</span>
            <div className="text-2xl font-bold text-brand-slate mt-1">${(summary.average_rpm || 0).toFixed(2)} / 1k views</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">MoM Revenue Growth</span>
            <div className="text-2xl font-bold text-brand-coral mt-1">+{summary.growth_rate_mom}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-lg">Revenue Streams Breakdown</h3>
          <PieChart data={pieData} nameKey="label" valueKey="value" size={210} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-lg">Monthly Revenue Trajectory ($)</h3>
          <BarChart data={barData} xKey="label" yKey="value" color="#412653" label="Revenue ($)" />
        </div>
      </div>
    </div>
  );
}

export default RevenueAnalytics;

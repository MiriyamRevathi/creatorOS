import React, { useState } from 'react';
import BarChart from '../../components/charts/BarChart';

export function ContentAnalytics({ data }) {
  const [selectedFormat, setSelectedFormat] = useState('All');

  if (!data) return null;

  const { all_content = [], format_breakdown = {} } = data;

  const formats = ['All', ...Object.keys(format_breakdown)];

  const filteredContent = selectedFormat === 'All'
    ? all_content
    : all_content.filter(item => item.format === selectedFormat);

  const barChartData = filteredContent.map(item => ({
    label: item.title.length > 20 ? item.title.slice(0, 18) + '...' : item.title,
    value: item.views
  }));

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-brand-border">
        <div>
          <h2 className="font-bold text-brand-purple text-xl">Content Performance Analytics</h2>
          <p className="text-xs text-gray-500">Track views, watch time, CTR, and retention across formats</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">Filter Format:</span>
          <div className="flex gap-1 bg-brand-muted p-1 rounded-lg">
            {formats.map(fmt => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedFormat === fmt
                    ? 'bg-brand-purple text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-purple'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Format Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(format_breakdown).map(([fmt, stats]) => (
          <div key={fmt} className="bg-white p-4 rounded-xl border border-brand-border space-y-2">
            <span className="text-xs font-semibold text-brand-slate">{fmt}</span>
            <div className="text-xl font-bold text-brand-purple">{stats.total_views.toLocaleString()} views</div>
            <div className="text-xs text-gray-500">Avg {stats.avg_views.toLocaleString()} per upload</div>
          </div>
        ))}
      </div>

      {/* Views Comparison Chart */}
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h3 className="font-bold text-brand-purple text-lg">Upload Views Ranking</h3>
        <BarChart data={barChartData} xKey="label" yKey="value" color="#3F567F" label="Views" />
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-brand-border">
          <h3 className="font-bold text-brand-purple text-base">Detailed Content Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-muted text-brand-purple uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-3">Content Title</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Likes</th>
                <th className="px-4 py-3">CTR</th>
                <th className="px-4 py-3">Retention (30s)</th>
                <th className="px-6 py-3 text-right">Est. Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContent.map(item => (
                <tr key={item.content_id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                  <td className="px-4 py-4 text-brand-slate font-medium">{item.format}</td>
                  <td className="px-4 py-4 text-gray-600">{item.platform}</td>
                  <td className="px-4 py-4 font-semibold text-brand-purple">{item.views.toLocaleString()}</td>
                  <td className="px-4 py-4 text-gray-600">{item.likes.toLocaleString()}</td>
                  <td className="px-4 py-4 font-medium text-emerald-600">{item.ctr_percent}%</td>
                  <td className="px-4 py-4 text-gray-600">{item.retention_rate_30s}%</td>
                  <td className="px-6 py-4 font-bold text-brand-purple text-right">${item.revenue_usd.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContentAnalytics;

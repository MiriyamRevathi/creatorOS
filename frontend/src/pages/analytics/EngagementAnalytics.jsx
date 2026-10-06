import React from 'react';
import LineChart from '../../components/charts/LineChart';
import RadarChart from '../../components/charts/RadarChart';

export function EngagementAnalytics({ data }) {
  if (!data) return null;

  const {
    total_views = 0,
    total_likes = 0,
    total_comments = 0,
    total_shares = 0,
    average_engagement_rate = 0,
    history = []
  } = data;

  const historyData = history.map(item => ({
    label: item.date.slice(5),
    value: item.engagement_rate
  }));

  const radarData = [
    { axis: 'Likes Ratio', value: total_views > 0 ? (total_likes / total_views) * 1000 : 0 },
    { axis: 'Comments Ratio', value: total_views > 0 ? (total_comments / total_views) * 5000 : 0 },
    { axis: 'Shares Velocity', value: total_views > 0 ? (total_shares / total_views) * 5000 : 0 },
    { axis: 'Virality Index', value: 88 },
    { axis: 'Community Score', value: 92 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h2 className="font-bold text-brand-purple text-xl">Audience Interaction & Engagement Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Average Engagement Rate</span>
            <div className="text-2xl font-bold text-brand-purple mt-1">{average_engagement_rate}%</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Total Likes</span>
            <div className="text-2xl font-bold text-brand-slate mt-1">{total_likes.toLocaleString()}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Total Comments</span>
            <div className="text-2xl font-bold text-brand-lavender mt-1">{total_comments.toLocaleString()}</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Total Shares</span>
            <div className="text-2xl font-bold text-brand-coral mt-1">{total_shares.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-lg">Engagement Rate Trend (%)</h3>
          <LineChart data={historyData} xKey="label" yKey="value" color="#D174D2" label="Engagement Rate %" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-lg">Interaction Balance Radar</h3>
          <RadarChart data={radarData} keyName="axis" valName="value" size={240} />
        </div>
      </div>
    </div>
  );
}

export default EngagementAnalytics;

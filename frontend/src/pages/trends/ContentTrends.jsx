import React from 'react';
import BarChart from '../../components/charts/BarChart';

export function ContentTrends({ data }) {
  const safeData = Array.isArray(data) ? data : (data?.content || data?.topics || []);

  if (!safeData || safeData.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl border border-brand-border text-center text-gray-500 text-sm">
        No content format trends data available.
      </div>
    );
  }

  const chartData = safeData.map(item => {
    const topicText = item?.topic || item?.topic_name || 'Content Topic';
    return {
      label: topicText.length > 18 ? topicText.slice(0, 16) + '...' : topicText,
      value: item?.opportunity_score || 0
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-2">
        <h3 className="font-bold text-brand-purple text-xl">Content Format Trends & Recommendations</h3>
        <p className="text-xs text-gray-500">Discover which content styles are currently experiencing breakout audience demand</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h4 className="font-bold text-brand-purple text-base">Format Opportunity Rankings</h4>
        <BarChart data={chartData} xKey="label" yKey="value" color="#D174D2" label="Opportunity Score" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {safeData.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-brand-border space-y-2 shadow-sm">
            <span className="text-xs font-semibold text-brand-slate uppercase">{item?.recommended_format || 'Recommended Format'}</span>
            <h5 className="font-bold text-brand-purple text-sm">{item?.topic || item?.topic_name || 'Topic'}</h5>
            <div className="flex justify-between items-center text-xs pt-2 text-emerald-600 font-bold border-t border-gray-100">
              <span>Growth: +{item?.growth_rate_percent || 0}%</span>
              <span>Score: {item?.opportunity_score || 0}/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentTrends;

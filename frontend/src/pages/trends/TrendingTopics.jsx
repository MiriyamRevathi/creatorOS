import React, { useState } from 'react';

export function TrendingTopics({ data }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const safeData = Array.isArray(data) ? data : (data?.topics || []);

  if (!safeData || safeData.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl border border-brand-border text-center text-gray-500 text-sm">
        No trending topics data available.
      </div>
    );
  }

  const categories = ['All', ...new Set(safeData.map(t => t?.category).filter(Boolean))];

  const filteredTopics = selectedCategory === 'All'
    ? safeData
    : safeData.filter(t => t?.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-brand-border shadow-sm">
        <div>
          <h3 className="font-bold text-brand-purple text-lg">Trending Topics Intelligence</h3>
          <p className="text-xs text-gray-500">Niche virality index, opportunity scores, and recommended formats</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-brand-muted p-1 rounded-lg">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-purple text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-purple'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Trending Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTopics.map((topic, idx) => (
          <div key={topic?.topic_id || idx} className="bg-white p-5 rounded-xl border border-brand-border shadow-sm space-y-3 hover:border-brand-lavender transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-slate px-2 py-0.5 rounded bg-brand-muted">{topic?.category || 'Category'}</span>
                <h4 className="font-bold text-brand-purple text-base mt-1">{topic?.topic_name || topic?.topic || 'Topic'}</h4>
              </div>
              <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-emerald-100 text-emerald-800">
                Score: {topic?.opportunity_score || 0}/100
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-xs">
              <div>
                <span className="text-[10px] text-gray-400">Search Volume</span>
                <div className="font-bold text-gray-800">{topic?.search_volume_index || 0}/100</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Growth Rate</span>
                <div className="font-bold text-emerald-600">+{topic?.growth_rate_percent || 0}%</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Competition</span>
                <div className="font-bold text-brand-slate">{topic?.competition_level || 'Medium'}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-500 font-medium">Platform: <strong className="text-gray-900">{topic?.platform || 'Multi-platform'}</strong></span>
              <span className="text-brand-coral font-bold bg-orange-50 px-2 py-1 rounded">💡 {topic?.recommended_format || 'Recommended Format'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingTopics;

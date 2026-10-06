import React, { useState } from 'react';
import { useTrends } from '../../hooks/useTrends';
import TrendingTopics from './TrendingTopics';
import ContentTrends from './ContentTrends';
import TrendHistory from './TrendHistory';

export default function TrendExplorer() {
  const [activeTab, setActiveTab] = useState('topics');
  const { data, loading, error, refresh } = useTrends(activeTab);

  const tabs = [
    { id: 'topics', label: '🔥 Trending Topics' },
    { id: 'content', label: '📊 Content Format Trends' },
    { id: 'history', label: '📜 Historical Cycles' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-brand-border shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-purple tracking-tight">Creator Trend Intelligence Explorer</h1>
          <p className="text-xs text-gray-500 mt-1">Real-time niche topic velocity, opportunity scores, and viral content patterns</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 bg-brand-purple hover:bg-[#341d43] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <span>🔄</span>
          <span>Refresh Trends</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex gap-2 border-b border-brand-border pb-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-brand-purple text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-brand-muted hover:text-brand-purple border border-brand-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="min-h-[250px] flex flex-col items-center justify-center bg-white rounded-xl border border-brand-border space-y-3 shadow-sm">
          <div className="w-8 h-8 border-4 border-brand-lavender border-t-brand-purple rounded-full animate-spin" />
          <span className="text-xs font-medium text-brand-slate">Analyzing Trend Intelligence...</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center justify-between">
          <span>Error loading trends: {error}</span>
          <button onClick={refresh} className="px-3 py-1 bg-red-600 text-white rounded font-bold">Retry</button>
        </div>
      ) : (
        <div>
          {activeTab === 'topics' && <TrendingTopics data={data} />}
          {activeTab === 'content' && <ContentTrends data={data} />}
          {activeTab === 'history' && <TrendHistory data={data} />}
        </div>
      )}
    </div>
  );
}

// Trend Explorer Version 1.0.0

import React, { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import Overview from './Overview';
import ContentAnalytics from './ContentAnalytics';
import AudienceAnalytics from './AudienceAnalytics';
import GrowthAnalytics from './GrowthAnalytics';
import EngagementAnalytics from './EngagementAnalytics';
import RevenueAnalytics from './RevenueAnalytics';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data, loading, error, refresh } = useAnalytics(activeTab);

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'content', label: '🎬 Content Analytics' },
    { id: 'audience', label: '👥 Audience Demographics' },
    { id: 'growth', label: '📈 Growth & Projections' },
    { id: 'engagement', label: '💬 Engagement' },
    { id: 'revenue', label: '💰 Monetization & Revenue' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-brand-border shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-purple tracking-tight">Creator Analytics Hub</h1>
          <p className="text-xs text-gray-500 mt-1">Unified cross-platform intelligence, metrics calculations, and growth insights</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 bg-brand-purple hover:bg-[#341d43] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <span>🔄</span>
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-brand-border pb-1 custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
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
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl border border-brand-border space-y-3">
          <div className="w-8 h-8 border-4 border-brand-lavender border-t-brand-purple rounded-full animate-spin" />
          <span className="text-xs font-medium text-brand-slate">Calculating Creator Analytics...</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center justify-between">
          <span>Error: {error}</span>
          <button onClick={refresh} className="px-3 py-1 bg-red-600 text-white rounded font-bold">Retry</button>
        </div>
      ) : (
        <div>
          {activeTab === 'overview' && <Overview data={data} />}
          {activeTab === 'content' && <ContentAnalytics data={data} />}
          {activeTab === 'audience' && <AudienceAnalytics data={data} />}
          {activeTab === 'growth' && <GrowthAnalytics data={data} />}
          {activeTab === 'engagement' && <EngagementAnalytics data={data} />}
          {activeTab === 'revenue' && <RevenueAnalytics data={data} />}
        </div>
      )}
    </div>
  );
}

// Analytics Dashboard Version 1.0.0

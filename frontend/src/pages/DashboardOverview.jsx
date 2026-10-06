import React, { useState, useEffect } from 'react';
import { ideasService } from '../services/ideasService';
import { contentService } from '../services/contentService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Lightbulb,
  PenTool,
  Library,
  ArrowRight,
  TrendingUp,
  Clock,
  Send,
  Sparkles,
  Layers,
  FileCheck2,
} from 'lucide-react';

export function DashboardOverview({
  onNavigateToIdeas,
  onNavigateToStudio,
  onNavigateToLibrary,
  onOpenContentInStudio,
}) {
  const [ideasStats, setIdeasStats] = useState(null);
  const [contentStats, setContentStats] = useState(null);
  const [recentContent, setRecentContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        setLoading(true);
        const [iStats, cStats, cList] = await Promise.all([
          ideasService.getStats(),
          contentService.getStats(),
          contentService.getContentList({ sort_by: 'updated_at', sort_order: 'desc' }),
        ]);
        setIdeasStats(iStats);
        setContentStats(cStats);
        setRecentContent(cList.slice(0, 4));
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    loadOverviewData();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#412653] to-[#3F567F] rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full text-purple-100">
              Contributor 2 Workspace
            </span>
            <span className="text-xs text-purple-200">• CreatorOS Platform</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ideas, Content Studio & Library
          </h2>
          <p className="text-xs text-purple-100 max-w-xl leading-relaxed">
            Welcome back. Manage your creative funnel from raw brainstorm to multi-platform publishing with zero database overhead.
          </p>
        </div>

        {/* Quick Launch Actions */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToIdeas}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>New Idea</span>
          </Button>

          <Button
            variant="action"
            size="sm"
            onClick={onNavigateToStudio}
            className="text-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open Studio</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Ideas */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Idea Vault</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {ideasStats?.total || 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {ideasStats?.planned_count || 0} planned
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#f4eef7] text-[#412653]">
            <Lightbulb className="h-6 w-6" />
          </div>
        </div>

        {/* Studio Drafts */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">In Production</span>
            <h3 className="text-2xl font-bold text-amber-700 mt-1">
              {(contentStats?.draft_count || 0) + (contentStats?.in_review_count || 0)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Drafts & in review</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
            <PenTool className="h-6 w-6" />
          </div>
        </div>

        {/* Scheduled / Ready */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Scheduled</span>
            <h3 className="text-2xl font-bold text-cyan-700 mt-1">
              {contentStats?.scheduled_count || 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Upcoming releases</p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-700">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* Published Assets */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Published</span>
            <h3 className="text-2xl font-bold text-emerald-700 mt-1">
              {contentStats?.published_count || 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Live across platforms</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
            <Send className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline + Recent Content & Format Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Funnel + Recent Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Creator Lifecycle Stepper */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#412653]" />
                Creator Funnel Lifecycle
              </h3>
              <span className="text-xs text-slate-400">Contributor 2 Stage</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div
                onClick={onNavigateToIdeas}
                className="p-3.5 rounded-xl border border-purple-100 bg-[#f4eef7]/50 hover:bg-[#f4eef7] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#412653] uppercase">1. Brainstorm</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#412653] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-base font-bold text-slate-900 mt-2">Idea Vault</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {ideasStats?.backlog_count || 0} backlog concepts ready for planning
                </p>
              </div>

              <div
                onClick={onNavigateToStudio}
                className="p-3.5 rounded-xl border border-blue-100 bg-[#edf2f9]/50 hover:bg-[#edf2f9] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#3F567F] uppercase">2. Script & Draft</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#3F567F] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-base font-bold text-slate-900 mt-2">Content Studio</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-platform preview and offline assistant
                </p>
              </div>

              <div
                onClick={onNavigateToLibrary}
                className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase">3. Archive & Assets</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-800 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-base font-bold text-slate-900 mt-2">Content Library</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {contentStats?.total || 0} saved assets ready for repurposing
                </p>
              </div>
            </div>
          </div>

          {/* Recently Updated Content */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-[#3F567F]" />
                Recently Edited Content
              </h3>
              <button
                onClick={onNavigateToLibrary}
                className="text-xs font-semibold text-[#412653] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentContent.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="text-slate-600 font-medium">{item.platform}</span>
                      <span>•</span>
                      <span>{item.content_type}</span>
                      <span>•</span>
                      <span>{item.metadata?.word_count || 0} words</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={item.status}>{item.status}</Badge>
                    <button
                      onClick={() => onOpenContentInStudio(item)}
                      className="text-xs font-semibold text-[#412653] hover:text-[#321d40] px-2 py-1 bg-[#f4eef7] rounded hover:bg-[#ebdcf0] transition-colors"
                    >
                      Studio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Format distribution & Architecture */}
        <div className="lg:col-span-4 space-y-6">
          {/* Content by Format Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#412653]" />
              Content by Format
            </h3>

            {contentStats?.by_content_type && (
              <div className="space-y-2.5">
                {Object.entries(contentStats.by_content_type).map(([type, count]) => {
                  const percentage = contentStats.total > 0
                    ? Math.round((count / contentStats.total) * 100)
                    : 0;
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{type}</span>
                        <span className="text-slate-400 font-mono">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#412653] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Clean Architecture Info Box */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Repository & Data Layer
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Operating with file-based JSON persistence in <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-[#412653] font-mono">data/ideas/</code> and <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-[#412653] font-mono">data/content/</code>. Zero external databases or API keys required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

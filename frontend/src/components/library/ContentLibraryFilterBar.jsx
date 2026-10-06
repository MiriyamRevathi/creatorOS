import React from 'react';
import { Search, LayoutGrid, List, Filter } from 'lucide-react';

const STATUSES = ['All', 'Draft', 'In Review', 'Scheduled', 'Published', 'Archived'];
const PLATFORMS = ['All', 'YouTube', 'Instagram', 'LinkedIn', 'TikTok', 'Twitter/X', 'Substack', 'Medium', 'Other'];
const CONTENT_TYPES = ['All', 'Video', 'Short', 'Reel', 'Post', 'Blog', 'Podcast', 'Newsletter', 'Other'];

export function ContentLibraryFilterBar({
  filters,
  onChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved content, scripts, tags..."
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] focus:bg-white"
          />
        </div>

        {/* Dropdowns & View Mode */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Platform */}
          <select
            value={filters.platform || 'All'}
            onChange={(e) => onChange({ ...filters, platform: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#412653]"
          >
            <option disabled value="">Platform</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Platforms' : p}
              </option>
            ))}
          </select>

          {/* Format */}
          <select
            value={filters.content_type || 'All'}
            onChange={(e) => onChange({ ...filters, content_type: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#412653]"
          >
            <option disabled value="">Format</option>
            {CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All Formats' : t}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sort_by || 'updated_at'}
            onChange={(e) => onChange({ ...filters, sort_by: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#412653]"
          >
            <option value="updated_at">Recently Edited</option>
            <option value="created_at">Date Created</option>
            <option value="title">Title (A-Z)</option>
            <option value="target_date">Target Date</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid'
                  ? 'bg-white text-[#412653] shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1 rounded ${
                viewMode === 'table'
                  ? 'bg-white text-[#412653] shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table / List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100">
        {STATUSES.map((st) => {
          const isSelected = (filters.status || 'All') === st;
          return (
            <button
              key={st}
              onClick={() => onChange({ ...filters, status: st })}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                isSelected
                  ? 'bg-[#412653] text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          );
        })}
      </div>
    </div>
  );
}

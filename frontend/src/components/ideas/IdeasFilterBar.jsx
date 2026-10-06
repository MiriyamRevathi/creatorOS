import React from 'react';
import { Search, LayoutGrid, Columns, Filter } from 'lucide-react';

const CONTENT_TYPES = ['All', 'Video', 'Short', 'Reel', 'Post', 'Blog', 'Podcast', 'Newsletter', 'Other'];
const PRIORITIES = ['All', 'Urgent', 'High', 'Medium', 'Low'];
const STATUSES = ['All', 'Backlog', 'Planned', 'In Progress', 'Published', 'Archived'];

export function IdeasFilterBar({
  filters,
  onChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
      {/* Top row: search & dropdowns & view mode */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ideas, topics, tags..."
            value={filters.search || ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Content Type */}
          <select
            value={filters.content_type || 'All'}
            onChange={(e) => onChange({ ...filters, content_type: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#412653]"
          >
            <option disabled value="">Format</option>
            {CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All Formats' : t}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={filters.priority || 'All'}
            onChange={(e) => onChange({ ...filters, priority: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#412653]"
          >
            <option disabled value="">Priority</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Priorities' : p}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={filters.sort_by || 'created_at'}
            onChange={(e) => onChange({ ...filters, sort_by: e.target.value })}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#412653]"
          >
            <option value="created_at">Newest First</option>
            <option value="priority">By Priority</option>
            <option value="title">By Title (A-Z)</option>
            <option value="target_date">By Target Date</option>
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
              onClick={() => onViewModeChange('kanban')}
              className={`p-1 rounded ${
                viewMode === 'kanban'
                  ? 'bg-white text-[#412653] shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Kanban Board View"
            >
              <Columns className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status tabs (only shown in grid view for fast filtering) */}
      {viewMode === 'grid' && (
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
      )}
    </div>
  );
}

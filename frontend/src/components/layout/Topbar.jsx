import React from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export function Topbar({
  title,
  subtitle,
  onNewIdea,
  onNewContent,
  searchQuery,
  onSearchChange,
  showSearch = true,
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] focus:bg-white transition-all"
            />
          </div>
        )}

        {onNewIdea && (
          <Button
            variant="outline"
            size="sm"
            onClick={onNewIdea}
            className="text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Idea</span>
          </Button>
        )}

        {onNewContent && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNewContent}
            className="text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open Studio</span>
          </Button>
        )}
      </div>
    </header>
  );
}

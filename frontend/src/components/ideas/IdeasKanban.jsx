import React from 'react';
import { IdeaCard } from './IdeaCard';
import { Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'Backlog', label: 'Backlog', color: 'bg-slate-100 text-slate-700' },
  { id: 'Planned', label: 'Planned', color: 'bg-indigo-50 text-indigo-700' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-purple-50 text-purple-700' },
  { id: 'Published', label: 'Published', color: 'bg-emerald-50 text-emerald-700' },
  { id: 'Archived', label: 'Archived', color: 'bg-zinc-100 text-zinc-600' },
];

export function IdeasKanban({
  ideas,
  onEdit,
  onDelete,
  onConvert,
  onQuickAdd,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
      {COLUMNS.map((col) => {
        const colIdeas = ideas.filter(
          (i) => (i.status || 'Backlog').toLowerCase() === col.id.toLowerCase()
        );

        return (
          <div
            key={col.id}
            className="bg-slate-100/60 rounded-xl p-3 border border-slate-200/70 min-h-[500px] flex flex-col"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {col.label}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${col.color}`}
                >
                  {colIdeas.length}
                </span>
              </div>
              <button
                onClick={() => onQuickAdd(col.id)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title={`Add Idea to ${col.label}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-3 flex-1">
              {colIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onConvert={onConvert}
                />
              ))}

              {colIdeas.length === 0 && (
                <div className="h-28 flex items-center justify-center border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs italic">
                  No ideas in {col.label}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

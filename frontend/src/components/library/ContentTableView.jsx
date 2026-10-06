import React from 'react';
import { Badge } from '../common/Badge';
import { Edit3, Trash2, Archive, Calendar, Clock } from 'lucide-react';

export function ContentTableView({ items, onOpenInStudio, onDelete, onArchive }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4">Format</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Length</th>
              <th className="py-3 px-4">Schedule</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                {/* Content Title */}
                <td className="py-3 px-4 max-w-xs">
                  <p className="font-semibold text-slate-900 group-hover:text-[#412653] truncate">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
                  )}
                </td>

                {/* Platform */}
                <td className="py-3 px-4 font-medium text-slate-700">
                  {item.platform}
                </td>

                {/* Format */}
                <td className="py-3 px-4 text-slate-600">
                  {item.content_type}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <Badge variant={item.status}>{item.status}</Badge>
                </td>

                {/* Word count */}
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                  {item.metadata?.word_count || 0}w (~{item.metadata?.reading_time_minutes || 1}m)
                </td>

                {/* Target Date */}
                <td className="py-3 px-4 text-slate-500 text-[11px]">
                  {item.target_date || item.published_date?.slice(0, 10) || '—'}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenInStudio(item)}
                      className="p-1 rounded text-slate-400 hover:text-[#412653] hover:bg-slate-100"
                      title="Open in Studio"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    {onArchive && item.status !== 'Archived' && (
                      <button
                        onClick={() => onArchive(item)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        title="Archive"
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

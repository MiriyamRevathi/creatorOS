import React from 'react';
import {
  Calendar,
  Tag,
  ArrowRight,
  MoreVertical,
  Edit2,
  Trash2,
  Video,
  FileText,
  Mic,
  Mail,
  Layers,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { InstagramIcon } from '../common/PlatformIcons';

const CONTENT_TYPE_ICONS = {
  Video: Video,
  Short: Video,
  Reel: InstagramIcon,
  Post: FileText,
  Blog: FileText,
  Podcast: Mic,
  Newsletter: Mail,
  Other: Layers,
};

export function IdeaCard({ idea, onEdit, onDelete, onConvert }) {
  const Icon = CONTENT_TYPE_ICONS[idea.content_type] || Layers;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top bar: Type + Priority */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#412653] bg-[#f4eef7] px-2 py-0.5 rounded-md">
            <Icon className="h-3 w-3" />
            {idea.content_type}
          </span>
          <Badge variant={idea.priority}>{idea.priority}</Badge>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#412653] transition-colors line-clamp-2">
          {idea.title}
        </h4>

        {/* Description / Notes */}
        {idea.description && (
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {idea.description}
          </p>
        )}

        {/* Tags */}
        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Meta & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          {idea.target_date ? (
            <span className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
              <Calendar className="h-3 w-3" />
              {idea.target_date}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">No target date</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onConvert(idea)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#412653] hover:text-[#321d40] px-2 py-1 rounded bg-[#f4eef7] hover:bg-[#ebdcf0] transition-colors"
            title="Convert this idea into Content Studio draft"
          >
            <span>Studio</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <button
            onClick={() => onEdit(idea)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Edit Idea"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => onDelete(idea)}
            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Idea"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

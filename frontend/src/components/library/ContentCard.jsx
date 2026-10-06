import React from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  Edit3,
  Trash2,
  FileText,
  Archive,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from '../common/PlatformIcons';

const PLATFORM_ICONS = {
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
  TikTok: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Substack: FileText,
  Medium: FileText,
  Other: FileText,
};

export function ContentCard({ content, onOpenInStudio, onDelete, onArchive }) {
  const PlatformIcon = PLATFORM_ICONS[content.platform] || FileText;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
      {/* Thumbnail or platform banner */}
      {content.thumbnail_url ? (
        <div className="h-36 bg-slate-900 overflow-hidden relative">
          <img
            src={content.thumbnail_url}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            <PlatformIcon className="h-3 w-3" />
            <span>{content.platform}</span>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant={content.status}>{content.status}</Badge>
          </div>
        </div>
      ) : (
        <div className="h-14 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-100 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#3F567F]">
              <PlatformIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-slate-700">{content.platform}</span>
            <span className="text-[10px] text-slate-400">• {content.content_type}</span>
          </div>
          <Badge variant={content.status}>{content.status}</Badge>
        </div>
      )}

      {/* Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#412653] transition-colors line-clamp-2">
            {content.title}
          </h4>

          {content.description && (
            <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {content.description}
            </p>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {content.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"
                >
                  #{t}
                </span>
              ))}
              {content.tags.length > 4 && (
                <span className="text-[10px] text-slate-400">+{content.tags.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Metadata info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>{content.metadata?.word_count || 0} words</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {content.metadata?.reading_time_minutes || 1}m
            </span>
          </div>

          {content.target_date && (
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="h-3 w-3" />
              {content.target_date}
            </span>
          )}
        </div>
      </div>

      {/* Footer action buttons */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => onOpenInStudio(content)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#412653] hover:text-[#321d40]"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Open in Studio</span>
        </button>

        <div className="flex items-center gap-1">
          {onArchive && content.status !== 'Archived' && (
            <button
              onClick={() => onArchive(content)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
              title="Archive Item"
            >
              <Archive className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            onClick={() => onDelete(content)}
            className="p-1 text-slate-400 hover:text-rose-600 rounded"
            title="Delete Content"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

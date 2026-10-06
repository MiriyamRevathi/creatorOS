import React from 'react';
import {
  FileText,
  Mail,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
} from 'lucide-react';
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from '../common/PlatformIcons';

export function ContentPreview({
  title,
  body,
  platform = 'YouTube',
  contentType = 'Video',
  thumbnailUrl,
  tags = [],
}) {
  const cleanBody = body || 'Start typing your content in the editor to see live formatted preview here...';

  if (platform === 'YouTube') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* YouTube Video Mockup */}
        <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <YouTubeIcon className="h-12 w-12 text-rose-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">16:9 Video Player Simulation</p>
            </div>
          )}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
            10:24
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
            {title || 'Untitled YouTube Video'}
          </h3>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#412653] text-white flex items-center justify-center font-bold text-xs">
              C
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">CreatorOS Studio</p>
              <p className="text-[10px] text-slate-400">125K subscribers</p>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
            {cleanBody}
          </div>
        </div>
      </div>
    );
  }

  if (platform === 'Instagram' || platform === 'TikTok') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-100">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-purple-900">
              C
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-900">creator_os</span>
        </div>

        {/* Media simulation */}
        <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center overflow-hidden relative">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="Post preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <InstagramIcon className="h-10 w-10 text-rose-500 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">9:16 Vertical Reel Frame</p>
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
              <MessageCircle className="h-5 w-5 hover:text-blue-500 cursor-pointer" />
              <Share2 className="h-5 w-5 cursor-pointer" />
            </div>
            <Bookmark className="h-5 w-5 cursor-pointer" />
          </div>

          <div className="text-xs text-slate-800 leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap">
            <span className="font-semibold mr-1.5">creator_os</span>
            {cleanBody}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tags.map((t) => (
                <span key={t} className="text-[11px] text-blue-600">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (platform === 'LinkedIn') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
        {/* Author info */}
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full bg-[#3F567F] text-white flex items-center justify-center font-bold text-xs">
            C2
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Contributor 2 — CreatorOS</h4>
            <p className="text-[10px] text-slate-500">Full-Stack Content Creator & Systems Engineer</p>
            <p className="text-[9px] text-slate-400">Just now • Edited</p>
          </div>
        </div>

        {/* Body content */}
        <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-sans">
          {cleanBody}
        </div>

        {/* Engagement summary */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button className="flex items-center gap-1.5 hover:text-blue-600">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-600">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-600">
            <Share2 className="h-3.5 w-3.5" />
            <span>Repost</span>
          </button>
        </div>
      </div>
    );
  }

  // Default: Blog / Newsletter
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="border-b border-slate-100 pb-3">
        <span className="text-[10px] uppercase font-bold text-[#412653] bg-[#f4eef7] px-2 py-0.5 rounded">
          {contentType} • {platform}
        </span>
        <h2 className="text-lg font-bold text-slate-900 mt-2">
          {title || 'Untitled Article'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">Published by CreatorOS Writer • 4 min read</p>
      </div>

      <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto font-serif">
        {cleanBody}
      </div>
    </div>
  );
}

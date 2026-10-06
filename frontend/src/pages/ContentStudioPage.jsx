import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { ContentPreview } from '../components/studio/ContentPreview';
import { LocalAssistantDrawer } from '../components/studio/LocalAssistantDrawer';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Save,
  Send,
  Eye,
  Sparkles,
  Calendar,
  Image,
  Tag,
  Clock,
  FileText,
  CheckCircle,
  Plus,
  X,
  ArrowLeft,
} from 'lucide-react';

const PLATFORMS = [
  'YouTube',
  'Instagram',
  'LinkedIn',
  'TikTok',
  'Twitter/X',
  'Substack',
  'Medium',
  'Other',
];

const CONTENT_TYPES = [
  'Video',
  'Short',
  'Reel',
  'Post',
  'Blog',
  'Podcast',
  'Newsletter',
  'Other',
];

const STATUSES = ['Draft', 'In Review', 'Scheduled', 'Published', 'Archived'];

export function ContentStudioPage({
  initialContentId = null,
  convertedFromIdea = null,
  onNavigateToLibrary,
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeId = initialContentId || searchParams.get('id');

  const [contentId, setContentId] = useState(activeId);
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'Video',
    platform: 'YouTube',
    status: 'Draft',
    description: '',
    body: '',
    tags: [],
    thumbnail_url: '',
    target_date: '',
    source_idea_id: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(null);
  const [activeRightPanel, setActiveRightPanel] = useState('preview'); // 'preview' | 'assistant'

  // Load initial content or converted idea
  useEffect(() => {
    if (convertedFromIdea) {
      setFormData({
        title: convertedFromIdea.title || '',
        content_type: convertedFromIdea.content_type || 'Video',
        platform: convertedFromIdea.platform || 'YouTube',
        status: 'Draft',
        description: convertedFromIdea.description || '',
        body: convertedFromIdea.body || `# ${convertedFromIdea.title}\n\n## Overview\n${convertedFromIdea.description || ''}\n\n## Script / Content\n`,
        tags: convertedFromIdea.tags || [],
        thumbnail_url: '',
        target_date: convertedFromIdea.target_date || '',
        source_idea_id: convertedFromIdea.id || convertedFromIdea.source_idea_id || null,
      });
      if (convertedFromIdea.id && !convertedFromIdea.id.startsWith('idea-')) {
        setContentId(convertedFromIdea.id);
      }
    } else if (activeId) {
      const loadExisting = async () => {
        try {
          const item = await contentService.getContentById(activeId);
          setFormData({
            title: item.title || '',
            content_type: item.content_type || 'Video',
            platform: item.platform || 'YouTube',
            status: item.status || 'Draft',
            description: item.description || '',
            body: item.body || '',
            tags: item.tags || [],
            thumbnail_url: item.thumbnail_url || '',
            target_date: item.target_date || '',
            source_idea_id: item.source_idea_id || null,
          });
          setContentId(item.id);
        } catch (err) {
          console.error('Failed to load content item', err);
        }
      };
      loadExisting();
    }
  }, [activeId, convertedFromIdea]);

  // Calculations for word count and reading time
  const bodyText = formData.body || '';
  const charCount = bodyText.length;
  const wordCount = bodyText.trim() ? bodyText.trim().split(/\s+/).length : 0;
  const readTimeMin = Math.max(1, Math.round(wordCount / 200));
  const speakingTimeSec = Math.round((wordCount / 130) * 60);

  const handleAddTag = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !formData.tags.includes(clean)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, clean],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSave = async (targetStatus = null) => {
    if (!formData.title.trim()) {
      alert('Content title is required.');
      return;
    }

    setSaving(true);
    setSaveFeedback(null);
    try {
      const payload = {
        ...formData,
        status: targetStatus || formData.status,
      };

      let result;
      if (contentId) {
        result = await contentService.updateContent(contentId, payload);
      } else {
        result = await contentService.createContent(payload);
        setContentId(result.id);
      }

      setFormData((prev) => ({ ...prev, status: result.status }));
      setSaveFeedback({
        type: 'success',
        message: targetStatus === 'Published' ? 'Published successfully!' : 'Draft saved successfully!',
      });
      setTimeout(() => setSaveFeedback(null), 3000);
    } catch (err) {
      setSaveFeedback({
        type: 'error',
        message: err.message || 'Failed to save content',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Studio Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToLibrary || (() => navigate('/library'))}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            title="Return to Content Library"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f4eef7] text-[#412653] uppercase tracking-wider">
                Content Studio
              </span>
              <Badge variant={formData.status}>{formData.status}</Badge>
              {formData.source_idea_id && (
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                  From: {formData.source_idea_id}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Production workspace for writing, formatting, scripts, and multi-platform preview.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {saveFeedback && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                saveFeedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {saveFeedback.message}
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave('Draft')}
            loading={saving}
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSave('Published')}
            loading={saving}
          >
            <Send className="h-3.5 w-3.5" />
            <span>Publish Content</span>
          </Button>
        </div>
      </div>

      {/* Main Workspace (Editor + Right Preview/Assistant Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor & Metadata (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Title & Format Controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Content Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your content a clear, engaging title..."
                className="w-full text-base font-semibold px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] transition-all"
              />
            </div>

            {/* Platform, Content Type, Status selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Destination Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#412653]"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Format Type
                </label>
                <select
                  value={formData.content_type}
                  onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#412653]"
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Workflow Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#412653]"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description / Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Context / Video Description / Hook Outline
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Core premise, notes, target keywords..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#412653]"
              />
            </div>
          </div>

          {/* Script / Body Content Editor */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#412653]" />
                Main Content / Script / Caption Body
              </span>

              {/* Real-time word and duration metrics */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} chars</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Clock className="h-3 w-3" />
                  ~{readTimeMin}m read ({speakingTimeSec}s spoken)
                </span>
              </div>
            </div>

            <textarea
              rows={14}
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Draft your complete script, caption, or article here... Supports markdown formatting."
              className="w-full font-mono text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] leading-relaxed"
            />
          </div>

          {/* Extra metadata: Target Date, Thumbnail URL, Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Publishing Metadata & Assets
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Target Release Date
                </label>
                <input
                  type="date"
                  value={formData.target_date || ''}
                  onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#412653]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                  <Image className="h-3.5 w-3.5 text-slate-400" />
                  Thumbnail Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.thumbnail_url || ''}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#412653]"
                />
              </div>
            </div>

            {/* Tags adder */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Tags & Categorization
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add keyword tag and press Enter"
                  className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#412653]"
                />
                <Button variant="outline" size="sm" onClick={handleAddTag}>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {formData.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-rose-600 ml-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Assistant Tabs (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          {/* Panel Selector Header */}
          <div className="flex bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveRightPanel('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeRightPanel === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-[#3F567F]" />
              <span>Live Social Preview</span>
            </button>

            <button
              onClick={() => setActiveRightPanel('assistant')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeRightPanel === 'assistant'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#412653]" />
              <span>Creative Assistant</span>
            </button>
          </div>

          {/* Panel Content */}
          {activeRightPanel === 'preview' ? (
            <ContentPreview
              title={formData.title}
              body={formData.body}
              platform={formData.platform}
              contentType={formData.content_type}
              thumbnailUrl={formData.thumbnail_url}
              tags={formData.tags}
            />
          ) : (
            <LocalAssistantDrawer
              currentTitle={formData.title}
              currentTopic={formData.description}
              contentType={formData.content_type}
              platform={formData.platform}
              tags={formData.tags}
              onApplyTitle={(newTitle) => setFormData((prev) => ({ ...prev, title: newTitle }))}
              onInsertHook={(hookText) => {
                setFormData((prev) => ({
                  ...prev,
                  body: `${hookText}\n\n${prev.body || ''}`,
                }));
              }}
              onAppendHashtags={(hashtags) => {
                const cleanTags = hashtags.map((h) => h.replace(/^#/, ''));
                setFormData((prev) => ({
                  ...prev,
                  tags: Array.from(new Set([...prev.tags, ...cleanTags])),
                }));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

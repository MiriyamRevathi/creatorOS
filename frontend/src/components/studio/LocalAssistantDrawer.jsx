import React, { useState } from 'react';
import { Sparkles, Hash, Type, Plus, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { contentService } from '../../services/contentService';

export function LocalAssistantDrawer({
  currentTitle,
  currentTopic,
  contentType,
  platform,
  tags,
  onApplyTitle,
  onInsertHook,
  onAppendHashtags,
}) {
  const [activeTab, setActiveTab] = useState('hooks'); // 'hooks', 'headlines', 'hashtags'
  const [loading, setLoading] = useState(false);
  const [hookResults, setHookResults] = useState([]);
  const [headlineResults, setHeadlineResults] = useState([]);
  const [hashtagResults, setHashtagResults] = useState([]);
  const [appliedId, setAppliedId] = useState(null);

  const fetchHooks = async () => {
    setLoading(true);
    try {
      const res = await contentService.getDemoAssist({
        type: 'hooks',
        topic: currentTopic || currentTitle || 'Content Systems',
        content_type: contentType,
        platform: platform,
      });
      setHookResults(res.suggestions || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeadlines = async () => {
    setLoading(true);
    try {
      const res = await contentService.getDemoAssist({
        type: 'headlines',
        title: currentTitle || currentTopic || 'Creator Blueprint',
      });
      setHeadlineResults(res.suggestions || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchHashtags = async () => {
    setLoading(true);
    try {
      const res = await contentService.getDemoAssist({
        type: 'hashtags',
        tags: tags || [],
        platform: platform,
      });
      setHashtagResults(res.suggestions || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="bg-[#412653] p-4 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#D174D2]" />
          <h3 className="text-sm font-bold tracking-tight">Studio Creative Helper</h3>
        </div>
        <p className="text-[11px] text-purple-200 mt-1">
          Zero-dependency deterministic writing assistant (100% offline).
        </p>

        {/* Tab switcher */}
        <div className="flex gap-1 mt-3 bg-black/20 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('hooks')}
            className={`flex-1 text-[11px] py-1 font-semibold rounded transition-colors ${
              activeTab === 'hooks' ? 'bg-white text-[#412653]' : 'text-purple-200 hover:text-white'
            }`}
          >
            Hook Formulas
          </button>
          <button
            onClick={() => setActiveTab('headlines')}
            className={`flex-1 text-[11px] py-1 font-semibold rounded transition-colors ${
              activeTab === 'headlines' ? 'bg-white text-[#412653]' : 'text-purple-200 hover:text-white'
            }`}
          >
            Headlines
          </button>
          <button
            onClick={() => setActiveTab('hashtags')}
            className={`flex-1 text-[11px] py-1 font-semibold rounded transition-colors ${
              activeTab === 'hashtags' ? 'bg-white text-[#412653]' : 'text-purple-200 hover:text-white'
            }`}
          >
            Hashtags
          </button>
        </div>
      </div>

      {/* Body content based on tab */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[460px]">
        {activeTab === 'hooks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Script & Video Hooks</span>
              <Button variant="outline" size="sm" onClick={fetchHooks} loading={loading}>
                Generate Hooks
              </Button>
            </div>

            {hookResults.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                Click "Generate Hooks" to see 3 high-converting script openers.
              </p>
            ) : (
              hookResults.map((hook, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#412653]">
                      {hook.style}
                    </span>
                    <button
                      onClick={() => {
                        onInsertHook(hook.text);
                        setAppliedId(`hook-${idx}`);
                        setTimeout(() => setAppliedId(null), 1500);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-[#412653]"
                    >
                      {appliedId === `hook-${idx}` ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Inserted</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span>Insert Hook</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed italic">
                    "{hook.text}"
                  </p>
                  <p className="text-[10px] text-slate-400">{hook.tip}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'headlines' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Clickworthy Titles</span>
              <Button variant="outline" size="sm" onClick={fetchHeadlines} loading={loading}>
                Suggest Titles
              </Button>
            </div>

            {headlineResults.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                Click "Suggest Titles" to get formula-based title variations.
              </p>
            ) : (
              headlineResults.map((headline, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-800 font-medium">{headline}</span>
                  <button
                    onClick={() => {
                      onApplyTitle(headline);
                      setAppliedId(`headline-${idx}`);
                      setTimeout(() => setAppliedId(null), 1500);
                    }}
                    className="shrink-0 text-[11px] font-semibold text-[#412653] hover:underline"
                  >
                    {appliedId === `headline-${idx}` ? 'Applied!' : 'Apply'}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'hashtags' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Platform Hashtags</span>
              <Button variant="outline" size="sm" onClick={fetchHashtags} loading={loading}>
                Suggest Hashtags
              </Button>
            </div>

            {hashtagResults.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                Click "Suggest Hashtags" to format and generate platform tags.
              </p>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {hashtagResults.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[#3F567F] bg-blue-50 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => onAppendHashtags(hashtagResults)}
                >
                  Append All Hashtags to Content
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

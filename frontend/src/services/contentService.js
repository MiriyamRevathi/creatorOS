import { request } from './api';

const LOCAL_STORAGE_KEY = 'creatoros_content';

const DEFAULT_SEEDS = [
  {
    id: "content-201",
    title: "Mastering Modular Architecture for Creator Platforms",
    content_type: "Video",
    platform: "YouTube",
    status: "Published",
    description: "Comprehensive tutorial on building multi-contributor web applications with clean boundaries.",
    body: "HOOK: What if I told you that 90% of solo creator platforms break not because of lack of users, but bad file boundaries?\n\nIn this video, we break down:\n1. The 7-tier architecture system\n2. Why avoiding bloated databases gives you 10x agility\n3. Writing atomic file-based repositories\n\nDrop a comment below with your current tech stack!",
    tags: ["architecture", "webdev", "youtube", "tutorial"],
    source_idea_id: "idea-101",
    thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop",
    target_date: "2026-10-04",
    published_date: "2026-10-04T18:00:00Z",
    metadata: {
      character_count: 398,
      word_count: 68,
      reading_time_minutes: 1,
      estimated_duration_seconds: 31,
    },
    created_at: "2026-10-01T10:00:00Z",
    updated_at: "2026-10-04T18:00:00Z",
  },
  {
    id: "content-202",
    title: "Editing Speedrun: Cut Your Timeline Time in Half",
    content_type: "Reel",
    platform: "Instagram",
    status: "In Review",
    description: "Short reel showcasing 3 Premiere Pro / DaVinci keyboard shortcuts.",
    body: "Stop using your mouse to trim cuts! ⌨️\n\nHere are 3 shortcuts that saved me 12 hours this week:\n1. Q & W Ripple Trims\n2. J-K-L Shuttle Navigation\n3. Custom Macro for Silence Removal\n\nSave this for your next editing session!",
    tags: ["editing", "premiere", "shortcuts", "reels"],
    source_idea_id: "idea-102",
    thumbnail_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop",
    target_date: "2026-10-15",
    published_date: null,
    metadata: {
      character_count: 242,
      word_count: 41,
      reading_time_minutes: 1,
      estimated_duration_seconds: 19,
    },
    created_at: "2026-10-02T13:00:00Z",
    updated_at: "2026-10-05T09:30:00Z",
  },
  {
    id: "content-203",
    title: "The Solo Creator Operating System: Zero to $10k/mo",
    content_type: "Newsletter",
    platform: "Substack",
    status: "Draft",
    description: "Weekly deep dive into building systems instead of chasing fleeting algorithms.",
    body: "Dear Creators,\n\nThe biggest myth in content creation is that you need to be on every platform 24/7.\nInstead, build one central engine:\n- Idea Vault (capture constantly)\n- Content Studio (batch produce)\n- Content Library (repurpose endlessly)\n\nLet us break down each pillar in detail...",
    tags: ["business", "monetization", "newsletter"],
    source_idea_id: "idea-103",
    thumbnail_url: null,
    target_date: "2026-10-28",
    published_date: null,
    metadata: {
      character_count: 318,
      word_count: 52,
      reading_time_minutes: 1,
      estimated_duration_seconds: 24,
    },
    created_at: "2026-10-03T16:00:00Z",
    updated_at: "2026-10-05T15:20:00Z",
  },
  {
    id: "content-204",
    title: "Why Code-First Creators Are Winning on LinkedIn",
    content_type: "Post",
    platform: "LinkedIn",
    status: "Scheduled",
    description: "Carousel breakdown of developer advocacy, personal branding, and open-source growth.",
    body: "Engineers who build in public create 5x more trust than traditional influencers.\n\n3 things that changed my reach in 6 months:\n- Sharing the messy bugs, not just the finished polish\n- Documenting architecture decisions as visual flowcharts\n- Repurposing GitHub readmes into insightful carousels\n\nAre you building in public yet?",
    tags: ["linkedin", "buildinpublic", "career", "tech"],
    source_idea_id: null,
    thumbnail_url: null,
    target_date: "2026-10-18",
    published_date: null,
    metadata: {
      character_count: 331,
      word_count: 48,
      reading_time_minutes: 1,
      estimated_duration_seconds: 22,
    },
    created_at: "2026-10-04T11:00:00Z",
    updated_at: "2026-10-04T11:00:00Z",
  },
];

function getLocalContent() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SEEDS));
      return [...DEFAULT_SEEDS];
    }
    return JSON.parse(raw);
  } catch {
    return [...DEFAULT_SEEDS];
  }
}

function saveLocalContent(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save content to localStorage', e);
  }
}

function calculateMetadata(text) {
  const body = (text || '').trim();
  const char_count = body.length;
  const words = body ? body.split(/\s+/).filter(Boolean) : [];
  const word_count = words.length;
  return {
    character_count: char_count,
    word_count: word_count,
    reading_time_minutes: Math.max(1, Math.round(word_count / 200)),
    estimated_duration_seconds: Math.round((word_count / 130) * 60),
  };
}

export const contentService = {
  async getContentList(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'All') query.set('status', params.status);
    if (params.content_type && params.content_type !== 'All') query.set('content_type', params.content_type);
    if (params.platform && params.platform !== 'All') query.set('platform', params.platform);
    if (params.tags && params.tags.length > 0) query.set('tags', params.tags.join(','));
    if (params.sort_by) query.set('sort_by', params.sort_by);
    if (params.sort_order) query.set('sort_order', params.sort_order);

    const queryString = query.toString() ? `?${query.toString()}` : '';

    try {
      const res = await request(`/content${queryString}`);
      return res.data;
    } catch {
      let list = getLocalContent();
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(i =>
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.body?.toLowerCase().includes(q) ||
          i.tags?.some(t => t.toLowerCase().includes(q))
        );
      }
      if (params.status && params.status !== 'All') {
        list = list.filter(i => i.status?.toLowerCase() === params.status.toLowerCase());
      }
      if (params.content_type && params.content_type !== 'All') {
        list = list.filter(i => i.content_type?.toLowerCase() === params.content_type.toLowerCase());
      }
      if (params.platform && params.platform !== 'All') {
        list = list.filter(i => i.platform?.toLowerCase() === params.platform.toLowerCase());
      }
      return list;
    }
  },

  async getContentById(id) {
    try {
      const res = await request(`/content/${id}`);
      return res.data;
    } catch {
      const list = getLocalContent();
      const item = list.find(i => String(i.id) === String(id));
      if (!item) throw new Error(`Content item ${id} not found`);
      return item;
    }
  },

  async createContent(contentData) {
    try {
      const res = await request('/content', {
        method: 'POST',
        body: JSON.stringify(contentData),
      });
      return res.data;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalContent();
      const newItem = {
        ...contentData,
        id: `content-${Date.now().toString(36)}`,
        metadata: calculateMetadata(contentData.body),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.unshift(newItem);
      saveLocalContent(list);
      return newItem;
    }
  },

  async updateContent(id, updates) {
    try {
      const res = await request(`/content/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      return res.data;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalContent();
      const index = list.findIndex(i => String(i.id) === String(id));
      if (index === -1) throw new Error(`Content item ${id} not found`);

      const updatedItem = {
        ...list[index],
        ...updates,
        metadata: updates.body !== undefined ? calculateMetadata(updates.body) : list[index].metadata,
        updated_at: new Date().toISOString(),
      };
      list[index] = updatedItem;
      saveLocalContent(list);
      return updatedItem;
    }
  },

  async deleteContent(id) {
    try {
      await request(`/content/${id}`, { method: 'DELETE' });
      return true;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalContent();
      const filtered = list.filter(i => String(i.id) !== String(id));
      saveLocalContent(filtered);
      return true;
    }
  },

  async convertIdeaToContent(ideaId, extraData = {}) {
    try {
      const res = await request(`/content/convert-idea/${ideaId}`, {
        method: 'POST',
        body: JSON.stringify(extraData),
      });
      return res.data;
    } catch (err) {
      if (err.status) throw err;
      // Local fallback conversion
      const rawIdeas = localStorage.getItem('creatoros_ideas');
      const ideas = rawIdeas ? JSON.parse(rawIdeas) : [];
      const idea = ideas.find(i => String(i.id) === String(ideaId));
      if (!idea) throw new Error(`Idea ${ideaId} not found`);

      const newItem = {
        title: idea.title,
        content_type: idea.content_type || 'Video',
        platform: 'YouTube',
        status: 'Draft',
        description: idea.description || '',
        body: `# ${idea.title}\n\n${idea.description || ''}\n\n## Script Outline\n- Introduction:\n- Main Talking Points:\n- Outro:\n`,
        tags: idea.tags || [],
        source_idea_id: ideaId,
        id: `content-${Date.now().toString(36)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      newItem.metadata = calculateMetadata(newItem.body);

      const list = getLocalContent();
      list.unshift(newItem);
      saveLocalContent(list);
      return newItem;
    }
  },

  async getStats() {
    try {
      const res = await request('/content/stats');
      return res.data;
    } catch {
      const list = getLocalContent();
      const by_status = {};
      const by_type = {};
      const by_platform = {};
      let total_words = 0;
      let total_duration = 0;

      for (const item of list) {
        by_status[item.status] = (by_status[item.status] || 0) + 1;
        by_type[item.content_type] = (by_type[item.content_type] || 0) + 1;
        by_platform[item.platform] = (by_platform[item.platform] || 0) + 1;
        total_words += item.metadata?.word_count || 0;
        total_duration += item.metadata?.estimated_duration_seconds || 0;
      }

      return {
        total: list.length,
        by_status,
        by_content_type: by_type,
        by_platform,
        draft_count: by_status['Draft'] || 0,
        in_review_count: by_status['In Review'] || 0,
        scheduled_count: by_status['Scheduled'] || 0,
        published_count: by_status['Published'] || 0,
        archived_count: by_status['Archived'] || 0,
        total_words_written: total_words,
        total_estimated_duration_seconds: total_duration,
      };
    }
  },

  async getDemoAssist(payload) {
    try {
      const res = await request('/content/demo-assist', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return res.data;
    } catch {
      // Deterministic offline fallback
      const topic = payload.topic || payload.title || 'Creator OS';
      return {
        type: payload.type || 'hooks',
        suggestions: [
          {
            style: 'Curiosity Gap',
            text: `Most creators spend months on ${topic} without realizing this one mistake...`,
            tip: 'Hook the audience in the first 3 seconds.',
          },
          {
            style: 'Contrarian / Problem',
            text: `Stop doing ${topic} the old way. Here is why the traditional advice fails.`,
            tip: 'Great for LinkedIn, Threads, and X posts.',
          },
          {
            style: 'Actionable Roadmap',
            text: `A step-by-step masterclass on ${topic} for creators who want results fast:`,
            tip: 'High save rate for carousels and blogs.',
          },
        ],
      };
    }
  },
};

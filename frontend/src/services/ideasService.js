import { request } from './api';

const LOCAL_STORAGE_KEY = 'creatoros_ideas';

const DEFAULT_SEEDS = [
  {
    id: "idea-101",
    title: "10 Architecture Patterns for Solo Creators in 2026",
    description: "Deep-dive video covering modular systems, headless CMS, and zero-database setups.",
    content_type: "Video",
    tags: ["tech", "architecture", "productivity"],
    priority: "High",
    status: "Planned",
    target_date: "2026-10-20",
    converted_to_content_id: null,
    created_at: "2026-10-01T09:00:00Z",
    updated_at: "2026-10-01T09:00:00Z",
  },
  {
    id: "idea-102",
    title: "Behind the Scenes: Fast-Paced Video Editing Workflow",
    description: "Short reel highlighting keyboard shortcuts, color grading LUTs, and timeline organization.",
    content_type: "Reel",
    tags: ["editing", "workflow", "shortcuts"],
    priority: "Urgent",
    status: "In Progress",
    target_date: "2026-10-15",
    converted_to_content_id: null,
    created_at: "2026-10-02T11:30:00Z",
    updated_at: "2026-10-02T11:30:00Z",
  },
  {
    id: "idea-103",
    title: "Solo Creator Monetization: Diversifying Beyond AdSense",
    description: "Comprehensive newsletter issue detailing brand sponsorships, digital product store, and consulting.",
    content_type: "Newsletter",
    tags: ["monetization", "finance", "business"],
    priority: "Medium",
    status: "Backlog",
    target_date: "2026-10-28",
    converted_to_content_id: null,
    created_at: "2026-10-03T14:15:00Z",
    updated_at: "2026-10-03T14:15:00Z",
  },
  {
    id: "idea-104",
    title: "Why 90% of Creators Burn Out (And The Operating System Fix)",
    description: "In-depth blog post on batch production, asynchronous planning, and mental stamina.",
    content_type: "Blog",
    tags: ["mindset", "productivity", "growth"],
    priority: "High",
    status: "Published",
    target_date: "2026-10-04",
    converted_to_content_id: null,
    created_at: "2026-10-04T10:00:00Z",
    updated_at: "2026-10-05T12:00:00Z",
  },
  {
    id: "idea-105",
    title: "Microphone Battle: Shure SM7B vs Dynamic USB Mic",
    description: "Quick short audio comparison test for home studio recording.",
    content_type: "Short",
    tags: ["audio", "gear", "review"],
    priority: "Low",
    status: "Backlog",
    target_date: null,
    converted_to_content_id: null,
    created_at: "2026-10-05T16:45:00Z",
    updated_at: "2026-10-05T16:45:00Z",
  },
];

function getLocalIdeas() {
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

function saveLocalIdeas(ideas) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ideas));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const ideasService = {
  async getIdeas(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'All') query.set('status', params.status);
    if (params.content_type && params.content_type !== 'All') query.set('content_type', params.content_type);
    if (params.priority && params.priority !== 'All') query.set('priority', params.priority);
    if (params.sort_by) query.set('sort_by', params.sort_by);
    if (params.sort_order) query.set('sort_order', params.sort_order);

    const queryString = query.toString() ? `?${query.toString()}` : '';

    try {
      const res = await request(`/ideas${queryString}`);
      return res.data;
    } catch {
      // Local fallback
      let list = getLocalIdeas();
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(i =>
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.tags?.some(t => t.toLowerCase().includes(q))
        );
      }
      if (params.status && params.status !== 'All') {
        list = list.filter(i => i.status?.toLowerCase() === params.status.toLowerCase());
      }
      if (params.content_type && params.content_type !== 'All') {
        list = list.filter(i => i.content_type?.toLowerCase() === params.content_type.toLowerCase());
      }
      if (params.priority && params.priority !== 'All') {
        list = list.filter(i => i.priority?.toLowerCase() === params.priority.toLowerCase());
      }
      return list;
    }
  },

  async getIdeaById(id) {
    try {
      const res = await request(`/ideas/${id}`);
      return res.data;
    } catch {
      const list = getLocalIdeas();
      const item = list.find(i => String(i.id) === String(id));
      if (!item) throw new Error(`Idea ${id} not found`);
      return item;
    }
  },

  async createIdea(ideaData) {
    try {
      const res = await request('/ideas', {
        method: 'POST',
        body: JSON.stringify(ideaData),
      });
      return res.data;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalIdeas();
      const newIdea = {
        ...ideaData,
        id: `idea-${Date.now().toString(36)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.unshift(newIdea);
      saveLocalIdeas(list);
      return newIdea;
    }
  },

  async updateIdea(id, updates) {
    try {
      const res = await request(`/ideas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      return res.data;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalIdeas();
      const index = list.findIndex(i => String(i.id) === String(id));
      if (index === -1) throw new Error(`Idea ${id} not found`);
      list[index] = { ...list[index], ...updates, updated_at: new Date().toISOString() };
      saveLocalIdeas(list);
      return list[index];
    }
  },

  async deleteIdea(id) {
    try {
      await request(`/ideas/${id}`, { method: 'DELETE' });
      return true;
    } catch (err) {
      if (err.status) throw err;
      const list = getLocalIdeas();
      const filtered = list.filter(i => String(i.id) !== String(id));
      saveLocalIdeas(filtered);
      return true;
    }
  },

  async getStats() {
    try {
      const res = await request('/ideas/stats');
      return res.data;
    } catch {
      const list = getLocalIdeas();
      const by_status = {};
      const by_content_type = {};
      const by_priority = {};

      for (const item of list) {
        by_status[item.status] = (by_status[item.status] || 0) + 1;
        by_content_type[item.content_type] = (by_content_type[item.content_type] || 0) + 1;
        by_priority[item.priority] = (by_priority[item.priority] || 0) + 1;
      }

      return {
        total: list.length,
        by_status,
        by_content_type,
        by_priority,
        planned_count: by_status['Planned'] || 0,
        in_progress_count: by_status['In Progress'] || 0,
        backlog_count: by_status['Backlog'] || 0,
        published_count: by_status['Published'] || 0,
      };
    }
  },
};

const API_BASE = '/api/trends';

export const trendService = {
  async getExplorer() {
    const res = await fetch(`${API_BASE}/explorer`);
    if (!res.ok) throw new Error('Failed to fetch trend explorer data');
    const json = await res.json();
    return json.data;
  },

  async getTrendingTopics(category = '') {
    const url = category ? `${API_BASE}/topics?category=${encodeURIComponent(category)}` : `${API_BASE}/topics`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch trending topics');
    const json = await res.json();
    return json.data;
  },

  async getContentTrends() {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error('Failed to fetch content trends');
    const json = await res.json();
    return json.data;
  },

  async getTrendHistory() {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) throw new Error('Failed to fetch trend history');
    const json = await res.json();
    return json.data;
  }
};

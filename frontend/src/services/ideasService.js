const API_BASE = '/api/ideas';

export const ideasService = {
  async getAll(params = {}) {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {
      console.warn('Backend ideas API unavailable, returning empty list');
    }
    return [];
  },

  async getStats() {
    return {
      total: 0,
      ready: 0,
      in_progress: 0,
      drafts: 0
    };
  },

  async create(data) {
    return { id: `idea_${Date.now()}`, ...data };
  },

  async update(id, data) {
    return { id, ...data };
  },

  async delete(id) {
    return true;
  },

  async convertToContent(id) {
    return { success: true };
  }
};

export default ideasService;

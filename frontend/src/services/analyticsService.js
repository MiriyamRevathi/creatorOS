const API_BASE = '/api/analytics';

export const analyticsService = {
  async getOverview() {
    const res = await fetch(`${API_BASE}/overview`);
    if (!res.ok) throw new Error('Failed to fetch analytics overview');
    const json = await res.json();
    return json.data;
  },

  async getContentAnalytics() {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error('Failed to fetch content analytics');
    const json = await res.json();
    return json.data;
  },

  async getAudienceAnalytics() {
    const res = await fetch(`${API_BASE}/audience`);
    if (!res.ok) throw new Error('Failed to fetch audience analytics');
    const json = await res.json();
    return json.data;
  },

  async getGrowthAnalytics() {
    const res = await fetch(`${API_BASE}/growth`);
    if (!res.ok) throw new Error('Failed to fetch growth analytics');
    const json = await res.json();
    return json.data;
  },

  async getEngagementAnalytics() {
    const res = await fetch(`${API_BASE}/engagement`);
    if (!res.ok) throw new Error('Failed to fetch engagement analytics');
    const json = await res.json();
    return json.data;
  },

  async getRevenueAnalytics() {
    const res = await fetch(`${API_BASE}/revenue`);
    if (!res.ok) throw new Error('Failed to fetch revenue analytics');
    const json = await res.json();
    return json.data;
  }
};

const API_BASE = '/api/creator';

export const creatorService = {
  async getProfile(token) {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data.data;
  },

  async updateProfile(token, profileData) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data.data;
  },

  async updatePreferences(token, preferences) {
    const res = await fetch(`${API_BASE}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(preferences)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update preferences');
    return data.data;
  },

  async addPortfolioItem(token, item) {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add portfolio item');
    return data.data;
  },

  async deletePortfolioItem(token, itemId) {
    const res = await fetch(`${API_BASE}/portfolio/${itemId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete portfolio item');
    return data.data;
  }
};

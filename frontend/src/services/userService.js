const API_BASE = '/api/users';
const SETTINGS_BASE = '/api/settings';

export const userService = {
  async getMe(token) {
    const res = await fetch(`${API_BASE}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
    return data.data;
  },

  async updateAccount(token, accountData) {
    const res = await fetch(`${API_BASE}/account`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(accountData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update account settings');
    return data.data;
  },

  async changePassword(token, currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to change password');
    return data.data;
  },

  async getSettings(token) {
    const res = await fetch(SETTINGS_BASE, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch settings');
    return data.data;
  },

  async updateSettingsSection(token, section, sectionData) {
    const res = await fetch(`${SETTINGS_BASE}/${section}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sectionData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to update ${section} settings`);
    return data.data;
  }
};

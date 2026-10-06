const API_BASE = '/api/notifications';

export const notificationService = {
  async getNotifications(token) {
    const res = await fetch(API_BASE, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch notifications');
    return data.data;
  },

  async markRead(token, notificationId) {
    const res = await fetch(`${API_BASE}/${notificationId}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to mark notification as read');
    return data.data;
  },

  async markAllRead(token) {
    const res = await fetch(`${API_BASE}/read-all`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to mark all notifications as read');
    return data.data;
  },

  async deleteNotification(token, notificationId) {
    const res = await fetch(`${API_BASE}/${notificationId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete notification');
    return data.data;
  }
};

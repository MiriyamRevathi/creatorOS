export async function request(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export const api = {
  async get(url) {
    return request(url);
  },
  async post(url, body) {
    return request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  },
  async put(url, body) {
    return request(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  },
  async delete(url) {
    return request(url, { method: 'DELETE' });
  }
};

export default api;

const API_BASE = '/api/auth';

async function parseResponse(res, defaultMessage) {
  try {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || defaultMessage);
    return data.data;
  } catch (err) {
    if (err.name === 'SyntaxError') {
      throw new Error('Unable to connect to backend server. Please ensure python backend/app.py is running.');
    }
    throw err;
  }
}

export const authService = {
  async register(email, password, fullName, username) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName, username })
    });
    return parseResponse(res, 'Registration failed');
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return parseResponse(res, 'Login failed');
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return parseResponse(res, 'Password reset request failed');
  },

  async resetPassword(token, newPassword) {
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, new_password: newPassword })
    });
    return parseResponse(res, 'Password reset failed');
  },

  async verifyAccount(token) {
    const res = await fetch(`${API_BASE}/verify-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    return parseResponse(res, 'Account verification failed');
  }
};

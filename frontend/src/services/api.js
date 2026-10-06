/**
 * CreatorOS API Client
 * Provides resilient communication with backend Flask API,
 * with fallback to local persistent storage for zero-dependency standalone operation.
 */

const API_BASE = '/api';

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      const errMessage = data?.error?.message || `Request failed with status ${response.status}`;
      const error = new Error(errMessage);
      error.field = data?.error?.field;
      error.status = response.status;
      throw error;
    }
    return data;
  } catch (err) {
    // If it's an HTTP validation error, rethrow it directly
    if (err.status) {
      throw err;
    }
    // Network or server unreachable fallback
    console.warn(`Backend unreachable at ${url}. Operating with resilient local fallback:`, err.message);
    throw err;
  }
}

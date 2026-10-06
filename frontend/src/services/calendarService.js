import api from './api';

export const getCalendars = () => api.get('/calendar');
export const getCalendar = (id) => api.get(`/calendar/${id}`);
export const createCalendar = (data) => api.post('/calendar', data);
export const updateCalendar = (id, data) => api.put(`/calendar/${id}`, data);
export const deleteCalendar = (id) => api.delete(`/calendar/${id}`);

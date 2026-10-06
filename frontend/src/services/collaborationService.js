import api from './api';

export const getProjects = () => api.get('/projects');
export const getTasks = () => api.get('/tasks');
export const getCollaborations = () => api.get('/collaborations');

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creatoros_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('creatoros_token') || null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('creatoros_user', JSON.stringify(data.user));
      localStorage.setItem('creatoros_token', data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName, username) => {
    setLoading(true);
    try {
      const data = await authService.register(email, password, fullName, username);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('creatoros_user', JSON.stringify(data.user));
      localStorage.setItem('creatoros_token', data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('creatoros_user');
    localStorage.removeItem('creatoros_token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('creatoros_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

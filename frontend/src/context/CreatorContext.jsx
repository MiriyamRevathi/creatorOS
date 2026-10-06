import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { creatorService } from '../services/creatorService';

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await creatorService.getProfile(token);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch creator profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, token]);

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const data = await creatorService.updateProfile(token, profileData);
      setProfile(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences) => {
    setLoading(true);
    try {
      const data = await creatorService.updatePreferences(token, preferences);
      setProfile(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const addPortfolioItem = async (item) => {
    setLoading(true);
    try {
      const data = await creatorService.addPortfolioItem(token, item);
      setProfile(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolioItem = async (itemId) => {
    setLoading(true);
    try {
      const data = await creatorService.deletePortfolioItem(token, itemId);
      setProfile(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreatorContext.Provider value={{
      profile,
      loading,
      fetchProfile,
      updateProfile,
      updatePreferences,
      addPortfolioItem,
      deletePortfolioItem
    }}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => useContext(CreatorContext);

import { useState, useEffect, useCallback } from 'react';
import { trendService } from '../services/trendService';

export function useTrends(trendType = 'explorer', category = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result = null;
      switch (trendType) {
        case 'topics':
          result = await trendService.getTrendingTopics(category);
          break;
        case 'content':
          result = await trendService.getContentTrends();
          break;
        case 'history':
          result = await trendService.getTrendHistory();
          break;
        case 'explorer':
        default:
          result = await trendService.getExplorer();
          break;
      }
      setData(result);
    } catch (err) {
      setError(err.message || 'Error loading trend data');
    } finally {
      setLoading(false);
    }
  }, [trendType, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}

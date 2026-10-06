import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';

export function useAnalytics(viewType = 'overview') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result = null;
      switch (viewType) {
        case 'content':
          result = await analyticsService.getContentAnalytics();
          break;
        case 'audience':
          result = await analyticsService.getAudienceAnalytics();
          break;
        case 'growth':
          result = await analyticsService.getGrowthAnalytics();
          break;
        case 'engagement':
          result = await analyticsService.getEngagementAnalytics();
          break;
        case 'revenue':
          result = await analyticsService.getRevenueAnalytics();
          break;
        case 'overview':
        default:
          result = await analyticsService.getOverview();
          break;
      }
      setData(result);
    } catch (err) {
      setError(err.message || 'Error fetching analytics data');
    } finally {
      setLoading(false);
    }
  }, [viewType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}

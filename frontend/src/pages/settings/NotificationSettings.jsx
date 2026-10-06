import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const NotificationSettings = () => {
  const { token } = useAuth();
  const { addToast } = useNotification();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [campaignAlerts, setCampaignAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userService.getSettings(token).then(res => {
      if (res.notifications) {
        setEmailAlerts(res.notifications.email_notifications ?? true);
        setPushAlerts(res.notifications.push_notifications ?? true);
        setCampaignAlerts(res.notifications.campaign_alerts ?? true);
        setWeeklyDigest(res.notifications.weekly_digest ?? true);
      }
    }).catch(console.error);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.updateSettingsSection(token, 'notifications', {
        email_notifications: emailAlerts,
        push_notifications: pushAlerts,
        campaign_alerts: campaignAlerts,
        weekly_digest: weeklyDigest
      });
      addToast('Notification Settings Saved', 'Your alert preferences have been saved.', 'success');
    } catch (err) {
      addToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Notification Preferences" subtitle="Control when and how CreatorOS notifies you">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-brand-purple"
            checked={emailAlerts}
            onChange={e => setEmailAlerts(e.target.checked)}
          />
          Email notification summaries
        </label>

        <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-brand-purple"
            checked={pushAlerts}
            onChange={e => setPushAlerts(e.target.checked)}
          />
          In-app push notifications
        </label>

        <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-brand-purple"
            checked={campaignAlerts}
            onChange={e => setCampaignAlerts(e.target.checked)}
          />
          Brand deal & sponsorship alerts
        </label>

        <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-brand-purple"
            checked={weeklyDigest}
            onChange={e => setWeeklyDigest(e.target.checked)}
          />
          Weekly performance and analytics digest
        </label>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="sm" disabled={loading}>
            {loading ? 'Saving...' : 'Save Notification Preferences'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

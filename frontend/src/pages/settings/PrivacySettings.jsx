import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const PrivacySettings = () => {
  const { token } = useAuth();
  const { addToast } = useNotification();

  const [visibility, setVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [allowCollabs, setAllowCollabs] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userService.getSettings(token).then(res => {
      if (res.privacy) {
        setVisibility(res.privacy.profile_visibility || 'public');
        setShowEmail(res.privacy.show_email || false);
        setShowStats(res.privacy.show_stats ?? true);
        setAllowCollabs(res.privacy.allow_collaboration_requests ?? true);
      }
    }).catch(console.error);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.updateSettingsSection(token, 'privacy', {
        profile_visibility: visibility,
        show_email: showEmail,
        show_stats: showStats,
        allow_collaboration_requests: allowCollabs
      });
      addToast('Privacy Settings Saved', 'Your privacy controls have been updated.', 'success');
    } catch (err) {
      addToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Privacy & Data Control" subtitle="Manage visibility of your profile and data">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Profile Visibility</label>
          <select
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
          >
            <option value="public">Public (Visible to Brands & Audience)</option>
            <option value="private">Private (Only Me)</option>
            <option value="unlisted">Unlisted (Accessible via Direct Link)</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-purple"
              checked={showEmail}
              onChange={e => setShowEmail(e.target.checked)}
            />
            Display contact email on public creator profile
          </label>

          <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-purple"
              checked={showStats}
              onChange={e => setShowStats(e.target.checked)}
            />
            Display estimated reach and subscriber count on portfolio
          </label>

          <label className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-purple"
              checked={allowCollabs}
              onChange={e => setAllowCollabs(e.target.checked)}
            />
            Allow brand collaboration inquiries
          </label>
        </div>

        <Button type="submit" variant="primary" size="sm" disabled={loading}>
          {loading ? 'Saving...' : 'Save Privacy Settings'}
        </Button>
      </form>
    </Card>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreator } from '../../context/CreatorContext';
import { useNotification } from '../../context/NotificationContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const Preferences = () => {
  const { profile, updatePreferences, loading } = useCreator();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [contentFocus, setContentFocus] = useState(['Video', 'Writing']);
  const [targetAudience, setTargetAudience] = useState('');
  const [monetizationGoals, setMonetizationGoals] = useState(['Brand Deals']);
  const [currency, setCurrency] = useState('USD');

  const focusOptions = ['Video', 'Writing', 'Podcasts', 'Live Streaming', 'Design', 'Short Form', 'Newsletters'];
  const monetizationOptions = ['Brand Deals', 'Digital Products', 'Memberships/Subscriptions', 'Affiliate Marketing', 'Ad Revenue'];

  useEffect(() => {
    if (profile?.preferences) {
      setContentFocus(profile.preferences.content_focus || ['Video']);
      setTargetAudience(profile.preferences.target_audience || '');
      setMonetizationGoals(profile.preferences.monetization_goals || ['Brand Deals']);
      setCurrency(profile.preferences.currency || 'USD');
    }
  }, [profile]);

  const toggleFocus = (item) => {
    if (contentFocus.includes(item)) {
      setContentFocus(contentFocus.filter(f => f !== item));
    } else {
      setContentFocus([...contentFocus, item]);
    }
  };

  const toggleGoal = (item) => {
    if (monetizationGoals.includes(item)) {
      setMonetizationGoals(monetizationGoals.filter(g => g !== item));
    } else {
      setMonetizationGoals([...monetizationGoals, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePreferences({
        content_focus: contentFocus,
        target_audience: targetAudience,
        monetization_goals: monetizationGoals,
        currency
      });
      addToast('Setup Complete!', 'Your creator preferences have been saved.', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast('Error', err.message, 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <Badge variant="purple" className="mb-2">Creator Onboarding & Setup</Badge>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workspace Preferences</h1>
          <p className="text-xs text-slate-500 mt-1">Configure your primary formats, goals, and target audience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card title="Content Focus Formats">
            <p className="text-xs text-slate-500 mb-4">Select all primary content formats you produce:</p>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map(opt => {
                const selected = contentFocus.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFocus(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selected
                        ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-purple'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="Target Audience & Niche Focus">
            <Input
              label="Describe Your Ideal Audience"
              placeholder="e.g. Founders, Tech Enthusiasts, Gamers, Designers"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
            />
          </Card>

          <Card title="Monetization Strategy">
            <p className="text-xs text-slate-500 mb-4">Select revenue channels you prioritize:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {monetizationOptions.map(opt => {
                const selected = monetizationGoals.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleGoal(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selected
                        ? 'bg-brand-coral text-white border-brand-coral shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-coral'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5 max-w-xs">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Default Currency</label>
              <select
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="primary" type="submit" size="lg" disabled={loading}>
              {loading ? 'Saving Setup...' : 'Complete Creator Setup'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

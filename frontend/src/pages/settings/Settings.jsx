import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Tabs } from '../../components/common/Tabs';
import { AccountSettings } from './AccountSettings';
import { PrivacySettings } from './PrivacySettings';
import { SecuritySettings } from './SecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';
import { NotificationSettings } from './NotificationSettings';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  const settingsTabs = [
    { id: 'account', label: 'Account' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'security', label: 'Security' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings & Preferences</h1>
          <p className="text-xs text-slate-500 mt-1">Manage platform configuration, profile visibility, and security</p>
        </div>

        <Tabs tabs={settingsTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="pt-2">
          {renderActiveSection()}
        </div>
      </div>
    </DashboardLayout>
  );
};

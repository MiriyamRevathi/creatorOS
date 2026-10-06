import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Bell, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

export const Activity = () => {
  const activities = [
    { title: 'Creator Workspace Initialized', time: 'Just now', type: 'system', icon: Sparkles },
    { title: 'Profile Preferences Saved', time: '2 hours ago', type: 'profile', icon: UserCheck },
    { title: 'Account Verification Completed', time: '1 day ago', type: 'security', icon: ShieldCheck },
    { title: 'Welcome Notification Received', time: '1 day ago', type: 'info', icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workspace Activity Log</h1>
          <p className="text-xs text-slate-500 mt-1">Audit log of system actions, profile updates, and account events</p>
        </div>

        <Card>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{act.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{act.time}</p>
                    </div>
                  </div>
                  <Badge variant="purple" className="capitalize">{act.type}</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

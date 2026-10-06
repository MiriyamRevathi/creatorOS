import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markRead, markAllRead, deleteNotification } = useNotification();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notification Center</h1>
            <p className="text-xs text-slate-500 mt-1">Manage platform alerts, campaign messages, and system updates</p>
          </div>
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
              <CheckCheck className="w-4 h-4" /> Mark All as Read
            </Button>
          )}
        </div>

        <Card>
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">All caught up!</h3>
              <p className="text-xs text-slate-500 mt-1">You have no pending notifications at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 flex items-start justify-between rounded-xl transition-colors ${
                    notif.is_read ? 'opacity-70 bg-transparent' : 'bg-brand-purple/5'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                        {!notif.is_read && <Badge variant="coral" className="text-[10px]">New</Badge>}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{notif.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">{new Date(notif.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!notif.is_read && (
                      <button
                        onClick={() => markRead(notif.id)}
                        className="text-xs text-brand-purple hover:bg-brand-purple/10 p-1.5 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="text-xs text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell, 
  Lightbulb, 
  Video, 
  Calendar, 
  BarChart3, 
  Store, 
  DollarSign, 
  Sparkles,
  Briefcase
} from 'lucide-react';

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const mainNavigation = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Activity', path: '/dashboard/activity', icon: Bell },
    { label: 'Profile', path: '/creator/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const integrationPlaceholders = [
    { label: 'Idea Vault', path: '/ideas', icon: Lightbulb, badge: 'Vault' },
    { label: 'Content Studio', path: '/content', icon: Video, badge: 'Studio' },
    { label: 'Calendar Hub', path: '/calendar', icon: Calendar, badge: 'Plan' },
    { label: 'Analytics', path: '/analytics', icon: BarChart3, badge: 'Insights' },
    { label: 'Brand Marketplace', path: '/marketplace', icon: Briefcase, badge: 'Deals' },
    { label: 'Creator Store', path: '/store', icon: Store, badge: 'Shop' },
    { label: 'Finance & Payouts', path: '/finance', icon: DollarSign, badge: 'Money' },
  ];

  return (
    <aside className={`bg-brand-purple text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} min-h-screen flex flex-col justify-between shrink-0 shadow-lg`}>
      <div>
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-brand-lavender" />
            </div>
            {!collapsed && (
              <span className="font-extrabold text-lg tracking-tight text-white">
                Creator<span className="text-brand-coral">OS</span>
              </span>
            )}
          </Link>
        </div>

        <div className="py-6 px-3 space-y-1">
          {!collapsed && <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">Core Platform</div>}
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white/20 text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          <div className="pt-6">
            {!collapsed && <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">Ecosystem Modules</div>}
            {integrationPlaceholders.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.path}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 cursor-pointer group"
                  title={`${item.label} (Module Integration Placeholder)`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0 text-white/60 group-hover:text-brand-lavender" />
                    {!collapsed && <span className="group-hover:text-white">{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-brand-lavender font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!collapsed && (
        <div className="p-4 m-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
          <p className="font-semibold text-white">Contributor 1 Core</p>
          <p className="text-[11px] text-white/50 mt-0.5">Platform & Authentication v1.0</p>
        </div>
      )}
    </aside>
  );
};

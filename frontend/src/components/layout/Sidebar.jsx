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
  Briefcase,
  TrendingUp
} from 'lucide-react';

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const mainNavigation = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Activity', path: '/dashboard/activity', icon: Bell },
    { label: 'Profile', path: '/creator/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const integrationModules = [
    { label: 'Idea Vault', path: '/ideas', icon: Lightbulb, badge: 'Vault', isImplemented: false },
    { label: 'Content Studio', path: '/content', icon: Video, badge: 'Studio', isImplemented: false },
    { label: 'Calendar Hub', path: '/calendar', icon: Calendar, badge: 'Plan', isImplemented: false },
    { label: 'Analytics', path: '/analytics', icon: BarChart3, badge: 'Insights', isImplemented: true },
    { label: 'Trend Explorer', path: '/trends', icon: TrendingUp, badge: 'Trends', isImplemented: true },
    { label: 'Brand Marketplace', path: '/marketplace', icon: Briefcase, badge: 'Deals', isImplemented: false },
    { label: 'Creator Store', path: '/store', icon: Store, badge: 'Shop', isImplemented: false },
    { label: 'Finance & Payouts', path: '/finance', icon: DollarSign, badge: 'Money', isImplemented: false },
  ];

  return (
    <aside className={`bg-brand-purple text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} min-h-screen flex flex-col justify-between shrink-0 shadow-lg`}>
      <div>
        {/* Brand Header */}
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

        {/* Main Navigation */}
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

          {/* Module Integration Items */}
          <div className="pt-6">
            {!collapsed && <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">Ecosystem Modules</div>}
            {integrationModules.map((item) => {
              const Icon = item.icon;
              const active = location.pathname.startsWith(item.path);

              if (item.isImplemented) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-brand-lavender/30 text-white font-bold border border-brand-lavender/40'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-lavender' : 'text-white/80'}`} />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-brand-lavender text-brand-purple font-extrabold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={item.path}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-white/40 hover:bg-white/5 cursor-not-allowed group opacity-75"
                  title={`${item.label} (Assigned to other Contributor)`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0 text-white/40" />
                    {!collapsed && <span className="text-white/50">{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer info */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-white/50 space-y-1">
          <div className="font-semibold text-white/80">Contributor 4 Workspace</div>
          <div>Analytics, Insights & Trends</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
